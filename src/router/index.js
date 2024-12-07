import { createRouter, createWebHistory } from 'vue-router';
import demo from '../views/home.vue';
import twoDPlot from '../components/Plot2D.vue';
import threeDPlot from '../components/Plot3D.vue';



const routes = [
    { path: '/', redirect: "/demo" },
    {
        path: '/demo', component: demo, children: [
            { path: '', redirect: '/demo/2dplot' },
            { path: '2dplot', component: twoDPlot },
            { path: '3dplot', component: threeDPlot },
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});



export default router;
