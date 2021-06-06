const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");

// load env vars
dotenv.config({ path: "./config/config.env" });

// connect to database
connectDB();

// route files
const bootcamps = require("./routes/bootcamps");

const app = express();
const PORT = process.env.PORT || 5000;

// @dev     Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// mount router
app.use("/api/v1/bootcamps", bootcamps);

const server = app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`)
);

// handle unhandled promise rejections

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // close server and exit process
  server.close(() => process.exit(1));
});
