<template>
    <div class="overflow-hidden h-full flex flex-row justify-end items-center gap-8 select-none pl-2">
        <div v-if="!is2D" class="h-2/3">
            <input type="file" ref="GLTFFileInput" accept=".glb" class="hidden" @change="handleFileSelected" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 318.58 184.13" class="import h-full cursor-pointer" @click="triggerFileSelect">
                <path class="cls-5"
                    d="m92.92,180.94c52.39-6.4,104.78-12.79,157.17-19.19,22.83-35.6,45.66-71.2,68.49-106.8L204.74,2.75C139.54,24.76,74.35,46.77,9.15,68.78c27.92,37.39,55.85,74.77,83.77,112.16Z" />
                <path class="cls-5"
                    d="m99.83,176.22c42.21-1.46,84.42-2.92,126.64-4.38,23.06-36.69,46.12-73.38,69.18-110.06-43.19-14.05-86.37-28.09-129.56-42.14-39.42,11.91-78.85,23.81-118.27,35.72,17.34,40.29,34.68,80.58,52.01,120.87Z" />
                <polygon class="cls-5"
                    points="4.49 69.98 181.22 19.04 286.88 56.78 235.31 166.21 97.98 180.03 4.49 69.98" />
                <path class="cls-2"
                    d="m84.66,178.73c52.39-6.4,104.78-12.79,157.17-19.19,22.83-35.6,45.66-71.2,68.49-106.8L196.48.54C131.28,22.55,66.08,44.56.88,66.57c27.92,37.39,55.85,74.77,83.77,112.16Z" />
                <path class="cls-10"
                    d="m22.83,59.7c46.01-13.72,92.03-27.43,138.04-41.15.31.2.62.4.93.6l17.62-5.03c34.72,12.43,69.44,24.86,104.15,37.29-.72,1.96-1.44,3.92-2.16,5.88,3.32,1.19,6.63,2.38,9.95,3.56-2.62,3.98-5.24,7.97-7.87,11.95,3.85,1.24,7.7,2.49,11.55,3.73-2.93,3.75-5.86,7.5-8.79,11.26-87.81-9.37-175.62-18.73-263.43-28.1Z" />
                <polygon class="cls-1"
                    points=".88 66.57 177.61 15.63 283.27 53.37 231.7 162.8 94.37 176.62 .88 66.57" />
                <path class="cls-1"
                    d="m94.37,176.62c42.21-1.46,84.42-2.92,126.64-4.38,23.06-36.69,46.12-73.38,69.18-110.06-43.19-14.05-86.37-28.09-129.56-42.14-39.42,11.91-78.85,23.81-118.27,35.72,17.34,40.29,34.68,80.58,52.01,120.87Z" />
                <path class="cls-3"
                    d="m.88,66.57c12.43-3.23,41-10.67,53.43-13.91,32.81-8.55,65.62-17.12,98.42-25.71,47.5,17.19,95,34.38,142.49,51.57l-42.14,63.52-129.24,28.15-61.33,13.36L.88,66.57Z" />
                <path class="cls-4"
                    d="m163.26,20.3c1.28-.38,2.56-.75,3.83-1.12,37.88,12.82,75.76,25.64,113.65,38.47-.15.27-.3.53-.45.8-39.01-12.71-78.02-25.43-117.03-38.14Z" />
                <path class="cls-4"
                    d="m78.43,45.8c25.72-7,51.45-14,77.17-21,42.66,15.64,85.32,31.28,127.98,46.91l-1.02,1.63c-43.21-15.64-86.43-31.28-129.64-46.91-24.83,6.46-49.66,12.91-74.49,19.37Z" />
                <polygon class="cls-4"
                    points="82.96 92.21 114.13 98.36 180.9 111.55 173.34 123.61 100 140.65 78.53 104.65 82.96 92.21" />
                <path class="cls-9"
                    d="m139.26,75.74c-8.06,6.87-16.11,13.74-24.17,20.6-.7.6-1.4,1.2-2.1,1.79,18.89,3.73,37.77,7.46,56.66,11.19.21-.75.42-1.5.63-2.25,2.3-8.15,4.59-16.29,6.89-24.44-10.7.83-21.4,1.66-32.09,2.49l-5.82-9.38Z" />
                <polygon class="cls-13" points="114.64 96.72 170.09 107.91 169.65 109.32 112.99 98.13 114.64 96.72" />
                <path class="cls-8"
                    d="m81.79,110.12l18.69,2.43s36.72,13.21,39.02,13.26,18.62.96,20.25.29,14.18-3.43,14.18-3.43l-.59.94-73.34,17.04-18.21-30.53Z" />
                <path class="cls-8"
                    d="m146.82,88.18c-.58-1.02-1.16-2.04-1.74-3.06l32.09-2.25c-10.12,1.77-20.23,3.54-30.35,5.31Z" />
                <polygon class="cls-6" points="116.21 95.39 170.09 107.59 170.09 107.91 114.64 96.72 116.21 95.39" />
                <polygon class="cls-6" points="146.29 87.25 177.17 82.87 146.82 88.18 146.29 87.25" />
                <polygon class="cls-11" points="154.46 104.76 173.09 96.86 172.61 98.68 155.28 104.92 154.46 104.76" />
                <polygon class="cls-7" points="145.08 104.47 175.26 89.64 174.43 92.21 145.93 104.68 145.08 104.47" />
                <path class="cls-12"
                    d="m162.56,90.64c.19,0,1.63.06,1.69.45.04.25-.53.4-1.09,1.15,0,0-.25.34-.47.86-.64,1.52-.02,4.23,1.65,5.97.5.52.79.63.89.67,1.57.57,3.87-1.13,3.73-2.17-.08-.61-.97-.9-.89-1.05.08-.15,1.06-.03,1.47.57.44.65.03,1.6-.22,2.17-1.2,2.69-3.9,3.9-4.02,3.96-2.7,1.17-5.05.42-6.45-.03-.65-.21-1.2-.48-1.37-.99-.23-.71.37-1.57.51-1.53.13.04-.22.74.1,1.18.58.8,3.18.51,4.09-.93.2-.31.3-.66.35-1.34.15-2.04-.25-5.64-1.98-6.19-.31-.1-.68-.11-1.85-.41-.82-.22-.99-.31-1.02-.45-.1-.45,1.38-1.12,1.66-1.24.69-.31,1.8-.69,3.22-.64Z" />
            </svg>
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
        <teleport to='body'>
            <div v-if="showProgress" class="fixed inset-0 z-40 select-none w-screen h-screen">
                <div class="fixed inset-0 z-40 select-none">
                    <div class="absolute inset-0 bg-black/50"></div>
                </div>
                <progress
                    class="progress progress-warning w-56 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
                    :value="GLTFLoadProgress" max="100"></progress>
            </div>
        </teleport>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';



export default {
    data() {
        return {
            viewTimeOut: null,
            viewInterval: null,
        }
    },
    computed: {
        ...mapGetters(['is2D', 'GLTFLoadProgress', 'GLTFLoadStatus']),
        showProgress() {
            return this.GLTFLoadStatus === 'loading';
        }
    },
    watch: {
        GLTFLoadStatus(newVal) {
            if (newVal === 'success') {
                const message = {
                    head: '模型加载完成',
                    target: 'body',
                    time: 4000,
                    allowWrap: true
                }
                this.$emit('addMessage', message);
            } else if (newVal === 'error') {
                const message = {
                    head: '模型加载失败',
                    messages: ['请检查文件格式或网络连接'],
                    target: 'body',
                    time: 4000,
                    allowWrap: true
                }
                this.$emit('addMessage', message);
            }
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
        },

        triggerFileSelect() {
            this.$refs.GLTFFileInput.click();
        },

        handleFileSelected(event) {
            const file = event.target.files[0];
            if (!file) return;
            // 验证文件类型
            const validTypes = ['.glb'];
            const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
            if (!validTypes.includes(fileExtension)) {
                alert('请选择.glb');
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