function clone1(target){
    if(typeof target === "object" && target !==null){
        if(Array.isArray(target)){
            return [...target];
        }else{
            return {...target};
        }
    }else{
        return target;
    }
}

function clone2(target){
    if(typeof target === "object" && target !==null){
        const result = Array.isArray(target)?[]:{};
        for(let key in target){
            // 判断当前对象上是否包含该属性
            if(target.hasOwnProperty(key)){
                result[key] = target[key];
            }
        }
        return result;
    }else{
        return target;
    }
}

// test
const obj = {x:"abc",y:{m:1},z:[1,2,3]};
const result1 = clone1(obj);
const result2 = clone2(obj);
console.log(result1);
console.log(result2);