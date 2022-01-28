/**
 * 
 * 
*/
// var findRadius = function (houses, heaters) {
//     var min = [], max = 0
//     for(let i=0;i<houses.length;i++){
//         let j=0
//         while(j<heaters.length){          
//             let distance = Math.abs(houses[i]-heaters[j])
//             if(min[i]==undefined) min[i] = distance
//             else min[i] = distance > min[i] ? min[i] : distance
//             j++
//         }
//     }
//     console.log(min)
//     max = Math.max(...min)
//     return max
// };

// console.log(findRadius([1,2,3,4],[1,4]))

/**
 * 
 * 
 */
// const reg = /[1-9][0-9]{2}(-[0-9]{3}){2}/
// const regg = /[0-9]{3}/g
// const number1 = '100-099-9021'
// const number2 = '100-89-9021'
// const number3 = '100-892-902'
// // let res = number3.matchAll(regg)
// let f,s,t;
// let result = number1.replace(/([1-9]\d{2})-(\d{3})-(\d{4})/,"$3")
// console.log(result)

/**
 * 
 * 
 */
// function unique(arr) {
//     var obj = {};
//     return arr.filter(function (item, index, arr) {
//         return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
//     })
// }
// var arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}];
// // console.log(unique(arr))
// var obj = {}
// for (var item of arr) {
//     console.log(typeof item + item)
// }

/**
 * sleep()
 * 
 */

// for (var i = 0; i < 5; i++) {
//     setTimeout((function (i) {
//         return function () {
//             console.log(i)
//         }
//     })(i), 1000 * i)
// }

// for (var i = 0; i < 5; i++) {
//     (function (e) {
//         setTimeout(() => {
//             console.log(e)
//         }, 1000 * i);
//     })(i)
// }

// function sleep(time) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve();
//     }, time);
//   })
// }

// // for (let i = 0; i < 5; i++) {
// //     sleep(1000 * i).then(data => console.log(i))
// // }
// // (async function print() {
// //     for (let i = 0; i < 5; i++) {
// //         await sleep(1000)
// //         console.log(i)
// //     }
// // })()

// // // 处理数据,使图标x轴减少密集
// // function reduceDataDense(interval, arr) {
// //     for (let i = 0; i < arr.length; i++) {
// //       if (j == 0) {
// //         arr.splice(i, 1);
// //         j = interval;
// //       }
// //     }
// //     return arr;
// //   };

// // let arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// // console.log(reduceDataDense(1, arr1));


// // let obj  = new Object;
// // obj = {
// //   first: "111",
// //   second: "222",
// //   third: "333"
// // }

// // console.log(Object.getOwnPropertyDescriptors(obj))    // ↓
// /**
//  * {
//   first: {
//     value: '111',
//     writable: true,     可写
//     enumerable: true,   可枚举
//     configurable: true  可编辑
//   }
//  */

// // 对象 Rest参数和拓展运算符
// // function connect({ host, post, ...user }) {
// //   console.log(host);
// //   console.log(post);
// //   console.log(user);
// // }
// // /**
// //  *  127.0.0.1
// //     3306
// //     { username: 'root', password: 'root' }
// //  */

// // connect({
// //   host: "127.0.0.1",
// //   post: 3306,
// //   username: "root",
// //   password: "root"
// // })

// const data = {
//   host: "127.0.0.1",
//   post: 3306,
//   username: "root",
//   password: "root"
// }

// const data2 = {
//   host: "192.168.1.1"
// }
// console.log({...data2, ...data});

// 正则命名规则
// let str = "<a href='https://asldhsaf.com'>跳转</a>"

// const reg = /<a href='(?<url>.*)'>(?<button>.*)<\/a>/;
// const res = reg.exec(str);
// console.log(res.groups.url);

// map, filter, reduce
// let arr = [1, 4, 9, 16];
// console.log(arr.filter(item => item));
// console.log(arr.sort((a,b)=> b-a));
// const data = {
//   host: "127.0.0.1",
//   port: 3306,
//   username: "root",
//   password: "root"
// }
// const fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];

// const filterItems = query => {
//   return fruits.filter(el => {
//     return el.toLowerCase().indexOf(query.toLowerCase()) > -1
//   })
// }

// console.log(filterItems('ap'));
// console.log(filterItems('an'));

// let iterator = fruits.entries();
// console.log(data["host"]);
// for (let i of iterator){
//   console.log(i);
// }

/**
 * Array.reduce
 */

// const sum = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// console.log(sum.reduce((res, v) => {
//   return Math.max(res, v);
// }, 10))

// sum.splice(1,0,2);
// const s = "aslfkhasnflka";
// for (let i of s){
//   console.log( i );
// }

// 二维数组拷贝
// let arr = [[1,1,1],[2,2,2],[3,3,3]];
// let tmp = [...arr[0]];
// tmp.shift();
// console.log(tmp);
// console.log(arr);

function formatDate(numb) {
    const time = new Date((numb - 1) * 24 * 3600000 + 1)
    time.setYear(time.getFullYear() - 70)
    const year = time.getFullYear() + ''
    const month = time.getMonth() + 1 + ''
        return `${year}年${month}月`
}
console.log(formatDate(42618)) // 2016-9-5