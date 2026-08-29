import { Heart, ShoppingCart, Eye } from 'lucide-react';
import type { Product } from '@/types';
import { useStore } from '@/store';
import { formatPKR } from '@/data/products';
import { StarRating } from './StarRating';

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const { addToCart, toggleWishlist, isWishlisted, setSelectedProduct } = useStore();
  const wished = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink-900/8">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-ink-50">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="rounded-lg bg-ink-900 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-md">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-lg bg-amber-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-md">
              -{discount}%
            </span>
          )}
        </div>
        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full shadow-md transition-all ${
            wished ? 'bg-red-500 text-white' : 'bg-white/90 text-ink-600 hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart size={18} className={wished ? 'fill-white' : ''} />
        </button>
        {/* Quick view */}
        <button
          onClick={() => setSelectedProduct(product)}
          className="absolute bottom-3 left-1/2 flex -translate-x-1/2 translate-y-12 items-center gap-2 rounded-xl bg-white/95 px-4 py-2 text-xs font-semibold text-ink-800 opacity-0 shadow-lg backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Eye size={16} /> Quick View
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-teal-600">{product.brand}</span>
        <h3
          onClick={() => setSelectedProduct(product)}
          className="mt-1 cursor-pointer text-sm font-semibold leading-snug text-ink-900 transition-colors hover:text-teal-700 line-clamp-2"
        >
          {product.name}
        </h3>
        <div className="mt-2">
          <StarRating rating={product.rating} showValue reviewCount={product.reviewCount} />
        </div>
        <div className="mt-auto pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-ink-900">{formatPKR(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-ink-400 line-through">{formatPKR(product.originalPrice)}</span>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-ink-900 py-2.5 text-sm font-semibold text-white transition-all hover:bg-teal-600 active:scale-[0.98]"
          >
            <ShoppingCart size={16} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
