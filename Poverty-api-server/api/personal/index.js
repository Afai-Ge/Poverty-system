const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const xlsx = require('node-xlsx')
const multiparty = require("multiparty")


router.post('/getPage', function (req, res) {
  console.log('req.body: ', req.body);
  const { pageNum, pageSize } = req.body
  const sql = `SELECT p.*, v.villageName from person as p INNER JOIN village as v on p.village = v.vid where p.isDel <> 1`
  // const sql = 'select v.*, p.n as poorTotal  from village as v inner join (select count(1) as n, village from person group by village) as p on v.vid = p.village where v.isDel <> 1'
  db.query(sql, (err, result) => {
    if (err) return console.log(err);
    // console.log('result: ', result);
    let data = JSON.parse(JSON.stringify(result))
    const len = data.length
    data = data.slice((pageNum - 1) * pageSize, pageNum * pageSize)
    for (let items of data) {
      // console.log('items: ', items);
      for (let i in items) {
        items[i] = {
          val: items[i] || "-",
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
  const { name, phone, villageName, pageNum, pageSize } = req.body
  // const sql = `select * from village where (? is null or villageName like '%${villageName}%') and (? is null or charge like '%${charge}%')`
  // const sql = `select v.*, p.n as poorTotal from village as v inner join (select count(1) as n, village from person group by village) as p on v.vid = p.village where v.isDel <> 1 and (? is null or villageName like '%${villageName}%') and (? is null or charge like '%${charge}%')`
  const sql = `SELECT p.*, v.villageName from person as p INNER JOIN village as v on p.village = v.vid where p.isDel <> 1 and (? is null or p.name like '%${name}%') and (? is null or p.phone like '%${phone}%') and (? is null or v.villageName like '%${villageName}%')`
  db.query(sql, [name, phone, villageName], (err, result) => {
    if (err) return console.log(err);
    let data = JSON.parse(JSON.stringify(result))
    const len = data.length
    data = data.slice((pageNum - 1) * pageSize, pageNum * pageSize)
    for (let items of data) {
      // console.log('items: ', items);
      for (let i in items) {
        items[i] = {
          val: items[i] || "-",
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
  const sql = 'update person set isDel = 1 where uid = ?'
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
  const { uid, key, newData } = req.body
  const sql = `update person set ${key} = ? where uid = ?`
  db.query(sql, [newData, uid], (err, result) => {
    if (err) return console.log(err)
    res.send({
      code: 200,
      msg: "修改成功"
    })
  })
})

// TODO：获取village列表
router.get('/villageList', function (req, res) {
  console.log('villageList', req.body);
  // const { vid, key, newData } = req.body
  const sql = `select vid, villageName from village where isDel <> 1`
  db.query(sql, (err, result) => {
    if (err) return console.log(err)
    const data = JSON.parse(JSON.stringify(result))
    res.send({
      code: 200,
      data: data
    })
  })
})

// TODO：insert新数据
router.post('/addForm', function (req, res) {
  console.log('req.body', req.body);
  const { name, sex, age, phone, political, education, village } = req.body
  const sql = `insert into person (name,sex,age,phone,political,education,village) values ('${name}','${sex}',${age},'${phone}','${political}','${education}',${village})`
  db.query(sql, (err, result) => {
    if (err) return console.log(err.message)

    res.send({
      code: 200,
      msg: "添加成功"
    })
  })
})

router.post('/download', function (req, res) {
  console.log('addForm', req.body);
  const { pageNum, pageSize } = req.body
  const sql = `SELECT p.*, v.villageName from person as p INNER JOIN village as v on p.village = v.vid where p.isDel <> 1`
  db.query(sql, (err, result) => {
    if (err) return console.log(err)
    let data = JSON.parse(JSON.stringify(result))
    data = data.slice((pageNum - 1) * pageSize, pageNum * pageSize)
    console.log('data: ', data);
    const title = ['名字', '性别', '年龄', '手机', '政治面貌', '学历', '所在村']
    let file = []
    file.push(title)
    data.forEach(item => {
      let tmp = []
      tmp.push(item.name)
      tmp.push(item.sex)
      tmp.push(item.age)
      tmp.push(item.phone)
      tmp.push(item.political)
      tmp.push(item.education)
      tmp.push(item.villageName)

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
  console.log(' ########## personal upload ####### ');
  const form = new multiparty.Form()
  form.parse(req, (err, fields, files) => {
    console.log('files: ', files);
    const { originalFilename, path } = files.file[0]
    // console.log('originalFilename: ', originalFilename);
    const fileName = originalFilename.split('.')[0]
    if (fileName === "贫困人员信息") {
      // 解析
      const { data } = xlsx.parse(path)[0]
      // 入库
      console.log('data: ', data);
      const title = data.shift()  //删去表头
      const str = []
      data.forEach(item => {
        const villageName = item.pop()
        let values = ""
        item.forEach(e => {
          values += `'${e}',`
        })
        const tmp = `insert into person (name,sex,age,phone,political,education,village) SELECT ${values} vid from village where villageName = '${villageName}';`
        console.log('tmp: ', tmp);
        str.push(tmp)
      })
      const insert_sql = str.join('')
      db.query(insert_sql, (err, results) => {
        if (err) return console.log(err.message);
        console.log('results', results);
        return res.send({
          code: 200,
          data: {
            msg: '上传成功!',
            success: results.reduce((total, cur) => {
              return total += cur.affectedRows
            }, 0)
          }
        })
      })
    } else {
      // 上传不对
      return res.send({
        code: -1,
        msg: "请上传正确的文件"
      })
    }
  })
})



module.exports = router