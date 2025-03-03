import * as chartConfig from '../chartConfig';
import functionPlot from 'function-plot';
import * as utils from './componentUtils';
import * as d3 from 'd3';



export class chartInstance {
    constructor(target) {
        this.target = target;
        this.config = chartConfig.defaultConfig(target); // 初始化配置
        this.instance = functionPlot(this.config);// 初始化图表
    }

    async createData(inputs) {
        // 以正则表达式匹配整个输入流中一个或多个连续空白字符替换为空字符，并将输入以';'或'；'分割为数组，从而格式化用户输入
        const functionInputs = inputs.replace(/\s+/g, "").split(/[;；]/);
        const data = [];
        const colors = [];
        for (let i = 0; i < functionInputs.length; i++) {
            let color
            if (i == 0) {
                color = utils.generateHarmoniousColors(1, utils.randomIntegerInRange(10, 80))[0];
            } else {
                const updatedColors = utils.generateHarmoniousColorFromArray([...colors]);
                color = updatedColors[i];
            }
            colors.push(color);
            data.push({
                fn: functionInputs[i], // 函数表达式
                color: color, // 为每个函数生成唯一的颜色
                hash: await utils.sha256(functionInputs[i]), // 为每个函数生成唯一的哈希值
                nSamples: 1024, // 采样点数
            });
        }
        return data;
    }

    setFunction(data) {
        this.config.data = [...data];// 将data数组中的所有元素添加到config.data数组中
        console.log(this.config.data);
        this.instance.build();// 重绘图表
    }

    async addInput(inputs) {
        const data = await this.createData(inputs);// 格式化用户输入
        this.setFunction(data);// 设置函数
    }

    getAxisDomain(target) {
        const defaultConfig = chartConfig.defaultConfig(target);
        return {
            xDomain: defaultConfig.xAxis.domain,
            yDomain: defaultConfig.yAxis.domain,
        };
    }

    resetView(target) {
        // const currentConfig = utils.deepClone(this.config);
        const currentConfig = this.config;
        console.log(currentConfig);
        const defaultConfig = chartConfig.defaultConfig(target);
        currentConfig.xAxis.domain = [defaultConfig.xAxis.domain[0], defaultConfig.xAxis.domain[1]];
        currentConfig.yAxis.domain = [defaultConfig.yAxis.domain[0], defaultConfig.yAxis.domain[1]];
        currentConfig.id = '';
        this.destroy();
        this.instance = functionPlot(currentConfig);
        this.config = currentConfig;
    }

    destroy() {
        d3.select('.function-plot')
            .remove();
        this.instance = null;
    }

    zoomView() {
        const currentConfig = this.config;
        const xDomain = currentConfig.xAxis.domain;
        const yDomain = currentConfig.yAxis.domain;
        const xRange = xDomain[1] - xDomain[0];
        const yRange = yDomain[1] - yDomain[0];
        const zoomFactor = 0.1;
        currentConfig.xAxis.domain = [xDomain[0] - xRange * zoomFactor, xDomain[1] + xRange * zoomFactor];
        currentConfig.yAxis.domain = [yDomain[0] - yRange * zoomFactor, yDomain[1] + yRange * zoomFactor];
        currentConfig.id = '';
        this.destroy();
        this.instance = functionPlot(currentConfig);
        this.config = currentConfig;
    }

    dragView() {
        const currentConfig = this.config;
        const xDomain = currentConfig.xAxis.domain;
        const xRange = xDomain[1] - xDomain[0];
        const dragFactor = 0.1;
        currentConfig.xAxis.domain = [xDomain[0] + xRange * dragFactor, xDomain[1] + xRange * dragFactor];
        currentConfig.id = '';
        this.destroy();
        this.instance = functionPlot(currentConfig);
        this.config = currentConfig;
    }
}