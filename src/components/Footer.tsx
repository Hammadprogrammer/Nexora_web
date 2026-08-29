import { Truck, ShieldCheck, RotateCcw, HeadphonesIcon } from 'lucide-react';

export function Footer() {
  const features = [
    { icon: Truck, title: 'Fast Delivery', desc: '2-4 business days nationwide' },
    { icon: ShieldCheck, title: 'Secure Payments', desc: 'Your data is always protected' },
    { icon: RotateCcw, title: 'Easy Returns', desc: '7-day return policy' },
    { icon: HeadphonesIcon, title: '24/7 Support', desc: 'We are here to help' },
  ];

  return (
    <footer className="mt-16">
      {/* Features strip */}
      <div className="border-t border-ink-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {features.map(f => (
              <div key={f.title} className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <f.icon size={22} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink-900">{f.title}</h4>
                  <p className="text-xs text-ink-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-ink-950 text-ink-300">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <div className="grid gap-8 md:grid-cols-5">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 text-white">
                  <span className="font-display text-lg font-extrabold">N</span>
                </div>
                <span className="font-display text-xl font-extrabold text-white">Nexora<span className="text-teal-500">.pk</span></span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">
                Pakistan's premier online shopping destination. Quality products, unbeatable prices, and reliable delivery you can trust.
              </p>
              <div className="mt-5 flex gap-2">
                <span className="rounded-lg bg-ink-900 px-3 py-1.5 text-xs font-medium text-ink-300">Visa</span>
                <span className="rounded-lg bg-ink-900 px-3 py-1.5 text-xs font-medium text-ink-300">Mastercard</span>
                <span className="rounded-lg bg-ink-900 px-3 py-1.5 text-xs font-medium text-ink-300">EasyPaisa</span>
                <span className="rounded-lg bg-ink-900 px-3 py-1.5 text-xs font-medium text-ink-300">JazzCash</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide text-white">Shop</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><a href="#" className="text-ink-400 transition-colors hover:text-teal-400">Electronics</a></li>
                <li><a href="#" className="text-ink-400 transition-colors hover:text-teal-400">Fashion</a></li>
                <li><a href="#" className="text-ink-400 transition-colors hover:text-teal-400">Beauty</a></li>
                <li><a href="#" className="text-ink-400 transition-colors hover:text-teal-400">Home & Kitchen</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide text-white">Support</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><a href="#" className="text-ink-400 transition-colors hover:text-teal-400">Track Order</a></li>
                <li><a href="#" className="text-ink-400 transition-colors hover:text-teal-400">Returns & Refunds</a></li>
                <li><a href="#" className="text-ink-400 transition-colors hover:text-teal-400">Shipping Info</a></li>
                <li><a href="#" className="text-ink-400 transition-colors hover:text-teal-400">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide text-white">Company</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><a href="#" className="text-ink-400 transition-colors hover:text-teal-400">About Us</a></li>
                <li><a href="#" className="text-ink-400 transition-colors hover:text-teal-400">Careers</a></li>
                <li><a href="#" className="text-ink-400 transition-colors hover:text-teal-400">Privacy Policy</a></li>
                <li><a href="#" className="text-ink-400 transition-colors hover:text-teal-400">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-800 pt-6 md:flex-row">
            <p className="text-xs text-ink-500">© 2026 Nexora.pk — All rights reserved.</p>
            <p className="text-xs text-ink-500">Made with care for shoppers across Pakistan</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
