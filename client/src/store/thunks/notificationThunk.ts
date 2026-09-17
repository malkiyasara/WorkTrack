import {
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
} from "../../services/notification.service";
import {
  setNotificationsStart,
  setNotificationsSuccess,
  setNotificationsFailure,
  markReadSuccess,
  markAllReadSuccess,
  deleteNotificationSuccess,
} from "../slices/notificationSlice";
import Alert from "../../utils/alert";

export const fetchNotificationsThunk = () => async (dispatch) => {
  try {
    dispatch(setNotificationsStart());
    const data = await getNotifications();
    const list = data?.notifications || data?.data || data || [];
    dispatch(setNotificationsSuccess(list));
  } catch (error) {
    const errMsg = error.response?.data?.message || error.message;
    dispatch(setNotificationsFailure(errMsg));
    Alert.error("Failed to load notifications", errMsg);
  }
};

export const markNotificationAsReadThunk = (id) => async (dispatch) => {
  try {
    const data = await markNotificationAsRead(id);
    if (data?.success || data) {
      dispatch(markReadSuccess(id));
    }
  } catch (error) {
    console.error("Failed to sync status update with server:", error);
    Alert.error("Error", "Failed to update notification status.");
  }
};

export const markAllNotificationsAsReadThunk =
  (unreadNotifications) => async (dispatch) => {
    if (!unreadNotifications || unreadNotifications.length === 0) return;

    try {
      dispatch(markAllReadSuccess());

      await Promise.all(
        unreadNotifications.map((n) => markNotificationAsRead(n._id)),
      );
      Alert.success("Updated!", "All notifications marked as read.");
    } catch (error) {
      Alert.error(
        "Sync Error",
        "Failed to clear all items, rolling back cache.",
      );
      dispatch(fetchNotificationsThunk());
    }
  };

export const deleteNotificationThunk = (id) => async (dispatch) => {
  try {
    const data = await deleteNotification(id);
    if (data?.success || data) {
      dispatch(deleteNotificationSuccess(id));
      Alert.success("Deleted!", "Notification removed.");
    }
  } catch (error) {
    const errMsg = error.response?.data?.message || "Something went wrong.";
    Alert.error("Failed to delete notification", errMsg);
  }
};
