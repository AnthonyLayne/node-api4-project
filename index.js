require("dotenv").config();

const express = require("express");

const cors = require("cors");

const users = [];
const server = express();

const PORT = process.env.PORT || 9000;

server.use(express.json());

server.use(cors());

//   | GET    | /api/users    | Returns an array users.                                                                             |
server.get("/api/users", (req, res) => {
  return res.status(users.length === 0 ? 404 : 200).json(users);
});

//   | POST   | /api/register | Creates a user from { username, password } in the `request body`, responds with newly created user. |
server.post("/api/register", (req, res) => {
  users.push(req.query);
  return res.status(201).json(req.query);
});

//   | POST   | /api/login    | Checks { username, password } in the `request body`, responds with a welcome message.
server.post("/api/login", (req, res) => {
  User.getAll().then((user) => {
    res.json(user);
  });
});

server.use("*", (req, res) => {
  return res.status(404).json({
    message: "Not Found",
  });
});

server.use((err, req, res, next) => {
  return res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
