<template>
    <div class="main">
        <transition name="leftList">
            <div v-if="show.leftList" class="main-left w-4/13 shrink-1 overflow-x-hidden relative
            left-0 transform z-10 h-screen">
                <div class="leftList-rightTop fixed w-20 right-0.5 -rotate-1 select-none">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 173.6 436">
                        <g>
                            <polygon class="cls-2" points="173.6 0 83.9 436 0 203.87 68.5 123 24.07 0 173.6 0" />
                            <polygon class="cls-1"
                                points="84.13 122.02 85.3 125.25 84.26 126.47 143.14 148.06 143.8 144.89 84.13 122.02" />
                        </g>
                        <g class="cursor-pointer" @click="leftPin = !leftPin">
                            <polygon class="cls-1"
                                points="85.3 125.24 85.3 125.25 16.96 205.3 89.27 409.87 143.44 146.64 85.3 125.24" />
                            <path v-show="!leftPin" class="cls-2"
                                d="m121.05,213.97l-15,6.58.17,20.07-10.5,12.6,5.41,9.09-13.89-2.77-10.66,21.02-1.95-23.54-14.28-2.85,8.68-6.28-5.07-15.71,7.98-18.44-11.7-11.91,30.83,6.16,29.97,5.99Zm-23.38,8.43l8.64-6.11-16.24-3.24-16.24-3.24,5.63,8.96-5.33,15.32,1.85,12.39-5.02,5.55,7.53,1.5-.27,18.88,7-17.54,7.53,1.5-2.5-7.05,6.47-10.73.97-16.19Z" />
                        </g>
                        <g v-show="leftPin" class="cursor-pointer pinTrue" @click="leftPin = !leftPin">
                            <g>
                                <polygon class="cls-3" points="173.6 0 24.07 0 68.5 123 0 203.87 83.9 436 173.6 0" />
                            </g>
                            <g>
                                <path class="cls-1"
                                    d="m120.88,214.3c-4.47,3.17-8.94,6.35-13.41,9.52-2.89,9.07-5.78,18.13-8.68,27.2,2.17,4.03,4.34,8.05,6.5,12.08-4.57-.74-9.15-1.49-13.72-2.23-1.41,2.13-3.47,5.26-5.91,9.1-5.55,8.72-6.04,9.98-6.46,9.82-1.32-.51-.39-14.54,7.69-20.04,2.84-1.94,4.16-1.18,6.39-3.35,3.68-3.59,2.92-8.43,3.87-16.37.94-7.85,1.94-16.3,6.89-21.21,1.88-1.86,6.5-5.37,16.82-4.5Z" />
                            </g>
                            <g>
                                <path class="cls-2"
                                    d="m120.88,214.3l-14.23,6.62.21,19.91-9.94,12.56,5.15,8.99-13.2-2.67-10.08,20.92-1.9-23.34-13.58-2.74,8.23-6.28-4.85-15.55,7.54-18.34-11.13-11.74,29.29,5.92,28.48,5.76Zm-22.18,8.51l8.19-6.11-15.43-3.12-15.43-3.12,5.36,8.85-5.02,15.24,1.79,12.28-4.76,5.54,7.15,1.45-.21,18.74,6.61-17.44,7.15,1.45-2.39-6.98,6.12-10.68.88-16.07Z" />
                            </g>
                            <g>
                                <polygon class="cls-4"
                                    points="117.89 213.7 103.66 220.31 103.87 240.22 93.93 252.78 99.08 261.77 85.88 259.1 75.8 280.02 73.9 256.68 60.33 253.94 68.56 247.66 63.71 232.1 71.25 213.76 60.11 202.02 89.41 207.94 117.89 213.7" />
                            </g>
                        </g>
                        <g class="cursor-pointer" @click="show.leftList = false">
                            <polygon class="cls-1" points="170.93 13 44.75 13.37 85.3 125.24 143.44 146.64 170.93 13" />
                            <polygon class="cls-2"
                                points="114.64 66.84 136.26 54.93 103.93 61.27 128.34 119.66 114.64 66.84" />
                            <polygon class="cls-2"
                                points="105.28 84.01 101.76 60.09 153.14 38.38 90.69 55.25 105.28 84.01" />
                        </g>
                    </svg>
                </div>
                <div class="w-[68%] h-full flex justify-start flex-col">
                    <div class="top-buttonsGroup flex flex-col justify-between grow-1 pb-50 pt-50">
                        <button class="btn btn-block" @click="show.list = true">
                            输入函数
                        </button>
                        <button class="btn btn-block" @click="show.adjustWindow = true">
                            设置
                        </button>
                        <button class="btn btn-block" @click="switchRenderer">
                            切换模式
                        </button>
                        <button class="btn btn-block" @click="show.table = true">
                            历史记录
                        </button>
                        <button class="btn btn-block" @click="show.loginModal = true">
                            账户
                        </button>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="bg">
            <div v-if="show.leftList && !leftPin" class="fixed inset-0 z-1 select-none"
                @mousedown="show.leftList = false">
                <div class="absolute inset-0 bg-black/35"></div>
            </div>
        </transition>
        <div class="main-right pt-10 pr-10 pl-3 absolute top-0 right-0 h-full w-full overflow-hidden">
            <img src="/主页面斜黑色矩形/主页面斜黑色矩形.svg" alt=""
                class="fixed inset-0 z-0 object-contain left-0 top-5 w-screen h-screen rotate-1 select-none" />
            <div class="renderComponent h-12/13 w-full relative text-transparent">
                <div
                    class="logo flex item-center gap-4 text-5xl absolute left-[50%] transform -translate-x-[50%] select-none">
                    <h1 class="flex items-center">LOGO v{{ version }}</h1>
                    <img src="/486.1-done.png" alt="" class="w-12 h-12" />
                </div>
                <div v-show="show.render2D" class="h-full w-full pl-20 pb-4 pr-12 pt-8">
                    <TwoDPlotCom ref="TwoDPlotCom" />
                </div>
                <div v-show="!show.render2D" class="h-full w-full">
                    <ThreeDPlotCom ref="ThreeDPlotCom" />
                </div>
                <div class="chart-leftTop select-none">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 173.6 437" class="cursor-pointer"
                        @click="show.leftList = true">
                        <g>
                            <polygon class="cls-2"
                                points="106.28 84.01 102.76 60.09 154.14 38.38 91.69 55.25 106.28 84.01" />
                            <polygon class="cls-2"
                                points="115.64 66.84 137.26 54.93 104.93 61.27 129.34 119.66 115.64 66.84" />
                        </g>
                    </svg>
                </div>
                <div class="chart-rightTop select-none">
                    <div class="user-avatar" :style="{ 'background-image': `url(${userInfo.avatarUrl})` }"
                        @click="show.avatarPreview = !show.avatarPreview">
                    </div>
                </div>
            </div>
            <div class="h-1/13 w-5/6 pr-10 absolute right-0 flex flex-row justify-end overflow-hidden">
                <adjustButtons @setView="setView" />
            </div>
            <transition name="bg">
                <div v-if="show.table" class="fixed inset-0 z-40 select-none" @mousedown="show.table = false">
                    <div class="absolute inset-0 bg-black/35"></div>
                </div>
            </transition>
            <transition name="table">
                <hisDataTable v-if="show.table" :localFnData="localFnData"
                    class="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]
                    bg-base-100 rounded-box border border-base-content/10 overflow-auto lg:w-4xl md:w-xl sm:w-md h-auto z-80" @renderFn="renderFn" @delectData="delectData"
                    @closeTable="show.table = false" @deleteLocalData="deleteLocalData" />
            </transition>
            <transition name="bg">
                <div v-if="show.loginModal || show.registerModal" class="fixed inset-0 z-40 select-none"
                    @mousedown="show.loginModal = false; show.registerModal = false">
                    <div class="absolute inset-0 bg-black/35"></div>
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
                <div v-if="show.adjustWindow" class="fixed inset-0 z-40 select-none"
                    @mousedown="show.adjustWindow = false">
                    <div class="absolute inset-0 bg-black/35"></div>
                </div>
            </transition>
            <transition name="table">
                <adjustWindow v-if="show.adjustWindow" class="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]
                bg-base-100 rounded-box border border-base-content/10 overflow-auto w-lg h-auto z-80"
                    @close="show.adjustWindow = false" />
            </transition>
            <transition name="bg">
                <div v-if="show.avatarPreview" class="fixed inset-0 z-40 select-none"
                    @mousedown="show.avatarPreview = false">
                    <div class="fixed inset-0 bg-black/35"></div>
                    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1000 select-none"
                        @mousedown.stop>
                        <img :src="userInfo.avatarUrl" class="max-h-[80vh] max-w-[80vw] rounded-lg shadow-lg"
                            alt="用户头像" />
                    </div>
                </div>
            </transition>
            <transition name="table">
                <div v-if="show.list" class="fnList2 z-80 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                    select-none pointer-events-none max-w-6/13 max-h-7/13">
                    <div class="relative w-full h-full !pointer-events-none">
                        <ul
                            class="absolute top-3/15 left-4/21 w-16/28 h-5/9 flex flex-col justify-start items-start text-white">
                            <li v-for="(item, index) in displayData.fnData" :key="index"
                                class="flex w-full items-center shrink-0">
                                <div class="flex flex-1 justify-between items-center gap-2">
                                    <div class="flex items-center gap-5 grow">
                                        <ColorPicker format="rgb" shape="circle" :debounce="0" lang="ZH-cn"
                                            popupPosition="left" v-model:pureColor="item.color"
                                            @update:pureColor="throttleupdateColor($event, displayData.startIndex + index)" />
                                        <input type="text" spellcheck="false"
                                            class="w-full h-10 liInput border-0 outline-none" :value="item.fn"
                                            :placeholder="currentInputExample"
                                            @input="debouncedAddInput($event.target.value, displayData.startIndex + index)">
                                    </div>
                                    <div class="liRight flex items-center gap-4">
                                        <img v-if="item.visible" src="/函数表达式输入框组件/隐藏图标（未隐藏状态）.png" alt=""
                                            class="cursor-pointer"
                                            @click="fuckList('visible', displayData.startIndex + index)" />
                                        <img v-else src="/函数表达式输入框组件/隐藏图标（隐藏状态）.png" alt="" class="cursor-pointer"
                                            @click="fuckList('visible', displayData.startIndex + index)">
                                        <img src="/函数表达式输入框组件/垃圾桶.png" alt="" class="cursor-pointer"
                                            @click="fuckList('minus', displayData.startIndex + index)" />
                                    </div>
                                </div>
                            </li>
                            <li v-if="displayData.fnData.length < 5" class=" flex w-full items-center shrink-0">
                                <div class="flex w-full justify-center items-center shrink-0">
                                    <div class="flex flex-1 justify-center items-center gap-5">
                                        <img src="/加号/加号.png" alt="" class="cursor-pointer w-1/15"
                                            @click="fuckList('plus-b', displayData.startIndex + displayData.endIndex + 1)">
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div
                            class="absolute bottom-5/22 left-1/5 w-1/8 h-1/15 flex justify-between items-center min-w-13 text-xl">
                            <img src="/翻页箭头/箭头（金）.png" alt=""
                                :class="['-rotate-90 w-5 h-5', canGoPrevious ? 'cursor-pointer' : 'cursor-not-allowed opacity-50']"
                                @click="changePage('-')" />
                            <div class="flex items-center">
                                <input type="text" class="w-10 h-10 text-xl text-center outline-none border-2 border-transparent
                                    rounded-md focus:border-2 focus:border-[#AEA181] transition-colors duration-100"
                                    :value="currentPage" @input="inputChangePage($event.target.value, $event)" />
                                <p>/</p>
                            </div>
                            <p>{{ this.displayPageCount }}</p>
                            <img src="/翻页箭头/箭头（金）.png" alt=""
                                :class="['rotate-90 w-5 h-5', canGoNext ? 'cursor-pointer' : 'cursor-not-allowed opacity-50']"
                                @click="changePage('+')" />
                        </div>
                    </div>
                </div>
            </transition>
            <transition name="bg">
                <div v-if="show.list" class="fixed inset-0 z-40 select-none bg-black/35" @mousedown="show.list = false">
                    <div class="fixed inset-0"></div>
                </div>
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
                render2D: true,
                adjustWindow: false,
                leftList: false,
                avatarPreview: false
            },
            account: "",
            password: "",
            formData: {},
            fnData: [],
            pagination: {},
            localFnData: [],
            selectedAvatarFile: null,
            currentPage: 1,
            leftPin: true
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
            this.storeDataToVuex(currentData);
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
            return this.show.render2D ? 'eg:8log(cos(sin(sqrt(x^3))))'
                : 'x=1;y=x^2-z^2;log(cos(sin(sqrt(x^3))));cube,width=5,height=5,depth=5;sphere,radius=10'
        },
        currentData() {
            console.log("💩");
            return this.show.render2D ? this.functionData_2D : this.functionData_3D;
        },
        currentPagination() {
            return {
                pageSize: 5,
                totalRecord: this.currentData?.length || 0,
                totalPage: Math.ceil(this.currentData?.length / 5) || 1,
                currentRecord: this.getCurrentRecordCount(),
                currentPage: this.currentPage
            }
        },
        displayData() {
            const startIndex = (this.currentPagination.currentPage - 1) * this.currentPagination.pageSize;
            const endIndex = startIndex + this.currentPagination.pageSize;
            const fnData = this.currentData.slice(startIndex, endIndex);
            return {
                fnData,
                startIndex,
                endIndex
            }
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
        },
        canGoPrevious() {
            return this.currentPagination.currentPage > 1;
        },
        canGoNext() {
            return this.currentPagination.totalPage > this.currentPagination.currentPage ||
                this.currentPagination.currentRecord === 5;
        },
        displayPageCount() {
            return this.currentPage < this.currentPagination.totalPage ? this.currentPagination.totalPage : this.currentPage;
        }
    },
    watch: {
        functionData_2D: {
            handler(newVal) {
                this.uploadUserData(newVal);
            },
            deep: true
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
                    range: item.range
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
                    closed: item.closed,
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
            } else {
                this.$refs.ThreeDPlotCom.setView(evt, this.zoomStep, this.moveStep);
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
                    console.log(this.currentPagination)
                    break;
                }
            }
            this.storeDataToVuex(updatedData);
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
                this.firework();
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
                console.log('头像地址:', res.url);
                const url = {
                    avatarUrl: res.url
                }
                await service.uploadAvatarUrl(url);
            } else {
                console.log('上传头像失败:', error);
            }
        },

        changePage(evt) {
            if (evt === '+' && this.canGoNext) {
                this.currentPage += 1;
            } else if (evt === '-' && this.canGoPrevious) {
                this.currentPage -= 1;
            }
        },

        getCurrentRecordCount() {
            const startIndex = (this.currentPage - 1) * 5;
            const endIndex = Math.min(startIndex + 5, this.currentData?.length || 0);
            return endIndex - startIndex;
        },

        inputChangePage(input, event) {
            const isValidNumber = /^\d+$/.test(input);
            const page = parseInt(input);
            if (isValidNumber && page > 0 && page <= this.currentPagination.totalPage) {
                this.currentPage = page;
            } else if (input !== '') {
                event.target.value = this.currentPage;
            }
        },

        firework() {
            const origin = { y: 0.65, x: 0.5 };
            utils.fire(0.25, {
                spread: 66,
                startVelocity: 75,
                scalar: 0.8
            }, origin);
            utils.fire(0.2, {
                spread: 60
            }, origin);
            utils.fire(0.35, {
                spread: 100,
                decay: 0.91
            }, origin);
            utils.fire(0.3, {
                spread: 130,
                startVelocity: 66,
                decay: 0.92,
                scalar: 1.2
            }, origin);
            utils.fire(0.4, {
                spread: 120,
                startVelocity: 45
            }, origin);
        }
    }
};
</script>

<style>
@import url('../assets/componentCss/home.css');
</style>