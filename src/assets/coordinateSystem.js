import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

export default class CoordinateSystem {
    constructor(length = 200) {
        this.length = length;
        this.axes = new THREE.Object3D();
        this.createAxes();
        this.loadFontAndAddLabels();
    }

    createAxes() {
        // 更现代的颜色配置
        const xAxisColor = 0xff3b30;      // 更亮的红色
        const yAxisColor = 0x007aff;      // iOS风格蓝色
        const zAxisColor = 0x34c759;      // 清新绿色
        // 更现代的材质配置 - X轴
        const positiveXAxisMaterial = new THREE.LineBasicMaterial({
            color: xAxisColor,
            linewidth: 2,               // 线条更粗
            transparent: true,
            opacity: 0.9
        });
        const negativeXAxisMaterial = new THREE.LineDashedMaterial({
            color: xAxisColor,
            dashSize: 0.2,              // 增大虚线尺寸
            gapSize: 0.1,
            transparent: true,
            opacity: 0.7                // 负轴略微透明
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
        const loader = new FontLoader();
        loader.load(
            "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
            (font) => {
                for (let i = -this.length; i <= this.length; i++) {
                    if (i !== 0) {
                        // X轴标记
                        this.createAxisLabel(font, new THREE.Vector3(i, -0.5, 0), i, 0xff0000, 0, "x");
                        this.createTickMark(
                            new THREE.Vector3(i, 0, 0),
                            new THREE.Vector3(i, -0.2, 0),
                            0xff0000
                        );
                        // Y轴标记
                        this.createAxisLabel(font, new THREE.Vector3(-0.8, i, 0), i, 0x0000ff, 0, "y");
                        this.createTickMark(
                            new THREE.Vector3(0, i, 0),
                            new THREE.Vector3(-0.2, i, 0),
                            0x0000ff
                        );
                        // Z轴标记
                        this.createAxisLabel(font, new THREE.Vector3(0, -0.5, i), i, 0x00ff00, Math.PI / 2, "z");
                        this.createTickMark(
                            new THREE.Vector3(0, 0, i),
                            new THREE.Vector3(0, -0.2, i),
                            0x00ff00
                        );
                    }
                }
            }
        );
    }

    createAxisLabel(font, position, text, color, rotation = 0, axis) {
        const textGeo = new TextGeometry(text.toString(), {
            font: font,
            size: 0.25,
            depth: 0.02,
            bevelEnabled: true,
            bevelThickness: 0.01,
            bevelSize: 0.005,
            bevelSegments: 3
        });
        // 使用MeshStandardMaterial更现代
        const textMaterial = new THREE.MeshStandardMaterial({
            color: color,
            metalness: 0.75,            // 金属感
            roughness: 0.75,            // 表面更光滑
            emissive: color,           // 自发光
            emissiveIntensity: 0.75,    // 发光强度
        });
        const textMesh = new THREE.Mesh(textGeo, textMaterial);
        textMesh.position.copy(position);
        // 轻微阴影效果
        textMesh.castShadow = true;
        if (axis === "x" || axis === "z") {
            textMesh.rotation.y = rotation;
        } else {
            textMesh.rotation.x = rotation;
        }
        this.axes.add(textMesh);
    }

    createTickMark(start, end, color) {
        const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
        const material = new THREE.LineBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.75,              // 不要太显眼
            linewidth: 5           // 适中的粗细
        });
        const line = new THREE.Line(geometry, material);
        this.axes.add(line);
    }

    getAxes() {
        return this.axes;
    }
}