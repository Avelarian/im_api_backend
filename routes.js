const express = require("express");

const DoctorController = require("./controllers/DoctorController");

const routes = express.Router();

routes.get("/", (_request, response) => {
  return response.status(200).send('Service Available');
});

/** DOCTOR ROUTES */
routes.get("/doctors/:id/appointments", DoctorController.getDoctorAppointments);
routes.post("/doctors/:id/appointments", DoctorController.requestAppointment);

module.exports = routes