import api from './index';

const authApi = {
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

    async register(userData) {
        try {
            return await api.post('/auth/sign_up', userData);
        } catch (error) {
            console.log("注册错误：", error.status);
            switch (error.status) {
                case 401:
                case 404: {
                    throw ('注册失败');
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
    }
};

export default authApi;