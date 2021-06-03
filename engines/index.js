const client = require("../config/search-engine");
const { doctors } = require("../database/seeders/20210505090340-doctors");

const doctorsClient = client.initIndex("doctors");

doctorsClient.clearObjects().then(() => {
  console.log("Cleared all doctors objects from Algolia.");
});

doctorsClient
  .saveObjects(doctors, { autoGenerateObjectIDIfNotExist: true })
  .then(() => {
    console.log('Added 100 doctor objects to Algolia.');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = {
    doctorsClient
}
