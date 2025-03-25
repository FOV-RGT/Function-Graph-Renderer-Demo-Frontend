<template>
    <div class="overflow-auto min-h-42 p-4 select-none">
        <div class="flex flex-col item-start w-full h-full gap-4">
            <div class="flex relative items-center">
                <h1 class="text-3xl absolute left-1/2 transform -translate-x-1/2">全局设置</h1>
                <button class="btn btn-soft ml-auto mr-1 btn-primary" @click="selfClose">
                    <icon type="close" />
                </button>
            </div>
            <div class="flex flex-row items-center justify-start">
                <p class="mr-4 text-2xl">坐标轴类型</p>
                <div class="flex items-center gap-2 text-xl">
                    <label class="label cursor-pointer gap-2">
                        <span class="label-text">线性</span>
                        <input type="radio" value="linear" name="radio-1" class="radio radio-primary"
                            v-model="userConfig.chartType" @change="updateUserConfig" />
                    </label>
                    <label class="label cursor-pointer gap-2">
                        <span class="label-text">对数</span>
                        <input type="radio" value="log" name="radio-1" class="radio radio-primary"
                            v-model="userConfig.chartType" @change="updateUserConfig" />
                    </label>
                </div>
            </div>
            <div class="flex flex-row item-center justify-start gap-2">
                <p class="mr-4 text-2xl">渲染范围</p>
                <input type="number" class="input w-20 input-xs self-center" v-model.number="minVal"
                    @change="setRenderRange" @keyup.enter="setRenderRange" />
                <p class="flex text-center justify-center items-center text-xl mb-1 text-base-content/70">
                    < x <</p>
                        <input type="number" class="input w-20 input-xs self-center" v-model.number="maxVal"
                            @change="setRenderRange" @keyup.enter="setRenderRange" />
            </div>
            <div class="flex flex-row items-center justify-start space-x-4">
                <div class="zoomFactorControl flex items-center justify-center">
                    <label class="text-2xl mr-1">缩放步长：</label>
                    <input type="number" v-model.number="userConfig.zoomFactor" min="0.01" max="1.00" step="0.01"
                        class="input input-xs w-16 text-center" @change="updateZoomFactor"
                        @keyup.enter="updateZoomFactor" />
                </div>
                <div class="moveStepControl flex items-center">
                    <label class="text-2xl mr-1">移动步长：</label>
                    <input type="number" v-model.number="userConfig.moveFactor" min="0.01" max="1.00" step="0.01"
                        class="input input-xs w-16 text-center" @change="updateMoveFactor"
                        @keyup.enter="updateMoveFactor" />
                </div>
            </div>
            <!-- <div class="flex flex-row items-center justify-start">
                <p class="mr-4 text-2xl">绘制函数阴影</p>
                <input type="checkbox" checked="checked" class="toggle toggle-primary" v-model="userConfig.closed"
                    @change="updateUserConfig" />
                <div class="warningCircle tooltip tooltip-warning tooltip-right ml-5" data-tip="该选项极其消耗性能">
                    <icon type="warningCircle" class="self-center text-warning" />
                </div>
            </div> -->
            <div class="flex flex-row items-center justify-start">
                <p class="mr-4 text-2xl">辅助虚线</p>
                <input type="checkbox" checked="checked" class="toggle toggle-primary" v-model="userConfig.dash"
                    @change="updateUserConfig" />
            </div>
            <div class="flex flex-row items-center justify-start">
                <p class="mr-4 text-2xl">辅助网格</p>
                <input type="checkbox" checked="checked" class="toggle toggle-primary" v-model="userConfig.grid"
                    @change="updateUserConfig" />
            </div>
            <div class="flex flex-row items-center justify-start ">
                <p class="mr-4 text-2xl">全局采样点数</p>
                <input type="number" 
                        v-model="nSamples" 
                        min="500" max="5000" step="1"
                        placeholder="500-5000"
                        class="input w-20 input-xs self-center" 
                        @change="updateAllSamples"
                        @keyup.enter="updateAllSamples" />
            </div>
        </div>
    </div>
</template>

<script>
import icon from './icon.vue'
import { clamp, deepClone } from '../assets/utils/componentUtils.js'
import { uploadUserConfig } from '../services/userService.js'
import { mapGetters } from 'vuex'


export default {
    components: {
        icon
    },
    data() {
        return {
            userConfig: {
                chartType: 'linear',
                // closed: false,
                range: null,
                dash: false,
                grid: true,
                zoomFactor: 0.5,
                moveFactor: 0.2,
                nSamples: ''// ，默认为空
            },
            minVal: '',
            maxVal: '',
        }
    },

    computed: {
    ...mapGetters('auth', ['remoteConfig', 'isAuthenticated']),
    ...mapGetters(['nSamples'])
    },

    mounted() {
        this.userConfig = deepClone(this.remoteConfig);
        this.minVal = this.userConfig.range ? this.userConfig.range[0] : '';
        this.maxVal = this.userConfig.range ? this.userConfig.range[1] : '';
    },

    methods: {
        selfClose() {
            this.$emit('close');
        },
        setRenderRange() {
            const validMin = typeof this.minVal === 'number' && !Number.isNaN(this.minVal);
            const validMax = typeof this.maxVal === 'number' && !Number.isNaN(this.maxVal);
            if (validMin && validMax) {
                if (this.minVal > this.maxVal) {
                    this.minVal = this.maxVal;
                }
                if (this.maxVal < this.minVal) {
                    this.maxVal = this.minVal;
                }
            }
            this.minVal != this.maxVal && validMin && validMax ? this.userConfig.range = [this.minVal, this.maxVal] : this.userConfig.range = null;
            this.updateUserConfig();
        },

        updateZoomFactor() {
            this.userConfig.zoomFactor = clamp(this.userConfig.zoomFactor, 0.01, 1.00);
            this.updateUserConfig();
        },

        updateMoveFactor() {
            this.userConfig.moveFactor = clamp(this.userConfig.moveFactor, 0.01, 1.00);
            this.updateUserConfig();
        },

        updateAllSamples() {
            if (this.nSamples === '' || isNaN(Number(this.nSamples))) {
                return;}
            const validSamples = utils.clamp(Number(this.nSamples), 500, 5000);
            this.nSamples = validSamples;
            this.updateUserConfig();
            
        },

        async updateUserConfig() {
            
            if (!this.isAuthenticated) return;
            const { success, error } = await uploadUserConfig(this.userConfig);
            if (success) {
                console.log('设置已保存');
            } else {
                console.log(error);
            }
        }
    }
}
</script>

<style scoped>
/* .warningCircle .iconfont {
    font-size: 1.5em;
}

.warningCircle::before {
    font-size: large;
} */
</style>
