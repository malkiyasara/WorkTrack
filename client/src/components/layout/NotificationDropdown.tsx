import Link from "next/link";
import { useRouter } from "next/navigation";
import { Clock, Check, CheckCheck, Inbox } from "lucide-react";

const NotificationDropdown = ({ 
  notifications = [], 
  unreadCount, 
  onMarkAsRead, 
  onMarkAllAsRead,
  onClose 
}) => {
  const router = useRouter();
  
  const previewNotifications = notifications.slice(0, 3);

  const formatTimeAgo = (dateString) => {
    if (!dateString) return "Unknown time";
    
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now.getTime() - past.getTime();
    
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60); 
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? "minute" : "minutes"} ago`;
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
    if (diffDays === 1) return "Yesterday";
    
    return past.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  };

  return (
    <div className="absolute right-0 top-12 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-300/80 overflow-hidden z-50 animate-in fade-in slide-in-from-top-3 duration-200">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-100 bg-white flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold text-slate-900">Notifications</h3>
          <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
            You have {unreadCount} unread messages
          </p>
        </div>

        {unreadCount > 0 && onMarkAllAsRead && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMarkAllAsRead();
            }}
            className="flex items-center gap-1 text-[10px] font-bold text-[#7614a4] hover:text-[#610f8a] bg-purple-50 hover:bg-purple-100 px-2 py-1 rounded-lg transition-colors border border-purple-100"
            title="Mark all as read"
          >
            <CheckCheck size={12} strokeWidth={2.5} />
            <span>Read All</span>
          </button>
        )}
      </div>

      <div className="bg-slate-50 px-4 py-1.5 border-b border-slate-100">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">New Logs</span>
      </div>

      {/* Main Container Lists */}
      <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto bg-white">
        {previewNotifications.length === 0 ? (
          <div className="py-10 px-4 flex flex-col items-center justify-center text-center space-y-2 bg-white">
            <div className="p-2 bg-slate-50 rounded-full">
              <Inbox size={20} className="text-slate-400" />
            </div>
            <p className="text-[11px] font-bold text-slate-500">Inbox Completely Clear</p>
          </div>
        ) : (
          previewNotifications.map((notif) => (
            <div 
              key={notif._id} 
              onClick={() => {
                onClose();
                router.push(notif.link);
              }}
              className={`p-4 flex items-start gap-3 hover:bg-slate-50 cursor-pointer transition-colors relative group ${
                !notif.isRead ? "bg-purple-50/40" : "bg-white"
              }`}
            >
              {!notif.isRead && (
                <span className="absolute left-2 top-1/2 -translate-y-1/2 h-1.5 w-1.5 bg-[#7614a4] rounded-full"></span>
              )}

              <div className="flex-1 min-w-0 pl-1">
                <p className="text-[11px] leading-snug text-slate-600 font-medium break-words">
                  <span className="font-bold text-slate-900 mr-1">{notif.title}</span> 
                  {notif.message}
                </p>
                <div className="flex items-center gap-1 mt-1.5 text-[9px] font-medium text-slate-400">
                  <Clock size={10} className="text-slate-400" />
                  {formatTimeAgo(notif.createdAt)}
                </div>
              </div>

              {!notif.isRead && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkAsRead(e, notif._id);
                  }}
                  className="h-5 w-5 rounded-full border border-slate-200 hover:border-purple-300 flex items-center justify-center bg-white text-slate-500 hover:text-[#7614a4] hover:bg-purple-50 transition-all shadow-sm shrink-0"
                  title="Mark as Read"
                >
                  <Check size={11} strokeWidth={3} />
                </button>
              )}
            </div>
          ))
        )}
      </div>

      <Link 
        href="/notifications" 
        onClick={onClose}
        className="block text-center py-2.5 border-t border-slate-100 bg-slate-50/50 text-[11px] font-bold text-[#7614a4] hover:bg-purple-50 hover:text-[#610f8a] transition-colors"
      >
        See all notifications ({notifications.length})
      </Link>
    </div>
  );
};

export default NotificationDropdown;