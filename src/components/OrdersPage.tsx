import { Package, ChevronDown, MapPin, Calendar, CreditCard, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '@/store';
import { formatPKR } from '@/data/products';
import type { Order } from '@/types';

export function OrdersPage({ onContinueShopping }: { onContinueShopping: () => void }) {
  const { orders } = useStore();
  const [expanded, setExpanded] = useState<string | null>(null);

  if (orders.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-24 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ink-100 text-ink-400">
          <Package size={40} />
        </div>
        <h2 className="mt-5 font-display text-2xl font-bold text-ink-900">No Orders Yet</h2>
        <p className="mt-2 text-sm text-ink-500">When you place an order, it will appear here with full details and tracking information.</p>
        <button
          onClick={onContinueShopping}
          className="mt-6 flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-teal-600/20 transition-all hover:bg-teal-700 active:scale-[0.98]"
        >
          <ShoppingBag size={18} /> Start Shopping
        </button>
      </div>
    );
  }

  const statusColor = (status: Order['status']) => {
    switch (status) {
      case 'Processing': return 'bg-amber-100 text-amber-700';
      case 'Shipped': return 'bg-blue-100 text-blue-700';
      case 'Delivered': return 'bg-teal-100 text-teal-700';
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-extrabold text-ink-900">Order History</h1>
        <p className="mt-1 text-sm text-ink-500">Track and manage all your orders in one place</p>
      </div>

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm">
            {/* Order header */}
            <button
              onClick={() => setExpanded(expanded === order.id ? null : order.id)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-ink-50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <Package size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-mono text-sm font-bold text-ink-900">{order.id}</h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${statusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-ink-500">
                    Placed on {new Date(order.date).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-extrabold text-ink-900">{formatPKR(order.total)}</p>
                  <p className="text-xs text-ink-500">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                </div>
                <ChevronDown size={20} className={`text-ink-400 transition-transform ${expanded === order.id ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {/* Expanded details */}
            {expanded === order.id && (
              <div className="animate-fade-in border-t border-ink-100 p-5">
                {/* Items */}
                <div className="space-y-3">
                  {order.items.map(item => (
                    <div key={item.productId + (item.color ?? '')} className="flex gap-3">
                      <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg border border-ink-100 object-cover" />
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-teal-600">{item.brand}</p>
                        <h4 className="text-sm font-semibold text-ink-900">{item.name}</h4>
                        {item.color && <p className="text-xs text-ink-500">{item.color}</p>}
                        <p className="mt-1 text-xs text-ink-500">Qty: {item.quantity} × {formatPKR(item.price)}</p>
                      </div>
                      <span className="text-sm font-bold text-ink-900">{formatPKR(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="mt-4 grid gap-4 rounded-xl bg-ink-50 p-4 sm:grid-cols-2">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-ink-600">
                      <MapPin size={16} className="text-ink-400" />
                      <span>{order.customer.address}, {order.customer.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-ink-600">
                      <Calendar size={16} className="text-ink-400" />
                      <span>Est. delivery: {order.estimatedDelivery}</span>
                    </div>
                    <div className="flex items-center gap-2 text-ink-600">
                      <CreditCard size={16} className="text-ink-400" />
                      <span>{order.paymentMethod}</span>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-ink-600">
                      <span>Subtotal</span><span>{formatPKR(order.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-ink-600">
                      <span>Shipping</span><span>{formatPKR(order.shipping)}</span>
                    </div>
                    <div className="flex justify-between border-t border-ink-200 pt-1.5 text-base font-bold text-ink-900">
                      <span>Total</span><span className="text-teal-600">{formatPKR(order.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Tracking */}
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    {['Processing', 'Shipped', 'Delivered'].map((step, i) => {
                      const isActive = ['Processing', 'Shipped', 'Delivered'].indexOf(order.status) >= i;
                      return (
                        <div key={step} className="flex flex-1 items-center">
                          <div className="flex flex-col items-center">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                              isActive ? 'bg-teal-600 text-white' : 'bg-ink-100 text-ink-400'
                            }`}>
                              {i + 1}
                            </div>
                            <span className={`mt-1 text-[11px] font-semibold ${isActive ? 'text-teal-700' : 'text-ink-400'}`}>
                              {step}
                            </span>
                          </div>
                          {i < 2 && (
                            <div className={`mx-2 h-0.5 flex-1 rounded-full ${isActive ? 'bg-teal-600' : 'bg-ink-100'}`} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
