

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
        nickname: localStorage.getItem('nickname') || null,
        email: localStorage.getItem('email') || null,
        username: localStorage.getItem('username') || null
    },
    
    getters: {
        // 获取用户是否已认证
        isAuthenticated: state => state.isAuthenticated,
        // 获取完整的用户信息对象
        userInfo: state => Object.freeze({
            nickname: state.nickname || '',
            email: state.email || '',
            username: state.username || ''
        }),
        // 获取显示名称（优先使用昵称）
        displayName: state => state.nickname || state.username || null,
    },
    
    // 修改状态的方法
    mutations: {
        setUser(state, data) {
            const nickname = data?.nickname || '';
            const email = data?.email || '';
            const username = data?.username || '';
            state.nickname = nickname;
            state.email = email;
            state.username = username;
            localStorage.setItem('nickname', nickname);
            localStorage.setItem('email', email);
            localStorage.setItem('username', username);
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
            state.email = null;
            state.username = null;
            state.isAuthenticated = false;
            localStorage.removeItem('nickname');
            localStorage.removeItem('email');
            localStorage.removeItem('username');
            localStorage.removeItem('token');
        }
    },
    
    actions: {
        
    }
};