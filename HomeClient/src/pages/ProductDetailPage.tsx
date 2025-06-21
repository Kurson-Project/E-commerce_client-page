import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import DataProduct from "@/data/product.json"
import CardProduk from "@/components/templates/card/CardProduk"
import { ArrowRight } from "lucide-react"
import { useCart } from "@/hooks/useCartProduct"
import { StarRating, StarRatingInput } from "@/components/ui/star-rating"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const ProductDetailPage = () => {
    const [userRating, setUserRating] = useState(0)

    const { id } = useParams();
    const product = DataProduct.find((item) => item.title === id)

    const Rekomendation = DataProduct.filter((item) => item.category === product?.category).slice(0, 2);

    const { addToCart, cart } = useCart();

    if (!product) return <div className="p-8 text-center text-destructive">Product not found</div>

    return (
        <article
            className="w-full flex flex-col gap-12 p-res-xxl pt-20 overflow-hidden"
            aria-labelledby="product-title"
        >
            <section className="flex md:flex-row flex-col gap-10">
                {/* Gambar Produk */}
                <div className="w-full rounded-2xl overflow-hidden shadow-lg">
                    <img
                        src={product.image}
                        alt={`Product image of ${product.title}`}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex flex-col gap-4 w-full justify-center max-w-[400px]">
                    <div className="flex flex-col gap-2">
                        <h1 id="product-title" className="text-4xl font-bold text-foreground">
                            {product.title}
                        </h1>
                        <span className="inline-block text-xs uppercase font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full w-fit">
                            {product.category || "Digital Product"}
                        </span>
                    </div>
                    {/* Tools */}
                    <div className="flex flex-wrap gap-3" aria-label="Tools used">
                        {product.tools.map((tool, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm text-muted-foreground shadow-sm"
                            >
                                <img
                                    src={tool.icon}
                                    alt={tool.name}
                                    className="w-4 h-4"
                                />
                                {tool.name}
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <StarRating rating={product.rating} size={16} />
                        <span className="text-sm text-muted-foreground">
                            {product.rating}
                        </span>
                    </div>
                    <p className="text-2xl font-semibold text-primary">${product.price} <span className="text-muted-foreground font-medium line-through">${(product.price * 1.2).toFixed(2)}</span></p>
                    <div className="flex gap-4">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button aria-label="Buy this product">Buy Now</Button>
                            </DialogTrigger>
                            <DialogContent >
                                <DialogHeader>
                                    <DialogTitle>Checkout</DialogTitle>
                                    <DialogDescription>
                                        Are you sure you want to buy this product?
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex gap-4 items-center mb-4">
                                    <img
                                        src={product.image}
                                        alt={`Checkout preview of ${product.title}`}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div>
                                        <h4 className="font-medium text-foreground">
                                            {product.title}
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            ${product.price}
                                        </p>
                                    </div>
                                </div>
                                <Button className="w-full" asChild>
                                    <Link to={`/products/order/${product.title}`}>Buy Now</Link>
                                </Button>
                            </DialogContent>
                        </Dialog>
                        <Button variant="secondary" asChild>
                            <Link to={`/products/modify/${product.title}`}>Modify</Link>
                        </Button>
                        <Button
                            variant="outline"
                            aria-label="Add to cart"
                            onClick={() =>
                                addToCart({
                                    title: product.title,
                                    image: product.image,
                                    price: product.price,
                                    tools: product.tools,
                                    quantity: 1,
                                })
                            }
                            disabled={cart.some((item) => item.title === product.title)}
                        >
                            {cart.some((item) => item.title === product.title)
                                ? "Added to cart"
                                : "Add to cart"}
                        </Button>
                    </div>

                </div>
            </section>

            {/* Detail Produk */}
            <section className="flex md:flex-row flex-col gap-10" aria-label="Product Information">
                <div className="flex flex-col gap-4 w-full">
                    {/* Deskripsi Produk */}
                    <div aria-labelledby="description-heading">
                        <h3 id="description-heading" className="text-2xl font-bold text-foreground mb-6">
                            Description
                        </h3>
                        <p className="text-lg text-foreground">{product.description}</p>
                    </div>

                    {/* Fitur Produk */}
                    <div aria-labelledby="features-heading">
                        <h3 id="features-heading" className="text-2xl font-bold text-foreground mb-6">
                            Features
                        </h3>
                        <ul className="space-y-2">
                            {product.features.map((feature, index) => (
                                <li
                                    key={index}
                                    className="text-lg flex items-start gap-2 text-foreground"
                                >
                                    <span className="text-primary mt-1">•</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="reviews">
                            <AccordionTrigger className="items-center text-primary">
                                <span>Reviews ({product.reviews.length})</span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col gap-4">
                                    {product.reviews.map((review, index) => (
                                        <div key={index} className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2">
                                                <StarRating rating={review.rating} />
                                                <span className="text-sm">({review.rating}/5)</span>
                                            </div>
                                            <p className="text-sm">"{review.comment}"</p>
                                        </div>
                                    ))}
                                    <div className="flex flex-col gap-2 p-2 border rounded-lg">
                                        <p className="font-semibold">Submit your comments</p>
                                        <StarRatingInput initialRating={userRating} onChange={setUserRating} />
                                        <Textarea placeholder="Comment" />
                                        <Button className="w-full">Submit</Button>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                <hr className="my-8" />

                <div className="flex flex-col max-w-[400px]">
                    <div className="flex w-full justify-between">
                        <h3 className="text-2xl font-bold text-foreground">Related Products</h3>
                        <Button variant="link">
                            <Link to={"/products"}>See All</Link>
                            <ArrowRight />
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        {Rekomendation.map((item) => (
                            <CardProduk key={item.title}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                tools={item.tools}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </article>
    )
}

export default ProductDetailPage