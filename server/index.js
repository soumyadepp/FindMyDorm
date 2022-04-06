const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//routes
const userRoutes = require('./routes/users');
const dormRoutes = require('./routes/dorms');
const reviewRoutes = require('./routes/reviews');


dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', userRoutes);
app.use('/api/v1', dormRoutes);
app.use('/api/v1', reviewRoutes);

//connect to mongoose
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.listen(process.env.PORT || 5000, () => console.log(`Server started on port ${process.env.PORT}`));


module.exports = app;