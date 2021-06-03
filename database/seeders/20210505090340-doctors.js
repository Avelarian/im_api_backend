const faker = require("faker/locale/fr");

const specialities = [
  "Allergy and immunology",
  "Anesthesiology",
  "Dermatology",
  "Diagnostic radiology",
  "Emergency medicine",
  "Family medicine",
  "Internal medicine",
  "Medical genetics",
  "Neurology",
  "Nuclear medicine",
  "Obstetrics and gynecology",
  "Ophthalmology",
  "Pathology",
  "Pediatrics",
  "Physical medicine and rehabilitation",
  "Preventive medicine",
  "Psychiatry",
  "Radiation oncology",
  "Surgery",
  "Urology",
];

const doctors = [
  {
    id: 1,
    first_name: "Ian",
    last_name: "Avelar Peixoto",
    phone_number: "07 68 93 60 15",
    mail: "avelarian@gmail.com",
    address: "20 rue Frida Kahlo",
    zip_code: "93400",
    city: "Saint-Ouen",
    speciality: "Emergency medicine",
    created_at: new Date(),
    updated_at: new Date(),
  },
  ...Array(499),
].map((doctor, index) => {
  if (index !== 0) {
    return {
      id: index + 1,
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      phone_number: faker.phone.phoneNumber(),
      mail: faker.internet.email(),
      address: faker.address.streetAddress(),
      zip_code: faker.address.zipCode(),
      city: faker.address.city(),
      speciality: specialities[Math.floor(Math.random() * 19)],
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
  return doctor;
});

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert("doctors", doctors, {}).catch((err) => {
      console.log(err);
    });
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete("doctors", null, {});
  },
  doctors,
};
