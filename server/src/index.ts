import { createServer } from "http";
import express from "express";
import router from "./routes/routes.js"
import { PrismaClient } from "@prisma/client";
import { Server } from "socket.io";
import cors from 'cors'
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";
import { liveStreams, senderStream } from "./controllers/video.controllers.js";

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

app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', router)

//This should be removed
app.use(status());




io.on('connection', socket => {

  socket.on("join:streamer", (data) => {
    socket.join(socket.id);
    senderStream.map((streamer) => {
      if (streamer.userId == data.Id) {
        streamer.socketId = socket.id;
        liveStreams.push({
          streamerName: data.name,
          streamerId: streamer.userId,
          Thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAdYE5RslJdlJJywY4ZHhJ5oGOIz5JOybzJNnNuGJ8qR_30fB9w6F-dzMB8TtMpfHuiTI&usqp=CAU",
          socketId: socket.id,
          MediaStream: streamer.MediaStream,
        })
        return;
      } else {
        console.log("streamer not found");
      }
    })
    socket.emit("me")
  })

  socket.on("join:viewer", (data) => {
    socket.join(data.Id);
  })

  socket.on("comment", data => {
    io.to(data.roomId).emit("comment", data.message);
  })

  socket.on("disconnection", () => {
    console.log("Connection Closed")
  })

})


server.listen(5000, () => console.log(`Server started at 5000`));
