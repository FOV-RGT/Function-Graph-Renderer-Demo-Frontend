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
        ...mapGetters(['is2D', 'GLTFfile', 'Objectuuid']),
        ...mapGetters('auth', ['lockCameraFocus']),
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
        GLTFfile(newVal) {
            if (newVal) {
                this.sceneManager.loadGLTFModel(newVal);
            }
        }
    },
    mounted() {
        this.init();
        // this.handleArrayInput(this.functionData_3D);
    },
    beforeUnmount() {
        this.sceneManager.dispose();
    },
    methods: {
        init() {
            const container = this.$refs.canvas3D;
            this.sceneManager = new SceneManager(container);
            this.functionRenderer = new FunctionRenderer(this.sceneManager);
            this.sceneManager.functionRenderer = this.functionRenderer;
        },

        fuckResize() {
            this.sceneManager.resize();
        },

        async handleInput(input, index) {
            if (!input.fn) return;
            this.delectObject(index);
            const uuid = await this.functionRenderer.renderFunction(input);
            const payload = {
                uuid,
                index
            }
            this.$store.commit('syncObjectuuid', payload)
        },

        async handleArrayInput(inputs, index = 0) {
            for (const input of inputs) {
                if (!input.fn) {
                    index++;
                    continue
                };
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
            this.sceneManager.setView(evt, zoomStep, moveStep, this.lockCameraFocus);
        },

        setObjectColor(color, index) {
            const uuid = this.Objectuuid[index];
            this.sceneManager.setObjectColor(color, uuid);
        },

        switchObjectVisible(visible, index) {
            const uuid = this.Objectuuid[index];
            this.sceneManager.switchObjectVisible(visible, uuid);
            const payload = {
                visible,
                index
            }
            this.$store.commit('storeObjectVisible', payload);
        }
    }
};
</script>

<style scoped></style>