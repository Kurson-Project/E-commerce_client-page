import { Star } from "lucide-react"
import { useState } from "react"

interface StarRatingDisplayProps {
    rating: number
    size?: number
}

export const StarRating = ({ rating, size = 20 }: StarRatingDisplayProps) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating - fullStars >= 0.1 && rating - fullStars < 0.9
    const roundedStars = Math.round(rating)

    return (
        <div className="flex gap-1 items-center">
            {Array.from({ length: 5 }, (_, i) => {
                if (i < fullStars) {
                    return <Star key={i} size={size} className="text-yellow-400 fill-yellow-400" />
                } else if (i === fullStars && hasHalfStar) {
                    return (
                        <div key={i} className="relative">
                            <Star size={size} className="text-muted-foreground" />
                            <Star
                                size={size}
                                className="text-yellow-400 fill-yellow-400 absolute top-0 left-0 overflow-hidden"
                                style={{ clipPath: "inset(0 50% 0 0)" }}
                            />
                        </div>
                    )
                } else if (i < roundedStars) {
                    return <Star key={i} size={size} className="text-yellow-400 fill-yellow-400" />
                } else {
                    return <Star key={i} size={size} className="text-muted-foreground" />
                }
            })}
        </div>
    )
}

interface StarRatingInputProps {
  initialRating?: number
  size?: number
  onChange?: (rating: number) => void
}

export const StarRatingInput = ({
  initialRating = 0,
  size = 24,
  onChange,
}: StarRatingInputProps) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)
  const [selectedStar, setSelectedStar] = useState(initialRating)

  const handleClick = (index: number) => {
    setSelectedStar(index)
    onChange?.(index)
  }

  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: 5 }, (_, i) => {
        const index = i + 1
        const isActive = hoveredStar ? index <= hoveredStar : index <= selectedStar

        return (
          <button
            type="button"
            key={index}
            onClick={() => handleClick(index)}
            onMouseEnter={() => setHoveredStar(index)}
            onMouseLeave={() => setHoveredStar(null)}
            className="p-0 m-0 bg-transparent border-none cursor-pointer"
          >
            <Star
              size={size}
              className={isActive ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}
            />
          </button>
        )
      })}
    </div>
  )
}
