const expect = require("chai").expect;

const { isUrlValid } = require("../checkUrlFormat");

describe("checkUrlForamt test", () => {
  it("Should return true when the given url is valid, case1", async () => {
    let result = await isUrlValid("https://www.google.com");
    expect(result).true;
  });

  it("Should return true when the given url is valid, case2", async () => {
    let result = await isUrlValid("https://fr-fr.facebook.com/");
    expect(result).true;
  });

  it("Should return false for wrong url", async () => {
    let result = await isUrlValid("https://fr-fr.facebook.coms/");
    expect(result).false;
  });
});
