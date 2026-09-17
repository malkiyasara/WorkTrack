import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  unreadCount: 0,
  loadingNotifications: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotificationsStart: (state) => {
      state.loadingNotifications = true;
      state.error = null;
    },
    setNotificationsSuccess: (state, action) => {
      state.loadingNotifications = false;
      state.notifications = action.payload || [];
      state.unreadCount = state.notifications.filter((n) => !n.isRead).length;
    },
    setNotificationsFailure: (state, action) => {
      state.loadingNotifications = false;
      state.error = action.payload;
    },
    markReadSuccess: (state, action) => {
      const id = action.payload;
      state.notifications = state.notifications.map((notif) =>
        notif._id === id ? { ...notif, isRead: true } : notif,
      );
      state.unreadCount = state.notifications.filter((n) => !n.isRead).length;
    },
    markAllReadSuccess: (state) => {
      state.notifications = state.notifications.map((notif) => ({
        ...notif,
        isRead: true,
      }));
      state.unreadCount = 0;
    },
    deleteNotificationSuccess: (state, action) => {
      const id = action.payload;
      state.notifications = state.notifications.filter(
        (notif) => notif._id !== id,
      );
      state.unreadCount = state.notifications.filter((n) => !n.isRead).length;
    },
  },
});

export const {
  setNotificationsStart,
  setNotificationsSuccess,
  setNotificationsFailure,
  markReadSuccess,
  markAllReadSuccess,
  deleteNotificationSuccess,
} = notificationSlice.actions;

export default notificationSlice.reducer;
