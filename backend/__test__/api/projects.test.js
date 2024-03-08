const app = require("../../app");
const testData = require("../../mongo/seed/data/test-data");
const seed = require("../../mongo/seed/seed");
const mongoose = require("mongoose");
const request = require("supertest");
const UserModel = require("../../mongo/models/user.model");
require("../../mongo/connection")

beforeAll(() => jest.clearAllMocks);
beforeEach(() => seed(testData));
afterAll(() => mongoose.connection.close());

describe("GET /api/projects/:userId", () => {
    test("200: returns status code 200 upon successful request", () => {
        const testUser = "test";

        return UserModel.find({name: testUser})
        .then(([{_id}]) => {
            const testId = _id.toString();

            return request(app)
            .get(`/api/projects/${testId}`)
            .expect(200)
        })
    });
    test("200: returns the projects documents of userId", () => {
        const testUser = "test";

        return UserModel.find({name: testUser}, "projects")
        .then(([{_id, projects}]) => {
            const testId = _id.toString();
            const expected = projects.map(item => ({
                _id: item._id.toString(),
                projectName: item.projectName,
             }));

            return request(app)
            .get(`/api/projects/${testId}`)
            .then(({body: {projects}}) => {
                const testVal = projects.map(item => ({
                    _id: item._id,
                    projectName: item.projectName,
                }))

                expect(testVal).toEqual(expected);
            })
        })
    });
    test("400: returns status code 400 when requesting with invalid userId", () => {

        return request(app)
        .get(`/api/projects/asf`)
        .expect(400)
    });
    test("400: returns msg Invalid UserId when requesting with invalid userId", () => {

        return request(app)
        .get(`/api/projects/asf`)
        .then(({body: {msg}}) => {
            expect(msg).toBe("Invalid UserId");
        })
    });
});