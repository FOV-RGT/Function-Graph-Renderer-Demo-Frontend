<template>
    <div class="buttonsGroup join overflow-hidden h-full">
        <!-- <svg class="svgButtonsGroup" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513.56 394.43" width="100px"
            height="100px">
            <g id="_图层_1-2" data-name="图层 1">
                <polygon class="cls-1"
                    points="225.69 5.23 505.11 271.11 284.52 389.29 19.81 359.74 5.11 182.48 93.34 20 225.69 5.23" />
                <polygon
                    points="34.09 324.07 48.58 179.14 106.56 48.71 222.5 34.21 468.87 266.1 255.11 359.69 34.09 324.07" />
            </g>
        </svg> -->
        <button class="btn btn-soft btn-primary btn-xl h-full w-[clamp(0.8em,2.5vw,2.5em)]
                    join-item rounded-l-none pl-4 pr-4" @click="setView('reset')">
            <icon type="aim" />
        </button>
        <button class="btn btn-soft btn-primary btn-xl h-full w-[clamp(0.8em,2.5vw,2.5em)]
                    join-item pl-4 pr-4" @mousedown="startSetView('zoomIn')" @mouseup="endSetView"
            @mouseleave="endSetView">
            <icon type="z_in" />
        </button>
        <button class="btn btn-soft btn-primary btn-xl h-full w-[clamp(0.8em,2.5vw,2.5em)]
                    join-item pl-4 pr-4" @mousedown="startSetView('zoomOut')" @mouseup="endSetView"
            @mouseleave="endSetView">
            <icon type="z_out" />
        </button>
        <button class="btn btn-soft btn-primary btn-xl h-full w-[clamp(0.8em,2.5vw,2.5em)]
                    join-item pl-4 pr-4" @mousedown="startSetView('moveUp')" @mouseup="endSetView"
            @mouseleave="endSetView">
            <icon type="arrowUp" />
        </button>
        <button class="btn btn-soft btn-primary btn-xl h-full w-[clamp(0.8em,2.5vw,2.5em)]
                    join-item pl-4 pr-4" @mousedown="startSetView('moveDown')" @mouseup="endSetView"
            @mouseleave="endSetView">
            <icon type="arrowDown" />
        </button>
        <button class="btn btn-soft btn-primary btn-xl h-full w-[clamp(0.8em,2.5vw,2.5em)]
                    join-item pl-4 pr-4" @mousedown="startSetView('moveLeft')" @mouseup="endSetView"
            @mouseleave="endSetView">
            <icon type="arrowLeft" />
        </button>
        <button class="btn btn-soft btn-primary btn-xl h-full w-[clamp(0.8em,2.5vw,2.5em)]
                    join-item rounded-r-none pl-4 pr-4" @mousedown="startSetView('moveRight')" @mouseup="endSetView"
            @mouseleave="endSetView">
            <icon type="arrowRight" />
        </button>
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
            viewTimeOut: null,
            viewInterval: null
        }
    },
    methods: {
        startSetView(evt) {
            this.setView(evt);
            this.viewTimeOut = setTimeout(() => {
                this.viewInterval = requestAnimationFrame(() => this._runSetView(evt));
            }, 150);
        },

        _runSetView(evt) {
            this.setView(evt);
            // 请求下一帧
            this.viewInterval = requestAnimationFrame(() => this._runSetView(evt));
        },

        endSetView() {
            clearTimeout(this.viewTimeOut);
            cancelAnimationFrame(this.viewInterval);
            this.viewTimeOut = null;
            this.viewInterval = null;
        },

        setView(evt) {
            this.$emit('setView', evt);
        }
    }
}
</script>

<style scoped>
.buttonsGroup .iconfont {
    font-size: clamp(0.8em, 1.5vw, 1.5em);
}

.svgButtonsGroup .cls-1 {
    fill: #fff;
    stroke: #000;
    stroke-miterlimit: 10;
    stroke-width: 10px;
}
</style>