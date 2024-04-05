import { io } from '../index.js'

io.on('connection', socket => {
  console.log(socket.id);
  socket.on("message", data => {
    console.log(data)
  })

  socket.on("disconnection", reason => {
    console.log("Connection Closed")
  })

})
