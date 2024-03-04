const app = require("../app");
const testData = require("../mongo/seed/data/test-data");
const seed = require("../mongo/seed/seed");
const mongoose = require("mongoose");
const request = require("supertest");

beforeAll(() => jest.clearAllMocks);
beforeEach(() => seed(testData));
afterAll(() => mongoose.connection.close());

describe("GET /api/users endpoint tests", () => {
    test("200: returns status 200 upon successful request", () => {
        return request(app)
        .get("/api/users")
        .expect(200);
    })
});