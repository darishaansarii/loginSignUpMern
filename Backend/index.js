import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { userModel } from "./model/userSchema.js";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

const MONGODB_URI =
  "mongodb+srv://darisha:darisha@cluster0.x3fyvya.mongodb.net/";

mongoose
  .connect(MONGODB_URI)
  .then((res) => console.log("Mongodb is connected..."))
  .catch((err) => console.log(err));

app.post("/signup", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Required fields are missing.",
        status: false,
      });
    }

    let encryptPassword = await bcrypt.hash(password, 10);

    let userObj = {
      name,
      email,
      password: encryptPassword,
    };

    const saveUser = await userModel.create(userObj);

    return res.status(200).json({
      message: "User create successfully!",
      saveUser,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
     return res.status(400).json({
        message: "Required fields are missing...",
        status: false,
      });
    }

    const getUser = await userModel.findOne({email});
    console.log(getUser);

    if(!getUser) {
        res.status(400).json({
            message: "Invalid credentials",
            status: false
        });
        return;
    }

    const comparePassword = await bcrypt.compare(password, getUser.password);

    if(!comparePassword){
        res.status(400).json({
            message: "Invalid credentials",
            status: false
        })
    }

    res.status(200).json({
        message: "User Login Successfully",
        status: true,
        getUser
    })
    
  } catch (error) {
    res.status(400).json({
      message: "Internal Server Error",
      status: false,
    });
  }
});

app.get("/", (req, res) => {
  res.json({
    message: "Server is running...",
    status: true,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
