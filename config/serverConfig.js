const fs = require('fs');
const path = require('path');
require('dotenv').config();

const privateKey = fs.readFileSync(
  path.join(__dirname, '../routers/middlewares/auth/PRIVATE_KEY'),
  'utf8'
);
const publicKey = fs.readFileSync(
  path.join(__dirname, '../routers/middlewares/auth/PUBLIC_KEY'),
  'utf8'
);
module.exports = {
  env: process.env,
  authentication: {
    salts: 10,
    jwt: {
      long: {
        expiresIn: 60 * 60 * 24 * 365, // 365 days
        renewBeforeExpires: 60 * 60 * 24 * 30, // 30 days
      },
      short: {
        expiresIn: 60 * 60 * 4, // 4 hours
        renewBeforeExpires: 60 * 60, // 1 hour
      },
      cookieId: 'access_token',
      algorithm: 'RS256',
      privateKey,
      publicKey,
    },
  },
  clientDir: path.join(__dirname, '../../client/build'),
  dbName: 'FunnyVideos',
};
