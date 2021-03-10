function VF(options) {
    this.options = options || {};
    var data = this.data = this.options.data;
    var me = this;

    // 数据代理
    // 实现 vm.xxx -> vm.data.xxx
    Object.keys(data).forEach(function(key) {
        me.proxyData(key);
    });

    this.initComputed();

    observe(data, this);

    this.compile = new Compile(options.el || document.body, this)
}

VF.prototype = {
    constructor: VF,
    watch: function(key, cb, options) {
        new Watcher(this, key, cb);
    },

    proxyData: function(key, setter, getter) {
        var me = this;
        setter = setter || 
        Object.defineProperty(me, key, {
            configurable: false,
            enumerable: true,
            get: function proxyGetter() {
                return me.data[key];
            },
            set: function proxySetter(newVal) {
                me.data[key] = newVal;
            }
        });
    },

    initComputed: function() {
        var me = this;
        var computed = this.options.computed;
        if (typeof computed === 'object') {
            Object.keys(computed).forEach(function(key) {
                Object.defineProperty(me, key, {
                    get: typeof computed[key] === 'function' 
                            ? computed[key] 
                            : computed[key].get,
                    set: function() {}
                });
            });
        }
    }
};