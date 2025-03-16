<template>
    <div class="main flex w-[100dvw] h-[100dvh] ">
        <div class="main-left w-1/6 min-w-52 shrink-1 overflow-y-auto bg-base-300">
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
                    <button class="btn btn-block" @click="showTable = !showTable">
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
                        <!-- 函数表达式输入区 -->
                        <div class="join flex pb-0.5">
                            <label class="li-input input flex-1 text-lg items-center pr-0 justify-start">
                                <span>f(x)=</span>
                                <input :value="item.fn" spellcheck="false" type="text" :placeholder=currentInputExample
                                    class="join-item text-slate-300/80 flex-auto"
                                    @input="debouncedAddInput($event.target.value, index)">
                                <icon type="close_c" extraclass="cursor-pointer select-none pr-4 text-orange-800"
                                    @click="fuckList('delect', index)" />
                            </label>
                        </div>
                        <!-- 采样点数量的控制输入框 -->
                        <div class="samplePoints flex items-center">
                            <label class="text-xs mr-1">采样点数：</label>
                            <input type="number" :value.number="item.nSamples" min="500" max="5000" step="1"
                                class="input input-xs w-16 text-center"
                                @input="debouncedUpdateSamplePoints($event.target.valueAsNumber, index)" />
                        </div>
                        <!-- 其他操作区域 -->
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
                        <icon type="plus" extraclass="cursor-pointer select-none" @click="fuckList('plus-b')" />
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
        <div class="main-right flex-1 shrink-1 pt-6 pr-4 overflow-hidden relative">
            <div class="plotComponents h-19/20">
                <TwoDPlotCom ref="TwoDPlotCom" v-show="show_2D" class="renderComponent pl-2" />
                <ThreeDPlotCom ref="ThreeDPlotCom" v-show="!show_2D" class="renderComponent" />
            </div>
            <div class="foot h-1/20 flex justify-evenly items-center overflow-hidden">
                <label class="btn btn-lg" for="logInModal">
                    <div v-if="!isAuthenticated">
                        <div class="status status-info animate-bounce"></div>
                        请登录
                    </div>
                    <div v-else class="flex items-center space-x-3">
                        <div aria-label="success" class="status status-success"></div>
                        <span class="text-2xl">{{ greetingMessage + userInfo.nickname }}</span>
                    </div>
                </label>
                <input type="checkbox" id="logInModal" class="modal-toggle"
                    @change="$event.target.checked && initFormData()" />
                <div class="modal" role="dialog">
                    <div class="modal-box">
                        <form @submit.prevent="userLogin" v-if="!showInfo">
                            <fieldset
                                class="fieldset w-auto bg-base-200 border border-base-300 p-4 rounded-box text-xl">
                                <legend class="fieldset-legend cursor-default"><span>登录</span></legend>
                                <label class="fieldset-label cursor-default"><span>账号</span></label>
                                <input type="text" class="input w-auto" placeholder="Account" v-model="account"
                                    autocomplete="username" />
                                <label class="fieldset-label cursor-default"><span>密码</span></label>
                                <input type="password" class="input w-auto" v-model="password" placeholder="Password"
                                    autocomplete="current-password" />
                                <button type="submit" class="btn btn-success btn-soft mt-4">
                                    <div v-if="!loading.login">
                                        <icon type="login" />
                                        <span class="text-lg">登录</span>
                                    </div>
                                    <span v-else class="loading loading-spinner"></span>
                                </button>
                            </fieldset>
                        </form>
                        <div v-else
                            class="fieldset user-info w-auto bg-base-200 border border-base-300 p-4 rounded-box text-xl">
                            <icon type="logout" class="ml-auto text-error cursor-pointer" @click="logout" />
                            <div class="cursor-default">用户信息</div>
                            <div class="cursor-default flex items-center space-x-1"><span>昵称:</span><input type="text"
                                    placeholder="昵称" class="input input-ghost text-xl rounded-sm pl-0.5"
                                    v-model="formData.nickname" /></div>
                            <div class="cursor-default flex items-center space-x-1"><span>邮箱:</span><input type="text"
                                    placeholder="邮箱" class="input input-ghost text-xl rounded-sm pl-0.5"
                                    v-model="formData.email" /></div>
                            <div class="cursor-default flex items-center space-x-1"><span>账号:</span><input type="text"
                                    placeholder="账号" class="input input-ghost text-xl rounded-sm pl-0.5"
                                    v-model="formData.username" /></div>
                            <button class="btn btn-block btn-lg btn-info btn-soft text-xl" @click="updateUserInfo">
                                <span v-if="!loading.updateInfo">提交修改</span>
                                <span v-else class="loading loading-spinner"></span>
                            </button>
                        </div>
                    </div>
                    <label class="modal-backdrop" for="logInModal">Close</label>
                </div>
                <!-- 缩放步长控制组件 -->
                <div class="zoomFactorControl flex items-center">
                    <label class="text-xs mr-1 text-slate-300/80">缩放步长:</label>
                    <input type="number" v-model.number="zoomStep" min="0.01" max="1.00" step="0.01"
                        class="input input-xs w-16 text-center" @change="updateZoomFactor" />
                </div>
                <!-- 移动步长控制组件 -->
                <div class="moveStepControl flex items-center">
                    <label class="text-xs mr-1 text-slate-300/80">移动步长:</label>
                    <input type="number" v-model.number="moveStep" min="0.01" max="1.00" step="0.01"
                        class="input input-xs w-16 text-center" @change="updateMoveStep" />
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
                    join-item pl-1 pr-1" @mousedown="startSetView('zoomIn')" @mouseup="endSetView"
                        @mouseleave="endSetView">
                        <icon type="z_in" />
                    </button>
                    <button class="btn btn-soft btn-primary btn-xl h-[clamp(1em,4vh,3em)] w-[clamp(0.8em,2.5vw,2.5em)]
                    join-item pl-1 pr-1" @mousedown="startSetView('zoomOut')" @mouseup="endSetView"
                        @mouseleave="endSetView">
                        <icon type="z_out" />
                    </button>
                    <button class="btn btn-soft btn-primary btn-xl h-[clamp(1em,4vh,3em)] w-[clamp(0.8em,2.5vw,2.5em)]
                    join-item pl-1 pr-1" @mousedown="startSetView('moveUp')" @mouseup="endSetView"
                        @mouseleave="endSetView">
                        <icon type="arrowUp" />
                    </button>
                    <button class="btn btn-soft btn-primary btn-xl h-[clamp(1em,4vh,3em)] w-[clamp(0.8em,2.5vw,2.5em)]
                    join-item pl-1 pr-1" @mousedown="startSetView('moveDown')" @mouseup="endSetView"
                        @mouseleave="endSetView">
                        <icon type="arrowDown" />
                    </button>
                    <button class="btn btn-soft btn-primary btn-xl h-[clamp(1em,4vh,3em)] w-[clamp(0.8em,2.5vw,2.5em)]
                    join-item pl-1 pr-1" @mousedown="startSetView('moveLeft')" @mouseup="endSetView"
                        @mouseleave="endSetView">
                        <icon type="arrowLeft" />
                    </button>
                    <button class="btn btn-soft btn-primary btn-xl h-[clamp(1em,4vh,3em)] w-[clamp(0.8em,2.5vw,2.5em)]
                    join-item rounded-r-none pl-1 pr-1" @mousedown="startSetView('moveRight')" @mouseup="endSetView"
                        @mouseleave="endSetView">
                        <icon type="arrowRight" />
                    </button>
                </div>
            </div>
            <transition name="bg">
                <div v-show="showTable" class="fixed inset-0 z-40" @click="showTable = false">
                    <div class="absolute inset-0 bg-black/30"></div>
                </div>
            </transition>
            <transition name="table">
                <hisDataTable v-show="showTable" :fnData="fnData" :pagination="pagination" :localFnData="localFnData"
                    class="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]
            bg-base-100 rounded-box border border-base-content/10 overflow-auto lg:w-5xl md:w-2xl sm:w-1xl h-auto z-80"
                    @changePage="getHisData" @renderFn="renderFn" @delectData="delectData"
                    @closeTable="showTable=false" @deleteLocalData="deleteLocalData"/>
            </transition>
        </div>
    </div>
</template>

<script>
import packageJson from '../../package.json';
import TwoDPlotCom from '../components/render2D.vue';
import ThreeDPlotCom from '../components/render3D.vue';
import icon from '../components/icon.vue';
import { mapState, mapGetters } from 'vuex';
import { toRaw } from 'vue';
import * as utils from '../assets/utils/componentUtils';
import { parse } from 'mathjs';
import * as service from '../services/userService';
import hisDataTable from '../components/hisDataTable.vue';



export default {
    name: 'home',
    components: {
        TwoDPlotCom,
        ThreeDPlotCom,
        icon,
        hisDataTable
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
            loading: {
                login: false,
                updateInfo: false
            },
            showInfo: false,
            zoomStep: 0.5,
            moveStep: 0.2,
            formData: {},
            showTable: false,
            fnData: [],
            pagination: {},
            localFnData: [],
        };
    },
    created() {
        // 输入防抖
        this.debouncedAddInput = utils.debounce((input, index) => {
            const formatInput = input.replace(/\s+/g, "");
            if (this.show_2D) {
                try {
                    parse(formatInput);
                    const newData = [...toRaw(this.currentData)];
                    newData[index].fn = formatInput;
                    if (!this.$store.state.auth.isAuthenticated) {
                        this.localFnData.unshift(structuredClone(newData[index]));
                    }
                    const payload = {
                        data: newData,
                        is2D: this.show_2D,
                        needUpload: true
                    }
                    this.$store.commit('syncData', payload);
                    if (this.currentData[index].visible) {
                        this.$refs.TwoDPlotCom.fuckRender(this.functionData_2D);
                    }
                } catch (error) {
                    console.log('输入错误:', error);
                    return;
                }
            } else {
                this.$refs.ThreeDPlotCom.formatInput([formatInput], index);
            }
        }, 400);
        this.debouncedUpdateSamplePoints = utils.debounce((samples, index) => {
            if (!this.show_2D) return
            const validSamples = utils.clamp(samples, 500, 5000);
            const data = [...toRaw(this.currentData)];
            data[index].nSamples = validSamples;
            if (!this.$store.state.auth.isAuthenticated) {
                this.localFnData.unshift(structuredClone(data[index]));
            }
            const payload = {
                data: data,
                is2D: this.show_2D,
                needUpload: true
            }
            this.$store.commit('syncData', payload);
            if (this.currentData[index].visible) {
                this.$refs.TwoDPlotCom.fuckRender(this.functionData_2D);
            }
        }, 400);
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
            if (!this.$store.state.auth.isAuthenticated) {
                this.localFnData.unshift(structuredClone(currentData[index]));
            }
            if (this.currentData[index].visible) {
                this.$refs.TwoDPlotCom.fuckRender(this.functionData_2D);
            }
        }, 25);
    },
    async mounted() {
        const { success, error } = await service.initUserData();
        if (success) {
            this.fuckRender(this.currentData);
            this.initFormData();
            this.getHisData();
            this.showInfo = true;
            console.log('初始化用户信息成功');
        } else {
            console.log('初始化用户信息失败:', error);
            this.$store.commit('auth/setToken', null);
        }
        window.addEventListener('resize', this.throttledResize);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.throttledResize);
    },
    computed: {
        ...mapState(["functionData_2D", "functionData_3D"]),
        ...mapGetters('auth', ['userInfo', 'displayName', 'isAuthenticated']),
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
        greetingMessage() {
            const time = new Date().getHours();
            if (time >= 6 && time < 12) {
                return '早上好，';
            } else if (time >= 12 && time < 18) {
                return '下午好，';
            } else if (time >= 18 && time < 24) {
                return '晚上好，';
            } else {
                return '夜深了，';
            }
        }
    },
    watch: {
        functionData_2D: {
            handler(newVal) {
                this.uploadUserData(newVal);
            },
        }
    },
    methods: {
        switchRenderer() {
            this.show_2D = !this.show_2D;
            this.throttledResize();
            this.$store.commit('switchRender', this.show_2D);
        },

        //将缩放步长和移动步长传递给2D图标实例
        setView(evt) {
            if (this.show_2D) {
                this.$refs.TwoDPlotCom.setView(evt, this.zoomStep, this.moveStep);
            }
        },

        startSetView(evt) {
            this.setView(evt);
            this.viewTimeOut = setTimeout(() => {
                this.viewInterval = requestAnimationFrame(() => this._runSetView(evt));
            }, 150);
        },

        _runSetView(evt) {
            this.setView(evt);
            // 请求下一帧
            this.viewInterval = requestAnimationFrame(() => this._runSetView(evt));
        },

        endSetView() {
            clearTimeout(this.viewTimeOut);
            cancelAnimationFrame(this.viewInterval);
            this.viewTimeOut = null;
            this.viewInterval = null;
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
            switch (evt) {
                case 'plus': {
                    const fnData = {
                        fn: '',
                        color: utils.generateRandomHarmoniousColor(),
                        visible: true,
                        graphType: 'polyline', // 添加默认图表类型
                        nSamples: 2025, // 确保有默认采样点数
                        dimension: 2
                    };
                    if (!this.$store.state.auth.isAuthenticated) {
                        this.localFnData.unshift(structuredClone(fnData));
                    }
                    updatedData.splice(index + 1, 0, fnData);
                    break;
                }
                case 'plus-b': {
                    const fnData = {
                        fn: '',
                        color: utils.generateRandomHarmoniousColor(),
                        visible: true,
                        graphType: 'polyline', // 添加默认图表类型
                        nSamples: 2025, // 确保有默认采样点数
                        dimension: 2
                    };
                    if (!this.$store.state.auth.isAuthenticated) {
                        this.localFnData.unshift(structuredClone(fnData));
                    }
                    updatedData.push(fnData);
                    break;
                }
                case 'minus': {
                    updatedData.splice(index, 1);
                    this.fuckRender(updatedData);
                    break;
                }
                case 'delect': {
                    updatedData[index].fn = '';
                    if (!this.$store.state.auth.isAuthenticated) {
                        this.localFnData.unshift(structuredClone(updatedData[index]));
                    }
                    this.fuckRender(updatedData);
                    break;
                }
                case 'visible': {
                    updatedData[index].visible = !updatedData[index].visible;
                    if (!this.$store.state.auth.isAuthenticated) {
                        this.localFnData.unshift(structuredClone(updatedData[index]));
                    }
                    this.fuckRender(updatedData);
                    break;
                }
            }
            const payload = {
                data: updatedData,
                is2D: this.show_2D,
                needUpload: true
            }
            this.$store.commit('syncData', payload);
        },

        switchHomeShow(evt) {
            this.showHome = !this.showHome;
            switch (evt) {
                case 'list': {
                    this.showList = !this.showList;
                    break;
                }
            }
        },

        async userLogin() {
            this.loading.login = true;
            const data = {
                login: this.account,
                password: this.password
            }
            console.log('登录数据:', data);
            const needNewData = this.localFnData.length === 0 && this.currentData.length === 0;
            const { success, error } = await service.login(data, needNewData);
            if (success) {
                this.fuckRender(this.currentData);
                this.$store.commit('setUpload', true);
                await this.uploadUserData(this.localFnData);
                await this.getHisData();
                document.getElementById('logInModal').checked = false;
                this.initFormData();
                this.localFnData = [];
                setTimeout(() => {
                    this.showInfo = true;
                }, 400);
            } else {
                console.log('登录失败:', error);
            }
            this.loading.login = false;
        },

        logout() {
            document.getElementById('logInModal').checked = false;
            const data_2D = utils.deepClone(this.functionData_2D)
            const data_3D = utils.deepClone(this.functionData_3D)
            this.localFnData = [...data_2D, ...data_3D];
            setTimeout(() => {
                this.$store.commit('auth/setToken', null);
                this.$store.commit('auth/setUser', null);
                this.formData = {};
                this.showInfo = false;
                console.log(this.userInfo);
            }, 400);
        },

        // 更新缩放因子(zoomfactor)
        updateZoomFactor() {
            // 验证范围
            this.zoomStep = utils.clamp(this.zoomStep, 0.01, 1.00);
            // 更新图表实例的缩放因子
            if (this.show_2D && this.$refs.TwoDPlotCom) {
                this.$refs.TwoDPlotCom.updateZoomFactor(this.zoomStep);
            }
        },

        // 更新移动步长(movefactor)
        updateMoveStep() {
            // 验证范围
            this.moveStep = utils.clamp(this.moveStep, 0.01, 1.00);
            // 更新图表实例的移动步长
            if (this.show_2D && this.$refs.TwoDPlotCom) {
                this.$refs.TwoDPlotCom.updateMoveFactor(this.moveStep);
            }
        },

        async updateUserInfo() {
            this.loading.updateInfo = true;
            const { success, error } = await service.updateUserInfo(this.formData);
            if (success) {
                this.initFormData();
                console.log('更新用户信息成功:', this.userInfo);
            } else {
                console.log('更新用户信息失败:', error);
            }
            this.loading.updateInfo = false;
        },

        initFormData() {
            this.formData = {
                email: this.userInfo.email || '',
                nickname: this.userInfo.nickname || '',
                username: this.userInfo.username || '',
            }
        },

        async getHisData(currentPage = 1) {
            const { success, data, error } = await service.getHistoricalData(currentPage);
            console.log('获取历史数据:', data);
            if (success) {
                this.fnData = data.fnData;
                this.pagination = data.pagination;
                console.log('获取历史数据成功:', data);
            } else {
                console.log('获取历史数据失败:', error);
            }
        },

        renderFn(data) {
            const data_2D = data.data_2D;
            const data_3D = data.data_3D; // 开摆
            const newData_2D = [...toRaw(this.functionData_2D)];
            newData_2D.push(...data_2D);
            this.$store.commit('syncData', {
                data: newData_2D,
                is2D: true,
                needUpload: true
            });
            this.fuckRender(this.currentData);
        },

        async delectData(data, callback) {
            const { success, error } = await service.delectFunctionData(data);
            if (success) {
                console.log('删除数据成功');
                callback();
                this.getHisData();
            } else {
                console.log('删除数据失败:', error);
            }
        },

        async uploadUserData(data) {
            if (!this.isAuthenticated || data.length === 0) return;
            const { success, skip, error } = await service.uploadFunctionData(data);
            if (success) {
                console.log('上传数据成功');
            } else if (skip) {
                console.log('跳过本次更新');
            } else {
                console.log('上传数据失败:', error);
            }
        },

        deleteLocalData(deleteIds) {
            this.localFnData = this.localFnData.filter(item => !deleteIds.has(item.id));
        }
    }
};
</script>

<style>
@import url('../assets/componentCss/home.css');
@import url('../assets/componentCss/icon1.css');
</style>