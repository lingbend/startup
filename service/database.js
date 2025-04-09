let {MongoClient} = require('mongodb');
let config = require('dbConfig.json');

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
    catch {
        console.log("failed t+o connect to DB");
        process.exit(1);
    }

})();


async function findUser(username){

}

async function addUser(username, password){

}

async function getUser(username){

}

async function getUsernamFromAuth(authToken){

}

async function addAuth(authToken, username){

}

async function deleteAuth(authToken){

}

async function findAuth(authToken){

}