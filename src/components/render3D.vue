<template>
    <div style="width: 100%;height: 100%;" ref="canvas3D"></div>
</template>

<script>
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
        ...mapGetters(['is2D', 'GLTFfile', 'functionData_3D']),
    },
    watch: {
        is2D: {
            handler(newVal) {
                if (newVal) {
                    this.$nextTick(() => {
                        this.sceneManager.resize();
                    });
                }
            }
        },
        GLTFfile: {
            handler(newVal) {
                if (newVal) {
                    this.sceneManager.loadGLTFModel(newVal);
                }
            }
        },
        functionData_3D: {
            handler(newVal) {
                if (newVal && true) {
                    this.handleArrayInput(newVal);
                }
            },
        }
    },
    mounted() {
        this.init();
        this.handleArrayInput(this.functionData_3D);
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

        handleInput(input) {
            this.functionRenderer.renderFunction(input);
        },

        handleArrayInput(inputs) {
            inputs.forEach(input => {
                this.functionRenderer.renderFunction(input);
            });
        },

        setView(evt, zoomStep, moveStep) {
            this.sceneManager.setView(evt, zoomStep, moveStep);
        }
    }
};
</script>

<style scoped></style>