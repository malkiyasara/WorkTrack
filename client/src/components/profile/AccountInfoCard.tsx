import PropTypes from "prop-types";

const AccountInfoCard = ({ accountInfo }) => (
  <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/50">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-bold text-slate-800">Account Information</h3>
      <span className="text-[10px] px-2 py-1 rounded-full bg-slate-100 text-slate-600 font-bold">
        Read Only
      </span>
    </div>

    <div className="space-y-4">
      <div>
        <p className="text-[11px] uppercase text-slate-400 font-bold">
          User ID
        </p>
        <p className="text-xs font-semibold text-slate-700">
          {accountInfo.id?.replace(/\D/g, "").slice(-4) || "0000"}
        </p>
      </div>
      <div>
        <p className="text-[11px] uppercase text-slate-400 font-bold">Role</p>
        <p className="text-xs font-bold text-purple-600">{accountInfo.role}</p>
      </div>
      <div>
        <p className="text-[11px] uppercase text-slate-400 font-bold">
          Member Since
        </p>
        <p className="text-xs font-semibold text-slate-700">
          {accountInfo.createdAt
            ? new Date(accountInfo.createdAt).toLocaleDateString()
            : "N/A"}
        </p>
      </div>
      <div>
        <p className="text-[11px] uppercase text-slate-400 font-bold">
          Last Login
        </p>
        <p className="text-xs font-semibold text-slate-700">
          {accountInfo.lastLogin
            ? new Date(accountInfo.lastLogin).toLocaleString()
            : "Never"}
        </p>
      </div>
    </div>
  </div>
);

AccountInfoCard.propTypes = {
  accountInfo: PropTypes.object.isRequired,
};

export default AccountInfoCard;
