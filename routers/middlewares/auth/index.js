/* eslint-disable no-underscore-dangle */
const jwt = require("jsonwebtoken");

const config = require("../../../config/serverConfig");

const User = require("../../../DB/models/User");

const TokenGenerator = require("./localTokenGenerator");

const tokenGenerator = new TokenGenerator(config, jwt);

const CustomError = require("../customError");

async function authenticateUser(email, password, req) {
	query = {
		email,
	};
	let user;

	user = await User.findOne(query).exec();
	if (!user) throw new CustomError(10002);

	// We have a user for that username, test password
	const isMatch = user.comparePassword(password);
	if (isMatch) return user;
	throw new CustomError(10001);
}

async function generateJWTokenWithUserData(userData, req) {
	const accessToken = await tokenGenerator.getToken({
		email: userData.email,
		rememberMe: req.body.rememberMe,
	});
	return {
		userData,
		accessToken,
	};
}

async function generateJWToken(email, password, req) {
	const userData = await authenticateUser(email, password, req);
	return generateJWTokenWithUserData(userData, req);
}

async function regenerateJWToken(content) {
	const accessToken = await tokenGenerator.getToken({
		email: content.email,
		rememberMe: content.rememberMe,
	});
	return accessToken;
}
async function verifyJWToken(token) {
	let content;
	const result = {
		content,
		renew: false,
	};

	try {
		content = await jwt.verify(token, config.authentication.jwt.publicKey, {
			algorithms: [config.authentication.jwt.algorithm],
		});
		result.content = content;
	} catch (err) {
		result.error = "Token is invalid";
		return result;
	}

	// Check if token is about to expire...
	let { renewBeforeExpires } = config.authentication.jwt.short;
	if (content.rememberMe) {
		renewBeforeExpires = config.authentication.jwt.long.renewBeforeExpires;
	}

	if (
		renewBeforeExpires > 0 &&
		content.exp - Date.now() / 1000 < renewBeforeExpires
	) {
		result.renew = true;
	}
	return result;
}

module.exports = {
	generateJWToken,
	verifyJWToken,
	regenerateJWToken,
	generateJWTokenWithUserData,
};
