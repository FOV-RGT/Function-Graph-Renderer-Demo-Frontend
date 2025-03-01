import * as chartConfig from '../chartConfig';
import plot from 'function-plot';
import * as utils from './componentUtils';



export class Chart {
    constructor(target) {
        this.target = target;
        this.config = chartConfig.defaultConfig(target);
        this.chart = plot(this.config);
    }

    set domain(domains) {
        this.config.xAxis.domain = domains[0] || this.config.xAxis.domain;
        this.config.yAxis.domain = domains[1] || this.config.yAxis.domain;
        this.chart.syncOptions();
    }

    async createData(inputs) {
        // 以正则表达式匹配整个输入流中一个或多个连续空白字符替换为空字符，并将输入以';'或'；'分割为数组，从而格式化用户输入
        const functionInputs = inputs.replace(/\s+/g, "").split(/[;；]/);
        const data = [];
        for (const input of functionInputs) {
            data.push({
                fn: input,
                color: utils.randomColor(),
                hash: await utils.sha256(input),
                nSamples: 1024,
            });
        }
        return data;
    }

    setFunction(data) {
        this.config.data = [...data];
        console.log(this.config);
        this.chart.draw();
    }
    
    async addInput(inputs) {
        const data = await this.createData(inputs);
        this.setFunction(data);
    }

    
}