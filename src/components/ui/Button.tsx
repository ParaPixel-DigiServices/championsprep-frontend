import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        style={variant === 'primary' ? {
          background: 'linear-gradient(90deg, #0D0245 0%, #6236EB 100%)' 
        } : {}}
        className={cn(
          "inline-flex items-center justify-center px-10 py-4 text-sm font-bold transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          "font-sans tracking-wide uppercase text-white shadow-xl shadow-indigo-900/20",
          "rounded-2xl", 
          "hover:translate-y-[-2px] hover:shadow-2xl",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";