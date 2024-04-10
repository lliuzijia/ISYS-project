// 导入所需的模块
var express = require("express");
var bcrypt = require("bcrypt");
var dbcon = require("../database");

// 获取数据库连接
var connection = dbcon.getConnection();
connection.connect();

// 创建路由器
var router = express.Router();

// 处理GET请求，返回user_db表的所有记录
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

// 处理用户注册
router.post("/regist", (req, res) => {
    var { username, password, roleid, phone, nickname, gender, email } = req.body;

    // 检查所有字段是否已提供
    if (!username || !password || !roleid || !phone || !nickname || !gender || !email) {
        return res.status(400).send("All fields are required");
    }

    // 执行数据库插入操作
    connection.query(
        "INSERT INTO user_db (username, password, roleid, phone, nickname, gender, email) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [username, password, roleid, phone, nickname, gender, email],
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

// 处理用户登录
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Email and password are required");
    }

    // 查询数据库以查找用户
    connection.query("SELECT * FROM user_db WHERE email = ?", [email], (err, results) => {
        if (err) {
            console.log("Error while fetching user: " + err);
            return res.status(500).send("Error while fetching user");
        }
        if (results.length > 0) {
            if (password === results[0].password) {
                res.send({ login: "success", user: { username: results[0].username, email: results[0].email } });
            } else {
                res.status(401).send({ login: "failed", message: "Incorrect password" });
            }
        } else {
            res.status(404).send({ login: "failed", message: "User not found" });
        }
    });
});

// 处理更新用户信息请求
router.put("/updateUser", (req, res) => {
    var { username, password, roleid, phone, nickname, gender, email } = req.body;
    
    if (!username || !password || !roleid || !phone || !nickname || !gender || !email) {
        return res.status(400).send("All fields are required for updating a user");
    }

    // 构建更新用户信息的SQL查询
    var updateQuery = `UPDATE user_db SET password = ?, roleid = ?, phone = ?, nickname = ?, gender = ?, email = ? WHERE username = ?`;

    // 执行更新操作
    connection.query(updateQuery, [password, roleid, phone, nickname, gender, email, username], (err, result) => {
        if (err) {
            console.error("Error while updating user: " + err);
            res.status(500).send("Error while updating user");
        } else {
            if (result.affectedRows > 0) {
                res.send({ update: "success" });
            } else {
                res.status(404).send({ update: "failed", message: "User not found" });
            }
        }
    });
});

// 导出路由器
module.exports = router;
