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


app.use('*', ((req, res) => {
    res.send({chicken: 'nuggets'});
}))

let router = express.Router();

app.use('/api', router);

router.post('/register');

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

app.listen(8080);