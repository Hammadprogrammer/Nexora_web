import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import { useStore } from '@/store';

export function Toasts() {
  const { toasts, dismissToast } = useStore();

  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 sm:right-6">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="animate-toast-in flex items-center gap-3 rounded-xl border border-ink-100 bg-white px-4 py-3 shadow-lg shadow-ink-900/10"
        >
          {toast.type === 'success' && <CheckCircle2 size={20} className="text-teal-600" />}
          {toast.type === 'error' && <XCircle size={20} className="text-red-500" />}
          {toast.type === 'info' && <Info size={20} className="text-ink-500" />}
          <span className="text-sm font-medium text-ink-800">{toast.message}</span>
          <button onClick={() => dismissToast(toast.id)} className="ml-2 text-ink-400 hover:text-ink-600">
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
