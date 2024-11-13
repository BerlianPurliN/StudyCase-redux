import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  password: string;
}

interface UserState {
  users: User[];
  loggedInUser: User | null;
  status: "loggedOut" | "loggedIn" | "Registered";
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loggedInUser: null,
  status: "loggedOut",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      state.loggedInUser = action.payload;
      state.status = "Registered";
      state.error = null;
    },
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const { email, password } = action.payload;
      const existingUser = state.users.find(
        (user) => user.email === email && user.password === password
      );
      if (existingUser) {
        state.loggedInUser = existingUser;
        state.status = "Registered";
        state.error = null;
      } else {
        state.error = "Invalid email or password";
      }
    },
    logout: (state) => {
      state.loggedInUser = null;
      state.status = "loggedOut";
      state.error = null;
    },
  },
});

export const { login, logout, register } = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user.loggedInUser;
export const selectUserStatus = (state: { user: UserState }) => state.user.status;
export const selectUserError = (state: { user: UserState }) => state.user.error;
export default userSlice.reducer;