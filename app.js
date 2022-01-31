const jwt = require("jsonwebtoken");
const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const port = 5000;
const tasks = require("./routes/tasks");
// const login = require('./routes/login')
require("dotenv").config();
const authenticateMiddleWare = require("./middleware/auth");

app.use(express.json());
app.use("/api/v1/tasks", tasks);

const id = new Date().getDate();
app.post("/login", (req, res) => {
  const token = jwt.sign({ id, username, email }, process.env.JWT_SECRET);
  res.status(200).json({ msg: `user created with token: ${token}` });
});

app.get("/login", authenticateMiddleWare, (req, res) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ") || header === "") {
    return res.status(401).json({ msg: "Enter a valid jsonwebtoken" });
  }
  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res
      .status(200)
      .json({ msg: `Hello ${decoded.username}, you got the access.` });
  } catch (err) {
    res.status(401).json({ error: "Not authorized to access this route." });
  }
  // console.log(header)
});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  res.status(200).json(req.body);
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server listening at port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
