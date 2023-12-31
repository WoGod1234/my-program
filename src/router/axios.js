import axios from "axios";
import NProgress from "nprogress"; // progress bar
import errorCode from "@/const/errorCode";
import {
  Message,
  MessageBox
} from "element-ui";
import "nprogress/nprogress.css";
import qs from "qs";
// import store from "@/store"; // progress bar style
axios.defaults.timeout = 30000;
// 返回其他状态吗
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500; // 默认的
};
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
// NProgress Configuration
NProgress.configure({
  showSpinner: false
});

// HTTPrequest拦截
axios.interceptors.request.use(
  config => {
    NProgress.start(); // start progress bar
    // const isToken = (config.headers || {}).isToken === false;
    // let token = store.getters.access_token;
    // 用api转发后端接口
    // if (!config.url.includes('http://') && !config.url.includes('https://')) {
    //   config.url = '/api' + config.url
    // }
    // if (token && !isToken) {
    //   config.headers["Authorization"] = "Bearer " + token; // token
    // }
    // headers中配置serialize为true开启序列化
    if (config.method === "post" && config.headers.serialize) {
      config.data = serialize(config.data);
      delete config.data.serialize;
    }

    // 处理get 请求的数组 springmvc 可以处理
    if (config.method === "get") {
      config.paramsSerializer = function (params) {
        return qs.stringify(params, {
          arrayFormat: "repeat"
        });
      };
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// HTTPresponse拦截
axios.interceptors.response.use(
  res => {
    NProgress.done();
    const status = Number(res.status) || 200;
    const message = res.data.msg || errorCode[status] || errorCode["default"];

    // 后台定义 424 针对令牌过去的特殊响应码
    if (status === 424) {
      MessageBox.confirm("令牌状态已过期，请点击重新登录", "系统提示", {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          store.dispatch("LogOut").then(() => {
            // 刷新登录页面，避免多次弹框
            window.location.reload();
          });
        })
        .catch(() => {});
      return;
    }

    if (res.data.type == 'application/json') { // 下载文件失败
      let temp = {}
      let reader = new FileReader(); // 创建读取文件对象
      reader.readAsText(res.data, 'utf-8'); // 设置读取的数据以及返回的数据类型为utf-8
      reader.addEventListener("loadend", function () { // 
        temp = JSON.parse(reader.result); // 返回的数据
      });
      setTimeout(() => {
        Message({
          message: temp.msg,
          type: "error"
        });
      }, 100);
      return Promise.reject(new Error(temp.msg));
    }

    if (status !== 200 || res.data.code === 1) {
      Message({
        message: message,
        type: "error"
      });
      // return Promise.reject(new Error(message));
    }

    return res;
  },
  error => {
    NProgress.done();
    return Promise.reject(new Error(error));
  }
);

export default axios;
