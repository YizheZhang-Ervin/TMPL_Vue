// 将对象转为字符串比较
// 这是最容易想到的方法，主要使用JSON.stringify()这个方法对对象进行强转：

var a={};
var b=new Object();
console.log(JSON.stringify(a)=="{}")  //true
console.log(JSON.stringify(b)=="{}")  //true

// for…in循环
// 使用for in循环可以遍历所有属性以次判断对象是否为空对象：

var a={};
function isEmptyObject(obj){
    for(var key in obj){
        return false
    };
    return true
};
console.log(isEmptyObject(a));

// Object.getOwnPropertyNames()
// Object.getOwnPropertyNames()方法返回一个由指定对象的所有自身属性的属性名
// 包括不可枚举属性但不包括Symbol值作为名称的属性组成的数组。
// 用此方法判断空对象只需要判断返回的数组长度是否为零，为零的话就是空对象。

var obj = { };
console.log(Object.getOwnPropertyNames(obj).length == 0); // true

// Object.keys()
// 该方法属于 ES5 标准，IE9 以上和其它现代浏览器均支持。
// Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，
// 数组中属性名的排列顺序和使用 for…in 循环遍历该对象时返回的顺序一致。
// 用此方法判断空对象只需要判断返回的数组长度是否为零，为零的话就是空对象。

var data = {};
var arr = Object.keys(data);
console.log(arr.length == 0);//true