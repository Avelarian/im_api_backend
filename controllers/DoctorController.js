const Doctor = require("../models/Doctor");
const utils = require("../utils");

module.exports = {
  async list(_request, response) {
    const doctors = await Doctor.findAll().catch((error) => {
      console.log(error);
      return response.status(500).json({
        message:
          "We could not load the data. Please, try again later.",
      });
    });

    return response.status(200).json(doctors);
  },
  async index(request, response) {
    const { id } = request.params;
      
    if (!utils.verifyId(id)) {
      return response
        .status(401)
        .json({ message: "The id sent is not valid." });
    }

    Doctor.findByPk(id).then((doctor) => {
      return response.status(200).json(doctor)
    }).catch(error => {
      console.log(error)
      return response
        .status(500)
        .json({
          message:
            "We could not load the doctor details. Please, try again later.",
        });
    })
  },
};
