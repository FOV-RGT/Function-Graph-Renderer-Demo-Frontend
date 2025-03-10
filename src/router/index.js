import { createRouter, createWebHistory } from 'vue-router';
import demo from '../views/home.vue';

const routes = [
    { path: '/', redirect: "/demo" },
    { path: '/demo', component: demo },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // 将登录状态设置到Vuex中的一个专用字段
        store.commit('auth/setLoginRequired', !store.state.auth.isAuthenticated);
    }
    // 总是允许访问
    next();
});

export default router;
