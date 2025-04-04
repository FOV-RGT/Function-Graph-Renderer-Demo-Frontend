import authApi from '../assets/api/auth';
import fnApi from '../assets/api/function';
import store from '../store';
import { sortData, generateRandomHarmoniousColor } from '../assets/utils/componentUtils';



export async function initUserData(needNewData = true) {
    try {
        if (!store.state.auth.isAuthenticated) {
            throw new Error('未登录');
        }
        // 获取用户信息
        const authRes = await authApi.getUserInfo();
        const info = authRes.imformation;
        store.commit('auth/setUser', info);
        const configRes = await authApi.getUserConfig();
        store.commit('auth/updateUserConfig', configRes.config);
        // 获取函数数据
        if (needNewData) {
            await getWorkSpace2DData();
            await getWorkSpace3DData();
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

export async function login(credentials, needNewData) {
    try {
        const loginRes = await authApi.login(credentials);
        store.commit('auth/setToken', loginRes.token);
        // 登录后获取完整数据
        return await initUserData(needNewData);
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
        await authApi.updateUserInfo(info);
        const authRes = await authApi.getUserInfo();
        store.commit('auth/setUser', authRes.imformation);
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

export async function uploadFunctionData(data, dimension) {
    if (!store.state.needUpload) {
        return {
            skip: true
        }
    }
    try {
        if (dimension === 2) {
            data = data.reduceRight((acc, item) => {
                acc.push({
                    fn: item.fn,
                    color: item.color,
                    nSamples: item.nSamples,
                    visible: item.visible,
                    dimension: 2,
                    graphType: item.graphType,
                    closed: item.closed,
                    range: item.range
                });
                return acc;
            }, []);
        } else if (dimension === 3) {
            data = data.reduceRight((acc, item) => {
                acc.push({
                    fn: item.fn,
                    color: item.color || generateRandomHarmoniousColor(),
                    visible: item.visible,
                    dimension: 3,
                });
                return acc;
            }, []);
        }
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

export async function getChangeData(currentPage, dimension) {
    try {
        const res = await fnApi.getChangeData(currentPage, dimension);
        let fnData = res.mathdatas || [];
        if (res.mathdatas?.length > 2) fnData.sort((a, b) => b.id - a.id);
        const pagination = res.pagination || {
            "currentPage": 1,
            "pageSize": 4,
            "totalRecords": 0,
            "totalPages": 1
        };
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
            closed: data.closed,
            range: data.range
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

export async function getAvatarUrl() {
    try {
        const res = await authApi.getAvatarUrl();
        return {
            success: true,
            res
        };
    } catch (error) {
        return {
            success: false,
            error
        };
    }
}

export async function uploadAvatar(res, file) {
    try {
        const formData = new FormData();
        formData.append('key', res.key);
        formData.append('policy', res.policy);
        formData.append('OSSAccessKeyId', res.accessid);
        formData.append('signature', res.signature);
        formData.append('file', file);
        await authApi.uploadAvatar(formData);
        store.commit('auth/setUserAvatarUrl', res.url);
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

export async function uploadUserConfig(config) {
    try {
        await authApi.uploadUserConfig(config);
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

export async function uploadAvatarUrl(url) {
    try {
        await authApi.uploadAvatarUrl(url);
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

async function getWorkSpace2DData() {
    const fnRes = await fnApi.getWorkSpace2DData();
    const fnData = sortData(fnRes.mathdatas);
    const latestData = fnData.length > 0 ? fnData[fnData.length - 1] : [];
    // 更新数据
    const payload = {
        data: latestData,
        is2D: true,
        needUpload: false
    };
    store.commit('syncData', payload);
}

async function getWorkSpace3DData() {
    const fnRes = await fnApi.getWorkSpace3DData();
    const fnData = sortData(fnRes.mathdatas);
    const latestData = fnData.length > 0 ? fnData[fnData.length - 1] : [];
    // 更新数据
    const payload = {
        data: latestData,
        is2D: false,
        needUpload: false
    };
    store.commit('syncData', payload);
}