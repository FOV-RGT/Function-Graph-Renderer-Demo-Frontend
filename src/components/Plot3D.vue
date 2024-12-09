<template>
  <div class="input">
    <var-input variant="outlined" placeholder="输入例:x=1;y=1;z=1;cube;sphere;log(cos(sin(sqrt(x^3))))（只能识别一个）" clearable
      focus-color="rgb(48,135,185)" v-model="functionInput" style="width: 50em; " spellcheck="false" />
    <var-button text outline type="primary" @click="plotFunction" style="height: auto;" text-color="rgb(48,135,185)"
      v-ripple>
      <span style="font-size: 1.4em;">渲染</span>
    </var-button>
  </div>
  <div style="display: flex; width: 100%;height: 100%;">
    <div class="renderer" ref="threeContainer"></div>
  </div>
</template>

<script>
import { toRaw } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import * as math from "mathjs";
import { parse } from "mathjs";

export default {
  data() {
    return {
      functionInput: "y=x^2-z^2",
      scene: new THREE.Scene(),
      camera: null,
      renderer: null,
      controls: null,
      axes: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.camera = new THREE.PerspectiveCamera(
        90, // 摄像机视野
        window.innerWidth / window.innerHeight,
        0.1, // 与摄像机距离小于该单位部分将不会被渲染
        400 // 摄像机最大可视距离
      );
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(
        this.$refs.threeContainer.clientWidth,
        this.$refs.threeContainer.clientHeight
      );
      this.$refs.threeContainer.appendChild(this.renderer.domElement);
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.axes = this.createCustomAxes();
      this.scene.add(this.axes);
      this.camera.position.set(6, 3, 10);
      this.animate();
    },
    createCustomAxes() {
      const axes = new THREE.Object3D();
      const length = 200;
      const positiveXAxisMaterial = new THREE.LineBasicMaterial({
        color: 0xff0000,
      });
      const negativeXAxisMaterial = new THREE.LineDashedMaterial({
        color: 0xff0000,
        dashSize: 0.1,
        gapSize: 0.1,
      });
      const positiveYAxisMaterial = new THREE.LineBasicMaterial({
        color: 0x0000ff,
      });
      const negativeYAxisMaterial = new THREE.LineDashedMaterial({
        color: 0x0000ff,
        dashSize: 0.1,
        gapSize: 0.1,
      });
      const positiveZAxisMaterial = new THREE.LineBasicMaterial({
        color: 0x00ff00,
      });
      const negativeZAxisMaterial = new THREE.LineDashedMaterial({
        color: 0x00ff00,
        dashSize: 0.1,
        gapSize: 0.1,
      });
      const xAxisPositiveGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(length, 0, 0),
      ]);
      const xAxisNegativeGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-length, 0, 0),
      ]);
      const xAxisPositive = new THREE.Line(
        xAxisPositiveGeometry,
        positiveXAxisMaterial
      );
      const xAxisNegative = new THREE.Line(
        xAxisNegativeGeometry,
        negativeXAxisMaterial
      );
      xAxisNegative.computeLineDistances();
      axes.add(xAxisPositive);
      axes.add(xAxisNegative);
      const yAxisPositiveGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, length, 0),
      ]);
      const yAxisNegativeGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, -length, 0),
      ]);
      const yAxisPositive = new THREE.Line(
        yAxisPositiveGeometry,
        positiveYAxisMaterial
      );
      const yAxisNegative = new THREE.Line(
        yAxisNegativeGeometry,
        negativeYAxisMaterial
      );
      yAxisNegative.computeLineDistances();
      axes.add(yAxisPositive);
      axes.add(yAxisNegative);
      const zAxisPositiveGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, length),
      ]);
      const zAxisNegativeGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -length),
      ]);
      const zAxisPositive = new THREE.Line(
        zAxisPositiveGeometry,
        positiveZAxisMaterial
      );
      const zAxisNegative = new THREE.Line(
        zAxisNegativeGeometry,
        negativeZAxisMaterial
      );
      zAxisNegative.computeLineDistances();
      axes.add(zAxisPositive);
      axes.add(zAxisNegative);
      this.addAxisLabels(axes, length);
      return axes;
    },
    addAxisLabels(axes, length) {
      const loader = new FontLoader(); // 创建新的字体加载器
      loader.load(
        "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", // 从指定url加载字体
        (font) => {
          for (let i = -length; i <= length; i++) {
            // 遍历坐标轴上每个坐标为整数的点
            if (i !== 0) {
              this.createAxisLabel(
                // 向创建坐标标记的函数传参
                font,
                new THREE.Vector3(i, -0.5, 0), // 创建新的三维向量
                i,
                0xff0000,
                axes,
                0,
                "x"
              );
              this.createTickMark(
                // 向创建坐标轴刻度的函数传参
                new THREE.Vector3(i, 0, 0),
                new THREE.Vector3(i, -0.2, 0),
                0xff0000,
                axes
              );
              this.createAxisLabel(
                font,
                new THREE.Vector3(-0.8, i, 0),
                i,
                0x0000ff,
                axes,
                0,
                "y"
              );
              this.createTickMark(
                new THREE.Vector3(0, i, 0),
                new THREE.Vector3(-0.2, i, 0),
                0x0000ff,
                axes
              );
              this.createAxisLabel(
                font,
                new THREE.Vector3(0, -0.5, i),
                i,
                0x00ff00,
                axes,
                Math.PI / 2,
                "z"
              );
              this.createTickMark(
                new THREE.Vector3(0, 0, i),
                new THREE.Vector3(0, -0.2, i),
                0x00ff00,
                axes
              );
            }
          }
        }
      );
    },
    createAxisLabel(
      font,
      position,
      text,
      color,
      parent,
      rotation = 0,
      axis = "x"
    ) {
      const textGeo = new TextGeometry(text.toString(), {
        font: font,
        size: 0.35,
        depth: 0.05,
      });
      const textMaterial = new THREE.MeshBasicMaterial({ color: color });
      const textMesh = new THREE.Mesh(textGeo, textMaterial);
      textMesh.position.copy(position);
      if (axis === "x" || axis === "z") {
        textMesh.rotation.y = rotation;
      } else if (axis === "y") {
        textMesh.rotation.x = rotation;
      }
      parent.add(textMesh);
    },
    createTickMark(start, end, color, parent) {
      const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
      const material = new THREE.LineBasicMaterial({ color: color });
      const line = new THREE.Line(geometry, material);
      parent.add(line);
    },
    animate() {
      requestAnimationFrame(() => this.animate());
      this.controls.update();
      this.renderer.render(toRaw(this.scene), toRaw(this.camera));
      // 获取响应式对象的原始版本。Vue3的代理机制会影响Three.js的某些库，使用toRaw可以避免这个影响。
    },
    plotFunction() {
      const functionInput = this.functionInput.replace(/\s+/g, "");
      const allNumbers = /^\d+(\.\d+)?$/.test(functionInput.slice(2));
      let startTime = performance.now();
      while (this.scene.children.length > 1) {
        this.scene.remove(this.scene.children[1]);
      } // 每次渲染图像时，删除上一次渲染的图像
      let geometry;
      let material = new THREE.LineBasicMaterial({ color: 0xff0000 });
      const createLineFromPoints = (points) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return new THREE.Line(geometry, material);
      };
      const createSurfaceFromPoints = (points) => {
        geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(points, 3)
        );
        const material = new THREE.MeshBasicMaterial({
          color: 0xff0000,
          side: THREE.DoubleSide,
          wireframe: true,
        });
        return new THREE.Mesh(geometry, material);
      };
      const spatialCoordinateCalculation = (target) => {
        const step = 0.26;
        const workers = [];
        const workerCount = 10;
        const range = 400;
        const chunkSize = range / workerCount;
        const exprString = functionInput;
        let chunksReceived = 0;
        // 使用 TypedArray 存储点数据
        // 计算每个分块中的总点数
        const totalPointsPerChunk =
          // 计算每行的点数，并将其向上取整
          Math.ceil(chunkSize / step + 1) *
          // 计算每列的点数，并将其向上取整
          Math.ceil(400 / step + 1) *
          // 每个点有 3 个坐标值 (x, y, z)
          3;
        // 创建一个 Float32Array 来存储所有点的坐标
        const points = new Float32Array(
          // 数组的总长度是 worker 的数量乘以每个分块的总点数
          workerCount * totalPointsPerChunk
        );
        for (let i = 0; i < workerCount; i++) {
          const start = -200 + i * chunkSize;
          const end = start + chunkSize;
          const worker = new Worker(
            new URL("../assets/workers.js", import.meta.url),
            {
              type: "module",
            }
          );
          worker.postMessage({
            start,
            end,
            step,
            exprString,
            target,
          });
          worker.onmessage = (event) => {
            const chunkPoints = new Float32Array(event.data); // 使用 TypedArray 处理数据
            console.log(
              `Received chunk points from worker ${i}:`,
              chunkPoints.length
            );
            points.set(chunkPoints, i * totalPointsPerChunk); // 使用 TypedArray 的 set 方法
            console.log("Total points so far:", points.length);
            chunksReceived++;
            console.log(`Chunks received: ${chunksReceived}/${workerCount}`);
            if (chunksReceived === workerCount) {
              console.log("All chunks received");
              const surface = createSurfaceFromPoints(points);
              console.log("Adding surface to scene");
              this.scene.add(surface);
              let elapsedTime = performance.now() - startTime;
              console.log("生成完成，耗时", elapsedTime / 1000, "秒");
            }
          };
          workers.push(worker);
        }
      };
      if (functionInput.startsWith("x=")) {
        if (allNumbers) {
          const xValue = parseFloat(functionInput.slice(2));
          // 获取等号后面的值并转换为浮点数
          // 创建一个基础的线条材质，颜色为红色
          const points = [
            new THREE.Vector3(xValue, -200, 0),
            new THREE.Vector3(xValue, 200, 0),
          ];
          const line = createLineFromPoints(points);
          this.scene.add(line);
          // 将线条添加到场景中
        } else {
          try {
            // 使用 math.js 库解析输入函数
            const expr = parse(functionInput);
            const points = [];
            const vals = [];
            let a = 0; // 设置一个标志变量
            expr.traverse((node) => {
              if (a < 2) {
                a += 1;
                return;
              }
              if (
                node.isSymbolNode &&
                typeof math[node.name] !== "function" &&
                !vals.includes(node.name)
              ) {
                vals.push(node.name);
                console.log(node.name);
              }
            });
            if (vals.length === 1) {
              const valName = vals.pop();
              if (valName === "y" || valName === "z") {
                for (let i = -200; i <= 200; i += 0.001) {
                  const scope = { [valName]: i };
                  // 评估表达式并生成点
                  const x = expr.evaluate(scope);
                  if (valName === "y") {
                    points.push(new THREE.Vector3(x, i, 0));
                  } else {
                    points.push(new THREE.Vector3(x, 0, i));
                  }
                }
                const line = createLineFromPoints(points);
                this.scene.add(line);
              }
            } else {
              const target = "x";
              spatialCoordinateCalculation(target);
            }
          } catch (error) {
            alert("不受支持的输入");
          }
        }
      } else if (functionInput.startsWith("y=")) {
        if (allNumbers) {
          const yValue = parseFloat(functionInput.slice(2));
          // 获取等号后面的值并转换为浮点数
          // 创建一个基础的线条材质，颜色为红色
          const points = [
            new THREE.Vector3(0, yValue, -200),
            new THREE.Vector3(0, yValue, 200),
          ];
          const line = createLineFromPoints(points);
          this.scene.add(line);
          // 将线条添加到场景中
          let elapsedTime = performance.now() - startTime;
          console.log("生成完成，耗时", elapsedTime, "毫秒");
        } else {
          try {
            // 使用 math.js 库解析输入函数
            const expr = parse(functionInput);
            const points = [];
            const vals = [];
            let a = 0; // 设置一个标志变量
            expr.traverse((node) => {
              if (a < 2) {
                a += 1;
                return;
              }
              if (
                node.isSymbolNode &&
                typeof math[node.name] !== "function" &&
                !vals.includes(node.name)
              ) {
                vals.push(node.name);
                console.log(node.name);
              }
            });
            if (vals.length === 1) {
              const valName = vals.pop();
              if (valName === "x" || valName === "z") {
                for (let i = -200; i <= 200; i += 0.001) {
                  const scope = { [valName]: i };
                  // 评估表达式并生成点
                  const y = expr.evaluate(scope);
                  if (valName === "x") {
                    points.push(new THREE.Vector3(i, y, 0));
                  } else {
                    points.push(new THREE.Vector3(0, y, i));
                  }
                }
                const line = createLineFromPoints(points);
                this.scene.add(line);
                let elapsedTime = performance.now() - startTime;
                console.log("生成完成，耗时", elapsedTime, "毫秒");
              }
            } else {
              const target = "y";
              spatialCoordinateCalculation(target);
            }
          } catch (error) {
            alert("不受支持的输入");
          }
        }
      } else if (functionInput.startsWith("z=")) {
        if (allNumbers) {
          const zValue = parseFloat(functionInput.slice(2));
          // 获取等号后面的值并转换为浮点数
          // 创建一个基础的线条材质，颜色为红色
          const points = [
            new THREE.Vector3(-200, 0, zValue),
            new THREE.Vector3(200, 0, zValue),
          ];
          const line = createLineFromPoints(points);
          this.scene.add(line);
          // 将线条添加到场景中
          let elapsedTime = performance.now() - startTime;
          console.log("生成完成，耗时", elapsedTime, "毫秒");
        } else {
          try {
            // 使用 math.js 库解析输入函数
            const expr = parse(functionInput);
            const points = [];
            const vals = [];
            let a = 0; // 设置一个标志变量
            expr.traverse((node) => {
              if (a < 2) {
                a += 1;
                return;
              }
              if (
                node.isSymbolNode &&
                typeof math[node.name] !== "function" &&
                !vals.includes(node.name)
              ) {
                vals.push(node.name);
                console.log(node.name);
              }
            });
            if (vals.length === 1) {
              const valName = vals.pop();
              if (valName === "x" || valName === "y") {
                for (let i = -200; i <= 200; i += 0.001) {
                  const scope = { [valName]: i };
                  // 评估表达式并生成点
                  const z = expr.evaluate(scope);
                  if (valName === "x") {
                    points.push(new THREE.Vector3(i, 0, z));
                  } else {
                    points.push(new THREE.Vector3(0, y, z));
                  }
                }
                const line = createLineFromPoints(points);
                this.scene.add(line);
              }
            } else {
              const target = "z";
              spatialCoordinateCalculation(target);
            }
          } catch (error) {
            alert("不受支持的输入");
          }
        }
      } else if (functionInput.startsWith("sphere")) {
        const params = functionInput.split(",");
        let radius = 1;
        let segments = 32;
        let rings = 16;
        params.forEach((param) => {
          const [key, value] = param.split("=");
          if (key === "radius") {
            radius = parseFloat(value);
          } else if (key === "segments") {
            segments = parseInt(value, 10);
          } else if (key === "rings") {
            rings = parseInt(value, 10);
          }
        });
        geometry = new THREE.SphereGeometry(radius, segments, rings);
        const sphere = new THREE.Mesh(geometry, material);
        this.scene.add(sphere);
      } else if (functionInput.startsWith("cube")) {
        const params = functionInput.split(",");
        let width = 1;
        let height = 1;
        let depth = 1;
        params.forEach((param) => {
          const [key, value] = param.split("=");
          if (key === "width") {
            width = parseFloat(value);
          } else if (key === "height") {
            height = parseFloat(value);
          } else if (key === "depth") {
            depth = parseFloat(value);
          }
        });
        // 创建立方体几何体
        geometry = new THREE.BoxGeometry(width, height, depth);
        // 创建网格材质
        const wireframeMaterial = new THREE.MeshBasicMaterial({
          color: 0xff0000,
          wireframe: true,
        });
        // 创建立方体网格并添加到场景
        const cube = new THREE.Mesh(geometry, wireframeMaterial);
        this.scene.add(cube);
      }
      // else if (functionInput.startsWith("surface")) {
      //   const params = functionInput.split(",");
      //   let func = params[0].replace("surface=", "");
      //   const expr = parse(func);
      //   const vertices = [];
      //   const width = 2000;
      //   const height = 2000;
      //   for (let i = 0; i <= width; i++) {
      //     for (let j = 0; j <= height; j++) {
      //       const x = (i / width) * 400 - 200;
      //       const y = (j / height) * 400 - 200;
      //       const z = expr.evaluate({ x, y });
      //       vertices.push(x, y, z);
      //     }
      //   }
      //   const mesh = createSurfaceFromPoints(vertices);
      //   this.scene.add(mesh);
      // }
      else {
        try {
          // 使用 math.js 库解析输入函数
          const expr = parse(functionInput);
          const points = [];
          for (let x = -200; x <= 200; x += 0.001) {
            const scope = { x: x };
            // 评估表达式并生成点
            const y = expr.evaluate(scope);
            points.push(new THREE.Vector3(x, y, 0));
          }
          const line = createLineFromPoints(points);
          this.scene.add(line);
          let elapsedTime = performance.now() - startTime;
          console.log("生成完成，耗时", elapsedTime, "毫秒");
        } catch (error) {
          alert("不受支持的输入");
        }
      }
    },
  },
};
</script>

<style scoped>
.input {
  display: flex;
  justify-content: center;
  margin: 0.4em 0;
}

.renderer {
  position: relative;
  flex: 1;
}
</style>
