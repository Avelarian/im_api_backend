import { readFileSync } from "fs";
import path from "path";

/** NODEMAILER */
const mustache = require("mustache");

const template = readFileSync(
  path.dirname(__dirname, "../templates/mail.mustache")
).toString();

function renderTemplate(template) {
  return function (data) {
    return mustache.render(template, data);
  };
}

module.exports = {
  renderTemplate: renderTemplate(template),
};
