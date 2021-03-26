const request = (params,url) => {
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: url,
            success: (result) => {
                //加入延时机制 防止promise里面有同步函数 导致resolve先执行 then还没注册上函数
                setTimeout(function () {
                    resolve(result);
                }, 0);
            },
            fail: (err) => {
                reject(err);
            }
        })
    })
}