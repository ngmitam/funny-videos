import { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchList as fetchListAction } from '../redux/reducers/video';

import VideoClient from '../rest_client/videoClient';

import List from './List';

const Home = () => {
  const dispatch = useDispatch();

  const videoClient = new VideoClient();
  useEffect(() => {
    async function fetchList() {
      try {
        const res = await videoClient.getList();
        const list = res?.data?.list || [];
        dispatch(fetchListAction(list));
      } catch (err) {
        console.log(err);
      }
    }
    fetchList();
  }, []);
  const videoList = useSelector((state) => state.video.list, shallowEqual);

  return <List data={videoList} />;
};
export default Home;
