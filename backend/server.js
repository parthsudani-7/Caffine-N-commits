const http = require("http");
const dotenv = require("dotenv");
const app = require("./app");
const { connectDB } = require("./config/db");
const { initSocket } = require("./sockets");
dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

const server = http.createServer(app);

initSocket(server);

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});