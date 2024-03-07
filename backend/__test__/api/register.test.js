const app = require("../../app");
const testData = require("../../mongo/seed/data/test-data");
const seed = require("../../mongo/seed/seed");
const mongoose = require("mongoose");
const request = require("supertest");
const UserModel = require("../../mongo/models/user.model");
require("../../mongo/connection");

beforeEach(() => seed(testData));
afterAll(() => mongoose.connection.close());

describe("POST /api/register tests", () => {
    test("201: returns status code 201 upon successful request", () => {
        const testUserCredentials = {
            name: "newUser",
            password: "newPass",
            email: "newEmail"
        };

        return request(app)
        .post("/api/register")
        .send(testUserCredentials)
        .expect(201)
    });
    test("201: returns user details upon successful request", () => {
        const testUserCredentials = {
            name: "newUser",
            password: "newPass",
            email: "newEmail"
        };

        return request(app)
        .post("/api/register")
        .send(testUserCredentials)
        .then(({body: {newUser: {name, email, password}}}) => {
            const testval = {name, email, password};

            expect(testval).toEqual(testUserCredentials);
        })
    });
    test("400: returns status code 400 if credentials already exists", () => {
        const testUserCredentials = {
            name: "test",
            password: "test",
            email: "test"
        };

        return request(app)
        .post("/api/register")
        .send(testUserCredentials)
        .expect(400)
    });
    test("400: returns msg User and email already exists if both name and email already exist in the database", () => {
        const testUserCredentials = {
            name: "test",
            password: "test",
            email: "test"
        };

        return request(app)
        .post("/api/register")
        .send(testUserCredentials)
        .then(({body: {msg}}) => {
            expect(msg).toBe("User and email already exists");
        })
    });
    test("400: returns msg User already exists if name already exist in the database", () => {
        const testUserCredentials = {
            name: "test",
            password: "newpassword",
            email: "newEmail"
        };

        return request(app)
        .post("/api/register")
        .send(testUserCredentials)
        .then(({body: {msg}}) => {
            expect(msg).toBe("User already exists");
        })
    });
    test("400: returns msg Email already exists if email already exist in the database", () => {
        const testUserCredentials = {
            name: "newUser",
            password: "newpassword",
            email: "test"
        };

        return request(app)
        .post("/api/register")
        .send(testUserCredentials)
        .then(({body: {msg}}) => {
            expect(msg).toBe("Email already exists");
        })
    });
});