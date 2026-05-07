import { ButtonHTMLAttributes } from "react";

export default function Button({ children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={{
        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        color: "#fff",
        boxShadow: "0 4px 15px rgba(99,102,241,0.25)",
      }}
    >
      {children}
    </button>
  );
}
