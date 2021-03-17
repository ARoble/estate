const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejs = require("ejs");
const bodyParser = require("body-parser");

require("dotenv").config({ path: "./config.env" });
const app = express();

const estateRoutes = require("./routes/estateRoutes");
const userRoutes = require("./routes/userRoutes");
const viewsRoutes = require("./routes/viewsRoutes");

app.use(express.json());
app.use(express.static(__dirname));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs");

app.use("/", viewsRoutes);
app.use("/api/v1", estateRoutes);
app.use("/api/v1", userRoutes);

app.all("*", (req, res, next) => {
  const err = new Error(
    "Unfortunately the page you are looking for does not exsist"
  );
  err.statusCode = 404;
  err.status = "Fail";
  next(err);

  // next(new AppError("message", 404));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || "404";
  const status = "Error";
  // const status = err.statusCode.startsWith("4") ? "Fail" : "Error";
  res.render("404");
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("database connect");
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
