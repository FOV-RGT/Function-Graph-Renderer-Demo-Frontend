import { parse } from "mathjs";

self.onmessage = function (event) {
    const { start, end, index, input, target} = event.data
    const startTime = performance.now();
    const expr = parse(input).compile();
    const xVals = [];
    const yVals = [];
    let j = -1;
    const threshold = 0.06;
    const initStep = 0.02;
    let step = initStep;
    if (target === 'y') {
        for (let i = start; i <= end; i += step) {
            const y = expr.evaluate({ x: i });
            xVals.push(i);
            yVals.push(y);
            if (j <= 0) continue
            const previousY = yVals[j];
            const jump = Math.abs(y - previousY);
            if (jump > threshold) {
                step /= 2;
            } else if (jump < threshold && step < initStep) {
                step *= 2;
            }
            j++;
        }
    } else {
        for (let i = start; i <= end; i += step) {
            const x = expr.evaluate({ y: i });
            xVals.push(x);
            yVals.push(i);
            if (j <= 0) continue
            const previousX = xVals[j];
            const jump = Math.abs(x - previousX);
            if (jump > threshold) {
                step /= 2;
            } else if (jump < threshold && step < initStep) {
                step *= 2;
            }
            j++;
        }
    }
    self.postMessage({xVals, yVals, index});
    const elapsedTime = performance.now() - startTime;
    console.log("计算完成，耗时", elapsedTime, "毫秒");
    self.close();
}