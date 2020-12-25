import { RatingModel } from "../models/ratingModel"
import { parseRating } from "./parseRating"

export function parseRatings(value: unknown): Array<RatingModel> | undefined {
  if (
    !Array.isArray(value) ||
    value.some((rating) => parseRating(rating) === undefined)
  ) {
    return undefined
  }

  return value
}
