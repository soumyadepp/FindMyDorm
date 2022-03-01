//require dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
app.use(cors());
app.use(bodyParser.json());
bodyParser.urlencoded({ extended: false });

//require middleware
const auth = require('./middleware/auth');
//require routes
const userRoutes = require('./routes/users');

//use routes
app.use(userRoutes);

const dbUri = process.env.DB_URI;

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB Connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('API Running');
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});