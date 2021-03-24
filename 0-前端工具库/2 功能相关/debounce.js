// 函数防抖(debounce)
// 在函数需要频繁触发时: 在规定时间内，只让最后一次生效，前面的不生效。
// 适合多次事件一次响应的情况，实时搜索联想（keyup）、文本输入的验证（ajax验证一次）

function debounce(callback,time){
    let timeId = null;
    return function(e){
        // 第二次及之后再触发
        if(timeId!=null){
            clearTimeout(timeId);
        }
        // 启动定时器
        timeId = setTimeout(()=>{
            callback.call(this,e);
            // 重置定时器
            timeId = null;
        },time);
    }
}

// 测试
// input.onkeydown = debounce(function(e){
//     console.log(e);
// },1000);