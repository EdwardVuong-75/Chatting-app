const express = require('express');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const sign_up =  async (req, res) => {
    try{
    const {name, email, password } = req.body;
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

const log_in = async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});

        if(!user)
        {
            return res.status(401).json({error: "Email or password incorrect"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch)
        {
            return res.status(401).json({error: "Email or password incorrect"});
        }

        const token = jwt.sign(
            {
                id: user._id,
            }, process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        res.json({ token, user: {
            id: user._id,
            email: user.email        }
        });
    } catch (err) {
    res.status(500).json({error: err.message});
    }
}

module.exports = {sign_up, log_in};
