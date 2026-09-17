import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
  },
  accountInfo: {
    id: "",
    role: "Authorized User",
    createdAt: null,
    lastLogin: null,
  },
  userMetrics: {
    totalTasks: 0,
    highPriority: 0,
    pendingTasks: 0,
  },
  loadingProfile: false,
  updatingInfo: false,
  updatingPassword: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileStart: (state) => {
      state.loadingProfile = true;
      state.error = null;
    },
    setProfileSuccess: (state, action) => {
      state.loadingProfile = false;
      const { user, metrics } = action.payload;

      const nameParts = (user?.name || "").trim().split(" ");
      const computedFirstName = user?.firstName || nameParts[0] || "";
      const computedLastName =
        user?.lastName || nameParts.slice(1).join(" ") || "";

      state.personalInfo = {
        firstName: computedFirstName,
        lastName: computedLastName,
        email: user?.email || "",
      };

      state.accountInfo = {
        id: user?._id || user?.id || "",
        role: user?.role || "Authorized User",
        createdAt: user?.createdAt || null,
        lastLogin: user?.lastLogin || null,
      };

      if (metrics) {
        state.userMetrics = {
          totalTasks: metrics.totalTasks || 0,
          highPriority: metrics.highPriority || 0,
          pendingTasks: metrics.pendingTasks || 0,
        };
      }
    },
    setProfileFailure: (state, action) => {
      state.loadingProfile = false;
      state.error = action.payload;
    },
    updateInfoStart: (state) => {
      state.updatingInfo = true;
    },
    updateInfoSuccess: (state, action) => {
      state.updatingInfo = false;

      const user = action.payload;
      const nameParts = (user?.name || "").trim().split(" ");
      const computedFirstName = user?.firstName || nameParts[0] || "";
      const computedLastName =
        user?.lastName || nameParts.slice(1).join(" ") || "";

      state.personalInfo = {
        firstName: computedFirstName,
        lastName: computedLastName,
        email: user?.email || "",
      };
    },
    updateInfoFailure: (state, action) => {
      state.updatingInfo = false;
      state.error = action.payload;
    },
    updatePasswordStart: (state) => {
      state.updatingPassword = true;
    },
    updatePasswordSuccess: (state) => {
      state.updatingPassword = false;
    },
    updatePasswordFailure: (state, action) => {
      state.updatingPassword = false;
      state.error = action.payload;
    },
  },
});

export const {
  setProfileStart,
  setProfileSuccess,
  setProfileFailure,
  updateInfoStart,
  updateInfoSuccess,
  updateInfoFailure,
  updatePasswordStart,
  updatePasswordSuccess,
  updatePasswordFailure,
} = profileSlice.actions;

export default profileSlice.reducer;
