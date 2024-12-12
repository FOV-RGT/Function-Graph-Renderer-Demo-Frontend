<template>
    <div class="home">
        <div class="top">
            <h1 style="margin-bottom: 0;">函数图形渲染程序<sub style="font-size: 0.6em;">demo v{{ packageVersion }}</sub></h1>
            <div class="buttonGroup">
                <var-button @click="showTwoDPlot" text outline type="primary">
                    <span>二维函数图形绘制</span>
                </var-button>
                <var-button @click="showThreeDPlot" text outline type="primary">
                    <span>三维函数图形绘制</span>
                </var-button>
            </div>
        </div>
    </div>
    <div class="plotCompoents">
        <div v-show="showTwoD" class="component-container">
            <TwoDPlotComponent />
        </div>
        <div v-show="!showTwoD" class="component-container">
            <ThreeDPlotComponent />
        </div>
    </div>
</template>

<script>
import packageJson from '../../package.json';
import TwoDPlotComponent from '../components/Plot2D.vue';
import ThreeDPlotComponent from '../components/Plot3D.vue';
import { mapActions } from "vuex";

export default {
    name: 'home',
    components: {
        TwoDPlotComponent,
        ThreeDPlotComponent
    },
    data() {
        return {
            packageVersion: packageJson.version,
            showTwoD: true
        };
    },
    mounted() {
        
    },
    methods: {
        showTwoDPlot() {
            this.showTwoD = true;
            this.$store.commit('toggleSwitch3D');
        },
        showThreeDPlot() {
            this.showTwoD = false;
            this.resetRenderer();
        },
        ...mapActions(['resetRenderer']),
    }
};
</script>

<style scoped>
.top h1 {
    background: linear-gradient(60deg, #2b2e4a, #423268, #623080, #842790, #a51d96, #c11b8f, #d72c78, #e84545);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    flex: 1;
}

.home {
    position: absolute;
    display: flex;
    margin: 0;
    letter-spacing: 0.1em;
    width: 100%;
    height: 10%;
}

.top {
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.buttonGroup {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 1em;
    height: 35%;
}

.buttonGroup .var-button {
    user-select: none;
    position: relative;
    border-radius: 0.5em;
    border: rgb(48, 135, 185) solid 0.1em;
    height: 100%;
    width: 14em;
}

.buttonGroup .var-button span {
    letter-spacing: 0.05em;
    text-decoration: none;
    font-size: 1.2em;
    color: rgb(48, 135, 185);
}

.buttonGroup.var-button.active {
    font-weight: bold;
    font-size: 1.4em;
}

.plotCompoents {
    position: absolute;
    height: 90%;
    width: 100%;
    top: 10%;
}

.plotCompoents .component-container {
    position: relative;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}
</style>