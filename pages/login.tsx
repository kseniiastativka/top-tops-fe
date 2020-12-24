import { FC, useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useUser } from "../components/UserProvider"

const Login: FC = () => {
  const [userState, userDispatch] = useUser()
  const router = useRouter()
  const [nameInput, setNameInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")

  useEffect(() => {
    if (userState.type === "logged-in") {
      router
        .push("/")
        .then(() => console.info("Redirect logged-in user to the homepage"))
        .catch(() => {
          console.error("Fail to redirect logged-in user to the homepage")
        })
    }
  }, [userState.type])

  if (userState.type === "logged-in") {
    return null
  }

  return (
    <>
      <Head>
        <title>Log in to top-tops</title>
        <link rel="icon" href={"/favicon.ico"} />
      </Head>

      <form
        onSubmit={(event) => {
          event.preventDefault()

          userDispatch({
            type: "log-in",
            password: passwordInput,
            username: nameInput,
          })
        }}
      >
        <label>
          Username:
          <input
            onChange={({ target: { value } }) => setNameInput(value)}
            type="text"
            required={true}
            value={nameInput}
          />
        </label>

        <br />

        <label>
          Password:
          <input
            onChange={({ target: { value } }) => setPasswordInput(value)}
            type="password"
            required={true}
            value={passwordInput}
          />
        </label>

        <input type="submit" />
      </form>

      {userState.type === "logging-in" && <div>⏳ Logging in...</div>}

      {userState.type === "login-fail" && <div>🛑 Login failed</div>}
    </>
  )
}

export default Login
