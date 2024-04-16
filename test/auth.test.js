require("dotenv").config();
const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");

const User = require("../DB/models/User");

const should = chai.should();

chai.use(chaiHttp);

process.env.MONGO_URL = "mongodb://localhost:27017/test_funny_videos";
const server = require("../server");
let SERVER_URL = "http://localhost";

describe("Auth test", () => {
	before(async () => {
		const mongooseConnect = await mongoose.connect(process.env.MONGO_URL);
		const db = mongooseConnect.connection;
		await db.dropDatabase();
		await User.syncIndexes();
		db.close();

		await server.start({});
	});

	it("should return User not found error_code 10002", async () => {
		const res = await chai
			.request(SERVER_URL)
			.post("/api/v1/auth/login")
			.send({
				email: "user@email.com",
				password: "password",
			});
		res.should.have.status(200);
		res.body.should.have.property("error_code");
		res.body.error_code.should.equal(10002);
		res.body.should.have.property("error_message");
		res.body.error_message.should.equal("User not found");
	});

	it("should return register new user", async () => {
		const res = await chai
			.request(SERVER_URL)
			.post("/api/v1/auth/register")
			.send({
				email: "user@email.com",
				password: "password",
			});
		res.should.have.status(200);
		res.body.should.have.property("data");
		res.body.data.should.have.property("message");
		res.body.data.message.should.equal(
			"Welcome to Funny Videos, enjoy your time!"
		);
	});

	it("should return Invalid email or password error_code 10001", async () => {
		const res = await chai
			.request(SERVER_URL)
			.post("/api/v1/auth/login")
			.send({
				email: "@@@@@",
				password: "password",
			});
		res.should.have.status(200);
		res.body.should.have.property("error_code");
		res.body.error_code.should.equal(10001);
		res.body.should.have.property("error_message");
		res.body.error_message.should.equal("Invalid email or password");
	});

	it("should return User already exists error_code 10003", async () => {
		const res = await chai
			.request(SERVER_URL)
			.post("/api/v1/auth/register")
			.send({
				email: "user@email.com",
				password: "password",
			});
		res.should.have.status(200);
		res.body.should.have.property("error_code");
		res.body.error_code.should.equal(10003);
		res.body.should.have.property("error_message");
		res.body.error_message.should.equal("Email already exists");
	});

	it("should return Invalid email or password error_code 10001", async () => {
		const res = await chai
			.request(SERVER_URL)
			.post("/api/v1/auth/login")
			.send({
				email: "user@email.com",
				password: "wrong_password",
			});
		res.should.have.status(200);
		res.body.should.have.property("error_code");
		res.body.error_code.should.equal(10001);
		res.body.should.have.property("error_message");
		res.body.error_message.should.equal("Invalid email or password");
	});

	it("should return Invalid email or password error_code 10001", async () => {
		const res = await chai
			.request(SERVER_URL)
			.post("/api/v1/auth/login")
			.send({
				email: "@@@@@@@@",
				password: "password",
			});
		res.should.have.status(200);
		res.body.should.have.property("error_code");
		res.body.error_code.should.equal(10001);
		res.body.should.have.property("error_message");
		res.body.error_message.should.equal("Invalid email or password");
	});

	it("should login user", async () => {
		const res = await chai
			.request(SERVER_URL)
			.post("/api/v1/auth/login")
			.send({
				email: "user@email.com",
				password: "password",
			});
		res.should.have.status(200);
		res.body.should.have.property("data");
		res.body.data.should.have.property("message");
		res.body.data.message.should.equal(
			"Welcome back to Funny Movies, enjoy your time!"
		);

		res.headers.should.have.property("set-cookie");
		res.headers["set-cookie"].should.be.an("array");
		res.headers["set-cookie"].should.have.lengthOf(1);
		res.headers["set-cookie"][0].should.contain("access_token");
	});

	it("should logout user", async () => {
		const res = await chai.request(SERVER_URL).get("/api/v1/auth/logout");
		res.should.have.status(200);

		res.headers.should.have.property("set-cookie");
		res.headers["set-cookie"].should.be.an("array");
		res.headers["set-cookie"].should.have.lengthOf(1);
		res.headers["set-cookie"][0].should.contain("access_token=;");
	});

	after(() => {
		server.stop();
	});
});
