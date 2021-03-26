// 普通ajax实现
let ajax =()=>{
    let xhr = new XMLHttpRequest();
    xhr.open("get","url",true);
    xhr.send("msg");
    xhr.onreadystatechange=()=>{
        if(xhr.readyState==4 && xhr.status==200){
            console.log(xhr.responseText);
        }
    }
}

// promise AJAX
var myNewAjax = function (url,data) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url);
        xhr.send(data);
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                var json = JSON.parse(xhr.responseText);
                resolve(json)
            } else if (xhr.readyState == 4 && xhr.status != 200) {
                reject('error');
            }
        }
    })
}