const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const Review = require('../models/ReviewModel');
const Dorm = require('../models/DormModel');
bodyParser.urlencoded({ extended: false });

app.use(cors());
app.use(bodyParser.json());

app.get('/reviews', async(req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (err) {
        res.json({ message: err });
    }
});

app.get('/reviews/:reviewId', async(req, res) => {
    try {
        const review = await Review.findById(req.params.reviewId);
        res.json(review);
    } catch (err) {
        res.json({ message: err });
    }
});

app.post('/reviews', async(req, res) => {
    try {
        const review = new Review({
            dormId: req.body.dormId,
            userId: req.body.userId,
            rating: req.body.rating,
            review: req.body.review,
        });
        const dorm = await Dorm.findById(req.body.dormId);
        dorm.reviews += 1;
        dorm.rating = (dorm.rating + req.body.rating) / dorm.reviews;
        await review.save();
        res.json({ message: 'Review added successfully' });
    } catch (err) {
        res.json({ message: 'Unable to add your data' });
    }
});

app.put('/reviews/:reviewId', async(req, res) => {
    try {
        const review = await Review.findById(req.params.reviewId);
        review.dormId = req.body.dormId;
        review.userId = req.body.userId;
        review.rating = req.body.rating;
        review.review = req.body.review;
        await review.save();
        res.json({ message: 'Review updated successfully' });
    } catch (err) {
        res.json({ message: 'Unable to update your data' });
    }
});

app.delete('/reviews/:reviewId', async(req, res) => {
    try {
        const review = await Review.findById(req.params.reviewId);
        const dorm = await Dorm.findById(review.dormId);
        dorm.reviews -= 1;
        dorm.rating = (dorm.rating - review.rating) / dorm.reviews;
        await review.remove();
        res.json({ message: 'Review deleted successfully' });
    } catch (err) {
        res.json({ message: 'Unable to delete your data' });
    }
});

module.exports = app;