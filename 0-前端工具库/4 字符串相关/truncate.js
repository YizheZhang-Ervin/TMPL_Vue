// 超出部分用...
function truncate(str,size){
    return str.slice(0,size) + "...";
}

// test
let str = "abcdefghijqqqqqqqqqqqqqqqq";
console.log(truncate(str,10));