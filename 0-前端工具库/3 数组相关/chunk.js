// 数组分块
function chunk(arr,size){
    if(arr.length==0){
        return [];
    }
    let result = [];
    let tmp = [];
    arr.forEach(element => {
        // 先加到result里是因为最后一块可能不满，所以都提前放入result中
       if(tmp.length==0){
           result.push(tmp);
       }
       tmp.push(element);
       if(tmp.length==size){
           tmp= [];
       }
    });
    return result;
}

// test
const arr = [1,2,3,4,5,6,7];
const result = chunk(arr,3);
console.log(result);