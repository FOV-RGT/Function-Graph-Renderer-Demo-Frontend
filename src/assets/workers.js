import { parse } from "mathjs";

self.onmessage = function (event) {
    const { start, end, step, exprString, target } = event.data;
    const expr = parse(exprString);
    // 使用 TypedArray 存储点数据
    const totalPoints = Math.ceil((end - start) / step + 1) * Math.ceil((400 / step) + 1) * 3;
    const points = new Float32Array(totalPoints); // 创建一个 Float32Array 来存储所有点的坐标
    let offset = 0; // 初始化 offset 为 0
    if (target === "x") {
        for (let i = start; i <= end; i += step) {
            for (let j = -200; j <= 200; j += step) {
                const x = expr.evaluate({ y: i, z: j });
                // 存储计算得到的点的坐标
                points[offset++] = x; // 将 x 坐标存储在当前 offset 位置，然后 offset 加 1
                points[offset++] = i;
                points[offset++] = j;
            }
        }
    } else if (target === "y") {
        for (let i = start; i <= end; i += step) {
            for (let j = -200; j <= 200; j += step) {
                const y = expr.evaluate({ x: i, z: j });
                // 存储计算得到的点的坐标
                points[offset++] = i; // 将 x 坐标存储在当前 offset 位置，然后 offset 加 1
                points[offset++] = y;
                points[offset++] = j;
            }
        }
    } else if (target === "z") {
        for (let i = start; i <= end; i += step) {
            for (let j = -200; j <= 200; j += step) {
                const z = expr.evaluate({ x: i, y: j });
                // 存储计算得到的点的坐标
                points[offset++] = i; // 将 x 坐标存储在当前 offset 位置，然后 offset 加 1
                points[offset++] = j;
                points[offset++] = z;
            }
        }
    }
    console.log(`Worker completed: ${start} to ${end}`);
    self.postMessage(points.buffer, [points.buffer]); // 发送 ArrayBuffer 数据
    self.close();
};
