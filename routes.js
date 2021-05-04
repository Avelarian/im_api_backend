const express = require("express");

const routes = express.Router();

routes.get("/", (_request, response) => {
  return response.status(200).send('Service Available');
});

module.exports = routes