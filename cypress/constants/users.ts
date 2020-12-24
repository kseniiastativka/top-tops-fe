export const Rick = {
  login: "Rick",
  password: "morty",
} as const

export const Morty = {
  login: "Morty",
  password: "rick",
} as const

export const UserWithInvalidPassword = {
  login: "Morty",
  password: "Rick",
} as const
