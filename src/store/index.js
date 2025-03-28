import { createStore } from 'vuex';
import auth from './modules/auth';

const store = createStore({
    state: {
        is2D: true,
        // functionData_2D: [{ fn: '1/x*cos(1/x)' }, { fn: '3cos(log(x^10))' }, { fn: '8log(cos(sin(sqrt(x^3))))' }, { fn: '5' }, { fn: '-5' }],
        // functionData_3D: [{ fn: 'x=1', visible: true }, { fn: 'y=x^2-z^2', visible: true }, { fn: 'y=log(cos(sin(sqrt(x^3))))', visible: true }, { fn: 'cube,width=5,height=5,depth=5', visible: true }, { fn: 'sphere,radius=10', visible: true }],
        functionData_2D: [],
        functionData_3D: [],
        needUpload: true,
        GLTFfile: null,
        globalSamples: 2025,
        messagesData: {},
        GLTFLoadProgress: 0,
        GLTFLoadStatus: 'success',
    },
    getters: {
        is2D: state => state.is2D,
        functionData_2D: state => state.functionData_2D,
        functionData_3D: state => state.functionData_3D,
        needUpload: state => state.needUpload,
        GLTFfile: state => state.GLTFfile,
        Objectuuid: state => state.functionData_3D.map(item => item.uuid),
        globalSamples: state => state.globalSamples,
        messagesData: state => state.messagesData,
        GLTFLoadProgress: state => state.GLTFLoadProgress,
        GLTFLoadStatus: state => state.GLTFLoadStatus,
    },
    mutations: {
        switchRender(state) {
            state.is2D = !state.is2D;
        },
        syncData(state, payload) {
            if (payload.is2D) {
                state.functionData_2D = payload.data;
            }
            else {
                state.functionData_3D = payload.data;
            }
            state.needUpload = payload.needUpload;
        },
        setUpload(state, needUpload) {
            state.needUpload = needUpload
        },
        uploadGLTF(state, GLTFfile) {
            state.GLTFfile = GLTFfile;
        },
        syncObjectuuid(state, payload) {
            state.functionData_3D[payload.index].uuid = payload.uuid;
        },
        storeObjectVisible(state, payload) {
            state.functionData_3D[payload.index].visible = payload.visible;
        },
        toast(state, data) {
            state.messagesData = data;
        },
        syncGLTFLoadProgress(state, progress) {
            state.GLTFLoadProgress = progress;
        },
        syncGLTFLoadStatus(state, status) {
            state.GLTFLoadStatus = status;
        }
    },
    actions: {
        
    },
    modules: {
        auth
    }
});

export default store;