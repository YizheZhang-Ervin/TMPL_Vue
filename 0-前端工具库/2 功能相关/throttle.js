// 函数节流(throttle)
// 在函数需要频繁触发时: 函数执行一次后，只有大于设定的执行周期后才会执行第二次
// 适合多次事件按时间做平均分配触发， resize、scroll、mousemove、mousedown

function throttle(callback,wait){
    // 开始时间
    let start=0;
    return function(e){
        let now = Date.now();
        if(now-start>=wait){
            callback.call(this,e);
            start = now;
        }
    }
}

// 测试
// window.addEventListener("scroll",throttle(function(e){
//     console.log(e);
// },500));