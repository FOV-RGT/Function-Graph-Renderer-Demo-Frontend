import * as chartConfig from '../chartConfig';
import functionPlot from 'function-plot';
import * as utils from './componentUtils';
import { select } from 'd3';
import store from '../../store';
import { toRaw, markRaw} from 'vue';


export class chartInstance {
    constructor(target) {
        this.target = target;
        this.config = markRaw(chartConfig.defaultConfig(target)); // 初始化图表配置
        this.zoomFactor = 0.5; // 默认缩放因子
        console.log("实例挂载:初始化配置完成");
        this.instance = markRaw(functionPlot(this.config));// 初始化图表实例
        console.log("图表实例成功挂载");
    }

    async createData(inputs, index = 0, num = 1, nSamples = 2025, graphType = 'polyline') {
        const updatedData = [];
        const rawData = toRaw(store.state.functionData_2D);
        const newFunctionData = [...rawData];
        console.log("原始数据:", newFunctionData);
        for (let i = 0; i < inputs.length; i++) {
            const color = utils.generateRandomHarmoniousColor();
            updatedData.push({
                fn: inputs[i], // 函数表达式
                color: i == 0 && newFunctionData[index] && newFunctionData[index].color !== Boolean ? newFunctionData[index].color : color, // 为每个函数生成唯一的颜色
                graphType: i == 0 && newFunctionData[index] && newFunctionData[index].graphType ? newFunctionData[index].graphType : graphType, // 图表类型
                nSamples, // 采样点数
                visible: true, // 是否可见
                dimension: 2 // 函数维
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
        const currentConfig = this.config;
        currentConfig.data = [];
        // 过滤可见函数并应用其配置
        data = data.filter(item => item.fn !== '' && item.visible);
        currentConfig.data = data;
        // 重新渲染图表
        currentConfig.id = '';
        this.destroyInstance();
        this.instance = markRaw(functionPlot(currentConfig));
        this.config = markRaw(currentConfig);
        return currentConfig
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
        // 使用实例的缩放因子
        const zoomStep = this.zoomFactor;
        const zoomFactor = evt === 'zoomIn' ? 1 + zoomStep : 1 / (1 + zoomStep);
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

    // 设置移动步长
setMoveStep(moveStep) {
    this.moveStep = moveStep;
}

// 修改 moveView 方法接受步长参数
moveView(evt, moveStep = 0.5) {
    const currentConfig = this.config;
    const xDomain = currentConfig.xAxis.domain;
    const yDomain = currentConfig.yAxis.domain;
    // 使用传入的移动步长
    const step = moveStep || this.moveStep || 0.5;
    
    const xRange = Math.abs(xDomain[1] - xDomain[0]);
    const yRange = Math.abs(yDomain[1] - yDomain[0]);
    const xStep = xRange * step * 0.05;
    const yStep = yRange * step * 0.05;
    
    // 根据方向移动视图
    switch (evt) {
        case 'moveLeft':
            currentConfig.xAxis.domain = [xDomain[0] - xStep, xDomain[1] - xStep];
            break;
        case 'moveRight':
            currentConfig.xAxis.domain = [xDomain[0] + xStep, xDomain[1] + xStep];
            break;
        case 'moveUp':
            currentConfig.yAxis.domain = [yDomain[0] + yStep, yDomain[1] + yStep];
            break;
        case 'moveDown':
            currentConfig.yAxis.domain = [yDomain[0] - yStep, yDomain[1] - yStep];
            break;
    }
    
    // 重新渲染图表
    currentConfig.id = '';
    this.destroyInstance();
    this.instance = functionPlot(currentConfig);
    this.config = currentConfig;
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

    // 设置缩放因子
    setZoomFactor(factor) {
        // 验证缩放因子范围
        if (factor < 0.01) factor = 0.01;
        if (factor > 1) factor = 1.00;
        this.zoomFactor = factor;
        return this.zoomFactor;
    }

    //设置移动因子
    setMoveFactor(factor) {
        // 验证移动因子范围
        if (factor < 0.01) factor = 0.01;
        if (factor > 1) factor = 1.00;
        this.moveFactor = factor;
        return this.moveFactor;
    }

    getZoomFactor() {
        return this.zoomFactor;
    }

    // 设置图表类型
    setGraphType(graphType, index) {
        const currentConfig = this.config;
        // 如果提供了特定索引，只更新该函数的图表类型
        if (index !== undefined && currentConfig.data[index]) {
            currentConfig.data[index].graphType = graphType;
        } 
        // 否则更新所有函数的图表类型
        else if (index === undefined) {
            currentConfig.data.forEach(item => {
                if (item) item.graphType = graphType;
            });
        }
        // 重新渲染图表
        currentConfig.id = '';
        this.destroyInstance();
        this.instance = functionPlot(currentConfig);
        this.config = currentConfig;
        console.log("图表类型已更新:", graphType, "索引:", index);
        return graphType;
    }
    
    // 获取图表类型
    getGraphType(index) {
        const rawData = toRaw(store.state.functionData_2D);
        if (index !== undefined && rawData[index]) {
            return rawData[index].graphType;
        }
        return null;
    }
}