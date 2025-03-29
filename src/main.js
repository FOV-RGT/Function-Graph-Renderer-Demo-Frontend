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
app.use(Vue3ColorPicker);
app.mount('#app');



window.onerror = function (message, source, lineno, colno, error) {
    // 检查是否是symbol未定义错误
    if (message.includes('symbol') && message.includes('undefined')) {
        const symbolMatch = message.match(/symbol "([^"]+)" is undefined/);
        if (symbolMatch && symbolMatch[1]) {
            const errorMessage = `函数中包含未定义的变量 >>> ${symbolMatch[1]}`;
            store.commit('toast', {
                head: '函数解析错误',
                messages: [errorMessage],
                target: 'body'
            });
        }
        // 返回true表示错误已处理
        return true;
    }
    return false;
};