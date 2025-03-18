<template>
    <div class="overflow-auto min-h-42 p-4">
        <div class="flex flex-col item-start w-full h-full gap-4">
            <div class="flex relative items-center">
                <h1 class="text-3xl absolute left-1/2 transform -translate-x-1/2">全局设置</h1>
                <button class="btn btn-soft ml-auto mr-4 btn-primary" @click="selfClose">
                    <icon type="close" />
                </button>
            </div>
            <div class="flex flex-row items-center justify-start">
                <p class="mr-4 text-2xl">坐标轴类型</p>
                <div class="flex items-center gap-2 text-xl">
                    <label class="label cursor-pointer gap-2">
                        <span class="label-text">线性</span>
                        <input type="radio" value="linear" name="radio-1" class="radio radio-primary"
                            v-model="chartType" @change="switchChartType" />
                    </label>
                    <label class="label cursor-pointer gap-2">
                        <span class="label-text">对数</span>
                        <input type="radio" value="log" name="radio-1" class="radio radio-primary"
                            v-model="chartType" @change="switchChartType" />
                    </label>
                </div>
            </div>
            <div class="flex flex-row item-center justify-start gap-2">
                <p class="mr-4 text-2xl">渲染范围</p>
                <input type="number" class="input w-20" v-model.number="minVal" @change="setRenderRange" @keyup.enter="setRenderRange"/>
                <p class="flex text-center justify-center items-center text-xl">< x <</p>
                <input type="number" class="input w-20" v-model.number="maxVal" @change="setRenderRange" @keyup.enter="setRenderRange"/>
            </div>
            <div class="flex flex-row items-center justify-start">
                <p class="mr-4 text-2xl">绘制函数阴影</p>
                <input type="checkbox" checked="checked" class="toggle toggle-primary" v-model="closed" @change="switchClosed"/>
            </div>
            <div class="flex flex-row items-center justify-start">
                <p class="mr-4 text-2xl">辅助虚线</p>
                <input type="checkbox" checked="checked" class="toggle toggle-primary" v-model="dash" @change="switchDash"/>
            </div>
            <div class="flex flex-row items-center justify-start">
                <p class="mr-4 text-2xl">辅助网格</p>
                <input type="checkbox" checked="checked" class="toggle toggle-primary" v-model="grid" @change="switchGrid"/>
            </div>
        </div>
    </div>
</template>

<script>
import icon from './icon.vue'


export default {
    components: {
        icon
    },
    data() {
        return {
            chartType: 'linear',
            closed: false,
            minVal: '',
            maxVal: '',
            dash: false,
            grid: true
        }
    },
    methods: {
        switchChartType() {
            this.$emit('switchChartType', this.chartType);
        },

        selfClose() {
            this.$emit('close');
        },

        switchClosed() {
            this.$emit('switchClosed', this.closed);
        },

        setRenderRange() {
            if (this.minVal >= this.maxVal && !(this.minVal == 0 && this.maxVal == 0)) {
                return;
            }
            let range;
            this.minVal == 0 && this.maxVal == 0 ? range = null : range = [this.minVal, this.maxVal];
            this.$emit('setRenderRange', range);
        },

        switchDash() {
            this.$emit('switchDash', this.dash);
        },

        switchGrid() {
            this.$emit('switchGrid', this.grid);
        }
    }
}
</script>

<style scoped></style>