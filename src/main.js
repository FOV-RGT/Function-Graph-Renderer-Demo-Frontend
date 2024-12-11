import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css'
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style'
import store from './store';

const app = createApp(App);
app.use(router);
app.use(Varlet);
app.use(store);
app.mount('#app');
app.use(Varlet);
