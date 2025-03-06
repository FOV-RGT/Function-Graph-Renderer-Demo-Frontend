<template>
  <div style="width: 100%;height: 100%;" ref="canvas3D"></div>
</template>

<script>
import { toRaw } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import * as math from "mathjs";
import { parse } from "mathjs";
import { mapState } from "vuex";
import DelaunayFast from 'delaunay-fast';

export default {
  name: 'Plot3D',
  data() {
    return {
      scene: new THREE.Scene(),
      camera: null,
      renderer: null,
      controls: null,
      axes: null,
      directionalLight: null,
    };
  },
  computed: {
    ...mapState(['switch3D']),// 映射属性'switch3D'到'computed'
  },
  watch: {
    // 监听属性'switch3D'，当值改变时运行'switch3D(newVal) {...}'
    switch3D(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          const width = this.$refs.canvas3D.clientWidth;
          const height = this.$refs.canvas3D.clientHeight;
          this.renderer.setSize(width, height);
          this.camera.aspect = width / height;
          this.camera.updateProjectionMatrix();
        })
      }
    },
  },
  mounted() {
    // 组件被挂载时进行初始化
    this.init();
  },
  methods: {
    init() {
      // 使用WebGL渲染3D对象并开启抗锯齿
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, logarithmicDepthBuffer: true });
      // 将场景大小设定为容器大小
      this.renderer.setSize(
        this.$refs.canvas3D.clientWidth,
        this.$refs.canvas3D.clientHeight
      );
      // 将场景添加到容器'canvas3D'中
      this.$refs.canvas3D.appendChild(this.renderer.domElement);
      // 初始化透视摄像机
      this.camera = new THREE.PerspectiveCamera(
        90, // 摄像机视野
        window.innerWidth / window.innerHeight,
        0.1, // 与摄像机距离小于该单位部分将不会被渲染
        1600 // 摄像机最大可视距离
      );
      // 初始化摄像机坐标
      this.camera.position.set(6, 3, 10);
      // 设置控制对象为当前场景的摄像机
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.addEventListener('change', this.updateLight);
      // 接受函数返回的3D对象
      this.axes = this.createCustomAxes();
      // 将对象添加到场景
      this.scene.add(this.axes);
      this.renderer.setClearColor(0x000000, 0);
      const ambientLight = new THREE.AmbientLight(0xffff00, 0.8); // 环境光
      this.scene.add(ambientLight);
      this.directionalLight = new THREE.DirectionalLight(0xfffff0, 0.4);// 平行光
      this.scene.add(this.directionalLight);
      this.updateLight();
      this.animate();
    },
    updateLight() {
      this.directionalLight.position.copy(this.camera.position);
      // 将平行光的方向设置为和摄像机朝向相同
      const direction = new THREE.Vector3();
      this.camera.getWorldDirection(direction)
      this.directionalLight.lookAt(direction);
    },
    createCustomAxes() {
      // 创建一个新的3D对象'axes'作为坐标轴
      const axes = new THREE.Object3D();
      // 长度为200单位
      const length = 200;
      // 创建一个红色实线基础材质作为X轴正半轴
      const positiveXAxisMaterial = new THREE.LineBasicMaterial({
        color: 0xff0000,
      });
      // 创建一个红色虚线基础材质作为X轴负半轴
      const negativeXAxisMaterial = new THREE.LineDashedMaterial({
        color: 0xff0000,
        dashSize: 0.1,
        gapSize: 0.1,
      });
      // 蓝色实线基础材质 Y正
      const positiveYAxisMaterial = new THREE.LineBasicMaterial({
        color: 0x0000ff,
      });
      // 蓝色虚线基础材质 Y负
      const negativeYAxisMaterial = new THREE.LineDashedMaterial({
        color: 0x0000ff,
        dashSize: 0.1,
        gapSize: 0.1,
      });
      // 蓝色实线基础材质 Z正
      const positiveZAxisMaterial = new THREE.LineBasicMaterial({
        color: 0x00ff00,
      });
      // 蓝色实线基础材质 Z负
      const negativeZAxisMaterial = new THREE.LineDashedMaterial({
        color: 0x00ff00,
        dashSize: 0.1,
        gapSize: 0.1,
      });
      // 以点创建实线结构作为X轴正半轴
      const xAxisPositiveGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(length, 0, 0),
      ]);
      // 以点创建实线结构作为X轴负半轴
      const xAxisNegativeGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-length, 0, 0),
      ]);
      // 以对应结构与材质创建3D对象作为X轴正半轴
      const xAxisPositive = new THREE.Line(
        xAxisPositiveGeometry,
        positiveXAxisMaterial
      );
      // 以对应结构与材质创建3D对象作为X轴负半轴
      const xAxisNegative = new THREE.Line(
        xAxisNegativeGeometry,
        negativeXAxisMaterial
      );
      // 计算线段上每个顶点的距离以正确渲染对象
      xAxisNegative.computeLineDistances();
      // 将对象添加到场景
      axes.add(xAxisPositive);
      axes.add(xAxisNegative);
      // 下同
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
      // 调用addAxisLabels(axes, length)并传入对象与长度为坐标轴添加刻度
      this.addAxisLabels(axes, length);
      // 返回3D对象
      return axes;
    },
    addAxisLabels(axes, length) {
      const loader = new FontLoader(); // 创建新的字体加载器
      loader.load(
        "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", // 从指定url加载字体
        // 传入获取的font对象作为数字渲染的参考字体
        (font) => {
          // 遍历坐标轴上每个坐标为整数的点
          for (let i = -length; i <= length; i++) {
            if (i !== 0) {
              // 调用'createAxisLabel()'函数并传参以创建坐标数字标记
              this.createAxisLabel(
                font,// 字体
                new THREE.Vector3(i, -0.5, 0), // 以当前对象坐标轴（X轴）创建新的三维向量用以定义数字标记位置（y轴偏移量-0.5）
                i,// 当前坐标
                0xff0000,// 红色
                axes,// 添加标记的对象（即坐标轴）
                0,// 数字旋转偏移量
                "x"// 当前指向的坐标轴
              );
              // 调用'creatTickMark()'函数并传参以创建坐标刻度标记
              this.createTickMark(
                // 定义刻度长度
                new THREE.Vector3(i, 0, 0),
                new THREE.Vector3(i, -0.2, 0),
                0xff0000,// 红色
                axes// 添加的对象
              );
              // 同上
              this.createAxisLabel(
                font,
                new THREE.Vector3(-0.8, i, 0),// 当前对象坐标轴为y轴（x轴偏移量-0.8）
                i,
                0x0000ff,// 蓝色
                axes,
                0,
                "y"
              );
              this.createTickMark(
                // 同上
                new THREE.Vector3(0, i, 0),
                new THREE.Vector3(-0.2, i, 0),
                0x0000ff,
                axes
              );
              this.createAxisLabel(
                font,
                new THREE.Vector3(0, -0.5, i),// 当前对象坐标轴
                i,
                0x00ff00,// 绿色
                axes,
                Math.PI / 2,// 旋转偏移量为90°
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
      rotation = 0,// 初始化旋转偏移量为0
      axis
    ) {
      // 使用'new TextGeometry()'创建数字结构
      const textGeo = new TextGeometry(text.toString(), {
        font: font,// 字体
        size: 0.35,// 字体大小
        depth: 0.05,// 字体厚度
      });
      // 使用'new THREE.MeshBasicMaterial'创建基础材质  //（材质改为冯氏反射）
      const textMaterial = new THREE.MeshPhongMaterial({
        color: color,
        specular: 0xffffc0,
        shininess: 20,
      });
      // 使用结构与材质创建3D对象
      const textMesh = new THREE.Mesh(textGeo, textMaterial);
      // 对象应用传入的坐标
      textMesh.position.copy(position);
      // 标准化刻度旋转偏移量
      if (axis === "x" || axis === "z") {
        textMesh.rotation.y = rotation;
      } else {
        textMesh.rotation.x = rotation;
      }
      // 向坐标轴添加刻度
      parent.add(textMesh);
    },
    createTickMark(start, end, color, parent) {
      // 以传入参数创建刻度结构
      const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
      // 以传入参数创建基础线条材质
      const material = new THREE.LineBasicMaterial({ color: color });
      // 以结构与材质创建3D对象
      const line = new THREE.Line(geometry, material);
      // 将对象添加到坐标轴
      parent.add(line);
    },
    animate() {
      // 使用'toRaw'获取响应式对象的原始版本用以渲染场景。
      // Vue3的代理机制会影响Three.js的某些库，使用'toRaw'获取响应式对象的原始版本可以避免这个影响。
      this.renderer.render(toRaw(this.scene), toRaw(this.camera));
      // 每帧更新前回调'animate()'函数
      requestAnimationFrame(this.animate.bind(this));
    },
    formatInput(inputs, index) {
      // 每次用户输入函数，删除上一次渲染的图像
      while (this.scene.children.length > 1) {
        this.scene.remove(this.scene.children[1]);
      }
      // 以正则表达式匹配一个或多个连续空白字符替换为空字符，并将输入以';'或'；'分割为数组，从而格式化用户输入
      const fn = inputs.map((evt) => {
        return { fn: evt };
      });
      const rawData = toRaw(this.$store.state.functionData_3D);
      const newFunctionData = [...rawData];
      newFunctionData.splice(index, 1, ...fn);
      console.log(newFunctionData);
      
      const playload = {
        data: newFunctionData,
        is2D: false,
      };
      this.$store.commit('syncData', playload);
      // 遍历数组逐一传递元素到'plotFunction()'
      newFunctionData.forEach(input => this.plotFunction(input.fn));
    },
    fuckResize() {
      const width = this.$refs.canvas3D.clientWidth;
      const height = this.$refs.canvas3D.clientHeight;
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    },
    plotFunction(input) {
      const allNumbers = /^\d+(\.\d+)?$/.test(input.slice(2));
      const startTime = performance.now();
      let geometry;
      // 创建基础线条材质
      let material = new THREE.MeshBasicMaterial({
        color: 0x3087b9,
        side: THREE.DoubleSide,
        wireframe: true,
        wireframeLinewidth: 2,
      });
      const createLineFromPoints = (points) => {
        // 创建几何结构并以传入参数定义顶点
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        // 创建线条3D对象并返回
        return new THREE.Line(geometry, material);
      };
      const createSurfaceFromPoints = (points) => {
        // let indexsArray = [];
        // const sampleStep = 5;
        // for (let i = 0; i < points.length; i += 3 * sampleStep) {
        //   indexsArray.push([points[i], points[i + 1], points[i + 2]]);
        // }
        // const triangles = DelaunayFast.triangulate(indexsArray);
        geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
          "position",
          // 以'new THREE.Float32BufferAttribute()'创建和管理几何体顶点数据
          new THREE.Float32BufferAttribute(points, 3)
        );
        // const indices = new Uint16Array(triangles);
        // geometry.setIndex(new THREE.BufferAttribute(points, 3));
        // 创建基础材质
        // const material = new THREE.MeshPhongMaterial({
        //   color: 0xfff000,
        //   specular: 0xffffc0,
        //   shininess: 20,
        // });
        const material = new THREE.MeshBasicMaterial({
          color: 0x3087b9,
          side: THREE.DoubleSide,
          wireframe: true,
          wireframeLinewidth: 2,
        });
        // 返回3D对象
        return new THREE.Mesh(geometry, material);
      };
      const spatialCoordinateCalculation = (target) => {
        const step = 0.26;// 计算步长
        const workerCount = 10;// 创建的计算线程数
        const range = 400;// 总计算范围
        const chunkSize = range / workerCount;// 计算分块大小
        const exprString = input;// 获取函数输入
        let chunksReceived = 0;// 初始化已接收的线程数为0
        // 计算每个线程中需要计算的总点数
        const totalPointsPerChunk =
          // 计算每行的点数，并将其向上取整
          Math.ceil(chunkSize / step + 1) *
          // 计算每列的点数，并将其向上取整
          Math.ceil(400 / step + 1) *
          3;// 每个点有 3 个坐标值 (x, y, z)
        // 创建一个'Float32Array'来存储所有点的坐标
        const points = new Float32Array(
          // 数组的总长度是线程的数量乘以每个分块的总点数
          workerCount * totalPointsPerChunk
        );
        // 使用for循环创建线程
        for (let i = 0; i < workerCount; i++) {
          // 定义当前创建的线程计算分块起点
          const start = -200 + i * chunkSize;
          // 定义当前创建的线程计算分块终点
          const end = start + chunkSize;
          // 创建线程
          const worker = new Worker(
            new URL("../assets/workers.js", import.meta.url), { type: "module", }
          );
          // 以'postMessage'向线程发送数据
          worker.postMessage({
            start,
            end,
            initStep: step,
            exprString,
            target,
          });
          // 创建主线程事件监听器，将计算线程发送的数据进行解析
          worker.onmessage = (event) => {
            // 使用'Float32Array'管理顶点坐标集
            const chunkPoints = new Float32Array(event.data);
            console.log(
              `${i}号worker返回分块:`,
              chunkPoints.length
            );
            // 使用set方法将接收到的顶点坐标集添加到'points'数组里并定义该数据的起点
            points.set(chunkPoints, i * totalPointsPerChunk);
            console.log("总点数:", points.length);
            chunksReceived++;
            console.log(`当前进度: ${chunksReceived}/${workerCount}`);
            // 若已接收到所有线程的返回数据
            if (chunksReceived === workerCount) {
              console.log("分块收取完毕");
              // 调用'createSurfaceFromPoints()'并将顶点坐标集传入到该函数，并接收返回的3D对象
              const surface = createSurfaceFromPoints(points);
              // 将返回的3D对象添加到场景
              this.scene.add(surface);
              const elapsedTime = performance.now() - startTime;
              console.log("生成完成，耗时", elapsedTime / 1000, "秒");
            }
          };
        }
      };
      // 若因变量为坐标轴
      if (input.startsWith("x=")) {
        // 若该因变量已被数字定义
        if (allNumbers) {
          // 将字符串（数字）转换为浮点数
          const xValue = parseFloat(input.slice(2));
          // 创建点集
          const points = [
            new THREE.Vector3(xValue, -200, 0),
            new THREE.Vector3(xValue, 200, 0),
          ];
          // 调用'createLineFromPoints()'，传入点集，并接收返回的3D对象
          const line = createLineFromPoints(points);
          // 将3D对象添加到场景
          this.scene.add(line);
        } else {
          try {
            // 使用 math.js 库解析输入函数，得到一个表达式树
            const expr = parse(input);
            const points = [];// 创建顶点坐标集
            const vals = [];// 创建变量栈
            let a = 0; // 设置一个标志变量
            // 遍历表达式树节点，将自变量复制到变量栈
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
            // 若变量栈仅有一个元素
            if (vals.length === 1) {
              // 提取栈顶元素
              const valName = vals.pop();
              // 判断元素是否为'y'或'z'
              if (valName === "y" || valName === "z") {
                // 遍历坐标轴，步长0.001
                for (let i = -200; i <= 200; i += 0.001) {
                  // 为自变量赋值
                  const scope = { [valName]: i };
                  // 评估表达式以计算因变量
                  const x = THREE.MathUtils.clamp(expr.evaluate(scope), -7, 7);
                  // 判断因变量类型，以定义不同的点
                  if (valName === "y") {
                    points.push(new THREE.Vector3(x, i, 0));
                  } else {
                    points.push(new THREE.Vector3(x, 0, i));
                  }
                }
                // 调用'createLineFromPoints()'，传入点集，并接收返回的3D对象
                const line = createLineFromPoints(points);
                // 将3D对象添加到场景
                this.scene.add(line);
              }
            } // 若变量栈不止一个元素
            else {
              // 传入当前因变量以区分不同点的创建
              const target = "x";
              spatialCoordinateCalculation(target);
            }
          } catch (error) {
            alert("不受支持的输入");
          }
        }
      } // 同上
      else if (input.startsWith("y=")) {
        if (allNumbers) {
          const yValue = parseFloat(input.slice(2));
          const points = [
            new THREE.Vector3(0, yValue, -200),
            new THREE.Vector3(0, yValue, 200),
          ];
          const line = createLineFromPoints(points);
          this.scene.add(line);
          let elapsedTime = performance.now() - startTime;
          console.log("生成完成，耗时", elapsedTime, "毫秒");
        } else {
          try {
            const expr = parse(input);
            const points = [];
            const vals = [];
            let a = 0;
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
      } else if (input.startsWith("z=")) {
        if (allNumbers) {
          const zValue = parseFloat(input.slice(2));
          const points = [
            new THREE.Vector3(-200, 0, zValue),
            new THREE.Vector3(200, 0, zValue),
          ];
          const line = createLineFromPoints(points);
          this.scene.add(line);
          let elapsedTime = performance.now() - startTime;
          console.log("生成完成，耗时", elapsedTime, "毫秒");
        } else {
          try {
            const expr = parse(input);
            const points = [];
            const vals = [];
            let a = 0;
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
      }// 若输入以'sphere'开头
      else if (input.startsWith("sphere")) {
        const params = input.split(",");// 将输入以','分割为数组
        let radius = 1;// 初始化半径为1
        let segments = 32;// 初始化垂直细分度
        let rings = 32;// 初始化水平细分度
        // 遍历数组中的元素
        params.forEach((param) => {
          // 解构赋值语法
          // 将当前指向元素以'='分割为数组，依次赋值给'key'和'value'
          const [key, value] = param.split("=");
          // 若'key'为'radius'
          if (key === "radius") {
            // 将'value'转换为浮点数并赋值给变量'radius'
            radius = parseFloat(value);
          } else if (key === "segments") {
            // 同上
            segments = parseInt(value, 10);
          } else if (key === "rings") {
            rings = parseInt(value, 10);
          }
        });
        // 以'new THREE.SphereGeometry()'与对应变量创建球形结构
        geometry = new THREE.SphereGeometry(radius, segments, rings);
        // 创建基础网格材质
        material = new THREE.MeshBasicMaterial({
          color: 0xff0000,
          wireframe: true,
          side: THREE.DoubleSide
        });
        // 创建球形3D对象
        const sphere = new THREE.Mesh(geometry, material);
        // 将3D对象添加到场景
        this.scene.add(sphere);
      }// 同上
      else if (input.startsWith("cube")) {
        const params = input.split(",");
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
        material = new THREE.MeshBasicMaterial({
          color: 0xff0000,
          wireframe: true,
          side: THREE.DoubleSide
        });
        // 创建立方体网格并添加到场景
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);
      }
      // 这个else将来应该不会保留
      else {
        try {
          const expr = parse(input);
          const points = [];
          for (let x = -200; x <= 200; x += 0.001) {
            const scope = { x: x };
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

<style scoped></style>
