const NodeGeocoder = require("node-geocoder");

const options = {
  // cant use process.env for Provider and ApiKey
  provider: "mapquest",
  httpAdapter: "https",
  apiKey: "oXnPIq7TRW7nEaSsh1LYGuICoIqrTJwt",
  formatter: null,
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
