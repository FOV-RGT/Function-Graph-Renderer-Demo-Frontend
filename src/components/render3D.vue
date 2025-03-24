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
        ...mapGetters(['is2D', 'GLTFfile', 'functionData_3D', 'Objectuuid']),
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

        async handleInput(input, index) {
            const uuid = await this.functionRenderer.renderFunction(input);
            const payload = {
                uuid,
                index
            }
            this.$store.commit('syncObjectuuid', payload)
        },

        async handleArrayInput(inputs, index = 0) {
            for (const input of inputs) {
                const uuid = await this.functionRenderer.renderFunction(input);
                const payload = {
                    uuid,
                    index
                }
                this.$store.commit('syncObjectuuid', payload)
                index++;
            }
        },

        delectObject(index) {
            const uuid = this.Objectuuid[index];
            this.sceneManager.delectObject(uuid);
        },

        setView(evt, zoomStep, moveStep) {
            this.sceneManager.setView(evt, zoomStep, moveStep);
        },

        setObjectColor(color, index) {
            const uuid = this.Objectuuid[index];
            this.sceneManager.setObjectColor(color, uuid);
        }
    }
};
</script>

<style scoped></style>