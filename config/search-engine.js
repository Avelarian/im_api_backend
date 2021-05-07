const elasticsearch = require("elasticsearch");

const { doctors } = require("../database/seeders/20210505090340-doctors");

const client = new elasticsearch.Client({
  host: "127.0.0.1:9200",
  log: "error",
});

client.ping(
  {
    requestTimeout: 5000,
  },
  (error) => {
    if (error) {
      console.error("Elasticsearch cluster is down!");
      throw new Error("Elasticsearch cluster is down!");
    } else {
      console.log("Elasticsearch cluster is up!");
    }
  }
);

client.indices.create(
  {
    index: "doctors",
    body: {
      mappings: {
        properties: {
          id: { type: "integer" },
          first_name: { type: "string" },
          last_name: { type: "string" },
          phone_number: { type: "string" },
          mail: { type: "string" },
          address: { type: "string" },
          zip_code: { type: "string" },
          city: { type: "string" },
          speciality: { type: "string" },
          created_at: { type: "string" },
          updated_at: { type: "string" },
        },
      },
    },
  },
  (error, response, status) => {
    if (error) {
      console.log(error);
      throw new Error(error);
    } else {
      console.log(`Status ${status}`);
      console.log(`Created a new index: ${response}`);
    }
  }
);

const ids = doctors.map((doctor) => {
  return doctor.id;
});
client.deleteByQuery(
  {
    index: "doctors",
    body: {
      query: {
        terms: {
          _id: ids,
        },
      },
    },
  },
  function (error, response) {
    console.log(1);
    if (error) {
      console.log("Failed bulk (delete) operation");
      throw new Error(error);
    } else {
      console.log(
        `Successfully deleted ${doctors.length} doctor documents.`,
        `Response: ${response}`
      );
    }
  }
);

const body = doctors.map((doctor) => [
  { index: { _index: "doctors" } },
  doctor,
]);
client.bulk({ body, refresh: true }, function (error, response) {
  if (error) {
    console.log("Failed bulk (insert) operation");
    console.log(error);
    throw new Error(error);
  } else {
    console.log(
      `Successfully imported ${doctors.length} doctor documents.`,
      `Response: ${response}`
    );
  }
});

module.exports = client;
