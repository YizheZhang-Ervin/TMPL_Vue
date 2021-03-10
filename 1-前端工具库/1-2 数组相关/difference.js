// 差集，arr1有的，arr2没有的

function difference(arr1,arr2=[]){
    if(arr1.length==0){
        return [];
    }
    if(arr2.length==0){
        return arr1.slice();
    }
    // 找arr2没有的arr1的元素
    const result = arr1.filter(item=>!arr2.includes(item));
    return result;
}


// test
const arr = [1,3,5,7];
const arr2 = [5,8];
const result = difference(arr,arr2);
console.log(result);