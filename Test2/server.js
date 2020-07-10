const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

// our localhost port
const port = 4001

const app = express()

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)
var ip = require("ip")
console.log("Server nodejs chay tai dia chi: " + ip.address() + ":" + port)


// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  
/// commuinication with web ---------------------------
  console.log('New client connected')

  // just like on the client side, we have a socket.on method that takes a callback function
  socket.on('change direction', (Direction) => {
    // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
    // we make use of the socket.emit method again with the argument given to use from the callback function above
    console.log('Direction changed to: ', Direction)
    // io.sockets.emit('change color', Direction)
    if(Direction=="up_left")
    io.sockets.emit('up_left', {
        message: 'up_left'
    })
    else if (Direction=="up_right")
    io.sockets.emit('up_right', {
        message: 'up_right'
    })
    else if (Direction=="up")
    io.sockets.emit('up', {
        message: 'up'
    })
    else if (Direction=="down_left")
    io.sockets.emit('down_left', {
        message: 'down_left'
    })
    else if (Direction=="down_right")
    io.sockets.emit('down_right', {
        message: 'down_right'
    })
    else if (Direction=="down")
    io.sockets.emit('down', {
        message: 'down'
    })
    else if (Direction=="stop")
    io.sockets.emit('stop', {
        message: 'stop'
    })
  })

  socket.on('disconnect', function() {
    console.log("disconnect")   //in ra màn hình console cho vui
    // clearInterval(interval1)    //xóa chu kỳ nhiệm vụ đi, chứ không xóa là cái task kia cứ chạy mãi thôi đó!
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))

 
 function ParseJson(jsondata){
   try{
     return JSON.parse(jsondata);
   }catch (error){
     return null;
   }
 }
