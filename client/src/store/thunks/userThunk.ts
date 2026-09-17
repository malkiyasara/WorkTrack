import { createAsyncThunk } from "@reduxjs/toolkit";
import * as userService from "../../services/user.service";

export const fetchUsers = createAsyncThunk(
  "users/fetch",
  async () => {
    const data = await userService.getUsers();
    return data.users;
  }
);

export const removeUser = createAsyncThunk(
  "users/delete",
  async (id) => {
    await userService.deleteUser(id);
    return id;
  }
);