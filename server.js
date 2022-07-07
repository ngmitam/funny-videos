const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const cors = require('cors');
const responseTime = require('response-time');

const serverConfig = require('./config/serverConfig');

const routers = require('./routers');

const app = express();
const server = http.createServer(app);

let mongooseConnect;

app.use(
  responseTime((req, _, time) => {
    console.log(
      `${req.ip} - ${req.method} ${req.originalUrl} ${req.protocol} - ${time}`
    );
  })
);

app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(express.json());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  res.json({
    error_message: 'Body should be a JSON',
  });
});
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(methodOverride());

const mongoURL =
  serverConfig.env.MONGO_URL ||
  `mongodb://localhost:27017/${serverConfig.dbName}`;

async function start(params) {
  let success = false;

  // Try connecting to MongoDB server
  while (!success) {
    try {
      // eslint-disable-next-line no-await-in-loop
      mongooseConnect = await mongoose.connect(mongoURL);
      success = true;
    } catch (err) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  // use redis to cache request
  if (serverConfig.env.REDIS_URL) {
    const redis = require('redis');
    const redisClient = redis.createClient({ url: serverConfig.env.REDIS_URL });
    await redisClient.connect();

    app.use('', (req, res, next) => {
      req.redisClient = redisClient;
      next();
    });
  }

  routers(app);

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    res.json({
      error_code: err.error_code || err.message,
      error_message: err.message,
      error_data: err.error_data,
    });
  });
  server.listen(params.port || 80, () => {
    console.log(`Server listening on port ${params.port || 80}`);
    if (params && params.done) params.done();
  });
}

module.exports = {
  start,
  stop: (done) => {
    mongooseConnect.connection.close();
    server.close(done);
  },
};
