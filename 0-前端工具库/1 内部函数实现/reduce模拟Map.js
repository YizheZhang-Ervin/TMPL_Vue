Array.prototype._map = function(fn, callbackThis) {
    let res = [];
    let CBThis = callbackThis || null;
    this.reduce((total, curVal, curIdx, arr) => {
        res.push(fn.call(CBThis, curVal, curIdx, arr));
    },null);
    return res;
}

console.log([1,2,3]._map((n)=>n*n));