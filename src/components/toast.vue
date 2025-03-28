<template>
    <teleport :to=target>
        <transition name="toast">
            <div v-show="showMessage" class="fixed bottom-[15%] right-2 z-50 max-w-[30%] max-h-[20%] min-w-42">
                <div class="bg-slate-900 shadow-2xl rounded-md border-slate-400/50 border-1
                p-4 items-center justify-between relative">
                    <div class="flex flex-col items-start">
                        <div class="flex items-center justify-between w-full gap-4">
                            <h1 class="text-2xl text-[#d4bd81] whitespace-nowrap">{{ head }}</h1>
                            <button class="btn btn-ghost btn-primary btn-sm w-8 ml-auto" @click="closeMessage">
                                <icon type="close" />
                            </button>
                        </div>
                        <p v-for="(item, index) in messages" :key="index" v-text="item"
                            class="text-lg flex flex-nowrap mr-auto overflow-hidden max-w-full text-[#AEA181]"
                            :style="{'white-space': allowWrap ? 'pre-line' : 'nowrap',
                                'word-break': allowWrap ? 'break-word' : 'normal'
                            }">
                        </p>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script>
import icon from './icon.vue'


export default {
    components: {
        icon
    },
    data() {
        return {
            messagesQueue: [],
            messages: [''],
            head: '',
            showMessage: false,
            target: 'body',
            timeout: null,
            allowWrap: true
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
                const { head, messages, target, time, allowWrap } = this.messagesQueue.shift();
                this.head = head || '';
                this.messages = messages || [''];
                this.target = target || 'body';
                this.allowWrap = allowWrap || true;
                this.showMessage = true;
                this.timeout = setTimeout(() => {
                    this.closeMessage();
                }, time || 5000)
            }
        },
        closeMessage() {
            this.showMessage = false;
            setTimeout(() => {
                this.nextMessage();
            }, 250);
        }
    }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
    transition: all 0.2s ease;
}

.toast-enter-from,
.toast-leave-to {
    opacity: 0.5;
    transform: translateX(100%);
}
</style>