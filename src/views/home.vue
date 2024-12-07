<template>
<div class="home">
    <h1 style="margin-bottom: 0;">Home Page</h1>
    <nav>
        <router-link to="/demo/2dplot">二维函数图形绘制</router-link>
        <router-link to="/demo/3dplot">三维函数图形绘制</router-link>
    </nav>
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
}

nav a {
    margin-right: 10px;
    text-decoration: none;
    color: #42b983;
}

nav a.router-link-active {
    font-weight: bold;
}
</style>
