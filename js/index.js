function Tyrion (options) {
    var self = this;
    this.data = options.data;
    this.methods = options.methods;
    Object.keys(this.data).forEach(function(key) {
        self.proxyKeys(key);
    });

    observe(this.data);
    new Compile(options.el, this);
    if(options.mounted){
        options.mounted.call(this); // 所有事情处理好后执行mounted函数
    }
}

Tyrion.prototype = {
    proxyKeys: function (key) {
        var self = this;
        Object.defineProperty(this, key, {  
            enumerable: false,
            configurable: true,
            get: function getter () {
                console.log('触发get',key)
                return self.data[key];
            },
            set: function setter (newVal) {
                console.log('触发set',key,newVal);
                self.data[key] = newVal;
            }
        });
    }
}
