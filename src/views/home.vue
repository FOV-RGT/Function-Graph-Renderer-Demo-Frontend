<template>
    <div class="home">
        <div class="top">
            <div class="head">
                <h1 class="text-primary text-[2rem]">函数图形渲染程序<span class="text-[1rem] text-orange-600">demo-v{{ packageVersion }}</span>
                </h1>
            </div>
            <div class="buttonGroup">
                <button @click="showTwoDPlot" class="btn btn-soft btn-md btn-success w-42 ">
                    <p>二维函数图形绘制</p>
                </button>
                <button @click="showThreeDPlot" class="btn btn-soft btn-md btn-success w-42 ">
                    <p>三维函数图形绘制</p>
                </button>
            </div>
            <div class="inputContainer join">
                <input v-model=functionInput spellcheck="false" type="text" :placeholder=inputExample
                    class="input input-md w-[60dvw] join-item text-teal-500">
                <button class="btn btn-md btn-soft btn-primary 
                    w-20 rounded-r-full join-item text-[1.2em]" @click=render>渲染
                </button>
            </div>
        </div>
    </div>
    <div class="plotComponents">
        <TwoDPlotCom ref="TwoDPlotCom" v-show="show_2D" class="renderComponent" />
        <ThreeDPlotCom ref="ThreeDPlotCom" v-show="!show_2D" class="renderComponent" />
        <div class="svgButtonsGroup join">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513.56 394.43" width="100px" height="100px">
                <g id="_图层_1-2" data-name="图层 1">
                    <polygon class="cls-1"
                        points="225.69 5.23 505.11 271.11 284.52 389.29 19.81 359.74 5.11 182.48 93.34 20 225.69 5.23" />
                    <polygon
                        points="34.09 324.07 48.58 179.14 106.56 48.71 222.5 34.21 468.87 266.1 255.11 359.69 34.09 324.07" />
                </g>
            </svg> -->
            <button class="btn btn-soft btn-primary btn-xl w-[3em] join-item" @click="setView('reset')">
                <icon type="aim" extraclass="icon"/>
            </button>
            <button class="btn btn-soft btn-primary btn-xl w-[3em] join-item" @click="setView('zoomIn')">
                <icon type="compress" extraclass="icon"/>
            </button>
            <button class="btn btn-soft btn-primary btn-xl w-[3em] join-item" @click="setView('zoomOut')">
                <icon type="expand" extraclass="icon"/>
            </button>
            <button class="btn btn-soft btn-primary btn-xl w-[3em] join-item" @click="setView('dragLeft')">
                <icon type="arrowleft" extraclass="icon"/>
            </button>
            <button class="btn btn-soft btn-primary btn-xl w-[3em] join-item" @click="setView('dragRight')">
                <icon type="arrowright" extraclass="icon"/>
            </button>
        </div>
    </div>
</template> 

<script>
import packageJson from '../../package.json';
import TwoDPlotCom from '../components/render2D.vue';
import ThreeDPlotCom from '../components/render3D.vue';
import icon from '../components/icon.vue';

export default {
    name: 'home',
    components: {
        TwoDPlotCom,
        ThreeDPlotCom,
        icon
    },
    data() {
        return {
            packageVersion: packageJson.version,
            show_2D: true,
            inputExample: '输入例:2sin(2x);3cos(log(x^10));8log(cos(sin(sqrt(x^3))));x=5;x=-5...',
        };
    },
    mounted() {

    },
    computed: {
        functionInput: {
            // 通过getter获取store中的输入
            get() {
                if (this.show_2D) {
                    return this.$store.state.userInput_2D
                }
                else {
                    return this.$store.state.userInput_3D
                }
            },
            // 通过setter将输入传递给store
            set(input) {
                const playload = {
                    input,
                    is2D: this.show_2D
                };
                this.$store.commit('userInput', playload);
            }
        }
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
        // 切换二维图形绘制
        showTwoDPlot() {
            this.show_2D = true;
            this.$store.commit('switchRender', this.show_2D);
            this.inputExample = '输入例:2sin(2x);3cos(log(x^10));8log(cos(sin(sqrt(x^3))));x=5;x=-5...';
        },
        // 切换三维图形绘制
        showThreeDPlot() {
            this.show_2D = false;
            this.$store.commit('switchRender', this.show_2D);
            this.inputExample = '输入例:x=1;y=x^2-z^2;log(cos(sin(sqrt(x^3))));cube,width=5,height=5,depth=5;sphere,radius=10';
        },
        // 渲染函数图形
        render() {
            if (this.show_2D) {
                this.$refs.TwoDPlotCom.userInput(this.functionInput);
            }
            else {
                this.$refs.ThreeDPlotCom.formatInput(this.functionInput);
            }
        },
        setView(evt) {
            if (this.show_2D) {
                this.$refs.TwoDPlotCom.setView(evt);
            } else {
                // this.$refs.ThreeDPlotCom.resetView();
            }
        }
    }
};
</script>

<style>
@import url('../assets/componentCss/home.css');
@import url('../assets/componentCss/icon1.css');

.svgButtonsGroup .icon {
    font-size: 1.5em;
}
</style>