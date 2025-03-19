<template>
    <div class="main flex w-[100dvw] h-[100dvh] ">
        <div class="main-left w-1/6 min-w-52 shrink-1 overflow-y-auto bg-base-300">
            <div v-show="show.home" class="w-full h-full flex justify-start flex-col">
                <div class="top overflow-hidden text-center flex flex-col items-center mt-5 mb-10">
                    <h1 class="text-transparent select-none whitespace-nowrap">函数图形渲染程序</h1>
                    <p class="text-transparent select-none">demo-v{{ version }}</p>
                </div>
                <div class="top-buttonsGroup flex flex-col justify-between grow-1 pb-50">
                    <button class="btn btn-block" @click="switchHomeShow('list')">
                        输入函数
                    </button>
                    <button class="btn btn-block" @click="show.adjustWindow = !show.adjustWindow">
                        设置
                    </button>
                    <button class="btn btn-block" @click="switchRenderer">
                        切换模式
                    </button>
                    <button class="btn btn-block" @click="show.table = !show.table">
                        历史记录
                    </button>
                    <button class="btn btn-block" @click="show.loginModal = !show.loginModal">
                        账户
                    </button>
                </div>
            </div>
            <ul class="list overflow-x-hidden" v-show="show.list">
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
        <div class="main-right flex-1 shrink-1 pt-6 pr-4 overflow-hidden">
            <div class="plotComponents h-19/20 relative">
                <TwoDPlotCom ref="TwoDPlotCom" v-show="show.render2D" class="renderComponent pl-2" />
                <ThreeDPlotCom ref="ThreeDPlotCom" v-show="!show.render2D" class="renderComponent" />
                <div class="user-avatar" :style="{ 'background-image': `url(${userAvatarUrl})` }"
                    @click="show.loginModal = !show.loginModal">
                </div>
            </div>
            <div class="foot h-1/20 flex justify-evenly items-center overflow-hidden">
                <adjustButtons @setView="setView" />
            </div>
            <transition name="bg">
                <div v-show="show.table" class="fixed inset-0 z-40" @click="show.table = false">
                    <div class="absolute inset-0 bg-black/30"></div>
                </div>
            </transition>
            <transition name="table">
                <hisDataTable v-if="show.table" :localFnData="localFnData"
                    class="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]
                    bg-base-100 rounded-box border border-base-content/10 overflow-auto lg:w-4xl md:w-xl sm:w-md h-auto z-80" @renderFn="renderFn" @delectData="delectData"
                    @closeTable="show.table = false" @deleteLocalData="deleteLocalData" />
            </transition>
            <transition name="bg">
                <div v-show="show.loginModal || show.registerModal" class="fixed inset-0 z-40"
                    @click="show.loginModal = false; show.registerModal = false">
                    <div class="absolute inset-0 bg-black/30"></div>
                </div>
            </transition>
            <transition name="table">
                <div v-show="show.loginModal" class="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-base-100 rounded-box
                border border-base-content/10 overflow-auto lg:w-2xl md:w-xl sm:w-md h-auto z-80">
                    <form @submit.prevent="userLogin({ login: account, password: password })" v-if="!show.info">
                        <fieldset class="fieldset w-auto bg-base-200 border border-base-300 p-4 rounded-box text-xl">
                            <div class="fieldset-label cursor-default flex items-center justify-center">
                                <span class="text-center text-2xl text-primary select-none">Login</span>
                            </div>
                            <div class="fieldset-label flex justify-between items-center">
                                <span class="cursor-default select-none">账号</span>
                                <button type="button" class="register-btn btn btn-soft btn-info btn-md w-[10em]
                                    flex items-center justify-evenly p-0" @click="switchModal">
                                    <span class="text-lg">注册账号</span>
                                    <icon type="smile" />
                                </button>
                            </div>
                            <input type="text" required class="input w-auto validator" placeholder="Account"
                                v-model="account" title="请输入账号或邮箱" autocomplete="username" />
                            <div class="fieldset-label cursor-default select-none">
                                <span>密码</span>
                            </div>
                            <input type="password" required class="input w-auto validator" v-model="password"
                                placeholder="Password" title="请输入密码" autocomplete="current-password" />
                            <button type="submit" class="btn btn-success btn-soft mt-4">
                                <div v-if="!loading.login" class="login-btn flex items-center gap-3">
                                    <span class="text-xl">登录</span>
                                    <icon type="login" />
                                </div>
                                <span v-else class="loading loading-spinner"></span>
                            </button>
                        </fieldset>
                    </form>
                    <div v-else class="user-info w-auto bg-base-200 border border-base-300 p-4 rounded-box text-xl
                    flex flex-col justify-center space-y-3">
                        <h1 class="text-3xl self-center">{{ greetingMessage + userInfo.nickname }}</h1>
                        <div class="cursor-default flex items-center justify-between">
                            <span>用户信息</span>
                            <button type="button" class="btn btn-soft btn-error btn-md flex items-center justify-evenly"
                                @click="logout">
                                <span class="text-xl">退出登录</span>
                                <icon type="logout" />
                            </button>
                        </div>
                        <div class="cursor-default flex items-center space-x-1">
                            <span class="whitespace-nowrap">昵称:</span>
                            <input type="text" placeholder="昵称"
                                class="input input-ghost text-xl rounded-sm pl-0.5 w-full"
                                v-model="formData.nickname" />
                        </div>
                        <div class="cursor-default flex items-center space-x-1">
                            <span class="whitespace-nowrap">邮箱:</span>
                            <input type="text" placeholder="邮箱"
                                class="input input-ghost text-xl rounded-sm pl-0.5 w-full" v-model="formData.email" />
                        </div>
                        <div class="cursor-default flex items-center space-x-1">
                            <span class="whitespace-nowrap">账号:</span>
                            <input type="text" placeholder="账号"
                                class="input input-ghost text-xl rounded-sm pl-0.5 w-full"
                                v-model="formData.username" />
                        </div>
                        <div class="flex flex-row items-center space-x-1">
                            <fieldset class="fieldset">
                                <label class="fieldset-label">上传文件需小于5MB</label>
                                <input type="file" accept="image/*" class="file-input" @change="handleAvatarSelected" />
                                <label class="fieldset-label">&nbsp;</label>
                            </fieldset>
                            <button type="button"
                                class="btn btn-soft btn-success btn-md flex items-center justify-evenly"
                                @click="getAvatarUrl">
                                <span class="text-xl">上传头像</span>
                                <icon type="image" />
                            </button>
                        </div>
                        <button class="btn btn-block btn-lg btn-info btn-soft text-xl" @click="updateUserInfo">
                            <span v-if="!loading.updateInfo">提交修改</span>
                            <span v-else class="loading loading-spinner"></span>
                        </button>
                    </div>
                </div>
            </transition>
            <transition name="table">
                <register ref="register" v-show="show.registerModal" class="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-base-100 rounded-box
                    border border-base-content/10 overflow-auto h-auto z-80" @switchModal="switchModal"
                    @login="userLogin" />
            </transition>
            <popupWindow ref="popupWindow" />
            <transition name="bg">
                <div v-show="show.adjustWindow" class="fixed inset-0 z-40" @click="show.adjustWindow = false">
                    <div class="absolute inset-0 bg-black/30"></div>
                </div>
            </transition>
            <transition name="table">
                <adjustWindow v-show="show.adjustWindow" class="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]
                bg-base-100 rounded-box border border-base-content/10 overflow-auto w-lg h-auto z-80" @close="show.adjustWindow = false"/>
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
import register from '../components/register.vue';
import popupWindow from '../components/popupWindow.vue';
import adjustButtons from '../components/adjustButtons.vue';
import adjustWindow from '../components/adjustWindow.vue';



export default {
    name: 'home',
    components: {
        TwoDPlotCom,
        ThreeDPlotCom,
        icon,
        hisDataTable,
        register,
        popupWindow,
        adjustButtons,
        adjustWindow
    },
    data() {
        return {
            version: packageJson.version,
            loading: {
                login: false,
                updateInfo: false
            },
            show: {
                table: false,
                loginModal: false,
                registerModal: false,
                info: false,
                list: false,
                home: true,
                render2D: true,
                adjustWindow: false
            },
            account: "",
            password: "",
            formData: {},
            fnData: [],
            pagination: {},
            localFnData: [],
            selectedAvatarFile: null,
            userAvatarUrl: ''
        };
    },
    created() {
        // 输入防抖
        this.debouncedAddInput = utils.debounce((input, index) => {
            const formatInput = input.replace(/\s+/g, "");
            if (this.show.render2D) {
                try {
                    parse(formatInput);
                    const newData = [...toRaw(this.currentData)];
                    newData[index].fn = formatInput;
                    this.storeData(newData[index]);
                    this.storeDataToVuex(newData);
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
            if (!this.show.render2D) return
            const validSamples = utils.clamp(samples, 500, 5000);
            const data = [...toRaw(this.currentData)];
            data[index].nSamples = validSamples;
            this.storeData(data[index]);
            this.storeDataToVuex(data);
            if (this.currentData[index].visible) {
                this.$refs.TwoDPlotCom.fuckRender(this.functionData_2D);
            }
        }, 400);
        this.throttledResize = utils.throttle(() => {
            setTimeout(() => {
                if (this.show.render2D) {
                    this.$refs.TwoDPlotCom.fuckResize();
                } else {
                    this.$refs.ThreeDPlotCom.fuckResize();
                }
            }, 15);
        }, 35);
        this.throttleupdateColor = utils.throttle((color, index) => {
            const currentData = [...toRaw(this.currentData)];
            currentData[index].color = color;
            this.storeData(currentData[index]);
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
            this.show.info = true;
            console.log('初始化用户信息成功');
        } else {
            console.log('初始化用户信息失败:', error);
            this.$store.commit('auth/cleanState', null);
        }
        window.addEventListener('resize', this.throttledResize);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.throttledResize);
    },
    computed: {
        ...mapState(["functionData_2D", "functionData_3D"]),
        ...mapGetters('auth', ['userInfo', 'displayName', 'isAuthenticated',
            'chartType', 'closed', 'range', 'dash', 'grid', 'zoomFactor', 'moveFactor'
        ]),
        currentInputExample() {
            return this.show.render2D ? '2sin(2x);3cos(log(x^10));8log(cos(sin(sqrt(x^3))));x=5;x=-5...'
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
            return this.show.render2D ? this.functionData_2D : this.functionData_3D;
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
        },
        chartType: {
            handler(newVal) {
                this.$refs.TwoDPlotCom.switchChartType(newVal);
            },
        },
        closed: {
            handler(newVal) {
                const newData = toRaw(this.currentData).map(item => ({
                    fn: item.fn,
                    color: item.color,
                    nSamples: item.nSamples,
                    visible: item.visible,
                    dimension: item.dimension,
                    graphType: item.graphType,
                    closed: newVal,
                    range: item.range || null
                }));
                this.fuckRender(newData);
                this.storeDataToVuex(newData);
                
            },
        },
        range: {
            handler(newVal) {
                const newData = toRaw(this.currentData).map(item => ({
                    fn: item.fn,
                    color: item.color,
                    nSamples: item.nSamples,
                    visible: item.visible,
                    dimension: item.dimension,
                    graphType: item.graphType,
                    closed: item.closed || false,
                    range: newVal
                }));
                this.fuckRender(newData);
                this.storeDataToVuex(newData);
            },
        },
        dash: {
            handler(newVal) {
                this.$refs.TwoDPlotCom.switchDash(newVal);
            },
        },
        grid: {
            handler(newVal) {
                this.$refs.TwoDPlotCom.switchGrid(newVal);
            },
        },
        zoomFactor: {
            handler(newVal) {
                if (this.show.render2D) {
                    this.$refs.TwoDPlotCom.updateZoomFactor(newVal);
                }
            },
        },
        moveFactor: {
            handler(newVal) {
                if (this.show.render2D) {
                    this.$refs.TwoDPlotCom.updateMoveFactor(newVal);
                }
            },
        }
    },
    methods: {
        switchRenderer() {
            this.show.render2D = !this.show.render2D;
            this.throttledResize();
            this.$store.commit('switchRender', this.show.render2D);
        },

        //将缩放步长和移动步长传递给2D图标实例
        setView(evt) {
            if (this.show.render2D) {
                this.$refs.TwoDPlotCom.setView(evt, this.zoomStep, this.moveStep);
            }
        },

        fuckRender(data) {
            console.log("fuckRender:", data);
            if (this.show.render2D) {
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
                        nSamples: 2025, // 确保有默认采样点数
                        visible: true,
                        dimension: 2,
                        graphType: 'interval', // 添加默认图表类型
                        closed: this.closed,
                        range: this.range
                    };
                    this.storeData(fnData);
                    updatedData.splice(index + 1, 0, fnData);
                    break;
                }
                case 'plus-b': {
                    const fnData = {
                        fn: '',
                        color: utils.generateRandomHarmoniousColor(),
                        nSamples: 2025, // 确保有默认采样点数
                        visible: true,
                        dimension: 2,
                        graphType: 'interval', // 添加默认图表类型
                        closed: this.closed,
                        range: this.range
                    };
                    this.storeData(fnData);
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
                    this.storeData(updatedData[index]);
                    this.fuckRender(updatedData);
                    break;
                }
                case 'visible': {
                    updatedData[index].visible = !updatedData[index].visible;
                    this.storeData(updatedData[index]);
                    this.fuckRender(updatedData);
                    break;
                }
            }
            this.storeDataToVuex(updatedData);
        },

        switchHomeShow(evt) {
            this.show.home = !this.show.home;
            switch (evt) {
                case 'list': {
                    this.show.list = !this.show.list;
                    break;
                }
            }
        },

        async userLogin(data, callback) {
            this.loading.login = true;
            console.log('登录数据:', data);
            const needNewData = this.localFnData.length === 0 && this.currentData.length === 0;
            const { success, messages } = await service.login(data, needNewData);
            if (success) {
                this.fuckRender(this.currentData);
                this.$store.commit('setUpload', true);
                await this.uploadUserData(this.localFnData);
                this.show.loginModal = false;
                this.initFormData();
                this.localFnData = [];
                setTimeout(() => {
                    this.show.info = true;
                }, 400);
            } else {
                const data = {
                    head: '登录失败：',
                    messages,
                    target: '.main-right'
                }
                console.log(data);
                this.$refs.popupWindow.addMessage(data);
            }
            if (typeof callback === 'function') {
                callback(success);
            }
            this.loading.login = false;
        },

        logout() {
            this.show.loginModal = false;
            const data_2D = utils.deepClone(this.functionData_2D)
            // const data_3D = utils.deepClone(this.functionData_3D)
            const data_3D = [];
            this.localFnData = [...data_2D, ...data_3D];
            setTimeout(() => {
                this.$store.commit('auth/cleanState');
                this.formData = {};
                this.show.info = false;
                console.log(this.userInfo);
            }, 400);
        },

        // 更新缩放因子(zoomfactor)
        updateZoomFactor(zoomFactor) {
            if (this.show.render2D) {
                this.$refs.TwoDPlotCom.updateZoomFactor(zoomFactor);
            }
        },

        // 更新移动步长(movefactor)
        updateMoveFactor(moveFactor) {
            if (this.show.render2D) {
                this.$refs.TwoDPlotCom.updateMoveFactor(moveFactor);
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

        renderFn(data) {
            const { data_2D, data_3D } = data; // 3D要重做，历史记录暂时不接入
            const newData_2D = [...toRaw(this.functionData_2D)];
            newData_2D.push(...data_2D);
            this.fuckRender(this.currentData);
            this.storeDataToVuex(newData_2D);
        },

        async delectData(data, callback) {
            const { success, error } = await service.delectFunctionData(data);
            if (success) {
                console.log('删除数据成功');
                callback();
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
        },

        switchModal() {
            this.show.loginModal = !this.show.loginModal;
            this.show.registerModal = !this.show.registerModal;
            if (this.show.registerModal) {
                this.$refs.register.init();
            }
        },

        async uploadChangeData(data) {
            const { success, error } = await service.uploadChangeData(data);
            if (success) {
                console.log('上传变动数据成功');
            } else {
                console.log('上传变动数据失败:', error);
            }
        },

        storeData(data) {
            if (!this.isAuthenticated) {
                this.localFnData.unshift(utils.deepClone(data));
            } else {
                this.uploadChangeData(data);
            }
        },

        storeDataToVuex(data) {
            const payload = {
                data,
                is2D: this.show.render2D,
                needUpload: true
            };
            this.$store.commit('syncData', payload);
        },

        handleAvatarSelected(event) {
            const file = event.target.files[0];
            if (!file) return;
            if (!file.type.startsWith('image/')) {
                this.$refs.popupWindow.addMessage({
                    head: '上传失败',
                    messages: ['请选择图片文件'],
                    target: 'body'
                });
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                this.$refs.popupWindow.addMessage({
                    head: '上传失败',
                    messages: ['文件大小不能超过5MB'],
                    target: 'body'
                });
                return;
            }
            this.selectedAvatarFile = file;
        },

        async getAvatarUrl() {
            if (!this.selectedAvatarFile) {
                this.$refs.popupWindow.addMessage({
                    head: '上传失败',
                    messages: ['请先选择要上传的图片文件'],
                    target: 'body'
                });
                return;
            }
            const { success, res, error } = await service.getAvatarUrl();
            console.log('获取头像上传信息:', res);
            if (success) {
                const file = this.selectedAvatarFile;
                this.uploadAvatar(res, file);
            } else {
                console.log('获取头像上传信息失败：', error);
            }
        },

        async uploadAvatar(res, file) {
            const { success, error } = await service.uploadAvatar(res, file);
            if (success) {
                console.log('上传头像成功');
                this.userAvatarUrl = res.url;
                console.log('头像地址:', this.userAvatarUrl);
            } else {
                console.log('上传头像失败:', error);
            }
        }
    }
};
</script>

<style>
@import url('../assets/componentCss/home.css');
</style>