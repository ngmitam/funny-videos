import { useSelector, shallowEqual } from 'react-redux';

import List from './List';

const Home = () => {
  const videoList = useSelector((state) => state.video.list, shallowEqual);

  return <List data={videoList} />;
};
export default Home;
