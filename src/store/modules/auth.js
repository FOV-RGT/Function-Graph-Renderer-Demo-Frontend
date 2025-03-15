

export default {
    // 指定命名空间，避免与其他模块的状态冲突
    namespaced: true,
    
    // 状态定义
    state: {
        token: localStorage.getItem('token') || null,   // 认证令牌，优先从本地存储获取
        // token: null,
        isAuthenticated: !!localStorage.getItem('token'), // 是否已认证的标志
        // isAuthenticated: false,
        // 以下信息暂时用不到
        nickname: null,
        email: null,
        username: null
    },
    
    getters: {
        // 获取用户是否已认证
        isAuthenticated: state => state.isAuthenticated,
        // 获取完整的用户信息对象
        userInfo: state => Object.freeze({
            nickname: state.nickname,
            email: state.email,
            username: state.username
        }),
        // 获取显示名称（优先使用昵称）
        displayName: state => state.nickname || state.username || null,
    },
    
    // 修改状态的方法
    mutations: {
        setUser(state, data) {
            const nickname = data.nickname || "长期素食";
            const email = data.email || "未知邮箱";
            const username = data.username || "未知用户名";
            state.nickname = nickname;
            state.email = email;
            state.username = username;
        },
        
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
        
        logout(state) {
            state.nickname = null;
            state.token = null;
            state.isAuthenticated = false;
            // 清除本地存储的令牌
            localStorage.removeItem('token');
        }
    },
    
    actions: {
        
    }
};