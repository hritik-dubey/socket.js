const express = require('express');
const path =  require("path");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const filePath = path.join(__dirname, '..', 'client/index.html');

// Define a route to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(filePath);
});

// Listen for socket.io connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for 'chat message' events
  socket.on('chat message', (msg) => {
    console.log('Message: ' + msg);
    // Broadcast the received message to all connected clients
    io.emit('chat message', msg);
  });

  // Listen for 'disconnect' events
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


// Start the server
server.listen(9876, () => {
  console.log('Server listening on port 9876');
});
