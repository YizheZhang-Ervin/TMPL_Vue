// form序列化
let serialize = (form)=>{
    let rst = [];
    form.forEach(ele=>{
        rst.push(`${encodeURIComponent(ele.name)}=${encodeURIComponent(ele.value)}`);
    })
    return rst.join(" & ");
}
let form=[{name:"a",value:1},{name:"b",value:2},{name:"c",value:3}];
console.log(serialize(form));