import { io } from '../index.js'

io.on('connection', socket => {
  console.log(socket.id);
  socket.on("message", data => {
    console.log(data)
    io.emit("message", data);
  })

  socket.on("disconnection", reason => {
    console.log("Connection Closed")
  })

})
