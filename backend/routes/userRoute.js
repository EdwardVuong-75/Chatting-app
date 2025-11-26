const express = require('express');
const protect = require('../middleware/authMiddleware');
const {sign_up, log_in, displayUsername} = require('../controllers/userCon')

const router = express.Router();

//Post
router.post('/SignUp',sign_up);
router.post('/Login',log_in);

//Get
router.get('/LandingPage', protect, displayUsername);

module.exports = router;