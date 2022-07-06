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

  after(() => {
    server.stop();
  });
});
