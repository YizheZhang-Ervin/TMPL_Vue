function template(pattern, data) {
    let len = pattern.length;
    // 队列存放用于替换的数据
    let res = [];
    // 循环模板字符串
    for (let i = 0; i < len; i++) {
        // 找到美元符号
        if (pattern[i] === '$') {
            // 跳过左花括号
            if (pattern[i + 1] !== '{') continue;
            // 记录变量名的开始
            let t = i;
            // 找到右花括号
            while (pattern[i] !== '}') {
                i++;
            }
            // 变量名
            let tmp = pattern.slice(t + 2, i);
            // 把代替用的数据加入队列
            res.push(data[tmp]);
        }
    }
    let result = '';
    // 循环模板字符串
    for (let m = 0; m < len; m++) {
        // 非美元符号直接加入最终结果
        if (pattern[m] !== '$') {
            result += pattern[m];
        // 是美元符号
        } else {
            // 找到右大括号
            while (pattern[m] !== '}') {
                m++;
            }
            // 把${...}都替换为队列中第一个
            result += res.shift();
        }
    }
    console.log(result);
    return result;
}

template("${name} xx ${age} xx", { name: "Jim", age: 20 });
template('yy ${tgy} yy ${gender}', { tgy: 'tgy', gender: 'man' })