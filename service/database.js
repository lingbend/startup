let {MongoClient} = require('mongodb');
let config = require('./dbConfig.json');

let url = "mongodb+srv://" + config.userName + ":" + config.password + "@" + config.hostname;

let client = new MongoClient(url);

let database = client.db('goals');

let users = database.collection('users');
let auths = database.collection('auths');

(async function checkConnection(){
    try {
        await database.command({ping:1});
        console.log("connected to DB");
    }
    catch (ex) {
        console.log("failed to connect to DB " + ex.message);
        process.exit(1);
    }

})();


async function addUser(username, password){
    return await users.insertOne({username, password, goalList: {}, nextGoalID: 1});

}

 

async function findUser(username){

    // let result = ;
    // let arrayResult = await result.toArray();

    if (await users.findOne({username})) {
        return true;
    }
    else {
        return false;
    }

}

async function getUser(username){
    let user = await users.findOne({username})
    
    if (user) {
        return user;
    }
    else {
        return null;
    }

}

async function getUserNameFromAuth(authToken){
    let auth = await auths.findOne({authToken});
    return auth.username;
}

async function addAuth(authToken, username){
    return await auths.insertOne({authToken, username});
}

async function deleteAuth(authToken){
    return await auths.deleteOne({authToken});
}

async function findAuth(authToken){
    if (await auths.findOne({authToken})) {
        return true;
    }
    else {
        return false;
    }
}

//also increment goalID here
async function createGoal(username, goal){

}

async function updateGoal(username, goalID, goal){

}

async function deleteGoal(username, goalID){

}

module.exports = {
    addUser,
    findUser,
    getUser,
    getUserNameFromAuth,
    addAuth,
    deleteAuth,
    findAuth,
    createGoal,
    updateGoal,
    deleteGoal
}