const constants = require('./constants');
const authRouter = require('./routes/auth');
const videoRouter = require('./routes/video');

module.exports = (app) => {
  app.use(`${constants.baseApi}/auth`, authRouter);
  app.use(`${constants.baseApi}/video`, videoRouter);
  // catches all next(new Error()) from previous rules, you can set res.status() before you call next(new Error())
  // eslint-disable-next-line
};
