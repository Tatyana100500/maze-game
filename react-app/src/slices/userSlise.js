import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
	isLogin: false,
  },
  reducers: {
	setisLogin: (state, { payload }) => {
	  state.isLogin = payload;
	},
  },
});

export const {
	setisLogin,
} = userSlice.actions;

export default userSlice.reducer;