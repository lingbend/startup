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
    if (await findUser(req.username)) {
        res.status(409).send({username: req.username});
    }
    else {
        await addAuth(req.username);
        await addUser(req.username, req.password);
        res.send({username: req.username});
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
    for (i of users) {
        if (username == users.username) {
            return true;
        }
    }
    return false;
}


//need to encrypt here
async function addUser(username, password) {
    users.push({username:{username}, password:{password}});
}

async function addAuth(username) {


}

app.listen(8080);