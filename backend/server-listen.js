const app = require("./app");
const db = require("./mongo/connection");

app.listen(9090, () => {
    db
    .then(() => {
        console.log("Database connected. App listening at port 9090")
    })
});