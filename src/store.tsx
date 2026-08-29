import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Product, CartItem, Order, CheckoutForm } from '@/types';
import { products, shippingRates } from '@/data/products';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface StoreContextValue {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  shippingCost: number;
  cartTotal: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  orders: Order[];
  addOrder: (order: Order) => void;
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
  dismissToast: (id: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  checkoutForm: CheckoutForm;
  setCheckoutForm: (form: CheckoutForm) => void;
  clearCheckoutForm: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;
  lastOrder: Order | null;
  setLastOrder: (o: Order | null) => void;
  isOrderSuccessOpen: boolean;
  setOrderSuccessOpen: (open: boolean) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch { /* ignore */ }
}

const DEFAULT_CHECKOUT: CheckoutForm = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: 'Karachi',
  paymentMethod: 'cod',
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => loadFromStorage('nexora_cart', []));
  const [wishlist, setWishlist] = useState<string[]>(() => loadFromStorage('nexora_wishlist', []));
  const [orders, setOrders] = useState<Order[]>(() => loadFromStorage('nexora_orders', []));
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [selectedCity, setSelectedCity] = useState('Karachi');
  const [checkoutForm, setCheckoutForm] = useState<CheckoutForm>(DEFAULT_CHECKOUT);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [isOrderSuccessOpen, setOrderSuccessOpen] = useState(false);

  useEffect(() => { saveToStorage('nexora_cart', cart); }, [cart]);
  useEffect(() => { saveToStorage('nexora_wishlist', wishlist); }, [wishlist]);
  useEffect(() => { saveToStorage('nexora_orders', orders); }, [orders]);

  const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToCart = useCallback((product: Product, quantity = 1, color?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.color === color);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.color === color
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stockCount) }
            : item
        );
      }
      return [...prev, { product, quantity, color: color ?? product.colors?.[0] }];
    });
    showToast(`${product.name} added to cart`);
  }, [showToast]);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item =>
      item.product.id === productId
        ? { ...item, quantity: Math.min(quantity, item.product.stockCount) }
        : item
    ));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist', 'info');
        return prev.filter(id => id !== productId);
      }
      showToast('Added to wishlist');
      return [...prev, productId];
    });
  }, [showToast]);

  const isWishlisted = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);

  const addOrder = useCallback((order: Order) => {
    setOrders(prev => [order, ...prev]);
  }, []);

  const clearCheckoutForm = useCallback(() => {
    setCheckoutForm(DEFAULT_CHECKOUT);
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = cart.length > 0 ? (shippingRates[selectedCity] ?? 250) : 0;
  const cartTotal = cartSubtotal + shippingCost;

  const value: StoreContextValue = {
    cart, addToCart, removeFromCart, updateQuantity, clearCart,
    cartCount, cartSubtotal, shippingCost, cartTotal,
    wishlist, toggleWishlist, isWishlisted,
    orders, addOrder,
    toasts, showToast, dismissToast,
    selectedCity, setSelectedCity,
    checkoutForm, setCheckoutForm, clearCheckoutForm,
    searchQuery, setSearchQuery,
    selectedProduct, setSelectedProduct,
    isCartOpen, setCartOpen,
    isCheckoutOpen, setCheckoutOpen,
    lastOrder, setLastOrder,
    isOrderSuccessOpen, setOrderSuccessOpen,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

export { products };
