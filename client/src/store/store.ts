import { configureStore } from "@reduxjs/toolkit";

import taskReducer from "./slices/taskSlice";
import profileReducer from "./slices/profileSlice";
import notificationReducer from "./slices/notificationSlice";
import dashboardReducer from "./slices/dashboardSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {

    tasks: taskReducer,
    profile: profileReducer,
    notifications: notificationReducer,
    dashboard: dashboardReducer,
    users: userReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
