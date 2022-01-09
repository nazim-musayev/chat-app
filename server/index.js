const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');


app.use(cors()); 

const socketServer = http.createServer(app);  

const io = new Server(socketServer, {
  cors: {
    origin: "http://localhost:3000"
  }
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user ${socket.id} joined to room ${data}`)
  });

  socket.on("send_message", (data) => {
    socket.to(data.chatroomID).emit("new_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`disconnected - ${socket.id}`)
  });
})

socketServer.listen(3001, () => {
  console.log('your socket server running')
});

const { ApolloServer } = require('apollo-server'); 
const mongoose = require('mongoose');

const { typeDefs } = require('./graphql/type-defs');
const { resolvers } = require('./graphql/resolvers');
const { MONGODB_URI } = require('./config.js');

const apolloServer = new ApolloServer({ typeDefs, resolvers });

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to mongo db')
    return apolloServer.listen({ port: 5000 })
})
  .then(res => console.log(`your apollo server running at ${res.url}`));
