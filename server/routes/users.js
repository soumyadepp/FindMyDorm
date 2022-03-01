const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('../middleware/auth');
const userModel = require('../models/userModel');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
bodyParser.urlencoded({ extended: false });

//get method to get all users
app.get('/users', async(req, res) => {
    try {
        const response = await userModel.find();
        res.send(response);
    } catch (error) {
        console.log(error);
    }
});

//get method to get a single user from the database
app.get('/users/:id', async(req, res) => {
    try {
        const response = await userModel.findById(req.params.id);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
});

app.get('/token/:email', async(req, res) => {
    try {
        const response = await userModel.findOne({ email: req.params.email });
        if (response == null) {
            res.send({ error: 'User not found' });
        } else {
            res.send({ token: response.token });
        }
    } catch (error) {
        console.log(error);
    }
});

//register functionality
app.post('/register', async(req, res) => {
    try {
        const { firstName, lastName, email, occupation, organization, password } = req.body;
        if (!(email && firstName && lastName && password)) {
            res.status(400).send({ error: 'Please enter all the fields' });
        }
        const oldUser = await userModel.findOne({ email });
        if (oldUser) {
            res.status(409).send({ error: 'User already exists' });
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const userData = new userModel({
            firstName: firstName,
            lastName: lastName,
            email: email.toLowerCase(),
            occupation: occupation,
            organization: organization,
            password: encryptedPassword
        });
        const token = jwt.sign({ email: userData.email }, process.env.JWT_SECRET, { expiresIn: '1y' });
        userData.token = token;
        const transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'ghoshsoumyadeep330@gmail.com',
                pass: 'iamtherealhero'
            }
        });
        const mailOptions = {
            from: 'ghoshsoumyadeep330@gmail.com',
            to: userData.email,
            subject: 'Verification for your account',
            text: 'Please click on the link below to verify your account \n http://localhost:3000/login'
        }
        transport.sendMail(mailOptions, async function(err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log('Email sent: ' + info.response);
                const response = await userData.save()
                res.status(201).json(userData);
            }
        });
    } catch (error) {
        console.log(error);
        res.send({ error: 'An unknown error occured' });
    }
});

//login functionality using bcrypt and jwt
app.post('/login', auth, async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send({ error: 'Please enter all the fields' });
        }
        const userData = await userModel.findOne({ email });
        //if a valid user exists, send the user data
        if (userData && await bcrypt.compare(password, userData.password)) {
            const token = jwt.sign({ user_id: userData._id, email: userData.email },
                process.env.JWT_SECRET, { expiresIn: '1h' });
            userData.token = token;
            res.status(200).json(userData);
        } else {
            res.status(401).send({ error: 'Invalid credentials' });
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = app;