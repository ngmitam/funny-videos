const Video = require('../../DB/models/Video');
const CustomError = require('../middlewares/customError');

const NUMBER_OF_VIDEOS_PER_PAGE = 10;

module.exports = {
  list(req, res, next) {
    Video.find({}, null, { sort: { createdAt: -1 }, limit: NUMBER_OF_VIDEOS_PER_PAGE })
      .then((videos) => {
        res.json({
          data: {
            list: videos,
          },
        });
      })
      .catch((err) => {
        next(new CustomError(40004));
      });
  },
};
