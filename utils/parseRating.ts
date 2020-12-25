import type { RatingModel } from "../models/ratingModel"

export function parseRating(value: unknown): RatingModel | undefined {
  if (
    value === undefined ||
    value === null ||
    typeof value["id"] !== "string" ||
    typeof value["name"] !== "string" ||
    !Array.isArray(value["items"])
  ) {
    return undefined
  }

  return {
    id: value["id"],
    name: value["name"],
    visibility: value["visibility"],
    author: value["author"],
    items: value["items"],
  }
}
