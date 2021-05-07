//Imports express framework
const express = require("express");

const DoctorAppointmentsController = require("./controllers/DoctorAppointmentsController");
const client = require("./config/search-engine");

const routes = express.Router();

/**
 * Imports DoctorController
 * The DoctorController.js implements functions to:
 * List all doctors,one doctor and checks if there has been error find data in database
 */
const DoctorController = require('./controllers/DoctorController');

/**
 * This route receives HTTP Get Request 
 * and returns Response to the "/" path
 */
routes.get("/", (_request, response) => {
  return response.status(200).send('Service Available');
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
routes.get('/doctors', DoctorController.list);


/**
 * This route will find one single doctor data in database
 * It Will use DoctorController
 * In DoctorController file, it will find index() function that searchs one single doctor
 * by his Primary Key
 */
routes.get("/doctors/:id", DoctorController.index);

routes.get("/doctors/search", (request, response) => {
  const { address, zip_code, city, speciality } = request.body;

  const body = {
    size: 100,
    from: 0,
    query: {
      match: {
        address,
        zip_code,
        city,
        speciality,
      },
    },
  };

  client
    .search({ index: "doctors", body })
    .then((results) => {
      console.log(results);
      return response.status(200).json(results.hits.hits);
    })
    .catch((error) => {
      console.log(error);
      return response.status(500).json({
        message: "We could not load the data. Please, try again later.",
      });
    });
});


module.exports = routes