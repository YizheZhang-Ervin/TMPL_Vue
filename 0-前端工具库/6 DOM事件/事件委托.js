// 事件委托函数封装

function addEventListener(el,type,fn,selector){
    if(typeof el==="string"){
        el = document.querySelector(el);
    }
    // 未传递子元素选择器
    if(!selector){
        el.addEventListener(type,fn);
    }else{
        el.addEventListener(type,function(e){
            const target = e.target;
            if(target.matches(selector)){
                fn.call(target,e);
            }
        })
    }
}

// test
// <ul id="items"><li></li><div></div></ul>
// addEventListener("#items","click",function(e){console.log(this.innerHTML)},"li");