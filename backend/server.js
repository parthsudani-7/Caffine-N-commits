const http = require("http");
const dotenv = require("dotenv");
const app = require("./app");
const { connectDB } = require("./config/db");
const { initSocket } = require("./sockets");

// ✅ LOAD ENV FIRST
dotenv.config();

const PORT = process.env.PORT || 5000;

// ✅ CONNECT DATABASE
connectDB();

// ✅ CREATE SERVER
const server = http.createServer(app);

// 🔥 INIT SOCKET
initSocket(server);

// ✅ START SERVER
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});