<template>
  <div style="width: 100%;height: 100%;" ref="canvas2D"></div>
</template>

<script>
import { selectAll } from 'd3';
import { chartInstance } from '../assets/utils/chartSetter';
import * as utils from '../assets/utils/componentUtils';
import { mapState } from "vuex";
import functionPlot from 'function-plot';


export default {
  data() {
    return {
      chartInstance: null,
      rendering: false,
    };
  },
  mounted() {
    // 绘制图表
    this.chartInstance = new chartInstance(this.$refs.canvas2D);
    this.chartInstance.addInput(this.userInput_2D);
      const animate = () => {
        selectAll('.function-plot .top-right-legend')
        .text('');
      requestAnimationFrame(animate);
    };
    animate();

    // 监听图表的'plotly_relayout'事件，当图表的布局发生变化时触发

  },
  beforeDestroy() {
    // 释放资源

  },
  computed: {
    ...mapState(["userInput_2D"]),
  },
  watch: {
    userInput_2D: {
      handler (newVal) {
        // 防抖包装，传入图表的addInput方法并绑定当前this指向
        const debounceInput = utils.debounce(this.chartInstance.addInput.bind(this.chartInstance), 600);
        // 调用图表的addInput方法
        debounceInput(newVal);
      },
    },
  },
  methods: {
    // 接收父组件传递的输入
    userInput(inputs) {
      if (!this.rendering) {
        this.rendering = true;
        this.chartInstance.addInput(inputs).then(() => {
          this.rendering = false;
        });
      }
    },
    setView(e) {
      switch (e) {
        case 'reset':
          this.chartInstance.resetView(this.chartInstance);
          break;
        case 'zoom':
        this.chartInstance.zoomView(this.chartInstance);
          break;
        case 'drag':
          this.chartInstance.dragView(this.chartInstance);
          break;
        default:
          break;
      }
    },
  }
};
</script>

<style scoped>

</style>
