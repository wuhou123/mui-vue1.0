var pageConfig = {
	'main': {
		url: '../main/main.html',
		id: 'main',
		styles: {
			'popGesture': 'none'
		},
		show: {
			autoShow: false,
		},
		waiting: {
			autoShow: false,
		}
	},
	'find-password': {
		url: '../find-password/step1.html',
		id: 'find-password-step1',
		styles: {
			'popGesture': 'none',
			top: 0,
		}
	},
	'device-list': {
		url: '../device-list/device-list.html',
		id: 'device-list',
		styles: {
			'popGesture': 'none'
		}
	}
};
var vm = new Vue({
	el: '#app',
	data: {
		showLogin: false,
		userName: '',
		password: '',
		type: 3, //3表示普通用户，2表示管理员
	},
	ready: function() {
		var _self = this;
		window.addEventListener('pagebeforeshow', this.pageBeforeShow, false);

		mui.init({});
		mui.later(function() {
			_self.showLogin = true;
		}, 2000);
		mui.plusReady(function() {
			//手动关闭启动页
			plus.navigator.closeSplashscreen();

		});
		//一秒内连续点击两次，退出应用，仅安卓有效；
		mui.back = this._back;
		window.addEventListener('fleetLogin', function(event) {
			_self.fleetLogin(event.detail);
		});
		window.addEventListener('userLogin', function(event) {
			_self.userLogin(_self.logins);
		});
	},
	computed: {
		canLogin: function() {
			return this.userName.trim().length > 0 && (this.password.trim().length >= 6 || (this.type==2 && this.password.trim().length >= 1));
		},
	},
	methods: {
		pageBeforeShow: function() {
			this.userName = JSON.parse(localStorage.lastLogin||'{}').name||'';
			localStorage.removeItem('userData');
		},
		login: function() {
			var _self = this,
				userName = _self.userName.trim(),
				password = _self.password.trim(),
				cid ="";
				
			if(!userName || !password) {
				mui.toast('用户名或密码不能为空！');
				return;
			}
			//若是手机号，传上次的设备号给后端（用于后端确定token）
			if (app.Reg.IS_MOBILE.test(userName)) {
				cid = localStorage["bind:" + userName]||'';
			}
			mui('#pw')[0].blur();
			var loginData = {
				name: _self.userName,
				pwd: _self.password,
				type: _self.type,
				cid:cid,
				packageName: localStorage.appId,
			};
			app.ajax({
				url: app.api['login'],
				data: loginData,
				showWaiting: '请稍等...',
				closeWaiting: false,
				success: function(data, message) {
					if (data.prompt!=null) {
						mui.alert(message, '', data.prompt==0?'确定':'设置', function() {
							if (data.prompt==0) {
								vm.userName = data.clink;
								vm.password = '';
								app.closeWaiting();
							} else {
								mui.openWindow({url: "../register/register.html?mobile="+(data.clink||'')});
								app.closeWaiting();
							}
						});
						return;
					}
					_self.logins = data;
					localStorage.lastLogin = JSON.stringify(loginData);
					_self.password = '';
					
					if(!data.device) {  //管理员
						app.closeWaiting();
						localStorage.adminToken = data['access_token'];
						vm.openWindow(pageConfig['device-list']);
						return;
					}
					
					if (data.contents == '3') {  //未激活
						localStorage.activateToken = data['access_token'];
						app.closeWaiting();
						mui.confirm('您的设备未激活', '', ['试用','去激活'], function(e) {
							if (e.index == 0) {
								_self.userLogin(data);
							} else if (e.index == 1) {
								vm.openWindow({url: '../activate/activate.html', styles: {top: 0}});
							}
						});
					} else if (data.contents == '4') {
						localStorage.activateToken = data['access_token'];
						app.closeWaiting();
						mui.alert('您的设备未激活', '', '去激活', function(e) {
							if (e.index == 0)
								vm.openWindow({url: '../activate/activate.html', styles: {top: 0}});
						});
					} else {
						_self.userLogin(data);
					}
				},
				error: function() {
					app.closeWaiting();
				}
			});

		},
		fleetLogin: function(item) {
			localStorage.setItem('token', localStorage.adminToken);
			localStorage.setItem('user', new User(item.cid, "admin", item.clink));
			app.ajax({
				url: app.api.decideGetPush,
				data: {cid: item.cid},
				success: function() {}
			});
			mui.openWindow(pageConfig['main']);
		},
		findPassword: function() {
			vm.openWindow(pageConfig['find-password']);
		},
		switchToggle: function(event) {
			this.type = event.detail.isActive ? 2 : 3;
		},
		userLogin: function(data) {
			//刷新手机号绑定的最新登录设备，用于手机号登录
			localStorage.setItem("bind:" + data.ctel, data.device[0]);
			localStorage.token = data['access_token'];
			var u = new User(data.device[0], 'normal', data.clink);
			localStorage.user = JSON.stringify(u);
			mui.openWindow(pageConfig['main']);
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
				}
			}
		}
	}
});