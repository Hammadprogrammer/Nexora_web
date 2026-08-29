import { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useStore } from '@/store';

export function Newsletter() {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Successfully subscribed to our newsletter!');
    setEmail('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink-950 via-ink-900 to-teal-950 px-6 py-12 md:px-12 md:py-16">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="relative flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/20 text-teal-400 backdrop-blur">
            <Mail size={28} />
          </div>
          <h2 className="mt-5 font-display text-2xl font-extrabold text-white md:text-3xl">
            Get Exclusive Deals & Updates
          </h2>
          <p className="mt-2 max-w-md text-sm text-ink-300">
            Subscribe to our newsletter and be the first to know about new arrivals, special offers, and promotions.
          </p>
          {submitted ? (
            <div className="mt-6 flex items-center gap-2 rounded-xl bg-teal-500/20 px-6 py-3.5 text-teal-300 backdrop-blur">
              <CheckCircle2 size={20} />
              <span className="text-sm font-semibold">Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 rounded-xl border border-ink-700 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-ink-400 backdrop-blur transition-all focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-teal-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-500/25 transition-all hover:bg-teal-400 active:scale-[0.98]"
              >
                Subscribe <ArrowRight size={18} />
              </button>
            </form>
          )}
          <p className="mt-3 text-xs text-ink-500">No spam, unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  );
}
