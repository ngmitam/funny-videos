import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {},
	reducers: {
		login(state, action) {
			state.email = action.payload.email;
		},
		logout(state, _) {
			state.email = undefined;
		},
	},
});
const { actions, reducer } = userSlice;
export const { login, logout } = actions;
export default reducer;
