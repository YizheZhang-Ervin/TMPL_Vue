function reverseString(str){
    // let arr = str.split("");
    let arr = [...str];
    arr.reverse();
    let s = arr.join("");
    return s;
}

// test
let str = "abcdefg";
console.log(reverseString(str));