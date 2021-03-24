// node events模块实现

class Event {
  constructor() {
    this.events = Object.create(null);
  }
  // 设置事件
  on(name, fn) {
    if (!this.events[name]) {
      this.events[name] = []
    }
    this.events[name].push(fn);
    return this;
  }
  // 触发事件
  emit(name, ...args) {
    if (!this.events[name]) {
      return this;
    }
    const fns = this.events[name];
    fns.forEach(fn => fn.call(this, ...args))
    return this;
  }
  // 关闭事件
  off(name, fn) {
    if (!this.events[name]) {
      return this;
    }
    if (!fn) {
      this.events[name] = null;
      return this;
    }
    const index = this.events[name].indexOf(fn);
    this.events[name].splice(index, 1);
    return this;
  }
  // 事件监听器最多只会触发一次，触发后立刻解除该监听器
  once(name, fn) {
    const only = () => {
      fn.apply(this, arguments);
      this.off(name, only);
    };
    this.on(name, only);
    return this;
  }
}

