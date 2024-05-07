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
    describe("POST /api/project/column tests", () => {
        test("201: returns status code 201 upon successful request", () => {
            return UserModel.find({ name: "test" }, { projects: { $elemMatch: { projectName: "project1Fortest" } } })
                .then(([{ _id, projects }]) => {
                    const testUserId = { userId: _id.toString() };
                    const testProjectId = { projectId: projects[0]._id.toString() };
                    const testColumnName = { columnName: "newColumnName" };

                    return request(app)
                        .post("/api/project/column")
                        .send({ ...testUserId, ...testProjectId, ...testColumnName })
                        .expect(201)
                })
        });
        test("201: returns the updated document upon successful request", () => {
            return UserModel.find({ name: "test" }, { projects: { $elemMatch: { projectName: "project1Fortest" } } })
                .then(([{ _id, projects }]) => {
                    const testUserId = { userId: _id.toString() };
                    const testProjectId = { projectId: projects[0]._id.toString() };
                    const testColumnName = { columnName: "newColumnName" };

                    return request(app)
                        .post("/api/project/column")
                        .send({ ...testUserId, ...testProjectId, ...testColumnName })
                        .then(({ body: { updatedProject } }) => {

                            return UserModel.find({ _id: testUserId.userId }, { projects: { $elemMatch: { _id: testProjectId.projectId } } }, { lean: true })
                                .then(([result]) => {

                                    expect(JSON.stringify(updatedProject)).toEqual(JSON.stringify(result.projects[0]));
                                })
                        })
                })
        });
        test("400: returns status code 400 when userId or projectId is not a valid ObjectId", () => {
            return UserModel.find({ name: "test" }, { projects: { $elemMatch: { projectName: "project1Fortest" } } })
                .then(([{ projects }]) => {
                    const testUserId = { userId: "notAValidObjectId" };
                    const testProjectId = { projectId: projects[0]._id.toString() };
                    const testColumnName = { columnName: "newColumnName" };

                    return request(app)
                        .post("/api/project/column")
                        .send({ ...testUserId, ...testProjectId, ...testColumnName })
                        .expect(400)
                })
        });
        test("404: returns status code 404 when userId or projectId does not exist", () => {
            return UserModel.find({ name: "test" }, { projects: { $elemMatch: { projectName: "project1Fortest" } } })
                .then(([{ projects }]) => {
                    const testUserId = { userId: "65ebabf56dbb30c2c0000000" };
                    const testProjectId = { projectId: projects[0]._id.toString() };
                    const testColumnName = { columnName: "newColumnName" };

                    return request(app)
                        .post("/api/project/column")
                        .send({ ...testUserId, ...testProjectId, ...testColumnName })
                        .expect(404)
                })
        });
    });
    describe("DELETE /api/project/column tests", () => {
        test("202: returns status code 202 upon successful request", async () => {
            const [{ _id, projects }] = await UserModel.find({ name: "test" }, { projects: { $elemMatch: { projectName: "project1Fortest" } } });
            const testBody = {
                userId: _id.toString(),
                projectId: projects[0]._id.toString(),
                columnId: projects[0].columns[0]._id
            };

            await request(app)
                .delete("/api/project/column")
                .send(testBody)
                .expect(202)
        });
        test("202: returns the updated document upon successful request", async () => {
            const [{ _id, projects }] = await UserModel.find({ name: "test" }, { projects: { $elemMatch: { projectName: "project1Fortest" } } });

            const testBody = {
                userId: _id.toString(),
                projectId: projects[0]._id.toString(),
                columnId: projects[0].columns[0]._id.toString()
            };


            const testValue = await request(app)
                .delete("/api/project/column/")
                .send(testBody)

            const expected = await UserModel.find({ name: "test" }, { projects: { $elemMatch: { projectName: "project1Fortest" } } });

            expect(JSON.stringify(testValue.body.updatedProject)).toEqual(JSON.stringify(expected[0].projects[0]));
        })
        test("400: returns status code 400 when userId, projectId or columnId is not a valid ObjectId", async () => {
            const [{ projects }] = await UserModel.find({ name: "test" }, { projects: { $elemMatch: { projectName: "project1Fortest" } } });

            const testBody = {
                userId: "notAValidObjectId",
                projectId: projects[0]._id.toString(),
                columnId: projects[0].columns[0]._id
            };

            await request(app)
                .delete("/api/project/column")
                .send(testBody)
                .expect(400)

        });
        test("404: returns status code 404 when userId or projectId does not exist", async () => {
            const [{ projects }] = await UserModel.find({ name: "test" }, { projects: { $elemMatch: { projectName: "project1Fortest" } } });

            const testBody = {
                userId: "65f8ba8d45f5e2112ad00000",
                projectId: projects[0]._id.toString(),
                columnId: projects[0].columns[0]._id
            };

            await request(app)
                .delete("/api/project/column")
                .send(testBody)
                .expect(404)

        });
    });
});