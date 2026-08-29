export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images?: string[];
  description: string;
  features: string[];
  inStock: boolean;
  stockCount: number;
  badge?: string;
  colors?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  color?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  quantity: number;
  color?: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  };
  paymentMethod: string;
  estimatedDelivery: string;
}

export interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: string;
}

export type View = 'home' | 'shop' | 'orders' | 'product';
