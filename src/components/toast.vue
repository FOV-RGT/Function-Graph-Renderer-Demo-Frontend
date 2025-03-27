<template>
    <teleport :to=target>
        <transition name="toast">
            <div v-show="showMessage" class="fixed bottom-[15%] right-2 z-50 max-w-[35%] max-h-[20%] min-w-42">
                <div class="bg-slate-900 shadow-2xl rounded-md border-slate-400/50 border-1
                p-4 flex flex-row items-center justify-between gap-1">
                    <div class="flex flex-col items-start max-w-5/6">
                        <div class="font-black text-2xl text-[#d4bd81] whitespace-nowrap">{{ head }}</div>
                        <div v-for="(item, index) in messages" :key="index" v-text="item"
                            class="text-lg overflow-hidden max-w-full text-[#AEA181]"
                            :style="{'white-space': allowWrap ? 'pre-line' : 'nowrap',
                                'word-break': allowWrap ? 'break-word' : 'normal'
                            }"></div>
                    </div>
                    <div class="flex justify-end items-center">
                        <button class="btn btn-ghost btn-primary btn-md" @click="closeMessage">
                            <icon type="close" />
                        </button>
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
            messages: [],
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
                this.messages = messages || [];
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
            }, 200);
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