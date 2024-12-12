import { createStore } from 'vuex';

const store = createStore({
    state: {
        switch3D: false
    },
    mutations: {
        resetRenderer(state, value) {
            state.switch3D = value;
        },
        toggleSwitch3D(state) {
            state.switch3D = !state.switch3D;
        },
    },
    actions: {
        resetRenderer({ commit }) {
            commit('resetRenderer', true);
        },
    }
});

export default store;
