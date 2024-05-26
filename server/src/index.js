// src/index.js

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const mysql = require('mysql2');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
const port = process.env.SERVERPORT;
// const port = 8000;
// const port = process.env.PORT;

app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_DB
});

module.exports = {
    init: function () {
      return mysql.createConnection(db_info);
    },
    connect: function (conn) {
      conn.connect(function (err) {
        if (err) console.error("mysql connection error : " + err);
        else console.log("mysql is connected successfully!");
      });
    },
};

const whitelist = ['http://localhost:3000', 'https://ellen.newbie.sparcsandbox.com'];
// const whitelist = ['https://ellen.newbie.sparcsandbox.com'];
// 만약 안되면 17074 대신 외부에 매핑된 포트를 사용?

const corsOptions = {
    origin: (origin, callback) => {
        console.log('[REQUEST-CORS] Request from origin: ', origin);
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    credentials: true,
};

const homeRouter = require('./routes/Home.js');
const registerRouter = require('./routes/Register.js');
const loginRouter = require('./routes/Login.js');
const labsRouter = require('./routes/Labs.js');
const labViewRouter = require('./routes/LabView.js');
const applyRouter = require('./routes/Apply.js');
const applyListRouter = require('./routes/ApplyList.js');
const myApplyListRouter = require('./routes/MyApplyList.js');
// const deleteMyApplyListRouter = require('./routes/MyApplyList.js');

app.use(cors(corsOptions));

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 3600000 * 24 * 7
    }
}));

app.use('/home', homeRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/labs', labsRouter);
app.use('/labview', labViewRouter);
app.use('/apply', applyRouter);
app.use('/applylist', applyListRouter);
app.use('/myapplylist', myApplyListRouter);

app.post('/get-prof-id', async (req, res) => {
    const { userID } = req.body;
    console.log("get-prof-id", userID);
    try {
        const professor = await prisma.professor.findFirst({
            where: {
                user_id: userID,
            },
            include: {
                user: true,
            },
        });

        if (professor) {
            console.log("profID" + professor.prof_id)
            res.json({ prof_id: professor.prof_id });
        } else {
            res.status(404).json({ error: 'Professor not found' });
        }
    } catch (error) {
        console.error('Error fetching professor:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/check-login', (req, res) => {
    try {
        const user = req.session.user;
        console.log(user)
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
    // console.log('Current session data:', req.session);
    // if (req.session.user) {
    //     res.status(200).json({ 
    //         isLoggedIn: true,
    //         user: req.session.user,
    //         isProfessor: req.session.user.isProfessor });
    // } else {
    //     res.status(200).json({ isLoggedIn: false });
    // }
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Failed to destroy the session during logout.", err);
            return res.status(500).send('Could not log out.');
        }
        res.clearCookie('connect.sid', { path: '/' }); // 'connect.sid' default name
        res.send('Logged out!');
    });
});

app.get('/', (req, res) => {
    res.send('Server connected!');
});

app.listen(port, () => {
    console.log(`Server is running at https://api.ellen.newbie.sparcsandbox.com/`);
});

