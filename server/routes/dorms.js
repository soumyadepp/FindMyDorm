const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const Dorm = require('../models/DormModel');
const { cloudinary } = require('../util/cloudinary');
bodyParser.urlencoded({ extended: false });

app.get('/dorms', async(req, res) => {
    try {
        const dorms = await Dorm.find();
        res.json(dorms);
    } catch (err) {
        res.json({ message: err });
    }
});

app.get('/dorms/:ownerId', async(req, res) => {
    try {
        const dorm = await Dorm.find({ owner: req.params.ownerId });
        res.json(dorm);
    } catch (err) {
        res.json({ message: err });
    }
});

app.post('/dorms', async(req, res) => {
    try {
        const fname = req.body.image;
        const upload = await cloudinary.uploader.upload(fname, {
            upload_preset: 'dev_preset'
        });
        const imageLink = upload.secure_url;
        const dorm = new Dorm({
            address: req.body.address,
            name: req.body.name,
            price: req.body.price,
            image: imageLink,
            description: req.body.description,
            capacity: req.body.capacity,
            features: req.body.features,
            location: req.body.location,
            owner: req.body.owner,
        });
        await dorm.save();
        res.json({ message: 'Dorm added successfully' });
    } catch (err) {
        console.log(err);
        res.json({ message: 'Unable to add your data' });
    }
});

app.put('/dorms/:dormId', async(req, res) => {
    try {
        const dorm = await Dorm.findById(req.params.dormId);
        dorm.address = req.body.address;
        dorm.name = req.body.name;
        dorm.price = req.body.price;
        dorm.image = req.body.image;
        dorm.description = req.body.description;
        await dorm.save();
        res.json({ message: 'Dorm updated successfully' });
    } catch (err) {
        res.json({ message: 'Unable to update your data' });
    }
});

app.delete('/dorms/:dormId', async(req, res) => {
    try {
        const dorm = await Dorm.remove({ _id: req.params.dormId });
        res.json({ message: 'Dorm deleted successfully' });
    } catch (err) {
        res.json({ message: 'Unable to delete your data' });
    }
});

module.exports = app;