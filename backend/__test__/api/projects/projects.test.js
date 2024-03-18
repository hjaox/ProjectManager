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

describe("GET /api/projects/:userId", () => {
    test("200: returns status code 200 upon successful request", () => {
        const testUser = "test";

        return UserModel.find({ name: testUser })
            .then(([{ _id }]) => {
                const testId = _id.toString();

                return request(app)
                    .get(`/api/projects/${testId}`)
                    .expect(200)
            })
    });
    test("200: returns the projects documents of userId", () => {
        const testUser = "test";

        return UserModel.find({ name: testUser }, "projects")
            .then(([{ _id, projects }]) => {
                const testId = _id.toString();
                const expected = projects.map(item => ({
                    _id: item._id.toString(),
                    projectName: item.projectName,
                }));

                return request(app)
                    .get(`/api/projects/${testId}`)
                    .then(({ body: { projects } }) => {
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
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Invalid UserId");
            })
    });
    test("404: returns status code 404 when userId does not exist", () => {

        return request(app)
            .get(`/api/projects/65e9d762727636586ecbb000`)
            .expect(404)
    });
    describe("DELETE /api/projects/:userId/:projectId tests", () => {
        test("202: returns status code 202 upon successful request", async () => {
            const doc = await UserModel.find({ name: "test" }, { projects: { $elemMatch: { projectName: "project1Fortest" } } });
            const testUserId = doc[0]._id.toString();
            const testProjectId = doc[0].projects[0]._id.toString();

            await request(app)
                .delete(`/api/projects/${testUserId}/${testProjectId}`)
                .expect(202);
        });
        test("202: returns the updated document upon successful request", async () => {
            const doc = await UserModel.find({ name: "test" }, { projects: { $elemMatch: { projectName: "project1Fortest" } } });
            const testUserId = doc[0]._id.toString();
            const testProjectId = doc[0].projects[0]._id.toString();

            const { body: { projects } } = await request(app)
                .delete(`/api/projects/${testUserId}/${testProjectId}`)
                .expect(202);

            const expected = await UserModel.find({ name: "test" });

            expect(JSON.stringify(projects)).toEqual(JSON.stringify(expected[0].projects));
            expect(projects).not.toContain(testProjectId);
        });
        test("400: returns status code 400 if userId or projectId is not a valid ObjectId", async () => {
            const doc = await UserModel.find({ name: "test" }, { projects: { $elemMatch: { projectName: "project1Fortest" } } });
            const testUserId = "notAValidObjectId";
            const testProjectId = doc[0].projects[0]._id.toString();

            await request(app)
                .delete(`/api/projects/${testUserId}/${testProjectId}`)
                .expect(400);
        });
        test("404: returns status code 404 if userId or projectId deos not exist", async () => {
            const doc = await UserModel.find({ name: "test" }, { projects: { $elemMatch: { projectName: "project1Fortest" } } });
            const testUserId = "65f7029daa6217a1d3d90000";
            const testProjectId = doc[0].projects[0]._id.toString();

            await request(app)
                .delete(`/api/projects/${testUserId}/${testProjectId}`)
                .expect(404);
        });
    });
    describe("POST /api/projects tests", () => {
        test("201: returns status code 201 upon successful request", async () => {
            const testUserId = (await UserModel.find({ name: "test" }))[0]._id.toString();
            const testProjectName = { projectName: "testPostProjectName" };

            await request(app)
                .post("/api/projects")
                .send({ userId: testUserId, ...testProjectName })
                .expect(201)
        });
        test("201: returns updated project list upon successful request", async () => {
            const testUserId = (await UserModel.find({ name: "test" }))[0]._id.toString();
            const testProjectName = { projectName: "testPostProjectName" };

            const { body: { projects } } = await request(app)
                .post("/api/projects")
                .send({ userId: testUserId, ...testProjectName })

            expect(projects.some(item => item.projectName === testProjectName.projectName)).toBeTruthy();
        });
        test("400: returns status code 400 when userId is not a valid ObjectId", async () => {
            const testUserId = "notAValidObjectId";
            const testProjectName = { projectName: "testPostProjectName" };

            await request(app)
                .post("/api/projects")
                .send({ userId: testUserId, ...testProjectName })
                .expect(400)
        });
        test("404: returns status code 404 when userId does not exist", async () => {
            const testUserId = "65f716ead3f847fd67b00000";
            const testProjectName = { projectName: "testPostProjectName" };

            await request(app)
                .post("/api/projects")
                .send({ userId: testUserId, ...testProjectName })
                .expect(404)
        });
    });
});