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
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use("/", express.static(path.join(__dirname, "public")));
app.set("views", "./src/page");
app.set("view engine", "pug");

//khúc này nhét router zô đây hơi quằn nma dùng tạm dược
// nav trên pug nên trỏ đến mấy cái router này thì sẽ dùng SSR
app.get("/", (req, res) => {
  res.render("index");
});

//khúc này .env đ có port thì mặc định là 4000
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
