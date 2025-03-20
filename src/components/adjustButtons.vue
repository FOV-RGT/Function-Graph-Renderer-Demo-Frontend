<template>
    <div class="svgButtonsGroup overflow-hidden h-full flex flex-row justify-end items-center gap-8">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 163 176" class="icon1 w-16">
            <polygon class="cls-2 cursor-pointer" points="0 0 163 16 151 176 9 166 0 0" @click="setView('reset')" />
            <path class="cls-1 cursor-pointer" d="m29,23l116,11-9,121s-113.04-7.25-113.5-7.5,6.5-124.5,6.5-124.5Z"
                @click="setView('reset')" />
            <g class="cursor-pointer" @click="setView('reset')">
                <path class="cls-2"
                    d="m114.82,84.92v6.42h-10.59l-.22-.03c.14-1.04.22-2.11.22-3.19s-.08-2.15-.22-3.2h10.81Z" />
                <path class="cls-2"
                    d="m83.8,64.87c10.47,1.35,18.78,9.6,20.21,20.05.14,1.04.22,2.11.22,3.2s-.07,2.15-.22,3.19c-1.45,10.65-10.06,19.03-20.82,20.12-.79.08-1.59.12-2.4.12-1.11,0-2.19-.08-3.26-.23-10.38-1.44-18.59-9.69-19.97-20.08-.13-1.02-.2-2.06-.2-3.12s.07-2.1.2-3.12c1.38-10.4,9.59-18.64,19.97-20.08,1.07-.15,2.15-.23,3.26-.23,1.02,0,2.02.06,3.01.19Zm14.86,23.67c0-10.01-8.11-18.12-18.12-18.12s-18.12,8.11-18.12,18.12,8.11,18.12,18.12,18.12,18.12-8.11,18.12-18.12Z" />
                <circle class="cls-2" cx="80.9" cy="88.18" r="9.15" />
                <path class="cls-2"
                    d="m83.8,111.55v9.45h-6.27v-9.68c1.07.15,2.15.23,3.26.23.81,0,1.61-.04,2.4-.12l.61.12Z" />
                <path class="cls-2"
                    d="m83.8,55.54v9.33c-.99-.13-1.99-.19-3.01-.19-1.11,0-2.19.08-3.26.23v-9.36h6.27Z" />
                <path class="cls-2" d="m48.12,84.99h9.45c-.13,1.02-.2,2.06-.2,3.12s.07,2.1.2,3.12l-9.31.17-.14-6.42Z" />
            </g>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 322 179.98" class="icon2 w-30">
            <g>
                <polygon class="cls-2"
                    points="120 17.98 127 34.98 126.93 34.98 0 32.98 14.27 179.98 179.83 179.98 181.46 166.12 181.59 166.1 322 150.98 322 0 120 17.98" />
                <polygon class="cls-1"
                    points="146 39.98 140.04 40.93 141 46.98 138.82 46.93 162 150.98 163 150.91 163 146.03 166.36 146.06 146 39.98" />
            </g>
            <g class="cursor-pointer" @mousedown="startSetView('zoomOut')" @mouseup="endSetView" @mouseleave="endSetView">
                <polygon class="cls-1"
                    points="138 27.98 141 46.98 140.97 46.98 163.01 146.03 173.25 146.1 305 146.98 307 14.98 138 27.98" />
                <polygon class="cls-3"
                    points="193.28 80.57 207.26 78.53 235.25 78.53 249.23 80.55 249.3 86.49 235.32 88.53 207.26 88.57 193.21 86.52 193.28 80.57" />
            </g>
            <g class="cursor-pointer" @mousedown="startSetView('zoomIn')" @mouseup="endSetView" @mouseleave="endSetView">
                <polygon class="cls-1"
                    points="131.84 46.76 15 43.98 24.66 166.12 163 157.98 163 146.03 163.01 146.03 140.97 46.98 131.84 46.76" />
                <polygon class="cls-3"
                    points="64.28 103.43 85.04 100.4 88.08 79.57 93.75 79.64 96.77 100.36 117.65 103.41 117.71 109.08 96.82 112.13 93.77 133.01 88.1 133.07 85.07 112.15 64.21 109.1 64.28 103.43" />
            </g>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 566 273.5" class="icon3 w-45">
            <g>
                <polygon class="cls-2"
                    points="566 11 374.33 .3 369 0 376 38.17 306 49 311.93 38.17 295.68 38.17 125 38.17 125 67 124.98 67 0 75 10.5 273.5 172.5 270.5 174 231 174.03 231 281.67 214.76 300 212 298 200 433.21 174.65 442 173 439 158 566 142.51 566 11" />
                <g>
                    <polygon class="cls-1" points="131.7 79.05 125.03 79.67 163.82 213.09 174.2 211.49 131.7 79.05" />
                    <polygon class="cls-1"
                        points="293.54 58.49 285.5 58.67 276.5 180.67 282.21 180.98 282 176.37 291.82 175.16 301.61 62.02 293.54 63.79 293.54 58.49" />
                    <polygon class="cls-1"
                        points="384.91 43.68 423 150.17 423 142 426.29 141.71 388 33.67 388 43 384.91 43.68" />
                </g>
            </g>
            <g>
                <g class="cursor-pointer" @mousedown="startSetView('moveDown')" @mouseup="endSetView"
                @mouseleave="endSetView">
                    <polygon class="cls-1"
                        points="293.54 63.79 293.54 54.64 143 54.64 143 78 128.66 79.33 168.46 212.38 282.82 194.67 282 176.37 284.74 176.03 293.65 63.77 293.54 63.79" />
                    <polygon class="cls-3"
                        points="199.51 98.67 196.33 139.94 210.14 142.94 222.34 140.29 220.77 98.67 199.51 98.67" />
                    <polygon class="cls-3"
                        points="175.35 135.39 210.14 170.65 244.92 135.39 210.14 142.94 196.33 139.94 175.35 135.39" />
                </g>
                <g class="cursor-pointer" @mousedown="startSetView('moveRight')" @mouseup="endSetView">
                    <polygon class="cls-1"
                        points="551.64 131 546.15 18.94 388 18.94 388 40.77 423 144.41 423 142 551.64 131" />
                    <polygon class="cls-3"
                        points="433.5 70.88 474.77 67.7 477.77 81.5 475.12 93.71 433.5 92.14 433.5 70.88" />
                    <polygon class="cls-3"
                        points="470.22 46.72 505.48 81.51 470.22 116.28 477.77 81.5 474.77 67.7 470.22 46.72" />
                </g>
                <g class="cursor-pointer" @mousedown="startSetView('moveLeft')" @mouseup="endSetView"
                @mouseleave="endSetView">
                    <polygon class="cls-1"
                        points="388 43 293.65 63.77 284.74 176.03 423 159 423 144.41 388 40.77 388 43" />
                    <polygon class="cls-3"
                        points="352.78 143.48 317.52 108.69 352.78 73.91 345.23 108.7 348.23 122.5 352.78 143.48" />
                    <polygon class="cls-3"
                        points="389.5 119.32 348.23 122.5 345.23 108.7 347.88 96.49 389.5 98.06 389.5 119.32" />
                </g>
                <g class="cursor-pointer" @mousedown="startSetView('moveUp')" @mouseup="endSetView"
                @mouseleave="endSetView">
                    <polygon class="cls-1"
                        points="14 90 32.5 259.5 158.5 254.5 158 214 168.46 212.38 128.66 79.33 14 90" />
                    <polygon class="cls-3"
                        points="52.23 169.95 87.01 134.69 121.79 169.95 87.01 162.4 73.2 165.4 52.23 169.95" />
                    <polygon class="cls-3"
                        points="76.38 206.67 73.2 165.4 87.01 162.4 99.21 165.05 97.64 206.67 76.38 206.67" />
                </g>
            </g>
        </svg>
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
@import url('../assets/componentCss/adjustButtons.css');
</style>