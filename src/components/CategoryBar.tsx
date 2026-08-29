import { Smartphone, Shirt, Sparkles, Coffee, ArrowRight } from 'lucide-react';
import { products } from '@/data/products';

const iconMap: Record<string, typeof Smartphone> = {
  Smartphone,
  Shirt,
  Sparkles,
  Coffee,
};

interface Props {
  onCategoryClick: (category: string) => void;
}

const cats = [
  { name: 'Electronics', icon: 'Smartphone', desc: 'Phones, laptops & gadgets' },
  { name: 'Fashion', icon: 'Shirt', desc: 'Clothing, shoes & bags' },
  { name: 'Beauty', icon: 'Sparkles', desc: 'Makeup & fragrances' },
  { name: 'Home & Kitchen', icon: 'Coffee', desc: 'Appliances & decor' },
];

export function CategoryBar({ onCategoryClick }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-900">Shop by Category</h2>
          <p className="mt-1 text-sm text-ink-500">Find exactly what you're looking for</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {cats.map(cat => {
          const Icon = iconMap[cat.icon];
          const count = products.filter(p => p.category === cat.name).length;
          return (
            <button
              key={cat.name}
              onClick={() => onCategoryClick(cat.name)}
              className="group relative overflow-hidden rounded-2xl border border-ink-100 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-600/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                <Icon size={24} />
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-ink-900">{cat.name}</h3>
              <p className="mt-1 text-xs text-ink-500">{cat.desc}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="rounded-full bg-ink-50 px-2.5 py-0.5 text-[11px] font-bold text-ink-500">{count} products</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 opacity-0 transition-opacity group-hover:opacity-100">
                  Browse <ArrowRight size={14} />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
