// 对象合并

function mergeObject(...objs){
    const result = {};
    objs.forEach(obj=>{
        Object.keys(obj).forEach(key=>{
            if(result.hasOwnProperty(key)){
                result[key] = [].concat(result[key],obj[key]);
            }else{
                result[key] = obj[key];
            }
        })
    })
    return result;
}

// test
const obj1 = {
    a:[{x:2},{y:4}],
    b:1,
    c:200
};
const obj2 = {
    a:{z:3},
    b:[2,3],
    c:"foo"
};
console.log(mergeObject(obj1,obj2));