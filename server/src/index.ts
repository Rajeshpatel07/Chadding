import { createServer } from "http";
import express from "express";
import router from "./routes/routes.js"
import { PrismaClient } from "@prisma/client";
import { Server } from "socket.io";
import cors from 'cors'
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";

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


io.on('connection', socket => {
  console.log(socket.id);

  socket.on("join", (data) => {
    socket.join(data.roomId);
  })

  socket.on("comment", data => {
    io.emit("message", data);
  })

  socket.on("disconnection", () => {
    console.log("Connection Closed")
  })

})


server.listen(5000, () => console.log(`Server started at 5000`));
