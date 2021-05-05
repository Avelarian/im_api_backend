const express = require("express");

const DoctorAppointmentsController = require("./controllers/DoctorAppointmentsController");

const routes = express.Router();

routes.get("/", (_request, response) => {
  return response.status(200).send('Service Available');
});

/** DOCTOR ROUTES */
routes.get("/doctors/:id/appointments", DoctorAppointmentsController.list);
routes.post("/doctors/:id/appointments", DoctorAppointmentsController.store);

module.exports = routes