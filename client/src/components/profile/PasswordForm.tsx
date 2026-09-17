import PropTypes from "prop-types";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";

const PasswordForm = ({ 
  passwordData, showPasswords, updatingPassword, onChange, onToggleVisibility, onSubmit }) => (
  <form onSubmit={onSubmit} className="bg-white border border-slate-100 
    rounded-2xl p-6 shadow-sm shadow-slate-100/50 space-y-5">
    <div className="border-b border-slate-100 pb-4">
      <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
        <Lock size={16} className="text-purple-500" />
        Security & Password
      </h3>
    </div>

    <div className="space-y-1.5">
      <label className="text-xs font-bold text-slate-500">Current Password</label>
      <div className="relative">
        <input
          type={showPasswords.current ? "text" : "password"}
          name="currentPassword"
          value={passwordData.currentPassword}
          onChange={onChange}
          placeholder="••••••••••••"
          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 pr-10 text-xs 
            font-semibold tracking-widest text-slate-700 focus:outline-none 
            focus:ring-4 focus:ring-purple-400/20 focus:border-purple-600 transition-all"
          required
          disabled={updatingPassword}
        />
        <button
          type="button"
          onClick={() => onToggleVisibility("current")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        >
          {showPasswords.current ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-500">New Password</label>
        <div className="relative">
          <input
            type={showPasswords.new ? "text" : "password"}
            name="newPassword"
            value={passwordData.newPassword}
            onChange={onChange}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 pr-10 text-xs 
              font-semibold tracking-widest text-slate-700 focus:outline-none focus:ring-4 
              focus:ring-purple-400/20 focus:border-purple-600 transition-all"
            required
            disabled={updatingPassword}
          />
          <button
            type="button"
            onClick={() => onToggleVisibility("new")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            tabIndex={-1}
          >
            {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-500">Confirm New Password</label>
        <div className="relative">
          <input
            type={showPasswords.confirm ? "text" : "password"}
            name="confirmNewPassword"
            value={passwordData.confirmNewPassword}
            onChange={onChange}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 pr-10 text-xs 
              font-semibold tracking-widest text-slate-700 focus:outline-none focus:ring-4 
              focus:ring-purple-400/20 focus:border-purple-600 transition-all"
            required
            disabled={updatingPassword}
          />
          <button
            type="button"
            onClick={() => onToggleVisibility("confirm")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            tabIndex={-1}
          >
            {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>
    </div>

    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 
      border-t border-slate-50">
      <p className="text-[10px] text-slate-400 font-semibold leading-normal max-w-sm">
        Use at least 12 characters, including numbers and symbols for a strong password protection scheme.
      </p>
      <button 
        type="submit" 
        disabled={updatingPassword}
        className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl text-xs 
          font-bold transition-all border border-purple-100 active:scale-95 whitespace-nowrap flex items-center 
          gap-1.5 disabled:opacity-50"
      >
        {updatingPassword && <Loader2 size={13} className="animate-spin" />}
        {updatingPassword ? "Updating..." : "Update Password"}
      </button>
    </div>
  </form>
);

PasswordForm.propTypes = {
  passwordData: PropTypes.object.isRequired,
  showPasswords: PropTypes.object.isRequired,
  updatingPassword: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleVisibility: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default PasswordForm;