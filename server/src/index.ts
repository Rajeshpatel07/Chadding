import { createServer } from "http";
import express from "express";
import router from "./routes/routes.js"
import { Server } from "socket.io";

const app = express();
const server = createServer(app)
export const io = new Server(server)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', router)


app.listen(5000, () => console.log(`Server started at 5000`));
