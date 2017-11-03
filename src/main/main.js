var vm = new Vue({
	el: '#app',
	data: {
		activeTab: '../home/home.html',
		firstTime: null,
		initIndex: 0, //[初始化参数]
		subStyle: {
			top: '44px',
			bottom: '51px',
			left: '0px',
			right: '0px',
			popGesture: 'none',
			hardwareAccelerated: true
		},
		tabbar: [{
				icon: 'iconfont icon-shangchangtubiao-4',
				title: '首页',
				url: '../home/home.html'
			},
			{
				icon: 'iconfont icon-youhuijuan',
				title: '找券',
				url: '../findCard/findCard.html'
			}, {
				icon: 'iconfont icon-shangchangtubiao-1',
				title: '9.9包邮',
				url: '../pinkAge/pinkAge.html'
			}, {
				icon: 'iconfont icon-icongerenzhongxin-01',
				title: '我的',
				url: '../mine/mine.html'
			}
		],
		title: '首页',
	},
	ready: function() {
		var vm = this;
		this.subStyle.top = (44 + (parseFloat(localStorage.immersed) || 0)) + 'px';
		mui('header')[0].style.marginTop = localStorage.immersed + 'px';
		var vmData = JSON.parse(JSON.stringify(vm.$data));
		mui.init();
		//一秒内连续点击两次，退出应用，仅安卓有效；
		mui.back = this._back;
		// 初始化
		if(mui.os.plus) {
			mui.plusReady(function() {				
				//预创建三个tab切换页,其中主页比较特殊，不共用main页面的header
				var curWv = plus.webview.currentWebview();
				var subUrl = vmData.tabbar[0].url,
					subId = subUrl.match(app.Reg.MODULE_NAME)[1],
					subWs = plus.webview.getWebviewById(subId);
				if(!subWs) {
					subWs = plus.webview.create(subUrl, subId, mui.extend({}, vmData.subStyle, {
						top: localStorage.immersed,
					}));
				}
				curWv.append(subWs);
				app.closeWaiting();
				plus.webview.currentWebview().show('slide-in-right', 300);

				setTimeout(function() {
					for(var i = 1; i < vmData.tabbar.length; i++) {
						var subUrl = vmData.tabbar[i].url,
							subId = subUrl.match(app.Reg.MODULE_NAME)[1],
							subWs = plus.webview.getWebviewById(subId);
						if(!subWs) {
							subWs = plus.webview.create(subUrl, subId, i == 0 ? mui.extend({}, vmData.subStyle, {
								top: localStorage.immersed
							}) : vmData.subStyle);
						}
						if(i != vmData.initIndex) {
							subWs.hide();
						}
						curWv.append(subWs);
					}
				}, 1500);
			});
		} else {
			vm.createIframe('.mui-content', {
				url: vmData.tabbar[vmData.initIndex].url,
				style: vmData.subStyle
			});
		}
	},
	methods: {
		tab: function(index) {
			vm.initIndex = index;
			var targetTab = this.tabbar[index].url;
			if(targetTab === this.activeTab) return;
			// 标题切换
			this.title = this.tabbar[index].title;
			// 子页内容切换
			if(mui.os.plus) {
				if(!window.plus) return;
				mui.openWindow(targetTab.match(app.Reg.MODULE_NAME)[1]);

				// 隐藏当前webview
				plus.webview.hide(this.activeTab.match(app.Reg.MODULE_NAME)[1]);
				// 更改当前活跃的选项卡
				this.activeTab = targetTab;
			} else {
				// 创建iframe代替子页面
				this.createIframe('.mui-content', {
					url: targetTab,
					style: this.subStyle
				});
			}
		},
		_back: function() {
			var self = this;
			if(!self.firstTime) {
				self.firstTime = new Date().getTime();
				plus.nativeUI.toast("再按一次退出应用");
				setTimeout(function() {
					self.firstTime = null;
				}, 1000);
			} else {
				if(new Date().getTime() - self.firstTime < 1000) {
					var main = plus.android.runtimeMainActivity();
					main.moveTaskToBack(false);
					setTimeout(function() {
						self.tab(0);
					}, 500);
				}
			}
		},
		createIframe: function(el, opt) {
			this.$data.activeTab = opt.url;
			//去除vm引用
			opt = JSON.parse(JSON.stringify(opt));
			//当不在plus环境中时，使用iframe模拟多tab情况
			var elContainer = document.querySelector(el);
			var wrapper = document.querySelector(".mui-iframe-wrapper");
			if(!wrapper) {
				// 创建wrapper 和 iframe
				wrapper = document.createElement('div');
				wrapper.className = 'mui-iframe-wrapper';
				var iframe = document.createElement('iframe');
				iframe.src = opt.url;
				iframe.id = opt.id || opt.url.match(app.Reg.MODULE_NAME)[1];
				iframe.name = opt.id;
				wrapper.appendChild(iframe);
				elContainer.appendChild(wrapper);
			} else {
				var iframe = wrapper.querySelector('iframe');
				iframe.src = opt.url;
				iframe.id = opt.id || opt.url.match(app.Reg.MODULE_NAME)[1];
				iframe.name = iframe.id;
			}
			if(opt.url.lastIndexOf('home.html') > -1) opt.style.top = 0;
			for(var i in opt.style) {
				wrapper.style[i] = opt.style[i];
			}
		}
	}
})