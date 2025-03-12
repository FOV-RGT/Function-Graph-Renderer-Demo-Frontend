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
      graphTypes: [
        { value: 'polyline', label: '线图' },
        { value: 'scatter', label: '点图' },
        { value: 'interval', label: '区间图' },
        { value: 'area', label: '面积图' }
      ],
      globalGraphType: 'polyline' // 默认全局图表类型
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
    const data = {
      login: "user1",
      password: "123123"
    }
    authApi.login(data)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
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
        case 'zoomOut':
          console.log(`触发:${evt === 'zoomIn' ? '放大' : '缩小'}范围`);
          this.chartInstance.zoomView(evt);
          break;
        case 'moveLeft':
        case 'moveRight':
        case 'moveUp':
        case 'moveDown':
          console.log(`触发:${evt}视图`);
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
    },
    // 更新图表实例的缩放因子
    updateZoomFactor(zoomStep) {
      if (this.chartInstance) {
        this.chartInstance.setZoomFactor(zoomStep);
      }
    },
    // 更新函数的图表类型
    updateGraphType(graphType, index) {
      console.log("更新图表类型:", graphType, "索引:", index);
      if (this.chartInstance) {
        this.chartInstance.setGraphType(graphType, index);
      }
    },
    // 设置所有函数的图表类型
    setAllGraphTypes(graphType) {
      if (this.chartInstance) {
        this.chartInstance.setGraphType(graphType);
      }
    },
    // 更新单个函数的图表类型
    updateFunctionGraphType(graphType, index) {
      if (this.chartInstance) {
        this.chartInstance.setGraphType(graphType, index);
      }
    }
  }
};
</script>

<style>
@import url('../assets/componentCss/render2D.css');
</style>
