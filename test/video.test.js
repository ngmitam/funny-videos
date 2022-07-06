require('dotenv').config();
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');

const User = require('../DB/models/User');
const Video = require('../DB/models/Video');

const should = chai.should();

chai.use(chaiHttp);

process.env.MONGO_URL = 'mongodb://localhost:27017/test_funny_videos';
const server = require('../server');
let SERVER_URL = 'http://localhost';

describe('Video test', () => {
  before(async () => {
    const mongooseConnect = await mongoose.connect(process.env.MONGO_URL);
    const db = mongooseConnect.connection;
    await db.dropDatabase();
    await User.syncIndexes();
    await Video.syncIndexes();

    await User.create({
      email: 'user@email.com',
      password: 'password',
    });

    await Video.create({
      email: 'user@email.com',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    });

    await Video.create({
      email: 'user@email.com',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    });

    await Video.create({
      email: 'user@email.com',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    });

    db.close();

    await server.start({});
  });

  it('should return videos', async () => {
    const res = await chai.request(SERVER_URL).get('/api/v1/video/list');
    res.should.have.status(200);
    res.body.should.have.property('data');
    res.body.data.should.have.property('list');
    res.body.data.list.should.be.an('array');
    res.body.data.list.length.should.equal(3);
  });

  it('should not allow add video link if user is not logged in', async () => {
    const res = await chai
      .request(SERVER_URL)
      .post('/api/v1/video/share')
      .send({
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      });
    res.should.have.status(401);
  });

  it('should allow add video link if user is logged in', async () => {
    const res = await chai.request(SERVER_URL).post('/api/v1/auth/login').send({
      email: 'user@email.com',
      password: 'password',
    });
    res.should.have.status(200);
    res.body.should.have.property('data');
    res.headers.should.have.property('set-cookie');
    res.headers['set-cookie'].should.be.an('array');
    res.headers['set-cookie'].should.have.lengthOf(1);
    res.headers['set-cookie'][0].should.contain('access_token');

    const cookie = res.headers['set-cookie'][0];
    const accessTokenCookie = cookie.split(';')[0];
    const accessToken = accessTokenCookie.split('=')[1];

    const res2 = await chai
      .request(SERVER_URL)
      .post('/api/v1/video/share')
      .set('Cookie', `access_token=${accessToken}`)
      .send({
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      });
    res2.should.have.status(200);
    res2.body.should.have.property('data');
    res2.body.data.should.have.property('message');
    res2.body.data.message.should.equal('Link Shared successfully');

    const res3 = await chai.request(SERVER_URL).get('/api/v1/video/list');
    res3.should.have.status(200);
    res3.body.should.have.property('data');
    res3.body.data.should.have.property('list');
    res3.body.data.list.should.be.an('array');
    res3.body.data.list.length.should.equal(4);
  });

  it('should not allow add invalid video link', async () => {
    const res = await chai.request(SERVER_URL).post('/api/v1/auth/login').send({
      email: 'user@email.com',
      password: 'password',
    });
    res.should.have.status(200);
    res.body.should.have.property('data');
    res.headers.should.have.property('set-cookie');
    res.headers['set-cookie'].should.be.an('array');
    res.headers['set-cookie'].should.have.lengthOf(1);
    res.headers['set-cookie'][0].should.contain('access_token');

    const cookie = res.headers['set-cookie'][0];
    const accessTokenCookie = cookie.split(';')[0];
    const accessToken = accessTokenCookie.split('=')[1];

    const res2 = await chai
      .request(SERVER_URL)
      .post('/api/v1/video/share')
      .set('Cookie', `access_token=${accessToken}`)
      .send({
        url: 'abc.xyz/video.mp4',
      });
    res2.should.have.status(200);
    res2.body.should.have.property('error_code');
    res2.body.error_code.should.equal(20001);
    res2.body.should.have.property('error_message');
    res2.body.error_message.should.equal('Invalid YouTube video link');

    const res3 = await chai.request(SERVER_URL).get('/api/v1/video/list');
    res3.should.have.status(200);
    res3.body.should.have.property('data');
    res3.body.data.should.have.property('list');
    res3.body.data.list.should.be.an('array');
    res3.body.data.list.length.should.equal(4);
  });

  after(() => {
    server.stop();
  });
});
