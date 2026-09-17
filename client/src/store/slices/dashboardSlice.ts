import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  metrics: {
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    highPriorityTasks: 0,
    productivityScore: 0,
    lowPriorityCount: 0,
    mediumPriorityCount: 0,
    criticalList: [],
  },
  loadingDashboard: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    getDashboardStart: (state) => {
      state.loadingDashboard = true;
      state.error = null;
    },
    getDashboardSuccess: (state, action) => {
      state.loadingDashboard = false;
      const data = action.payload;

      state.metrics = {
        totalTasks: Number(data?.totalTasks || 0),
        completedTasks: Number(data?.completedTasks || 0),
        pendingTasks: Number(data?.pendingTasks || 0),
        highPriorityTasks: Number(data?.highPriorityTasks || 0),
        productivityScore: Number(data?.productivityScore || 0),
        lowPriorityCount: Number(data?.lowPriorityCount || 0),
        mediumPriorityCount: Number(data?.mediumPriorityCount || 0),
        criticalList: Array.isArray(data?.criticalList)
          ? data.criticalList
          : [],
      };
    },
    getDashboardFailure: (state, action) => {
      state.loadingDashboard = false;
      state.error = action.payload;
    },
  },
});

export const { getDashboardStart, getDashboardSuccess, getDashboardFailure } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
