const { readFileSync } = require("fs");
const path = require("path");

/** NODEMAILER */
const mustache = require("mustache");

const template = readFileSync(
  path.join(__dirname, "../templates/mail.mustache")
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
  if (typeof key === "boolean") {
    return true
  }
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
    newObject = {
      ...newObject,
      [key]: object[key] && typeof object[key] === 'string' ? object[key].trim() : object[key],
    };
  }
  return newObject;
}

module.exports = {
  renderTemplate: renderTemplate(template),
  verifyId,
  verifyObjectKeys,
  prepareObjectData,
};
