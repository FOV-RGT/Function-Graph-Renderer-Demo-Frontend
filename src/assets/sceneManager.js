import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import CoordinateSystem from './coordinateSystem.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


export default class SceneManager {
    constructor(container) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.initRenderer();
        this.initCamera();
        this.initControls();
        this.setupBoundingBoxClipping();
        this.createMaterials();
        this.initLights();
        this.setupCameraLights();
        // 创建坐标系
        this.coordinateSystem = new CoordinateSystem(200);
        const axes = this.coordinateSystem.getAxes();
        axes.userData = { isAxes: true, isFunctionObject: false };
        this.scene.add(axes);
        // 创建边界盒
        this.boundingBox = this.createBoundingBox();
        this.boundingBox.userData = { isBoundingBox: true, isFunctionObject: false };
        this.optimizePerformance();
        // 开始动画循环
        this.animate();
        // setTimeout(() => {
        //     this.coordinateSystem.exportToGLTF('axisSystem.glb');
        // }, 3000);
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            logarithmicDepthBuffer: true,
            precision: 'highp', // 高精度渲染
            powerPreference: 'high-performance' // 请求高性能模式
        });
        this.renderer.setSize(
            this.container.clientWidth,
            this.container.clientHeight
        );
        // 启用物理正确光照
        this.renderer.physicallyCorrectLights = true;
        // 启用阴影
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        // 色调映射，增强视觉效果
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0;
        // 提高像素比，但需要考虑性能
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0);
        this.container.appendChild(this.renderer.domElement);
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75, // 降低FOV角度使视野更合理
            this.container.clientWidth / this.container.clientHeight,
            0.1,
            2000
        );
        this.camera.position.set(10, 2, 10);
        // 设置相机朝向中心点
        this.camera.lookAt(0, 0, 0);
    }
    initControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true; // 添加阻尼效果，使控制更平滑
        this.controls.dampingFactor = 0.075;
        this.controls.rotateSpeed = 1.2;
        this.controls.screenSpacePanning = false; // 使用轨道平移
        this.controls.maxDistance = 1000; // 最大缩放距离
        this.controls.addEventListener('change', this.updateLight.bind(this));
    }

    initLights() {
        // 基础环境光，适当降低强度
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(this.ambientLight);
        // 半球光，增强环境光的颜色对比度
        this.hemisphereLight = new THREE.HemisphereLight(0xddeeff, 0x202020, 0.6);
        this.hemisphereLight.userData = { isLight: true, isFunctionObject: false };
        this.scene.add(this.hemisphereLight);
        // 主方向光 - 模拟太阳光，增强阴影
        this.directionalLight = new THREE.DirectionalLight(0xffe0c0, 1.2);
        this.directionalLight.position.set(2, 2, 1);
        this.directionalLight.castShadow = true;
        this.directionalLight.shadow.mapSize.width = 1024;
        this.directionalLight.shadow.mapSize.height = 1024;
        this.directionalLight.shadow.camera.near = 0.5;
        this.directionalLight.shadow.camera.far = 500;
        this.directionalLight.shadow.bias = -0.001;
        // 设置阴影相机范围
        const d = 200;
        this.directionalLight.shadow.camera.left = -d;
        this.directionalLight.shadow.camera.right = d;
        this.directionalLight.shadow.camera.top = d;
        this.directionalLight.shadow.camera.bottom = -d;
        this.directionalLight.userData = { isLight: true, isFunctionObject: false };
        this.scene.add(this.directionalLight);
        // 填充光 - 模拟反射光，减少阴影的强烈对比
        this.fillLight = new THREE.DirectionalLight(0x8eaaff, 0.4);
        this.fillLight.position.set(-1, 0.5, -0.5);
        this.fillLight.userData = { isLight: true, isFunctionObject: false };
        this.scene.add(this.fillLight);
        // 新增：侧面点光源 - 增加模型侧面细节
        this.pointLight = new THREE.PointLight(0xff9900, 0.8, 200);
        this.pointLight.position.set(-50, 50, 50);
        this.pointLight.castShadow = true;
        this.pointLight.shadow.mapSize.width = 512;
        this.pointLight.shadow.mapSize.height = 512;
        this.pointLight.userData = { isLight: true, isFunctionObject: false };
        this.scene.add(this.pointLight);
        // 新增：背光 - 提高模型边缘轮廓可见度
        this.rimLight = new THREE.SpotLight(0x2b4c7f, 0.6);
        this.rimLight.position.set(-10, -5, -10);
        this.rimLight.angle = Math.PI / 4;
        this.rimLight.penumbra = 0.5;
        this.rimLight.userData = { isLight: true, isFunctionObject: false };
        this.scene.add(this.rimLight);
        // 添加专门用于强调金属高光的聚光灯
        this.highlightSpot = new THREE.SpotLight(0xffffff, 1.0);
        this.highlightSpot.position.set(5, 10, 5);
        this.highlightSpot.angle = Math.PI / 6;
        this.highlightSpot.penumbra = 0.2;
        this.highlightSpot.decay = 1.5;
        this.highlightSpot.distance = 100;
        this.highlightSpot.castShadow = true;
        this.highlightSpot.userData = { isLight: true, isFunctionObject: false };
        this.scene.add(this.highlightSpot);
    }

    setupCameraLights() {
        // 创建一个灯光组
        this.cameraLights = new THREE.Group();
        this.cameraLights.userData = { isLight: true, isFunctionObject: false };
        // 相机正面柔和光源
        this.cameraLight = new THREE.SpotLight(0xffffff, 0.8);
        this.cameraLight.position.set(0, 0, 0); // 相对于相机位置
        this.cameraLight.angle = Math.PI / 6;
        this.cameraLight.penumbra = 0.4;
        this.cameraLight.decay = 1.5;
        this.cameraLight.distance = 100;
        this.cameraLight.castShadow = true;
        this.cameraLight.shadow.mapSize.width = 512;
        this.cameraLight.shadow.mapSize.height = 512;
        // 相机辅助填充光
        this.cameraFill = new THREE.PointLight(0xdfebff, 0.5, 30);
        this.cameraFill.position.set(-2, 2, -2); // 相对于相机的位置偏移
        // 将灯光添加到灯光组
        this.cameraLights.add(this.cameraLight);
        this.cameraLights.add(this.cameraFill);
        // 将灯光组添加到相机
        this.camera.add(this.cameraLights);
        this.scene.add(this.camera);
    }

    updateLight() {
        if (this.directionalLight) {
            this.directionalLight.position.copy(this.camera.position);
            const direction = new THREE.Vector3();
            this.camera.getWorldDirection(direction);
            this.directionalLight.lookAt(direction);
        }
    }

    createBoundingBox() {
        const boxSize = 400;
        const boxGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
        const edgesGeometry = new THREE.EdgesGeometry(boxGeometry);
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x444444,
            transparent: true,
            opacity: 0.3
        });
        const boxFrame = new THREE.LineSegments(edgesGeometry, lineMaterial);
        this.scene.add(boxFrame);
        return boxFrame;
    }

    resize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    animate() {
        this.controls.update();
        this.camera.updateMatrixWorld();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate.bind(this));
    }

    clearScene() {
        // 遍历场景中的所有对象，只删除特定标记的对象
        for (let i = this.scene.children.length - 1; i >= 0; i--) {
            const object = this.scene.children[i];
            // 删除带有 isFunctionObject 标记的对象
            if (object.userData && object.userData.isFunctionObject) {
                this.scene.remove(object);
            }
        }
    }

    delectObject(uuid) {
        console.log("删除对象uuid:", uuid);
        const object = this.scene.getObjectByProperty('uuid', uuid);
        this.scene.remove(object);
    }

    dispose() {
        // 清理资源
        this.controls.removeEventListener('change', this.updateLight);
        this.controls.dispose();
        this.renderer.dispose();
    }

    addObject(object, isFunctionObject) {
        object.userData = object.userData || {};
        if (isFunctionObject) {
            object.userData.isFunctionObject = isFunctionObject;
            console.log("添加函数对象:", object);
        }
        this.scene.add(object);
        return object.uuid;
    }

    // 添加到SceneManager类中
    createMaterials() {
        this.materialLibrary = {
            // 通用材质 - 现代风格
            standard: new THREE.MeshStandardMaterial({
                color: 0x3087b9,
                roughness: 0.5,
                metalness: 0.2,
                side: THREE.DoubleSide,
                flatShading: false,
                clippingPlanes: this.clippingPlanes,
                clipIntersection: false
            }),
            // 线框材质
            wireframe: new THREE.MeshBasicMaterial({
                color: 0x3087b9,
                wireframe: true,
                transparent: true,
                opacity: 0.7,
                clippingPlanes: this.clippingPlanes,
                clipIntersection: false
            }),
            // 半透明材质
            transparent: new THREE.MeshPhysicalMaterial({
                color: 0x50c0ff,
                roughness: 0.2,
                metalness: 0.1,
                transparent: true,
                opacity: 0.7,
                side: THREE.DoubleSide,
                clippingPlanes: this.clippingPlanes,
                clipIntersection: false
            }),
            // 点云材质
            points: new THREE.PointsMaterial({
                size: 0.05,
                sizeAttenuation: true,
                color: 0xffff00,
                transparent: true,
                opacity: 0.8,
                clippingPlanes: this.clippingPlanes,
                clipIntersection: false
            })
        };
    }

    optimizePerformance() {
        // 层次细节(LOD)：根据相机距离调整复杂几何体
        this.setupLOD = (geometry) => {
            const lod = new THREE.LOD();
            // 细节层次1 - 高精度，近距离
            lod.addLevel(new THREE.Mesh(geometry, this.materialLibrary.standard), 0);
            // 细节层次2 - 中精度，中距离
            const mediumGeometry = geometry.clone().toNonIndexed();
            lod.addLevel(new THREE.Mesh(mediumGeometry, this.materialLibrary.wireframe), 50);
            return lod;
        };
        // 视锥剔除
        this.camera.frustumCulled = true;
        // WebWorker多线程处理复杂计算
        this.workerSupport = true;
    }

    createComplexGeometry(geometryType, params) {
        let geometry;
        switch (geometryType) {
            case 'sphere':
                geometry = new THREE.SphereGeometry(
                    params.radius || 10,
                    params.segments || 32,
                    params.rings || 32
                );
                break;
            case 'box':
                geometry = new THREE.BoxGeometry(
                    params.width || 10,
                    params.height || 10,
                    params.depth || 10
                );
                break;
            // 可添加更多几何体类型...
            default:
                geometry = new THREE.SphereGeometry(5, 16, 16);
        }
        // 使用LOD系统
        const object = this.setupLOD(geometry);
        this.addObject(object);
        return object;
    }

    setView(evt, zoomStep, moveStep) {
        switch (evt) {
            case 'zoomIn':
                this.zoomCamera(true, zoomStep);
                break;
            case 'zoomOut':
                this.zoomCamera(false, zoomStep);
                break;
            case 'moveLeft':
                this.panCamera('left', moveStep);
                break;
            case 'moveRight':
                this.panCamera('right', moveStep);
                break;
            case 'moveUp':
                this.panCamera('up', moveStep);
                break;
            case 'moveDown':
                this.panCamera('down', moveStep);
                break;
            case 'reset':
                this.resetCamera();
                break;
        }
    }

    // 重置相机位置和朝向到初始状态
    resetCamera() {
        this.camera.position.set(10, 2, 10);
        this.camera.lookAt(0, 0, 0);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }

    // 缩放相机视角
    zoomCamera(zoomIn, zoomFactor = 0.1) {
        // 创建一个指向当前视角方向的向量
        const direction = new THREE.Vector3();
        this.camera.getWorldDirection(direction);
        // 根据缩放方向确定移动方向
        const moveDistance = zoomIn ? zoomFactor * 30 : -zoomFactor * 30;
        // 沿着视角方向移动相机
        this.camera.position.addScaledVector(direction, moveDistance);
        // 更新控制器
        this.controls.update();
    }

    // 平移相机
    panCamera(direction, panFactor = 0.1) {
        const panDistance = 10 * panFactor;
        // 创建世界坐标系中的移动向量
        const panOffset = new THREE.Vector3();
        const panLeft = new THREE.Vector3();
        const panUp = new THREE.Vector3();
        // 获取相机的朝向和上方向
        const eye = new THREE.Vector3();
        eye.subVectors(this.camera.position, this.controls.target);
        // 计算panLeft向量 (垂直于相机到目标的向量和相机的上方向)
        panLeft.crossVectors(this.camera.up, eye).normalize();
        // 计算panUp向量 (垂直于eye和panLeft)
        panUp.crossVectors(eye, panLeft).normalize();
        // 根据方向设置移动向量
        switch (direction) {
            case 'left':
                panOffset.copy(panLeft).multiplyScalar(-panDistance);
                break;
            case 'right':
                panOffset.copy(panLeft).multiplyScalar(panDistance);
                break;
            case 'up':
                panOffset.copy(panUp).multiplyScalar(panDistance);
                break;
            case 'down':
                panOffset.copy(panUp).multiplyScalar(-panDistance);
                break;
        }
        // 同时移动相机位置和目标点
        this.camera.position.add(panOffset);
        this.controls.target.add(panOffset);
        // 更新控制器
        this.controls.update();
    }

    setupBoundingBoxClipping() {
        const boxSize = 400;
        const halfSize = boxSize / 2;
        this.clippingPlanes = [
            new THREE.Plane(new THREE.Vector3(-1, 0, 0), halfSize),  // 右侧平面
            new THREE.Plane(new THREE.Vector3(1, 0, 0), halfSize),   // 左侧平面
            new THREE.Plane(new THREE.Vector3(0, -1, 0), halfSize),  // 顶部平面
            new THREE.Plane(new THREE.Vector3(0, 1, 0), halfSize),   // 底部平面
            new THREE.Plane(new THREE.Vector3(0, 0, -1), halfSize),  // 前面平面
            new THREE.Plane(new THREE.Vector3(0, 0, 1), halfSize)    // 后面平面
        ];
        // 将裁剪平面应用到渲染器
        this.renderer.localClippingEnabled = true;
    }

    loadGLTFModel(file) {
        const fileURL = URL.createObjectURL(file);
        // 显示加载提示
        console.log(`正在加载模型: ${file.name}...`);
        const loader = new GLTFLoader();
        loader.load(
            fileURL,
            (gltf) => {
                // 处理加载成功
                console.log('模型加载成功:', file.name);
                // 清理URL
                URL.revokeObjectURL(fileURL);
                // 设置模型参数
                const model = gltf.scene;
                // 自动居中和缩放模型以适应边界盒
                this.centerAndScaleModel(model);
                // 应用裁剪平面到模型的所有材质
                model.traverse(node => {
                    if (node.material) {
                        if (Array.isArray(node.material)) {
                            node.material.forEach(mat => {
                                mat.clippingPlanes = this.clippingPlanes;
                                mat.clipIntersection = false;
                                mat.needsUpdate = true;
                            });
                        } else {
                            node.material.clippingPlanes = this.clippingPlanes;
                            node.material.clipIntersection = false;
                            node.material.needsUpdate = true;
                        }
                    }
                });
                // 添加到场景并标记为自定义模型
                model.userData.isCustomModel = true;
                this.addObject(model, false);
                console.log('模型已添加到场景');
            },
            // 进度回调
            (xhr) => {
                const percentComplete = xhr.loaded / xhr.total * 100;
                console.log(`模型加载进度: ${Math.round(percentComplete)}%`);
            },
            // 错误回调
            (error) => {
                console.error('加载模型时出错:', error);
                URL.revokeObjectURL(fileURL);
            }
        );
    }

    // 辅助方法 - 居中和缩放模型
    centerAndScaleModel(model) {
        // 计算模型包围盒
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        // 确定模型尺寸
        const maxDimension = Math.max(size.x, size.y, size.z);
        const boxSize = 400; // 边界盒尺寸
        const scaleFactor = (boxSize * 0.7) / maxDimension; // 留一些边距
        // 缩放模型
        model.scale.multiplyScalar(scaleFactor);
        // 居中模型
        model.position.sub(center.multiplyScalar(scaleFactor));
        console.log(`模型已缩放: ${scaleFactor.toFixed(3)}倍`);
    }

    setObjectColor(color, uuid) {
        const object = this.scene.getObjectByProperty('uuid', uuid);
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
        console.log(opacity);
        
        if (object) {
            object.traverse(child => {
                if (child.isMesh) {
                    child.material.color.set(colorValue);
                    child.material.opacity = opacity;
                }
            });
        }
    }
}