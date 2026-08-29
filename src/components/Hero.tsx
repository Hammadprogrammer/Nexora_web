import { ArrowRight, Truck, ShieldCheck, RotateCcw } from 'lucide-react';

interface Props {
  onShop: () => void;
}

export function Hero({ onShop }: Props) {
  return (
    <section className="relative overflow-hidden bg-ink-950">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-900 to-teal-950" />
      <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
      <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* Text */}
          <div className="animate-slide-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold text-teal-300">
              <span className="flex h-2 w-2 rounded-full bg-teal-400" />
              Pakistan's #1 Online Marketplace
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              Shop Smarter,<br />
              <span className="bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent">
                Live Better
              </span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-300">
              Discover premium electronics, fashion, beauty, and more — delivered to your doorstep across Pakistan with fast, reliable shipping.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={onShop}
                className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-500/25 transition-all hover:bg-teal-400 active:scale-[0.98]"
              >
                Start Shopping <ArrowRight size={18} />
              </button>
              <button
                onClick={onShop}
                className="inline-flex items-center gap-2 rounded-xl border border-ink-700 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur transition-all hover:bg-white/10 active:scale-[0.98]"
              >
                Explore Deals
              </button>
            </div>
            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-sm text-ink-300">
                <Truck size={18} className="text-teal-400" />
                <span>Fast Nationwide Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-ink-300">
                <ShieldCheck size={18} className="text-teal-400" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-ink-300">
                <RotateCcw size={18} className="text-teal-400" />
                <span>7-Day Returns</span>
              </div>
            </div>
          </div>

          {/* Image collage */}
          <div className="relative hidden md:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.pexels.com/photos/14979013/pexels-photo-14979013.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Premium smartphone"
                  className="h-48 w-full rounded-2xl object-cover shadow-2xl ring-1 ring-white/10"
                />
                <img
                  src="https://images.pexels.com/photos/27046146/pexels-photo-27046146.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Leather handbag"
                  className="h-64 w-full rounded-2xl object-cover shadow-2xl ring-1 ring-white/10"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Wireless headphones"
                  className="h-64 w-full rounded-2xl object-cover shadow-2xl ring-1 ring-white/10"
                />
                <img
                  src="https://images.pexels.com/photos/19845610/pexels-photo-19845610.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Sneakers"
                  className="h-48 w-full rounded-2xl object-cover shadow-2xl ring-1 ring-white/10"
                />
              </div>
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-4 -left-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-3 backdrop-blur-md">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full bg-teal-400 ring-2 ring-ink-950" />
                <div className="h-8 w-8 rounded-full bg-amber-400 ring-2 ring-ink-950" />
                <div className="h-8 w-8 rounded-full bg-ink-400 ring-2 ring-ink-950" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">50,000+ Happy Customers</p>
                <p className="text-xs text-ink-400">Across Pakistan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
