//const db = require('../mongo/connection');
const format = require('pg-format');

function selectProjectsByUserID(userID) {
    const queryStr = format(`SELECT * FROM projects WHERE for_owner_id = %L`, [userID]);

    return db.query(queryStr)
    .then(({rows}) => {
        return rows
    })
}

module.exports = { selectProjectsByUserID }