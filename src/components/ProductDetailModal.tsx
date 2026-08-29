import { useState } from 'react';
import { X, Heart, ShoppingCart, Plus, Minus, Check, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { useStore } from '@/store';
import { formatPKR } from '@/data/products';
import { StarRating } from './StarRating';

export function ProductDetailModal() {
  const { selectedProduct, setSelectedProduct, addToCart, toggleWishlist, isWishlisted, setCartOpen } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);

  if (!selectedProduct) return null;

  const product = selectedProduct;
  const wished = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  const color = selectedColor ?? product.colors?.[0];

  const handleAddToCart = () => {
    addToCart(product, quantity, color);
    setSelectedProduct(null);
    setQuantity(1);
    setCartOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-[80] bg-ink-950/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedProduct(null)} />
      <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-4">
        <div className="flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl animate-slide-up sm:rounded-2xl">
          {/* Close */}
          <button
            onClick={() => setSelectedProduct(null)}
            className="absolute right-4 top-4 z-10 rounded-lg bg-white/80 p-2 text-ink-600 backdrop-blur transition-colors hover:bg-white hover:text-ink-900"
          >
            <X size={20} />
          </button>

          <div className="flex-1 overflow-y-auto">
            <div className="grid gap-0 md:grid-cols-2">
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-ink-50 md:aspect-auto">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                {product.badge && (
                  <span className="absolute left-4 top-4 rounded-lg bg-ink-900 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                    {product.badge}
                  </span>
                )}
                {discount > 0 && (
                  <span className="absolute left-4 top-12 rounded-lg bg-amber-500 px-2.5 py-1 text-[11px] font-bold text-white">
                    Save {discount}%
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col p-6">
                <span className="text-xs font-semibold uppercase tracking-wide text-teal-600">{product.brand}</span>
                <h2 className="mt-1 font-display text-xl font-bold leading-tight text-ink-900">{product.name}</h2>
                <div className="mt-2 flex items-center gap-3">
                  <StarRating rating={product.rating} showValue reviewCount={product.reviewCount} />
                  {product.inStock && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-teal-600">
                      <Check size={14} /> In Stock
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-display text-3xl font-extrabold text-ink-900">{formatPKR(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-ink-400 line-through">{formatPKR(product.originalPrice)}</span>
                  )}
                </div>

                <p className="mt-4 text-sm leading-relaxed text-ink-600">{product.description}</p>

                {/* Colors */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-500">
                      Color: <span className="text-ink-800">{color}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map(c => (
                        <button
                          key={c}
                          onClick={() => setSelectedColor(c)}
                          className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
                            c === color
                              ? 'border-teal-600 bg-teal-50 text-teal-700'
                              : 'border-ink-200 text-ink-600 hover:border-ink-300'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                <div className="mt-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-500">Key Features</p>
                  <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                    {product.features.map(f => (
                      <li key={f} className="flex items-center gap-1.5 text-xs text-ink-600">
                        <Check size={14} className="shrink-0 text-teal-600" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quantity & Actions */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex items-center gap-1 rounded-xl border border-ink-200 bg-ink-50 p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-600 transition-colors hover:bg-white"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-ink-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-600 transition-colors hover:bg-white"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal-600 py-3 text-sm font-bold text-white shadow-lg shadow-teal-600/20 transition-all hover:bg-teal-700 active:scale-[0.98]"
                  >
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all ${
                      wished ? 'border-red-200 bg-red-50 text-red-500' : 'border-ink-200 text-ink-600 hover:border-ink-300'
                    }`}
                  >
                    <Heart size={20} className={wished ? 'fill-red-500' : ''} />
                  </button>
                </div>

                {/* Trust */}
                <div className="mt-5 grid grid-cols-3 gap-2 border-t border-ink-100 pt-4">
                  <div className="flex flex-col items-center gap-1 text-center">
                    <Truck size={18} className="text-teal-600" />
                    <span className="text-[11px] font-medium text-ink-500">Fast Delivery</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-center">
                    <ShieldCheck size={18} className="text-teal-600" />
                    <span className="text-[11px] font-medium text-ink-500">Secure Payment</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-center">
                    <RotateCcw size={18} className="text-teal-600" />
                    <span className="text-[11px] font-medium text-ink-500">7-Day Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
