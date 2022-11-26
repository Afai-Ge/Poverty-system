const express = require('express');
const router = express.Router();
const db = require('../../db/db')
// console.log('db: ', db);

// 折线图
router.get('/getLineData', function (req, res) {
    const sql = 'select v.villageName, v.peopleNum, p.n as poorNum from village as v inner join (select count(1) as n, village from person group by village) as p on v.vid = p.village where v.isDel <> 1'
    db.query(sql, (err, results) => {
        if (err) return console.log(err.message)

        const data = JSON.parse(JSON.stringify(results))
        data.forEach(e => {
            const tmp = (e.poorNum / e.peopleNum).toFixed(2)
            e.rate = Number(tmp)
            e.peopleNum = Number(e.peopleNum)
        })
        data.sort((a, b) => {
            return b.rate - a.rate
        })
        const total = []
        const poor = []
        const rate = []
        const name = []
        data.forEach(e => {
            total.push(e.peopleNum)
            poor.push(e.poorNum)
            rate.push(e.rate)
            name.push(e.villageName)
        })
        console.log('data: ', data);
        res.send({
            code: 200,
            data: {
                name: name,
                total: total,
                poor: poor,
                rate: rate
            }
        })
    })
    //     if (err) {
    //         console.log(err.message);
    //         return res.send({
    //             code: -1,
    //             data: {
    //                 msg: '检查用户名和密码是否正确'
    //             }
    //         })
    //     }
    //     data = JSON.parse(JSON.stringify(results))
})

// 饼图
router.get('/getRatioData', function (req, res) {
    const eduSql = "SELECT education as name, count(1) as value FROM `person` where isDel <> 1 GROUP BY education"
    const sexSql = "SELECT sex as name, COUNT(1) as value FROM `person` where isDel <> 1 GROUP BY sex"
    const ageSql = "select elt(interval(age,0,17,30,45,69),'17岁以下','18~30岁','31~45岁','46~69岁','70岁以上') as name, count(1) as value from person where isDel <> 1 GROUP BY 1 ORDER BY 1"
    db.query(`${eduSql};${sexSql};${ageSql}`, (err, results) => {
        if (err) return console.log(err.message);
        const data = JSON.parse(JSON.stringify(results))
        console.log(data);
        data.forEach(item => {
            item.forEach(e => {
                if (!e.name || e.name === "-") {
                    e.name = "其他"
                }
            })
        })
        return res.send({
            code: 200,
            data: {
                edu: data[0],
                sex: data[1],
                age: data[2]
            }
        })
    })
})

// 获取年报
router.get('/getAnnual', function (req, res) {
    const sql = "SELECT * FROM annual"
    db.query(sql, (err, results) => {
        if (err) return console.log(err.message)
        console.log(results);
        /** 数据处理 **/
        const year = [], total = [], poor = [], rate = []
        results.forEach(item => {
            year.push(item.year)
            total.push(item.total)
            poor.push(item.poor)
            rate.push((item.poor / item.total).toFixed(2))
        })
        // console.log('rate: ', rate);
        res.send({
            code: 200,
            data: {
                year: year,
                total: total,
                poor: poor,
                rate: rate,
            }
        })
    })
})

// 插入新的年报
// INSERT INTO annual SELECT 2022 AS year, SUM(v.peopleNum) AS total, p.* from village AS v join (select COUNT(*) AS poor FROM person) AS p
// 更新年报表
// UPDATE annual SET total = (SELECT SUM(peopleNum) from village), poor = (SELECT count(*) from person) where year = 2022
router.get('/updateAnnual', function (req, res) {
    const date = new Date()
    const year = date.getFullYear()
    console.log('year: ', year);
    const selectSql = `SELECT * FROM annual WHERE year = ${year}`
    const insertSql = `INSERT INTO annual SELECT ${year} AS year, SUM(v.peopleNum) AS total, p.* from village AS v join (select COUNT(*) AS poor FROM person where isDel <> 1) AS p`
    const updateSql = `UPDATE annual SET total = (SELECT SUM(peopleNum) from village), poor = (SELECT count(*) from person where isDel <> 1) where year = ${year}`
    db.query(selectSql, (err, results) => {
        if (err) return console.log(err.message)
        console.log('results: ', results);
        if (results) {    // 有就更新
            db.query(updateSql, (err, results) => {
                if (err) return console.log(err.message)
                res.send(results)
            })
        } else {          // 没有就新增
            db.query(insertSql, (err, results) => {
                if (err) return console.log(err.message)
                res.send(results)
            })
        }
    })
})

// 获取年报
router.get('/getPanData', function (req, res) {
    // const sql = "SELECT * FROM annual"
    // db.query(sql, (err, results) => {
    //     if (err) return console.log(err.message)
    //     console.log(results);
    //     /** 数据处理 **/
    //     const year = [], total = [], poor = [], rate = []
    //     results.forEach(item => {
    //         year.push(item.year)
    //         total.push(item.total)
    //         poor.push(item.poor)
    //         rate.push((item.poor / item.total).toFixed(2))
    //     })
    //     // console.log('rate: ', rate);
    //     res.send({
    //         code: 200,
    //         data: {
    //             year: year,
    //             total: total,
    //             poor: poor,
    //             rate: rate,
    //         }
    //     })
    // })
    res.send({
        code: 200,
        data: {
            data: [
                {
                    type: "贫困占比最高",
                    des: "2010 年",
                    number: "67.0",
                    unit: "%",
                },
                {
                    type: "贫困占比最低",
                    des: "2022 年",
                    number: "33.0",
                    unit: "%",
                },
                {
                    type: "贫困人口最高",
                    des: "2010 年",
                    number: "4,056",
                    unit: "人",
                },
                {
                    type: "贫困人口最低",
                    des: "2022 年",
                    number: "2,002",
                    unit: "人",
                },
                {
                    type: "同比幅度下降",
                    des: "2021-2022 年",
                    number: "11.0",
                    unit: "%",
                },
                {
                    type: "近十年降幅",
                    des: "2012-2022 年",
                    number: "28.0",
                    unit: "%",
                },
                {
                    type: "未有明显降幅",
                    des: "2012-2016 年",
                    number: "5",
                    unit: "年",
                },
            ]
        }
    })
})

module.exports = router