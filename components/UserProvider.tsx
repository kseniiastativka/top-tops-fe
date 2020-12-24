import {
  createContext,
  FC,
  Reducer,
  useContext,
  useEffect,
  useReducer,
} from "react"
import cookieCutter from "cookie-cutter"
import { API_PREFIX } from "../constants/api"

export interface User {
  name: string
  id: string
  token: string
}

export type UserState =
  | { type: "logged-out" }
  | ({ type: "logged-in" } & User)
  | { type: "logging-in"; username: string; password: string }
  | { type: "login-fail"; username: string }

export type UserAction =
  | { type: "log-out" }
  | { type: "log-in"; username: string; password: string }

type UserActionPrivate =
  | { type: "fail"; username: string }
  | ({ type: "success" } & User)

const UserContext = createContext<UserState>({ type: "logged-out" })

const UserDispatchContext = createContext<(action: UserAction) => void>(
  () => {},
)

const userReducer: Reducer<UserState, UserAction | UserActionPrivate> = (
  state,
  action,
) => {
  switch (action.type) {
    case "log-out":
      return { type: "logged-out" }

    case "log-in":
      return { ...action, type: "logging-in" }

    case "fail":
      return { ...action, type: "login-fail" }

    case "success":
      return { ...action, type: "logged-in" }
  }
}

export const UserProvider: FC<{ initialState: UserState }> = ({
  children,
  initialState,
}) => {
  const [state, dispatch] = useReducer(userReducer, initialState)

  useEffect(() => {
    switch (state.type) {
      case "logged-in":
        cookieCutter.set(
          "user",
          JSON.stringify({
            name: state.name,
            token: state.token,
            id: state.id,
          }),
        )
        break

      case "logged-out":
        cookieCutter.set("user", "", { expires: new Date(0) })
        break

      case "logging-in":
        fetch(`${API_PREFIX}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: state.username,
            password: state.password,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.statusCode >= 400) {
              throw Error(`Login failed ${res.statusCode}`)
            }

            if (
              typeof res.access_token !== "string" ||
              res.access_token === ""
            ) {
              throw Error("No access token in the auth API response")
            }

            if (typeof res.username !== "string" || res.username === "") {
              throw Error("No username in the auth API response")
            }

            if (typeof res.sub !== "string" || res.sub === "") {
              throw Error("No id (`sub` property) in the auth API response")
            }

            dispatch({
              type: "success",
              token: res.access_token,
              name: res.username,
              id: res.sub,
            })
          })
          .catch((error) => {
            console.error("Login failed", error)
            dispatch({
              type: "fail",
              username: state.username,
            })
          })
        break
    }
  }, [state.type])

  return (
    <UserContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  )
}

export function useUser() {
  return [useContext(UserContext), useContext(UserDispatchContext)] as const
}
