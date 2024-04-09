var dbDetails = require("./db-details");

var mysql = require("mysql2");
var bodyParser = require("body-parser");

module.exports = {
    getConnection: () => {
        return mysql.createConnection({
            host: dbDetails.host,
            user: dbDetails.user,
            password: dbDetails.password,
            database: dbDetails.database 
        });
    }
};