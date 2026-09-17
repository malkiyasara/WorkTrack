import React from "react";
import PropTypes from "prop-types";

const Input = ({ label, icon: Icon, ...props }) => {
  return (
    <div className="w-full space-y-1.5">
      {label && <label className="text-xs font-bold text-slate-500">{label}</label>}
      <div className="relative">
        {Icon && (
          <Icon
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}
        <input
          {...props}
          className={`w-full bg-white border border-slate-200 rounded-xl py-2 text-xs font-semibold text-slate-700 
            focus:outline-none focus:ring-4 focus:ring-purple-400/20 focus:border-purple-600 transition-all disabled:opacity-50
            ${Icon ? "pl-9 pr-3" : "px-3"}`}
        />
      </div>
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.elementType,
};

export default Input;