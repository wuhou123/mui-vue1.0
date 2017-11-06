## 前言
基于mui+vue1.0的H5 APP项目,页面视图全部都是html5页，不是嵌入app原生页面，项目可以直接运行在PC上调试，也可以在hbuilder上真机调试，可以直接下载安装[点此链接下载](http://fir.im/dmaw)。 

目前还是采用vue1.0和gulp构建还处于页面优化阶段，后面再升级到vue2.x和webpack再重新配置

app打包技术是用[HBuilder IDE](http://www.dcloud.io/index.html)工具一键打包成APP，也可以借助eclipse本地打包（本地打包是有添加Android sdk包的需求，这里没有介绍，只是简单构建使用，本地打包工程如需可以索取）。这些都是[dcloud](http://www.dcloud.io/index.html)提供一整套技术解决方案。

**说明**编辑和项目开发借鉴了github上yujinjin/fans的项目，项目只是开始，后面再添加页面和后端接口

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
	"name": "Fans",
	"version": "1.0.0",
	"description": "粉丝煲",
	"main": "js/entrance.js",
	"keywords": "粉丝煲",
	"homepage": "",
	"bugs": {
		"url": "https://github.com/yujinjin/fans/issues",
		"email": "yujinjin9@126.com"
	},
	"author": {
		"name": "jinyu",
		"email": "yujinjin9@126.com",
		"url": "https://github.com/yujinjin"
	},
	"license": "MIT",
	"repository": {
		"type": "git",
		"url": "https://github.com/yujinjin/fans.git"
	},
	"scripts": {
		"R_DEV": "set NODE_RUN=1&&webpack-dev-server --progress --watch --inline --host=0.0.0.0  --port 8083",
		"B_DEV":"set NODE_ENV=dev&set NODE_RUN=0&webpack --progress --hide-modules",
		"lint": "eslint --ext .js,.vue src test/unit/specs test/e2e/specs"
	},
	"dependencies": {
		"vue": "^2.1.8",
		"vue-resource": "^1.0.3",
		"vue-router": "^2.0.1",
		"vue-html-loader": "1.2.3",
    	"vue-loader": "10.0.0",
    	"vue-style-loader": "^1.0.0",
    	"vue-template-compiler": "^2.1.0"
	},
	"devDependencies": {
		"vuex": "^2.0.0",
		"autoprefixer": "^6.4.0",
	    "babel-core": "^6.0.0",
	    "babel-eslint": "^7.0.0",
	    "babel-loader": "^6.0.0",
	    "babel-plugin-transform-runtime": "^6.0.0",
	    "babel-preset-es2015": "^6.0.0",
	    "babel-preset-stage-2": "^6.0.0",
	    "babel-register": "^6.0.0",
	    "babel-polyfill": "^6.22.0",
		"cross-env": "^1.0.6",
		"css-loader": "^0.25.0",
		"less": "^2.7.1",
		"less-loader": "^2.2.3",
		"file-loader": "^0.9.0",
		"html-loader": "^0.4.4",
		"html-webpack-plugin": "^2.24.1",
		"jshint": "^2.9.4",
		"jshint-loader": "^0.8.3",
		"style-loader": "^0.13.1",
		"url-loader": "^0.5.7",
		"extract-text-webpack-plugin": "^2.0.0-beta.4",
		"webpack": "^2.1.0-beta.25",
		"webpack-dev-server": "^2.1.0-beta.10",
		"webpack-require-http": "^0.4.0"
	},
	
	"engines": {
		"node": ">=5.0.0",
		"npm": ">=3.3.6"
	}
}

```

## 项目目录说明


```
|-- build                               // webapck打包后的文件目录
|-- logo                                // 存放app的图表地址目录
|-- src                                 // 源码目录
|   |-- components                      // 存放公共组件的目录
|       |-- member-qrcode.vue           // 会员二维码公共组件
|       |-- ...                         // 其他公共组件
|   |-- css                             // 存放各种css文件目录
|       |-- app.css                     // app的公用样式文件 
|       |-- icons-extra.css             // icons的扩展字体样式 
|       |-- mui.css                     // mui框架css
|       |-- ...                         // 其他css
|   |-- fonts                           // 存放各种fonts文件目录
|       |-- ...                         // 其他fonts文件
|   |-- imgs                            // 存放各种图片文件目录
|       |-- test                        // 存放开发测试的图片文件目录
|           |-- ...                     // 其他测试图片文件
|       |-- ...                         // 其他图片文件
|   |-- js                              // 存放各种js文件目录
|       |-- components                  // 存放各种js组件的目录
|           |-- app-routers.js          // 站点路由插件（只做路由的操作，不涉及实际的业务处理）
|           |-- signalR.js              // signalR组件
|           |-- ...                     // 其他JS组件
|       |-- config                      // 存放打包各种环境的目录
|           |-- DEV.js                  // DEV环境配置文件
|           |-- GQC.js                  // GQC环境配置文件
|           |-- PRD.js                  // PRD环境配置文件
|           |-- ...                     // 其他环境配置文件
|       |-- lib                         // 第三方JS lib目录
|           |-- mui.js                  // mui插件
|           |-- ...                     // 其他第三方JS插件
|       |-- services                    // app自己的业务目录
|           |-- global-service.js       // APP 全局业务逻辑方法，主要处理登录、登出的业务逻辑
|       |-- store                       // vuex管理webApp的数据状态目录
|           |-- index.js                // app数据管理入口文件
|           |-- app-data.js             // app临时数据管理
|           |-- app-event.js            // app事件管理
|           |-- router-status.js        // app路由状态管理
|       |-- utils                       // app的存放工具
|           |-- directives.js           // vue 自定义指令文件
|           |-- log.js                  // app log日志
|           |-- update.js               // app在线更新
|           |-- utils.js                // app站点页面表单验证框架工具类
|           |-- ....                    // 其他工具JS文件
|   		|-- app.js                      // app配置以及其他方法
|   		|-- entrance.js                 // app程序入口文件，加载各种公共组件
|   		|-- routers.js                  // vue的路由配置文件
|   |-- json                      			// 测试的json数据存放目录
|   |-- less                      			// 存放各种less文件的目录
|   		|-- app.less                    // app基础样式，包含其他less文件的入口
|   		|-- ...                         // 其他less样式文件
|   |-- views                      			// 存放各种页面视图组件目录
|   		|-- error                       // 存放错误视图组件目录
|   				|-- 404.vue                 // 404页面视图
|   		|-- users                      	// 存放用户的视图组件目录
|   				|-- login.vue               // 登录页面
|   				|-- user-center.vue         // 用户中心页面
|   				|-- welcome.vue         		// 欢迎页面
|   				|-- ...         		// 其他视图页面
|   		|-- ...                     // 其他功能模块目录
|   		|-- app.vue                     // app页面入口文件
|   		|-- barcode.vue                 // barcode页面入口文件
|   		|-- home.vue                    // app首页面
|   |-- index.html                      // app的html模板页面
|-- unpackage                           // app编译包目录
|-- .babelrc                            // ES6语法编译配置
|-- .editorconfig                       // 编辑器编码规范配置
|-- .gitignore                          // git忽略文件
|-- index.html                          // webapp的首页加载文件
|-- manifest.json                       // 打包app的配置文件
|-- package.json                        // 配置项目相关信息，通过执行 npm init 命令创建
|-- webpack.config.js                   // webpack配置文件
```


## 运行程序

项目地址：（`git clone`）
```shell
git clone https://github.com/yujinjin/fans.git
```
通过`npm`安装本地服务第三方依赖模块(需要已安装[Node.js](https://nodejs.org/))

```
npm install
```
启动DEV服务(http://localhost:8083)

```
npm run R_DEV (window)
npm run MR_DEV (MAC)
```
打包发布DEV代码

```
npm install
gulp dev
```

说明一下：由于要解决移动端iOS操作系统click事件延迟300ms问题，特意使用了tap事件来替代click事件。所以运行时最好是在浏览器中的手机模拟器中操作。

## 实现的功能
- 用户登录
- 首页
    - 扫码核销
    - 会员识别
    - 消息中心
    - 我的收益
    - 营销（素材列表、分享集客）
    - 集客排行榜
- 我的集客
    - 会员管理
    - 集团集客排行榜
    - 本院集客排行榜
- 个人中心
    - 员工信息
    - 我的收益
    - 密码修改
    - 消息中心（收益变化 等）
    - 用户注销

## 最后
- 如果喜欢一定要 star哈!!!（谢谢!!）

- 如果有意见和问题 请在 lssues提出，我会在线解答。