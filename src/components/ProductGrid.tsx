import { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from '@/types';
import { products as allProducts } from '@/data/products';
import { useStore } from '@/store';

interface Props {
  title?: string;
  subtitle?: string;
  filter?: (p: Product) => boolean;
  limit?: number;
  showAll?: boolean;
}

export function ProductGrid({ title, subtitle, filter, limit, showAll }: Props) {
  const { searchQuery, setSearchQuery } = useStore();
  const [loading, setLoading] = useState(true);
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      let result = allProducts;
      if (filter) result = result.filter(filter);
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        result = result.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }
      if (limit && !showAll) result = result.slice(0, limit);
      setDisplayProducts(result);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [filter, limit, showAll, searchQuery]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      {title && (
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink-900">{title}</h2>
            {subtitle && <p className="mt-1 text-sm text-ink-500">{subtitle}</p>}
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: limit ?? 8 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-ink-100 bg-white">
              <div className="skeleton aspect-square" />
              <div className="space-y-2 p-4">
                <div className="skeleton h-3 w-16" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-3 w-24" />
                <div className="skeleton h-8 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : displayProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-white py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink-100 text-ink-400">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <h3 className="mt-4 font-display text-lg font-bold text-ink-800">No products found</h3>
          <p className="mt-1 text-sm text-ink-500">Try a different search or category</p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {displayProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </>
      )}
    </section>
  );
}
