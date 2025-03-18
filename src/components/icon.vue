<template>
    <i class="iconfont" :class="[iconclass, extraclass]"></i>
</template>

<script>
import { image } from 'd3';


const map = {
    arrowLeft: "icon-arrowleft",
    arrowRight: "icon-arrowright",
    aim: "icon-aim",
    compress: "icon-compress",
    expand: "icon-expend",
    plus: "icon-plus",
    minus: "icon-minus",
    z_in: "icon-zoomin",
    z_out: "icon-zoomout",
    eye: "icon-eye",
    eye_c: "icon-eye-close",
    close_c: "icon-close-circle",
    login: "icon-login",
    logout: "icon-logout",
    rollBack: "icon-rollback",
    arrowUp: "icon-arrowup",
    arrowDown: "icon-arrowdown",
    check: "icon-check",
    close: "icon-close",
    doubleLeft: "icon-doubleleft",
    doubleRight: "icon-doubleright",
    smile: "icon-smile",
    solution: 'icon-solution',
    smileFill: 'icon-smile-fill',
    frown: 'icon-frown',
    frownFill: 'icon-frown-fill',
    image: 'icon-image',
};
export default {
    props: {
        type: {
            type: String,
            required: true,
        },
        extraclass: {
            type: String,
            default: '',
        },
    },
    computed: {
        iconclass() {
            return map[this.type];
        },
    },
};
</script>

<style scoped>
@import url('https://at.alicdn.com/t/c/font_4845730_zl6k85cnyeo.css?spm=a313x.manage_type_myprojects.i1.9.7c703a81dL8zLL&file=font_4845730_zl6k85cnyeo.css');
</style>