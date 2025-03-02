const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*", // For development only. Adjust for production.
    },
});

// Log when a client connects
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Optionally, send a welcome message
    socket.emit("notification", { message: "Welcome to real-time notifications!" });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Example: Emit a notification every 10 seconds
setInterval(() => {
    const notification = {
        message: "New notification at " + new Date().toLocaleTimeString(),
        timestamp: Date.now(),
    };
    io.emit("notification", notification);
}, 10000);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
