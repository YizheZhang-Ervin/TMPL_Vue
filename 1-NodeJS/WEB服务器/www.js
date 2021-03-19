// 服务器相关代码
const http = require("http");
const serverHandler = require("./app");

const PORT = 5000;
const server = http.createServer(serverHandler);
server.listen(PORT,()=>{
    console.log("server running at http://127.0.0.1:5000/")
})