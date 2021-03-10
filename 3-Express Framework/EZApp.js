let http = require("http");
let path = require("path");
let fs = require("fs");

class EZApp {
    constructor(){
        // 服务器
        this.server = http.createServer();
        // 响应方法
        this.reqEvent = {};
        // 静态目录
        this.staticDir="/static"
        // 服务器请求
        this.server.on("request",(req,res)=>{
            let pathObj = path.parse(req.url);
            let resState = false;
            // 正则路径匹配
            for(let key in this.reqEvent){
                // 是否响应结束
                let regStr = key;
                let reg = new RegExp(regStr,'igs');
                if(reg.test(req.url)){
                    res.render = render;
                    req.pathObj = pathObj;
                    res.setHeader("Content-Type","text/html;charset=utf-8");
                    this.reqEvent[key](req,res);
                    resState = true;
                    break;
                }
            }

            // 不用正则
            // if(pathObj.dir in this.reqEvent){
            //     res.render = render;
            //     req.pathObj = pathObj;
            //     res.setHeader("Content-Type","text/html;charset=utf-8");
            //     this.reqEvent[pathObj.dir](req,res);
            // }
            if(!resState){
                if(pathObj.dir==this.staticDir){
                    res.setHeader("Content-Type",this.getContentType(pathObj.ext));
                    let rs = fs.createReadStream("./static/"+pathObj.base);
                    rs.pipe(res);
                }else{
                    res.setHeader("Content-Type","text/html;charset=utf-8");
                    res.end("<h1>404 NOT FOUND</h1>");
                }
            }
        })
    }

    on(url,fn){
        this.reqEvent[url] = fn;
    }

    run(port,callback){
        this.server.listen(port,callback);
    }

    getContentType(extName){
        switch(extName){
            case ".jpg":
                return "image/jpeg";
            case ".html":
                return "text/html;charset=utf-8";
            case ".jpg":
                return "text/javascript;charset=utf-8";
            case ".json":
                return "text/json;charset=utf-8";
            case ".gif":
                return "image/gif";
            case ".css":
                return "text/css";
            case ".png":
                return "image/png";
        }
    }
}

// 根据模板渲染页面
function render(options,path){
    fs.readFile(path,{encoding:"utf-8",flag:"r"},(err,data)=>{
        if(err){
            console.log(err);
        }else{
            // 替换循环{% for %}
            data = replaceArr(data,options);
            // 替换{{}}
            data = replaceVar(data,options);
            
            this.end(data);
        }
    })
}

// 替换{{}}
function replaceVar(data,options){
    let reg = /\{\{(.*?)\}\}/igs;
    let result;
    while(result = reg.exec(data)){
        let strKey = result[1].trim();
        let strValue = eval(`options.${strKey}`);
        data = data.replace(result[0],strValue);
    }
    return data;
}

// 替换{%for {list} %}{%endfor%}
function replaceArr(data,options){
    let result;
    let reg = /\{\%for \{(.*?)\} \%\}(.*?)\{\%endfor\%\}/igs;
    while(result = reg.exec(data)){
        let strKey = result[1].trim();
        let strValueArr = options[strKey];
        let listStr = "";
        strValueArr.forEach((item,i) => {
            listStr = listStr + replaceVar(result[2],{"item":item})
        });
        data = data.replace(result[0],listStr);
    }
    return data;
}

module.exports = EZApp;