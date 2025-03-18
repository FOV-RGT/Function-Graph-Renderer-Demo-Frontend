<template>
    <div class="overflow-auto min-h-42 p-4">
        <div class="flex flex-col item-start w-full h-full gap-4">
            <div class="flex relative items-center">
                <h1 class="text-2xl absolute left-1/2 transform -translate-x-1/2">调整窗口</h1>
                <button class="btn btn-soft ml-auto mr-4 btn-primary">
                    <icon type="close" />
                </button>
            </div>
            <div class="flex flex-row items-center justify-start shrink-1">
                <p>对数型图表</p>
                <input type="checkbox" checked="checked" class="checkbox"
                v-model="logType" @change="switchChartType"/>
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
            logType: false
        }
    },
    methods: {
        switchChartType() {
            let type = this.logType ? 'log' : 'linear';
            this.$emit('switchChartType', type);
        }
    }
}
</script>

<style scoped></style>