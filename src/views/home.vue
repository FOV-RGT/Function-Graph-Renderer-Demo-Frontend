<template>
    <div class="main flex w-[100dvw] h-[100dvh] ">
        <div class="main-left w-1/6 min-w-42 shrink-1 overflow-y-auto bg-base-300">
            <div v-show="showHome" class="w-full h-full flex justify-start flex-col">
                <div class="top overflow-hidden text-center flex flex-col items-center mt-5 mb-10">
                    <h1 class="text-transparent select-none whitespace-nowrap">函数图形渲染程序</h1>
                    <p class="text-transparent select-none">demo-v{{ version }}</p>
                </div>
                <div class="top-buttonsGroup flex flex-col justify-between grow-1 pb-50">
                    <button class="btn btn-block" @click="switchHomeShow('list')">
                        输入函数
                    </button>
                    <button class="btn btn-block">
                        调整
                    </button>
                    <button class="btn btn-block" @click="switchRenderer">
                        切换模式
                    </button>
                    <button class="btn btn-block">
                        历史记录
                    </button>
                    <button class="btn btn-block">
                        设置
                    </button>
                </div>
            </div>
            <ul class="list overflow-x-hidden" v-show="showList">
                <li class="flex justify-center border-b-2 border-b-slate-500/80 items-center">
                    <div
                        class="li-top p-2 pb-1 pl-8 text-[2em] text-slate-300/70 tracking-widest flex items-center justify-between select-none flex-1">
                        <p>函数<span class="inline-block">列表</span></p>
                        <icon type="rollBack" extraclass="cursor-pointer select-none pr-4"
                            @click="switchHomeShow('list')" />
                    </div>
                </li>
                <li v-for="(item, index) in currentData" :key="index" class="list-row pl-1 pr-1 pb-0 flex">
                    <div class="flex-col select-none flex-1">
                        <div class="join flex pb-0.5">
                            <label class="li-input input flex-1 text-lg items-center pr-0 justify-start">
                                f(x) &nbsp;=
                                <input v-model=item.fn spellcheck="false" type="text" :placeholder=currentInputExample
                                    class="join-item text-slate-300/80 flex-auto"
                                    @input="debouncedAddInput(item.fn, index)">
                                <icon type="close_c" extraclass="cursor-pointer select-none pr-4 text-orange-800"
                                    @click="fuckList('delect', index)" />
                            </label>
                        </div>
                        <div class="li-b flex gap-4">
                            <icon type="plus" extraclass="cursor-pointer select-none"
                                @click="fuckList('plus', index)" />
                            <icon type="minus" extraclass="cursor-pointer select-none"
                                @click="fuckList('minus', index)" />
                            <icon :type="item.visible == true ? 'eye' : 'eye_c'" extraclass="cursor-pointer select-none"
                                @click="fuckList('visible', index)" />
                            <div class="colorPicker">
                                <ColorPicker format="rgb" shape="square" :debounce="0" lang="ZH-cn"
                                    v-model:pureColor="item.color"
                                    @update:pureColor="throttleupdateColor($event, index)" />
                            </div>
                        </div>
                    </div>
                </li>
                <li class="flex list-row text-4xl justify-center p-2">
                    <div class="left-li-plus items-center flex h-[2rem] justify-center">
                        <icon type="plus" extraclass="cursor-pointer select-none" @click="fuckList('plus-b', -1)" />
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
        </div>
        <div class="main-right flex-1 shrink-1 pt-6 pr-4 overflow-hidden">
            <div class="plotComponents h-19/20">
                <TwoDPlotCom ref="TwoDPlotCom" v-show="show_2D" class="renderComponent pl-2" />
                <ThreeDPlotCom ref="ThreeDPlotCom" v-show="!show_2D" class="renderComponent" />
            </div>
            <div class="foot h-1/20 flex justify-evenly items-center overflow-hidden">
                <label class="btn btn-lg" for="logInModal">
                    <div v-if="!isAuthenticated">
                        <span class="loading loading-spinner"></span>
                        请登录
                    </div>
                    <div v-else>
                        <span class="text-2xl">{{ greetingMessage + nickname }}</span>
                    </div>
                </label>
                <input type="checkbox" id="logInModal" class="modal-toggle" />
                <div class="modal" role="dialog">
                    <div class="modal-box">
                        <form @submit.prevent="userLogin">
                            <fieldset class="fieldset w-auto bg-base-200 border border-base-300 p-4 rounded-box text-xl">
                                <legend class="fieldset-legend cursor-default"><span>登录</span></legend>
                                <label class="fieldset-label cursor-default"><span>账号</span></label>
                                <input type="text" class="input w-auto" placeholder="Account" v-model="account" autocomplete="username"/>
                                <label class="fieldset-label cursor-default"><span>密码</span></label>
                                <input type="password" class="input w-auto" v-model="password" placeholder="Password" autocomplete="current-password"/>
                                <button type="submit" class="btn btn-neutral mt-4">
                                    <span v-if="!logging" class="text-lg">登录</span>
                                    <span v-else class="loading loading-spinner"></span>
                                </button>
                            </fieldset>
                        </form>
                    </div>
                    <label class="modal-backdrop" for="logInModal">Close</label>
                </div>
                <div class="foot-buttonsGroup join max-h-19/20 overflow-hidden">
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
                        <icon type="aim" />
                    </button>
                    <button class="btn btn-soft btn-primary btn-xl h-[clamp(1em,4vh,3em)] w-[clamp(0.8em,2.5vw,2.5em)]
                    join-item pl-1 pr-1" @mousedown="startSetView('zoomIn')" @mouseup="endSetView()"
                        @mouseleave="endSetView()">
                        <icon type="z_in" />
                    </button>
                    <button class="btn btn-soft btn-primary btn-xl h-[clamp(1em,4vh,3em)] w-[clamp(0.8em,2.5vw,2.5em)]
                    join-item pl-1 pr-1" @mousedown="startSetView('zoomOut')" @mouseup="endSetView()"
                        @mouseleave="endSetView()">
                        <icon type="z_out" />
                    </button>
                    <button class="btn btn-soft btn-primary btn-xl h-[clamp(1em,4vh,3em)] w-[clamp(0.8em,2.5vw,2.5em)]
                    join-item pl-1 pr-1" @mousedown="startSetView('moveUp')" @mouseup="endSetView()"
                        @mouseleave="endSetView()">
                        <icon type="arrowUp" />
                    </button>
                    <button class="btn btn-soft btn-primary btn-xl h-[clamp(1em,4vh,3em)] w-[clamp(0.8em,2.5vw,2.5em)]
                    join-item pl-1 pr-1" @mousedown="startSetView('moveDown')" @mouseup="endSetView()"
                        @mouseleave="endSetView()">
                        <icon type="arrowDown" />
                    </button>
                    <button class="btn btn-soft btn-primary btn-xl h-[clamp(1em,4vh,3em)] w-[clamp(0.8em,2.5vw,2.5em)]
                    join-item pl-1 pr-1" @mousedown="startSetView('moveLeft')" @mouseup="endSetView()"
                        @mouseleave="endSetView()">
                        <icon type="arrowLeft" />
                    </button>
                    <button class="btn btn-soft btn-primary btn-xl h-[clamp(1em,4vh,3em)] w-[clamp(0.8em,2.5vw,2.5em)]
                    join-item rounded-r-none pl-1 pr-1" @mousedown="startSetView('moveRight')" @mouseup="endSetView()"
                        @mouseleave="endSetView()">
                        <icon type="arrowRight" />
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
import { authApi } from '../api/auth';

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
            viewTimeOut: null,
            viewInterval: null,
            showList: false,
            showHome: true,
            account: "",
            password: "",
            logging: false,
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
    async mounted() {
        try {
            const res = await authApi.getUserInfo();
            this.$store.commit('auth/setUser', res);
        } catch (error) {
            console.log('获取用户信息失败:', error);
            this.$store.commit('auth/setToken', null);
        }
        window.addEventListener('resize', this.throttledResize);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.throttledResize);
    },
    computed: {
        ...mapState(["functionData_2D", "functionData_3D"]),
        ...mapState('auth', ['user', 'isAuthenticated', 'nickname']),
        currentInputExample() {
            return this.show_2D ? '2sin(2x);3cos(log(x^10));8log(cos(sin(sqrt(x^3))));x=5;x=-5...'
                : 'x=1;y=x^2-z^2;log(cos(sin(sqrt(x^3))));cube,width=5,height=5,depth=5;sphere,radius=10'
        },
        currentData() {
            console.log("💩");
            // if (this.currentData && this.currentData.length > 0) {
            //     const payload = JSON.stringify(this.currentData.map(item => ({
            //         fn: item.fn,
            //         color: item.color,
            //         nSamples: item.nSamples,
            //         visible: item.visible
            //     })));
            //     console.log(payload);
            // }
            return this.show_2D ? this.functionData_2D : this.functionData_3D;
        },
        userInput() {
            console.log("💩💩");
            return this.currentData.map(item => `"${item.fn}"`).join('  ,  ');
        },
        greetingMessage() {
            const time = new Date().getHours();
            if (time >= 6 && time < 12) {
                return '早上好，';
            } else if (time >=12 && time <18) {
                return '下午好，';
            } else if (time >=18 && time < 24) {
                return '晚上好，';
            } else {
                return '不是哥们，这么晚还搁这敲代码呢？';
            }
        }
    },
    watch: {

    },
    methods: {
        switchRenderer() {
            this.show_2D = !this.show_2D;
            this.throttledResize();
            this.$store.commit('switchRender', this.show_2D);
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
                }, 75);
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
        },
        switchHomeShow(evt) {
            this.showHome = !this.showHome;
            switch (evt) {
                case 'list': {
                    this.showList = !this.showList;
                    break;
                }
                case 'hide': {
                    this.showList = false;
                    break;
                }
            }
        },
        async userLogin() {
            this.logging = true;
            const data = {
                login: this.account,
                password: this.password
            }
            console.log('登录数据:', data);
            try {
                const res = await authApi.login(data);
                this.$store.commit('auth/setToken', res.token);
            } catch (error) {
                console.log('登录失败:', error);
            } finally {
                this.logging = false;
                document.getElementById('logInModal').checked = false;
            }
            try {
                const res = await authApi.getUserInfo();
                this.$store.commit('auth/setUser', res);
            } catch (error) {
                console.log('获取用户信息失败:', error);
            }
        }
    }
};
</script>

<style>
@import url('../assets/componentCss/home.css');
@import url('../assets/componentCss/icon1.css');
</style>