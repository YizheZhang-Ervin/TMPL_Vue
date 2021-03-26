// async(spawn函数)实现
let spawn = (genFn)=>{
    return new Promise((resolve,reject)=>{
        let gen = genFn();
        let next = (val)=>{
            let rst = gen.next(val);
            if(rst.done){
                resolve(rst.value);
            }else{
                rst.value.then((val)=>{next(val)});
            }
        }
        next();
    })
}
function* genFn(){
    let p1 = yield new Promise((resolve)=>setTimeout(()=>{resolve(1)},300));
    let p2 = yield new Promise((resolve)=>setTimeout(()=>{resolve(p1+1)},300));
    console.log(p1,p2);
}
// spawn(genFn);