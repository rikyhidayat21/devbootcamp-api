const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Load env vars newest
dotenv.config({ path: "./config/config.env" });

// console.log(process.env.MONGO_URI);
// load modes
const Bootcamp = require("./models/Bootcamp");

// connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// read json files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

// import into the DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);

    console.log("Data imported...".green.inverse);
    process.exit();
  } catch (error) {
    console.log(error, "<== error");
  }
};

// delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();

    console.log(`Data deleted...`.red.inverse);
  } catch (error) {
    console.log(error, "error delete many");
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
