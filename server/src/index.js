// src/index.js

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = 8000;
// const port = process.env.PORT;


app.use(express.json());

const db = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'tnfqkrtm',
    database: 'db'
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

app.use(cors(corsOptions));

app.use(session({
    secret: 'your_secret_key', // 세션 암호화 키
    resave: false,             // 세션을 항상 저장할 지 여부
    saveUninitialized: false,  // 초기화되지 않은 세션을 저장할지 여부
    cookie: {
        httpOnly: true,        // 클라이언트 JavaScript가 쿠키에 접근하지 못하도록 함
        secure: false,         // https만을 위한 쿠키인지 설정
        maxAge: 3600000 * 24 * 7 // 쿠키의 생존 시간(밀리초)
    }
}));

app.use('/home', homeRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.get('/check-login', (req, res) => {
    if (req.session.user) {
        res.status(200).json({ isLoggedIn: true, user: req.session.user });
    } else {
        res.status(200).json({ isLoggedIn: false });
    }
});

app.get('/', (req, res) => {
    res.send('Server connected!');
});

app.listen(port, () => {
    console.log(`Server is running at https://api.ellen.newbie.sparcsandbox.com/`);
});

