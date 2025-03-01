<template>
  <div style="width: 100%;height: 100%;" ref="canvas2D"></div>
</template>

<script>
// import plot from 'function-plot';
// import { select, selectAll } from 'd3';
import { Chart } from '../assets/utils/chartSetter';
import * as utils from '../assets/utils/componentUtils';
import { mapState } from "vuex";


export default {
  data() {
    return {
      chart: null,
      rendering: false,
    };
  },

  computed: {
    ...mapState(["userInput_2D"]),
  },

  watch: {
    userInput_2D: {
      handler (newVal) {
        // 防抖包装，传入图表的addInput方法并绑定当前this指向
        const debounceInput = utils.debounce(this.chart.addInput.bind(this.chart), 600);
        // 调用图表的addInput方法
        debounceInput(newVal);
      },
    },
  },

  mounted() {
    // 绘制图表
    this.chart = new Chart(this.$refs.canvas2D);
    this.chart.addInput(this.userInput_2D);
    //   setTimeout(() => {
    //   // 选择轴标签并设置样式
    //   selectAll('.function-plot .x.axis text, .function-plot .y.axis text')
    //     .style('font-size', '14px')
    //     .style('font-weight', 'bold');

    //   // 给网格线添加样式
    //   selectAll('.function-plot .grid path')
    //     .style('stroke-opacity', '0.3')
    //     .style('stroke-dasharray', '3,3');
    // }, 100);

    // 监听图表的'plotly_relayout'事件，当图表的布局发生变化时触发

  },
  beforeDestroy() {
    // 释放资源

  },
  methods: {
    // 接收父组件传递的输入
    userInput(inputs) {
      if (!this.rendering) {
        this.rendering = true;
        this.chart.addInput(inputs).then(() => {
          this.rendering = false;
        });
      }
    },
  }
};
</script>

<style scoped>

</style>
