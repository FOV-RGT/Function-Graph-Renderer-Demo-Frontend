<template>
    <teleport :to=target>
        <transition name="popupWindow">
            <div v-show="showMessage" role="alert" class="alert alert-error alert-soft absolute top-4 left-[50%] z-1000 p-4 
                transform -translate-x-[50%] min-w-80 max-w-7xl text-xl select-none">
                <span>{{ head }}</span>
                <div class="flex flex-wrap gap-2">
                    <p v-for="(item, index) in messages" :key="index" v-text="item"></p>
                </div>
                <button class="btn btn-error btn-ghost" @click="closeMessage">
                    <icon type="close" />
                </button>
            </div>
        </transition>
    </teleport>
</template>

<script>
import icon from './icon.vue';


export default {
    components: {
        icon
    },
    data() {
        return {
            messagesQueue: [],
            messages: [],
            head: '',
            showMessage: false,
            target: 'body',
            timeout: null
        }
    },
    methods: {
        addMessage(messages) {
            this.messagesQueue.push(messages);
            if (!this.showMessage) {
                this.nextMessage();
            } else {
                this.closeMessage();
            }
        },
        nextMessage() {
            if (this.messagesQueue.length > 0) {
                clearTimeout(this.timeout);
                const { head, messages, target } = this.messagesQueue.shift();
                this.head = head || '';
                this.messages = messages || '';
                this.target = target || 'body';
                this.showMessage = true;
                this.timeout = setTimeout(() => {
                    this.closeMessage();
                }, 2000)
            }
        },
        closeMessage() {
            this.showMessage = false;
            setTimeout(() => {
                this.nextMessage();
            }, 200);
        }
    }
}
</script>

<style scoped>
.popupWindow-enter-active,
.popupWindow-leave-active {
    transition: all 0.15s ease;
}

.popupWindow-enter-from,
.popupWindow-leave-to {
    opacity: 0.5;
    transform: translateY(-20px);
}
</style>