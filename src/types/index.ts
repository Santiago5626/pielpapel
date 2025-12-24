export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  function: string[];
  skinType: string[];
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  ingredients: string[];
  usage: string;
  benefits: string[];
  stock: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}