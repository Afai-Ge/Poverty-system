const express = require('express');
const router = express.Router();
const db = require('../../db/db')
// console.log('db: ', db);

router.post('/login', function (req, res) {
  console.log(req.body);
  const { username, password } = req.body;
  const sql = 'select * from user where username = ?'
  db.query(sql, username, (err, results) => {
    if (err) {
      console.log(err.message);
      return res.send({
        code: -1,
        data: {
          msg: '检查用户名和密码是否正确'
        }
      })
    }
    data = JSON.parse(JSON.stringify(results))
    console.log('data: ', data);
    if (data) {
      if (data[0].password === password) {
        return res.send({
          code: 200,
          data: {
            username: username,
            role: data[0].role,
            msg: '登录成功'
          }
        });
      }
    }
    return res.send({
      code: -1,
      data: {
        msg: '账号或密码错误'
      }
    })
  })
})

router.post('/register', function (req, res) {
  // console.log(req.body);
  const { username, password, phone, role, email } = req.body
  const sql_exist = `select uid from user where username = '${username}' or phone = '${phone}'`
  const sql_register = `insert into user (username, password, role, phone, email) VALUES ('${username}','${password}','${role}','${phone}','${email}')`
  db.query(sql_exist, (err, result) => {
    if (err) return console.log(err)
    console.log('result: ', result);
    if (result.length) {
      res.send({
        code: -1,
        data: {
          msg: '该用户已存在，请修改用户信息'
        }
      })
    } else {
      db.query(sql_register, (err, result) => {
        if (err) return console.log(err)
        res.send({
          code: 200,
          data: {
            msg: "注册成功"
          }
        })
      })
    }
  })
})

module.exports = router