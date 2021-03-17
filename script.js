const mongoose = require("mongoose");
const Properties = require("./models/propertyModel");
require("dotenv").config({ path: "./config.env" });
const fs = require("fs");

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("database connect");
  });

const data = JSON.parse(fs.readFileSync("./data/sample-data.json", "utf-8"));

async function add() {
  try {
    await Properties.create(data);
  } catch (err) {
    console.log(err);
  }
}

async function deleteShit() {
  try {
    await Properties.deleteMany({});
  } catch (err) {
    console.log(err);
  }
}
add();
