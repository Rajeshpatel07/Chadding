import { createServer } from "http";
import express from "express";
import router from "./routes/routes.js"
import { PrismaClient } from "@prisma/client";
import { Server } from "socket.io";
import cors from 'cors'
import cookieParser from 'cookie-parser';

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
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use('/api', router)


io.on('connection', socket => {
  console.log(socket.id);
  socket.on("comment", data => {
    io.emit("message", data);
  })

  socket.on("disconnection", reason => {
    console.log("Connection Closed")
  })

})


server.listen(5000, () => console.log(`Server started at 5000`));
