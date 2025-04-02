/**
 * 已弃用
 */

import { parse } from "mathjs";

// 自适应采样算法
self.onmessage = function (event) {
    const { start, end, index, input, target, maxDepth: baseMaxDepth, errorThreshold: baseErrorThreshold } = event.data;
    const expr = parse(input).compile();
    const points = [];
    
    // 动态参数调整（根据计算范围大小）
    const range = Math.abs(end - start);
    const dynamicFactor = Math.log10(range + 1); // 范围越大，参数越宽松

    // 动态误差阈值（范围越大允许误差越大）
    const errorThreshold = baseErrorThreshold * dynamicFactor;

    // 动态递归深度（范围越大递归深度越低）
    const maxDepth = Math.max(3, Math.floor(baseMaxDepth - dynamicFactor));

    // 核心：递归采样函数
    function sampleSegment(a, b, depth = 0) {
        if (depth > maxDepth) return;
        
        // 计算端点及中点值
        const fa = evaluate(a);
        const fb = evaluate(b);
        const mid = (a + b) / 2;
        const fmid = evaluate(mid);
        
        // 二次插值误差估计
        const quadraticApprox = fa + (mid - a) * (fb - fa) / (b - a) + (mid - a) * (mid - b) * (fmid - (fa + fb) / 2);
        const error = Math.abs(fmid - quadraticApprox);
        
        // 动态调整误差阈值（额外叠加范围因子）
        const dynamicThreshold = errorThreshold * (1 + Math.abs(fa) + Math.abs(fb)) * (1 + range / 1000);
        
        // 强制关键区域细分（仅在小范围或特定区域保持高精度）
        const isCriticalZone = Math.abs(a) < 1 || Math.abs(b) < 1; // 关键区域范围随精度动态调整
        const forceSubdivide = isCriticalZone && depth < maxDepth;
        
        if (error > dynamicThreshold || forceSubdivide || depth < 3) { // 基础细分深度降低
            sampleSegment(a, mid, depth + 1);
            sampleSegment(mid, b, depth + 1);
        } else {
            // 满足精度要求，记录采样点
            points.push(createPoint(a, fa));
            points.push(createPoint(mid, fmid));
            points.push(createPoint(b, fb));
        }
    }

    

    function evaluate(t) {
        try {
            return target === 'y' 
                ? expr.evaluate({ x: t })
                : expr.evaluate({ y: t });
        } catch {
            return NaN;
        }
    }

    function createPoint(a, b) {
        return target === 'y' 
            ? { x: a, y: b }
            : { x: b, y: a };
    }

    // 初始化分段采样（分段数动态调整）
    const segmentCount = Math.ceil(range / (10 * dynamicFactor)); // 范围越大分段数越少
    const segmentWidth = (end - start) / segmentCount;
    
    for (let i = 0; i < segmentCount; i++) {
        const segStart = start + i * segmentWidth;
        const segEnd = segStart + segmentWidth;
        sampleSegment(segStart, segEnd);
    }

    // 后处理：排序、去重、过滤无效点
    let validPoints;
    if (target == 'y') {
        validPoints = points
        .filter(p => !isNaN(p.x) && !isNaN(p.y))
        .sort((a, b) => a.x - b.x);
    } else {
        validPoints = points
        .filter(p => !isNaN(p.x) && !isNaN(p.y))
        .sort((a, b) => a.y - b.y);
    }        
    
    // 数据压缩并分离 x 和 y
    const xCoords = [];
    const yCoords = [];
    // 后处理：动态去重阈值（范围越大允许更稀疏的点）
    const compressionThreshold = 0.01 * dynamicFactor; // 范围越大去重阈值越高
    let lastX = -Infinity;
    for (const p of validPoints) {
        if (Math.abs(p.x - lastX) > compressionThreshold) {
            xCoords.push(p.x);
            yCoords.push(p.y);
            lastX = p.x;
        }
    }
    const xArray = new Float64Array(xCoords);
    const yArray = new Float64Array(yCoords);

    // 传输 ArrayBuffer
    self.postMessage({
        index,
        xBuffer: xArray.buffer,
        yBuffer: yArray.buffer
    }, [xArray.buffer, yArray.buffer]); // 转移缓冲区所有权

    self.close();
}