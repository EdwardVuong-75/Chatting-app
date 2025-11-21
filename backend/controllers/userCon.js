const express = require('express');
const User = require('../models/userModel');

const sign_up =  async (req, res) => {
    try{
    const {name, email, password } = req.body;
    if (!name || !email || !password)
    {
        return res.status(400).json({error: "Please fill in the box"});
    }
    const existingEmail = await User.findOne({email});
    if (existingEmail)
    {
        return res.status(400).json({error: "Email already existed"});
    }

    const users = await User.create({name, email, password });
    res.json(users);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

module.exports = sign_up;
