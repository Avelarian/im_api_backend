const algoliasearch = require("algoliasearch");

const client = algoliasearch(process.env.APP_KEY, process.env.ADMIN_KEY);

module.exports = client;
