import type { FC } from "react"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Head from "next/head"
import Link from "next/link"
import { getFromCookies } from "../../utils/getFromCookies"
import { API_PREFIX } from "../../constants/api"
import { parseUser } from "../../utils/parseUser"
import type { RatingModel } from "../../models/ratingModel"
import { parseRating } from "../../utils/parseRating"
import { useUser } from "../../components/UserProvider"
import { useRouter } from "next/router"

export const getServerSideProps: GetServerSideProps<{
  rating: RatingModel
}> = async (context) => {
  const userRaw = await getFromCookies("user", context)

  const user = parseUser(userRaw)

  const headers =
    user === undefined ? {} : { Authorization: `Bearer ${user.token}` }

  const res =
    user === undefined
      ? await fetch(`${API_PREFIX}/public-ratings/${context.query.rid}`)
      : await fetch(`${API_PREFIX}/my-ratings/${context.query.rid}`, {
          headers,
        })

  if (res.status === 401) {
    return { redirect: { destination: "/login", permanent: false } } as const
  }

  if (res.status >= 400) {
    return { redirect: { destination: "/error", permanent: false } } as const
  }

  const data = await res.json()

  const rating = parseRating(data)

  if (rating === undefined) {
    console.error("Could not parse rating")
    return { redirect: { destination: "/error", permanent: false } } as const
  }

  return { props: { rating } }
}

const COLOR_CLASS_NAMES = [
  "from-yellow-300 to-yellow-400",
  "from-gray-300 to-gray-400",
  "from-yellow-500 to-yellow-600",
] as const

const RatingPage: FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ rating }) => {
  const [userState] = useUser()
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{rating.name} | top-tops</title>
        <link rel="icon" href={"/favicon.ico"} />
      </Head>

      <h1>{rating.name}</h1>

      <Link href={`/edit-rating/${rating.id}`}>
        <a>Edit</a>
      </Link>

      <button
        className="button ml-4 bg-red-400"
        onClick={async () => {
          if (
            userState.type === "logged-in" &&
            confirm(`Are you sure you want to delete "${rating.name}"?`)
          ) {
            const res = await fetch(`${API_PREFIX}/my-ratings/${rating.id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userState.token}`,
              },
            })

            if (res.status === 401) {
              await router.push("/login")
            }

            if (res.status >= 400) {
              await router.push("/login")
            }

            await router.push("/my-ratings")
          }
        }}
      >
        Delete
      </button>

      <ol className="list-decimal list-inside mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {rating.items.map((item, i) => {
          const colorClassNames =
            COLOR_CLASS_NAMES[i] ?? "from-white to-gray-100"

          return (
            <li
              className={`p-3 font-semibold rounded-md bg-gradient-to-br ${colorClassNames}`}
              key={item.name}
            >
              {item.name}
            </li>
          )
        })}
      </ol>
    </>
  )
}

export default RatingPage
