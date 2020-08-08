const request = require("supertest");
const app = require("../server/server.js");
// const { default: Item } = require("antd/lib/list/Item");

describe("Endpoint testing", () => {
  describe("GET request to '/", () => {
    it("should respond with status code 200", (done) => {
      return request(app).get("/").expect(200, done);
    });
  });
});
