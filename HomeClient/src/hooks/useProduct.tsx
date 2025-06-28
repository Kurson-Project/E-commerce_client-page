import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

export interface ProductProps {
    id: string;
    title: string;
    image: string;
    price: number;
    category: string;
    description: string;
    features: string[];
    tools: { name: string; icon: string }[];
    rating: number;
    reviews?: {
        user: string;
        comment: string;
        rating: number;
        date: string;
    }[];
}

const API_URI = import.meta.env.VITE_API_URI

const useProduct = () => {
    const [products, setProducts] = useState<ProductProps[]>([])
    const [loading, setLoading] = useState(false)

    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const getAllProducts = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${API_URI}/public/product`, {
                    method: "GET",
                    headers: {
                        "Accept": "*/*",
                        "Content-Type": "application/json",
                    },
                })
                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.message)
                }
                const data = await response.json()
                setProducts(data)
                setLoading(false)
            } catch (error) {
                console.error(error)
            }
        }
        getAllProducts()
    }, [])

    const payment = async ({ id }: { id: string }) => {
        if (!isAuthenticated) return navigate("/login")
        setLoading(true)
        try {
            const response = await fetch(`${API_URI}/user/payment/transaction`, {
                method: "POST",
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("token")}`
                },
                body: JSON.stringify({
                    product_id: id
                })
            })
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message)
            }
            const data = await response.json()
            if (data.token) {
                window.location = data.redirect_url
            }
            setLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    return { products, loading, payment }
}

export default useProduct