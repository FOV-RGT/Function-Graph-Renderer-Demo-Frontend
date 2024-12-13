import { createStore } from 'vuex';

const store = createStore({
    state: {
        switch3D: false,
        input2D: '',
        input3D: '',
    },
    mutations: {
        toggleSwitch3D(state) {
            state.switch3D = !state.switch3D;
        },
        render(state, input) {
            if (state.switch3D) {
                state.input3D = input;
            } else {
                state.input2D = input;
            }
        }
    },
    actions: {
        
    }
});

export default store;
