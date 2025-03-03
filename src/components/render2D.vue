<template>
  <div style="width: 100%;height: 100%;" ref="canvas2D"></div>
</template>

<script>
import { selectAll } from 'd3';
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
    this.chartInstance.addInput(this.userInput_2D).then(() => {
      console.log("图表实例初始化完成");
      this.legendSelection = selectAll('.function-plot .top-right-legend');
      this.startAnimation();
    });
  },
  beforeDestroy() {
    // 释放资源
    this.chartInstance.destroyInstance();
    cancelAnimationFrame(this.animationId);
  },
  computed: {
    ...mapState(["userInput_2D"]),// 通过vuex获取输入
  },
  watch: {
    userInput_2D: {
      handler(newVal) {
        this.debouncedAddInput(newVal);
      },
    },
  },
  methods: {
    startAnimation() {
      const animate = () => {
        this.legendSelection.text('');
        this.animationId = requestAnimationFrame(animate);
      };
      animate();
    },
    // 接收父组件传递的输入
    userInput(inputs) {
      if (!this.rendering) {
        this.rendering = true;
        console.log("手动更新输入");
        this.chartInstance.addInput(inputs).then(() => {
          this.rendering = false;
          console.log("手动更新完成");
        });
      } else {
        console.log("手动更新被阻止：正在渲染");
      }
    },
    // 重置视图
    setView(e) {
      switch (e) {
        case 'reset':
          console.log("触发：重置视图");
          this.chartInstance.resetView(this.chartInstance);
          break;
        case 'zoom':
          console.log("触发：缩放视图");
          this.chartInstance.zoomView(this.chartInstance);
          break;
        case 'drag':
          console.log("触发：平移视图");
          this.chartInstance.dragView(this.chartInstance);
          break;
        default:
          break;
      }
    },
  }
};
</script>

<style scoped></style>
