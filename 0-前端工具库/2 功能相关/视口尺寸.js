// 完成函数getViewportSize返回指定窗口的视口尺寸
// 查询指定窗口的视口尺寸，如果不指定窗口，查询当前窗口尺寸 

function getViewportSize(w) {
    w = w || window;
    // IE9及标准浏览器中可使用此标准方法 
    if ('innerHeight' in w) {
        return {
            width: w.innerWidth,
            height: w.innerHeight
        };
    }
    var d = w.document;
    // IE 8及以下浏览器在标准模式下 
    if (document.compatMode === 'CSS1Compat') {
        return {
            width: d.documentElement.clientWidth,
            height: d.documentElement.clientHeight
        };
    }
    // IE8及以下浏览器在怪癖模式下 
    return {
        width: d.body.clientWidth,
        height: d.body.clientHeight
    };
}
