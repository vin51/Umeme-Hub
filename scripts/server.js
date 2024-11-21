const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const db = require('../config/db');
const path = require('path')
// const authRoutes = require('../routes/auth')

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// Serve static files from the public dir
app.use(express.static(path.join(__dirname, '../public')));


// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));


// Authentication middleware
function requireLogin(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/login');
    }
}


// // Routes
// app.use('/api', authRoutes);

// // Page routes
// app.get('/', (req, res) => {
//     if (req.session.userId) {
//         res.redirect('/home');
//     } else {
//         res.sendFile(path.join(__dirname, '../public/signup.html'));
//     }
// });

// app.get('/signup', (req, res) => {
//     if (req.session.userId) {
//         res.redirect('/home');
//     } else {
//         res.sendFile(path.join(__dirname, '../public/signup.html'));
//     }
// });

// app.get('/login', (req, res) => {
//     if (req.session.userId) {
//         res.redirect('/home');
//     } else {
//         res.sendFile(path.join(__dirname, '../public/login.html'));
//     }
// });

// app.get('/home', requireLogin, (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/home.html'));
// });

// // authentication status
// app.get('/api/check-auth', (req, res) => {
//     res.json({
//         isAuthenticated: !!req.session.userId,
//         username: req.session.username
//     });
// });


// Test database connection
// app.get('/test-db', async (req, res) => {
//     try {
//         const [result] = await db.query('SELECT 1 + 1 AS result');
//         res.json({
//             message: 'Database connection successful!',
//             result: result[0]
//         });
//     } catch (error) {
//         console.error('Database connection error:', error);
//         res.status(500).json({
//             message: 'Database connection failed!',
//             error: error.message
//         });
//     }
// });

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});