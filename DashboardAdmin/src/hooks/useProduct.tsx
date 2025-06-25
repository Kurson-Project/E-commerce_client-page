// types/product.ts

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
    status: string;
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