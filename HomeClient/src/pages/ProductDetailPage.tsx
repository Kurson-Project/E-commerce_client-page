import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import CardProduk from "@/components/templates/card/CardProduk"
import { ArrowRight } from "lucide-react"
import { useCart } from "@/hooks/useCartProduct"
import { StarRating, StarRatingInput } from "@/components/ui/star-rating"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Recording from "../assets/Recording.mp4"
import useProduct from "@/hooks/useProduct"
import Loading from "@/components/layouts/Loading"
import { formatPrice } from "@/lib/format"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const ProductDetailPage = () => {
    const [userRating, setUserRating] = useState(0);

    const { payment, products, loading } = useProduct()
    const { id } = useParams();
    const product = products.find((item) => item.title === id)

    const Rekomendation = products.filter((item) => item.category === product?.category).slice(0, 2);

    const { addToCart, cart } = useCart();

    const handlePayment = async () => {
        await payment({ id: product?.id || "" });
    };

    if (loading) return <Loading />

    if (!product) return <div className="p-8 text-center text-destructive">Product not found</div>

    return (
        <article
            className="w-full flex flex-col gap-12 p-res-xxl pt-20 overflow-hidden"
            aria-labelledby="product-title"
        >
            <section className="flex md:flex-row flex-col gap-10">
                {/* Gambar Produk */}
                <Carousel className="w-full">
                    <CarouselContent>
                        <CarouselItem>
                            <div className="w-full rounded-2xl overflow-hidden border">
                                <img
                                    src={product.image}
                                    alt={`Product image of ${product.title}`}
                                    className="w-full aspect-[3/2] h-full object-cover"
                                />
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div className="w-full rounded-2xl overflow-hidden border">
                                <video
                                    src={Recording}
                                    className="w-full aspect-[3/2] h-full object-cover"
                                    autoPlay
                                    muted
                                    playsInline
                                    loop
                                />
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselNext className="-translate-x-8" />
                    <CarouselPrevious className="translate-x-8" />
                </Carousel>

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
                    <p className="text-2xl font-semibold text-primary flex gap-2">{formatPrice(product.price)}<span className="text-muted-foreground font-medium line-through">{formatPrice(product.price * 1.2)}</span></p>
                    <div className="flex gap-4">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button aria-label="Buy this product">Buy Now</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent >
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Checkout</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure you want to buy this product?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className="flex gap-4 items-center p-2 border rounded-lg">
                                    <img
                                        src={product.image}
                                        alt={`Checkout preview of ${product.title}`}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div className="flex flex-col gap-1">
                                        <h4 className="font-semibold text-foreground">
                                            {product.title}
                                        </h4>
                                        <Badge>{product.category}</Badge>
                                        <p className="text-xl font-medium flex items-center gap-2">
                                            {formatPrice(product.price)}
                                            <span className="text-muted-foreground line-through">${formatPrice(product.price * 1.2)}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Name</Label>
                                    <Input
                                        type="text"
                                        placeholder="Enter your name"
                                        className="w-full"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Phone Number</Label>
                                    <Input
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        className="w-full"
                                        required
                                    />
                                </div>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handlePayment} >Send Order</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <Button variant="secondary" asChild>
                            <Link to={`/products/modify/${product.title}`}>Modify</Link>
                        </Button>
                        <Button
                            variant="outline"
                            aria-label="Add to cart"
                            onClick={() =>
                                addToCart({
                                    id: product.id,
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
                    <div className="flex flex-col gap-2 pt-4 border-t">
                        <h2 className="text-2xl font-bold text-foreground">Give Your Rating</h2>
                        <StarRatingInput size={30} initialRating={userRating} onChange={setUserRating} />
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
                            <CardProduk key={item.id}
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