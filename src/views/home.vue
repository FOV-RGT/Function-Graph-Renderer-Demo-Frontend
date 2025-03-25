<template>
    <div class="main">
        <transition name="menu">
            <div v-if="show.menu" class="main-left flex w-1/3 shrink-1 overflow-x-hidden relative
            left-0 transform z-10 h-screen">
                <div class="menu-rightTop fixed w-1/9 right-0 select-none">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 173.6 436">
                        <g>
                            <polygon class="cls-2" points="173.6 0 83.9 436 0 203.87 68.5 123 24.07 0 173.6 0" />
                            <polygon class="cls-1"
                                points="81.75 122.71 82.3 124.24 80.62 126.31 135.64 145.31 136.3 142.02 81.75 122.71" />
                        </g>
                        <g class="button" @click="leftPin = !leftPin">
                            <polyline class="cls-1" points="12.28 208.19 82.28 407.19 136.28 142.19 82.3 124.24" />
                            <path v-if="!leftPin" class="cls-2"
                                d="m109.55,224.21l-13.76,6.04.16,18.42-9.63,11.56,4.96,8.34-12.75-2.55-9.78,19.29-1.79-21.6-13.11-2.62,7.97-5.76-4.66-14.41,7.33-16.92-10.73-10.93,28.29,5.65,27.51,5.49Zm-21.46,7.74l7.93-5.6-14.91-2.98-14.91-2.98,5.17,8.22-4.89,14.06,1.7,11.37-4.61,5.09,6.91,1.38-.25,17.33,6.43-16.1,6.91,1.38-2.3-6.47,5.94-9.85.89-14.86Z" />
                            <g v-if="leftPin" class="pinTrue">
                                <g>
                                    <polygon class="cls-3"
                                        points="173.6 0 24.07 0 68.5 123 0 203.87 83.9 436 173.6 0" />
                                </g>
                                <g>
                                    <path class="cls-1"
                                        d="m109.55,224.38c-4.1,2.91-8.21,5.83-12.31,8.74-2.66,8.32-5.31,16.65-7.97,24.97,1.99,3.7,3.98,7.39,5.97,11.09-4.2-.68-8.4-1.37-12.6-2.05-1.3,1.96-3.18,4.83-5.42,8.35-5.1,8.01-5.55,9.17-5.93,9.02-1.21-.47-.36-13.35,7.06-18.4,2.61-1.78,3.82-1.08,5.87-3.08,3.38-3.3,2.69-7.74,3.55-15.03.86-7.21,1.78-14.96,6.33-19.47,1.72-1.71,5.97-4.93,15.45-4.14Z" />
                                </g>
                                <g>
                                    <path class="cls-2"
                                        d="m109.55,224.38l-13.07,6.08.19,18.28-9.13,11.53,4.73,8.25-12.12-2.45-9.26,19.21-1.74-21.43-12.46-2.52,7.56-5.77-4.46-14.28,6.93-16.84-10.23-10.78,26.9,5.44,26.15,5.29Zm-20.37,7.81l7.52-5.61-14.17-2.86-14.17-2.86,4.93,8.13-4.62,13.99,1.64,11.28-4.37,5.09,6.57,1.33-.2,17.2,6.07-16.02,6.57,1.33-2.2-6.41,5.62-9.81.81-14.76Z" />
                                </g>
                                <g>
                                    <polygon class="cls-4"
                                        points="106.8 223.82 93.73 229.9 93.92 248.18 84.79 259.71 89.53 267.96 77.41 265.51 68.16 284.72 66.41 263.29 53.95 260.77 61.5 255 57.05 240.72 63.97 223.88 53.75 213.1 80.65 218.54 106.8 223.82" />
                                </g>
                            </g>
                        </g>
                        <g class="button" @click="show.menu = false">
                            <polygon class="cls-1"
                                points="162.28 10.19 41.28 10.19 82.3 124.24 136.28 142.19 162.28 10.19" />
                            <polygon class="cls-2"
                                points="109.08 61.82 129.14 51.28 99.36 56.52 120.71 110.54 109.08 61.82" />
                            <polygon class="cls-2"
                                points="100.19 77.41 97.39 55.39 144.93 36.4 87.32 50.75 100.19 77.41" />
                        </g>
                    </svg>
                </div>
                <menuButtons class="mt-auto mb-auto ml-5" @list="show.list = true"
                    @adjustWindow="show.adjustWindow = true" @switchRenderer="switchRenderer" @table="show.table = true"
                    @loginModal="show.loginModal = true" />
            </div>
        </transition>
        <transition name="bg">
            <div v-if="show.menu && !leftPin" class="fixed inset-0 z-1 select-none" @mousedown="show.menu = false">
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
                        @click="show.menu = true">
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
                    @close="show.adjustWindow = false" @update-all-samples="updateAllFunctionSamplePoints" />
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
                                            @click="fuckList('plus', displayData.startIndex + displayData.endIndex + 1)">
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

            <!-- 临时的右侧小侧边栏（可以考虑以此为原型完成图例以及单一函数的采样点数和图表类型更新） -->
            <transition name="rightSlide">
                <div v-if="show.rightSlide"
                    class="rightSlide fixed top-1/3 right-0 bg-base-100 rounded-l-box shadow-lg border-l border-t border-b border-base-content/10 z-40 select-none">
                    <div class="p-3 flex flex-col gap-3">
                        <div class="flex justify-between items-center mb-2">
                            <button class="btn btn-xs btn-circle" @click="show.rightSlide = false"> DONGMING</button>
                        </div>
                        <div class="max-h-[50vh] overflow-y-auto pr-1">
                            <div v-for="(item, index) in currentData" :key="index"
                                class="flex flex-col gap-2 py-2 border-b border-base-content/10 last:border-0">
                                <!-- 函数基本信息 -->
                                <div class="flex items-center gap-2">
                                    <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: item.color }"></div>
                                    <div class="truncate max-w-[120px]" :title="item.fn">{{ item.fn }}</div>
                                </div>
                                <!-- 采样点设置 -->
                                <div class="flex items-center gap-2">
                                    <span class="text-xs">采样点:</span>
                                    <input type="number" :value="item.nSamples" min="500" max="5000" step="1"
                                        class="input input-xs w-20 text-center ml-auto"
                                        @change="updateFunctionSamplePoints($event.target.value, index)" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
            <!-- 小侧边栏的唤出按钮 -->
            <button
                class="rightSlide-trigger fixed right-0 top-1/3 bg-base-100 rounded-l-box shadow-md border-l border-t border-b border-base-content/10 z-50 p-2 flex items-center justify-center cursor-pointer transform -translate-x-0 hover:brightness-105"
                @click="show.rightSlide = !show.rightSlide">
                <div class="flex flex-col items-center">
                    <icon type="settings" class="text-base-content mb-1" />
                </div>
            </button>
        </div>
    </div>
</template>

<script>
import packageJson from '../../package.json';
import TwoDPlotCom from '../components/render2D.vue';
import ThreeDPlotCom from '../components/render3D.vue';
import icon from '../components/icon.vue';
import { mapGetters } from 'vuex';
import { toRaw } from 'vue';
import * as utils from '../assets/utils/componentUtils';
import { parse } from 'mathjs';
import * as service from '../services/userService';
import hisDataTable from '../components/hisDataTable.vue';
import register from '../components/register.vue';
import popupWindow from '../components/popupWindow.vue';
import adjustButtons from '../components/adjustButtons.vue';
import adjustWindow from '../components/adjustWindow.vue';
import menuButtons from '../components/menuButtons.vue';



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
        adjustWindow,
        menuButtons
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
                menu: true,
                avatarPreview: false,
                rightSlide: false, // 右侧侧边栏的显示/隐藏
            },
            account: "",
            password: "",
            formData: {},
            fnData: [],
            pagination: {},
            selectedAvatarFile: null,
            currentPage: 1,
            leftPin: true,
            local2DData: [],
            local3DData: [],
        };
    },

    created() {
        // 输入防抖
        this.debouncedAddInput = utils.debounce((input, index) => {
            const formatInput = input.replace(/\s+/g, "");
            const newData = [...toRaw(this.currentData)];
            newData[index].fn = formatInput;
            this.storeData(newData[index]);
            this.storeDataToVuex(newData);
            if (this.show.render2D) {
                try {
                    parse(formatInput);
                } catch (error) {
                    console.log('输入错误:', error);
                    return;
                }
            }
            if (this.currentData[index].visible) {
                if (this.is2D) {
                    this.$refs.TwoDPlotCom.fuckRender(this.currentData);
                } else {
                    this.$refs.ThreeDPlotCom.handleInput(newData[index], index);
                }
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
            this.throttleStoreData(currentData[index]);
            this.storeDataToVuex(currentData);
            if (this.currentData[index].visible) {
                if (this.is2D) {
                    this.$refs.TwoDPlotCom.fuckRender(this.functionData_2D);
                } else {
                    this.$refs.ThreeDPlotCom.setObjectColor(color, index);
                }
            }
        }, 25);
        this.throttleStoreData = utils.throttle((data) => {
            this.storeData(data);
        }, 750);
        this.throttleUploadUserData2D = utils.throttle((data) => {
            this.uploadUserData(data, 2);
        }, 750);
        this.throttleUploadUserData3D = utils.throttle((data) => {
            this.uploadUserData(data, 3);
        }, 750);
    },
    async mounted() {
        const { success, error } = await service.initUserData();
        if (success) {
            this.fuckRender();
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
        ...mapGetters(["functionData_2D", "functionData_3D", "is2D"]),
        ...mapGetters('auth', ['userInfo', 'displayName', 'isAuthenticated',
            'chartType', 'closed', 'range', 'dash', 'grid', 'zoomFactor', 'moveFactor'
        ]),
        currentInputExample() {
            return this.show.render2D ? 'e.g. 8log(cos(sin(sqrt(x^3))))'
                : 'e.g. y=x^2-z^2'
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
        },
        localFnData() {
            return this.is2D ? this.local2DData : this.local3DData;
        }
    },
    watch: {
        functionData_2D: {
            handler(newVal) {
                this.throttleUploadUserData2D(newVal);
            },
        },
        functionData_3D: {
            handler(newVal) {
                this.throttleUploadUserData3D(newVal);
            },
        },
        chartType: {
            handler(newVal) {
                this.$refs.TwoDPlotCom.switchChartType(newVal);
            },
        },
        closed: {
            handler(newVal) {
                if (!this.is2D) return;
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
                this.$refs.TwoDPlotCom.fuckRender(newData);
                this.storeDataToVuex(newData);
            },
        },
        range: {
            handler(newVal) {
                if (!this.is2D) return
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
                this.$refs.TwoDPlotCom.fuckRender(newData);
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
        },
        is2D: {
            handler(newVal) {
                this.show.render2D = newVal;
            },
        },
    },
    methods: {
        switchRenderer() {
            this.throttledResize();
            this.$store.commit('switchRender');
        },

        //将缩放步长和移动步长传递给2D图标实例
        setView(evt) {
            if (this.show.render2D) {
                this.$refs.TwoDPlotCom.setView(evt, this.zoomStep, this.moveStep);
            } else {
                this.$refs.ThreeDPlotCom.setView(evt, this.zoomStep, this.moveStep);
            }
        },

        fuckRender(data_2D = this.functionData_2D, data_3D = this.functionData_3D) {
            this.$refs.TwoDPlotCom.fuckRender(data_2D);
            this.$refs.ThreeDPlotCom.handleArrayInput(data_3D);
        },

        fuckList(evt, index) {
            const updatedData = [...toRaw(this.currentData)];
            switch (evt) {
                case 'plus': {
                    let fnData = {};
                    if (this.is2D) {
                        fnData = {
                            fn: '',
                            color: utils.generateRandomHarmoniousColor(),
                            nSamples: 2025, // 确保有默认采样点数
                            visible: true,
                            dimension: 2,
                            graphType: 'interval', // 添加默认图表类型
                            closed: this.closed,
                            range: this.range
                        };
                    } else {
                        fnData = {
                            fn: '',
                            color: utils.generateRandomHarmoniousColor(),
                            visible: true,
                            uuid: null,
                            dimension: 3
                        }
                    }
                    this.storeData(fnData);
                    updatedData.push(fnData);
                    break;
                }
                case 'minus': {
                    updatedData.splice(index, 1);
                    if (this.is2D) {
                        this.$refs.TwoDPlotCom.fuckRender(updatedData);
                    } else {
                        this.$refs.ThreeDPlotCom.delectObject(index);
                    }
                    break;
                }
                case 'visible': {
                    updatedData[index].visible = !updatedData[index].visible;
                    this.storeData(updatedData[index]);
                    if (this.is2D) {
                        this.$refs.TwoDPlotCom.fuckRender(updatedData);
                    } else {
                        this.$refs.ThreeDPlotCom.switchObjectVisible(updatedData[index].visible, index);
                    }
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
                if (needNewData) {
                    this.fuckRender();
                }
                this.$store.commit('setUpload', true);
                if (this.local2DData.length > 0) {
                    await this.uploadUserData(this.local2DData, 2);
                    this.local2DData = [];
                }
                if (this.local3DData.length > 0) {
                    await this.uploadUserData(this.local3DData, 3);
                    this.local3DData = [];
                }
                this.show.loginModal = false;
                this.initFormData();
                this.firework();
                setTimeout(() => {
                    this.show.info = true;
                }, 400);
            } else {
                const data = {
                    head: '登录失败：',
                    messages,
                    target: 'body'
                }
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
            const data_3D = utils.deepClone(this.functionData_3D)
            // const data_3D = [];
            this.local2DData = [...data_2D];
            this.local3DData = [...data_3D];
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

        //单一函数采样点数更新
        updateFunctionSamplePoints(samples, index) {
            if (!this.show.render2D || !this.$refs.TwoDPlotCom) return;
            const validSamples = Math.max(500, Math.min(5000, Number(samples)));
            this.$refs.TwoDPlotCom.updateSamplePoints(validSamples, index);
            //同步更新本地数据和Vuex数据
            const data = [...toRaw(this.currentData)];
            if (data[index]) {
                data[index].nSamples = validSamples;
                this.storeDataToVuex(data);
            }
        },

        //全部函数采样点数更新（无敌蜜汁超绝长命名）
        updateAllFunctionSamplePoints(samples) {
            if (!this.show.render2D || !this.$refs.TwoDPlotCom) return;
            const validSamples = Math.max(500, Math.min(5000, Number(samples)));
            this.$refs.TwoDPlotCom.updateSamplePoints(validSamples);
            //同步更新所有函数的采样点数据到本地和Vuex
            const data = toRaw(this.currentData).map(item => {
                if (item) {
                    return { ...item, nSamples: validSamples };
                }
                return item;
            });
            //存储到Vuex (确保触发响应式更新)
            this.storeDataToVuex(data);
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
            const { data_2D, data_3D } = data;
            if (data_2D.length > 0) {
                const newData_2D = [...toRaw(this.functionData_2D)];
                newData_2D.push(...data_2D);
                const payload2D = {
                    data: newData_2D,
                    is2D: true,
                    needUpload: true
                };
                this.$store.commit('syncData', payload2D);
                this.$refs.TwoDPlotCom.fuckRender(newData_2D);
            }
            if (data_3D.length > 0) {
                const newData_3D = [...toRaw(this.functionData_3D)];
                const startIndex = newData_3D.length;
                newData_3D.push(...data_3D);
                const payload3D = {
                    data: newData_3D,
                    is2D: false,
                    needUpload: true
                };
                this.$store.commit('syncData', payload3D);
                this.$refs.ThreeDPlotCom.handleArrayInput(data_3D, startIndex);
            }
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

        async uploadUserData(data, dimension) {
            if (!this.isAuthenticated || data.length === 0) return;
            const { success, skip, error } = await service.uploadFunctionData(data, dimension);
            if (success) {
                console.log('上传数据成功');
            } else if (skip) {
                console.log('跳过本次更新');
            } else {
                console.log('上传数据失败:', error);
            }
        },

        deleteLocalData(deleteIds) {
            if (this.is2D) {
                this.local2DData = this.local2DData.filter(item => !deleteIds.has(item.id));
            } else {
                this.local3DData = this.local3DData.filter(item => !deleteIds.has(item.id));
            }
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
                const storeData = utils.deepClone(data);
                if (this.is2D) {
                    this.local2DData.unshift(storeData);
                } else {
                    this.local3DData.unshift(storeData);
                }
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