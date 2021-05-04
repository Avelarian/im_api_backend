const { Model, DataTypes } = require("sequelize");

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        day: DataTypes.NUMBER,
        month: DataTypes.NUMBER,
        year: DataTypes.NUMBER,
        time: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Doctor, {
      foreignKey: "id",
      as: "doctor_id",
    });
  }
}

module.exports = Appointment;
