const express = require("express");
const app = express();

const ConnectDb = require("./db/db");

// Import Routes
const users = require("./routes/users");
const profiles = require("./routes/profiles");
const posts = require("./routes/posts");
const images = require("./routes/images");

// Port
const PORT = process.env.PORT || 5000;

// Connect to database
ConnectDb();

app.get("/", (req, res) => {
  res.send("API Running!");
});

// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

// Routes
app.use("/users", users);
app.use("/profiles", profiles);
app.use("/posts", posts);
app.use("/images", images);

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});
