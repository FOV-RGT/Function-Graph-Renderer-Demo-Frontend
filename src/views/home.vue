<template>
    <div class="main flex w-[100dvw] h-[100dvh] ">
        <ul class="list bg-base-300 w-1/6 max-w-86 min-w-42 overflow-y-auto">
            <li class="flex justify-center border-b-2 border-b-slate-500/80">
                <div class="p-2 pb-1 text-[2em] text-slate-300/70 tracking-widest self-center select-none">函数列表</div>
            </li>
            <li v-for="(item, index) in currentData" :key="index" class="list-row pl-1 pr-1 pb-0 flex">
                <div class="flex-col select-none flex-1">
                    <div class="join flex pb-0.5">
                        <label class="li-input input flex-1 text-lg items-center pr-0 justify-start">
                            f(x) &nbsp;=
                            <input v-model=item.fn spellcheck="false" type="text" :placeholder=inputExample
                                class="join-item text-slate-300/80 tracking-wider flex-auto"
                                @input="debouncedAddInput(item.fn, index)">
                            <icon type="close_c" extraclass="icon cursor-pointer select-none pr-4 text-orange-800"
                                @click="fuckList('delect', index)" />
                        </label>
                    </div>
                    <div class="li-b flex gap-4">
                        <icon type="plus" extraclass="icon cursor-pointer select-none"
                            @click="fuckList('plus', index)" />
                        <icon type="minus" extraclass="icon cursor-pointer select-none"
                            @click="fuckList('minus', index)" />
                        <icon :type="item.visible == true ? 'eye' : 'eye_c'"
                            extraclass="icon cursor-pointer select-none" @click="fuckList('visible', index)" />
                        <div class="colorPicker">
                            <ColorPicker format="rgb" shape="square" :debounce="0" lang="ZH-cn"
                                v-model:pureColor="item.color" @update:pureColor="throttleupdateColor($event, index)" />
                        </div>
                    </div>
                </div>
            </li>
            <li class="flex list-row text-4xl justify-center p-2">
                <div class="left-li-plus items-center flex h-[2rem] justify-center">
                    <icon type="plus" extraclass="icon cursor-pointer select-none" @click="fuckList('plus-b', -1)" />
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
        <div class="main-right flex-1 shrink-1 pt-4 pr-4 overflow-hidden">
            <div class="plotComponents h-19/20">
                <TwoDPlotCom ref="TwoDPlotCom" v-show="show_2D" class="renderComponent pl-2" />
                <ThreeDPlotCom ref="ThreeDPlotCom" v-show="!show_2D" class="renderComponent" />
            </div>
            <div class="foot h-1/20 flex justify-evenly items-center overflow-hidden">
                <h1 class="text-transparent foot-h1 text-[clamp(1em,3vh,2.5em)] select-none max-h-full pr-0.5">函数图形渲染程序
                    <span class="text-[clamp(0.3em,3vh,0.6em)] select-none">demo-v{{ version }}</span>
                </h1>
                <button @click="showTwoDPlot" class="btn btn-soft lg:btn-lg md:btn-md sm:btn-sm btn-success pl-1 pr-1">
                    <p class="text-[clamp(0.6em, 1vw, 1em)]">二维函数图形绘制</p>
                </button>
                <button @click="showThreeDPlot" class="btn btn-soft lg:btn-lg md:btn-md sm:btn-sm btn-success pl-1 pr-1">
                    <p class="text-[clamp(0.6em, 1vw, 1em)]">三维函数图形绘制</p>
                </button>
                <div class="buttonsGroup join max-h-19/20 overflow-hidden">
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513.56 394.43" width="100px" height="100px">
                        <g id="_图层_1-2" data-name="图层 1">
                            <polygon class="cls-1"
                                points="225.69 5.23 505.11 271.11 284.52 389.29 19.81 359.74 5.11 182.48 93.34 20 225.69 5.23" />
                            <polygon
                                points="34.09 324.07 48.58 179.14 106.56 48.71 222.5 34.21 468.87 266.1 255.11 359.69 34.09 324.07" />
                        </g>
                    </svg> -->
                    <button class="btn btn-soft btn-primary btn-xl h-[clamp(1em,4vh,3em)] w-[clamp(0.8em,2.5vw,2.5em)]
                    join-item rounded-l-none pl-1 pr-1" @click="setView('reset')">
                        <icon type="aim" extraclass="icon"/>
                    </button>
                    <button class="btn btn-soft btn-primary btn-xl h-[clamp(1em,4vh,3em)] w-[clamp(0.8em,2.5vw,2.5em)]
                    join-item pl-1 pr-1" @mousedown="startSetView('zoomIn')" @mouseup="endSetView()" @mouseleave="endSetView()">
                        <icon type="z_in" extraclass="icon"/>
                    </button>
                    <button class="btn btn-soft btn-primary btn-xl h-[clamp(1em,4vh,3em)]
                    w-[clamp(0.8em,2.5vw,2.5em)] join-item pl-1 pr-1" @mousedown="startSetView('zoomOut')" @mouseup="endSetView()" @mouseleave="endSetView()">
                        <icon type="z_out" extraclass="icon"/>
                    </button>
                    <button class="btn btn-soft btn-primary btn-xl h-[clamp(1em,4vh,3em)] w-[clamp(0.8em,2.5vw,2.5em)]
                    join-item pl-1 pr-1" @mousedown="startSetView('dragLeft')" @mouseup="endSetView()" @mouseleave="endSetView()">
                        <icon type="arrowleft" extraclass="icon"/>
                    </button>
                    <button class="btn btn-soft btn-primary btn-xl h-[clamp(1em,4vh,3em)] w-[clamp(0.8em,2.5vw,2.5em)]
                    join-item rounded-r-none pl-1 pr-1" @mousedown="startSetView('dragRight')" @mouseup="endSetView()" @mouseleave="endSetView()">
                        <icon type="arrowright" extraclass="icon"/>
                    </button>
                </div>
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
import { toRaw } from 'vue';
import * as utils from '../assets/utils/componentUtils';

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
            inputExample: '2sin(2x);3cos(log(x^10));8log(cos(sin(sqrt(x^3))));x=5;x=-5...',
            viewTimeOut: null,
            viewInterval: null,
        };
    },
    created() {
        // 输入防抖
        this.debouncedAddInput = utils.debounce((input, index) => {
            console.log("自动更新输入");
            this.render(input, index);
        }, 100);
        this.throttledResize = utils.throttle(() => {
            setTimeout(() => {
                if (this.show_2D) {
                    this.$refs.TwoDPlotCom.fuckResize();
                } else {
                    this.$refs.ThreeDPlotCom.fuckResize();
                }
            }, 15);
        }, 35);
        this.throttleupdateColor = utils.throttle((color, index) => {
            const currentData = [...toRaw(this.currentData)];
            currentData[index].color = color;
            this.fuckRender(currentData);
        }, 25);
    },
    mounted() {
        window.addEventListener('resize', this.throttledResize);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.throttledResize);
    },
    computed: {
        ...mapState(["functionData_2D", "functionData_3D"]),
        currentData() {
            console.log("💩");
            return this.show_2D ? this.functionData_2D : this.functionData_3D;
        },
        userInput() {
            console.log("💩💩");
            return this.currentData.map(item => `"${item.fn}"`).join('  ,  ');
        }
    },
    watch: {
        
    },
    methods: {
        // 切换二维图形绘制
        showTwoDPlot() {
            this.show_2D = true;
            this.throttledResize();
            this.$store.commit('switchRender', true);
            this.inputExample = '2sin(2x);3cos(log(x^10));8log(cos(sin(sqrt(x^3))));x=5;x=-5...';
        },
        // 切换三维图形绘制
        showThreeDPlot() {
            this.show_2D = false;
            this.throttledResize();
            this.$store.commit('switchRender', false);
            this.inputExample = 'x=1;y=x^2-z^2;log(cos(sin(sqrt(x^3))));cube,width=5,height=5,depth=5;sphere,radius=10';
        },
        setView(evt) {
            if (this.show_2D) {
                this.$refs.TwoDPlotCom.setView(evt);
            } else {
                // this.$refs.ThreeDPlotCom.setView();
            }
        },
        startSetView(evt) {
            this.setView(evt);
            this.viewTimeOut = setTimeout(() => {
                this.viewInterval = setInterval(() => {
                    this.setView(evt);
                }, 25);
            }, 150);
        },
        endSetView() {
            clearTimeout(this.viewTimeOut);
            clearInterval(this.viewInterval);
        },
        // 渲染函数图形
        render(inputs, index, num) {
            const formatInputs = inputs.replace(/\s+/g, "").split(/[;；]/);
            console.log(formatInputs);
            if (this.show_2D) {
                this.$refs.TwoDPlotCom.userInput(formatInputs, index, num);
            }
            else {
                this.$refs.ThreeDPlotCom.formatInput(formatInputs, index);
            }
        },
        fuckRender(data) {
            console.log("fuckRender:", data);
            if (this.show_2D) {
                this.$refs.TwoDPlotCom.fuckRender(data);
            } else {
                // this.$refs.ThreeDPlotCom.fuckRender(data);
            }
        },
        fuckList(evt, index) {
            const updatedData = [...toRaw(this.currentData)];
            console.log("fuckList:", index);
            switch (evt) {
                case 'plus': {
                    updatedData.splice(index + 1, 0, {
                        fn: '',
                        color: utils.generateRandomHarmoniousColor(),
                        visible: false
                    });
                    break;
                }
                case 'plus-b': {
                    updatedData.push({
                        fn: '',
                        color: utils.generateRandomHarmoniousColor(),
                        visible: false
                    });
                    break;
                }
                case 'minus': {
                    updatedData.splice(index, 1);
                    this.fuckRender(updatedData);
                    break;
                }
                case 'delect': {
                    updatedData[index].fn = '';
                    this.fuckRender(updatedData);
                    break;
                }
                case 'visible': {
                    updatedData[index].visible = !updatedData[index].visible;
                    this.fuckRender(updatedData);
                    break;
                }
            }
            const payload = {
                data: updatedData,
                is2D: this.show_2D
            }
            this.$store.commit('syncData', payload);
        },
        updateColor(color, index) {
            const currentData = [...toRaw(this.currentData)];
            currentData[index].color = color;
            this.fuckRender(currentData);
        }
    }
};
</script>

<style>
@import url('../assets/componentCss/home.css');
@import url('../assets/componentCss/icon1.css');
</style>