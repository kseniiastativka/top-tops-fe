export interface RatingModel {
  id: string
  author: { id: string; name: string }
  name: string
  items: Array<{
    name: string
    id: string
  }>
  visibility: "private" | "public"
}
