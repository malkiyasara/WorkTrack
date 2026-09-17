import PropTypes from "prop-types";
import { User, Mail, Loader2 } from "lucide-react";

const PersonalInfoForm = ({ personalInfo, updatingInfo, onChange, onSubmit, onDiscard }) => (
  <form onSubmit={onSubmit} className="bg-white border border-slate-100 rounded-2xl p-6 
    shadow-sm shadow-slate-100/50 space-y-5">
    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
      <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
        <User size={16} className="text-purple-500" />
        Personal Information
      </h3>
      <span className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white 
        text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
        Basic Info
      </span>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-500">First Name</label>
        <input
          type="text"
          name="firstName"
          value={personalInfo.firstName}
          onChange={onChange}
          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs 
            font-semibold text-slate-700 focus:outline-none focus:ring-4 focus:ring-purple-400/20 
            focus:border-purple-600 transition-all"
          required
          disabled={updatingInfo}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-500">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={personalInfo.lastName}
          onChange={onChange}
          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs 
            font-semibold text-slate-700 focus:outline-none focus:ring-4 focus:ring-purple-400/20 
            focus:border-purple-600 transition-all"
          required
          disabled={updatingInfo}
        />
      </div>
    </div>

    <div className="space-y-1.5">
      <label className="text-xs font-bold text-slate-500">Email Address</label>
      <div className="relative">
        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="email"
          name="email"
          value={personalInfo.email}
          onChange={onChange}
          className="w-full bg-white border border-slate-200 pl-9 pr-3 py-2 
          rounded-xl text-xs font-semibold text-slate-700 focus:outline-none 
          focus:ring-4 focus:ring-purple-400/20 focus:border-purple-600 transition-all"
          required
          disabled={updatingInfo}
        />
      </div>
    </div>

    <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-50">
      <button 
        type="button" 
        onClick={onDiscard}
        className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600
          rounded-xl text-xs font-bold transition-colors active:scale-95 disabled:opacity-50"
        disabled={updatingInfo}
      >
        Discard
      </button>
      
      <button 
        type="submit" 
        disabled={updatingInfo}
        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 
          hover:to-indigo-600 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-100 
          transition-all active:scale-95 flex items-center gap-1.5 disabled:opacity-50"
      >
        {updatingInfo && <Loader2 size={13} className="animate-spin" />}
        {updatingInfo ? "Saving..." : "Save Changes"}
      </button>
    </div>
  </form>
);

PersonalInfoForm.propTypes = {
  personalInfo: PropTypes.object.isRequired,
  updatingInfo: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired 
};

export default PersonalInfoForm;