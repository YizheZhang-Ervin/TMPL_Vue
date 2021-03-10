let EZApp = require("./EZApp");

let app = new EZApp();

// url访问静态文件的路径
app.staticDir = "/staticfiles"

app.on('^/$',(req,res)=>{
    res.setHeader("Content-Type","text/html;charset=utf-8");
    // 相对于http://127.0.0.1:5000/staticfiles/ez.png
    // 隐藏真实静态文件存储的地址
    res.end(`<h1>HOMEPAGE</h1><img src="./staticfiles/ez.png"/>`);
})

app.on('/dynamic/\\d+',(req,res)=>{
    let objs = [
        {
            key:1,value:1,other:[{a:11},{a:22},{a:33}]
        },
        {
            key:2,value:2,other:[{a:44},{a:55},{a:66}]
        }
    ];
    let index = req.pathObj.base;
    // 动态渲染需要用真实文件存储地址
    res.render(objs[index],"./static/index.html")
})

app.run(5000,()=>{
    console.log("Run on http://127.0.0.1:5000");
})