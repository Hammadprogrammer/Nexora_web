import { useState, useMemo, useEffect } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { products } from '@/data/products';
import { useStore } from '@/store';
import { ProductCard } from './ProductCard';

const allCategories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
const allBrands = ['All', ...Array.from(new Set(products.map(p => p.brand)))];

export function ShopPage() {
  const { searchQuery } = useStore();
  const [category, setCategory] = useState('All');
  const [brand, setBrand] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const cat = (e as CustomEvent<string>).detail;
      if (cat) setCategory(cat);
    };
    window.addEventListener('category-select', handler);
    return () => window.removeEventListener('category-select', handler);
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];
    if (category !== 'All') result = result.filter(p => p.category === category);
    if (brand !== 'All') result = result.filter(p => p.brand === brand);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'discount':
        result.sort((a, b) => {
          const da = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
          const db = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
          return db - da;
        });
        break;
    }
    return result;
  }, [category, brand, sortBy, searchQuery]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-3xl font-extrabold text-ink-900">Shop All Products</h1>
        <p className="mt-1 text-sm text-ink-500">Discover {products.length} premium products across all categories</p>
      </div>

      {/* Toolbar */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:bg-ink-50 lg:hidden"
        >
          <SlidersHorizontal size={16} /> Filters
        </button>

        {/* Categories */}
        <div className="flex flex-1 flex-wrap gap-2">
          {allCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                category === cat
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                  : 'bg-white text-ink-600 ring-1 ring-ink-100 hover:bg-ink-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink-700"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="discount">Biggest Discount</option>
        </select>
      </div>

      {/* Brand filter (desktop) */}
      <div className="mb-6 hidden items-center gap-2 lg:flex">
        <span className="text-sm font-semibold text-ink-500">Brand:</span>
        {allBrands.map(b => (
          <button
            key={b}
            onClick={() => setBrand(b)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              brand === b
                ? 'bg-ink-900 text-white'
                : 'bg-white text-ink-600 ring-1 ring-ink-100 hover:bg-ink-50'
            }`}
          >
            {b}
          </button>
        ))}
      </div>

      {/* Mobile filters */}
      {showFilters && (
        <div className="mb-6 animate-fade-in rounded-xl border border-ink-100 bg-white p-4 lg:hidden">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold text-ink-800">Filters</h3>
            <button onClick={() => setShowFilters(false)}><X size={18} className="text-ink-500" /></button>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-ink-500">Brand</label>
              <select
                value={brand}
                onChange={e => setBrand(e.target.value)}
                className="mt-1 w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm"
              >
                {allBrands.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Products count */}
      <p className="mb-4 text-sm text-ink-500">
        Showing <span className="font-bold text-ink-800">{filtered.length}</span> of {products.length} products
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-white py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink-100 text-ink-400">
            <SlidersHorizontal size={28} />
          </div>
          <h3 className="mt-4 font-display text-lg font-bold text-ink-800">No products match your filters</h3>
          <p className="mt-1 text-sm text-ink-500">Try adjusting your filters or search</p>
          <button
            onClick={() => { setCategory('All'); setBrand('All'); }}
            className="mt-4 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
