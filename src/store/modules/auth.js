

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
        username: localStorage.getItem('username') || null,
        avatarUrl: localStorage.getItem('avatarUrl') || null,
        userConfig: {
            chartType: 'linear',
            closed: false,
            range: null,
            dash: false,
            grid: true,
            zoomFactor: 0.5,
            moveFactor: 0.2,
            globalSamples: 2025,
            lockCameraFocus: false
        }
    },

    getters: {
        // 获取用户是否已认证
        isAuthenticated: state => state.isAuthenticated,
        // 获取完整的用户信息对象
        userInfo: state => Object.freeze({
            nickname: state.nickname || '',
            email: state.email || '',
            username: state.username || '',
            avatarUrl: state.avatarUrl || '/默认头像/默认头像.png',
            signature: state.signature || '千早爱音世界第一可爱',
        }),
        displayName: state => state.nickname || state.username || "千早爱音世界第一可爱",
        chartType: state => state.userConfig.chartType,
        closed: state => state.userConfig.closed,
        range: state => state.userConfig.range,
        dash: state => state.userConfig.dash,
        grid: state => state.userConfig.grid,
        zoomFactor: state => state.userConfig.zoomFactor,
        moveFactor: state => state.userConfig.moveFactor,
        globalSamples : state => state.userConfig.globalSamples,
        lockCameraFocus: state => state.userConfig.lockCameraFocus,
        remoteConfig: state => Object.freeze({
            chartType: state.userConfig.chartType,
            closed: state.userConfig.closed,
            range: state.userConfig.range,
            dash: state.userConfig.dash,
            grid: state.userConfig.grid,
            zoomFactor: state.userConfig.zoomFactor,
            moveFactor: state.userConfig.moveFactor,
            globalSamples: state.userConfig.globalSamples,
            lockCameraFocus: state.userConfig.lockCameraFocus
        })
    },

    // 修改状态的方法
    mutations: {
        setUser(state, data) {
            const nickname = data.nickname || '';
            const email = data.email || '';
            const username = data.username || '';
            const avatarUrl = data.avatarUrl || '';
            const signature = data.signature || '';
            state.nickname = nickname;
            state.email = email;
            state.username = username;
            state.avatarUrl = avatarUrl;
            state.signature = signature;
            localStorage.setItem('nickname', nickname);
            localStorage.setItem('email', email);
            localStorage.setItem('username', username);
            localStorage.setItem('avatarUrl', avatarUrl);
            localStorage.setItem('signature', signature);
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

        cleanState(state) {
            state.nickname = null;
            state.token = null;
            state.email = null;
            state.username = null;
            state.isAuthenticated = false;
            state.avatarUrl = null;
            localStorage.removeItem('nickname');
            localStorage.removeItem('email');
            localStorage.removeItem('username');
            localStorage.removeItem('token');
            localStorage.removeItem('avatarUrl');
        },

        updateUserConfig(state, config) {
            state.userConfig = config;
        },

        setUserAvatarUrl(state, avatarUrl) {
            state.avatarUrl = avatarUrl;
            localStorage.setItem('avatarUrl', avatarUrl);
        },

        updateGlobalSamples(state, samples) {
            state.userConfig.globalSamples = samples;
        }
    },
    
    actions: {
    }
};