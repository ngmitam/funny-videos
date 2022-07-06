const constants = require('./constants');
const authRouter = require('./routes/auth');

module.exports = (app) => {
  app.use(`${constants.baseApi}/auth`, authRouter);
  // catches all next(new Error()) from previous rules, you can set res.status() before you call next(new Error())
  // eslint-disable-next-line
};
