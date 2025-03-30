let express = require('express');
let cookieMonster = require('cookie-parser');
let bcrypt = require('bcryptjs');
let uuid = require('uuid');
let app = express();


let goalIndex = [];
let goalList = [];
let users = [];
let auth = [];


app.use(express.json());
// endpoints needed login, logout, register
// update goal, delete goal, create goal, get goals
// get goal index, get next goal id

let router = express.Router();

app.use('/api', router);

router.post('/register', async (req, res) => {
    if (await findUser(req.body.username)) {
        res.status(409).send({username: req.body.username});
    }
    else {
        let authToken = await addAuth(req.body.username);
        await addUser(req.body.username, req.body.password);
        sendAuthCookie(res, authToken);
        res.send({username: req.body.username});
    }
});

router.put('/login');

router.delete('/login');

let goals = express.Router();

router.use('/goals', goals);

//get goals index
goals.get('/index');

//get next goal id
goals.get('/id');

//get all goals
goals.get('*');

goals.delete('/:id');

//update goal
goals.put('/:id');

//create goal
goals.post('/:id')

async function findUser(username) {
    for (let user of users) {
        if (username == user.username) {
            return true;
        }
    }
    return false;
}

async function addUser(username, password) {
    let hashedPassword = bcrypt.hash(password, 10);
    users.push({username, password:hashedPassword.valueOf()});
}

async function addAuth(username) {
    let authToken = uuid.v4();
    auth.push({authToken:{authToken}, username:{username}});
    return authToken;
}

async function sendAuthCookie(res, cookie) {
    res.cookie('session', cookie, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict'
    });
}

app.listen(8080);