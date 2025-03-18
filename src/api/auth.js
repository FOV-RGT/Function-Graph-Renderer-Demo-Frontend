import api from './index';
import axios from 'axios';

const authApi = {
    async login(credentials) {
        try {
            return await api.post('/auth/signIn', credentials);
        } catch (error) {
            console.log("登录错误：", error.status);
            const messages = error.response.data.errors;
            switch (error.status) {
                case 401:
                case 404: {
                    const head = '登录失败：';
                    const data = {
                        head,
                        messages
                    }
                    throw (data);
                }
                case 400: {
                    const head = '请求错误：';
                    const data = {
                        head,
                        messages
                    }
                    throw (data);
                }
                case 500: {
                    const head = '服务器错误：';
                    const data = {
                        head,
                        messages
                    }
                    throw (data);
                }
                default: {
                    const head = '未知错误：';
                    const data = {
                        head,
                        messages
                    }
                    throw (data);
                }
            }
        }
    },

    async register(userData) {
        try {
            return await api.post('/auth/sign_up', userData);
        } catch (error) {
            console.log("注册错误：", error.status);
            const messages = error.response.data.errors;
            switch (error.status) {
                case 401:
                case 404: {
                    const head = '注册失败：';
                    const data = {
                        head,
                        messages
                    }
                    throw (data);
                }
                case 400: {
                    const head = '请求错误：';
                    const data = {
                        head,
                        messages
                    }
                    throw (data);
                }
                case 500: {
                    const head = '服务器错误：';
                    const data = {
                        head,
                        messages
                    }
                    throw (data);
                }
                default: {
                    const head = '未知错误：';
                    const data = {
                        head,
                        messages
                    }
                    throw (data);
                }
            }
        }
    },

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
    async updateUserInfo(data) {
        try {
            return await api.put('/users/account', data);
        } catch (error) {
            console.log("更新用户信息错误：", error.status);
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
    async getAvatarUrl() {
        try {
            return await api.get('/avatar_direct');
        } catch (error) {
            console.log("获取上传链接错误：", error.status);
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
    async uploadAvatar(data) {
        try {
            return await axios.post('https://kz-avatar.oss-cn-guangzhou.aliyuncs.com', data);
        } catch (error) {
            console.log("上传头像错误：", error.status);
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
    }
};

export default authApi;