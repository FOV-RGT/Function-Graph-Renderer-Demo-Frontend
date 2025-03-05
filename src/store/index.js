import { createStore } from 'vuex';

const store = createStore({
    state: {
        switch3D: false,
        userInput_2D: '2sin(2x);3cos(log(x^10));8log(cos(sin(sqrt(x^3))));x=5;x=-5',
        userInput_3D: 'x=1;y=x^2-z^2;log(cos(sin(sqrt(x^3))));cube,width=5,height=5,depth=5;sphere,radius=10',
        functionData: [],
        formatInput_2D: new Map,
        formatInput_3D: []
    },
    mutations: {
        switchRender(state, is2D) {
            if (is2D) {
                state.switch3D = false;
            } else {
                state.switch3D = true;
            }
        },
        userInput(state, payload) {
            if (payload.is2D) {
                state.userInput_2D = payload.input;
            }
            else {
                state.userInput_3D = payload.input;
            }
        },
        addData(state, data) {
            state.functionData = data;
        },
        syncInput(state, fn) {
            state.userInput_2D = fn;
        }
    },
    actions: {
        
    }
});

export default store;
