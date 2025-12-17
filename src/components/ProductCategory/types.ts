export interface Product {
	id: string;
	title: string;
	price: number;
	image: string;
	category: string;
	seller: string;
	stock: number;
	condition: string;
	description: string;
	trending?: boolean;
	trendingBadge?: string;
}

export interface CartItem extends Product {
	quantity: number;
}
