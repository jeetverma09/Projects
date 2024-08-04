const express = require('express')
const http = require('http');
const cors = require('cors');
const WebSocket = require('ws');
const { sequelize } = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { saveMessage } = require('./controller/messageController');
const User = require('./model/User');

const app=express();
const server=http.createServer(app)
const wss = new WebSocket.Server({ server });

app.use(cors())
app.use(express.json());

sequelize.sync().then(()=>{
    console.log("Database Connected")
}).catch((e)=>{
    console.log('Database connection error',e)
})

app.use('/api/users',userRoutes)
app.use('/api/messages',messageRoutes)

wss.on('connection', (ws) => {
    console.log("New Websocket Connection");

    ws.on('message', async (message) => {
        console.log("Message received:", message);
        const parsedMessage = JSON.parse(message.toString()); 
        const newMessage = await saveMessage(parsedMessage);
        const user = await User.findOne({ where: { id: newMessage.senderId } });
        newMessage.username = user.username;
        wss.clients.forEach(client=>{
            if(client.readyState===WebSocket.OPEN){
                client.send(JSON.stringify(newMessage))
            }
        })
    });

    ws.on('close', () => {
        console.log("User Disconnected");
    });
});

const port=process.env.PORT || 5000
server.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})