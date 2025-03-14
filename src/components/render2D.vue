<template>
  <div style="width: 100%;height: 100%;" ref="canvas2D"></div>
</template>

<script>
import { chartInstance } from '../assets/utils/chartSetter';

export default {
  data() {
    return {
      chartInstance: null,
    };
  },
  created() {
  },
  mounted() {
    // 绘制图表
    console.log("图表实例开始挂载");
    this.chartInstance = new chartInstance(this.$refs.canvas2D);
    // const currentData = this.$store.state.functionData_2D;
    // let fn = [];
    // if (currentData && currentData.length > 0) {
    //   console.log(currentData);
    //   fn = currentData.map(item => item.fn);
    //   const payload = {
    //     data: [],
    //     is2D: true
    //   }
    //   this.$store.commit("syncData", payload);
    // }
    // this.chartInstance.addInput(fn, 0).then(() => {
    //   console.log("图表实例初始化完成");
    // });
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
    setView(evt, zoomStep, moveStep) {
      switch (evt) {
        case 'reset':
          console.log("触发:重置范围");
          this.chartInstance.resetView(this.$refs.canvas2D);
          break;
        case 'zoomIn':
        case 'zoomOut':
          console.log(`触发:${evt === 'zoomIn' ? '放大' : '缩小'}范围`);
          this.chartInstance.zoomView(evt, zoomStep);
          break;
        case 'moveLeft':
        case 'moveRight':
        case 'moveUp':
        case 'moveDown':
          console.log(`触发:${evt}视图`);
          this.chartInstance.moveView(evt, moveStep);
          break;
        default:
          break;
      }
    },

    // 更新图表实例的缩放因子
    updateZoomFactor(zoomStep) {
      if (this.chartInstance) {
        this.chartInstance.setZoomFactor(zoomStep);
      }
    },

    //更新图表实例的移动因子
    updateMoveFactor(moveStep) {
      if (this.chartInstance) {
        this.chartInstance.setMoveFactor(moveStep);
      }
    },

    fuckRender(data) {
      this.chartInstance.setFunction(data);
    },


    // 更新采样点数量
    updateSamplePoints(samples, index) {
      if (!this.chartInstance) return;
      try {
        if (typeof this.chartInstance.setSamplePoints === 'function') {
          this.chartInstance.setSamplePoints(samples, index);
        } 
      } catch (error) {
        console.error("采样点更新失败");
      }
    }
  }
};
</script>

<style>
@import url('../assets/componentCss/render2D.css');
</style>
