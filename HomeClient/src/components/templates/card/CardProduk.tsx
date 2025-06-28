import { StarRating } from "@/components/ui/star-rating";
import { formatPrice } from "@/lib/format";
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
                    <h2 className="font-medium mb-2 whitespace-nowrap">{formatPrice(price)}</h2>
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
                        <StarRating rating={rating} size={16} />
                        <span className="text-sm">{rating}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default CardProduk;