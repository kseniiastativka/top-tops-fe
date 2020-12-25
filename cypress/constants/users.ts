export const RICK = {
  login: "Rick",
  password: "morty",
} as const

export const MORTY = {
  login: "Morty",
  password: "rick",
} as const

export const USER_WITH_INVALID_PASSWORD = {
  login: "Morty",
  password: "Rick",
} as const
