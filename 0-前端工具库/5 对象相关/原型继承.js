// 实现一个原型继承

// 1. 原型链继承
// 优点：能通过instanceOf和isPrototypeOf的检测
// 注意：给原型添加方法的语句一定要放在原型替换SubType.prototype = new SuperType();之后
// 缺点:(1)SuperType中的属性(不是方法)也变成了SubType的prototype中的公用属性，
//      如上面例子中的color属性，可以同时被instance1和instance2修改
//      (2)创建子类型的时候，不能像父类型的构造函数中传递参数。
let inherit1 = ()=>{
    function SuperType(){
        this.colors = ["red", "blue", "green"];
    }
    SuperType.prototype.Fun = function(){ 
    };
    function SubType(){
    }
    // test
    SubType.prototype = new SuperType();
    var instance1 = new SubType();
    instance1.colors.push("black");
    console.log(instance1.colors); //"red,blue,green,black"
    var instance2 = new SubType();
    console.log(instance2.colors); //"red,blue,green,black"
}
// inherit1();

// 2.借用构造函数
// 原理：在子类型构造函数的内部调用超类型构造函数
// 优点：解决了superType中的私有属性变公有的问题，可以传递参数
// 缺点：方法在函数中定义，无法得到复用
let inherit2 = ()=>{
    function SuperType(arr){
        this.arr = arr;
    }
    function SubType(arr=[1],str="abc"){
        //继承了SuperType，同时还传递了参数
        SuperType.call(this, arr);
        //实例属性
        this.str = str;
    }
    var instance = new SubType();
    instance.arr.push(2);
    console.log(instance.arr); // [1,2];
    console.log(instance.str); // abc
    var instance2 = new SubType();
    console.log(instance2.arr); // [1];
    console.log(instance2.str); // abc
}
// inherit2();

// 3. 组合继承
// 优点：继承前两者的优点，能通过instanceOf和isPrototypeOf的检测
// 缺点：两次调用父构造器函数，浪费内存。
let inherit3 = () =>{
    function SuperType(name){
        this.name = name;
        this.colors = ["red", "blue", "green"];
    }
    SuperType.prototype.sayName = function(){
        console.log(this.name);
    };
    function SubType(name, age){
        SuperType.call(this, name);//借用构造函数继承属性，二次调用
        this.age = age;
    }
    SubType.prototype = new SuperType();//借用原型链继承方法，一次调用
    SubType.prototype.constructor = SubType;
    SubType.prototype.sayAge = function(){
        console.log(this.age);
    };
    var instance1 = new SubType("Nicholas", 29);
    instance1.colors.push("black");
    console.log(instance1.colors); //"red,blue,green,black"
    instance1.sayName(); //"Nicholas";
    instance1.sayAge(); //29
    var instance2 = new SubType("Greg", 27);
    console.log(instance2.colors); //"red,blue,green"
    instance2.sayName(); //"Greg";
    instance2.sayAge(); //27
}
// inherit3();


// 4. 原型式继承
// 使用场合：没必要构建构造函数，仅仅是想模拟一个对象的时候
let inherit4 = () =>{
    function object(o){
        function F(){}
        F.prototype = o;
        return new F();
    }
    let i = [1,2,3]
    console.log(object(i));
}
// inherit4();


// 5. 寄生继承
// 缺点：方法在函数中定义，无法得到复用
let inherit5 = () =>{
    function object(o){
        function F(){}
        F.prototype = o;
        return new F();
    }
    function createAnother(original){
        var clone = object(original); //通过调用函数创建一个新对象
        clone.sayHi = function(){ //以某种方式来增强这个对象
            console.log("hi");
        };
        return clone; //返回这个对象
    }
    var person = {
        name: "Nicholas",
        friends: ["Shelby", "Court", "Van"]
    };
    var anotherPerson = createAnother(person);
    anotherPerson.sayHi(); //"hi"
}
// inherit5();


// 6. 寄生组合继承
let inherit6 = () =>{
    function object(o){
        function F(){}
        F.prototype = o;
        return new F();
    }
    function inheritPrototype(subType, superType){
        var prototype = object(superType.prototype); //创建对象
        prototype.constructor = subType; //增强对象
        subType.prototype = prototype; //指定对象
    }
    function SuperType(name){
        this.name = name;
        this.colors = ["red", "blue", "green"];
    }
    SuperType.prototype.sayName = function(){
        console.log(this.name);
    };
    function SubType(name, age){
        SuperType.call(this, name);
        this.age = age;
    }
    inheritPrototype(SubType, SuperType);//实现继承
    SubType.prototype.sayAge = function(){
        console.log(this.age);
    };

    let instance = new SubType("abc",99);
    instance.sayAge();
    instance.sayName();
}
inherit6();