<template>
    <div v-if="show" :class="['splash-mask', { 'fade-out': isFading }]" @transitionend="onTransitionEnd">
        <video ref="splashVideo" src="/动画/开屏动画/open2.webm" class="splash-video" autoplay muted playsinline
            @ended="onEnd"></video>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: true,
            isFading: false
        }
    },
    methods: {
        onEnd() {
            this.isFading = true; // 开始淡出
        },
        onTransitionEnd() {
            if (this.isFading) {
                this.show = false;
                this.$emit('splash-end');
            }
        }
    }
}
</script>

<style scoped>
.splash-mask {
    position: fixed;
    z-index: 20;
    inset: 0;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.6s cubic-bezier(0.4,0,0.2,1);
    opacity: 1;
}
.splash-mask.fade-out {
    opacity: 0;
}
.splash-video {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
}
</style>