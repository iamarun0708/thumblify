import { useEffect } from "react";

const toastStyles = {
  success: "bg-emerald-500/90 text-white",
  error: "bg-red-500/90 text-white",
  info: "bg-brand-purple/90 text-white"
};

const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast.message) return;
    const timer = setTimeout(onClose, 2800);
    return () => clearTimeout(timer);
  }, [toast.message, onClose]);

  if (!toast.message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div
        className={`rounded-2xl px-5 py-3 text-sm font-medium shadow-lg backdrop-blur-sm ${
          toastStyles[toast.type] || toastStyles.info
        }`}
      >
        {toast.message}
      </div>
    </div>
  );
};

export default Toast;