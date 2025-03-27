import * as THREE from "three";
import { generateRandomHarmoniousColor } from '../assets/utils/componentUtils'

export default class GeometryBuilder {
    constructor(clippingPlanes = null) {
        this.clippingPlanes = clippingPlanes;
    }

    createLine(points, color) {
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return new THREE.LineSegments(geometry, this.createBasicLineMaterial(color));
    }

    createLineFromBuffer(points, color) {
        const geometry = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
        return new THREE.LineSegments(geometry, this.createBasicLineMaterial(color));
    }

    createSurface(points, color) {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(points, 3)
        );
        return new THREE.Mesh(geometry, this.createBasicMaterial(color));
    }

    createSphere(radius, segments, rings, color) {
        const geometry = new THREE.SphereGeometry(radius, segments, rings);
        return new THREE.Mesh(geometry, this.createBasicMaterial(color));
    }

    createCube(width, height, depth, color) {
        const geometry = new THREE.BoxGeometry(width, height, depth);
        return new THREE.Mesh(geometry, this.createBasicMaterial(color));
    }

    createBasicMaterial(color) {
        // 默认颜色和透明度
        let colorValue = color || generateRandomHarmoniousColor();
        let opacity = 1.0;
        
        // 处理rgba字符串格式
        if (colorValue.startsWith('rgba')) {
            const match = colorValue.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
            if (match && match[4] !== undefined) {
                // 提取透明度值
                opacity = parseFloat(match[4]);
                // 重构为rgb格式，移除透明度部分
                colorValue = `rgb(${match[1]}, ${match[2]}, ${match[3]})`;
            }
        }
        
        return new THREE.MeshBasicMaterial({
            color: colorValue,
            transparent: true,
            opacity: opacity,
            wireframe: true,
            side: THREE.DoubleSide,
            clippingPlanes: this.clippingPlanes
        });
    }
    
    createBasicLineMaterial(color) {
        // 默认颜色和透明度
        let colorValue = color || generateRandomHarmoniousColor();
        let opacity = 1.0;
        
        // 处理rgba字符串格式
        if (colorValue.startsWith('rgba')) {
            const match = colorValue.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
            if (match && match[4] !== undefined) {
                opacity = parseFloat(match[4]);
                colorValue = `rgb(${match[1]}, ${match[2]}, ${match[3]})`;
            }
        }
        
        return new THREE.LineBasicMaterial({
            color: colorValue,
            transparent: true,
            opacity: opacity,
            linewidth: 2,
            clippingPlanes: this.clippingPlanes
        });
    }
}