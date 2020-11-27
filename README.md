# TMPL_Vue

一.Vue基础  
1. 概述:JS框架、简化Dom操作、响应式数据驱动  
  
2. 导入  
```  
<!-- 开发环境版本，包含了有帮助的命令行警告 -->  
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>  
<!-- 生产环境版本，优化了尺寸和速度 -->  
<script src="https://cdn.jsdelivr.net/npm/vue"></script>    
```  
  
3. 使用  
3.1模板插值  
{{obj.attr}}  
{{arr[index]}}    
  
3.2挂载点el  
会选择命中的元素及其内部后代元素  
建议用id选择器但其他也行  
可以用其他双标签但不能用html和body  
  
3.3数据对象data  
渲染数据遵循js语法，如对象、数组语法  
  
3.4事件方法methods  
可使用this获取data中的数据  
  
二.本地应用  
1. 内容绑定/事件绑定  
v-text=""支持表达式,解析为文本  
v-html=""设置innerHTML，可解析为标签  
v-on:event=""绑定事件(如click/mouseenter/dblclick),或使用@事件    
  
2. 显示切换/属性绑定  
v-show=""切换元素显示隐藏(如广告/遮罩层),会解析为布尔值(true显示false隐藏)    
v-if=""根据表达式真假切换元素显示和隐藏,会对dom增删(true添加false移出)  
v-bind:attr设置元素属性,可简写:attr  
  
3. 列表循环，表单元素绑定  
v-for根据数据生成列表结构,响应式  
v-on自定义参数/事件修饰符(.事件)  
v-model获取设置获取表单元素的值(双向数据绑定，数据与表单元素值同步更新)  
  
4. 记事本  
列表结构vfor  
用户输入vmodel  
新增数据von  
删除von  
统计vtext  
清空von  
隐藏vshow/vif  
  
三.网络应用
1. axios网络请求库  
axios.get().then()  
axios.post().then()  
  
2. 天气应用  
回车查询/点击查询von  
查询数据axios  
渲染数据vfor  
  
四.综合应用  
歌曲搜索:回车von查询axios渲染vfor  
歌曲播放:点击播放von地址获取axios地址设置vbind  
歌曲封面:点击播放von封面获取axios封面设置vbind  
歌曲评论:点击播放von评论获取axios评论渲染vfor  
播放动画:音乐播放von音乐暂停von操纵类名vbind  
mv播放:图标显示vif地址获取axios遮罩层vshow&von地址设置vbind  
