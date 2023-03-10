import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import Comment from "./models/Comments.js";

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://reddit-app-nw97.onrender.com"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const secret = process.env.SECRET_KEY;
const connectionString = process.env.DATABASE_URL;

const getUserFromToken = async (token) => {
  const userInfo = await jwt.verify(token, secret);
  return await User.findById(userInfo.id);
};

mongoose.set("strictQuery", false);
await mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.log);

app.get("/", async (req, res) => {
  const comment = await Comment.find({});
  res.json(comment);
});

app.post("/register", async (req, res) => {
  const { email, username } = req.body;
  const password = bcrypt.hashSync(req.body.password, 10);
  const createUser = async () => {
    const user = new User({
      email,
      username,
      password,
    });
    try {
      const info = await user.save();
      res.status(201);

      jwt.sign({ id: user._id }, secret, (err, token) => {
        if (err) {
          console.log(err);
          res.status(500);
        } else {
          // console.log(token);
          res.status(201).cookie("token", token).send();
        }
      });
    } catch (error) {
      console.error(error.message);
      res.status(500);
    }
  };

  createUser();
});

app.get("/user", (req, res) => {
  const getUser = async () => {
    const token = req.cookies.token;
    try {
      const user = await getUserFromToken(token);
      // res.clearCookie("token", "").send();

      res.json({ username: user.username });
    } catch (err) {
      // console.log("error45")
      console.error(err.message);
      res.status(500);
    }
  };

  getUser();
});

app.get("/logout", (req, res) => {
  res.clearCookie("token", "").send("Successfully logged out");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const findUser = async () => {
    try {
      const user = await User.findOne({ username });
      if (user.username === username && user.password === password) {
      }
      if (user && user.username == username) {
        const passOk = bcrypt.compareSync(password, user.password);
        if (passOk) {
          jwt.sign({ id: user._id }, secret, (err, token) => {
            const getUser = async () => {
              // const token = req.cookies.token;
              try {
                const user = await getUserFromToken(token);
                // res.clearCookie("token", "").send();
                res.cookie("token", token).send({ username: user.username });
                console.log(token);
              } catch (err) {
                // console.log("error45")
                console.error(err.message);
                res.status(500);
              }
            };
            getUser();
            // const user = await getUserFromToken(token)
          });
        } else {
          res.status(422).send();
          console.log("invalid password");
        }
      } else {
        res.status(422).send("Invalid username");

        console.log("invalid user");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  findUser();
});

app.post("/comments", async (req, res) => {
  // const createCommment = async () => {
    const token = req.cookies.token
    try {
      const userInfo = await getUserFromToken(token);
      const { title, body } = req.body;
      const comment = new Comment({
        title,
        body,
        author: userInfo.username,
        postedAt: Date.now(),
      });
      const newComment = await comment.save();

      res.status(201).send(newComment);
    } catch (error) {
      console.error(error.message);
    }
  // };
  // createCommment();
});

app.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.find().sort({postedAt: -1});
    // const comments = await Comment.find({});
    res.json(comments);
    // console.log(comments)
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/comments/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.json(comment);
  } catch (error) {
    console.error(err.message)
  }
});

app.listen(4000, () => {
  console.log("Listening on Port 4000");
});
