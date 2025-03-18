import authApi from '../api/auth';
import fnApi from '../api/function';
import store from '../store';
import { sortData } from '../assets/utils/componentUtils';



export async function initUserData(needNewData = true, options = { is2D: true }) {
    try {
        if (!store.state.auth.isAuthenticated) {
            throw new Error('未登录');
        }
        // 获取用户信息
        const authRes = await authApi.getUserInfo();
        const info = authRes.imformation;
        store.commit('auth/setUser', info);
        // 获取函数数据
        if (needNewData) {
            const fnRes = await fnApi.getHistoricalData();
            const fnData = sortData(fnRes.mathdatas);
            const latestData = fnData.length > 0 ? fnData[fnData.length - 1] : [];
            // 更新数据
            const payload = {
                data: latestData,
                is2D: options.is2D,
                needUpload: false
            };
            store.commit('syncData', payload);
        }
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

export async function login(credentials, needNewData, options = { is2D: true }) {
    try {
        const loginRes = await authApi.login(credentials);
        store.commit('auth/setToken', loginRes.token);
        // 登录后获取完整数据
        return await initUserData(needNewData, options);
    } catch (error) {
        const { head, messages } = error;
        return {
            success: false,
            head,
            messages
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
        data = data.reduceRight((acc, item) => {
            acc.push({
                fn: item.fn,
                color: item.color,
                nSamples: item.nSamples,
                visible: item.visible,
                dimension: item.dimension,
                graphType: item.graphType,
                closed: item.closed
            });
            return acc;
        }, []);
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
        let fnData = res.mathdatas;
        if (res.mathdatas?.length > 2) fnData.sort((a, b) => b.id - a.id);
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

export async function delectFunctionData(id) {
    try {
        await fnApi.delectFunctionData(id);
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

export async function register(credentials) {
    try {
        await authApi.register(credentials);
        return {
            success: true
        };
    } catch (error) {
        const { head, messages } = error;
        return {
            success: false,
            head,
            messages
        };
    }
}

export async function getChangeData(currentPage, pageSize) {
    try {
        const res = await fnApi.getChangeData(currentPage, pageSize);
        let fnData = res.mathdatas;
        if (res.mathdatas?.length > 2) fnData.sort((a, b) => b.id - a.id);
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

export async function uploadChangeData(data) {
    try {
        const uploadData = JSON.stringify([{
            fn: data.fn,
            color: data.color,
            nSamples: data.nSamples,
            visible: data.visible,
            dimension: data.dimension,
            graphType: data.graphType,
            closed: data.closed
        }]);
        await fnApi.uploadChangeData(uploadData);
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