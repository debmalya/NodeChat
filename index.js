const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

server.listen(port,() => {
   console.log(`Server is running at ${port}`);
});

app.get('/', (req,res) => {
   res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('usr connected');
    socket.emit('message',{server:"hey, how are you?"});
    socket.on('message',(data) => {
         console.log(`message : ${data}`);
         io.emit('message', data);
    });

    socket.on('disconnect',()=>{
       console.log('user disconnected');
       io.emit('message','user disconnected');
    });
});