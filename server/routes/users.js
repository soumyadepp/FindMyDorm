const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/users', async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
});

app.get('/users/:userId', async(req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
});

app.post('/users', async(req, res) => {
    try {
        const oldUserEmail = await User.findOne({ email: req.body.email });
        const oldUserPhone = await User.findOne({ phone: req.body.phone });
        if (oldUserEmail || oldUserPhone) {
            res.json({ message: 'User already exists' });
        } else {
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                phone: req.body.phone,
                email: req.body.email,
                password: hash,
                organization: req.body.organization,
                location: req.body.location,
                role: req.body.role,
            });
            await user.save();
            res.json({ message: 'User added successfully' });
        }
    } catch (err) {
        res.json({ message: 'Unable to add your data' });
    }
});


//login function
app.post('/users/login', async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.json({ message: 'User not found' });
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            res.json({ message: 'Invalid password' });
        }
        //send user data to frontend
        res.json({
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            phone: user.phone,
            email: user.email,
            organization: user.organization,
            location: user.location,
            role: user.role,
        });
        console.log(user);
    } catch (err) {
        res.json({ message: 'Unable to login' });
    }
});

//edit profile
app.put('/users/:userId', async(req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.password = req.body.password;
        user.role = req.body.role;
        await user.save();
        res.json({ message: 'User updated successfully' });
    } catch (err) {
        res.json({ message: 'Unable to update your data' });
    }
});

//change password
app.put('/users/:userId/password', async(req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        user.password = req.body.password;
        await user.save();
        res.json({ message: 'User updated successfully' });
    } catch (err) {
        res.json({ message: 'Unable to update your data' });
    }
});

//delete my profile
app.delete('/users/:userId', async(req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        await user.remove();
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.json({ message: 'Unable to delete your data' });
    }
});

module.exports = app;