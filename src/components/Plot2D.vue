<template>
  <div>
    <!-- 输入框，用户可以输入函数 -->
    <input
      v-model="functionInput"
      placeholder="输入例:sin(x),cos(x)"
    />
    <!-- 按钮，用于触发绘图功能 -->
    <button @click="handlePlot">你是否承认千早爱音美貌盖世无双？（点击即承认）</button>
    <!-- 容器，用于显示绘制的图像 -->
    <div class="image-container" @wheel="throttledZoomImage" @mousedown="startDrag" @mousemove="drag" @mouseup="endDrag" @mouseleave="endDrag" @contextmenu.prevent>
      <!-- 图像，使用v-if指令控制是否显示 -->
      <img v-if="imageSrc" :src="imageSrc" alt="Function Plot" ref="plotImage" @dragstart.prevent @selectstart.prevent style="width: 1000px;height: 700px;"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

// 生成随机颜色的函数
function randomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

export default {
  data() {
    return {
      functionInput: 'sin(x),sin(x^2),cos(x),tan(x),sqrt(x),log(x),2/x,x*2,x^2',  // 默认函数
      imageSrc: '',  // 用于存储返回的图像数据
      xmin: -10,
      xmax: 10,
      ymin: -10,
      ymax: 10,
      scaleFactor: 1.2,  // 缩放因子
      throttleTimeout: null,  // 节流计时器
      colors: [],  // 存储每个函数的颜色
      isDragging: false,  // 用于标记是否正在拖动
      dragStartX: 0,  // 鼠标拖动的起始位置 x
      dragStartY: 0,  // 鼠标拖动的起始位置 y
      isZooming: false,  // 标记是否正在缩放
      isOpening: false,
    };
  },
  methods: {
    // 异步函数，用于请求绘图数据
    async plotFunction() {
      console.log(`Function input: ${this.functionInput}`);
      const response = await axios.get(`http://localhost:8000/plot/?function=${encodeURIComponent(this.functionInput)}&xmin=${this.xmin}&xmax=${this.xmax}&ymin=${this.ymin}&ymax=${this.ymax}&colors=${encodeURIComponent(this.colors.join(','))}`);
      console.log(response.data);
      if (response.data.image) {
        this.imageSrc = `data:image/png;base64,${response.data.image}`;  // 设置图像来源
      } else {
        console.error(response.data.error);
      }
    },
    // 处理绘图按钮点击事件
    handlePlot() {
      // 为每个函数生成新的随机颜色
      this.colors = this.functionInput.split(',').map(() => randomColor());
      // 绘制函数
      this.plotFunction();
    },
    // 处理缩放图像的事件
    zoomImage(event) {
      event.preventDefault();

      const rect = event.target.getBoundingClientRect();  // 获取图像的边界框
      const offsetX = event.clientX - rect.left;  // 获取光标在图像中的 x 位置
      const offsetY = event.clientY - rect.top;  // 获取光标在图像中的 y 位置

      const xRatio = offsetX / rect.width;
      const yRatio = offsetY / rect.height;

      const centerX = this.xmin + xRatio * (this.xmax - this.xmin);
      const centerY = this.ymin + yRatio * (this.ymax - this.ymin);

      const rangeX = (this.xmax - this.xmin);
      const rangeY = (this.ymax - this.ymin);

      if (event.deltaY < 0) {
        // 放大
        this.xmin = centerX - (rangeX / this.scaleFactor) * xRatio;
        this.xmax = centerX + (rangeX / this.scaleFactor) * (1 - xRatio);
        this.ymin = centerY - (rangeY / this.scaleFactor) * yRatio;
        this.ymax = centerY + (rangeY / this.scaleFactor) * (1 - yRatio);
      } else {
        // 缩小
        this.xmin = centerX - (rangeX * this.scaleFactor) * xRatio;
        this.xmax = centerX + (rangeX * this.scaleFactor) * (1 - xRatio);
        this.ymin = centerY - (rangeY * this.scaleFactor) * yRatio;
        this.ymax = centerY + (rangeY * this.scaleFactor) * (1 - yRatio);
      }

      this.isZooming = true;
      setTimeout(() => {
        // 保持原有颜色并正确传递参数
        this.plotFunction();
        this.isZooming = false;
      }, 50);  // 调整节流时间为50ms
    },
    // 节流缩放图像的事件
    throttledZoomImage(event) {
      if (this.isZooming) return;
      this.zoomImage(event);
    },
    // 处理鼠标开始拖动的事件
    startDrag(event) {
      this.isDragging = true;
      this.isOpening = true;
      this.dragStartX = event.clientX;
      this.dragStartY = event.clientY;
    },
    // 处理鼠标拖动的事件
    drag(event) {
      if (!this.isOpening || !this.isDragging) return;
      this.isOpening = false;
      const deltaX = (event.clientX - this.dragStartX) / 40;  // 调整系数以控制拖动灵敏度
      const deltaY = (event.clientY - this.dragStartY) / 40;
      this.xmin -= deltaX;
      this.xmax -= deltaX;
      this.ymin += deltaY;
      this.ymax += deltaY;
      this.dragStartX = event.clientX;
      this.dragStartY = event.clientY;
      setTimeout(() => {
        // 保持原有颜色并正确传递参数
        this.plotFunction();
        this.isOpening = true;
      }, 50);  // 调整节流时间为50ms
    },
    // 处理鼠标停止拖动的事件
    endDrag() {
      this.isDragging = false;
      this.isOpening = false;
    }
  }
};
</script>

<style>
.image-container {
  overflow: hidden;
  display: inline-block;
  border: 1px solid #ccc;
  cursor: grab;  /* 添加抓手光标 */
  user-select: none;  /* 禁用选择 */
}

.image-container:active {
  cursor: grabbing;  /* 鼠标按下时的光标 */
}
</style>
