// 主题: 增加订阅者/移除订阅者/主题更新通知
class Dep {
    constructor(callback) {
        this.subs = []; // 主题的订阅者
        this.callback = callback;
    }

    // 添加订阅者
    addSub(sub) {
        this.subs.push(sub);
        return this;
    }

    // 移除订阅者
    removeSub(sub){
        let idx = this.subs.indexOf(sub);
        this.subs.splice(idx,1);
        return this;
    }

    // 主题更新通知---调用订阅者update，通知所有订阅者
    notify() {
        this.subs.forEach(item => item.update(this.callback));
    }
}

// 订阅者: 更新订阅主题的函数
class Sub {
    constructor(val) {
        this.val = val;
    }

    update(callback) {
        this.val = callback(this.val); // 执行订阅主题的函数
        console.log('更新之后:', this.val);
    }
}

// 发布者: 增加主题/移除主题/更新主题
class Pub {
    constructor() {
        this.deps = []; // 发布的主题列表
    }

    // 添加主题
    addDep(dep) {
        this.deps.push(dep);
    }

    // 移除主题
    removeDep(dep) {
        let index = this.deps.indexOf(dep);
        if (index !== -1) {
            this.deps.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }

    // 更新主题,触发主题更新通知
    publish(dep) {
        this.deps.forEach(item => item == dep && item.notify());
    }
}

// 新建主题，给主题中加订阅者
let dep1 = new Dep(item => item * item);
dep1.addSub(new Sub(1)).addSub(new Sub(2)).addSub(new Sub(3));

// 新建发布者
let pub = new Pub();
// 添加主题
pub.addDep(dep1);

// 发布者发布，通知这个主题的所有订阅者更新
pub.publish(dep1);

// 输出结果
// 更新之后结果:1
// 更新之后结果:4
// 更新之后结果:9