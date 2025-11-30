const express = require('express');
const protect = require('../middleware/authMiddleware');
const {sign_up, log_in, displayUsername, searchBar, addingFriend, getRequest} = require('../controllers/userCon')

const router = express.Router();

//Post
router.post('/SignUp',sign_up);
router.post('/Login',log_in);
router.post('/AddingFriend',protect, addingFriend);

//Get
router.get('/Username', protect, displayUsername);
router.get('/SearchFriend', protect, searchBar);
router.get('/GetRequest', protect, getRequest);

module.exports = router;