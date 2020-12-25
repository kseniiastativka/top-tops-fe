import type { FC } from "react"
import Head from "next/head"
import { useUser } from "../components/UserProvider"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { RatingModel } from "../models/ratingModel"
import { API_PREFIX } from "../constants/api"
import { parseRatings } from "../utils/parseRatings"
import { RatingPreview } from "../components/RatingPreview"

export const getServerSideProps: GetServerSideProps<{
  publicRatings: Array<RatingModel>
}> = async () => {
  const res = await fetch(API_PREFIX)

  if (res.status >= 400) {
    return { redirect: { destination: "/error", permanent: false } } as const
  }

  const data = await res.json()

  const publicRatings = parseRatings(data.publicRatings)

  if (publicRatings === undefined) {
    console.error("Could not parse ratings")
    return { redirect: { destination: "/error", permanent: false } } as const
  }

  return { props: { publicRatings } }
}

const Home: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  publicRatings,
}) => {
  const [userState] = useUser()

  return (
    <div>
      <Head>
        <title>top-tops</title>
        <link rel="icon" href={"/favicon.ico"} />
      </Head>

      {userState.type === "logged-in" ? (
        <h1>{userState.name}, welcome to TopTops!</h1>
      ) : (
        <h1>Welcome to TopTops!</h1>
      )}

      {publicRatings.length > 0 && (
        <section className="mt-8">
          <header>
            <h2>Some ratings from our users</h2>
          </header>

          <ul className="mt-5 space-y-3">
            {publicRatings.map((rating) => {
              return (
                <li key={rating.id}>
                  <RatingPreview rating={rating} isAuthorVisible={true} />
                </li>
              )
            })}
          </ul>
        </section>
      )}
    </div>
  )
}

export default Home
