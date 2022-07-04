//nodemon start or npm start
//npm install --save-optional bufferutil utf-8-validate
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

//setting up socket.io
const server = require("http").createServer(app); //to start a socket io server
const io = require("socket.io")(server, { cors: { origin: "*" } });

app.set("view engine", "ejs"); // this will take ejs into consideration
app.get("/home", (req, res) => {
  res.render("home"); // this will render home.ejs file
//res.render("test"); // this will render test.ejs file
});

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

io.on("connection", (socket) => {
  console.log(`connection established(user joined) : ${socket.id}`);

  socket.on("message", (data) => {
    // console.log(data);
    //we will emit the data we get from the user to everyone or broadcast to all the user on the server
    socket.broadcast.emit("message", data); //socket.broadcast.emit this will broadcast the message to everyone instead of us or the server.
  }); //front end - socket.emit("message", 'hey there');
  //this will listen the data if there is emit or not
});

io.on("disconnect", (socket) => {
    console.log(`connection closed(user left) : ${socket.id}`);
})

//to use this on app or client side
//const socket = io("http://localhost:5000");
//socket.on("connection", (socket) => {})
