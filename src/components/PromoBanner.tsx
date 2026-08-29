import { ArrowRight } from 'lucide-react';

interface Props {
  onShop: () => void;
}

export function PromoBanner({ onShop }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-4 md:grid-cols-2">
        {/* Deal 1 */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 p-6 md:p-8">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-white/5" />
          <div className="relative">
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">Limited Time</span>
            <h3 className="mt-3 font-display text-2xl font-extrabold text-white">Up to 40% Off Electronics</h3>
            <p className="mt-1 text-sm text-amber-50">Smartphones, laptops, headphones & more</p>
            <button
              onClick={onShop}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-amber-700 transition-all hover:bg-amber-50 active:scale-[0.98]"
            >
              Shop Now <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Deal 2 */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-600 to-teal-800 p-6 md:p-8">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-white/5" />
          <div className="relative">
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">New Season</span>
            <h3 className="mt-3 font-display text-2xl font-extrabold text-white">Fashion Collection 2026</h3>
            <p className="mt-1 text-sm text-teal-50">Trending styles in clothing, shoes & bags</p>
            <button
              onClick={onShop}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-teal-700 transition-all hover:bg-teal-50 active:scale-[0.98]"
            >
              Explore Collection <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
