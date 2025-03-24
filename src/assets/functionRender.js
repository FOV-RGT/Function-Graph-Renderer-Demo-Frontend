import * as THREE from "three";
import { parse } from "mathjs";
import * as math from "mathjs";
import GeometryBuilder from './geometryBuilder';
import WorkerManager from './workerManager';

export default class FunctionRenderer {
    constructor(sceneManager) {
        this.sceneManager = sceneManager;
        this.geometryBuilder = new GeometryBuilder(sceneManager.clippingPlanes);
        this.workerManager = new WorkerManager();
    }

    async renderFunction(input) {
        const fn = input.fn;
        const startTime = performance.now();
        let uuid;
        // 处理显式函数 x=f(y,z), y=f(x,z), z=f(x,y)
        if (fn.startsWith("x=")) {
            uuid = await this.renderExplicitFunction(input, "x", startTime);
        }
        else if (fn.startsWith("y=")) {
            uuid = await this.renderExplicitFunction(input, "y", startTime);
        }
        else if (fn.startsWith("z=")) {
            uuid = await this.renderExplicitFunction(input, "z", startTime);
        }
        // 处理几何体
        else if (fn.startsWith("sphere")) {
            uuid = await this.renderSphere(input);
        }
        else if (fn.startsWith("cube")) {
            uuid = await this.renderCube(input);
        }
        return uuid
    }

    async renderExplicitFunction(input, variableType, startTime) {
        // 检查是否为常数
        const allNumbers = /^\d+(\.\d+)?$/.test(input.fn.slice(2));
        if (allNumbers) {
            return await this.renderConstantFunction(input, variableType);
        } else {
            try {
                const expr = parse(input.fn);
                const variables = this.extractVariables(expr);
                if (variables.length === 1) {
                    return await this.renderOneDimensionalFunction(input, expr, variables[0], variableType);
                } else {
                    return await this.renderTwoDimensionalFunction(input, variableType, startTime);
                }
            } catch (error) {
                console.error("渲染方程出错:", error);
            }
        }
    }

    async renderConstantFunction(input, variableType) {
        const value = parseFloat(input.fn.slice(2));
        let points = [];
        switch (variableType) {
            case "x":
                points = [
                    new THREE.Vector3(value, -200, 0),
                    new THREE.Vector3(value, 200, 0)
                ];
                break;
            case "y":
                points = [
                    new THREE.Vector3(0, value, -200),
                    new THREE.Vector3(0, value, 200)
                ];
                break;
            case "z":
                points = [
                    new THREE.Vector3(-200, 0, value),
                    new THREE.Vector3(200, 0, value)
                ];
                break;
        }
        const line = this.geometryBuilder.createLine(points, input.color);
        return await this.sceneManager.addObject(line, true, input);
    }

    async renderOneDimensionalFunction(input, expr, variable, variableType) {
        const points = [];
        for (let i = -200; i <= 200; i += 0.001) {
            const scope = { [variable]: i };
            let value;
            try {
                value = expr.evaluate(scope);
            } catch (e) {
                continue; // 跳过计算错误
            }
            let point;
            switch (variableType) {
                case "x":
                    point = variable === "y" ?
                        new THREE.Vector3(value, i, 0) :
                        new THREE.Vector3(value, 0, i);
                    break;
                case "y":
                    point = variable === "x" ?
                        new THREE.Vector3(i, value, 0) :
                        new THREE.Vector3(0, value, i);
                    break;
                case "z":
                    point = variable === "x" ?
                        new THREE.Vector3(i, 0, value) :
                        new THREE.Vector3(0, i, value);
                    break;
            }
            points.push(point);
        }
        if (points.length > 0) {
            const line = this.geometryBuilder.createLine(points, input.color);
            return await this.sceneManager.addObject(line, true, input);
        }
    }

    async renderTwoDimensionalFunction(input, variableType, startTime) {
        return new Promise((resolve, reject) => {
            const onComplete = (points, color, input) => {
                try {
                    const surface = this.geometryBuilder.createSurface(points, color);
                    const uuid = this.sceneManager.addObject(surface, true, input);
                    const elapsedTime = performance.now() - startTime;
                    console.log("生成完成，耗时", elapsedTime / 1000, "秒");
                    resolve(uuid);
                } catch (error) {
                    reject(error);
                }
            };
            this.workerManager.calculateSurface(input, variableType, onComplete, input.color);
        });
    }

    async renderSphere(input) {
        const params = this.parseParameters(input.fn);
        const radius = parseFloat(params.radius || 1);
        const segments = parseInt(params.segments || 32, 10);
        const rings = parseInt(params.rings || 32, 10);
        const sphere = this.geometryBuilder.createSphere(radius, segments, rings, input.color);
        // 使用SceneManager的复杂几何体创建方法
        // const sphere = this.sceneManager.createComplexGeometry('sphere', {
        //     radius,
        //     segments
        // });
        return await this.sceneManager.addObject(sphere, true, input);
    }

    async renderCube(input) {
        const params = this.parseParameters(input.fn);
        const width = parseFloat(params.width || 1);
        const height = parseFloat(params.height || 1);
        const depth = parseFloat(params.depth || 1);
        const cube = this.geometryBuilder.createCube(width, height, depth, input.color);
        return await this.sceneManager.addObject(cube, true, input);
    }

    parseParameters(input) {
        const params = {};
        input.split(",").forEach(param => {
            const parts = param.split("=");
            if (parts.length === 2) {
                const key = parts[0].trim();
                params[key] = parts[1].trim();
            }
        });
        return params;
    }

    extractVariables(expr) {
        const variables = [];
        let skipCount = 2; // 跳过前两个节点
        expr.traverse((node) => {
            if (skipCount > 0) {
                skipCount--;
                return;
            }
            if (node.isSymbolNode &&
                typeof math[node.name] !== "function" &&
                !variables.includes(node.name)) {
                variables.push(node.name);
            }
        });
        return variables;
    }
}