
const doctor = require('../models/Doctor')


module.exports = {
    // List all doctors.
    async list(request, response) {
        const doctors = await Doctor.findAll()
        .catch((error) => {
            return res.status(500).json({
                error_point: 'Doctors list.',
                message: 'Error trying to list  doctors.',
                error: error,
            });
        });
        
        return res.status(200).json({
            message: 'Doctors listed!',
            list_doctors: doctors,
        });
    },

      // Get one Doctor.
      async index(request, response) {
        const {id} = request.params;

        if(typeof(id === Number)){
            const doctor = await Doctor.findByPk(id)
        .catch((error) => {
            return res.status(500).json({
                error_point: 'Doctor index.',
                message: 'Error trying to get a doctor.',
                error: error,
            });
        });
        }else{
            return res.status(500).json({
                error_point: 'Doctor index.',
                message: 'undefined id',
                error: error,
            });
        }
        

      // Error for accesing the database.

        if (!doctor) {
            return res.status(400).json({
                error_point: 'Doctor index.',
                message: 'Doctor not found.'
            });
        } // Checking if Doctor exists.
        
        return res.status(200).json({
            message: 'Doctor found!',
            doct_point: doctor,
        });
    },
}