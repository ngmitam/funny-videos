import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'video',
  initialState: {
    list: [],
  },
  reducers: {
    fetchList: (state, action) => {
      state.list = action.payload;
    },
  },
});
const { actions, reducer } = userSlice;
export const { fetchList } = actions;
export default reducer;
