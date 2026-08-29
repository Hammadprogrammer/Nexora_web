import { useState } from 'react';
import { StoreProvider, useStore } from '@/store';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { CategoryBar } from '@/components/CategoryBar';
import { ProductGrid } from '@/components/ProductGrid';
import { PromoBanner } from '@/components/PromoBanner';
import { Newsletter } from '@/components/Newsletter';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { OrderSuccessModal } from '@/components/OrderSuccessModal';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { Toasts } from '@/components/Toasts';
import { ShopPage } from '@/components/ShopPage';
import { OrdersPage } from '@/components/OrdersPage';

type View = 'home' | 'shop' | 'orders';

function AppContent() {
  const [view, setView] = useState<View>('home');
  const { setSearchQuery } = useStore();

  const navigate = (v: View) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (cat: string) => {
    setSearchQuery('');
    navigate('shop');
    setTimeout(() => {
      const event = new CustomEvent('category-select', { detail: cat });
      window.dispatchEvent(event);
    }, 100);
  };

  const handleShopNavigate = () => {
    setSearchQuery('');
    navigate('shop');
  };

  return (
    <div className="flex min-h-screen flex-col bg-ink-50">
      <Header currentView={view} onNavigate={navigate} />

      <main className="flex-1">
        {view === 'home' && (
          <>
            <Hero onShop={handleShopNavigate} />
            <CategoryBar onCategoryClick={handleCategoryClick} />
            <ProductGrid
              title="Featured Products"
              subtitle="Handpicked favorites our customers love"
              limit={8}
            />
            <PromoBanner onShop={handleShopNavigate} />
            <ProductGrid
              title="Electronics Highlights"
              subtitle="Latest gadgets and tech essentials"
              filter={(p) => p.category === 'Electronics'}
              limit={4}
            />
            <ProductGrid
              title="Fashion Picks"
              subtitle="Trending styles for every season"
              filter={(p) => p.category === 'Fashion'}
              limit={4}
            />
            <ProductGrid
              title="Beauty Essentials"
              subtitle="Skincare, makeup, and fragrances"
              filter={(p) => p.category === 'Beauty'}
              limit={4}
            />
            <ProductGrid
              title="Home & Kitchen"
              subtitle="Upgrade your living space"
              filter={(p) => p.category === 'Home & Kitchen'}
              limit={4}
            />
            <Newsletter />
          </>
        )}

        {view === 'shop' && (
          <ShopPage />
        )}

        {view === 'orders' && (
          <OrdersPage onContinueShopping={handleShopNavigate} />
        )}
      </main>

      <Footer />

      {/* Overlays */}
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal onViewOrder={() => navigate('orders')} />
      <ProductDetailModal />
      <Toasts />
    </div>
  );
}

function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

export default App;
