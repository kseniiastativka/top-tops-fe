import type { FC } from "react"
import type { User } from "../components/UserProvider"
import { UserProvider, UserState } from "../components/UserProvider"
import { Layout } from "../components/Layout"
import "../styles/globals.css"
import { RouterContext } from "next/dist/next-server/lib/router-context"
import { createRouter } from "next/router"
import MyApp from "../pages/_app"
import Home from "../pages"

const router = createRouter("", {}, "", {
  async subscription() {},
  wrapApp: () => {},
  pageLoader: {
    getPageList() {
      return []
    },
  },
  isFallback: false,
  initialProps: {},
  App: MyApp,
  Component: Home,
})

/**
 * This is a Storybook's version of the root `<MyApp />`
 * It should be kept in sync with `<MyApp />` so that the Storybook output is
 * close to the real app
 */
export function createRootComponent<TProps>(Component: FC<TProps>) {
  return (config?: { user?: User; pageProps?: TProps }) => {
    const initialUserState: UserState =
      config.user === undefined
        ? { type: "logged-out" }
        : { type: "logged-in", ...config.user }

    return (
      <RouterContext.Provider value={router}>
        <UserProvider initialState={initialUserState}>
          <Layout>
            <Component {...config.pageProps} />
          </Layout>
        </UserProvider>
      </RouterContext.Provider>
    )
  }
}
