// 写个函数，可以转化下划线命名到驼峰命名
let conversion = (str)=>{
    let arr = str.split("_"),
        rst = "";
    for(let i=0;i<arr.length;i++){
        if(i==0){
            rst += arr[i].toLowerCase();
        }else{
            rst += arr[i].slice(0,1).toUpperCase() + arr[i].slice(1).toLowerCase();
        }
    }
    return rst;
}

// test
console.log(conversion("this_is_test"));