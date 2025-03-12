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
        try {
            return await api.post('/auth/signIn', credentials);
        } catch (error) {
            console.log("登录错误：", error.status);
            switch (error.status) {
                case 401:
                case 404: {
                    throw ('用户名或密码错误');
                }
                case 400: {
                    throw ('请求错误');
                }
                case 500: {
                    throw ('服务器错误');
                }
                default: {
                    throw (`未知错误: ${error.response.status}`);
                }
            }
        }
    },

    /**
     * 用户注册
     * @param {Object} userData - 包含用户信息的注册数据
     * @returns {Promise} 注册请求的Promise对象
     */
    async register(userData) {
        try {
            return await api.post('/auth/auth/sign_up', userData);
        } catch (error) {
            throw (`未知错误: ${error.response.status}`);
        }
    },

    /**
     * 获取当前用户信息
     * 要求用户已经登录，并在请求头中包含有效的认证令牌
     * @returns {Promise} 获取用户信息的Promise对象
     */
    async getUserInfo() {
        try {
            return await api.get('/users/me');
        } catch (error) {
            console.log("获取用户信息错误：", error.status);
            switch (error.status) {
                case 401:
                case 404: {
                    throw ('未授权');
                }
                case 400: {
                    throw ('请求错误');
                }
                case 500: {
                    throw ('服务器错误');
                }
                default: {
                    throw (`未知错误: ${error.response.status}`);
                }
            }
        }
    },
};