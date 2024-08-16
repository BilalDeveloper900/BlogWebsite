const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const newsRoutes = require('./routes/newsRoutes');
const session = require('express-session');
require('./auth');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Use session middleware before passport.session()
app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/news', newsRoutes);

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
);

app.get('/login', (req, res) => {
    res.send('Some thing went wrong!');
});

app.get('/', (req, res) => {
    res.send('You are logged in successfully');
});

mongoose.connect("mongodb://localhost:27017/news-blog")
    .then(() => console.log('MongoDB is connected'))
    .catch(err => console.error('Connection error:', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
