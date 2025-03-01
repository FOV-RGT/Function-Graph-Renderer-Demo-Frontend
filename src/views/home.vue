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
                    focus-color="rgb(48,135,185)" v-model= functionInput style="width: 50em; " spellcheck="false" />
                <var-button text outline type="primary" @click="render" style="height: auto;"
                    text-color="rgb(48,135,185)" v-ripple>
                    <span style="font-size: 1.4em;">渲染</span>
                </var-button>
            </div>
        </div>
    </div>
    <div class="plotCompoents">
        <div v-show="show_2D" class="component-container">
            <TwoDPlotCom ref="TwoDPlotCom"/>
        </div>
        <div v-show="!show_2D" class="component-container">
            <ThreeDPlotCom ref="ThreeDPlotCom"/>
        </div>
    </div>
</template>

<script>
import packageJson from '../../package.json';
import TwoDPlotCom from '../components/render2D.vue';
import ThreeDPlotCom from '../components/render3D.vue';

export default {
    name: 'home',
    components: {
        TwoDPlotCom,
        ThreeDPlotCom
    },
    data() {
        return {
            packageVersion: packageJson.version,
            show_2D: true,
            inputExample: '输入例:sin(x);cos(log(x));log(cos(sin(sqrt(-x^3))));x=5;x=-5...',
        };
    },
    mounted() {
        
    },
    computed: {
        functionInput: {
            get() {
                if (this.show_2D) {
                    return this.$store.state.userInput_2D
                }
                else {
                    return this.$store.state.userInput_3D
                }
            },
            set(input) {
                const playload = {
                    input,
                    is2D: this.show_2D
                };
                this.$store.commit('userInput', playload);
            }
        }
    },
    methods: {
        showTwoDPlot() {
            this.show_2D = true;
            this.$store.commit('switch3D');
            this.inputExample = '输入例:sin(x);cos(log(x));log(cos(sin(sqrt(-x^3))));x=5;x=-5...';
        },
        showThreeDPlot() {
            this.show_2D = false;
            this.$store.commit('switch3D');
            this.inputExample = '输入例:x=1;y=x^2-z^2;log(cos(sin(sqrt(x^3))));cube,width=5,height=5,depth=5;sphere,radius=10';
        },
        render() {
            if (this.show_2D) {
                this.$refs.TwoDPlotCom.userInput(this.functionInput);
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