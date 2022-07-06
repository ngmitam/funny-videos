const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');
const videoController = require('../controllers/video');

router.get('/list', videoController.list);

router.post(
  '/share',
  authController.ensureAuthenticated,
  videoController.share
);

module.exports = router;
