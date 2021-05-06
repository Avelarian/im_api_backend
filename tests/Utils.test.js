const utils = require("../utils");

describe("Test VerifyId of utils ", () => {
  it("Check if null id give false", () => {
    const result = utils.verifyId(null);
    expect(result).toBe(false);
  });
  it("Check if undefined id give false", () => {
    const result = utils.verifyId(undefined);
    expect(result).toBe(false);
  });
  it("Check if id which is not a string give false", () => {
    const result = utils.verifyId(12);
    expect(result).toBe(false);
  });
  it("Check if a not a number id give false", () => {
    const result = utils.verifyId("invalidId99");
    expect(result).toBe(false);
  });
  it("Check if number id give true", () => {
    const result = utils.verifyId("12");
    expect(result).toBe(true);
  });
});

describe("Test VerifyObjectKeys of utils ", () => {
  it("Check if verifyObjectKeys is true", () => {
    const result = utils.verifyObjectKeys({
      bool: true,
      string: "string",
      number: 1,
      object: {},
    });
    expect(result).toBe(true);
  });

  it("Check if verifyObjectKeys is true when bool is false", () => {
    const result = utils.verifyObjectKeys({
      bool: false,
    });
    expect(result).toBe(true);
  });

  it("Check if error when empty string", () => {
    const result = utils.verifyObjectKeys({
      bool: true,
      string: "",
      number: 1,
      object: {},
    });
    expect(result).toBe(false);
  });

  it("Check if error when null", () => {
    const result = utils.verifyObjectKeys({
      bool: true,
      string: "string",
      number: null,
      object: {},
    });
    expect(result).toBe(false);
  });

  it("Check if error when undefined", () => {
    const result = utils.verifyObjectKeys({
      bool: true,
      string: "string",
      number: 1,
      object: undefined,
    });
    expect(result).toBe(false);
  });

  it("Check if mail is invalid", () => {
    const result = utils.verifyObjectKeys({ mail: "mail@i" });
    expect(result).toBe(false);
  });
  it("Check if mail is valid", () => {
    const result = utils.verifyObjectKeys({ mail: "mail@gmail.com" });
    expect(result).toBe(true);
  });
});
