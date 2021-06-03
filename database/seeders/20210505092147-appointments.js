const faker = require("faker/locale/fr");

const date = () => {
  const date = faker.date.future();
  return {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
    time: date.getHours(),
  };
};

const appointments = [...Array(1000)].map((appointment, index) => {
  const { day, month, year, time } = date();
  return {
    id: index + 1,
    doctor_id: index + 1,
    day,
    month,
    year,
    time,
    created_at: new Date(),
    updated_at: new Date(),
  };
});

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface
      .bulkInsert("appointments", appointments, {})
      .catch((err) => {
        console.log(err);
      });
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete("appointments", null, {});
  },
};
