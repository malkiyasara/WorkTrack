import PropTypes from "prop-types";

const ProfileCard = ({ personalInfo, authUser, userMetrics }) => {
  const initials = personalInfo.firstName && personalInfo.lastName 
    ? `${personalInfo.firstName[0]}${personalInfo.lastName[0]}`.toUpperCase() 
    : "U";

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 
      text-center shadow-sm shadow-slate-100/50 relative overflow-hidden">
      <div className="flex flex-col items-center my-2">
        <div className="h-24 w-24 rounded-full border-4 border-purple-100 
          bg-gradient-to-tr from-purple-600 via-purple-400 to-indigo-500 shadow-inner 
          overflow-hidden flex items-center justify-center text-2xl font-black 
          text-white mb-4 select-none">
          {initials}
        </div>
        <h2 className="text-base font-bold text-slate-900">
          {personalInfo.firstName} {personalInfo.lastName || "User"}
        </h2>
        <p className="text-xs font-bold text-purple-600 capitalize mt-1 
          bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100 inline-block">
          {authUser?.role || "Authorized User"}
        </p>

        <div className="w-full grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-slate-100 text-center">
          <div>
            <div className="text-sm font-extrabold text-slate-800">{userMetrics.totalTasks}</div>
            <div className="text-[10px] font-bold text-slate-400 
              tracking-wider uppercase mt-0.5">Tasks</div>
          </div>
          <div>
            <div className="text-sm font-extrabold text-rose-600">{userMetrics.highPriority}</div>
            <div className="text-[10px] font-bold text-slate-400 
              tracking-wider uppercase mt-0.5">High Priority</div>
          </div>
          <div>
            <div className="text-sm font-extrabold text-amber-500">{userMetrics.pendingTasks}</div>
            <div className="text-[10px] font-bold text-slate-400 
              tracking-wider uppercase mt-0.5">Pending</div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  personalInfo: PropTypes.object.isRequired,
  authUser: PropTypes.object,
  userMetrics: PropTypes.object.isRequired
};

export default ProfileCard;