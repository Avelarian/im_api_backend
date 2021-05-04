const { readFileSync } = require("fs");
const path = require("path");

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

/** UTILS */
const { EMAIL_REGEX } = require("../constants");

function verifyId(id) {
  if (!id || typeof id !== "string" || isNaN(id)) {
    return false;
  }
  return true;
}

function verifyKey(key) {
  if (!key) {
    return false;
  }
  if (key === "mail" && !EMAIL_REGEX.test(key)) {
    return false;
  }
  return true;
}

function verifyObjectKeys(object) {
  const keys = Object.keys(object);
  for (const key of keys) {
    if (!verifyKey(object[key])) {
      return false;
    }
  }
  return true;
}

function prepareObjectData(object) {
  let newObject = {};
  const keys = Object.keys(object);
  for (const key of keys) {
    if (object[key]) {
      newObject = {
        [key]: object[key].trim(),
      };
    }
  }
  return newObject;
}

module.exports = {
  renderTemplate: renderTemplate(template),
  verifyId,
  verifyObjectKeys,
  prepareObjectData,
};
