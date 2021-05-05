const { Model, DataTypes } = require("sequelize");

class Doctor extends Model {
  static init(sequelize) {
    super.init(
      {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        phone_number: DataTypes.STRING,
        mail: DataTypes.STRING,
        address: DataTypes.STRING,
        zip_code: DataTypes.STRING,
        city: DataTypes.STRING,
        speciality: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Appointment, {
      foreignKey: "id",
      as: "appointments",
    });
  }
}

module.exports = Doctor;
