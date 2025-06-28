import Cookies from "js-cookie";
import { useEffect, useState } from "react";

// Review type
export interface Review {
    user: string;
    rating: number;
    date: string;
}

// Tool type
export interface Tool {
    name: string;
    icon: string;
}

// Product type
export interface Product {
    id: string;
    title: string;
    image: string;
    price: number;
    category: string;
    description: string;
    features: string[];
    tools: Tool[];
    rating: number;
    sales: number;
    status: "Active" | "Inactive";
    reviews: Review[];
    createdAt: string;
    updatedAt: string;
    revenue: number;
}

// Product category type
export type ProductCategory = 'Website Templates' | 'AI Agents';

// Props for components that receive a product
export interface ProductProps {
    product: Product;
}

// Props for components that receive an array of products
export interface ProductsProps {
    products: Product[];
}

// Props for product list components with filtering capabilities
export interface ProductListProps {
    products: Product[];
    category?: ProductCategory;
    status?: Product['status'];
    maxPrice?: number;
    minRating?: number;
}

export interface ProductUploadProps {
    title: string;
    image: string;
    price: number;
    category: string;
    description: string;
    features: string[];
    tools: Tool[];
    rating: number;
}

const API_URI = import.meta.env.VITE_API_URI

export const useProduct = () => {
    const [errorAdd, setErrorAdd] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_URI}/admin/ec/product`, {
                    method: "GET",
                    headers: {
                        "Accept": "*/*",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${Cookies.get("token")}`
                    },
                });
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const createProduct = async ({
        title,
        image,
        price,
        category,
        description,
        features,
        tools,
        rating,
    }: ProductUploadProps) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URI}/admin/ec/product`, {
                method: "POST",
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("token")}`
                },
                body: JSON.stringify({
                    title,
                    image,
                    price,
                    category,
                    description,
                    features,
                    tools,
                    rating,
                })
            })
            if (!response.ok) {
                setErrorAdd(`HTTP error! status: ${response.status}`);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setProducts(data);
            setLoading(false);
            return true
        } catch (error) {
            console.error(error);
            setErrorAdd((error as Error).message);
            setLoading(false);
            return false
        }
    };

    return {
        createProduct,
        errorAdd,
        loading,
        products
    };
}