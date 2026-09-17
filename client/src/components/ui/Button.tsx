import React from "react";
import PropTypes from "prop-types";
import { Loader2 } from "lucide-react";

const Button = ({ children, variant = "primary", loading, disabled, ...props }) => {
  const baseStyles = "px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white shadow-md shadow-purple-100",
    secondary: "bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600",
    danger: "bg-red-50 hover:bg-red-100 border border-red-200 text-red-600",
  };

  return (
    <button
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]}`}
      {...props}
    >
      {loading && <Loader2 size={13} className="animate-spin" />}
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Button;