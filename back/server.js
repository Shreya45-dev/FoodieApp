require('dotenv').config()

const app=require('./src/app')
const connectDB=require('./src/db/db')
connectDB()
const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

/*require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./src/app'); 
const connectDB = require('./src/db/db');

// 🔹 1️⃣ Connect MongoDB
connectDB();

// 🔹 2️⃣ Create HTTP server
const server = http.createServer(app);

// 🔹 3️⃣ Setup Socket.IO
const io = new Server(server, { cors: { origin: "http://localhost:5173", credentials: true } });

// 🔹 4️⃣ Make io accessible in controllers (middleware)
app.use((req, res, next) => {
  req.io = io;
  next();
});

// 🔹 5️⃣ Socket.IO connection
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("joinRestaurant", (foodPartnerId) => {
    socket.join(foodPartnerId);
    console.log(`Food partner joined room: ${foodPartnerId}`);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
}); 

// 🔹 6️⃣ Start server
const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));*/