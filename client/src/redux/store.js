import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';
import video from './reducers/video';
const store = configureStore({
  reducer: {
    user,
    video,
  },
});

export default store;
