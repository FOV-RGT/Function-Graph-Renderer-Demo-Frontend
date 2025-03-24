<template>
    <div class="overflow-hidden h-full flex flex-row justify-end items-center gap-8 select-none pl-2">
        <div v-if="!is2D" class="h-2/3">
            <input type="file" ref="GLTFFileInput" accept=".glb,.gltf" class="hidden"
                @change="handleFileSelected" />
            <button class="btn btn-soft btn-info btn-xl text-xl h-full" @click="triggerFileSelect">
                上传GLTF|GLB模型
            </button>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 163 176" class="icon1 h-5/7">
            <polygon class="cls-2" points="0 0 163 16 151 176 9 166 0 0" />
            <g class="button" @click="setView('reset')">
                <path class="cls-1" d="m29,23l116,11-9,121s-113.04-7.25-113.5-7.5,6.5-124.5,6.5-124.5Z" />
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 322 179.98" class="icon2 h-2/3">
            <g>
                <polygon class="cls-2"
                    points="120 17.98 127 34.98 126.93 34.98 0 32.98 14.27 179.98 179.83 179.98 181.46 166.12 181.59 166.1 322 150.98 322 0 120 17.98" />
                <polygon class="cls-1"
                    points="146 39.98 140.04 40.93 141 46.98 138.82 46.93 162 150.98 163 150.91 163 146.03 166.36 146.06 146 39.98" />
            </g>
            <g class="button" @mousedown="startSetView('zoomOut')" @mouseup="endSetView" @mouseleave="endSetView">
                <polygon class="cls-1"
                    points="138 27.98 141 46.98 140.97 46.98 163.01 146.03 173.25 146.1 305 146.98 307 14.98 138 27.98" />
                <polygon class="cls-3"
                    points="193.28 80.57 207.26 78.53 235.25 78.53 249.23 80.55 249.3 86.49 235.32 88.53 207.26 88.57 193.21 86.52 193.28 80.57" />
            </g>
            <g class="button" @mousedown="startSetView('zoomIn')" @mouseup="endSetView" @mouseleave="endSetView">
                <polygon class="cls-1"
                    points="131.84 46.76 15 43.98 24.66 166.12 163 157.98 163 146.03 163.01 146.03 140.97 46.98 131.84 46.76" />
                <polygon class="cls-3"
                    points="64.28 103.43 85.04 100.4 88.08 79.57 93.75 79.64 96.77 100.36 117.65 103.41 117.71 109.08 96.82 112.13 93.77 133.01 88.1 133.07 85.07 112.15 64.21 109.1 64.28 103.43" />
            </g>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 543 179.81" class="icon3 h-4/5">
            <g id="_图层_5" data-name="图层 5">
                <polygon class="cls-2"
                    points="380.4 0 384.5 13.31 251.5 26.31 260.5 9.31 115.9 15.54 116.68 32.88 0 30.81 10 179.81 128.31 170.04 127.69 154.9 260 159.81 259.5 141.31 380.4 140.5 380.4 113.12 543 131.81 532 10.81 380.4 0" />
                <polygon class="cls-1" points="138.37 141.09 124.5 140.33 126.17 43.82 135.63 43.82 138.37 141.09" />
                <polygon class="cls-1" points="257.77 34.69 248.18 35.55 248.18 130.87 257.77 130.65 257.77 34.69" />
                <polygon class="cls-1" points="387.03 23.17 371.42 24.56 374.84 102.34 387.03 103.47 387.03 23.17" />
            </g>
            <g id="_图层_8" data-name="图层 8">
                <g class="button" @mousedown="startSetView('moveUp')" @mouseup="endSetView" @mouseleave="endSetView">
                    <polygon class="cls-1"
                        points="17.17 43.82 23.96 163.31 119.97 151.3 119.82 140.07 129.58 140.61 132.45 43.82 17.17 43.82" />
                    <polygon class="cls-2"
                        points="72.55 74.19 45 101.81 63 97.81 64 128.81 80.93 128.81 83.44 97.81 100 101.81 72.55 74.19" />
                </g>
                <g class="button" @mousedown="startSetView('moveLeft')" @mouseup="endSetView" @mouseleave="endSetView">
                    <polygon class="cls-1"
                        points="253.5 35.07 252.07 130.87 363.82 126.52 363.82 101.32 374.84 102.34 381.32 23.67 253.5 35.07" />
                    <polygon class="cls-2"
                        points="289.38 77.45 317 105 313 87 344 86 344 69.07 313 66.56 317 50 289.38 77.45" />
                </g>
                <g class="button" @mousedown="startSetView('moveRight')" @mouseup="endSetView" @mouseleave="endSetView">
                    <polygon class="cls-1"
                        points="522.13 19.52 390.44 10.81 395.29 22.43 381.32 23.67 374.84 102.34 526 116.35 522.13 19.52" />
                    <polygon class="cls-2"
                        points="477.62 63.3 450 90.85 454 72.85 423 71.85 423 54.92 454 52.42 450 35.85 477.62 63.3" />
                </g>
                <g class="button" @mousedown="startSetView('moveDown')" @mouseup="endSetView" @mouseleave="endSetView">
                    <polygon class="cls-1"
                        points="239.4 36.33 246.11 19.61 136.28 25.82 135.63 43.82 132.45 43.82 129.58 140.61 251.98 147.33 251.98 136.45 251.97 137.66 251.98 136.45 251.98 130.87 252.07 130.87 253.5 35.07 239.4 36.33" />
                    <polygon class="cls-2"
                        points="191.08 110.43 218.64 82.81 200.64 86.81 199.64 55.81 182.7 55.81 180.2 86.81 163.64 82.81 191.08 110.43" />
                </g>
            </g>
        </svg>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
    data() {
        return {
            viewTimeOut: null,
            viewInterval: null
        }
    },
    computed: {
        ...mapGetters(['is2D']),
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
        },

        triggerFileSelect() {
            this.$refs.GLTFFileInput.click();
        },

        handleFileSelected(event) {
        const file = event.target.files[0];
        if (!file) return;
        // 验证文件类型
        const validTypes = ['.glb', '.gltf'];
        const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
        if (!validTypes.includes(fileExtension)) {
            alert('请选择.glb或.gltf格式的文件');
            return;
        }
        // 调用SceneManager的setGLTF方法
        this.$store.commit('uploadGLTF', file);
        // 重置文件输入框，允许重复选择相同文件
        event.target.value = '';
    }
    }
}
</script>

<style scoped>
@import url('../assets/componentCss/adjustButtons.css');
</style>