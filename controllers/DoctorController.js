const nodemailer = require("nodemailer");

const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const utils = require("../utils");

module.exports = {
  async getDoctorAppointments(request, response) {
    const { id: doctor_id } = request.params;

    if (!utils.verifyId(doctor_id)) {
      return response
        .status(401)
        .json({ message: "The id sent is not valid." });
    }

    Appointment.findAll({ where: { doctor_id } })
      .then((appointments) => {
        return response.status(200).json(appointments);
      })
      .catch((error) => {
        console.log(error);
        return response.status(500).json({
          message:
            "We could not load the doctor appointments. Please, try again later.",
        });
      });
  },
  async requestAppointment(request, response) {
    const { id: doctor_id } = request.params;
    const { user, appointment } = request.body;

    if (!utils.verifyId(doctor_id)) {
      return response
        .status(401)
        .json({ message: "The id sent is not valid." });
    }

    const { first_name: user_first_name, ...userRest } = user;
    if (!utils.verifyObjectKeys(userRest)) {
      return response
        .status(401)
        .json({ message: "The information sent is not valid." });
    }

    if (!utils.verifyObjectKeys(appointment)) {
      return response
        .status(401)
        .json({ message: "The information sent is not valid." });
    }

    const doctor = (await Doctor.findByPk(doctor_id)).dataValues;

    const { first_name: doctor_first_name, ...doctorRest } = doctor;
    if (!utils.verifyObjectKeys(doctorRest)) {
      return response
        .status(401)
        .json({ message: "We could not find the doctor specified." });
    }

    const templateData = {
      user: utils.prepareObjectData(user),
      doctor: utils.prepareObjectData(doctor),
      appointment,
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nodemailer.simplon@gmail.com",
        pass: "Simplon123",
      },
    });

    const templateSender = transporter.templateSender(
      {
        subject: "New Appointment Request 🎉",
        html: utils.renderTemplate(templateData),
      },
      {
        from: "nodemailer.simplon@gmail.com",
      }
    );

    await templateSender(
      { to: templateData.doctor.mail },
      {},
      (error, info) => {
        if (error) {
          console.log(error);
          return response.status(500).json({
            error:
              "We could not request the appointment. Please, try again later.",
          });
        } else {
          console.log(info);
          return response
            .status(200)
            .json({ message: "Appointment requested successfully." });
        }
      }
    );
  },
};
