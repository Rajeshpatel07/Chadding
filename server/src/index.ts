import { createServer } from "http";
import express from "express";
import router from "./routes/routes.js"
import { PrismaClient } from "@prisma/client";
import { Server } from "socket.io";
import cors from 'cors'
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";
import { liveStreams } from "./controllers/video.controllers.js";

//This is only for performance purpose remove it after the testing.
import status from 'express-status-monitor'

const app = express();
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});
export const prisma = new PrismaClient();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Allow requests from these origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true // Include credentials in the response
}));
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', router)

//This should be removed
app.use(status());




io.on('connection', socket => {

  socket.on("join:streamer", (data) => {
    console.log("Socket Id", socket.id);
    socket.join(socket.id);
    liveStreams.map((streamer) => {
      if (streamer.Id == data.Id) {
        streamer.socketId = socket.id;
        return;
      } else {
        console.log("streamer not found");
      }
    })
    socket.emit("me", socket.id)
  })

  socket.on("join:viewer", (data) => {
    socket.join(data.Id);
  })

  socket.on("comment", data => {
    io.to(data.roomId).emit("comment", data.message);
  })

  socket.on("disconnection", () => {
    socket.disconnect();
    console.log("Connection Closed")
  })

})


server.listen(5000, () => console.log(`Server started at 5000`));
