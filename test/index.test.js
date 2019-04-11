const expect = require("chai").expect;

var request = require("supertest");
let host = "http://localhost:3000/api/shorturl";
describe("checkUrlForamt test", () => {
  it("Should return error for invalid url", done => {
    request(`${host}`)
      .post("/new")
      .send({ url: "qdf" })
      .expect(400)
      .expect(res => {
        expect(res.body).deep.equal({ error: "invalid URL" });
      })
      .end(done);
  });
  it("Should return the right response for valid url", done => {
    request(`${host}`)
      .post("/new")
      .send({ url: "https://www.freecodecamp.org" })
      .expect(200)
      .expect(res => {
        expect(res.body.original_url).equal("https://www.freecodecamp.org");
      })
      .timeout(10000)
      .end(done);
  });
});
