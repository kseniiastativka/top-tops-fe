import type { FC } from "react"
import Link from "next/link"
import { useUser } from "./UserProvider"

const LINK_CLASS_NAMES = "link py-4 font-bold"

export const Layout: FC = ({ children }) => {
  const [userState] = useUser()

  return (
    <>
      <header className="sticky top-0 z-40 lg:z-50 w-full border-b border-gray-200 bg-white">
        <nav>
          <ul className="container mx-auto px-4 py-1 flex">
            <li className="flex">
              <Link href="/">
                <a className={LINK_CLASS_NAMES}>Home</a>
              </Link>
            </li>

            {userState.type === "logged-out" && (
              <li className="flex ml-auto">
                <Link href={"/login"}>
                  <a className={LINK_CLASS_NAMES}>Log in</a>
                </Link>
              </li>
            )}

            {userState.type === "logged-in" && (
              <>
                <li className="flex ml-4">
                  <Link href={"/my-ratings"}>
                    <a className={LINK_CLASS_NAMES}>My Ratings</a>
                  </Link>
                </li>

                <li className="flex ml-4">
                  <Link href={"/profile"}>
                    <a className={LINK_CLASS_NAMES}>Profile</a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-1">{children}</main>
    </>
  )
}
