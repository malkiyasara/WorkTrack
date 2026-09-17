import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUsers,
  removeUser,
} from "../thunks/userThunk";

const initialState = {
  users: [],
  loading: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })

      .addCase(removeUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user._id !== action.payload
        );
      });
  },
});

export default userSlice.reducer;