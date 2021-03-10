function newInstance(Fn,...args) {
    // 创新对象
    const obj = {};
    // 修改内部this指向新对象
    const result = Fn.call(obj,...args);
    // 修改新对象的原型对象
    obj.__proto__ = Fn.prototype;
    // 返回新对象
    // 如果result返回值是一个指定的对象，则返回指定的对象
    // 否则返回obj
    return result instanceof Object?result:obj;
}

// test
function Person(name, age) {
    this.name = name
    this.age = age
    // 例如有返回一个对象的情况，newInstance就返回这个对象
    // return {a:100};
}

const obj = newInstance(Person, 'abc', 99)
console.log(obj)