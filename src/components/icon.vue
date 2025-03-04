<template>
    <i class="iconfont" :class="[iconclass, extraclass]"></i>
</template>

<script>
var map = {
    arrowleft: "icon-arrowleft",
    arrowright: "icon-arrowright",
    aim: "icon-aim",
    compress: "icon-compress",
    expand: "icon-expend",
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
@import url('https://at.alicdn.com/t/c/font_4845730_vqxqlmqktee.css?spm=a313x.manage_type_myprojects.i1.9.5bfc3a819mjXLH&file=font_4845730_vqxqlmqktee.css');
</style>