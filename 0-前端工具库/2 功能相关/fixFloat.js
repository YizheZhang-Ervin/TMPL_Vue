// 一个函数修复0.1+0.2不等于0.3的问题

let equal = (a,b)=>{
    let bound = Number.EPSILON?Number.EPSILON:Math.pow(2,-52);
    return Math.abs(a-b)<bound;
}

// test
console.log(equal(0.1+0.2,0.3));