function slice(arr,begin,end){
    if(arr.length==0){
        return [];
    }
    // begin是否有值
    begin = begin || 0;
    // begin是否越界
    if(begin>=arr.length){
        return [];
    }
    // end是否有值
    end = end || arr.length;
    // end是否小于begin
    if(end<begin){
        end = arr.length;
    }

    let result = [];
    for(let i=0;i<arr.length;i++){
        if(i>=begin && i<end){
            result.push(arr[i]);
        }
    }
    return result;
}

// test
let arr = [1,2,3,4,5];
const result = slice(arr,0,9);
console.log(result);