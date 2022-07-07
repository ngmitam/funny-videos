import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'video',
  initialState: {
    list: [
      {
        videoURL: 'https://youtu.be/bMknfKXIFA8',
        user: 'admin@funnymovies.com',
      },
      {
        videoURL: 'https://www.youtube.com/watch?v=ogI5Wtvo95w',
        user: 'admin@funnymovies.com',
      },
      {
        videoURL: 'https://www.youtube.com/watch?v=CEOrd6kZwOk',
        user: 'admin@funnymovies.com',
      },
    ],
  },
  reducers: {
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
export const { share } = actions;
export default reducer;
