import * as THREE from "three";
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

export default class CoordinateSystem {
    constructor(length) {
        this.length = length;
        this.axes = new THREE.Object3D();
        this.createAxes();
        this.loadFontAndAddLabels();
    }

    createAxes() {
        const xAxisColor = 0xff3b30;
        const yAxisColor = 0x007aff;
        const zAxisColor = 0x34c759;
        const positiveXAxisMaterial = new THREE.LineBasicMaterial({
            color: xAxisColor,
            linewidth: 2,
            transparent: true,
            opacity: 0.9
        });
        const negativeXAxisMaterial = new THREE.LineDashedMaterial({
            color: xAxisColor,
            dashSize: 0.2,
            gapSize: 0.1,
            transparent: true,
            opacity: 0.7
        });
        // Y轴材质
        const positiveYAxisMaterial = new THREE.LineBasicMaterial({
            color: yAxisColor,
            linewidth: 2,
            transparent: true,
            opacity: 0.9
        });
        const negativeYAxisMaterial = new THREE.LineDashedMaterial({
            color: yAxisColor,
            dashSize: 0.2,
            gapSize: 0.1,
            transparent: true,
            opacity: 0.7
        });
        // Z轴材质
        const positiveZAxisMaterial = new THREE.LineBasicMaterial({
            color: zAxisColor,
            linewidth: 2,
            transparent: true,
            opacity: 0.9
        });
        const negativeZAxisMaterial = new THREE.LineDashedMaterial({
            color: zAxisColor,
            dashSize: 0.2,
            gapSize: 0.1,
            transparent: true,
            opacity: 0.7
        });
        // 创建轴线几何体
        this.createAxisLine(
            [new THREE.Vector3(0, 0, 0), new THREE.Vector3(this.length, 0, 0)],
            positiveXAxisMaterial,
            false
        );
        this.createAxisLine(
            [new THREE.Vector3(0, 0, 0), new THREE.Vector3(-this.length, 0, 0)],
            negativeXAxisMaterial,
            true
        );
        this.createAxisLine(
            [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, this.length, 0)],
            positiveYAxisMaterial,
            false
        );
        this.createAxisLine(
            [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -this.length, 0)],
            negativeYAxisMaterial,
            true
        );
        this.createAxisLine(
            [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, this.length)],
            positiveZAxisMaterial,
            false
        );
        this.createAxisLine(
            [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -this.length)],
            negativeZAxisMaterial,
            true
        );
    }

    createAxisLine(points, material, isDashed) {
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, material);
        if (isDashed) {
            line.computeLineDistances();
        }
        this.axes.add(line);
    }

    loadFontAndAddLabels() {
        const majorStep = 5; // 主要标签间距
        const minorStep = 1;  // 次要刻度间距
        // 为每个轴添加标签
        for (let i = -this.length; i <= this.length; i += minorStep) {
            if (i !== 0) { // 跳过原点
                // 判断是否为主要刻度点
                const isMajorTick = i % majorStep === 0;
                // 添加刻度线
                this.createTickMark(
                    new THREE.Vector3(i, 0, 0),
                    new THREE.Vector3(i, isMajorTick ? -0.3 : -0.1, 0),
                    0xff3b30
                );
                this.createTickMark(
                    new THREE.Vector3(0, i, 0),
                    new THREE.Vector3(isMajorTick ? -0.3 : -0.1, i, 0),
                    0x007aff
                );
                this.createTickMark(
                    new THREE.Vector3(0, 0, i),
                    new THREE.Vector3(0, isMajorTick ? -0.3 : -0.1, i),
                    0x34c759
                );
                // 只在主要刻度点添加标签
                if (isMajorTick) {
                    // X轴标记
                    this.createAxisLabel(new THREE.Vector3(i, -0.6, 0), i, 0xff3b30);
                    // Y轴标记
                    this.createAxisLabel(new THREE.Vector3(-0.8, i, 0), i, 0x007aff);
                    // Z轴标记
                    this.createAxisLabel(new THREE.Vector3(0, -0.6, i), i, 0x34c759);
                }
            }
        }
        this.createAxisLabel(new THREE.Vector3(200, 5, 0), "X", 0xff3b30, 2048);
        this.createAxisLabel(new THREE.Vector3(5, 200, 0), "Y", 0x007aff, 2048);
        this.createAxisLabel(new THREE.Vector3(0, 5, 200), "Z", 0x34c759, 2048);
    }

    createAxisLabel(position, text, color, canvasSize = 128) {
        const pixelRatio = window.devicePixelRatio || 2;
        const canvas = document.createElement('canvas');
        canvas.width = canvasSize * pixelRatio;
        canvas.height = canvasSize / 2 * pixelRatio;
        const ctx = canvas.getContext('2d');
        ctx.scale(pixelRatio, pixelRatio); // 缩放画布上下文以适应高DPI
        // 添加文本描边以提高对比度
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.lineWidth = 3;
        ctx.font = `bold ${canvasSize/2.5}px Arial, Helvetica, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeText(text.toString(), canvasSize/2, canvasSize/4);
        // 填充文本
        ctx.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
        ctx.fillText(text.toString(), canvasSize/2, canvasSize/4);
        // 创建纹理并启用抗锯齿
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.anisotropy = 4; // 增加各向异性过滤级别
        texture.premultiplyAlpha = true;
        // 创建精灵材质
        const spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
            alphaTest: 0.1,
            transparent: true,
        });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.position.copy(position);
        const scaleFactor = canvasSize / 128;
        // 调整缩放以适应更大的纹理，保持视觉大小一致
        sprite.scale.set(1.0 * scaleFactor, 0.5 * scaleFactor, 1);
        this.axes.add(sprite);
    }

    createTickMark(start, end, color) {
        const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
        const material = new THREE.LineBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.75,
            linewidth: 1
        });
        const line = new THREE.Line(geometry, material);
        this.axes.add(line);
    }

    getAxes() {
        return this.axes;
    }

    exportToGLTF(filename = 'coordinate_system.glb') {
        return new Promise((resolve, reject) => {
            const exporter = new GLTFExporter();
            // 导出选项
            const options = {
                binary: true,  // 使用二进制格式(.glb)而非JSON(.gltf)
                maxTextureSize: 4096,
                animations: []
            };
            // 执行导出
            exporter.parse(
                this.axes,
                (gltf) => {
                    // 如果在浏览器环境下，触发下载
                    if (typeof window !== 'undefined') {
                        this.saveArrayBuffer(gltf, filename);
                    }
                    resolve(gltf);
                },
                (error) => {
                    console.error('导出GLTF时出错:', error);
                    reject(error);
                },
                options
            );
        });
    }

    // 辅助方法 - 保存ArrayBuffer为文件
    saveArrayBuffer(buffer, filename) {
        const blob = new Blob([buffer], { type: 'application/octet-stream' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    }
}

