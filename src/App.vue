<template>
    <div id="app">
        <transition name="fade">
            <div v-if="showSplash">
                <SplashScreen @splash-end="showSplash = false" />
            </div>
            <div v-else>
                <router-view />
            </div>
        </transition>
    </div>
</template>

<script>
import SplashScreen from './components/SplashScreen.vue'
export default {
    components: { SplashScreen },
    data() {
        return {
            showSplash: true
        }
    }
}
</script>

<style scoped>
#app {
    width: 100dvw;
    height: 100dvh;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity 1.2s cubic-bezier(0.4,0,0.2,1);
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
.fade-enter-to, .fade-leave-from {
    opacity: 1;
}
</style>