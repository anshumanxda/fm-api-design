import express from "express";
import morgan from "morgan";
import cors from "cors";

import router from "./router";
import { protect } from "./module/auth";
import { createUser, signIn } from "./handlers/user";

const app = express();

app.use(morgan("dev"));
app.use(express.json()); // so that clients can send the json without any problem
app.use(express.urlencoded({ extended: true })); //helps with the query string, gives object of all the query string
app.use(cors());

app.get("/", (req, res) => {
  console.log("Changes made");
  res.send("Changes Made");
});

app.use("/api", protect, router);

app.post("/signup", createUser);
app.post("/signin", signIn);

export default app;
