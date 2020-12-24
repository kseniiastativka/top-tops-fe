import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { FC, useEffect } from "react"
import { API_PREFIX } from "../constants/api"
import { getFromCookies } from "../utils/getFromCookies"
import { parseUser } from "../utils/parseUser"
import Head from "next/head"
import { useUser } from "../components/UserProvider"
import { useRouter } from "next/router"

interface UserProfile {
  username: string
}

export const getServerSideProps: GetServerSideProps<{
  profile: UserProfile
}> = async (context) => {
  const userRaw = await getFromCookies("user", context)

  const user = parseUser(userRaw)

  if (user === undefined) {
    return { redirect: { destination: "/login", permanent: false } } as const
  }

  const res = await fetch(`${API_PREFIX}/profile`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })

  if (res.status >= 400) {
    return { redirect: { destination: "/login", permanent: false } } as const
  }

  const data = await res.json()

  const profile = parseUserProfile(data)

  if (profile === undefined) {
    return { redirect: { destination: "/login", permanent: false } } as const
  }

  return {
    props: {
      profile,
    },
  } as const
}

const Profile: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  profile,
}) => {
  const [userState] = useUser()
  const router = useRouter()

  useEffect(() => {
    if (userState.type !== "logged-in") {
      router
        .push("/login")
        .then(() => console.info("Redirect logged-out user to the login page"))
        .catch(() => {
          console.error("Fail to redirect logged-out user to the login page")
        })
    }
  }, [userState.type])

  return (
    <>
      <Head>
        <title>{profile.username}'s profile | top-tops</title>
        <link rel="icon" href={"/favicon.ico"} />
      </Head>

      <div>Username: {profile.username}</div>
    </>
  )
}

export default Profile

function parseUserProfile(value: unknown): UserProfile | undefined {
  if (
    value === undefined ||
    value === null ||
    typeof value["username"] !== "string"
  ) {
    return undefined
  }

  return { username: value["username"] } as const
}
