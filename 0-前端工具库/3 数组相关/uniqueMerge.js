// 给定arr1 arr2，合并去重，返回result

function uniqueMerge(arr1,arr2){
    var rst = []
    for(let i of arr1){
        if(rst.indexOf(i)<0){
            rst.push(i);
        }
    }
    for(let j of arr2){
        if(rst.indexOf(j)<0){
            rst.push(j);
        }
    }
    return rst;
}

// test
var arr001 = [1,2,3,4,4];
var arr002 = [5,6,7,8,8];
var rst = uniqueMerge(arr001,arr002);
console.log(rst.join(','));