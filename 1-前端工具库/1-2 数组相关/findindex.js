function find(arr,callback){
    for(let i=0;i<arr.length;i++){
        let res = callback(arr[i],i);
        if(res){
            return i;
        }
    }
    // 无满足条件的，返回-1
    return -1;
}


// test
const arr = [1,100,1000,10000];
const result = find(arr,(item,idx)=>{
    return item>1000;
})
console.log(result);