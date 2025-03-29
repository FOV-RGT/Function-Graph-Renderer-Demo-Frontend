import { createRouter, createWebHistory } from 'vue-router';
import main from '../views/home.vue';

const routes = [
    { path: '/', redirect: "/home" },
    { path: '/home', component: main },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
