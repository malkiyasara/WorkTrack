import {
  getProfile,
  updateProfile,
  changePassword,
} from "../../services/profile.service";
import { getTasks } from "../../services/task.service";
import { getDashboardData } from "../../services/dashboard.service";
import {
  setProfileStart,
  setProfileSuccess,
  setProfileFailure,
  updateInfoStart,
  updateInfoSuccess,
  updateInfoFailure,
  updatePasswordStart,
  updatePasswordSuccess,
  updatePasswordFailure,
} from "../slices/profileSlice";
import Alert from "../../utils/alert";

export const fetchProfileThunk = (authUser) => async (dispatch) => {
  try {
    dispatch(setProfileStart());

    const [profileRes, tasksRes, dashboardRes] = await Promise.all([
      getProfile(),
      getTasks(),
      getDashboardData(),
    ]);

    const profileData = profileRes?.data || profileRes?.user || profileRes;

    let computedMetrics = { totalTasks: 0, highPriority: 0, pendingTasks: 0 };
    const dashData = dashboardRes?.dashboard || dashboardRes;
    const tasksData = tasksRes?.data || tasksRes?.tasks || tasksRes;

    if (Array.isArray(tasksData)) {
      computedMetrics.totalTasks = tasksData.length;
      computedMetrics.highPriority = tasksData.filter(
        (t) =>
          String(t.priority || "")
            .trim()
            .toLowerCase() === "high",
      ).length;
      computedMetrics.pendingTasks = tasksData.filter(
        (t) =>
          String(t.status || "")
            .trim()
            .toLowerCase() === "pending",
      ).length;
    } else if (dashData && dashData.totalTasks !== undefined) {
      computedMetrics.totalTasks = Number(dashData.totalTasks || 0);
      computedMetrics.highPriority = Number(dashData.highPriorityTasks || 0);
      computedMetrics.pendingTasks = Number(dashData.pendingTasksCount || 0);
    }

    dispatch(
      setProfileSuccess({
        user: profileData || authUser,
        metrics: computedMetrics,
      }),
    );
  } catch (error) {
    const errMsg = error.response?.data?.message || error.message;
    dispatch(setProfileFailure(errMsg));
    Alert.error("Profile Load Failed", errMsg || "Failed to load profile.");
  }
};

export const updateProfileInfoThunk = (formData) => async (dispatch) => {
  try {
    dispatch(updateInfoStart());
    const data = await updateProfile(formData);

    const updatedUser = data?.data || data?.user || data || formData;
    dispatch(updateInfoSuccess(updatedUser));
    Alert.success(
      "Profile Updated",
      "Your profile has been updated successfully.",
    );
    return data;
  } catch (error) {
    const errMsg = error.response?.data?.message || error.message;
    dispatch(updateInfoFailure(errMsg));
    Alert.error("Update Failed", errMsg || "Something went wrong.");
    throw error;
  }
};

export const updatePasswordThunk = (passwordData) => async (dispatch) => {
  try {
    dispatch(updatePasswordStart());
    const data = await changePassword({
      oldPassword: passwordData.oldPassword,
      newPassword: passwordData.newPassword,
    });

    dispatch(updatePasswordSuccess());
    Alert.success(
      "Password Updated",
      "Your password has been updated successfully.",
    );
    return data;
  } catch (error) {
    const errMsg = error.response?.data?.message || error.message;
    dispatch(updatePasswordFailure(errMsg));
    Alert.error("Update Failed", errMsg || "Verify your current password.");
    throw error;
  }
};
