import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "colyseus";
import { monitor } from "@colyseus/monitor";
// import socialRoutes from "@colyseus/social/express"

import { BingoRoom } from "./rooms/BingoRoom";
import { retrieveUser } from "./api/retrieveUser";

const host = '192.168.0.4'
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
app.post("/signin", retrieveUser)
app.use("/colyseus", monitor());

gameServer.listen(port, host);
console.log(`Listening on ws://${host}:${ port }`)
