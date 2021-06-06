const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const colors = require("colors");
const errorHandler = require("./middlewares/errorHandler");
// route files
const bootcamps = require("./routes/bootcamps");

// load env vars
dotenv.config({ path: "./config/config.env" });

// connect to database
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

// Body parser
app.use(express.json());

// @dev     Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// mount router
app.use("/api/v1/bootcamps", bootcamps);

app.use(errorHandler);

const server = app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  )
);

// handle unhandled promise rejections

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // close server and exit process
  server.close(() => process.exit(1));
});
