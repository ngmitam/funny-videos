const Video = require('../../DB/models/Video');
const CustomError = require('../middlewares/customError');

const NUMBER_OF_VIDEOS_PER_PAGE = 10;

module.exports = {
  list(req, res, next) {
    Video.find({}, null, {
      sort: { createdAt: -1 },
      limit: NUMBER_OF_VIDEOS_PER_PAGE,
    })
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

  async share(req, res, next) {
    try {
      await Video.create({
        email: req.userData.email,
        url: req.body.url,
      });
    } catch (err) {
      if (err.message.includes('is not a valid YouTube link!')) {
        return next(new CustomError(20001));
      }
      return next(new CustomError(40004));
    }
    return res.json({
      data: {
        message: 'Link Shared successfully',
      },
    });
  },
};
