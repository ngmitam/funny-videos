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
    share(state, action) {
      // push to first position of list
      state.list.unshift({
        videoURL: action.payload.videoURL,
        user: action.payload.user,
      });
    },
  },
});
const { actions, reducer } = userSlice;
export const { share, fetchList } = actions;
export default reducer;
