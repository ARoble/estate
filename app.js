const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const path = require("path");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const flash = require("express-flash-messages");

// Passport Config
require("./utils/passport")(passport);
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

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  if (req.user) {
    res.locals.logged = true;
    res.locals.user = req.user;

    console.log("logged in!");
  } else {
    // res.locals.logged = true;
    // res.locals.user = {
    //   role: "user",
    //   fullName: "Abdulladif Roble",
    //   email: "abdulladif0042@gmail.com",
    //   phone: 633628935,
    //   location: "hargeisa",
    // };

    res.locals.logged = false;
    console.log("not logged in!");
  }
  next();
});

app.use("/", viewsRoutes);
app.use("/", userRoutes);

app.use("/api/v1", estateRoutes);
app.use("/api/v1", userRoutes);

app.all("*", (req, res, next) => {
  next(new Error("Unfortunately the page you are looking for does not exsist"));
});

app.use((err, req, res, next) => {
  res.render("404", { message: err.message });
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
