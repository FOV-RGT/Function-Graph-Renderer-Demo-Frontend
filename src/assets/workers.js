import { parse } from "mathjs";

self.onmessage = function (event) {
    try {
        const { dimension, start, end, step, exprString, target, variable } = event.data;
        // 将输入解析为表达式树
        const expr = parse(exprString).compile();
        // 计算被分配到的总坐标数
        const totalPoints = Math.ceil((end - start) / step + 1) * Math.ceil((400 / step) + 1) * 3;
        // 使用'Float32Array'存储所有点的坐标
        const points = new Float32Array(totalPoints);
        let offset = 0;// 初始化 offset 为 0
        if (dimension === 2) {
            points[offset++] = NaN;
            points[offset++] = NaN;
            points[offset++] = NaN;
            for (let i = -200; i <= 200; i += 0.01) {
                const scope = { [variable]: i };
                let value;
                try {
                    value = expr.evaluate(scope);
                } catch (e) {
                    continue; // 跳过计算错误
                }
                if (isNaN(value)) {
                    points[offset++] = NaN;
                    points[offset++] = NaN;
                    points[offset++] = NaN;
                    points[offset++] = NaN;
                    points[offset++] = NaN;
                    points[offset++] = NaN;
                }
                switch (target) {
                    case "x":
                        if (variable === "y") {
                            points[offset++] = value;
                            points[offset++] = i;
                            points[offset++] = 0;
                        } else {
                            points[offset++] = value;
                            points[offset++] = 0;
                            points[offset++] = i;
                        }
                        break;
                    case "y":
                        if (variable === "z") {
                            points[offset++] = 0;
                            points[offset++] = value;
                            points[offset++] = i;
                        } else {
                            points[offset++] = i;
                            points[offset++] = value;
                            points[offset++] = 0;
                        }
                        break;
                    case "z":
                        if (variable === "x") {
                            points[offset++] = i;
                            points[offset++] = 0;
                            points[offset++] = value;
                        } else {
                            points[offset++] = 0;
                            points[offset++] = i;
                            points[offset++] = value;
                        }
                        break;
                }
            }
            points[offset++] = NaN;
            points[offset++] = NaN;
            points[offset++] = NaN;
        } else {
            if (target === "x") {
                // 遍历分块，范围为'start'到'end'，步长为'step'
                for (let i = start; i <= end; i += step) {
                    // 遍历分块，步长为step
                    for (let j = -200; j <= 200; j += step) {
                        // 传参评估因变量
                        const x = expr.evaluate({ y: i, z: j });
                        if (isNaN(x)) {
                            points[offset++] = NaN;
                            points[offset++] = NaN;
                            points[offset++] = NaN;
                        }
                        points[offset++] = x;// 将x坐标存储在当前'offset'位置后'offset'+1
                        points[offset++] = i;
                        points[offset++] = j;
                    }
                }
            }// 同上
            else if (target === "y") {
                for (let i = start; i <= end; i += step) {
                    for (let j = -200; j <= 200; j += step) {
                        const y = expr.evaluate({ x: i, z: j });
                        if (isNaN(y)) {
                            points[offset++] = NaN;
                            points[offset++] = NaN;
                            points[offset++] = NaN;
                        }
                        points[offset++] = i;
                        points[offset++] = y;// 将y坐标存储在当前'offset'位置后'offset'+1
                        points[offset++] = j;
                    }
                }
            }
            else if (target === "z") {
                for (let i = start; i <= end; i += step) {
                    for (let j = -200; j <= 200; j += step) {
                        const z = expr.evaluate({ x: i, y: j });
                        if (isNaN(z)) {
                            points[offset++] = NaN;
                            points[offset++] = NaN;
                            points[offset++] = NaN;
                        }
                        points[offset++] = i;
                        points[offset++] = j;
                        points[offset++] = z;// 将z坐标存储在当前'offset'位置后'offset'+1
                    }
                }
            }
        }
        if (offset % 3 !== 0) {
            // 裁剪掉不完整的点
            const validLength = Math.floor(offset / 3) * 3;
            const validPoints = new Float32Array(points.buffer, 0, validLength);
            self.postMessage(validPoints.buffer, [validPoints.buffer]);  // 向主线程移交'validPoints'缓冲区所有权
        } else {
            // 如果点数正确，则直接发送
            self.postMessage(points.buffer, [points.buffer]);
        }
    } catch (error) {
        self.postMessage({
            error: true,
            message: error.message,
            stack: error.stack,
            expression: exprString
        });
    }
}