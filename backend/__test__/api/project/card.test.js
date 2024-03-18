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
    describe("POST /api/projects/column/card tests", () => {
        test("201: returns status code 201 upon successful request", () => {
            return UserModel.find({ name: "test" }, { projects: { $elemMatch: { projectName: "project1Fortest" } } })
                .then(([{ _id, projects }]) => {
                    const testUserId = { userId: _id.toString() };
                    const testProjectId = { projectId: projects[0]._id.toString() };
                    const testColumnId = { columnId: projects[0].columns[0]._id };
                    const testCardName = { cardName: "newCardName" };

                    return request(app)
                        .post("/api/project/column/card")
                        .send({ ...testUserId, ...testProjectId, ...testColumnId, ...testCardName })
                        .expect(201)
                })
        });
        test("201: returns the updated document upon successful request", () => {
            return UserModel.find({ name: "test" }, { projects: { $elemMatch: { projectName: "project1Fortest" } } })
                .then(([{ _id, projects }]) => {
                    const testUserId = { userId: _id.toString() };
                    const testProjectId = { projectId: projects[0]._id.toString() };
                    const testColumnId = { columnId: projects[0].columns[0]._id };
                    const testCardName = { cardName: "newCardName" };

                    return request(app)
                        .post("/api/project/column/card")
                        .send({ ...testUserId, ...testProjectId, ...testColumnId, ...testCardName })
                        .then(({ body: { updatedDocument } }) => {

                            return UserModel.find({ _id: testUserId.userId }, { projects: { $elemMatch: { _id: testProjectId.projectId } } }, { lean: true })
                                .then(([result]) => {

                                    expect(JSON.stringify(updatedDocument)).toEqual(JSON.stringify(result.projects[0]));
                                })
                        })
                })
        });
        test("400: returns status code 400 when userId or projectId is not a valid ObjectId", () => {
            return UserModel.find({ name: "test" }, { projects: { $elemMatch: { projectName: "project1Fortest" } } })
                .then(([{ projects }]) => {
                    const testUserId = { userId: "notAValidObjectId" };
                    const testProjectId = { projectId: projects[0]._id.toString() };
                    const testColumnId = { columnId: projects[0].columns[0]._id };
                    const testCardName = { cardName: "newCardName" };

                    return request(app)
                        .post("/api/project/column/card")
                        .send({ ...testUserId, ...testProjectId, ...testColumnId, ...testCardName })
                        .expect(400)
                })
        });
        test("404: returns status code 404 when userId or projectId does not exist", () => {
            return UserModel.find({ name: "test" }, { projects: { $elemMatch: { projectName: "project1Fortest" } } })
                .then(([{ projects }]) => {
                    const testUserId = { userId: "65ebabf56dbb30c2c0000000" };
                    const testProjectId = { projectId: projects[0]._id.toString() };
                    const testColumnId = { columnId: projects[0].columns[0]._id };
                    const testCardName = { cardName: "newCardName" };

                    return request(app)
                        .post("/api/project/column/card")
                        .send({ ...testUserId, ...testProjectId, ...testColumnId, ...testCardName })
                        .expect(404)
                })
        });
    });
});