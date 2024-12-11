import { createStore } from 'vuex';
// import { EventBus } from '../eventBus.js'; // 引入事件总线

const store = createStore({
    state: {
        switch3D: false
    },
    mutations: {
        resetRenderer(state, value) {
            state.switch3D = value;
        }
    },
    actions: {
        resetRenderer({ commit }) {
            commit('resetRenderer', true);
        }
    }
});

export default store;
