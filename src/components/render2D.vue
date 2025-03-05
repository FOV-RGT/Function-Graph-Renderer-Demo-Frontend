<template>
  <div style="width: 100%;height: 100%;overflow: hidden;" ref="canvas2D"></div>
</template>

<script>
import { chartInstance } from '../assets/utils/chartSetter';
import * as utils from '../assets/utils/componentUtils';
import { mapState } from "vuex";


export default {
  data() {
    return {
      chartInstance: null,
      rendering: false,
    };
  },
  created() {
    // 输入防抖
    this.debouncedAddInput = utils.debounce((val) => {
      console.log("自动更新输入");
      this.chartInstance.addInput(val).then(() => {
        console.log("自动更新完成");
      });
    }, 500);
  },
  mounted() {
    // 绘制图表
    console.log("图表实例开始挂载");
    this.chartInstance = new chartInstance(this.$refs.canvas2D);
    this.chartInstance.addInput(this.userInput_2D.replace(/\s+/g, "").split(/[;；]/)).then(() => {
      console.log("图表实例初始化完成");
    });
  },
  beforeDestroy() {
    // 释放资源
    this.chartInstance.destroyInstance();
  },
  computed: {
    ...mapState(["userInput_2D"]),// 通过vuex获取输入
  },
  watch: {
    // userInput_2D: {
    //   handler(newVal) {
    //     const formatInputs = newVal.replace(/\s+/g, "").split(/[;；]/);
    //     this.debouncedAddInput(formatInputs);
    //   },
    // },
  },
  methods: {
    // 接收父组件传递的输入
    userInput(inputs, index) {
      if (!this.rendering) {
        this.rendering = true;
        console.log("手动更新输入");
        this.chartInstance.addInput(inputs, index).then(() => {
          this.rendering = false;
          console.log("手动更新完成");
        });
      } else {
        console.log("手动更新被阻止:正在渲染");
      }
    },
    // 重置视图
    setView(evt) {
      switch (evt) {
        case 'reset':
          console.log("触发:重置视图");
          this.chartInstance.resetView(this.$refs.canvas2D);
          break;
        case 'zoomIn':
          console.log("触发:缩放视图");
          this.chartInstance.zoomView(evt);
          break;
        case 'zoomOut':
          console.log("触发:缩放视图");
          this.chartInstance.zoomView(evt);
          break;
        case 'dragLeft':
          console.log("触发:平移视图");
          this.chartInstance.dragView(evt);
          break;
        case 'dragRight':
          console.log("触发:平移视图");
          this.chartInstance.dragView(evt);
          break;
        default:
          break;
      }
    },
  }
};
</script>

<style>
@import url('../assets/componentCss/render2D.css');
</style>
