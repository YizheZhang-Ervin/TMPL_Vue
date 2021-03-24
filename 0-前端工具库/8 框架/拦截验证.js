// 现有一个Page类,其原型对象上有许多以post开头的方法(如postMsg);
// 另有一拦截函数check,只返回 ture或false.请设计一个函数,
// 该函数应批量改造原Page的postXXX方法,在保留其原有功能的同时,为每个postXXX方法增加加拦截验证功能,
// 当chekc返回true时继续执行原postXXX方法,返回false时不再执行原postXXX方法

function Page() { }
Page.prototype = {
    constructor: Page,
    postA: function (a) {
        console.log('a:' + a);
    },
    postB: function (b) {
        console.log('b:' + b);
    },
    postC: function (c) {
        console.log('c:' + c);
    },
    check: function () {
        return Math.random() > 0.5;
    }
}
function checkfy(obj) {
    // 遍历每个键
    for (var key in obj) {
        // 方法1
        // 键以post开头，且键为函数
        // if (key.indexOf('post') === 0 && typeof obj[key] === 'function'){
        //     let fn = obj[key];
        //     obj[key] = (args) => {
        //         // 拦截
                // if(obj.check()){
                //     fn.apply(obj,[args]);
                // }
        //     }
        // }

        // 方法2
        let fn = obj[key];
        let check = obj.check;
        Object.defineProperty(obj,key,{
            configurable:true,
            get:function(){
                return (args)=>{
                    if(check()){
                        fn.apply(obj,[args]);
                    }
                }
            }
        })
    }
}

// test
checkfy(Page.prototype);
var obj = new Page();
obj.postA('checkfy');
obj.postB('checkfy');
obj.postC('checkfy');