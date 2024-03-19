import { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { fetchList as fetchListAction } from "../redux/reducers/video";

import VideoClient from "../rest_client/videoClient";

import List from "./List";

const Home = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const videoClient = new VideoClient();
		async function fetchList() {
			try {
				const res = await videoClient.getList();
				const list = res?.data?.list || [];
				dispatch(
					fetchListAction(
						list.map(({ email, url }) => {
							return {
								user: email,
								videoURL: url,
							};
						})
					)
				);
			} catch (err) {
				console.log(err);
			}
		}
		fetchList();
	}, [dispatch]);

	const videoList = useSelector((state) => state.video.list, shallowEqual);

	return <List data={videoList} />;
};
export default Home;
