import type { FC } from "react"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Head from "next/head"
import { getFromCookies } from "../utils/getFromCookies"
import { parseRatings } from "../utils/parseRatings"
import { API_PREFIX } from "../constants/api"
import { parseUser } from "../utils/parseUser"
import { RatingModel } from "../models/ratingModel"
import { RatingPreview } from "../components/RatingPreview"

export const getServerSideProps: GetServerSideProps<{
  userRatings: Array<RatingModel>
}> = async (context) => {
  const userRaw = await getFromCookies("user", context)

  const user = parseUser(userRaw)

  if (user === undefined) {
    return { redirect: { destination: "/login", permanent: false } } as const
  }

  const res = await fetch(`${API_PREFIX}/my-ratings`, {
    headers: { Authorization: `Bearer ${user.token}` },
  })

  if (res.status === 401) {
    return { redirect: { destination: "/login", permanent: false } } as const
  }

  if (res.status >= 400) {
    return { redirect: { destination: "/error", permanent: false } } as const
  }

  const data = await res.json()

  const userRatings = parseRatings(data.userRatings)

  if (data.userRatings !== undefined && userRatings === undefined) {
    console.error("Could not parse ratings")
    return { redirect: { destination: "/error", permanent: false } } as const
  }

  return { props: { userRatings } }
}

const Ratings: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  userRatings,
}) => {
  return (
    <>
      <Head>
        <title>Ratings | top-tops</title>
        <link rel="icon" href={"/favicon.ico"} />
      </Head>

      <h1 className="sr-only">Ratings</h1>

      {userRatings.length > 0 && (
        <section className="mt-6">
          <header>
            <h2>Your ratings</h2>
          </header>

          <ul className="mt-2 space-y-3">
            {userRatings.map((rating) => (
              <li key={rating.id}>
                <RatingPreview rating={rating} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}

export default Ratings
