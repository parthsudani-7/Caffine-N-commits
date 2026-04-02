const { io } = require("socket.io-client");

const socket = io("http://localhost:5000");

// join room (VERY IMPORTANT)
socket.emit("join", "69c817259f9a07a1bb65b44b");

socket.on("notification", (data) => {
  console.log("🔔 New Notification:", data);
});