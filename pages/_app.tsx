import type { PropsWithChildren } from "react"
import App, { AppContext, AppProps } from "next/app"
import { Layout } from "../components/Layout"
import { User, UserProvider, UserState } from "../components/UserProvider"
import { getFromCookies } from "../utils/getFromCookies"
import "../styles/globals.css"
import { parseUser } from "../utils/parseUser"

interface AppPropsWithMaybeUser extends AppProps {
  pageProps: PropsWithChildren<{ user?: User }>
}

function MyApp({ Component, pageProps }: AppPropsWithMaybeUser) {
  const initialUserState: UserState =
    pageProps.user === undefined
      ? { type: "logged-out" }
      : { type: "logged-in", ...pageProps.user }

  return (
    <UserProvider initialState={initialUserState}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const userRaw = await getFromCookies("user", appContext.ctx)

  const user = parseUser(userRaw)

  if (user === undefined) {
    return App.getInitialProps(appContext)
  }

  const appProps = await App.getInitialProps(appContext)

  return { ...appProps, pageProps: { ...appProps.pageProps, user } }
}

export default MyApp
