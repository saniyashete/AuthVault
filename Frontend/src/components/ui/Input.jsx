import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function Input({ type, name, placeholder, value, onChange, icon: Icon }) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="relative">
      {Icon && (
        <Icon
          className="
        absolute
        left-3
        top-1/2
        -translate-y-1/2
        text-gray-400
        "
          size={20}
        />
      )}

      <input
        type={isPassword && showPassword ? "text" : type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
        w-full
        pl-10
        pr-10
        py-3
        rounded-xl
        border
        border-gray-300
        outline-none
        transition
        focus:border-teal-500
        focus:ring-2
        focus:ring-teal-200
        "
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          text-gray-400
          "
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
}

export default Input;
