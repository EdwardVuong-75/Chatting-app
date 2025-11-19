const express = require('express')
const user = require('./models/userModel')

const router = express.Router()

//Post
router.post('/SignUp', (req, res) => {
    user.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})