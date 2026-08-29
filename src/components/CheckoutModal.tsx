import { useState } from 'react';
import { X, ChevronRight, Lock, Loader2, CheckCircle2 } from 'lucide-react';
import { useStore } from '@/store';
import { formatPKR, paymentMethods, cities } from '@/data/products';
import type { Order, OrderItem } from '@/types';

function generateOrderId() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `NX-${ts}${rand}`;
}

function getEstimatedDelivery() {
  const date = new Date();
  date.setDate(date.getDate() + 4);
  return date.toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export function CheckoutModal() {
  const {
    isCheckoutOpen, setCheckoutOpen, cart, cartSubtotal, shippingCost, cartTotal,
    checkoutForm, setCheckoutForm, selectedCity, setSelectedCity,
    clearCart, clearCheckoutForm, addOrder, setLastOrder, setOrderSuccessOpen,
    showToast,
  } = useStore();

  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isCheckoutOpen) return null;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!checkoutForm.name.trim()) e.name = 'Please enter your full name';
    if (!checkoutForm.email.trim()) e.email = 'Please enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkoutForm.email)) e.email = 'Please enter a valid email';
    if (!checkoutForm.phone.trim()) e.phone = 'Please enter your phone number';
    else if (!/^(\+92|0)?3\d{9}$/.test(checkoutForm.phone.replace(/\s/g, ''))) e.phone = 'Enter a valid Pakistani number (e.g. 03001234567)';
    if (!checkoutForm.address.trim()) e.address = 'Please enter your delivery address';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;
    setProcessing(true);

    setTimeout(() => {
      const orderItems: OrderItem[] = cart.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        brand: item.product.brand,
        image: item.product.image,
        price: item.product.price,
        quantity: item.quantity,
        color: item.color,
      }));

      const paymentName = paymentMethods.find(p => p.id === checkoutForm.paymentMethod)?.name ?? 'Cash on Delivery';

      const order: Order = {
        id: generateOrderId(),
        date: new Date().toISOString(),
        items: orderItems,
        subtotal: cartSubtotal,
        shipping: shippingCost,
        total: cartTotal,
        status: 'Processing',
        customer: {
          name: checkoutForm.name,
          email: checkoutForm.email,
          phone: checkoutForm.phone,
          address: checkoutForm.address,
          city: selectedCity,
        },
        paymentMethod: paymentName,
        estimatedDelivery: getEstimatedDelivery(),
      };

      addOrder(order);
      setLastOrder(order);
      setProcessing(false);
      setCheckoutOpen(false);
      clearCart();
      clearCheckoutForm();
      setOrderSuccessOpen(true);
      showToast('Order placed successfully!');
    }, 2000);
  };

  return (
    <>
      <div className="fixed inset-0 z-[80] bg-ink-950/60 backdrop-blur-sm animate-fade-in" onClick={() => !processing && setCheckoutOpen(false)} />
      <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-4">
        <div className="flex max-h-[95vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl animate-slide-up sm:rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-ink-100 px-6 py-4">
            <div>
              <h2 className="font-display text-xl font-bold text-ink-900">Checkout</h2>
              <p className="text-xs text-ink-500">Complete your order securely</p>
            </div>
            <button
              onClick={() => !processing && setCheckoutOpen(false)}
              className="rounded-lg p-2 text-ink-500 transition-colors hover:bg-ink-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid gap-6 md:grid-cols-5">
              {/* Form */}
              <div className="space-y-4 md:col-span-3">
                <div>
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink-500">Contact Information</h3>
                  <div className="space-y-3">
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={checkoutForm.name}
                        onChange={e => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                        className="input-field"
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={checkoutForm.email}
                        onChange={e => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                        className="input-field"
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Phone Number (e.g. 03001234567)"
                        value={checkoutForm.phone}
                        onChange={e => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                        className="input-field"
                      />
                      {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink-500">Delivery Address</h3>
                  <div className="space-y-3">
                    <textarea
                      placeholder="House #, Street, Area, Landmark"
                      value={checkoutForm.address}
                      onChange={e => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                      rows={2}
                      className="input-field resize-none"
                    />
                    {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
                    <select
                      value={selectedCity}
                      onChange={e => setSelectedCity(e.target.value)}
                      className="input-field"
                    >
                      {cities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink-500">Payment Method</h3>
                  <div className="space-y-2">
                    {paymentMethods.map(method => (
                      <button
                        key={method.id}
                        onClick={() => setCheckoutForm({ ...checkoutForm, paymentMethod: method.id })}
                        className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                          checkoutForm.paymentMethod === method.id
                            ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-500/10'
                            : 'border-ink-200 hover:border-ink-300'
                        }`}
                      >
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                          checkoutForm.paymentMethod === method.id ? 'bg-teal-600 text-white' : 'bg-ink-100 text-ink-500'
                        }`}>
                          {method.id === 'cod' && '💵'}
                          {method.id === 'card' && '💳'}
                          {method.id === 'easypaisa' && '👛'}
                          {method.id === 'jazzcash' && '📱'}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-ink-900">{method.name}</p>
                          <p className="text-xs text-ink-500">{method.desc}</p>
                        </div>
                        <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                          checkoutForm.paymentMethod === method.id ? 'border-teal-600 bg-teal-600' : 'border-ink-300'
                        }`}>
                          {checkoutForm.paymentMethod === method.id && <CheckCircle2 size={12} className="text-white" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="md:col-span-2">
                <div className="rounded-xl border border-ink-100 bg-ink-50 p-4">
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink-500">Order Summary</h3>
                  <div className="max-h-40 space-y-2 overflow-y-auto">
                    {cart.map(item => (
                      <div key={item.product.id + (item.color ?? '')} className="flex gap-2 text-xs">
                        <img src={item.product.image} alt="" className="h-10 w-10 rounded-md object-cover" />
                        <div className="flex-1">
                          <p className="font-semibold text-ink-800 line-clamp-1">{item.product.name}</p>
                          <p className="text-ink-500">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-semibold text-ink-800">{formatPKR(item.product.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 space-y-1.5 border-t border-ink-200 pt-3 text-sm">
                    <div className="flex justify-between text-ink-600">
                      <span>Subtotal</span><span>{formatPKR(cartSubtotal)}</span>
                    </div>
                    <div className="flex justify-between text-ink-600">
                      <span>Shipping</span><span>{formatPKR(shippingCost)}</span>
                    </div>
                    <div className="flex justify-between border-t border-ink-200 pt-1.5 text-base font-bold text-ink-900">
                      <span>Total</span><span className="text-teal-600">{formatPKR(cartTotal)}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-teal-50 p-3 text-xs text-teal-700">
                  <Lock size={14} />
                  <span>Your information is encrypted and secure</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-ink-100 bg-white p-4">
            <button
              onClick={handlePlaceOrder}
              disabled={processing || cart.length === 0}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-600/20 transition-all hover:bg-teal-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {processing ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Processing Order...
                </>
              ) : (
                <>
                  Place Order — {formatPKR(cartTotal)} <ChevronRight size={18} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
