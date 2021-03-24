// Fn原型对象是否是obj原型链上的某个对象
// __proto__和constructor属性是对象所独有的
// prototype属性是函数所独有的

function myInstanceOf(obj,Fn){
    // 显式原型
    let prototype = Fn.prototype;
    // 隐式原型
    let proto = obj.__proto__;
    while(proto){
        if(prototype===proto){
            return true;
        }
        proto = proto.__proto__;
    }
    return false;
}

// test
function Person(){}
let p = new Person();
console.log(myInstanceOf(p,Person));


