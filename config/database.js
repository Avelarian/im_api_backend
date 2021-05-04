const path = require('path')

module.exports = {
  dialect: "sqlite",
  storage: path.join(__dirname),
  define: {
    timestamps: true, // insertion off createdAt and updatedAt
    underscored: true, // tables in Snake Case
  },
};
