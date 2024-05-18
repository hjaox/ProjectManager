const { initializeApp } = require("firebase/app");
const config = require("./config");
const { getAuth } = require("firebase/auth");
const { getStorage } = require("firebase/storage");

const app = initializeApp(config);
const storage = getStorage(app);
const auth = getAuth(app)

module.exports = {
    auth,
    storage
}