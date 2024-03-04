const { app,
    testData,
    seed,
    mongoose,
    request,
    UserModel} = require("./config");

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
        test("200: returns user detailes upon successful request", () => {
            const testUser = "test";

            return request(app)
            .get(`/api/users/${testUser}`)
            .then(({body: {user}}) => {
                const testInput = [user].map(({name, email, username}) => [name, email, username]);

                return UserModel.find({username: testUser}, "name email username")
                .then(result => {
                    const expected = result.map(({name, email, username}) => [name, email, username]);

                    expect(testInput).toEqual(expected)
                })
            })
        });
    });
});