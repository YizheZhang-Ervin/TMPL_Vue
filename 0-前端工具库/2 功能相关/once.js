// once实现
let once = (callback)=>{
    var tag = true;
    return ()=>{
        if(tag){
            tag=!tag;
            callback();
        }
    };
}
let o = once(()=>{console.log("once called")});
o();
o();