import type { FC } from "react"
import Link from "next/link"
import { useUser } from "./UserProvider"

export const Layout: FC = ({ children }) => {
  const [userState, userDispatch] = useUser()

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>

            {userState.type === "logged-out" && (
              <li>
                <Link href={"/login"}>
                  <a>Log in</a>
                </Link>
              </li>
            )}

            {userState.type === "logged-in" && (
              <>
                <li>
                  <Link href={"/profile"}>
                    <a>Profile</a>
                  </Link>
                </li>

                <li>
                  Logged in as {userState.name}
                  <button onClick={() => userDispatch({ type: "log-out" })}>
                    Log out
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>

      <main>{children}</main>
    </>
  )
}
