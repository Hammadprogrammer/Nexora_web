import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Heart, Package, Menu, X, ChevronDown } from 'lucide-react';
import { useStore } from '@/store';
import { cities } from '@/data/products';

interface Props {
  currentView: string;
  onNavigate: (view: 'home' | 'shop' | 'orders') => void;
}

const navCategories = ['Electronics', 'Fashion', 'Beauty', 'Home & Kitchen'];

function selectCategory(cat: string, onNavigate: (v: 'shop') => void) {
  onNavigate('shop');
  setTimeout(() => {
    window.dispatchEvent(new CustomEvent('category-select', { detail: cat }));
  }, 100);
}

export function Header({ currentView, onNavigate }: Props) {
  const { cartCount, wishlist, searchQuery, setSearchQuery, setCartOpen, selectedCity, setSelectedCity } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cityDropdown, setCityDropdown] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'Home', view: 'home' as const },
    { label: 'Shop', view: 'shop' as const },
    { label: 'Orders', view: 'orders' as const },
  ];

  return (
    <>
      {/* Top bar */}
      <div className="hidden bg-ink-950 text-ink-200 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs">
          <p className="font-medium">Free delivery on orders above Rs 5,000 across Pakistan</p>
          <div className="flex items-center gap-4">
            <span>Helpline: 0800-NEXORA</span>
            <span className="text-ink-700">|</span>
            <span>Track your order anytime</span>
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 shadow-md shadow-ink-900/5 backdrop-blur-md' : 'bg-white'
      }`}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-4 py-4">
            {/* Logo */}
            <button onClick={() => onNavigate('home')} className="flex shrink-0 items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-lg shadow-teal-600/20">
                <span className="font-display text-lg font-extrabold">N</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-xl font-extrabold tracking-tight text-ink-900">Nexora<span className="text-teal-600">.pk</span></span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-ink-400">Premium Shopping</span>
              </div>
            </button>

            {/* City selector */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setCityDropdown(!cityDropdown)}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-50"
              >
                <span className="text-teal-600">Deliver to:</span>
                <span className="font-semibold text-ink-800">{selectedCity}</span>
                <ChevronDown size={14} className={`transition-transform ${cityDropdown ? 'rotate-180' : ''}`} />
              </button>
              {cityDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setCityDropdown(false)} />
                  <div className="absolute left-0 top-full z-20 mt-1 max-h-64 w-48 overflow-y-auto rounded-xl border border-ink-100 bg-white p-1.5 shadow-xl shadow-ink-900/10">
                    {cities.map(city => (
                      <button
                        key={city}
                        onClick={() => { setSelectedCity(city); setCityDropdown(false); }}
                        className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                          city === selectedCity ? 'bg-teal-50 text-teal-700' : 'text-ink-700 hover:bg-ink-50'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Search */}
            <div className="relative flex-1 max-w-xl">
              <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => onNavigate('shop')}
                placeholder="Search for products, brands, categories..."
                className="w-full rounded-xl border border-ink-200 bg-ink-50 py-2.5 pl-11 pr-4 text-sm text-ink-900 placeholder-ink-400 transition-all focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/10"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => onNavigate('orders')}
                className={`hidden rounded-xl p-2.5 transition-colors hover:bg-ink-50 sm:block ${currentView === 'orders' ? 'text-teal-600' : 'text-ink-600'}`}
                title="My Orders"
              >
                <Package size={22} />
              </button>
              <button
                onClick={() => onNavigate('shop')}
                className={`relative hidden rounded-xl p-2.5 transition-colors hover:bg-ink-50 sm:block ${currentView === 'shop' ? 'text-teal-600' : 'text-ink-600'}`}
                title="Wishlist"
              >
                <Heart size={22} />
                {wishlist.length > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-white">
                    {wishlist.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setCartOpen(true)}
                className="relative rounded-xl p-2.5 text-ink-600 transition-colors hover:bg-ink-50"
                title="Cart"
              >
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute right-0.5 top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-600 px-1 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-xl p-2.5 text-ink-600 transition-colors hover:bg-ink-50 lg:hidden"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden items-center gap-1 border-t border-ink-100 py-2 lg:flex">
            {navItems.map(item => (
              <button
                key={item.view}
                onClick={() => onNavigate(item.view)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  currentView === item.view
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
                }`}
              >
                {item.label}
              </button>
            ))}
            <span className="mx-2 text-ink-300">|</span>
            {navCategories.map(cat => (
              <button
                key={cat}
                onClick={() => selectCategory(cat, onNavigate)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-ink-500 transition-colors hover:bg-ink-50 hover:text-ink-800"
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="animate-fade-in border-t border-ink-100 bg-white lg:hidden">
            <div className="space-y-1 p-4">
              {navItems.map(item => (
                <button
                  key={item.view}
                  onClick={() => { onNavigate(item.view); setMobileMenuOpen(false); }}
                  className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-semibold transition-colors ${
                    currentView === item.view ? 'bg-teal-50 text-teal-700' : 'text-ink-700 hover:bg-ink-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2">
                <label className="px-4 text-xs font-semibold uppercase tracking-wide text-ink-400">Categories</label>
                <div className="mt-1 flex flex-wrap gap-2 px-4 pb-2">
                  {navCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => { selectCategory(cat, onNavigate); setMobileMenuOpen(false); }}
                      className="rounded-lg bg-ink-50 px-3 py-2 text-xs font-semibold text-ink-700 transition-colors hover:bg-teal-50 hover:text-teal-700"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="pt-2">
                <label className="px-4 text-xs font-semibold uppercase tracking-wide text-ink-400">Deliver to</label>
                <select
                  value={selectedCity}
                  onChange={e => setSelectedCity(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-sm font-medium text-ink-800"
                >
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
