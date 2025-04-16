let ws = require('ws');

function run(server) {
    let webSocket = new ws.WebSocketServer({port: server});


    webSocket.on('connect', (session) => {
        session.isAlive = true;


        webSocket.on('message', (message) => {
            webSocket.clients.forEach((client)=>{
                if (client != session) {
                    client.send(message);
                }
            })
        })

        webSocket.on('pong', ()=>{
            session.isAlive = true;
        })

        setInterval(()=>{
            if (session.isAlive == false) {
                session.terminate();
            }
            session.ping();
            session.isAlive = false;
        }, 10000)

    })
}

module.exports = {run}