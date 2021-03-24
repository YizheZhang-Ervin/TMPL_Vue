// 写一个图片加载的函数，传入url和timeout，需要处理error和timeout超时

let lazyLoad = (imgs) => {
    let getTop = (ele) => {
        // offsetTop: 当前对象到其上级层顶部的距离
        let dis = ele.offsetTop;
        // 最近的父元素
        while (ele = ele.offsetParent) {
            dis += ele.offsetTop;
        }
        return dis;
    }
    // 滚动条位置+可视区域高度>当前元素与页面顶部的距离，就加载这个图片
    let de = document.documentElement;
    let ch = de.clientHeight;
    // 对象的最顶部到对象在当前窗口显示的范围内的顶边的距离．
    // 即是在出现了纵向滚动条的情况下，滚动条拉动的距离
    let st = de.scrollTop || document.body.scrollTop;
    imgs.forEach(ele => {
        if (ch + st > getTop(ele)) {
            ele.src = ele.getAttribute("data-src");
        }
    });
}

//window.onscroll()在滚动条滚动的时候触发
let lazyLoad2 = (imgs) => {
    // 判断是否出界，加载图片
    function isIn(el) {
        // 获取图片到可视区顶部的距离
        var bound = el.getBoundingClientRect();
        // 可视区的高度
        var clientHeight = window.innerHeight;
        return bound.top <= clientHeight;
    }

    //检查图片是否在可视区内，如果不在，则加载
    Array.from(imgs).forEach(function (el) {
        if (isIn(el)) {
            // src非空
            if (!el.src) {
                var source = el.dataset.src;
                el.src = source;
            }
        }
    })
}