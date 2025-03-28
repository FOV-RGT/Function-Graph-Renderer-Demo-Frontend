import workerPool from './workerPool';



export default class WorkerManager {
    constructor() {
        this.workerCount = 10;  // 工作线程数量
        this.workerPool = new workerPool(this.workerCount);
    }

    calculateSurface(input, target, callback, color) {
        const step = 0.26;
        const range = 400;
        const chunkSize = range / this.workerCount;
        const exprString = input.fn;
        const collector = new resultsCollector(
            this.workerCount,
            (allPoints) => callback(allPoints, color, input)
        );
        for (let i = 0; i < this.workerCount; i++) {
            const start = -200 + i * chunkSize;
            const end = start + chunkSize;
            const taskData = {
                dimension: 3,
                start,
                end,
                initStep: step,
                exprString,
                target,
                chunkId: i
            };
            this.workerPool.submitTask(taskData, (data, chunkId) => {
                const chunkPoints = new Float32Array(data);
                collector.addResult(chunkId, chunkPoints);
            })
        }
    }

    calculateLine(input, variable, target, callback, color) {
        const step = 0.1;
        const range = 400;
        const chunkSize = range / this.workerCount;
        const exprString = input.fn;
        const collector = new resultsCollector(
            this.workerCount,
            (allPoints) => callback(allPoints, color, input)
        );
        for (let i = 0; i < this.workerCount; i++) {
            const start = -200 + i * chunkSize;
            const end = start + chunkSize;
            const taskData = {
                dimension: 2,
                start,
                end,
                initStep: step,
                exprString,
                target,
                chunkId: i,
                variable
            };
            this.workerPool.submitTask(taskData, (data, chunkId) => {
                const chunkPoints = new Float32Array(data);
                collector.addResult(chunkId, chunkPoints);
            })
        }
    }

    close() {
        this.workerPool.closeAllWorkers();
    }
}

class resultsCollector {
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
        this.callback(allPoints);
    }
}
