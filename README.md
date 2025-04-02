# DONGMING洞明

## 版权声明

版权所有 (C) 2024-2025 TechOTaKu-Team(菜鸟联盟队)

---

## 许可证

该项目使用 GNU 通用公共许可证第三版 (GPL-3.0)。详情请参见 LICENSE 文件。

---
## 项目运行

### 1.前置条件
- **Node.js 18.20.8(LTS)** 及以上的**LTS**版本
- npm包管理器

### 2.安装依赖
```sh
npm i
```

### 3.启动项目
```sh
npm run dev
```
或直接运行NPM脚本`dev`

### 4.启动[后端服务器](https://github.com/FOV-RGT/Function-Graph-Renderer-Demo-Backend)

---

## 使用说明
二维渲染可直接输入函数，如sin(x) 、x^7 、8log(cos(sin(sqrt(x^3))))等。

三维渲染需要显式输入因变量，如y=x ，y=x^2 - z^2 ，y=log(cos(sin(sqrt(x^3))))

三维渲染也可构建六面体与球体，如：
- sphere,radius=10,segments=10,rings=10
radius: 半径
rings: 纬度细分度
segments: 经度细分度
- cube,width=5,height=5,depth=5
width: 宽度
height: 高度
depth: 深度

也可不输入sphere cube后的参数，将会使用默认值