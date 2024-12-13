import { parse } from "mathjs";
import * as THREE from 'three';

self.onmessage = function (event) {
    const { start, end, initStep, exprString, target } = event.data;
    let step = initStep;
    const startTime = performance.now();
    // 将输入解析为表达式树
    const expr = parse(exprString).compile();
    // 计算被分配到的总坐标数
    const totalPoints = Math.ceil((end - start) / step + 1) * Math.ceil((400 / step) + 1) * 3;
    // 使用'Float32Array'存储所有点的坐标
    const points = new Float32Array(totalPoints);
    let offset = 0;// 初始化 offset 为 0
    // const threshold = 100;// 跳跃阈值
    // 若'target'为'x'
    if (target === "x") {
        // 遍历分块，范围为'start'到'end'，步长为'step'
        for (let i = start; i <= end; i += step) {
            // 遍历分块，步长为step
            for (let j = -200; j <= 200; j += step) {
                // 传参评估因变量
                const x = expr.evaluate({ y: i, z: j });
                // 判断x值是否正常，若正常则存储坐标
                points[offset++] = x;// 将x坐标存储在当前'offset'位置后'offset'+1
                points[offset++] = i;
                points[offset++] = j;
                // if (offset >= 5) {
                //     const previousX = points[offset - 5];
                //     const jump = Math.abs(x - previousX);
                //     if (jump > threshold) {
                //         step /= 2;
                //     } else if (jump < threshold / 2 && step < initStep) {
                //         step *= 2;
                //     }
                // }
            }
        }
    }// 同上
    else if (target === "y") {
        for (let i = start; i <= end; i += step) {
            for (let j = -200; j <= 200; j += step) {
                const y = expr.evaluate({ x: i, z: j });
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
                points[offset++] = i;
                points[offset++] = j;
                points[offset++] = z;// 将z坐标存储在当前'offset'位置后'offset'+1
            }
        }
    }
    console.log(`Worker completed: ${start} to ${end}`);
    // 向主线程移交'points'缓冲区所有权
    self.postMessage(points.buffer, [points.buffer]);
    const elapsedTime = performance.now() - startTime;
    console.log("计算完成，耗时", elapsedTime, "毫秒");
    // 关闭线程
    self.close();
};