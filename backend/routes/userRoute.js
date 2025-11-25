const express = require('express');
const {sign_up, log_in, displayUsername} = require('../controllers/userCon')

const router = express.Router();

//Post
router.post('/SignUp',sign_up);
router.post('/Login',log_in);

//Get
router.get('/:id/LandingPage', displayUsername);

module.exports = router;