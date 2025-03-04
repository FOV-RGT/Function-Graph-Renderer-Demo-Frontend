import * as chartConfig from '../chartConfig';
import functionPlot from 'function-plot';
import * as utils from './componentUtils';
import { select } from 'd3';



export class chartInstance {
    constructor(target) {
        this.target = target;
        this.config = chartConfig.defaultConfig(target); // 初始化图表配置
        console.log("实例挂载:初始化配置完成");
        this.instance = functionPlot(this.config);// 初始化图表实例
        console.log("图表实例成功挂载");
        console.log(functionPlot.globals);
    }

    async createData(inputs) {
        // 格式化用户输入
        const functionInputs = inputs.replace(/\s+/g, "").split(/[;；]/);
        const data = [];
        const colors = [];
        for (let i = 0; i < functionInputs.length; i++) {
            let color
            const updatedColors = utils.generateHarmoniousColorFromArray([...colors]);
            color = updatedColors[i];
            colors.push(color);
            data.push({
                fn: functionInputs[i], // 函数表达式
                color: color, // 为每个函数生成唯一的颜色
                hash: await utils.sha256(functionInputs[i]), // 为每个函数生成唯一的哈希值
                nSamples: 2048, // 采样点数
            });
        }
        return data;
    }

    setFunction(data) {
        this.config.data = [...data];// 将data数组中的所有元素添加到config.data数组中
        this.instance.build();// 重绘图表
        console.log("图表实例配置已更新:", this.config);
    }

    async addInput(inputs) {
        console.log("更新输入");
        await this.createData(inputs).then((data) => {
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
        const xRange = xDomain[1] - xDomain[0];
        const yRange = yDomain[1] - yDomain[0];
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