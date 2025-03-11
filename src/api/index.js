/**
 * API请求基础配置模块
 * 配置Axios实例、拦截器和通用错误处理
 */
import axios from 'axios';

/**
 * 创建Axios实例并配置基本参数
 */
const api = axios.create({
    baseURL: 'http://localhost:5005',
    timeout: 10000,                   // 请求超时时间：10秒
    headers: {
        'Content-Type': 'application/json' // 默认请求头设置
    }
});

/**
 * 请求拦截器
 * 在发送请求前，添加令牌到请求头
 */
api.interceptors.request.use(config => {
    // 从本地存储中获取认证令牌
    console.log("拦截请求：", config);
    const token = localStorage.getItem('token');
    // 如果令牌存在，添加到请求头
    if (token) {
        console.log("添加令牌：", token);
        config.headers['token'] = token;
    }
    console.log("发送请求：", config);
    return config;
}, error => {
    // 处理请求错误
    console.log("请求错误：", error);
    return Promise.reject(error);
});

/**
 * 响应拦截器
 * 处理响应数据和错误
 */
api.interceptors.response.use(res => {
    // 直接返回响应中的数据部分
    console.log("拦截响应：", res);
    return res.data.data;
}, error => {
    // 传递错误到调用者
    console.log("响应错误：", error);
    return Promise.reject(error);
});

export default api;