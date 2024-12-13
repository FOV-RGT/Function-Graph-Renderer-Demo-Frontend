<template>
    <div class="home">
        <div class="top">
            <div class="head">
                <h1>函数图形渲染程序<sub style="font-size: 0.6em;">demo v{{ packageVersion }}</sub></h1>
            </div>
            <div class="buttonGroup">
                <var-button @click="showTwoDPlot" text outline type="primary">
                    <span>二维函数图形绘制</span>
                </var-button>
                <var-button @click="showThreeDPlot" text outline type="primary">
                    <span>三维函数图形绘制</span>
                </var-button>
            </div>
            <div class="input">
                <var-input variant="outlined" :placeholder = inputExample clearable
                    focus-color="rgb(48,135,185)" v-model= "functionInput" style="width: 50em; " spellcheck="false" />
                <var-button text outline type="primary" @click="render" style="height: auto;"
                    text-color="rgb(48,135,185)" v-ripple>
                    <span style="font-size: 1.4em;">渲染</span>
                </var-button>
            </div>
        </div>
    </div>
    <div class="plotCompoents">
        <div v-show="showTwoD" class="component-container">
            <TwoDPlotCom ref="TwoDPlotCom"/>
        </div>
        <div v-show="!showTwoD" class="component-container">
            <ThreeDPlotCom ref="ThreeDPlotCom"/>
        </div>
    </div>
</template>

<script>
import packageJson from '../../package.json';
import TwoDPlotCom from '../components/Plot2D.vue';
import ThreeDPlotCom from '../components/Plot3D.vue';

export default {
    name: 'home',
    components: {
        TwoDPlotCom,
        ThreeDPlotCom
    },
    data() {
        return {
            packageVersion: packageJson.version,
            showTwoD: true,
            functionInput: 'sin(x);cos(log(x));log(cos(sin(sqrt(x^3))))',
            inputExample: '输入例:sin(x);cos(log(x));log(cos(sin(sqrt(x^3))))...',
            inputTemp1: '',
            inputTemp2: 'x=1;y=x^2-z^2;log(cos(sin(sqrt(x^3))));cube,width=5,height=5,depth=5;sphere,radius=10',
        };
    },
    mounted() {
        
    },
    methods: {
        showTwoDPlot() {
            this.showTwoD = true;
            this.$store.commit('toggleSwitch3D');
            this.inputExample = '输入例:sin(x);cos(log(x));log(cos(sin(sqrt(x^3))))...';
            this.inputTemp2 = this.functionInput;
            this.functionInput = this.inputTemp1;
        },
        showThreeDPlot() {
            this.showTwoD = false;
            this.$store.commit('toggleSwitch3D');
            this.inputExample = '输入例:x=1;y=x^2-z^2;log(cos(sin(sqrt(x^3))));cube,width=5,height=5,depth=5;sphere,radius=10';
            this.inputTemp1 = this.functionInput;
            this.functionInput = this.inputTemp2;
        },
        render() {
            if (this.showTwoD) {
                this.$refs.TwoDPlotCom.formatInput(this.functionInput);
            } else {
                this.$refs.ThreeDPlotCom.formatInput(this.functionInput);
            }
        }
    }
};
</script>

<style scoped>
@import url('../assets/home.css');

</style>