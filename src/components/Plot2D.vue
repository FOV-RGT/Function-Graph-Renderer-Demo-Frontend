<template>
  <div style="width: 100%;height: 100%;" ref="canvas2D"></div>
</template>

<script>
import Plotly from 'plotly.js-dist';

export default {
  data() {
    return {
      width: 0,
      height: 0,
      canvas: null,
      names: [],
      rendering: false,
      targetNums: 0,
      recentNums: 0,
    };
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    console.log('222');
    this.canvas = this.$refs.canvas2D;
    window.addEventListener('resize', this.updateDimensions);
    this.$nextTick(() => {
      this.width = this.canvas.clientWidth;
      this.height = this.canvas.clientHeight;
    });
    const layout = {
      xaxis: {
        zeroline: true,
        range: [-10, 10],
      },
      yaxis: {
        zeroline: true,
        range: [-5, 5],
      },
      dragmode: 'pan',  // 启用拖动缩放
      showlegend: true,  // 显示图例
      legend: {
        x: 1,
        y: 1,
        traceorder: 'normal',
        font: {
          family: 'sans-serif',
          size: 12,
          color: 'black'
        },
        bgcolor: 'rgba(255, 255, 255, 0.5)',
        bordercolor: 'rgba(0, 0, 0, 0.5)',
        borderwidth: 2
      },
    };
    const config = {
      displayModeBar: false,  // 隐藏工具栏控件
      scrollZoom: true,  // 启用滚轮缩放
      responsive: true,  // 响应用户拖动
    };
    // 使用 Plotly 绘制图表
    Plotly.newPlot(this.canvas, [], layout, config);
    console.log('111');
    
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateDimensions);
  },
  methods: {
    formatInput(inputs) {
      if (this.rendering) return;
      this.rendering = true;
      this.deleteTraces(this.names);
      // 以正则表达式匹配一个或多个连续空白字符替换为空字符，并将输入以';'或'；'分割为数组，从而格式化用户输入
      const functionInputs = inputs.replace(/\s+/g, "").split(/[;；]/);
      // 遍历数组逐一传递元素到'plotFunction()'
      functionInputs.forEach(input => this.plotFunction(input));
    },
    updateDimensions() {
      this.$nextTick(() => {
        if (this.$refs.canvas2D) {
          this.width = this.canvas.clientWidth;
          this.height = this.canvas.clientHeight;
        }
      });
    },
    async calculateCoordinates(input) {
      let target = 'y';
      if (input.startsWith('x=')) {
        target = 'x'
      }
      const width = this.width;
      const height = this.height;
      const workerCount = 6;
      const calculatePromises = [];
      for (let i = 0; i < workerCount; i++) {
        const promise = new Promise((resolve) => {
          const worker = new Worker(
            new URL("../assets/calculateCoordinates.js", import.meta.url), { type: "module", }
          );
          const start = -1800 + i * 600;
          const end = start + 600;
          worker.postMessage({ start, end, index: i, input, target });
          worker.onmessage = (event) => {
            resolve(event.data);
          };
        });
        calculatePromises.push(promise);
      }
      return Promise.all(calculatePromises).then(results => {
        results.sort((a, b) => a.index - b.index);
        const xVals = results.flatMap(result => result.xVals);
        const yVals = results.flatMap(result => result.yVals);
        const vals = { xVals, yVals }
        return vals;
      });
    },
    async plotFunction(input) {
      // 为每个函数生成新的随机颜色
      const color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
      this.names.push(input);
      this.targetNums += 1;
      const { xVals, yVals } = await this.calculateCoordinates(input);
      const trace = {
        x: xVals,
        y: yVals,
        mode: 'lines',  // 绘制线图
        name: input,  // 图例名称
        line: {  // 线条样式
          color: color,  // 线条颜色
          width: 2  // 线条宽度
        }
      };
      Plotly.addTraces(this.canvas, trace);
      this.recentNums += 1;
      if (this.recentNums === this.targetNums) {
        this.rendering = false;
      }
    },
    deleteTraces(names) {
      if (names.length === 0) return;
      const tracesToDelete = [];
      const namesIndex = [];
      names.forEach(name => {
        for (let i = 0; i < this.canvas.data.length; i++) {
          console.log(this.canvas.data[i].name);
          if (this.canvas.data[i].name === name) {
            tracesToDelete.push(i);
            namesIndex.push(i);
          }
        }
      });
      console.log(tracesToDelete);
      Plotly.deleteTraces(this.canvas, tracesToDelete);
      console.log(namesIndex);
      namesIndex.sort((a, b) => b - a);
      namesIndex.forEach(index => {
        this.names.splice(index, 1);
      });
    },
  }
};
</script>

<style scoped></style>
