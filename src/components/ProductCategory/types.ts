export type Product = {
    id: string | number;
    title: string;
    description: string;
    price: number;
    image: string;
    seller: string;
    stock: number;
    trendingBadge?: string;
    category: string; // added
    trending?: boolean; // added
};

// CartItem extends Product with quantity
export type CartItem = Product & { quantity: number };