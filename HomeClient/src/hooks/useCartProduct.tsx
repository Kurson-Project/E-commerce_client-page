import { createContext, useContext } from "react"

export interface CartItem {
    id: string
    title: string
    image: string
    price: number
    quantity: number
    tools: { name: string; icon: string }[]
}

export interface CartContextType {
    cart: CartItem[]
    addToCart: (item: CartItem) => void
    removeFromCart: (title: string) => void
    clearCart: () => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)


export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
