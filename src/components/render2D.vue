<template>
  <div style="width: 100%;height: 100%;" ref="canvas2D"></div>
</template>

<script>
import { chartInstance } from '../assets/utils/chartSetter';
import { authApi } from '../api/auth.js';

export default {
  data() {
    return {
      chartInstance: null,
      rendering: false,
    };
  },
  created() {

  },
  mounted() {
    // 绘制图表
    console.log("图表实例开始挂载");
    this.chartInstance = new chartInstance(this.$refs.canvas2D);
    const currentData = this.$store.state.functionData_2D;
    let fn = [];
    if (currentData && currentData.length > 0) {
      console.log(currentData);
      fn = currentData.map(item => item.fn);
      const payload = {
        data: [],
        is2D: true
      }
      this.$store.commit("syncData", payload);
    }
    this.chartInstance.addInput(fn, 0).then(() => {
      console.log("图表实例初始化完成");
    });
  },
  beforeUnmount() {
    console.log("销毁图表实例");
    this.chartInstance.destroyInstance();
  },
  computed: {

  },
  watch: {

  },
  methods: {
    // 接收父组件传递的输入
    userInput(inputs, index, num) {
      console.log("更新输入");
      this.chartInstance.addInput(inputs, index, num).then(() => {
        console.log("更新完成");
      });
    },
    // 重置视图
    setView(evt) {
      switch (evt) {
        case 'reset':
          console.log("触发:重置范围");
          this.chartInstance.resetView(this.$refs.canvas2D);
          break;
        case 'zoomIn':
          console.log("触发:放大范围");
          this.chartInstance.zoomView(evt);
          break;
        case 'zoomOut':
          console.log("触发:缩小范围");
          this.chartInstance.zoomView(evt);
          break;
        case 'moveLeft':
          console.log("触发:左移视图");
          this.chartInstance.moveView(evt);
          break;
        case 'moveRight':
          console.log("触发:右移视图");
          this.chartInstance.moveView(evt);
          break;
        case 'moveUp':
          console.log("触发:上移视图");
          this.chartInstance.moveView(evt);
          break;
        case 'moveDown':
          console.log("触发:下移视图");
          this.chartInstance.moveView(evt);
          break;
        default:
          break;
      }
    },
    fuckRender(data) {
      this.chartInstance.setFunction(data);
    },
    fuckResize() {
      this.chartInstance.resize(this.$refs.canvas2D);
    }
  }
};
</script>

<style>
@import url('../assets/componentCss/render2D.css');
</style>
