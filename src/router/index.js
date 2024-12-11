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

export default router;
