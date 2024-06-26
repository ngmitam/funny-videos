const validator = require("validator");

const serverConfig = require("../../config/serverConfig");
const authMiddleware = require("../middlewares/auth");
const User = require("../../DB/models/User");
const CustomError = require("../middlewares/customError");

const generateJWToken = (email, password, req, res, next) => {
	authMiddleware
		.generateJWToken(email, password, req)
		.then(({ accessToken }) => {
			res.cookie(serverConfig.authentication.jwt.cookieId, accessToken);
			res.json({
				data: {
					message: "Welcome back to Funny Movies, enjoy your time!",
				},
			});
		})
		.catch((err) => {
			next(err);
		});
};
module.exports = {
	login(req, res, next) {
		const email = req.body.email;
		const { password } = req.body;

		if (!email || !validator.isEmail(email) || !password) {
			throw new CustomError(10001);
		}

		if (!req.cookies[serverConfig.authentication.jwt.cookieId]) {
			generateJWToken(email, password, req, res, next);
		} else {
			const token = req.cookies[serverConfig.authentication.jwt.cookieId];
			authMiddleware
				.verifyJWToken(token)
				.then((result) => {
					User.findOne({ email: result.content?.email })
						.then((user) => {
							req.userData = {
								token,
								email: user.email,
							};
							next();
						})
						.catch((err) => {
							res.clearCookie(
								serverConfig.authentication.jwt.cookieId
							);
							res.status(401);
							next();
						});
				})
				.catch((err) => {
					generateJWToken(email, password, req, res, next);
				});
		}
	},

	async logout(req, res) {
		res.clearCookie(serverConfig.authentication.jwt.cookieId);
		res.json({});
	},

	async register(req, res, next) {
		let receivedData = req.body;
		try {
			if (
				!receivedData.email ||
				!validator.isEmail(receivedData.email) ||
				!receivedData.password
			) {
				throw new CustomError(10001);
			}
			if (typeof receivedData.password !== "string")
				receivedData.password = receivedData.password.toString();

			receivedData.email = receivedData.email.toLowerCase();

			try {
				newUser = new User({
					email: receivedData.email,
					password: receivedData.password,
				});
				await newUser.save();
			} catch (err) {
				if (err.code === 11000) {
					return next(new CustomError(10003));
				} else return next(new CustomError(10004));
			}
			return res.json({
				data: {
					message: "Welcome to Funny Videos, enjoy your time!",
				},
			});
		} catch (err) {
			console.log(err);
			next(new CustomError(10004));
		}
	},

	ensureAuthenticated(req, res, next) {
		if (!req.cookies[serverConfig.authentication.jwt.cookieId])
			return res.sendStatus(401);
		const token = req.cookies[serverConfig.authentication.jwt.cookieId];
		authMiddleware
			.verifyJWToken(token)
			.then((result) => {
				User.findOne({ email: result.content?.email })
					.then((user) => {
						req.userData = {
							token,
							email: user.email,
						};
						next();
					})
					.catch((err) => {
						res.clearCookie(
							serverConfig.authentication.jwt.cookieId
						);
						res.status(401);
						next();
					});
			})
			.catch((err) => {
				res.clearCookie(serverConfig.authentication.jwt.cookieId);
				res.status(401);
				next();
			});
	},
};
