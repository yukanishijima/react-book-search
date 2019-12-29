// require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const app = express();

const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);


// Middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


// Routes
app.use(routes);


// Connect to Mongo DB 
// If deployed, use the deployed database. Otherwise use the local database
// const MONGODB_URI = process.env.MONGODB_URI || `mongodb://${process.env.USER}:${process.env.PASSWORD}@ds337418.mlab.com:37418/heroku_9chzb1rd`;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/googlebooks";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });


// socket
io.on('connection', socket => {
  console.log('user connected')

  // once we get the event from one of the clients, send it to the rest of the clients
  socket.on('message', (msg) => {
    io.emit('message', msg)
    console.log(`msg sent!`);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// app.listen(PORT, () => {
//   console.log(`🌎 ==> API server now on port ${PORT}!`);
// });
