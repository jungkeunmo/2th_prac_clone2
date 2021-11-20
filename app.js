const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const globalRouter = require("./routers/globalRouter");
const boardRouter = require("./routers/boardRouter");
const session = require("express-session");

const PORT = process.env.PORT;
const app = express();

app.set("view engine", "pug");
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "JGM",
    resave: false,
    saveUninitialized: true
}));

app.use("/", globalRouter);
app.use("/board", boardRouter);

app.listen(PORT, () => {
    console.log(`🐰🥕http://localhost:${PORT} PRAC_CLONE SERVER START🐶🐾`);
});