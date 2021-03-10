function reduce(arr,callback,initValue){
     let result = initValue;
     arr.forEach(element => {
         result = callback(result,element);
     });
     return result;
}

// test
const arr = [1,2,3,4,5];
const result = reduce(arr,(res,value)=>{
    return res+value;
},0);
console.log(result);