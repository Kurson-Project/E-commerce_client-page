import { useCart } from "@/hooks/useCartProduct"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { formatPrice } from "@/lib/format"
import useProduct from "@/hooks/useProduct"

export default function ProductCartPage() {
    const { cart, removeFromCart, clearCart } = useCart()
    const navigate = useNavigate()

    const { isAuthenticated } = useAuth()
    const { payment } = useProduct()

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    )

    if (!isAuthenticated) return <Navigate to="/login" />

    if (cart.length === 0) {
        return (
            <section className="min-h-screen flex flex-col items-center justify-center text-center p-10">
                <h1 className="text-3xl font-bold mb-4">🛒 Your cart is empty</h1>
                <p className="text-muted-foreground mb-6">Browse our products and add something to your cart!</p>
                <Button onClick={() => navigate("/products")}>Explore Products</Button>
            </section>
        )
    }

    return (
        <section className="min-h-screen p-6 py-20 max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold">🛍️ Your Shopping Cart</h1>

            {/* Daftar Produk di Cart */}
            <div className="space-y-4">
                {cart.map((item) => (
                    <div
                        key={item.title}
                        className="flex md:flex-row flex-col items-center justify-between gap-4 p-4 border rounded-lg bg-muted/30 shadow-sm"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{formatPrice(item.price)}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button
                                onClick={async () => await payment({ id: item.id})}
                                size="sm"
                            >
                                Buy
                            </Button>

                            <Button
                                asChild
                                size="sm"
                            >
                                <Link to={`/products/details/${item.title}`}>Details</Link>
                            </Button>

                            {/* Hapus Item */}
                            <Button
                                size="icon"
                                variant="destructive"
                                onClick={() => removeFromCart(item.title)}
                                title="Remove from cart"
                            >
                                <Trash2 />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Ringkasan dan Checkout */}
            <div className="flex flex-col items-end gap-4">
                <p className="text-lg font-semibold">
                    Total: <span className="text-primary">{formatPrice(totalPrice)}</span>
                </p>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={clearCart}>
                        Clear Cart
                    </Button>
                </div>
            </div>
        </section>
    )
}