function concat(arr,...args){
    const result = [...arr];
    args.forEach(item=>{
        if(Array.isArray(item)){
            // 展开一个个放进去
            result.push(...item);
        }else{
            result.push(item);
        }
    })

    return result;
}


// test
let arr = [1,2,3];
const result = concat(arr,[4,5,6],7,8);
console.log(result);