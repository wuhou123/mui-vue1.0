var vm = new Vue({
	el: "#app",
	data: {
		setIndex:0,
		classChange:'icon-30-copy',
		IsShow:false,
		items: [{
			href: '#',
			src: '../../images/shuijiao.jpg'
		}, {
			href: '#',
			src: '../../images/yuantiao.jpg'
		}],
		navs: [{
				name: '女装',
				href: '#',
				icon: 'icon-nvzhuang'
			},
			{
				name: '母婴',
				href: '#',
				icon: 'icon-muying'
			},
			{
				name: '化妆品',
				href: '#',
				icon: 'icon-huazhuangpin'
			},
			{
				name: '居家',
				href: '#',
				icon: 'icon-xingzhuang33'
			},
			{
				name: '鞋包配饰',
				href: '#',
				icon: 'icon-xiebaopeishi'
			},
			{
				name: '美食',
				href: '#',
				icon: 'icon-meishi'
			},
			{
				name: '文体车品',
				href: '#',
				icon: 'icon-wenti'
			},
			{
				name: '数码家电',
				href: '#',
				icon: 'icon-jiadianshumashouji'
			},
			{
				name: '男装',
				href: '#',
				icon: 'icon-nanzhuang'
			},
			{
				name: '更多类目',
				href: '#',
				icon: 'icon-gengduo'
			},
		],
		menus: [{
				name: '精选',
				nav: 'item1mobile',
				contentData:false
			},
			{
				name: '男装',
				nav: 'item2mobile',
				contentData:false
			},
			{
				name: '女装',
				nav: 'item3mobile',
				contentData:false
			},
			{
				name: '母婴',
				nav: 'item4mobile',
				contentData:false
			},
			{
				name: '化妆品',
				nav: 'item5mobile',
				contentData:false
			},
			{
				name: '内衣',
				nav: 'item6mobile',
				contentData:false
			},
			{
				name: '配饰',
				nav: 'item7mobile',
				contentData:false
			}, {
				name: '鞋品',
				nav: 'item8mobile',
				contentData:false
			}, {
				name: '家电',
				nav: 'item9mobile',
				contentData:false
			}, {
				name: '居家',
				nav: 'item10mobile',
				contentData:false
			}, {
				name: '箱包',
				nav: 'item11mobile',
				contentData:false
			}
		],
		count: 0,
		tabsOne: [{
			name: '第一个子项'
		}],
		tabsTwo: [{
			name: '第二个子项'
		}],
		Isloading:true
	},
	ready: function() {
		mui.init();
		var that = this;
		(function($) {
			//阻尼系数
			var deceleration = mui.os.ios ? 0.003 : 0.0009;
			$('.mui-scroll-wrapper').scroll({
				bounce: false,
				indicators: false, //是否显示滚动条
				deceleration: deceleration
			});
			$.ready(function(callback) {
				//循环初始化所有下拉刷新，上拉加载。
				$.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
					$(pullRefreshEl).pullToRefresh({
						down: {
							callback: function() {
								var self = this;
								that.tabDown(index, self)
							}
						},
						up: {
					      height:50,//可选.默认50.触发上拉加载拖动距离
					      auto:false,//可选,默认false.自动上拉加载一次
					      contentrefresh : '<div style="display:block;background:url(../../images/Small.gif);width:300px">加载中</div>',//可选，正在加载状态时，上拉加载控件上显示的标题内容
					      contentnomore:'已到底了',//可选，请求完毕若没有更多数据时显示的提醒内容；
						  callback: function() {								
								var self = this;
								that.tabUp(index, self)
							}
						}
					});
				});
			});	
		})(mui);
		//加载首页数据这里是模拟ajax请求，请求完后赋值contentData就可以了
		this.menus[0].contentData = [{
			title:''
		},{
			title:''
		},{
			title:''
		},{
			title:''
		}];
		//canvas背景
		this.init();		 
	},
	methods: {
		init(){			
			var getW = document.getElementById('banner');
			var myCanvas = document.getElementById('myCanvas');
			var ctx = myCanvas.getContext('2d');			
			var mW = myCanvas.width = getW.clientWidth  
			var mH = myCanvas.height = getW.clientHeight
			function drawLine(x,y,color,type){
//				ctx.clearRect(0,0,mW,mH);
				ctx.beginPath();
				ctx.lineCap = 'round'
				ctx.lineJoin = 'round'
				if(type) ctx.moveTo(0,mH/2);
				if(!type) ctx.moveTo(mW,mH/2);
				ctx.lineWidth = 1;
				ctx.lineTo(x,y);				
				ctx.strokeStyle=color
				ctx.stroke();
				ctx.beginPath();
				ctx.lineWidth = 5;
				if(type) ctx.lineTo(x+2,y);
				if(!type) ctx.lineTo(x-2,y);
				ctx.stroke()					
			}		
			drawLine(mW/10,mH/2,'#d19213',true);
			drawLine(mW/10*9,mH/2,'#d19213')
			document.getElementById('banner').style.backgroundImage='url("' + myCanvas.toDataURL() + '")';
			
		},
		tabDown(index, self) {
			//下拉刷新数据这里是模拟ajax请求，请求完后赋值contentData就可以了
			console.log('刷新获取子项：' + index + '获取对象：' + self);
			var data = [{
					name: '刷新内容1'
				},
				{
					name: '刷新内容2'
				}
			];
			this.tabsOne = this.tabsOne.concat(data);
			mui.toast(this.menus[index].name+'已刷新')
			setTimeout(function() {
				self.endPullDownToRefresh();
			}, 500)
		},
		tabUp(index, self) {
			//上拉加载更多数据这里是模拟ajax请求，请求完后赋值contentData就可以了
			console.log('下拉获取子项：' + index + '获取对象：' + self)
			var data = [{
					name: '加载内容1'
				},
				{
					name: '加载内容2'
				}
			];
			this.tabsOne = this.tabsOne.concat(data)
			mui.toast(this.menus[index].name+'已加载')
			setTimeout(function() {
				self.endPullUpToRefresh();
			}, 500)
		},
		changeTab(e) {			
			var that = this;
			var index = e.detail.slideNumber;
			this.setIndex = index
			//加载初次数据这里是模拟ajax请求，请求完后赋值contentData就可以了
			if(index>=0){
				app.Vwaiting('加载中...')			 
				setTimeout(function(){
				app.Cwaiting()
				that.menus[index].contentData=[{
					name:'1'
				},
				{
					name:'1'
				},{
					name:'1'
				},{
					name:'1'
				}];
				document.querySelectorAll('.mui-pull-bottom-wrapper')[index].style.display='block'; 
				},1000)
			}
		},
		showPopover(){			
			if(this.classChange=='icon-30-copy'){
				this.classChange = 'icon-6';
				this.IsShow = true
			}else{
				this.classChange='icon-30-copy';
				this.IsShow = false
			}
		},
		setIdex(index){		 
		  var vm = this;
	      this.setIndex = index;
		  mui('#slider').slider().gotoItem(index);
		  //关闭菜单
		  setTimeout(function(){
		  vm.showPopover()	
		  },500)		   		
		},
		alert(index,e){
			this.setIndex = index			
			console.log('zheshi:'+index);
			console.log(e.target)
		}
	}
});