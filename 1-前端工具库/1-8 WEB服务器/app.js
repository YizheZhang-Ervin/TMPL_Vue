const querystring = require("querystring");

// 服务器应用代码
let serverHandler =(req,res)=>{
    let method = req.method;
    let url = req.url;
    let path = url.split("?")[0];
    let query = querystring.parse(url.split("?")[1]);

    res.setHeader("Content-Type","application/json");
    const responseData = {
        method,url,path,query
    };
    if(method==="GET"){
        res.end(JSON.stringify(responseData));
    }
    if(method==="POST"){
        let postData = "";
        req.on("data",chunk=>{
            postData+= chunk.toString();
        })
        req.on("end",()=>{
            responseData.postData = postData;
            res.end(JSON.stringify(responseData));
        })
        
    }
}

module.exports = serverHandler;