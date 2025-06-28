import { useAuth } from "@/hooks/useAuth"
import { CartContext, type CartItem } from "@/hooks/useCartProduct"
import { useEffect, useState, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import Cookies from "js-cookie"

const CART_COOKIE_KEY = "user_cart"

export const CartProductProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([])
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()

    // Load cart from cookies on initial render
    useEffect(() => {
        const savedCart = Cookies.get(CART_COOKIE_KEY)
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart))
            } catch (error) {
                console.error("Failed to parse cart cookie", error)
            }
        }
    }, [])

    // Save cart to cookies whenever it changes
    useEffect(() => {
        Cookies.set(CART_COOKIE_KEY, JSON.stringify(cart))
    }, [cart])

    const addToCart = (item: CartItem) => {
        if (!isAuthenticated) {
            toast("Please Login First")
            return navigate("/login")
        }

        setCart((prev) => {
            const alreadyExists = prev.some((i) => i.title === item.title)
            if (alreadyExists) {
                toast("Product already in cart")
                return prev
            }
            return [...prev, { ...item, quantity: 1 }]
        })
    }

    const removeFromCart = (title: string) => {
        setCart((prev) => prev.filter((item) => item.title !== title))
    }

    const clearCart = () => {
        setCart([])
        Cookies.remove(CART_COOKIE_KEY)
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}