<template>
<div class="home">
    <h1 style="margin-bottom: 0;">函数图形渲染程序<sub>demo</sub></h1>
    <div class="button">
        <var-button color="linear-gradient(to right bottom, #6750A4, #D0BCFF)"
        text-color="#fff">
            <router-link to="/demo/2dplot">二维函数图形绘制</router-link>
        </var-button>
        <var-button type="primary">
            <router-link to="/demo/3dplot">三维函数图形绘制</router-link>
        </var-button>
    </div>
    <router-view></router-view>
</div>
</template>

<script>
export default {
    name: 'home'
};
</script>

<style scoped>
.home {
    position: absolute;
    top: 0;
    margin: 0;
    left: 50%;
    transform: translateX(-50%);
    letter-spacing: 0.1em;
}

.button {
    margin: 0.8em;
    letter-spacing: 0.05em;
    text-decoration: none;
}

.button .router-link-active {
    font-weight: bold;
}
</style>
