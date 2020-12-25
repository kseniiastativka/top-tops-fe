import type { FC } from "react"
import type { RatingModel } from "../models/ratingModel"
import Link from "next/link"

export const RatingPreview: FC<{
  rating: RatingModel
  isAuthorVisible?: boolean
}> = ({ rating, isAuthorVisible = false }) => {
  return (
    <Link href={`/rating/${rating.id}`}>
      <a className="no-underline text-current">
        <article className="relative rounded shadow divide-y divide-gray-100 cursor-pointer hover:shadow-lg transition-shadow">
          <header>
            <h3 className="p-4">
              <span>{rating.name}</span>
              {isAuthorVisible && <span> by {rating.author.name}</span>}
            </h3>
          </header>

          {rating.items.length > 0 && (
            <ul>
              {rating.items.map((item) => {
                return (
                  <li className="px-4 py-2" key={item.name}>
                    {item.name}
                  </li>
                )
              })}
            </ul>
          )}
        </article>
      </a>
    </Link>
  )
}
