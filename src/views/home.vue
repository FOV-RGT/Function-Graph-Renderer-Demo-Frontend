<template>
    <div class="home">
        <div class="top">
            <div class="head">
                <h1 class="text-primary text-[2rem]">函数图形渲染程序<span class="text-[1rem] text-orange-600">demo-v{{ version }}</span>
                </h1>
            </div>
            <div class="topButtonGroup">
                <button @click="showTwoDPlot" class="btn btn-soft btn-md btn-success w-42">
                    <p>二维函数图形绘制</p>
                </button>
                <button @click="showThreeDPlot" class="btn btn-soft btn-md btn-success w-42">
                    <p>三维函数图形绘制</p>
                </button>
            </div>
            <div class="inputContainer join">
                <input v-model="functionInput" spellcheck="false" type="text" :placeholder=inputExample
                    class="input input-md w-[60dvw] join-item text-teal-500">
                <button class="btn btn-md btn-soft btn-primary 
                    w-20 rounded-r-lg join-item text-[1.2em]" @click="render(functionInput)">渲染
                </button>
            </div>
        </div>
    </div>
    <div class="main flex relative w-screen h-[85vh] top-[15vh]">
        <ul class="list bg-base-300 w-[36rem] overflow-y-auto">
            <li class="flex justify-center border-b-2">
                <div class="p-2 pb-1 text-[2em] text-amber-600 tracking-widest self-center">函数列表</div>
            </li>
            <li v-for="(item, index) in functionData" :key="index" class="list-row p-3">
                <div class="join">
                    <input v-model=item.fn spellcheck="false" type="text" :placeholder=inputExample
                        class="input input-lg w-[100rem] join-item text-teal-500 tracking-wider">
                    <button class="btn btn-lg btn-soft btn-primary 
                        w-[4.5em] rounded-r-lg join-item text-[1.2em]"
                        @click="render(item.fn, index)">渲染
                    </button>
                </div>
            </li>
            <li class="list-row text-4xl text-sky-600">千早 爱音</li>
            <li class="list-row text-4xl text-sky-600">长崎 素世</li>
            <li class="list-row text-4xl text-sky-600">高松 灯</li>
            <li class="list-row text-4xl text-sky-600">椎名 立希</li>
            <li class="list-row text-4xl text-sky-600">要 乐奈</li>
            <li class="list-row text-4xl text-pink-800">丰川 祥子</li>
            <li class="list-row text-4xl text-pink-800">八幡 海铃</li>
            <li class="list-row text-4xl text-pink-800">三角 初华</li>
            <li class="list-row text-4xl text-pink-800">祐天寺 若麦</li>
            <li class="list-row text-4xl text-pink-800">若叶 睦</li>
        </ul>
        <div class="plotComponents">
            <TwoDPlotCom ref="TwoDPlotCom" v-show="show_2D" class="renderComponent" />
            <ThreeDPlotCom ref="ThreeDPlotCom" v-show="!show_2D" class="renderComponent" />
            <div class="buttonsGroup join">
                <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513.56 394.43" width="100px" height="100px">
                    <g id="_图层_1-2" data-name="图层 1">
                        <polygon class="cls-1"
                            points="225.69 5.23 505.11 271.11 284.52 389.29 19.81 359.74 5.11 182.48 93.34 20 225.69 5.23" />
                        <polygon
                            points="34.09 324.07 48.58 179.14 106.56 48.71 222.5 34.21 468.87 266.1 255.11 359.69 34.09 324.07" />
                    </g>
                </svg> -->
                <button class="btn btn-soft btn-primary btn-xl w-[2.5em] join-item" @click="setView('reset')">
                    <icon type="aim" extraclass="icon"/>
                </button>
                <button class="btn btn-soft btn-primary btn-xl w-[2.5em] join-item" @click="setView('zoomIn')">
                    <icon type="compress" extraclass="icon"/>
                </button>
                <button class="btn btn-soft btn-primary btn-xl w-[2.5em] join-item" @click="setView('zoomOut')">
                    <icon type="expand" extraclass="icon"/>
                </button>
                <button class="btn btn-soft btn-primary btn-xl w-[2.5em] join-item" @click="setView('dragLeft')">
                    <icon type="arrowleft" extraclass="icon"/>
                </button>
                <button class="btn btn-soft btn-primary btn-xl w-[2.5em] join-item" @click="setView('dragRight')">
                    <icon type="arrowright" extraclass="icon"/>
                </button>
            </div>
        </div>
    </div>
</template> 

<script>
import packageJson from '../../package.json';
import TwoDPlotCom from '../components/render2D.vue';
import ThreeDPlotCom from '../components/render3D.vue';
import icon from '../components/icon.vue';
import { mapState } from 'vuex';

export default {
    name: 'home',
    components: {
        TwoDPlotCom,
        ThreeDPlotCom,
        icon
    },
    data() {
        return {
            version: packageJson.version,
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
                // this.$store.commit('userInput', playload);
            }
        },
        ...mapState(["functionData"]),
    },
    watch: {
        functionData: {
            handler(newVal) {
                console.log(newVal);
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
        render(inputs, index) {
            const formatInputs = inputs.replace(/\s+/g, "").split(/[;；]/);
            console.log(formatInputs);
            if (this.show_2D) {
                this.$refs.TwoDPlotCom.userInput(formatInputs, index);
            }
            else {
                this.$refs.ThreeDPlotCom.formatInput(this.functionInput);
            }
        },
        setView(evt) {
            if (this.show_2D) {
                this.$refs.TwoDPlotCom.setView(evt);
            } else {
                // this.$refs.ThreeDPlotCom.setView();
            }
        }
    }
};
</script>

<style>
@import url('../assets/componentCss/home.css');
@import url('../assets/componentCss/icon1.css');

</style>