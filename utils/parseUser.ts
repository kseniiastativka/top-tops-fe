import type { User } from "../components/UserProvider"

export function parseUser(value: unknown): User | undefined {
  if (
    value !== undefined &&
    value !== null &&
    typeof value["name"] === "string" &&
    typeof value["id"] === "string" &&
    typeof value["token"] === "string"
  ) {
    return {
      name: value["name"],
      id: value["id"],
      token: value["token"],
    }
  }

  return undefined
}
