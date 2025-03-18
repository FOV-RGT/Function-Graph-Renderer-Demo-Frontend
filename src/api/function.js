import api from './index';

const fnApi = {
    async uploadFunctionData(data) {
        try {
            return await api.post('/mathdata', data);
        } catch (error) {
            console.log("更新工作区数据错误：", error.status);
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
    async getHistoricalData(currentPage = 1, pageSize = 50) {
        try {
            return await api.get('/mathdata/2d', {params: {currentPage, pageSize}});
        } catch (error) {
            console.log("获取工作区数据错误：", error.status);
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
    async delectFunctionData(id) {
        console.log("id", id);
        try {
            return await api.delete('/mathdata/change', { data: id });
        } catch (error) {
            console.log("删除函数数据错误：", error.status);
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
    async getChangeData(currentPage = 1, pageSize = 4) {
        try {
            return await api.get('/mathdata/change', {params: {currentPage, pageSize}});
        } catch (error) {
            console.log("获取历史记录错误：", error.status);
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
    async uploadChangeData(data) {
        try {
            return await api.post('/mathdata/change', data);
        } catch (error) {
            console.log("更新历史记录错误：", error.status);
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

}

export default fnApi;