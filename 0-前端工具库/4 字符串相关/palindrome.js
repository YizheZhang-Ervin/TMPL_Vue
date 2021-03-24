function palindrome(str){
    let arr = [...str];
    arr.reverse();
    return arr.join("") === str;
}

// test
let str = "lol";
console.log(palindrome(str));