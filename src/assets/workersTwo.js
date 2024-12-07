import { parse } from "mathjs";

self.onmessage = function (event) {
    const { valName, start, end, step, exprString } = event.data;
    const expr = parse(exprString);
    const points = [];
    for (let i = start; i <= end; i += step) {
        const scope = { [valName]: i };
        const x = expr.evaluate(scope);
        if (valName === "y") {
            points.push([x, i, 0]);
        } else {
            points.push([x, 0, i]);
        }
    }
    self.postMessage(points);
    self.close();
};
