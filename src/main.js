import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css'
import store from './store';
import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(Vue3ColorPicker)
app.mount('#app');
