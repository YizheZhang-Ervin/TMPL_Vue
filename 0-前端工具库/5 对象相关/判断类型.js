// 怎么判断array，写一下instanceof和Object.toString怎么判断
// typeof
// 简单数据类型（基本数据类型）：undefined、boolean、number、string和symbol
// 复杂数据类型（引用类型）：object(null,数组，正则)、function

// instanceOf
// instanceof无法直接判断原始数据类型 "xx" instanceOf String为false
// instanceof 对于特殊类型无法判断 [] instanceOf Array或Object都为true

let judgeType = (obj,givenType) => {

    // 非对象类型判断
    if (typeof (obj) !== "object") {
        return `typeof(): ${typeof(obj)}`;
    }
    // 特殊判断:array
    if (Array.isArray(obj)) {
        return "isArray(): array";
    }
    // 特殊判断:null
    if(obj==null){
        return "obj==null: null";
    }
    // 非特殊情况对象类型判断
    if(givenType){
        if (obj instanceof givenType) {
            return "InstanceOf: RegExp";
        }
    }
    // 全类型通用判断
    let rst = Object.prototype.toString.call(obj);
    return `toString: ${rst}`;
}

// test
console.log(judgeType(1));
console.log(judgeType([1,2,3]));
console.log(judgeType(null));
console.log(judgeType({a:1}));
console.log(judgeType(new RegExp("/.*/"),RegExp));