// JSONP、CORS

// JSONP
// html中<script src="http://xxx.xxx?key=value&callback=handleCallback" type='text/javascript'></script>
// 回调执行函数
function handleCallback(res) {
    console.log(JSON.stringify(res));
}

// JSONP - vue
this.$http.jsonp('http://xxx.xxx', {
    params: {},
    jsonp: 'handleCallback'
}).then((res) => {
    console.log(res); 
})