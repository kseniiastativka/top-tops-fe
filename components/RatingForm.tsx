import { FC, useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import { Field, Form } from "react-final-form"
import arrayMutators from "final-form-arrays"
import { FieldArray } from "react-final-form-arrays"
import { RatingModel } from "../models/ratingModel"
import { API_PREFIX } from "../constants/api"
import { parseRating } from "../utils/parseRating"
import { useUser } from "./UserProvider"

type RatingFormValues =
  | RatingModel
  | {
      name: string
      visibility: "public" | "private"
      items: Array<{ name: string; id: string }>
    }

export const RatingForm: FC<{ rating?: RatingModel }> = ({ rating }) => {
  const [userState] = useUser()
  const router = useRouter()

  const isCreateMode = rating === undefined

  useEffect(() => {
    if (userState.type !== "logged-in") {
      router
        .push("/login")
        .then(() => "Redirect unauthorized user to the login page")
        .catch(() => "Fail to redirect unauthorized user to the login page")
    }
  }, [userState.type])

  return (
    <>
      <Head>
        <title>Add new rating | top-tops</title>
        <link rel="icon" href={"/favicon.ico"} />
      </Head>

      {rating === undefined ? (
        <h1>Add new rating</h1>
      ) : (
        <h1>Edit rating "{rating.name}"</h1>
      )}

      <Form<RatingFormValues>
        onSubmit={async (values) => {
          if (userState.type !== "logged-in") {
            return
          }

          const res = isCreateMode
            ? await fetch(`${API_PREFIX}/my-ratings`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${userState.token}`,
                },
                body: JSON.stringify({
                  authorId: userState.id,
                  name: values.name,
                  items: values.items,
                  visibility: values.visibility,
                }),
              })
            : await fetch(`${API_PREFIX}/my-ratings/${rating.id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${userState.token}`,
                },
                body: JSON.stringify(values),
              })

          if (res.status >= 400) {
            await router.push("/error")
          }

          const rawRating = await res.json()

          const decodedRating = parseRating(rawRating)

          if (decodedRating === undefined) {
            await router.push("/error")
          }

          await router.push(`/rating/${decodedRating.id}`)
        }}
        initialValues={
          isCreateMode
            ? {
                visibility: "private",
                name: "",
                items: [{ name: "", id: Math.random().toString(36) }],
              }
            : rating
        }
        mutators={{ ...arrayMutators }}
        render={({ handleSubmit }) => {
          return (
            <form className="mt-4 grid gap-6 max-w-sm" onSubmit={handleSubmit}>
              <label>
                <span>Rating name:</span>

                <Field
                  name="name"
                  render={({ input }) => {
                    return (
                      <input
                        {...input}
                        className="text-input"
                        autoComplete="off"
                        required={true}
                      />
                    )
                  }}
                />
              </label>

              <label>
                <span>Visibility:</span>

                <Field name="visibility" component="select">
                  <option />
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                </Field>
              </label>

              <p>Rating items:</p>

              <FieldArray<RatingFormValues["items"][0]> name="items">
                {({ fields }) => (
                  <ol className="list-decimal list-inside space-y-4">
                    {fields.map((name, index) => (
                      <li key={name}>
                        <label>
                          <span>Item name:</span>
                          <Field
                            name={`${name}.name`}
                            render={({ input }) => {
                              return (
                                <input
                                  {...input}
                                  className="text-input"
                                  autoComplete="off"
                                  required={true}
                                />
                              )
                            }}
                          />
                        </label>

                        <button
                          type="button"
                          onClick={() => fields.remove(index)}
                        >
                          Remove rating item
                        </button>
                      </li>
                    ))}

                    <button
                      className="button"
                      type="button"
                      onClick={() =>
                        fields.push({
                          name: "",
                          id: Math.random().toString(36),
                        })
                      }
                    >
                      Add new rating item
                    </button>
                  </ol>
                )}
              </FieldArray>

              <input className="button bg-green-400" type="submit" />
            </form>
          )
        }}
      />
    </>
  )
}
