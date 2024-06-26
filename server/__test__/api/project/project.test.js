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

describe("project endpoint tests", () => {
    describe("GET /project/:userId/:projectId endpoint tests", () => {
        test("200: returns status code 200 upon successful request", () => {
            const testUser = "test";

            return UserModel.find({ name: testUser }, "projects")
                .then(([{ _id, projects }]) => {
                    const testUserId = _id.toString();
                    const testProjectId = projects.find(item => item.projectName === "project1Fortest")._id.toString();

                    return request(app)
                        .get(`/api/project/${testUserId}/${testProjectId}`)
                        .expect(200)
                })
        });
        test("200: returns the project details of the specified projectId under the specified userId", () => {
            const testUser = "test";

            return UserModel.find({ name: testUser }, "projects")
                .then(([{ _id, projects }]) => {
                    const testUserId = _id.toString();
                    const testProjectId = projects.find(item => item.projectName === "project1Fortest")._id.toString();

                    return request(app)
                        .get(`/api/project/${testUserId}/${testProjectId}`)
                        .then(({ body: { project } }) => {
                            const testVal = [project].map(item => ({
                                _id: item._id,
                                projectName: item.projectName,
                            }))

                            return UserModel.find({ _id: testUserId }, { projects: { $elemMatch: { _id: testProjectId } } })
                                .then(([{ projects }]) => {
                                    const expected = projects.map(item => ({
                                        _id: item._id.toString(),
                                        projectName: item.projectName,
                                    }));

                                    expect(testVal).toEqual(expected);
                                })
                        })
                })
        });
        test("400: returns status code 400 if userId is an invalid ObjectId", () => {
            const testUserId = "invalidObjectId";
            const testProjectId = "65e9d762727636586ecbb073";

            return request(app)
                .get(`/api/project/${testUserId}/${testProjectId}`)
                .expect(400)
        });
        test("400: returns status code 400 if projectId is an invalid ObjectId", () => {
            const testUserId = "65e9d762727636586ecbb073";
            const testProjectId = "invalidObjectId";

            return request(app)
                .get(`/api/project/${testUserId}/${testProjectId}`)
                .expect(400)
        });
        test("404: returns status code 404 if userId does not exist", () => {
            const testUserId = "65e9d762727636586ecbb000";
            const testProjectId = "65e9d762727636586ecbb073";

            return request(app)
                .get(`/api/project/${testUserId}/${testProjectId}`)
                .expect(404)
        });
    });
});