import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const io = new Server(8000, {
  cors: true,
});
// const emailToSocketIdMap = new Map();
// const socketidToEmailMap = new Map();
io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);
  socket.on("room:join", (data) => {
    const { email, room } = data;
    console.log('room is', room);
    // emailToSocketIdMap.set(email, socket.id);
    // socketidToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    console.log('calling vai');
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    console.log('accepted vai');
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });

  socket.on("message", (messageData) => {
    const { sender, receiver, message } = messageData;
    const messageToSend = {
      sender,
      receiver,
      message,
    };
    io.emit("message", messageToSend);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected message socket!");
  });
});

mongoose.connect("mongodb://localhost:27017/growthDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongoDB");
});

import "./modals/User.js";
import "./modals/Buisness.js";
import "./modals/Economics.js";
import "./modals/Chat.js";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    const { authorization } = req.headers;
    if (authorization) {
      const { userId } = jwt.verify(authorization, "avbdd!@#$]");
      return { userId: userId };
    }
  },
});
console.log(`🚀 Server ready at ${url}`);
