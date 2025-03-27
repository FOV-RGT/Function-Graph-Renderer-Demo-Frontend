import workerPool from './workerPool';


export default class WorkerManager {
    constructor() {
        this.workerCount = navigator.hardwareConcurrency || 4;  // 工作线程数量
        this.workerPool = new workerPool(this.workerCount);
    }

    calculateSurface(input, target, callback, color) {
        const step = 0.26;
        const range = 400;
        const chunkSize = range / this.workerCount;
        const exprString = input.fn;
        console.log(`开始计算表面：${exprString}`);
        
        const resultsCollector = new resultCollector(
            this.workerCount,
            (allPoints) => callback(allPoints, color, input)
        );
        // const totalPointsPerChunk =
        //     Math.ceil(chunkSize / step + 1) *
        //     Math.ceil(400 / step + 1) * 3;
        for (let i = 0; i < this.workerCount; i++) {
            const start = -200 + i * chunkSize;
            const end = start + chunkSize;
            const taskData = {
                start,
                end,
                initStep: step,
                exprString: typeof exprString === 'string' ? exprString : String(exprString),
                target,
                chunkId: i
            };
            this.workerPool.submitTask(taskData, (data, workerId) => {
                const chunkPoints = new Float32Array(data);
                resultCollector.addResult(i, chunkPoints);
            })
        }
    }

    close() {
        this.workerPool.closeAllWorkers();
    }
}

class resultCollector {
    constructor(totalChunks, callback) {
        this.results = new Map();
        this.totalChunks = totalChunks;
        this.callback = callback;
        this.totalPointsPerChunk = null;
    }

    addResult(chunkId, chunkPoints) {
        this.results.set(chunkId, chunkPoints);
        if (this.totalPointsPerChunk === null) {
            this.totalPointsPerChunk = chunkPoints.length;
        }
        console.log(`收到分块${++chunkId}/${this.totalChunks}的结果`);
        if (this.results.size === this.totalChunks) {
            this.handleResults();
        }
    }

    handleResults() {
        const allPoints = new Float32Array(this.totalChunks * this.totalPointsPerChunk);
        for (let i = 0; i < this.totalChunks; i++) {
            const chunkPoints = this.results.get(i);
            allPoints.set(chunkPoints, i * this.totalPointsPerChunk);
        }
        console.log("所有分块计算完成");
        this.callback(allPoints);
    }
}