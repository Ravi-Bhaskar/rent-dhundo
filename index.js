const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require("path");

const rentRoute = require('./routes/rents');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const reviewRoute = require('./routes/reviews');
const bookingRoute = require('./routes/bookings');

dotenv.config();
const app = express();
const corsOptions = {
    origin: true,
    credentials: true,
};

// database connection
mongoose.set('strictQuery', false);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB database connected');
    } catch (err) {
        console.log('MongoDB database connection failed', err);
    }
};
connect(); // run immediately

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("API is working 🚀");
});

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/rents', rentRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/booking', bookingRoute);
app.use("/rent-images", express.static(path.join(__dirname, 'public/rent-images')));

module.exports = app; // 👈 export for Vercel
