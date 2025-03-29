<template>
    <div style="width: 100%;height: 100%;" ref="canvas2D"></div>
</template>

<script>
import { chartInstance } from '../assets/utils/chartSetter';
import { clamp } from '../assets/utils/componentUtils.js'; 

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
        // console.log("图表实例开始挂载");
        this.chartInstance = new chartInstance(this.$refs.canvas2D);
    },
    beforeUnmount() {
        // console.log("销毁图表实例");
        this.chartInstance.destroyInstance();
    },
    computed: {

    },
    watch: {

    },
    methods: {
        // 重置视图
        setView(evt, zoomStep, moveStep) {
            switch (evt) {
                case 'reset':
                    // console.log("触发:重置范围");
                    this.chartInstance.resetView();
                    break;
                case 'zoomIn':
                case 'zoomOut':
                    // console.log(`触发:${evt === 'zoomIn' ? '放大' : '缩小'}范围`);
                    this.chartInstance.zoomView(evt, zoomStep);
                    break;
                case 'moveLeft':
                case 'moveRight':
                case 'moveUp':
                case 'moveDown':
                    // console.log(`触发:${evt}视图`);
                    this.chartInstance.moveView(evt, moveStep);
                    break;
                default:
                    break;
            }
        },

        // 更新图表实例的缩放因子
        updateZoomFactor(zoomStep) {
            this.chartInstance.setZoomFactor(zoomStep);
        },

        //更新图表实例的移动因子
        updateMoveFactor(moveStep) {
            this.chartInstance.setMoveFactor(moveStep);
        },

        fuckRender(data) {
            this.chartInstance.setFunction(data);
        },

        fuckResize() {
            this.chartInstance.resize(this.$refs.canvas2D);
        },

        // 更新采样点数
        updateSamplePoints(samples, index) {
            if (!this.chartInstance) return;
            try {
                const validSamples = clamp(Number(samples), 500, 5000);
                this.chartInstance.setSamplePoints(validSamples, index);
            } catch (error) {
                // console.error("采样点数更新失败");
            }
        },

        switchChartType(type) {
            this.chartInstance.switchChartType(type);
        },

        switchDash(dash) {
            this.chartInstance.switchDash(dash);
        },

        switchGrid(grid) {
            this.chartInstance.switchGrid(grid);
        }
    }
};
</script>

<style>
@import url('../assets/componentCss/render2D.css');
</style>
