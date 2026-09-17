"use client";

import React, { useEffect, useState } from "react";
import Alert from "@/utils/alert";
import Pagination from "@/components/ui/Pagination";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import {
  fetchNotificationsThunk,
  markNotificationAsReadThunk,
  markAllNotificationsAsReadThunk,
  deleteNotificationThunk,
} from "@/store/thunks/notificationThunk";
import { NOTIFICATION_TYPES } from "@/utils/constants";
import {
  Bell,
  CheckCircle,
  CheckCheck,
  Trash2,
  SlidersHorizontal,
  Loader2,
  Inbox,
  AlertCircle,
  Clock,
  FileText,
} from "lucide-react";

const Notifications = () => {
  const dispatch = useAppDispatch();

  const { notifications, unreadCount, loadingNotifications } = useAppSelector(
    (state: any) => state.notifications,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    dispatch(fetchNotificationsThunk());
  }, [dispatch]);

  const handleMarkAsRead = (id: any) => {
    dispatch(markNotificationAsReadThunk(id));
  };

  const handleMarkAllAsRead = () => {
    const unreadItems = notifications.filter((n: any) => !n.isRead);
    dispatch(markAllNotificationsAsReadThunk(unreadItems));
  };

  const handleDeleteNotification = async (id: any) => {
    const result = await Alert.confirm(
      "Are you sure?",
      "This notification will be permanently removed.",
    );
    if (result.isConfirmed) {
      dispatch(deleteNotificationThunk(id));
    }
  };

  const formatExactDateTime = (dateString: any) => {
    if (!dateString) return "Unknown time";
    const date = new Date(dateString);
    const timeOptions: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
    const exactTime = date.toLocaleTimeString(undefined, timeOptions);
    const dateOptions: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
    const exactDate = date.toLocaleDateString(undefined, dateOptions);
    return `${exactTime} • ${exactDate}`;
  };

  const getNotificationConfig = (type: any) => {
    switch (type) {
      case NOTIFICATION_TYPES.TASK_CREATED:
        return {
          icon: FileText,
          styles: "bg-blue-50 text-blue-600 border-blue-100",
        };
      case NOTIFICATION_TYPES.TASK_ASSIGNED:
        return {
          icon: Bell,
          styles: "bg-purple-50 text-purple-600 border-purple-100",
        };
      case NOTIFICATION_TYPES.TASK_COMPLETED:
        return {
          icon: CheckCircle,
          styles: "bg-green-50 text-green-600 border-green-100",
        };
      case NOTIFICATION_TYPES.DEADLINE_REMINDER:
        return {
          icon: AlertCircle,
          styles: "bg-amber-50 text-amber-600 border-amber-100",
        };
      case NOTIFICATION_TYPES.TASK_UPDATED:
      case NOTIFICATION_TYPES.TASK_DELETED:
        return {
          icon: SlidersHorizontal,
          styles: "bg-slate-50 text-slate-600 border-slate-100",
        };
      default:
        return {
          icon: Bell,
          styles: "bg-purple-50 text-purple-600 border-purple-100",
        };
    }
  };

  const filteredNotifications = notifications.filter((notif: any) => {
    if (statusFilter === "unread") return !notif.isRead;
    if (statusFilter === "read") return notif.isRead;
    return true;
  });

  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPaginatedNotifications = filteredNotifications.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 min-h-screen bg-slate-50/50 rounded-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/50">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Bell size={22} className="animate-pulse" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-800">
              Notification Center
            </h1>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">
              Stay updated with system triggers, assignees, workflow
              adjustments, and alerts.
            </p>
          </div>
        </div>
        <div className="text-xs font-bold px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg self-start sm:self-center">
          Unread: {unreadCount}
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm shadow-slate-100/50 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-purple-500" />
            <h3 className="text-xs font-bold text-slate-700">
              Filter Activity logs
            </h3>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="flex items-center gap-1.5 text-xs font-bold text-[#7614a4] hover:text-[#610f8a] bg-purple-50 hover:bg-purple-100/70 px-3 py-1.5 rounded-xl transition-all border border-purple-100"
            >
              <CheckCheck size={14} strokeWidth={2.5} />
              <span>Mark all as read</span>
            </button>
          )}
        </div>

        <div className="w-full sm:w-1/3">
          <select
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-600 focus:outline-none focus:ring-4 focus:ring-purple-400/20 focus:border-purple-600 transition-all h-[42px]"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Action Notifications</option>
            <option value="unread">Unread Items</option>
            <option value="read">Read Logs</option>
          </select>
        </div>
      </div>

      {loadingNotifications ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-2 bg-white border border-slate-100 rounded-2xl shadow-sm">
          <Loader2 size={24} className="animate-spin text-purple-600" />
          <p className="text-xs font-bold text-slate-400">Fetching logs...</p>
        </div>
      ) : filteredNotifications.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-100 rounded-2xl shadow-sm shadow-slate-100/50 flex flex-col items-center justify-center space-y-2">
          <Inbox size={28} className="text-slate-300" />
          <h4 className="text-xs font-bold text-slate-700">Inbox Clear!</h4>
          <p className="text-[11px] font-semibold text-slate-400 max-w-xs px-4">
            No matching updates were detected in your current workspace scope.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentPaginatedNotifications.map((notification: any) => {
              const config = getNotificationConfig(notification.type);
              const IconComponent = config.icon;

              return (
                <div
                  key={notification._id}
                  className={`flex items-start gap-4 p-5 rounded-2xl border transition-all duration-200 bg-white shadow-sm shadow-slate-100/40 hover:shadow-md ${!notification.isRead
                      ? "border-l-4 border-l-purple-600 border-slate-100"
                      : "border-slate-100 opacity-80"
                    }`}
                >
                  <div
                    className={`p-2.5 rounded-xl border ${config.styles} shrink-0`}
                  >
                    <IconComponent size={18} />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                      <h3
                        className={`text-xs font-bold truncate max-w-full sm:max-w-[70%] ${!notification.isRead ? "text-slate-800" : "text-slate-600"}`}
                      >
                        {notification.title}
                      </h3>

                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold shrink-0 whitespace-nowrap">
                        <Clock size={11} className="text-slate-400" />
                        {formatExactDateTime(notification.createdAt)}
                      </div>
                    </div>

                    <p className="text-[11px] font-medium text-slate-500 leading-relaxed break-words pt-1">
                      {notification.message}
                    </p>

                    <div className="flex justify-end items-center pt-2 gap-2">
                      {!notification.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(notification._id)}
                          className="text-[10px] font-bold text-purple-600 hover:text-purple-700 transition-colors"
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() =>
                          handleDeleteNotification(notification._id)
                        }
                        className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                        title="Delete notification"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            indexOfFirstItem={indexOfFirstItem}
            indexOfLastItem={indexOfLastItem}
            totalItems={filteredNotifications.length}
          />
        </div>
      )}
    </div>
  );
};

export default Notifications;
