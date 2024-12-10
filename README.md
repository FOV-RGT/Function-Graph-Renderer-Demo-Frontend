# <center> FunctionPlotter-demo
<center> <img src="./public/486.1-done.png" width="100" height="100"> </center>

---
## <center> 前言
目前这个demo的二维绘图部分已经实现大部分基础功能，三维部分的基础功能仍不完善，如**导入三维模型，自定义光照与材质**。

二维绘图部分的性能明显被前后端通信速度限制，故正式开发时我建议考虑使用**plotly.js**，交互性吊打**matplotlib**，还可以省去后端的开发，现在写的后端就当看个乐子。

**three.js**是个相当复杂的三维动画库，如果要实现**导入三维模型，自定义光照与材质**等功能，正式开发时可能会花非常多时间在这上面。建议大家善用AI，只要不是太复杂的东西他都答得上来，github copilot用不了的话可以用[网页版的copilot](https://copilot.microsoft.com/)或者[chatgpt](https://chatgpt.com/)，需要科学上网工具可以在群里说。

未来的参赛作品，我希望能有足够美观的交互界面、简单易上手的图像绘制程序、功能丰富的三维图形渲染，不过这些都得等所有基础功能完善再说。

另附[Three.js官方文档](https://threejs.org/docs/index.html#manual/zh/introduction/Creating-a-scene)、[plotly.js官方文档](https://plotly.com/javascript/getting-started/)

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
- 启动[后端服务器](https://github.com/FOV-RGT/Function-Graph-Renderer-Demo-Backend)

<center> <img src="./public/IMG_4007.PNG" width="300" height="450" title> </center>
测试push