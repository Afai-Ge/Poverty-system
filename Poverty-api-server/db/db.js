const mysql = require('mysql')

/**
 * 腾讯云数据库
 */
const db = mysql.createConnection({
    host: '124.221.106.47',
    user: 'root',
    password: 'root',
    database: 'poor_village',
    port: 3306,
    useConnectionPooling: true,
    multipleStatements: true,
})
/**
 * node本地数据库
 */
// const db = mysql.createPool({
//     host: '127.0.0.1',
//     user: 'root',
//     password: 'hiuhiu',
//     database: 'poor_village',
//     port: 3306,
//     multipleStatements: true,
// })

/**
 * 解决连接错误, 2s后重连
 */
// const txc_config = {
//     host: '124.221.106.47',
//     user: 'root',
//     password: 'root',
//     database: 'poor_village',
//     port: 3306,
//     useConnectionPooling: true,
//     multipleStatements: true,
// }

// const local_config = {
//     host: '127.0.0.1',
//     user: 'root',
//     password: 'hiuhiu',
//     database: 'poor_village',
//     port: 3306,
//     useConnectionPooling: true,
//     multipleStatements: true,
// }
// let db
// function handleError() {
//     // 创建mysql连接对象
//     db = mysql.createConnection(txc_config)
//     // 连接错误,2s后重试
//     db.connect(function (err) {
//         if (err) {
//             console.log('error when connecting to db:', err);
//             setTimeout(handleError(), 2000)
//         }
//     })
//     // 监听错误
//     db.on('error', function (err) {
//         console.log('db error:', err)
//         // 如果断开连接,自动重连
//         if (err.code == 'ECONNRESET' || err.errno) {
//             handleError();
//         } else {
//             throw err;
//         }
//     })
// }
// handleError()
module.exports = db