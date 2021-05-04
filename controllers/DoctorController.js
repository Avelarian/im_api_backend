const nodemailer = require("nodemailer");

const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const utils = require("../utils");

module.exports = {
  async getDoctorAppointments(request, response) {
    const { id: doctor_id } = request.params;
    Appointment.findAll({
      where: { doctor_id },
    })
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

    const doctor = await Doctor.findOne(doctor_id);

    const templateData = {
      user,
      doctor,
      appointment,
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nodemailer.simplon@gmail.com",
        pass: "Simplon123",
      },
    });

    const mailOptions = {
      from: "nodemailer.simplon@gmail.com",
      to: doctor.mail,
      subject: "New Appointment Request 🎉",
      text: utils.renderTemplate(templateData),
    };

    await transporter
      .sendMail(mailOptions)
      .then(async (info) => {
        console.log(info);
        return response
          .status(200)
          .json({ message: "Appointment requested successfully." });
      })
      .catch((error) => {
        console.log(error);
        return response.status(500).json({
          error:
            "We could not request the appointment. Please, try again later.",
        });
      });
  },
};
