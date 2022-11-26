const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const moment = require('moment')


router.get('/getNewsList', function (req, res) {
    // console.log('req.body: ', req.body);
    // const { pageNum, pageSize } = req.body
    const sql1 = 'SELECT new_id,title FROM news limit 0,5'
    const sql2 = 'SELECT new_id,title FROM news limit 5,5'
    const sql3 = 'SELECT new_id,title FROM news limit 10,5'
    const sql4 = 'SELECT new_id,title FROM news where type="img"'
    let data = {
        block1: [],
        block2: [],
        block3: [],
        img: []
    }
    db.query(sql1, (err, result) => {
        // console.log('result: ', result);
        if (err) return console.log(err);
        data.block1 = JSON.parse(JSON.stringify(result))
        db.query(sql2, (err, result) => {

            if (err) return console.log(err);
            data.block2 = JSON.parse(JSON.stringify(result))
            db.query(sql3, (err, result) => {
                if (err) return console.log(err);
                data.block3 = JSON.parse(JSON.stringify(result))
                db.query(sql4, (err, result) => {
                    if (err) return console.log(err);
                    data.img = JSON.parse(JSON.stringify(result))
                    console.log("data", data);
                    res.send({
                        code: 200,
                        data: data
                    })
                })
            })
        })
    })
})

router.get('/getNewsDetail', function (req, res) {
    console.log('req.query: ', req.query);
    const { id } = req.query
    const sql = 'SELECT * FROM news where new_id=?'
    db.query(sql, id, (err, result) => {
        if (err) return console.log(err);
        let data = JSON.parse(JSON.stringify(result))[0]
        let tmp = data.content.split('\r\n')
        data.content = []
        tmp.forEach((e) => {
            if (e) {
                data.content.push(e)
            }
        })

        // data.date = moment(data.date).format("YYYY-MM-DD HH:mm:ss")
        console.log('data.content: ', data.date);
        res.send({
            code: 200,
            data: data
        })
    })
})

module.exports = router