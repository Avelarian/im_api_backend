const { initElasticSearch } = require("../config/search-engine");
const { doctors } = require("../database/seeders/20210505090340-doctors");

module.exports = initElasticSearch({ doctors });
