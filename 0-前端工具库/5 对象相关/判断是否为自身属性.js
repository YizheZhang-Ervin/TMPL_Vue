class A{
    constructor(){
        this.attr1 = 1;
    }
}

class B extends A{
    constructor(){
        super();
        this.attr2 = 2;
    }
}

let b = new B();
A.prototype.attr3 = 3;

// 会访问到继承的属性,prototype上的属性
for(let i in b){
    console.log(i);
}

// 会访问到继承的属性,但不会访问到prototype上的属性
Object.keys(b).forEach(element => {
    console.log(element)   
});

// 只访问自身属性就要用hasOwnProperty(同上)
for(let i in b){
    if(b.hasOwnProperty(i)){
        console.log(i);
    }
}