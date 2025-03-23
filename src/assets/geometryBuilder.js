import * as THREE from "three";

export default class GeometryBuilder {
    constructor(clippingPlanes = null) {
        // 定义默认材质
        this.lineMaterial = new THREE.LineBasicMaterial({
            color: 0x3087b9,
            linewidth: 2,
            clippingPlanes: clippingPlanes
        });
        this.meshMaterial = new THREE.MeshBasicMaterial({
            color: 0x3087b9,
            wireframe: true,
            side: THREE.DoubleSide,
            clippingPlanes: clippingPlanes
        });
        this.redMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true,
            side: THREE.DoubleSide,
            clippingPlanes: clippingPlanes
        });
    }

    createLine(points) {
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return new THREE.Line(geometry, this.lineMaterial);
    }

    createSurface(points) {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(points, 3)
        );
        return new THREE.Mesh(geometry, this.meshMaterial);
    }

    createSphere(radius, segments, rings) {
        const geometry = new THREE.SphereGeometry(radius, segments, rings);
        return new THREE.Mesh(geometry, this.redMaterial);
    }

    createCube(width, height, depth) {
        const geometry = new THREE.BoxGeometry(width, height, depth);
        return new THREE.Mesh(geometry, this.redMaterial);
    }
}