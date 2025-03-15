import authApi from '../api/auth';
import fnApi from '../api/function';
import store from '../store';
import { sortData } from '../assets/utils/componentUtils';



export async function initUserData(options = { is2D: true }) {
    try {
        if (!store.state.auth.isAuthenticated) {
            throw new Error('未登录');
        }
        // 获取用户信息
        const authRes = await authApi.getUserInfo();
        const info = authRes.imformation;
        store.commit('auth/setUser', info);
        // 获取函数数据
        const fnRes = await fnApi.getFunctionData();
        const fnData = sortData(fnRes.mathdatas);
        const latestData = fnData.length > 0 ? fnData[fnData.length - 1] : [];
        // 更新数据
        const payload = {
            data: latestData,
            is2D: options.is2D,
            needUpload: false
        };
        store.commit('syncData', payload);
        return {
            success: true
        };
    } catch (error) {
        store.commit('auth/setToken', null);
        return {
            success: false,
            error
        };
    }
}

export async function login(credentials, options = { is2D: true }) {
    try {
        const loginRes = await authApi.login(credentials);
        store.commit('auth/setToken', loginRes.token);
        // 登录后获取完整数据
        return await initUserData(options);
    } catch (error) {
        return {
            success: false,
            error
        };
    }
}

export async function updateUserInfo(info) {
    try {
        const res = await authApi.updateUserInfo(info);
        const resInfo = res.userinf;
        store.commit('auth/setUser', resInfo);
        return {
            success: true
        };
    } catch (error) {
        return {
            success: false,
            error
        };
    }
}

export async function uploadFunctionData(data) {
    if (!store.state.needUpload) {
        return {
            skip: true
        }
    }
    try {
        data = data.map(item => ({
            fn: item.fn,
            color: item.color,
            nSamples: item.nSamples,
            visible: item.visible,
            dimension: item.dimension,
        }));
        await fnApi.uploadFunctionData(data);
        return {
            success: true
        };
    } catch (error) {
        return {
            success: false,
            error
        };
    }
}

export async function getHistoricalData(currentPage) {
    try {
        const res = await fnApi.getHistoricalData(currentPage);
        const fnData = res.mathdatas.sort((a, b) => b.id - a.id);
        const pagination = res.pagination;
        const data = {
            fnData,
            pagination
        };
        return {
            success: true,
            data
        };
    } catch (error) {
        return {
            success: false,
            error
        };
    }
}