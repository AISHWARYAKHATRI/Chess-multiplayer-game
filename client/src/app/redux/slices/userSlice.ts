import {
  authService,
  LoginProps,
  RegisterProps,
} from "@/app/api/services/authService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const registerUser = createAsyncThunk(
  "user/register",
  async (data: RegisterProps) => {
    try {
      const response = await authService.register(data);
      const responseData = response?.data?.data;
      toast.success(responseData?.message);
      return responseData?.user;
    } catch (error) {
      toast.error((error as any)?.response?.data?.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (data: LoginProps) => {
    try {
      const response = await authService.login(data);
      const responseData = response?.data?.data;
      toast.success(responseData?.message);
      return responseData?.user;
    } catch (error) {
      toast.error((error as any)?.response?.data?.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
  },
  reducers: {
    logout: (state) => {
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
