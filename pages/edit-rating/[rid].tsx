import { GetServerSideProps } from "next"
import { API_PREFIX } from "../../constants/api"
import { parseRating } from "../../utils/parseRating"
import { RatingModel } from "../../models/ratingModel"
import { getFromCookies } from "../../utils/getFromCookies"
import { parseUser } from "../../utils/parseUser"
import { RatingForm } from "../../components/RatingForm"

export const getServerSideProps: GetServerSideProps<{
  rating: RatingModel
}> = async (context) => {
  const userRaw = await getFromCookies("user", context)

  const user = parseUser(userRaw)

  if (user === undefined) {
    return { redirect: { destination: "/login", permanent: false } } as const
  }

  const res = await fetch(`${API_PREFIX}/my-ratings/${context.query.rid}`, {
    headers: { Authorization: `Bearer ${user.token}` },
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

export default RatingForm
