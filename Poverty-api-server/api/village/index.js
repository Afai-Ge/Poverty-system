const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const xlsx = require('node-xlsx')
const multiparty = require("multiparty")

router.post('/getPage', function (req, res) {
  console.log('req.body: ', req.body);
  const { pageNum, pageSize } = req.body
  const sql = 'select v.*, p.n as poorTotal from village as v inner join (select count(1) as n, village from person where isDel <> 1 group by village) as p on v.vid = p.village where v.isDel <> 1'
  db.query(sql, (err, result) => {
    if (err) return console.log(err);
    // console.log('result: ', result);
    let data = JSON.parse(JSON.stringify(result))
    const len = data.length
    console.log('len: ', len);
    data = data.slice((pageNum - 1) * pageSize, pageNum * pageSize)
    for (let items of data) {
      // console.log('items: ', items);
      for (let i in items) {
        items[i] = {
          val: items[i] || ' ',
          visible: false
        }
      }
    }
    console.log('data: ', data);
    res.send({
      code: 200,
      total: len,
      data: data
    })
  })
})

router.post('/searchForData', function (req, res) {
  console.log('req.body: ', req.body);
  const { villageName, charge, pageNum, pageSize } = req.body
  // const sql = `select * from village where (? is null or villageName like '%${villageName}%') and (? is null or charge like '%${charge}%')`
  const sql = `select v.*, p.n as poorTotal from village as v inner join (select count(1) as n, village from person where isDel <> 1 group by village) as p on v.vid = p.village where v.isDel <> 1 and (? is null or villageName like '%${villageName}%') and (? is null or charge like '%${charge}%')`
  db.query(sql, [villageName, charge], (err, result) => {
    if (err) return console.log(err);
    let data = JSON.parse(JSON.stringify(result))
    const len = data.length
    data = data.slice((pageNum - 1) * pageSize, pageNum * pageSize)
    for (let items of data) {
      // console.log('items: ', items);
      for (let i in items) {
        items[i] = {
          val: items[i],
          visible: false
        }
      }
    }
    return res.send({
      code: 200,
      data: data,
      total: len
    })
  })
})

router.post('/deleteData', function (req, res) {
  console.log('deleteData', req.body);
  const { selectionList } = req.body
  const sql = 'update village set isDel = 1 where vid = ?'
  selectionList.forEach(e => {
    db.query(sql, e, (err) => {
      if (err) return console.log(err)
    })
  });
  res.send({
    code: 200,
    msg: '删除成功'
  })
  // db.query(sql, [villageName, villageName, charge, charge], (err, result) => {
  //   if (err) return console.log(err);
  //   console.log(result);
  //   return res.send({
  //     code: 200,
  //     data: JSON.parse(JSON.stringify(result))
  //   })
  // })
})

router.post('/editData', function (req, res) {
  console.log('editData', req.body);
  const { vid, key, newData } = req.body
  const sql = `update village set ${key} = ? where vid = ?`
  db.query(sql, [newData, vid], (err, result) => {
    if (err) return console.log(err)
    res.send({
      code: 200,
      msg: "修改成功"
    })
  })
})

// TODO：insert新数据
router.post('/addForm', function (req, res) {
  console.log('addForm', req.body);
  const { villageName, peopleNum, local, charge, chargeOffice, phone } = req.body
  const sql_village_insert = `insert into village (villageName, peopleNum, local, charge, chargeOffice, phone) values ('${villageName}', ${peopleNum}, '${local}', '${charge}', '${chargeOffice}', '${phone}')`
  const sql_vid = `SELECT MAX(vid) as vid FROM village` //'select vid from village ORDER BY vid desc limit 0,1;'
  const sql_person = `insert into person (name, phone, village) values ('${charge}','${phone}' , ?)`
  db.query(sql_village_insert, (err, result) => {
    if (err) return console.log(err)
    db.query(sql_vid, (err, result) => {
      if (err) return console.log(err)
      console.log('result: ', result);
      const { vid } = JSON.parse(JSON.stringify(result))[0]
      console.log('vid: ', vid);
      db.query(sql_person, vid, (err, result) => {
        if (err) return console.log(err)
        res.send({
          code: 200,
          msg: "增加成功"
        })
      })
    })

  })
})

// TODO：下载
router.post('/download', function (req, res) {
  // console.log('addForm', req.body);
  // const { vid, key, newData } = req.body
  const sql = `select * from village where isDel = 0`
  db.query(sql, (err, result) => {
    if (err) return console.log(err)
    const data = JSON.parse(JSON.stringify(result))
    const title = ['村名', '总人数', '负责人', '职务', '负责人电话', '贫困人数', '地址']
    let file = []
    file.push(title)
    data.forEach(item => {
      let tmp = []
      tmp.push(item.villageName)
      tmp.push(item.peopleNum)
      tmp.push(item.charge)
      tmp.push(item.chargeOffice)
      tmp.push(item.phone)
      tmp.push(0)
      tmp.push(item.local)

      file.push(tmp)
    })
    console.log('file: ', file);
    file = xlsx.build([{ name: 'sheet1', data: file }])
    // console.log('file: ', file);
    res.send(file)
  })
})

// 上传
router.post('/upload', function (req, res) {
  console.log(' ########## village upload ####### ');
  const form = new multiparty.Form()
  form.parse(req, (err, fields, files) => {
    console.log('files: ', files);
    const { originalFilename, path } = files.file[0]
    // console.log('originalFilename: ', originalFilename);
    const fileName = originalFilename.split('.')[0]
    if (fileName === "贫困村信息") {
      // 解析
      const { data } = xlsx.parse(path)[0]
      // 入库
      const title = data.shift()  //删去表头
      const villageListSql = "select villageName from village"
      db.query(villageListSql, (err, results) => {  // 先排除已有
        if (err) return console.log(err.message);

        const villageList = []
        results.forEach(e => {
          villageList.push(e.villageName)
        })
        console.log('villageList: ', villageList);
        // 筛出重复项
        const insertData = data.filter(item => {
          return villageList.indexOf(item[0]) === -1
        })
        console.log("insertData", insertData instanceof Array);
        // 批量插入数据
        if (insertData.length) {   // 判断插入数据是否为空
          console.log("################ insert #################");
          const str = []
          insertData.forEach(item => {
            let value = "("
            item.forEach(i => {
              value += `'${i}',`
            })
            value = value.substring(0, value.length - 1)
            value += ")"
            str.push(`insert into village(villageName,peopleNum,charge,chargeOffice,phone,tmp,local) values ${value};insert into person (name, phone, village) SELECT '${item[2]}','${item[4]}',Max(vid) from village;`)
          })
          // console.log('str: ', str.join(','));
          // 插入数据 处理负责人写入表
          // const insert_sql = `insert into village(villageName,peopleNum,charge,chargeOffice,phone,tmp,local) values ${values.join(',')};`
          const insert_sql = str.join('')
          console.log('insert_sql: ', insert_sql);
          db.query(insert_sql, (err, results) => {
            if (err) {
              console.log(err.message)
              return res.send({
                code: -1,
                data: {
                  msg: "数据写入失败"
                }
              })
            }
            // console.log(results);
            // 上传成功
            return res.send({
              code: 200,
              data: {
                msg: "上传成功",
                success: insertData.length,
                failure: data.length - insertData.length
              }
            })
          })
        } else {
          return res.send({
            code: 200,
            data: {
              msg: "数据已存在",
              success: insertData.length,
              failure: data.length - insertData.length
            }
          })
        }
      })
    } else {
      // 上传不对
      return res.send({
        code: -1,
        data: {
          msg: "请上传正确的文件"
        }
      })
    }
  })
})

router.get('/getChartData', function (req, res) {
  // console.log('getChartData', req.body);
  // const { vid, key, newData } = req.body
  const sql = 'select v.villageName, v.peopleNum, p.n as poorTotal from village as v inner join (select count(1) as n, village from person group by village) as p on v.vid = p.village where v.isDel <> 1'
  db.query(sql, (err, result) => {
    if (err) return console.log(err)
    let data = JSON.parse(JSON.stringify(result))
    // 总人数排序
    const totalName = []
    const totalNum = []
    data.sort((a, b) => {
      return b.peopleNum - a.peopleNum
    })
    data.forEach(e => {
      totalName.push(e.villageName)
      totalNum.push(Number(e.peopleNum))
    })
    // 贫困人口排序
    const poorName = []
    const poorNum = []
    data.sort((a, b) => {
      return b.poorTotal - a.poorTotal
    })
    data.forEach(e => {
      poorName.push(e.villageName)
      poorNum.push(Number(e.poorTotal))
    })
    // console.log('result: ', data);
    res.send({
      code: 200,
      data: {
        total: {
          name: totalName,
          value: totalNum,
          show: true
        },
        poor: {
          name: poorName,
          value: poorNum,
          show: true
        }
      }
    })
  })
})



module.exports = router