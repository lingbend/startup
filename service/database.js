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


export async function addUser(username, password){
    return await users.insertOne({username, password, goalList: {}, nextGoalID: 1});

}

export async function findUser(username){
    if (await users.find({username})) {
        return true;
    }
    else {
        return false;
    }

}

export async function getUser(username){
    let user = await users.find({username})
    if (user) {
        return user;
    }
    else {
        return null;
    }

}

export async function getUsernamFromAuth(authToken){
    let auth = await auths.find(authToken);
    return auth.username;
}

export async function addAuth(authToken, username){
    return await auths.insertOne({authToken, username});
}

export async function deleteAuth(authToken){
    return await auths.deleteOne({authToken});
}

export async function findAuth(authToken){
    if (await auths.find(authToken)) {
        return true;
    }
    else {
        return false;
    }
}