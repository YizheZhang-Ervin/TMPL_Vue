// 有一个不满足就返回false

function every(arr,callback){
    for(let i=0;i<arr.length;i++){
        if(!callback(arr[i],i)){
            return false;
        }
    };
    return true;
}

// test
const arr = [1,2,3,4,5];
const result = every(arr,(item,idx)=>{
    return item>2;
});
console.log(result);