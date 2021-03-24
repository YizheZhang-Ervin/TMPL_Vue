// 去掉左右的空格

let trim = (str) =>{
    let head = 0,
        tail = str.length-1;
    // 从头遍历
    while(str[head]==" "){
        head++;
    }
    // 从尾遍历
    while(str[tail]==" "){
        tail--;
    }
    return str.substring(head,tail+1);
}

// test
let str001 = "  123   ";
console.log(trim(str001));