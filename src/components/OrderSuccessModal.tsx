import { CheckCircle2, Package, MapPin, Calendar, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '@/store';
import { formatPKR } from '@/data/products';

interface Props {
  onViewOrder: () => void;
}

export function OrderSuccessModal({ onViewOrder }: Props) {
  const { isOrderSuccessOpen, setOrderSuccessOpen, lastOrder } = useStore();

  if (!isOrderSuccessOpen || !lastOrder) return null;

  const handleClose = () => setOrderSuccessOpen(false);

  return (
    <>
      <div className="fixed inset-0 z-[80] bg-ink-950/60 backdrop-blur-sm animate-fade-in" onClick={handleClose} />
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
        <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl animate-scale-in">
          {/* Close */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 z-10 rounded-lg p-2 text-ink-400 transition-colors hover:bg-ink-100"
          >
            <X size={20} />
          </button>

          {/* Success animation header */}
          <div className="flex flex-col items-center bg-gradient-to-br from-teal-500 to-teal-700 px-6 py-8 text-center text-white">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm animate-scale-in">
              <CheckCircle2 size={48} className="text-white" />
            </div>
            <h2 className="mt-4 font-display text-2xl font-extrabold">Thank You!</h2>
            <p className="mt-1 text-sm text-teal-100">Your order has been placed successfully</p>
          </div>

          {/* Order details */}
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-ink-50 px-4 py-3">
                <span className="text-sm font-medium text-ink-500">Order ID</span>
                <span className="font-mono text-sm font-bold text-ink-900">{lastOrder.id}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-ink-50 px-4 py-3">
                <span className="text-sm font-medium text-ink-500">Total Amount</span>
                <span className="text-sm font-extrabold text-teal-600">{formatPKR(lastOrder.total)}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-ink-50 px-4 py-3">
                <span className="text-sm font-medium text-ink-500">Payment Method</span>
                <span className="text-sm font-semibold text-ink-800">{lastOrder.paymentMethod}</span>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-teal-200 bg-teal-50 px-4 py-3">
                <Calendar size={18} className="mt-0.5 shrink-0 text-teal-600" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">Estimated Delivery</p>
                  <p className="text-sm font-bold text-teal-800">{lastOrder.estimatedDelivery}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-ink-100 bg-ink-50 px-4 py-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-ink-400" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Delivery Address</p>
                  <p className="text-sm text-ink-700">{lastOrder.customer.address}, {lastOrder.customer.city}</p>
                </div>
              </div>
            </div>

            {/* Items preview */}
            <div className="mt-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-500">
                {lastOrder.items.length} item{lastOrder.items.length > 1 ? 's' : ''} in this order
              </p>
              <div className="flex gap-2">
                {lastOrder.items.slice(0, 4).map(item => (
                  <img key={item.productId} src={item.image} alt={item.name} className="h-14 w-14 rounded-lg border border-ink-100 object-cover" />
                ))}
                {lastOrder.items.length > 4 && (
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-ink-100 bg-ink-50 text-xs font-bold text-ink-500">
                    +{lastOrder.items.length - 4}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleClose}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-ink-200 bg-white py-3 text-sm font-semibold text-ink-800 transition-all hover:bg-ink-50 active:scale-[0.98]"
              >
                <ShoppingBag size={18} /> Continue Shopping
              </button>
              <button
                onClick={() => { handleClose(); onViewOrder(); }}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal-600 py-3 text-sm font-bold text-white shadow-lg shadow-teal-600/20 transition-all hover:bg-teal-700 active:scale-[0.98]"
              >
                <Package size={18} /> View Order <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
