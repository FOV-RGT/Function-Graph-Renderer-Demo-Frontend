export default class WorkerManager {
    constructor() {
        this.workerCount = 10;  // 工作线程数量
    }

    calculateSurface(input, target, onComplete, color) {
        const step = 0.26;
        const range = 400;
        const chunkSize = range / this.workerCount;
        const exprString = input;
        let chunksReceived = 0;
        const totalPointsPerChunk =
            Math.ceil(chunkSize / step + 1) *
            Math.ceil(400 / step + 1) * 3;
        const points = new Float32Array(
            this.workerCount * totalPointsPerChunk
        );
        for (let i = 0; i < this.workerCount; i++) {
            const start = -200 + i * chunkSize;
            const end = start + chunkSize;
            const worker = new Worker(
                new URL("./workers.js", import.meta.url),
                { type: "module" }
            );
            worker.postMessage({
                start,
                end,
                initStep: step,
                exprString,
                target,
            });
            worker.onmessage = (event) => {
                const chunkPoints = new Float32Array(event.data);
                points.set(chunkPoints, i * totalPointsPerChunk);
                chunksReceived++;
                console.log(`当前进度: ${chunksReceived}/${this.workerCount}`);
                if (chunksReceived === this.workerCount) {
                    console.log("分块计算完成");
                    onComplete(points, color);
                }
            };
        }
    }
}