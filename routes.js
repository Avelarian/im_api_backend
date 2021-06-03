//Imports express framework
const express = require("express");

const DoctorAppointmentsController = require("./controllers/DoctorAppointmentsController");
const { doctorsClient } = require("./engines");

const routes = express.Router();

/**
 * Imports DoctorController
 * The DoctorController.js implements functions to:
 * List all doctors,one doctor and checks if there has been error find data in database
 */
const DoctorController = require("./controllers/DoctorController");

/**
 * This route receives HTTP Get Request
 * and returns Response to the "/" path
 */
routes.get("/", (_request, response) => {
  return response.status(200).send("Service Available");
});

/** DOCTOR ROUTES */
routes.get("/doctors/:id/appointments", DoctorAppointmentsController.list);
routes.post("/doctors/:id/appointments", DoctorAppointmentsController.store);

/**
 * This route will find all doctors data in database
 * It Will use DoctorController
 * In DoctorController file, it will find list() function that searchs one single doctor
 * by his Primary Key
 */
routes.get("/doctors", DoctorController.list);

/**
 * This route will find one single doctor data in database
 * It Will use DoctorController
 * In DoctorController file, it will find index() function that searchs one single doctor
 * by his Primary Key
 */
routes.get("/doctors/:id", DoctorController.index);

routes.post("/doctors/search", (request, response) => {
  const { searchTerm } = request.body;

  doctorsClient
    .search(searchTerm, {
      hitsPerPage: 100,
    })
    .then(({ hits }) => {
      return response.status(200).json(hits);
    })
    .catch((error) => {
      console.log(error);
      return response.status(500).json({
        message: "We could not load the data. Please, try again later.",
      });
    });
});

module.exports = routes;
