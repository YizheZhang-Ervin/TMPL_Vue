import axios from "axios";
import store from "@/store/";
import qs from "qs";
import router from "@/router/index";
import { serialize } from "@/util/util";
import { getToken } from "@/util/auth";
import { Message, Loading } from "element-ui";

import baseUrl from "@/config/env";
axios.defaults.baseURL = baseUrl;
var loadingInstance = null;
axios.defaults.timeout = 50000;
//返回其他状态吗
axios.defaults.validateStatus = function(status) {
  return status >= 200 && status <= 500; // 默认的
};
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  config => {
    loadingInstance = Loading.service({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    });
    const meta = config.meta || {};
    const isToken = meta.isToken;
    if (!isToken) {
      config.headers["Authorization"] = `Bearer ${getToken()}`;
    }
    //headers中配置serialize为true开启序列化
    // if (config.method === 'post' && meta.isSerialize === true) {
    if (config.method === "post" && !meta.isSerialize) {
      config.data = qs.stringify({ ...config.data });
    }
    return config;
  },
  error => {
    loadingInstance.close();
    return Promise.reject(error);
  }
);
//HTTPresponse拦截
axios.interceptors.response.use(
  res => {
    loadingInstance.close();
    const status = res.data.code || 200;
    const message = res.data.message || "未知错误";
    //如果是401则跳转到登录页面
    // if (status === 401) store.dispatch('FedLogOut').then(() => router.push({path: '/login'}));
    if (status === 2000) router.push({ path: "/login" });
    // 如果请求为非200否者默认统一处理
    if (status !== 200) {
      Message({
        message: message,
        type: "error"
      });
      return Promise.reject(new Error(message));
    }
    return res.data.result;
  },
  error => {
    loadingInstance.close();
    return Promise.reject(new Error(error));
  }
);

export default axios;