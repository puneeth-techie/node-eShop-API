import app from "./startup/app.js";
import http from "http";

//init server
const server = http.createServer(app);

//getting port from .env
const port = process.env.PORT || 5000;

//starting the server
server.listen(port, () => {
  console.log(`Server started on the port: ${port}`);
});
