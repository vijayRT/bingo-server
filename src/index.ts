require('dotenv').config()
import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "colyseus";
import { monitor } from "@colyseus/monitor";
// import socialRoutes from "@colyseus/social/express"

import { BingoRoom } from "./rooms/BingoRoom";
import userRouter from './api/users'

const host = process.env.HOST
const port = Number(process.env.PORT || 2567);
const app = express()

app.use(cors());
app.use(express.json())

const server = http.createServer(app);
const gameServer = new Server({
  server,
});

// register your room handlers
gameServer.define('bingo_room', BingoRoom);
app.use("/users", userRouter)
app.use("/colyseus", monitor());

gameServer.listen(port, host);
console.log(`Listening on ws://${host}:${ port }`)
