const express = require('express');
const {sign_up, log_in} = require('../controllers/userCon')

const router = express.Router();

//Post
router.post('/SignUp',sign_up);
router.post('/Login',log_in);

module.exports = router;