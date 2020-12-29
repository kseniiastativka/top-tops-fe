import type { RatingModel } from "../models/ratingModel"

export const PUBLIC_RATINGS_MOCK: Array<RatingModel> = [
  {
    id: "1",
    items: [
      { name: "First item", id: "1" },
      { name: "Second item", id: "2" },
    ],
    name: "First rating",
    author: { id: "1", name: "First author" },
    visibility: "public",
  },
  {
    id: "2",
    items: [
      { name: "First item", id: "1" },
      { name: "Second item", id: "1" },
    ],
    name: "Second rating",
    author: { id: "2", name: "Second author" },
    visibility: "public",
  },
]
