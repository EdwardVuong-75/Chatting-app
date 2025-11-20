const express = require('express');
const sign_up = require('../controllers/userCon')

const router = express.Router();

//Post
router.post('/SignUp',sign_up);

module.exports = router;