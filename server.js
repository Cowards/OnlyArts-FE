import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  allowedHeaders: "Content-Type,Authorization",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use("/", express.static(path.join(__dirname, "public")));
app.set("views", "./src/page");
app.set("view engine", "pug");

//khúc này nhét router zô đây hơi quằn nma dùng tạm dược
// nav trên pug nên trỏ đến mấy cái router này thì sẽ dùng SSR

app.get("/", (req, res) => {
  res.redirect("/home/1");
});
app.get("/home", (req, res) => {
  res.redirect("/home/1");
});
app.get("/home/:page", (req, res) => {
  res.render("home");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/discover", (req, res) => {
  res.render("discover");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});
app.get("/account", (req, res) => {
  res.render("account");
});
app.get("/artworks", (req, res) => {
  res.render("artworks");
});
app.get("/publish", (req, res) => {
  res.render("publish");
});
app.get("/logout", (req, res) => {
  res.render("logout");
});

app.get("/geturl", (req, res) => {
  res.send({ url: process.env.API_URL });
});

//khúc này .env đ có port thì mặc định là 4000
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  console.log(`${process.env.HOST}:${process.env.PORT}`);
});
