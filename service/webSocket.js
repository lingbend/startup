let {WebSocketServer} = require('ws');

function run(server) {
    let webSocket = new WebSocketServer({server: server});


    webSocket.on('connection', (session) => {
        session.isAlive = true;


        session.on('message', function message(message) {
            webSocket.clients.forEach((client)=>{
                if (client != session && client.readyState == WebSocket.OPEN) {
                    client.send(message);
                }
            })
        })

        session.on('pong', ()=>{
            session.isAlive = true;
        })
    })

    setInterval(()=>{
        webSocket.clients.forEach((client)=>{
            if (client.isAlive == false) {
                return client.terminate();
            }
            client.isAlive = false;
    
            client.ping();
        })

    }, 10000)
}

module.exports = {run}