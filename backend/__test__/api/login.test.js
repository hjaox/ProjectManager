const app = require("../../app");
const testData = require("../../mongo/seed/data/test-data");
const seed = require("../../mongo/seed/seed");
const mongoose = require("mongoose");
const request = require("supertest");
const UserModel = require("../../mongo/models/user.model");

beforeAll(() => jest.clearAllMocks);
beforeEach(() => seed(testData));
afterAll(() => mongoose.connection.close());

describe("POST /api/login tests", () => {
    test("200: returns status code 200 upon successful request", () => {
        const testUserCredentials = {
            name: "test",
            password: "test"
        };

        return request(app)
        .post("/api/login")
        .send(testUserCredentials)
        .expect(200)
    });
    test("200: returns login details of user upon successful request", () => {
        const testUserCredentials = {
            name: "test",
            password: "test"
        };

        return request(app)
        .post("/api/login")
        .send(testUserCredentials)
        .then(({body: {loginDetails: {name, email, username}}}) => {
            const testVal = [name, email, username];

            return UserModel.find(testUserCredentials, "name username email").exec()
            .then(([{name, email, username}]) => {
                const expected = [name, email, username];

                expect(testVal).toEqual(expected);
            })
        })
    });
    test("401: returns status code 401 upon unsuccessful request", () => {
        const testUserCredentials = {
            name: "test",
            password: "wrongpass"
        };

        return request(app)
        .post("/api/login")
        .send(testUserCredentials)
        .expect(401)
    });
    test("401: returns msg 'Incorrect email or password' upon unsuccessful request", () => {
        const testUserCredentials = {
            name: "test",
            password: "wrongpass"
        };

        return request(app)
        .post("/api/login")
        .send(testUserCredentials)
        .then(({body: {msg}}) => {
            expect(msg).toBe('Incorrect email or password');
        })
    });
});