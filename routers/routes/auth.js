const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

router.post('/login', authController.login);

router.post('/register', authController.register);
router.get('/logout', authController.logout);

router.use(authController.ensureAuthenticated);

module.exports = router;
