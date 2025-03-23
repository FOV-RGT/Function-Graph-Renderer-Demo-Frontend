<template>
    <div style="width: 100%;height: 100%;" ref="canvas3D"></div>
</template>

<script>
import { toRaw } from "vue";
import { mapGetters } from "vuex";
import SceneManager from '../assets/sceneManager.js';
import FunctionRenderer from '../assets/functionRender.js';

export default {
    name: 'Plot3D',
    data() {
        return {
            sceneManager: null,
            functionRenderer: null
        };
    },
    computed: {
        ...mapGetters(['is2D', 'GLTFfile']),
    },
    watch: {
        is2D(newVal) {
            if (newVal) {
                this.$nextTick(() => {
                    this.sceneManager.resize();
                });
            }
        },
        GLTFfile(newVal) {
            if (newVal) {
                this.sceneManager.loadGLTFModel(newVal);
            }
        }
    },
    mounted() {
        this.init();
    },
    beforeUnmount() {
        this.sceneManager.dispose();
    },
    methods: {
        init() {
            const container = this.$refs.canvas3D;
            this.sceneManager = new SceneManager(container);
            this.functionRenderer = new FunctionRenderer(this.sceneManager);
        },

        fuckResize() {
            this.sceneManager.resize();
        },

        formatInput(inputs, index) {
            // 每次用户输入函数，清除旧的渲染
            this.sceneManager.clearScene();
            // 格式化输入并保存到store
            const fn = inputs.map(evt => ({ fn: evt }));
            const rawData = toRaw(this.$store.state.functionData_3D);
            const newFunctionData = [...rawData];
            newFunctionData.splice(index, 1, ...fn);
            this.$store.commit('syncData', {
                data: newFunctionData,
                is2D: false,
            });
            console.log(newFunctionData);
            // 渲染函数
            newFunctionData.forEach(input => {
                this.functionRenderer.renderFunction(input.fn);
            });
        },

        setView(evt, zoomStep, moveStep) {
            this.sceneManager.setView(evt, zoomStep, moveStep);
        }
    }
};
</script>

<style scoped></style>