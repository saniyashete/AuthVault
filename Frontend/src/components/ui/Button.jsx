import { Loader2 } from "lucide-react";

function Button({ children, type, loading, disabled }) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className="
      w-full
      py-3
      rounded-xl
      bg-teal-500
      text-white
      font-semibold
      transition
      hover:bg-teal-600
      disabled:opacity-60
      disabled:cursor-not-allowed
      flex
      items-center
      justify-center
      gap-2
      "
    >
      {loading && <Loader2 size={20} className="animate-spin" />}

      {children}
    </button>
  );
}

export default Button;
