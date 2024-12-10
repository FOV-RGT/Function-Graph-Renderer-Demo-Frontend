import { createStore } from 'vuex';
// import { EventBus } from '../eventBus.js'; // 引入事件总线

const store = createStore({
    state: {
        initialized: false,
    },
    mutations: {
        setInitialized(state, value) {
            state.initialized = value;
            console.log(state.initialized);
            // if (state.initialized) {
            //     EventBus.emit('initializedUpdated'); // 广播初始化事件
            // }
        }
    },
    actions: {
        init({ commit }) {
            commit('setInitialized', true);
            console.log('111');
        }
    }
});

export default store;
