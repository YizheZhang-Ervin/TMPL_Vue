function call(Fn,obj,...args){
    if(obj===undefined || obj===null){
        obj = globalThis;
    }
    obj.temp = Fn;
    let result = obj.temp(...args);
    delete obj.temp;
    return result;
}

// 测试
function add(a,b){
    return a+b+this.c;
}
let obj={c:30};
globalThis.c = 40;

console.log(call(add,obj,10,20));
console.log(call(add,null,10,20));