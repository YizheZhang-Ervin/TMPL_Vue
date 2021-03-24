// sleep实现
let sleep = (time)=>{
    return new Promise((resolve)=>{
        setTimeout(()=>resolve("resolved"),time);
    });
};
let exe1 = async ()=>{
    let tmp = await sleep(300);
    console.log("await success");
    return tmp;
};
let exe2 = ()=>{
    sleep(300).then((successMsg)=>{console.log(successMsg,"then success")});
}
exe1();
exe2();