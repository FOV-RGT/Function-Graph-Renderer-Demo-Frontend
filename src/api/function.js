import api from './index';

const fnApi = {
    async uploadFunctionData(data) {
        try {
            return await api.post('/mathdata', data);
        } catch (error) {
            console.log("更新函数数据错误：", error.status);
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
    async getFunctionData() {
        try{
            return await api.get('/mathdata/2d');
        } catch (error) {
            console.log("获取函数数据错误：", error.status);
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
    async getHistoricalData(currentPage) {
        try {
            return await api.get('/mathdata/2d', {params: {currentPage}});
        } catch (error) {
            console.log("获取历史数据错误：", error.status);
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
            return await api.delete('/mathdata/', { data: id });
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
    }
}

export default fnApi;