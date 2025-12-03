const express = require('express');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Notification = require('../models/requestModel');
const Chat = require('../models/chatModel');

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
    try {
    const sender = req.user.id;
    const receiver = req.body.receiverId;
    
    if(!sender)
    {
            return res.status(404).json({error: "User not found"});
        }

    const request = new Notification({
        receiver: receiver,
        sender: sender,
        message: "Friend request sent successfully",
        type: "Friend request",
        status: "pending"
    });

    await request.save();
    res.status(200).json({ message: 'Request sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  } 
    
}

const getRequest = async(req, res) => {
    try 
    {
        const noti = req.user.id
        const resquests = await Notification.find({
            receiver: noti,
            status: "pending"
        }).populate("sender", "name email");

        if(!noti)
        {
            res.status(401).json({message: "No request"});
        }
        res.status(200).json(resquests)
    } catch (error) {
        res.status(500).json({error: "Something went wrong"})
    }
}

//display request as "added" untill other user accept
const getSentRequests = async (req, res) => {
  try {
    const senderId = req.user.id;

    const requests = await Notification.find({
      sender: senderId,
      status: "pending"
    });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: "Could not load sent requests" });
  }
}

const rejectRequest = async(req, res) => {
    try {
        const requestId = req.body.requestId;
        const reject = await Notification.findByIdAndDelete(requestId);
        
        if(!requestId)
        {
            return res.status(404).json({error: "There is no notification"})
        }
        res.status(200).json(reject)
    } catch (error) {
        res.status(500).json({error: "Something went wrong"});
    }
}

const acceptRequest = async(req,res) => {
   try {
    const { requestId } = req.body;

    if (!requestId) {
      return res.status(400).json({ error: "Request ID is required" });
    }

    const original = await Notification.findById(requestId);

    if (!original) {
      return res.status(404).json({ error: "Friend request not found" });
    }

    const senderId = original.sender;
    const receiverId = original.receiver;


    
    // Add friends without duplicates
    await User.findByIdAndUpdate(senderId, {
      $addToSet: { friends: receiverId },
    });
    await User.findByIdAndUpdate(receiverId, {
      $addToSet: { friends: senderId },
    });

     const request = new Notification({
        receiver: receiverId,
        sender: senderId,
        message: "Accepted friend request successfully",
        type: "Friend request",
        status: "accepted"
    });

    await request.save()

    // Delete the pending request
    await Notification.findByIdAndDelete(requestId);

    // Optionally return updated friends list or a success message
    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.error("Error accepting friend request:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getFriendReq = async(req,res) => {
    const friendId = req.user.id;
    const requests = await User.findById(friendId).populate(
        "friends", "name email"
    )

    try {
        if(!requests)
        {
            return res.status(401).json({message: "No request"});
        }
        res.json(requests.friends)
    } catch (error) {
        res.status(500).json({error: "Something went wrong"});
    }

}

const sendMessage = async(req,res) => {
        try {
        const sender = req.user.id;
        const { receiverId, message } = req.body;

            if (!receiverId || !message)
            {
                return res.status(400).json({error: "no user"});
            }
            const chat = new Chat({
                receiver: receiverId,
                sender: sender,
                message: message,
            });

            await chat.save();

            res.status(200).json({ message: "Message sent", data: chat });
            
        } catch (error) {
            console.error("Send message error:", error);
            res.status(500).json({error: "Something went down"})
        }
    }

    //get friend name in each chat log
    const getFriendName = async(req,res) => {
        try {
            const user = await User.findById(req.params.id).select("name email");
            if(!user)
            {
                return res.status(404).json({error: "User not found"});
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({error: "Something went wrong"})
        }
    }
    

module.exports = {sign_up, log_in, displayUsername, searchBar,
     addingFriend, getRequest, getSentRequests, rejectRequest,
    acceptRequest, getFriendReq, sendMessage, getFriendName};
