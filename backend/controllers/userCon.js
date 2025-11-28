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
        const isMatch = await bcrypt.compare(password, user.password);

        if(!user || !isMatch)
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
    res.status(401).json({error: "Account doesnt exist, please sign up"});
    }
}

const displayUsername = async (req,res) => {
    try {
        const userName = await User.findById(req.user.id);
        if(!userName)
        {
            return res.status(404).json({error: "User not found"});
        }
        res.status(200).json(userName);

    } catch (error) {
        res.status(500).json({error: "Faild to load user name"})
    }
}

const searchBar = async (req,res) => {
    try {
        const currentId = req.user.id;
        if(!currentId)
        {
            return res.status(404).json({error: "User not found"});
        }
        const users = await User.find({ _id: {$ne: currentId }}).select("-password");

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({error: "Faild to load user name"})
    }
}

const addingFriend = async(req,res) => {
    const request = req.user.id;
    if(!request)
    {
            return res.status(404).json({error: "User not found"});
        }
    
}

module.exports = {sign_up, log_in, displayUsername, searchBar,
     addingFriend};
