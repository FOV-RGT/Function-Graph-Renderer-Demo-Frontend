import { authApi } from '../../api/auth';


/**
 * 认证模块Vuex存储
 * 管理用户认证状态、令牌和相关操作
 */
export default {
    // 指定命名空间，避免与其他模块的状态冲突
    namespaced: true,
    
    // 状态定义
    state: {
        nickname: null,                                     // 当前用户信息
        // token: localStorage.getItem('token') || null,   // 认证令牌，优先从本地存储获取
        token: null,
        // isAuthenticated: !!localStorage.getItem('token') // 是否已认证的标志
        isAuthenticated: false,
        email: null,
        username: null
    },
    
    // 修改状态的方法
    mutations: {
        /**
         * 设置用户信息
         * @param {Object} state - 当前状态
         * @param {Object} user - 用户信息对象
         */
        setUser(state, data) {
            const nickname = !!data ? data.imformation.nickname || "长期素食" : null;
            const email = !!data ? data.imformation.email || "未知邮箱" : null;
            const username = !!data ? data.imformation.username || "未知用户名" : null;
            state.nickname = nickname;
            state.email = email;
            state.username = username;
        },
        
        /**
         * 设置认证令牌
         * @param {Object} state - 当前状态
         * @param {string} token - 认证令牌
         */
        setToken(state, token) {
            state.token = token;
            state.isAuthenticated = !!token;
            // 持久化存储令牌
            if (token) {
                console.log("存储令牌：", token);
                localStorage.setItem('token', token);
            } else {
                localStorage.removeItem('token');
            }
        },
        
        /**
         * 注销用户
         * @param {Object} state - 当前状态
         */
        logout(state) {
            state.nickname = null;
            state.token = null;
            state.isAuthenticated = false;
            // 清除本地存储的令牌
            localStorage.removeItem('token');
        }
    },
    
    // 异步操作方法
    actions: {        
        /**
         * 用户注册
         * @param {Object} context - 上下文对象，包含commit等方法
         * @param {Object} userData - 用户注册数据
         * @returns {Promise} 注册结果
         */
        async register({ commit }, userData) {
            try {
                // 调用注册API
                const res = await authApi.register(userData);
                // 更新状态
                commit('setToken', res.token);
                commit('setUser', res.user);
                return res;
            } catch (error) {
                throw(error);
            }
        },
    }
};