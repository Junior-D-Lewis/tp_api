require("dotenv").config();
const app = require("./src/app");
const http = require("http");
const server = http.createServer(app);

server.listen(process.env.APP_PORT, () => {
  console.log(`Server running on http://${process.env.APP_HOST}:${process.env.APP_PORT}`);
});