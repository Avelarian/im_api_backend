const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Doctor = require('../models/Doctor')
const Appointment = require('../models/Appointment')

const connection = new Sequelize(dbConfig);

Doctor.init(connection)
Appointment.init(connection)

Doctor.associate(connection.models)
Appointment.associate(connection.models);

module.exports = connection
