const express = require("express");
const dotenv = require("dotenv");

// route files
const bootcamps = require("./routes/bootcamps");

// load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT || 5000;

// mount router
app.use("/api/v1/bootcamps", bootcamps);

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`)
);
