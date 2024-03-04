const { app,
    request,
    seed,
    mongoose,
    testData,
    UserModel} = require("./config");

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
        .then(({body: {loginDetails}}) => {
            const testVal = loginDetails.map(({name, email, username}) => [name, username, email]);

            return UserModel.find(testUserCredentials, "name username email")
            .then(result => {
                const expected = result.map(({name, username, email}) => [name, username, email]);

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