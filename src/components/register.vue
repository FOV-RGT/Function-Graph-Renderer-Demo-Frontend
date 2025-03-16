<template>
    <div class="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-base-100 rounded-box
    border border-base-content/10 overflow-auto lg:w-2xl md:w-xl sm:w-md h-auto z-80">
        <form @submit.prevent="register">
            <fieldset class="fieldset w-auto bg-base-200 border border-base-300 p-4 rounded-box text-xl">
                <div class="fieldset-label cursor-default flex items-center justify-center">
                    <span class="text-center text-2xl text-amber-700/90 select-none">Register</span>
                </div>
                <div class="fieldset-label flex justify-between items-center">
                    <span class="cursor-default select-none">账号</span>
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
                    maxlength="45" placeholder="Nickname" title="昵称长度至少两位"/>
                <div class="fieldset-label cursor-default select-none">
                    <span>邮箱</span>
                </div>
                <input type="email" required class="input validator w-auto" v-model="formData.email"
                    placeholder="Email" title="请输入有效邮箱地址"/>
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
                    placeholder="ConfirmPassword" minlength="6" maxlength="45" autocomplete="new-password" title="密码长度至少六位"
                    :class="[{ '!input-error': formData.confirmPassword && !passwordsMatch }]"/>
                <p v-if="formData.confirmPassword && !passwordsMatch" class="text-error text-md select-none">
                    两次输入的密码不一致
                </p>
                <button type="submit" class="btn btn-success btn-soft mt-4" :disabled="!isFormValid || loading">
                    <div v-if="!loading" class="login-btn flex items-center gap-3">
                        <span class="text-xl">注册</span>
                        <icon type="login" class="flex items-center" />
                    </div>
                    <span v-else class="loading loading-spinner"></span>
                </button>
            </fieldset>
        </form>
    </div>
</template>

<script>
import icon from './icon.vue';
import { register } from '../services/userService';


export default {
    components: {
        icon
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
            loading: false
        }
    },
    created() {

    },
    mounted() {

    },
    beforeUnmount() {

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
            this.loading = true;
            const data = {
                nickname: this.formData.nickname,
                email: this.formData.email,
                username: this.formData.account,
                password: this.formData.password,
            };
            const { success, error } = await register(data);
            if (success) {
                console.log('注册成功');
            } else {
                console.error(error);
            }
            this.loading = false;
        },
        switchModal() {
            this.$emit('switchModal');
        }
    }
}
</script>

<style scoped></style>