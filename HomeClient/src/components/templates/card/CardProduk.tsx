import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CardProdukProps {
    title: string;
    image: string;
    price: number;
    tools: {
        name: string;
        icon: string;
    }[];
    rating: number;
    className?: string;
}

const CardProduk = ({ title, image, price, tools, className, rating }: CardProdukProps) => {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/products/details/${title}`)} className={`cursor-pointer w-full h-full group relative rounded-lg overflow-hidden border hover:shadow-lg bg-card transition-all duration-300 ease-in-out ${className}`}>
            <div className="aspect-[6/4] overflow-hidden border-b relative">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                />
            </div>
            <div className="flex flex-col p-2">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold mb-2 truncate w-0 flex-1">{title}</h2>
                    <h2 className="text-lg mb-2 whitespace-nowrap">${price}</h2>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                        {tools.map((tool, index) => (
                            <div key={index} className="flex items-center gap-1">
                                <img src={tool.icon} alt={tool.name} className="w-4 h-4" />
                                <span className="text-sm">{tool.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-1">
                        <StarRatingDisplay rating={rating} size={16} />
                        <span className="text-sm">{rating}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface StarRatingDisplayProps {
    rating: number
    size?: number
}

export const StarRatingDisplay = ({ rating, size = 20 }: StarRatingDisplayProps) => {
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


export default CardProduk;