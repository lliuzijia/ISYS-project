var dbcon = require("../database");
var connection = dbcon.getConnection();
connection.connect();
var express = require("express");
var router = express.Router();

// 处理 GET 请求，返回 user_account 表的所有记录
router.get("/", (req, res) => {
    connection.query("SELECT * FROM user_db", (err, records, fields) => {
        if (err) {
            console.log("Error while fetching data: " + err);
            res.status(500).send("Error while fetching data");
        } else {
            res.send(records);
        }
    });
});

// 处理 POST 请求，向 user_account 表中插入新记录
router.post("/", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var roleid = req.body.roleid;
    var phone = req.body.phone;
    var nickname = req.body.nickname;
    var gender = req.body.gender;

    if (!username || !password || !roleid || !phone || !nickname || !gender) {
        return res.status(400).send("All fields are required");
    }

    connection.query(
        "INSERT INTO user_db (username, password, roleid, phone, nickname, gender) VALUES (?, ?, ?, ?, ?, ?)",
        [username, password, roleid, phone, nickname, gender],
        (err, result) => {
            if (err) {
                console.error("Error while inserting data: " + err);
                res.send({ insert: "failed" });
            } else {
                res.send({ insert: "success" });
            }
        }
    );
});


module.exports = router;
