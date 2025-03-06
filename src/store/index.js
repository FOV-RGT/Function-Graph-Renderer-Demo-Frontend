import { createStore } from 'vuex';

const store = createStore({
    state: {
        switch3D: false,
        functionData_2D: [{fn: '2sin(2x)'},{fn: '3cos(log(x^10))'},{fn: '8log(cos(sin(sqrt(x^3))))'},{fn: 'x=5'},{fn: 'x=-5'}],
        functionData_3D: [{fn: 'x=1'},{fn: 'y=x^2-z^2'},{fn: 'log(cos(sin(sqrt(x^3))))'},{fn: 'cube,width=5,height=5,depth=5'},{fn: 'sphere,radius=10'}],
    },
    mutations: {
        switchRender(state, is2D) {
            if (is2D) {
                state.switch3D = false;
            } else {
                state.switch3D = true;
            }
        },
        syncData(state, payload) {
            if (payload.is2D) {
                state.functionData_2D = payload.data;
            }
            else {
                state.functionData_3D = payload.data;
            }
        },
    },
    actions: {
        
    }
});

export default store;
