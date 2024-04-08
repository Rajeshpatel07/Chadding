import { createServer } from "http";
import express from "express";
import router from "./routes/routes.js"
import { PrismaClient } from "@prisma/client";
import { Server } from "socket.io";
import cors from 'cors'

const app = express();
const server = createServer(app);
export const io = new Server(server);
export const prisma = new PrismaClient();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', router)


app.listen(5000, () => console.log(`Server started at 5000`));
