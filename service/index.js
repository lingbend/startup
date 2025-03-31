let express = require('express');
let cookieMonster = require('cookie-parser');
let bcrypt = require('bcryptjs');
let uuid = require('uuid');
const cookieParser = require('cookie-parser');
let app = express();


let goalIndex = [];
let goalList = [];
let users = [];
let auths = [];


app.use(express.json());
app.use(cookieParser());
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
        await sendAuthCookie(res, authToken);
        res.send({username: req.body.username});
    }
});

router.put('/login', async (req, res) => {
    if (!await findUser(req.body.username)) {
        res.status(401).send({username: req.body.username});
    }
    else {
        let user = await getUser(req.body.username);
        let hashedPassword = user.password;
        if (await bcrypt.compare(req.body.password, hashedPassword)) {
            let authToken = await addAuth(req.body.username);
            await sendAuthCookie(res, authToken);
            res.send({username: req.body.username});
        }
        else {
            res.status(401).send({username: req.body.username});
        }
    }
});

router.delete('/login', async (req, res) => {
    let authToken = req.cookies?.['session'];
    if (authToken) {
        await deleteAuth(authToken);
    }
    res.clearCookie(authToken)
    res.send({});
});

let goals = express.Router();

router.use('/goals', goals);

//get goals index
goals.get('/index', authenticateRequest, async (req, res) => {
    let user = await getUserFromAuth(req.cookies?.['session']);
    res.send({goalindex: Object.keys(user.goalList)});
});

//get next goal id
goals.get('/id', authenticateRequest, async (req, res) => {
    let user = await getUserFromAuth(req.cookies?.['session']);
    res.send({nextGoalID: user.nextGoalID});
});

//get all goals
goals.get('*', authenticateRequest, async (req, res) => {
    let user = await getUserFromAuth(req.cookies?.['session']);
    res.send({goalList: user.goalList});
});

goals.delete('/:id', authenticateRequest, async (req, res) => {
    let user = await getUserFromAuth(req.cookies?.['session']);
    let reqID = parseInt(req.params.id);
    if (user.goalList[reqID]) {
        delete user.goalList[reqID];
    }
    else {
        res.status(404);
    }
    res.send({goalindex: Object.keys(user.goalList), goalList: user.goalList});
});

//update goal
goals.put('/:id', authenticateRequest, async (req, res) => {
    let user = await getUserFromAuth(req.cookies?.['session']);
    let reqID = parseInt(req.params.id);
    if (user.goalList[reqID]) {
        user.goalList[reqID] = req.body.goal;
    }
    else {
        res.status(404);
    }
    res.send({goalindex: Object.keys(user.goalList), goalList: user.goalList});
});

//create goal
goals.post('/:id', authenticateRequest, async (req, res) => {
    let user = await getUserFromAuth(req.cookies?.['session']);
    let reqID = parseInt(req.params.id);
    if (user.nextGoalID === reqID) {
        user.goalList[reqID] = req.body.goal;
        user.nextGoalID++;
        res.send({goalindex: Object.keys(user.goalList), goalList: user.goalList, nextGoalID:
            user.nextGoalID, currentGoalID: reqID});
    }
    else {
        res.status(400).send({message: "Wrong GoalID", nextGoalID: user.nextGoalID});
    }
})

async function authenticateRequest(req, res, next) {
    let authToken = req.cookies?.['session'];
    if (await findAuth(authToken)) {
        next();
    }
    else {
        res.status(401).send({message: "Unauthorized"});
    }
}

async function findUser(username) {
    for (let user of users) {
        if (username == user.username) {
            return true;
        }
    }
    return false;
}

async function addUser(username, password) {
    let hashedPassword = await bcrypt.hash(password, 10);
    users.push({username, password:hashedPassword.valueOf(), goalList: {}, nextGoalID: 1});
}

async function getUser(username) {
    for (let user of users) {
        if (username == user.username) {
            return user;
        }
    }
}

async function getUserNameFromAuth(authToken) {
    for (let auth of auths) {
        if (auth.authToken == authToken) {
            return auth.username;
        }
    }
}

async function getUserFromAuth(authToken) {
    let username = await getUserNameFromAuth(authToken);
    let user = await getUser(username);
    return user;
}

async function addAuth(username) {
    let authToken = uuid.v4();
    auths.push({authToken, username});
    return authToken;
}

async function deleteAuth (authToken) {
    auths = auths.filter((auth) => {
        auth.authToken != authToken;
    })
}

async function findAuth (authToken) {
    for (let auth of auths) {
        if (auth.authToken == authToken) {
            return true;
        }
    return false;
    }
}

async function sendAuthCookie(res, cookie) {
    res.cookie('session', cookie, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict'
    });
}

app.listen(8080);