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

    async createData(inputs, index = 0) {
        const updatedData = [];
        let colors = this.config.data.length > 0 ? this.config.data.map(d => d.color) : [];
        for (let i = 0; i < inputs.length; i++) {
            const color = utils.generateRandomHarmoniousColor();
            updatedData.push({
                fn: inputs[i], // 函数表达式
                color: color, // 为每个函数生成唯一的颜色
                hash: await utils.sha256(`${Date.now()}${inputs[i]}`), // 为每个输入生成唯一的哈希值
                nSamples: 2048, // 采样点数
            });
        };
        console.log("当前颜色:", colors);
        console.log("将要插入数据:", updatedData);
        const rawData = toRaw(store.state.functionData);
        const newFunctionData = [
            ...rawData.slice(0, index),
            ...updatedData,
            ...rawData.slice(index + 1),
        ];
        console.log("新数据已生成:", newFunctionData);
        const fn = newFunctionData.map(d => d.fn).join(';');
        store.commit('syncInput', fn);
        store.commit('addData', newFunctionData);
        return newFunctionData;
    }

    setFunction(data) {
        this.config.data = [...data];// 将data数组中的所有元素添加到config.data数组中
        this.instance.draw();// 重绘图表
        console.log("图表实例配置已更新:", this.config);
    }

    async addInput(inputs, index) {
        console.log("更新输入");
        await this.createData(inputs, index).then((data) => {
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
        const zoomFactor = evt === 'zoomIn' ? 0.5 : 2;
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

    dragView(evt) {
        const currentConfig = this.config;
        const xDomain = currentConfig.xAxis.domain;
        const xRange = xDomain[1] - xDomain[0];
        const dragFactor = evt === 'dragLeft' ? 0.2 : -0.2;
        currentConfig.xAxis.domain = [xDomain[0] - xRange * dragFactor, xDomain[1] - xRange * dragFactor];
        currentConfig.id = '';
        this.destroyInstance();
        this.instance = functionPlot(currentConfig);
        this.config = currentConfig;
        console.log("图表配置已更新:", this.config);
    }
}