import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  username: null,
};

const authSlice = createSlice({
  name: 'loginState',
  initialState,
  reducers: {
    setLoginState(state, action) {
      state.isLoggedIn = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
    }
  }
});

export const { setLoginState, setUsername } = authSlice.actions

export default authSlice.reducer;