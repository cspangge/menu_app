import axios from 'axios';
import { Loading } from 'element-ui';

let loading; // https://element.eleme.cn/#/zh-CN/component/loading
// 请求合并只出现一次loading
// 当前正在请求的数量
let needLoadingRequestCount = 0;

// 开始加载特效
function startLoading () {
  if (needLoadingRequestCount === 0) {
    loading = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
      target: document.body
    });
  }
  needLoadingRequestCount++;
}

// 结束加载特效
function endLoading () {
  needLoadingRequestCount--;
  if (needLoadingRequestCount <= 0) {
    loading.close();
  }
}

const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 20000,
  headers: {
    // 'X-Requested-With': 'XMLHttpRequest', // 会导致跨域
    /*
    跨域： 总结就是一句话，下面的字段别乱加
    （1) 请求方法是以下三种方法之一：HEAD   GET   POST
    （2）HTTP的头信息不超出以下几种字段：
      Accept
      Accept-Language
      Content-Language
      Last-Event-ID
      Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain
     */
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  crossDomain: true, // 好像新版本axios没有这个配置了
  withCredentials: false, // default
  responseType: 'json', // default
  responseEncoding: 'utf8', // default
});

// Add a request interceptor
instance.interceptors.request.use(
  config => {
    // Do something before request is sent
    // 在这里加入cookie检查来确保页面请求的时候用户是合法有效的登录状态
    startLoading();
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    endLoading();
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    endLoading();
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
          console.log('Bad Request');
          break;
        case 401:
          console.log('Unauthorized');
          break;
        case 403:
          console.log('Forbidden');
          break;
        case 404:
          console.log('Not Found');
          break;
        case 405:
          console.log('Method Not Allowed');
          break;
        case 406:
          console.log('Not Acceptable');
          break;
        case 408:
          console.log('Request Timeout');
          break;
        case 500:
          console.log('Internal Server Error');
          break;
        case 501:
          console.log('Not Implemented');
          break;
        case 502:
          console.log('Bad Gateway');
          break;
        case 503:
          console.log('Service Unavailable');
          break;
        case 504:
          console.log('Gateway Time-out');
          break;
        case 505:
          console.log('HTTP Version not supported');
          break;
        default:
          console.log('Unexpected Error');
          break;
      }
      return Promise.reject(error);
    }
  }
);

export default instance;
