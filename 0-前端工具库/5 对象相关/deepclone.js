// 无法克隆方法
// 循环引用无法解决
function deepclone1(target){
    // 创JSON格式字符串
    let str = JSON.stringify(target);
    let data = JSON.parse(str);
    return data;
}

// 解决了方法的克隆
function deepclone2(target){
    if(typeof target=="object" && target!==null){
        const result = Array.isArray(target)?[]:{};
        for(let key in target){
            if(target.hasOwnProperty(key)){
                result[key] = deepclone2(target[key]);
            }
        }
        return result;
    }else{
        return target;
    }
}

// 解决循环引用
function deepclone3(target,map=new Map()){
    if(typeof target=="object" && target!==null){
        // 每次克隆前判断是否已克隆过
        let cache = map.get(target);
        if(cache){
            return cache;
        }
        const result = Array.isArray(target)?[]:{};
        // 把已经克隆过的放入map，下次遇到就不需要再克隆了
        map.set(target,result);
        for(let key in target){
            if(target.hasOwnProperty(key)){
                result[key] = deepclone3(target[key],map);
            }
        }
        return result;
    }else{
        return target;
    }
}

// 遍历性能优化
function deepclone4(target,map){
    if(typeof target=="object" && target!==null){
        // 每次克隆前判断是否已克隆过
        let cache = map.get(target);
        if(cache){
            return cache;
        }
        let isArray = Array.isArray(target)
        const result = isArray?[]:{};
        // 把已经克隆过的放入map，下次遇到就不需要再克隆了
        map.set(target,result);
        // 优化: 数组foreach
        if(isArray){
            target.forEach((item,index)=>{
                result[index] = deepclone4(item,map);
            })
        // 优化: 对象获取键名再foreach
        }else{
            Object.keys(target).forEach(key=>{
                result[key] = deepclone4(target[key],map);
            })
        }
        return result;
    }else{
        return target;
    }
}

// 带正则和日期
function deepclone5(obj,map){
    let ts = Object.prototype.toString;
    if(obj==null){
        return null;
    }
    if(typeof obj !=="object"){
        return obj;
    }
    if(ts.call(obj)==="[object RegExp]"){
        return new RegExp(obj);
    }
    if(ts.call(obj)==="[object Date]"){
        return new Date(obj);
    }
    // 直接调用已复制过的
    let cache = map.get(obj);
    if(cache){
        return cache;
    }
    // constructor一般指向Object，但也可能是实例的类->克隆出来也是这个实例的类
    let newObj = new obj.constructor;
    // 记录已复制过
    map.set(obj,newObj);
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            newObj[key] = deepclone5(obj[key],map);
        }
    }
    return newObj;
}

// test
const obj = {
    a:1,
    b:[2,3],
    d:{x:1,y:[1,2],z:{zz:1}},
    f:"abc"
}
// 循环调用+正则+日期
const obj2 = {
    a:1,
    b:[2,3],
    c:/^\d+$/,
    d:{x:1,y:[1,2],z:{zz:1}},
    e: Date.now(),
    f:"abc",
}
obj2.g = obj2.d;
obj2.d.r = obj2.g;

const result1 = deepclone1(obj);
const result2 = deepclone2(obj);
let map3 = new Map();
const result3 = deepclone3(obj,map3);
let map4 = new Map();
const result4 = deepclone4(obj,map4);
let map5 = new Map();
const result5 = deepclone5(obj2,map5);
console.log(result1);
console.log(result2);
console.log(result3);
console.log(result4);
console.log(result5);
result5.d.x = [0,1,2];
console.log(obj2);
console.log(result5);