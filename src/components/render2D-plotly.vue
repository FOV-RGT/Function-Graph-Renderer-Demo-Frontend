<!-- 已弃用 -->

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
      xRange: [-10, 10],
      yRange: [-5, 5],
      debounceTimer: null,
      
    };
  },

  computed: {
  },

  watch: {
  },

  mounted() {
    this.canvas = this.$refs.canvas2D;
    // window.addEventListener('resize', this.updateDimensions);
    // this.$nextTick(() => {
    //   this.width = this.canvas.clientWidth;
    //   this.height = this.canvas.clientHeight;
    // });


    // 设置图表布局
    const layout = {
      xaxis: {
        zeroline: true,
        range: [-10, 10],
      },
      yaxis: {
        zeroline: true,
        range: [-5, 5],
      },
      margin: {l: 30, r: 30, t: 10, b: 30 },
      type: 'scatter', // 线图
      dragmode: 'pan',  // 启用拖动缩放
      showlegend: true,  // 显示图例
      legend: {
        x: 0.95,
        y: 1,
        traceorder: 'normal',
        // uirevision: 'hide tooltip',
        font: {
          family: 'deYiHei',
          size: 16,
          color: 'black',
        },
        bgcolor: 'rgba(255, 255, 255, 0.5)',
        bordercolor: 'rgba(0, 0, 0, 0.5)',
        borderwidth: 1
      },
    };

    // 设置图表配置
    const config = {
      displayModeBar: false,  // 隐藏工具栏控件
      scrollZoom: true,  // 启用滚轮缩放
      // displaylogo: false,
      showTips: false,
      responsive: true // 让图表响应容器大小的变化
    };

    // 使用 Plotly 绘制图表
    Plotly.newPlot(this.canvas, [], layout, config);

    // 监听图表的'plotly_relayout'事件，当图表的布局发生变化时触发
    this.canvas.on('plotly_relayout', (eventData) => {
      if (!isNaN(eventData['xaxis.range[0]'])) {
        this.xRange = [Math.floor(eventData['xaxis.range[0]']), Math.floor(eventData['xaxis.range[1]'])];
        this.yRange = [Math.floor(eventData['yaxis.range[0]']), Math.floor(eventData['yaxis.range[1]'])];
      } else {
        this.xRange = [-10, 10];
        this.yRange = [-5, 5];
      }
      this.handleRangeUpdate();
    });
  },
  beforeDestroy() {
    // 释放资源
    window.removeEventListener('resize', this.updateDimensions);
    Plotly.d3.select(this.canvas).on('plotly_relayout', null);
  },
  methods: {
    // 更新坐标范围
    handleRangeUpdate() {
      if (this.debounceTimer) clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.updateTraces();
      }, 0);
    },
    
    // 格式化用户输入
    formatInput(inputs) {
      // 如果正在渲染，则直接返回
      if (this.rendering) return;
      this.rendering = true;

      // 清除图表中的所有数据
      this.deleteTraces(this.names);

      // 以正则表达式匹配整个输入流中一个或多个连续空白字符替换为空字符，并将输入以';'或'；'分割为数组，从而格式化用户输入
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

    // 计算坐标
    async calculateCoordinates(input) {
      let target = 'y';
      let startPoint = this.xRange[0] - 25;
      if (input.startsWith('x=')) {
        target = 'x';
        startPoint = this.yRange[0] - 25;
      }
      // const width = this.width; // 暂时用不到
      // const height = this.height;
      const workerCount = 1;
      const lenght = this.xRange[1] - this.xRange[0] + 50;
      const calculatePromises = [];
      for (let i = 0; i < workerCount; i++) {
        const promise = new Promise((resolve, reject) => {
          const worker = new Worker(
            new URL("../assets/calculateCoordinates.js", import.meta.url), { type: "module", }
          );
          const start = Math.floor(startPoint + i * lenght / workerCount);
          const end = Math.floor(startPoint + (i + 1) * lenght / workerCount);
          worker.postMessage({ start, end, index: i, input, target, maxDepth: 15, errorThreshold: 0.005 });
          worker.onmessage = (event) => {
            resolve(event.data);
          };
          worker.onerror = (error) => {
            reject(error);  // 当Worker出现错误时，调用reject将错误传递出去
          };
        });
        calculatePromises.push(promise);
      }
      return Promise.all(calculatePromises).then(results => {
        // results.sort((a, b) => a.index - b.index);
        // const allPoints = results.flatMap(result => result.points);
        // const x = allPoints.map(point => point.x);
        // const y = allPoints.map(point => point.y);
        for (const result of results) {
          const xArray = new Float64Array(result.xBuffer);
          const yArray = new Float64Array(result.yBuffer);
          const vals = { xArray, yArray }
          // console.log(vals);
          
          return vals;
        }
        // const vals = { x, y }
        // console.log(vals);
        // return vals;
      })
        .catch((error) => {
          console.log(error);
          console.log('不受支持的输入');
          return { x: [], y: [] };  // 返回空值对象
        });
    },
    async plotFunction(input) {
      // 为每个函数生成新的随机颜色
      this.names.push(input);
      this.targetNums += 1;
      const { xArray, yArray } = await this.calculateCoordinates(input);
      const trace = {
        x: xArray,
        y: yArray,
        mode: 'lines',  // 绘制线图
        name: input,  // 图例名称
        line: {  // 线条样式
          color: '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'),  // 线条颜色
          width: 2,  // 线条宽度
          // shape: 'spline' // 形状拟合
        }
      };
      Plotly.addTraces(this.canvas, trace);
      this.recentNums += 1;
      if (this.recentNums === this.targetNums) this.rendering = false;
    },
    deleteTraces(names) {
      if (names.length === 0) return;
      const tracesToDelete = [];
      names.forEach(name => {
        for (let i = 0; i < this.canvas.data.length; i++) {
          console.log(this.canvas.data[i].name);
          if (this.canvas.data[i].name === name) {
            tracesToDelete.push(i);
            break;
          }
        }
      });
      // console.log(tracesToDelete);
      Plotly.deleteTraces(this.canvas, tracesToDelete);
      tracesToDelete.sort((a, b) => b - a).forEach(index => {this.names.splice(index, 1)});
    },
    updateTraces() {
      if (this.rendering) return;
      this.rendering = true;
      this.names.forEach(name => {
        const index = this.canvas.data.findIndex(trace => trace.name === name);
        if (index !== -1) {
          this.calculateCoordinates(name).then(({ xArray, yArray }) => {
            Plotly.restyle(this.canvas, { x: xArray, y: yArray }, index);
          });
        }
      });
      this.rendering = false;
    },
  }
};
</script>

<style scoped>

</style>
