"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-ink2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`block w-full px-3 py-2 border border-edge rounded-lg shadow-sm placeholder-ink3 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm ${
            error ? "border-bad focus:ring-bad focus:border-bad" : ""
          } ${className}`}
          {...props}
        />
        {error && <p className="text-sm text-bad">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
