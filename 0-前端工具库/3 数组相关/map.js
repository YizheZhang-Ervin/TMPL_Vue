function map(arr,callback){
    let result = [];
    let idx = 0;
    arr.forEach(element => {
        result.push(callback(element,idx));
        idx++;
    });
    return result;
}


// test
const arr = [1,2,3,4,5];
const result = map(arr,(item,idx)=>{
    console.log(idx);
    return item*10;
})
console.log(result);