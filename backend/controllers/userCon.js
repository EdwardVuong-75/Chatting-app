const express = require('express');
const User = require('../models/userModel');

const sign_up =  async (req, res) => {
    try{
    const users = User.create(req.body);
    res.json(users);
    }
    catch(err) {
        console.log(err);
        res.status(400).json({error: err.message});
    }
}

module.exports = sign_up;
