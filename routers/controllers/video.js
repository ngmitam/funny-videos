const Video = require("../../DB/models/Video");
const CustomError = require("../middlewares/customError");

const axios = require("axios");

const NUMBER_OF_VIDEOS_PER_PAGE = 10;
const REDIS_VIDEOS_LIST = "video-list";
const REDIS_VIDEOS_LIST_EXPIRE = 60; // in seconds

module.exports = {
	async list(req, res, next) {
		const redis = req.redisClient;

		// Get videos from redis
		if (redis) {
			try {
				const videos = await redis.get(REDIS_VIDEOS_LIST);
				if (videos)
					return res.json({
						data: {
							list: JSON.parse(videos),
						},
					});
			} catch (err) {
				console.log(err);
			}
		}
		try {
			const videos = await Video.find({}, null, {
				sort: { createdAt: -1 },
				limit: NUMBER_OF_VIDEOS_PER_PAGE,
			});

			// Save videos to redis
			if (redis) {
				redis.set(REDIS_VIDEOS_LIST, JSON.stringify(videos));
				redis.expire(REDIS_VIDEOS_LIST, REDIS_VIDEOS_LIST_EXPIRE);
			}

			return res.json({
				data: {
					list: videos,
				},
			});
		} catch (err) {
			console.log(err);
			next(new CustomError(40004));
		}
	},

	async share(req, res, next) {
		try {
			await Video.create({
				email: req.userData.email,
				url: req.body.url,
			});
		} catch (err) {
			if (err.message.includes("is not a valid YouTube link!")) {
				return next(new CustomError(20001));
			}
			return next(new CustomError(40004));
		}

		// get video title from youtube
		const requestUrl = `https://youtube.com/oembed?url=${req.body.url}&format=json`;
		axios.get(requestUrl).then((result) => {
			const videoTitle = result.data.title;
			res?.broadcastMessage(
				`${req.userData.email} shared "${videoTitle}"`,
				req.userData.email
			);
		});
		return res.json({
			data: {
				message: "Link Shared successfully",
			},
		});
	},
};
