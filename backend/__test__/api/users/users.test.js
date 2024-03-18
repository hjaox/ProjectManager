const app = require("../../../app");
const testData = require("../../../mongo/seed/data/test-data");
const seed = require("../../../mongo/seed/seed");
const mongoose = require("mongoose");
const request = require("supertest");
const UserModel = require("../../../mongo/models/user.model");
require("../../../mongo/connection")

beforeAll(() => jest.clearAllMocks);
beforeEach(() => seed(testData));
afterAll(() => mongoose.connection.close());

describe("users API tests", () => {
    describe("GET /api/users endpoint tests", () => {
        test("200: returns status 200 upon successful request", () => {
            return request(app)
            .get("/api/users")
            .expect(200);
        });
        test("200: returns all users in the dabase upon successful request", () => {
            return request(app)
            .get("/api/users")
            .then(({body: {allUsers}}) => {
                const testInput = allUsers.map(({name, username, email}) => [name, username, email]);

                return UserModel.find({}, "name username email")
                .then(result => {
                    const expected = result.map(({name, username, email}) => [name, username, email]);

                    expect(testInput).toEqual(expected);
                })
            })
        });
    });
    describe("GET /api/users/:username endpoint tests", () => {
        test("200: returns status 200 upon successful request", () => {
            const testUser = "test";

            return request(app)
            .get(`/api/users/${testUser}`)
            .expect(200);
        });
        test("200: returns user details upon successful request", () => {
            const testUser = "test";

            return request(app)
            .get(`/api/users/${testUser}`)
            .then(({body: {user}}) => {
                const testInput = [user].map(({name, email}) => [name, email]);

                return UserModel.find({name: testUser}, "name email")
                .then(result => {
                    const expected = result.map(({name, email}) => [name, email]);
                    expect(testInput).toEqual(expected);
                })
            })
        });
        test("404: returns status code 400 if user does not exist", () => {
            const testUser = "notAUser";

            return request(app)
            .get(`/api/users/${testUser}`)
            .expect(404)
        });
        test("404: returns msg User not found if user does not exist", () => {
            const testUser = "notAUser"

            return request(app)
            .get(`/api/users/${testUser}`)
            .then(({body: {msg}}) => {
                expect(msg).toBe("User not found");
            })
        });
    });
});