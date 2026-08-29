import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '@/store';
import { formatPKR } from '@/data/products';

export function CartDrawer() {
  const {
    isCartOpen, setCartOpen, cart, updateQuantity, removeFromCart,
    cartSubtotal, shippingCost, cartTotal, setCheckoutOpen, cartCount,
  selectedCity,
  } = useStore();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-ink-950/50 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-ink-50 shadow-2xl transition-transform duration-300 ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink-100 bg-white px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-teal-600" />
            <h2 className="font-display text-lg font-bold text-ink-900">Your Cart</h2>
            {cartCount > 0 && (
              <span className="rounded-full bg-teal-100 px-2 py-0.5 text-xs font-bold text-teal-700">{cartCount}</span>
            )}
          </div>
          <button onClick={() => setCartOpen(false)} className="rounded-lg p-2 text-ink-500 transition-colors hover:bg-ink-100">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ink-100 text-ink-400">
                <ShoppingBag size={36} />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-ink-800">Your cart is empty</h3>
              <p className="mt-1 text-sm text-ink-500">Add products to get started</p>
              <button
                onClick={() => setCartOpen(false)}
                className="mt-5 rounded-xl bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.product.id + (item.color ?? '')} className="flex gap-3 rounded-xl border border-ink-100 bg-white p-3">
                  <img src={item.product.image} alt={item.product.name} className="h-20 w-20 shrink-0 rounded-lg object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-semibold text-teal-600">{item.product.brand}</p>
                        <h4 className="text-sm font-semibold leading-tight text-ink-900 line-clamp-2">{item.product.name}</h4>
                        {item.color && <p className="mt-0.5 text-xs text-ink-500">{item.color}</p>}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="shrink-0 rounded-lg p-1.5 text-ink-400 transition-colors hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1 rounded-lg border border-ink-200 bg-ink-50 p-0.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-md text-ink-600 transition-colors hover:bg-white hover:text-ink-900"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-ink-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-md text-ink-600 transition-colors hover:bg-white hover:text-ink-900"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="text-sm font-extrabold text-ink-900">
                        {formatPKR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-ink-100 bg-white p-5">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-ink-600">
                <span>Subtotal</span>
                <span className="font-semibold text-ink-900">{formatPKR(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-ink-600">
                <span>Shipping to {selectedCity}</span>
                <span className="font-semibold text-ink-900">{formatPKR(shippingCost)}</span>
              </div>
              <div className="flex justify-between border-t border-ink-100 pt-2 text-base">
                <span className="font-bold text-ink-900">Total</span>
                <span className="font-extrabold text-teal-600">{formatPKR(cartTotal)}</span>
              </div>
            </div>
            <button
              onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-600/20 transition-all hover:bg-teal-700 active:scale-[0.98]"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
