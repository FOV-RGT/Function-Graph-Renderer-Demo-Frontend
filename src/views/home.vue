<template>
    <div class="home">
        <h1 style="margin-bottom: 0;">函数图形渲染程序<sub style="font-size: 0.6em;">demo v{{ packageVersion }}</sub></h1>
        <div class="buttonGroup">
            <var-button text outline type="primary">
                <router-link to="/demo/2dplot" class="link">二维函数图形绘制
                </router-link>
            </var-button>
            <var-button text outline type="primary">
                <router-link to="/demo/3dplot" class="link">三维函数图形绘制
                </router-link>
            </var-button>
        </div>
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import packageJson from '../../package.json';

export default {
    name: 'home',
    data() {
        return {
            packageVersion: packageJson.version, // 获取版本号
            loadChildB: false  // 控制B子路由的渲染
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        ...mapActions(['init'])
    }
};
</script>

<style scoped>

/* 样式代码保持不变 */
h1 {
    background: linear-gradient(60deg, #2b2e4a, #423268, #623080, #842790, #a51d96, #c11b8f, #d72c78, #e84545);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.home {
    position: absolute;
    top: 0;
    margin: 0;
    left: 50%;
    transform: translateX(-50%);
    letter-spacing: 0.1em;
    width: 100%;
    height: 100%;
}

.buttonGroup {
    display: flex;
    margin: auto;
    justify-content: space-evenly;
    align-items: center;
    width: 22em;
    height: 2em;
}

.buttonGroup .var-button {
    user-select: none;
    border-radius: 0.5em;
    border: rgb(48, 135, 185) solid 0.1em;
}

.buttonGroup .var-button .link {
    letter-spacing: 0.05em;
    text-decoration: none;
    font-size: 1.2em;
    color: rgb(48, 135, 185);
}

.buttonGroup .var-button .router-link-active {
    font-weight: bold;
    font-size: 1.4em;
}
</style>
