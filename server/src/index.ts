import { createServer } from "http";
import express from "express";
import router from "./routes/routes.js"
import { PrismaClient } from "@prisma/client";
import WebSocket, { WebSocketServer } from "ws";
import cors from 'cors'
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";
import { Redis } from "ioredis";
import { liveStreams } from "./controllers/video.controllers.js";

//This is only for performance purpose remove it after the testing.
import status from 'express-status-monitor'
import { randomUUID } from "crypto";

const app = express();
const server = createServer(app);
export const wss = new WebSocketServer({ server: server });
export const prisma = new PrismaClient();
export const redis = new Redis();

app.use('/images', express.static("Storage/Images"));
app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', router)

//This should be removed
app.use(status());

let clients: Array<{ socketId: string; roomId: string; }> = [];

wss.on('connection', (ws) => {

  const socketId = randomUUID();
  ws.on('message', (data: string) => {

    try {
      const message = JSON.parse(data);
      switch (message.event) {
        case 'join:streamer':
          liveStreams.map((streamer) => {
            if (streamer.Id === message.Id) {
              streamer.socketId = socketId;
              streamer.Thumbnail = message.thumbnail;
              return;
            } else {
              console.log('Streamer not found');
            }
          });
          ws.send(JSON.stringify({ type: "me", socketId: socketId }));
          break;

        case 'join:viewer':
          if (message.roomId) {
            clients.push({ socketId: socketId, roomId: message.roomId });
          }
          break;

        case 'comment':
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: 'comment', comment: message.comment, username: message.username }));
            }
          });
          break;

        default:
          console.log('Unknown event');
      }
    } catch (error) {
      console.log(error);
    }
  });

  ws.on('close', () => {
    clients = clients.filter(client => {
      client.socketId !== socketId;
    })
    console.log('Connection closed');
  });
});
server.listen(5000, () => console.log(`Server started at 5000`));
