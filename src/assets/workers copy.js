import { parse } from "mathjs";

self.onmessage = function (event) {
    const { start, end, step, valName1, valName2, exprString } = event.data;
    const expr = parse(exprString);
    const points = [];
    for (let i = start; i <= end; i += step) {
        for (let j = -200; j <= 200; j += step) {
            const scope = {};
            scope[valName1] = i;
            scope[valName2] = j;
            const x = expr.evaluate(scope);
            points.push(x, i, j);
        }
    }
    console.log(`Worker completed: ${start} to ${end}`);
    self.postMessage(points);
};
