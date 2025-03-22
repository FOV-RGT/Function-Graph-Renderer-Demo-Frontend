# <center> Function-Graph-Renderer-Demo-Frontend

## 版权声明

版权所有 (C) 2024 TechOTaKu-Team

## 许可证

该项目使用 GNU 通用公共许可证第三版 (GPL-3.0)。详情请参见 LICENSE 文件。

<center> <img src="./public/486.1-done.png" width="100" height="100"> </center>

---
## <center> 未来优化方向
- [x] 响应式布局
- [ ] 渐进式网页应用
- [x] 自适应采样算法
- [ ] Delaunay三角剖分算法
- [x] 动态规划坐标计算
- [x] 用户登陆与历史记录功能
- [ ] 提供键盘支持输入复杂的数学计算（如矩阵计算）

---
## <center> 项目运行
1.前置条件
- **Node.js 16** 及以上版本
- npm包管理器

2.安装依赖
```sh
npm i
```

3.启动项目
```sh
npm run dev
```
或直接运行NPM脚本`dev`
- 启动[后端服务器](https://github.com/FOV-RGT/Function-Graph-Renderer-Demo-Backend) （v0.9.0及以上版本不再需要后端服务器支持图形渲染）

---

## <center> 已知Bug

- 三维的部分过于庞大的对象在添加时会阻塞主线程
- 无法识别诸如'sin(y)'等因变量不明的函数（因变量默认为'y'，'sin(y)'会产生冲突）
- 无法识别诸如'x^2 + y^2 + z^2 = 10等函数
<center> <img src="./public/IMG_4007.PNG" width="300" height="450" title> </center>
