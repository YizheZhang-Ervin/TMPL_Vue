// 方法1:
var Pclass = (function () {
    const a = Symbol('a');
    const m = Symbol('m');
    class Pclass {
        constructor() {
            this[a] = 'privateA';
            this.b = 'publicB';
            this[m] = function () {
                console.log('privateFunction');
            }
        }
        getA() {
            console.log(this[a]);
        }
        getM() {
            console.log(this[m]);
        }
    }
    return Pclass
}())

let pc = new Pclass()
console.log(pc)

// 方法2
obj = {
    name: '123',
    getName: function () {
        return this.name
    }
}
object.defineProperty(obj, "name", {
    //不可枚举不可配置
});