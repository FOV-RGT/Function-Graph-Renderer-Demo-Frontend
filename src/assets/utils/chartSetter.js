import * as chartConfig from '../chartConfig';
import functionPlot from 'function-plot';
import * as utils from './componentUtils';
import { select } from 'd3';
import store from '../../store';
import { toRaw } from 'vue';


export class chartInstance {
    constructor(target) {
        this.target = target;
        this.config = chartConfig.defaultConfig(target); // 初始化图表配置
        console.log("实例挂载:初始化配置完成");
        this.instance = functionPlot(this.config);// 初始化图表实例
        console.log("图表实例成功挂载");
    }

    async createData(inputs, index = 0, num = 1, nSamples = 2025) {
        const updatedData = [];
        const rawData = toRaw(store.state.functionData_2D);
        const newFunctionData = [...rawData];
        console.log("原始数据:", newFunctionData);
        for (let i = 0; i < inputs.length; i++) {
            const color = utils.generateRandomHarmoniousColor();
            updatedData.push({
                fn: inputs[i], // 函数表达式
                color: i == 0 && newFunctionData[index] && newFunctionData[index].color !== Boolean ? newFunctionData[index].color : color, // 为每个函数生成唯一的颜色
                nSamples, // 采样点数
                visible: true, // 是否可见
            });
        };
        console.log("将要插入数据:", updatedData);
        newFunctionData.splice(index, num, ...updatedData);
        console.log("新数据已生成:", newFunctionData);
        const payload = {
            data: newFunctionData,
            is2D: true
        }
        store.commit('syncData', payload);
        return newFunctionData;
    }

    setFunction(data) {
        data = data.filter(d => d.fn !== '' && d.visible == true);
        this.config.data = [...data];// 将data数组中的所有元素添加到config.data数组中
        try {
            this.instance = functionPlot(this.config);// 重新绘制图表
            console.log("图表实例已更新");
        } catch (error) {
            console.error('请检查输入');
        }
    }

    async addInput(inputs, index, num) {
        await this.createData(inputs, index, num).then((data) => {
            console.log("数据已更新");
            this.setFunction(data);// 设置函数
        });
    }

    getAxisDomain(target) {
        const defaultConfig = chartConfig.defaultConfig(target);
        return {
            xDomain: defaultConfig.xAxis.domain,
            yDomain: defaultConfig.yAxis.domain,
        };
    }

    destroyInstance() {
        select('.function-plot').remove();
        this.instance = null;
    }

    resetView(target) {
        const currentConfig = this.config;
        const defaultConfig = chartConfig.defaultConfig(target);
        currentConfig.xAxis.domain = [defaultConfig.xAxis.domain[0], defaultConfig.xAxis.domain[1]];
        currentConfig.yAxis.domain = [defaultConfig.yAxis.domain[0], defaultConfig.yAxis.domain[1]];
        currentConfig.id = '';
        this.destroyInstance();
        this.instance = functionPlot(currentConfig);
        this.config = currentConfig;
        console.log("图表配置已更新:", this.config);
    }

    zoomView(evt) {
        const currentConfig = this.config;
        const xDomain = currentConfig.xAxis.domain;
        const yDomain = currentConfig.yAxis.domain;
        const zoomFactor = evt === 'zoomIn' ? 2 : 0.5;
        const center = [(xDomain[0] + xDomain[1])/2, (yDomain[0] + yDomain[1])/2];
        const newXHalfWidth = (xDomain[1] - xDomain[0]) / (2 * zoomFactor);
        const newYHalfWidth = (yDomain[1] - yDomain[0]) / (2 * zoomFactor);
        currentConfig.xAxis.domain = [center[0] - newXHalfWidth, center[0] + newXHalfWidth];
        currentConfig.yAxis.domain = [center[1] - newYHalfWidth, center[1] + newYHalfWidth];
        currentConfig.id = '';
        this.destroyInstance();
        this.instance = functionPlot(currentConfig);
        this.config = currentConfig;
        console.log("图表配置已更新:", this.config);
    }

    moveView(evt) {
        const currentConfig = this.config;
        const xDomain = currentConfig.xAxis.domain;
        const xRange = xDomain[1] - xDomain[0];
        if (evt === 'moveLeft' || evt === 'moveRight') {
            const moveFactor = evt === 'moveLeft' ? 0.2 : -0.2;
            currentConfig.xAxis.domain = [xDomain[0] - xRange * moveFactor, xDomain[1] - xRange * moveFactor];
        } else if (evt === 'moveUp' || evt === 'moveDown') {
            const yDomain = currentConfig.yAxis.domain;
            const yRange = yDomain[1] - yDomain[0];
            const moveFactor = evt === 'moveUp' ? -0.2 : 0.2;
            currentConfig.yAxis.domain = [yDomain[0] - yRange * moveFactor, yDomain[1] - yRange * moveFactor];
        }
        currentConfig.id = '';
        this.destroyInstance();
        this.instance = functionPlot(currentConfig);
        this.config = currentConfig;
        console.log("图表配置已更新:", this.config);
    }

    resize(target) {
        const currentConfig = this.config;
        currentConfig.width = target.clientWidth;
        currentConfig.height = target.clientHeight;
        currentConfig.id = '';
        this.destroyInstance();
        this.instance = functionPlot(currentConfig);
        this.config = currentConfig;
        console.log("图表配置已更新:", this.config);
    }
}