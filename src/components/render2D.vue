<template>
  <div style="width: 100%;height: 100%;" ref="canvas2D"></div>
</template>

<script>
// import plot from 'function-plot';
// import { select, selectAll } from 'd3';
import { Chart } from '../assets/utils/chartSetter';

export default {
  data() {
    return {
    };
  },

  computed: {

  },

  watch: {

  },

  mounted() {
    // 绘制图表
    this.chart = new Chart(this.$refs.canvas2D);
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
    // 更新坐标范围

    // 格式化用户输入

    input(inputs) {
      // 渲染图表
      this.chart.addInput(inputs);
      
    },

  }
};
</script>

<style scoped></style>
