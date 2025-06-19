import { useAuth } from "@/hooks/useAuth"
import { CartContext, type CartItem } from "@/hooks/useCartProduct"
import { useState, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export const CartProductProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([])

    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()

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

    const clearCart = () => setCart([])

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}
