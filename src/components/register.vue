<template>
    <div class="flex items-center justify-center lg:w-2xl md:w-xl sm:w-md">
        <div v-if="!loading.registerSuccess" class="w-full" ref="formContainer">
            <form @submit.prevent="register">
                <fieldset class="fieldset w-auto bg-base-200 border border-base-300 p-4 rounded-box text-xl">
                    <div class="fieldset-label cursor-default flex items-center justify-center">
                        <span class="text-center text-2xl text-primary select-none">Register</span>
                    </div>
                    <div class="fieldset-label flex justify-between items-center">
                        <span class="cursor-default select-none">账号</span>
                        <!-- <button type="button" class="btn btn-warning"
                        @click="loading.registerSuccess = !loading.registerSuccess">666666
                        </button>
                        <button type="button" class="btn btn-warning"
                        @click="fireWorks">555555
                        </button> -->
                        <button type="button" class="register-btn btn btn-soft btn-info btn-md w-[10em]
                            flex items-center justify-evenly p-0" @click="switchModal">
                            <span class="text-lg">已有账号？</span>
                            <icon type="smile" />
                        </button>
                    </div>
                    <input type="text" required class="input validator w-auto" placeholder="Account" minlength="2"
                        maxlength="45" title="账号长度至少两位" v-model="formData.account" />
                    <div class="fieldset-label cursor-default select-none">
                        <span>昵称</span>
                    </div>
                    <input type="text" required class="input validator w-auto" v-model="formData.nickname" minlength="2"
                        maxlength="45" placeholder="Nickname" title="昵称长度至少两位" />
                    <div class="fieldset-label cursor-default select-none">
                        <span>邮箱</span>
                    </div>
                    <input type="email" required class="input validator w-auto" v-model="formData.email"
                        placeholder="Email" title="请输入有效邮箱地址" autocomplete="new-email" />
                    <div class="fieldset-label cursor-default select-none">
                        <span>密码</span>
                    </div>
                    <input type="password" required class="input validator w-auto" v-model="formData.password"
                        placeholder="Password" minlength="6" maxlength="45" autocomplete="new-password" title="密码长度至少六位"
                        :class="[{ '!input-error': formData.confirmPassword && !passwordsMatch }]" />
                    <p v-if="formData.confirmPassword && !passwordsMatch" class="text-error text-md select-none">
                        两次输入的密码不一致
                    </p>
                    <div class="fieldset-label cursor-default select-none">
                        <span>确认密码</span>
                    </div>
                    <input type="password" required class="input validator w-auto" v-model="formData.confirmPassword"
                        placeholder="ConfirmPassword" minlength="6" maxlength="45" autocomplete="new-password"
                        title="密码长度至少六位" :class="[{ '!input-error': formData.confirmPassword && !passwordsMatch }]" />
                    <p v-if="formData.confirmPassword && !passwordsMatch" class="text-error text-md select-none">
                        两次输入的密码不一致
                    </p>
                    <button type="submit" class="btn btn-success btn-soft mt-4"
                        :disabled="!isFormValid || loading.tryRegister">
                        <div v-if="!loading.tryRegister" class="register-btn flex items-center gap-3">
                            <span class="text-xl">注册</span>
                            <icon type="solution" />
                        </div>
                        <span v-else class="loading loading-spinner"></span>
                    </button>
                </fieldset>
            </form>
        </div>
        <div v-if="loading.registerSuccess"
            class="registering-modal w-full flex items-center justify-center select-none"
            :style="{ height: formHeight + 'px' }">
            <div v-if="loading.tryLogin" class="flex items-center justify-center gap-2 text-4xl">
                <span>正在尝试自动登录</span>
                <span class="loading loading-spinner loading-xl"></span>
            </div>
            <div v-if="!loading.tryLogin && loading.loginSuccess" class="flex items-center justify-center gap-2">
                <span class="text-4xl text-success">登录成功</span>
                <icon type="smileFill" class="text-success" />
            </div>
            <div v-if="!loading.tryLogin && !loading.loginSuccess" class="flex items-center justify-center gap-2">
                <span class="text-4xl text-error">自动登录失败，请尝试手动登录</span>
                <icon type="frownFill" class="text-error" />
            </div>
        </div>
    </div>
</template>

<script>
import icon from './icon.vue';
import { register } from '../services/userService';


export default {
    components: {
        icon,
    },
    data() {
        return {
            formData: {
                nickname: '',
                email: '',
                account: '',
                password: '',
                confirmPassword: ''
            },
            loading: {
                tryRegister: false,
                registerSuccess: false,
                tryLogin: false,
                loginSuccess: false,
            },
            formHeight: 540,
            resizeObserver: null,
        }
    },
    created() {

    },
    mounted() {
        this.$nextTick(() => {
            const formElement = this.$refs.formContainer;
            const height = formElement.offsetHeight;
            if (height > 42) {
                this.formHeight = formElement.offsetHeight;
            }
            this.resizeObserver = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    if (entry.contentRect.height > 42) {
                        this.formHeight = entry.contentRect.height;
                    }
                };
            });
            this.resizeObserver.observe(formElement);
        })
    },
    beforeUnmount() {
        this.resizeObserver.disconnect();
    },
    computed: {
        passwordsMatch() {
            return !this.formData.password || !this.formData.confirmPassword ||
                this.formData.password === this.formData.confirmPassword;
        },
        isFormValid() {
            return this.formData.account &&
                this.formData.nickname &&
                this.formData.email &&
                this.formData.password &&
                this.formData.confirmPassword &&
                this.passwordsMatch;
        }
    },
    watch: {

    },
    methods: {
        async register() {
            if (!this.isFormValid) {
                return;
            }
            this.loading.tryRegister = true;
            const registerData = {
                nickname: this.formData.nickname,
                email: this.formData.email,
                username: this.formData.account,
                password: this.formData.password,
            };
            const { success, messages } = await register(registerData);
            if (success) {
                this.loading.registerSuccess = true;
                this.login(registerData);
            } else {
                this.loading.registerSuccess = false;
                const data = {
                    head: '注册失败：',
                    messages,
                    target: 'body',
                    time: 4000
                }
                this.$emit('message', data);
            }
            this.loading.tryRegister = false;
        },
        switchModal() {
            this.$emit('switchModal');
        },
        login(data) {
            const loginData = {
                login: data.username || data.email,
                password: data.password
            }
            const callback = (success) => {
                this.loading.tryLogin = false;
                if (success) {
                    this.loading.loginSuccess = true;
                } else {
                    this.loading.loginSuccess = false;
                }
            }
            this.loading.tryLogin = true;
            this.$emit('login', loginData, callback);
        },
        init() {
            this.formData = {
                nickname: '',
                email: '',
                account: '',
                password: '',
                confirmPassword: ''
            };
            this.loading = {
                tryRegister: false,
                registerSuccess: false,
                tryLogin: false,
                loginSuccess: false,
            };
        },
    }
}
</script>

<style scoped>
.register-btn .iconfont {
    font-size: 1.8em;
}

.registering-modal .iconfont {
    font-size: 2.5em;
}
</style>