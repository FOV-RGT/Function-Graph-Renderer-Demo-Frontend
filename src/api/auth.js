/**
 * 认证相关API模块
 * 提供用户认证、注册和账户管理的API接口
 */
import api from './index';

/**
 * 认证API对象，包含所有认证相关的API方法
 */
export const authApi = {
    /**
     * 用户登录
     * @param {Object} credentials - 包含用户名和密码的登录凭证
     * @returns {Promise} 登录请求的Promise对象
     */
    async login(credentials) {
        return await api.post('/auth/signIn', credentials);
    },

    /**
     * 用户注册
     * @param {Object} userData - 包含用户信息的注册数据
     * @returns {Promise} 注册请求的Promise对象
     */
    register(userData) {
        return api.post('/auth/auth/sign_up', userData);
    },

    /**
     * 获取当前用户信息
     * 要求用户已经登录，并在请求头中包含有效的认证令牌
     * @returns {Promise} 获取用户信息的Promise对象
     */
    getCurrentUser() {
        return api.get('/auth/me');
    },

    /**
     * 用户登出
     * 清除服务器端的会话信息
     * @returns {Promise} 登出请求的Promise对象
     */
    logout() {
        return api.post('/auth/logout');
    }
};