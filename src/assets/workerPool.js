import { toRaw } from 'vue';



export default class workerPool {
    constructor(size = navigator.hardwareConcurrency || 4) {
        this.size = size;
        this.workers = [];
        this.taskQueue = [];
        this.activeWorkers = new Map();
        this.init();
    }

    init() {
        for (let i = 0; i < this.size; i++) {
            const worker = new Worker(new URL("./workers.js", import.meta.url),
                { type: "module" }
            );
            worker.id = i;
            this.workers.push(worker);
        }
        console.log(`初始化workerPool完成，大小：${this.size}`);
    }

    getWorker() {
        return this.workers.length > 0 ? this.workers.pop() : null;
    }

    releaseWorker(worker) {
        worker.onmessage = null;
        this.workers.push(worker);
        this.processQueue();
    }

    handleQueue() {
        if (this.taskQueue.length === 0) return;
        const worker = this.getWorker();
        if(!worker) return;
        const task = this.taskQueue.shift();
        this.runTask(worker, task);
    }

    submitTask(taskData, callback) {
        const task = { taskData, callback };
        this.taskQueue.push(task);
        this.handleQueue();
    }

    runTask(worker, task) {
        this.activeWorkers.set(worker.id, worker);
        worker.onmessage = (evt) => {
            task.callback(evt.data, worker.id);
            this.activeWorkers.delete(worker.id);
            this.releaseWorker(worker);
        }
        console.log(`Worker ${worker.id}开始任务, 数据：`, task.taskData);
        worker.postMessage(toRaw(task.taskData));
    }

    closeAllWorkers() {
        [...this.workers, ...this.activeWorkers.values()].forEach(worker => {
            worker.terminate();
        })
        this.workers = [];
        this.activeWorkers.clear();
        this.taskQueue = [];
        console.log("关闭所有worker");
    }
}