## 前言
基于mui+vue1.0的H5 APP项目,页面视图全部都是html5页，不是嵌入app原生页面，项目可以直接运行在PC上调试，也可以在hbuilder上真机调试，可以直接下载安装[点此链接二维码下载](http://fir.im/dmaw)。 

**目前还是采用vue1.0和gulp构建还处于页面优化阶段，后面再升级到vue2.x和webpack再重新配置成单页面app**

app打包技术是用[HBuilder IDE](http://www.dcloud.io/index.html)工具一键打包成APP，也可以借助eclipse本地打包（本地打包是有添加Android sdk包的需求，这里没有介绍，只是简单构建使用，本地打包工程如需可以索取）。这些都是[dcloud](http://www.dcloud.io/index.html)提供一整套技术解决方案。

**说明:** 编辑和项目开发借鉴了github上yujinjin/fans的项目，项目只是开始，后面再添加页面和后端接口

> 1. 前端UI的部分使用mui框架
> 
> 2. app打包技术使用HBuilder IDE工具
> 

## 安装
- 下载[HBuilder IDE](http://www.dcloud.io/index.html)开发工具，其实HBuilder是dcloud 把eclipse的改造成一个专门应用于app打包、多种语言支持：php、jsp、ruby、python、nodejs等web语言，less、coffee等编译型语言均支持的开发工具

- 下载[node.js](https://nodejs.org/en/)，作为前端web的运行环境。我当前的node.js版本是6.9.2 npm版本是3.10.9


- app打包完全是基于manifest.json配置文件，它主要是用来配置app的基本信息（版本号、appid等）、图标(app的应用图标)、sdk配置、模块权限配置、页面引用关系、代码视图，具体参看dcloud提供的[文档](http://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/94)。


## npm初始化

##### package.json内容如下

```
{
  "devDependencies": {
    "autoprefixer": "^7.1.1",
    "babel-core": "^6.25.0",
    "babel-loader": "^7.1.1",
    "babel-plugin-syntax-dynamic-import": "^6.18.0",
    "babel-preset-env": "^1.6.0",
    "css-loader": "^0.28.4",
    "gulp": "^3.9.1",
    "gulp-changed": "^2.0.0",
    "gulp-clean-css": "^3.0.3",
    "gulp-htmlmin": "^3.0.0",
    "gulp-load-plugins": "^1.5.0",
    "gulp-postcss": "^6.3.0",
    "gulp-pug": "^3.3.0",
    "gulp-stylus": "^2.6.0",
    "gulp-uglify": "^2.0.1",
    "postcss-loader": "^2.0.6",
    "pug-loader": "^2.3.0",
    "stream-combiner2": "^1.1.1",
    "stylus-loader": "^3.0.1",
    "vinyl-named": "^1.1.0",
    "vue-loader": "^12.2.1",
    "vue-template-compiler": "^2.3.4",
    "webpack": "^2.6.1",
    "webpack-stream": "^3.2.0"
  },
  "browserslist": [
    "Android > 4.0",
    "iOS > 7"
  ],
  "dependencies": {
    "axios": "^0.16.2",
    "vue": "^2.3.4"
  }
}

```

## 项目目录说明


```
|-- build                                 // 编译后目录
|   |-- page.html                      // 编译app的html模板页面
|   |-- page.css                      // 编译app的css
|   |-- page.js                      // 编译app的js
|-- src                                 // 源码目录
|   |-- page.html                      // app的html页面
|   |-- page.css                      // app的css
|   |-- page.js                      // app的js
|-- unpackage                           // app编译包目录
|-- gulpfile.js                            // gulp配置
|-- index.html                          // webapp的首页加载文件
|-- manifest.json                       // 打包app的配置文件
|-- package.json                        // 配置项目相关信息，通过执行 npm init 命令创建
```


## 运行程序

项目地址：（`git clone`）
```
git clone https://github.com/wuhou123/mui-vue.git
```
通过`npm`安装本地服务第三方依赖模块(需要已安装[Node.js](https://nodejs.org/))

启动发布DEV代码

```
npm install
gulp dev
打开build/main/main.html
```

说明一下：由于要解决移动端iOS操作系统click事件延迟300ms问题，特意使用了tap事件来替代click事件。所以运行时最好是在浏览器中的手机模拟器中操作。

## 实现的功能
- 用户登录
- 首页
    - 多tab页上拉刷新和加载，页面菜单切换
- 其他单页面

## 最后
- 如果喜欢一定要 star哈!!!（谢谢!!）

- 如果有意见和问题 请在 lssues提出，我会在线解答。