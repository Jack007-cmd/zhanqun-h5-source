<script>
export default {
	data() {
		return {
			connected: false,
			connecting: false,
			socketTask: false,
			msg: false,
			timeoutObj: null,
			messageType: -1,
			messageContent: ''
		};
	},
	onLaunch: function() {
		let that = this;
		$("uni-app").append("<view id='msg-push'  style='left: 0;top: 0;position: fixed;z-index: 19999;display: block;width: 100%;height: 100%;pointer-events: none;contain: strict;'><view style='left: 1%;position: absolute;z-index: 10;display: block;width: 98%;max-width: 700px;background: #666666;border-radius: 0.65rem;bottom: 50px;opacity: .6;'> <view  style='display: flex;-webkit-box-align: center;-webkit-align-items: center;-ms-flex-align: center;align-items: center;pointer-events: auto;contain: content;'>  <view id='msg-content' style='font-size: 14px;color: #fff;padding: 10px;width: 100%;line-height: 30px;display:none;' id='msg-content'></view></view></view></view>");
		$("uni-app").append("<view id='data-source'><view class='dt-con' id='ten-win'><text class='font_icon iconWl_logo ico dt-icon'></text><text class='dt-sname'>万漉</text><text class='dt-txt'>点击切换</text></view><view class='dt-con on' id='ten-thousand'><text class='font_icon iconlo_sy1 ico dt-icon'></text><text class='dt-sname'>双赢</text><text class='dt-txt'>点击切换</text></view></view>");	
		
		// 数据源切换(双赢、万漉)
		var btnWin = document.getElementById("ten-win");
		var btnThousand = document.getElementById("ten-thousand");
		btnWin.onclick=function(){
			btnWin.className= "dt-con";
			btnThousand.className = "dt-con on";
			that.switchDataSource(0);//切换双赢数据源
		}
		btnThousand.onclick=function(){
			btnWin.className = "dt-con on";
			btnThousand.className= "dt-con";
			that.switchDataSource(1);//切换万漉数据源
		}
		this.resetStyles(); //加载切换数据源样式
		
		this.getServerTime();//获取服务器时间差
		this.getBaseAboutProvide();//获取 APP启动彩种配置
		// console.log('App Launch');
		this.connect();
		// 监听全局的自定义事件 消息推送按钮开
		 uni.$on('connect', this.connect);
		// 监听全局的自定义事件 消息推送按钮关
		 uni.$on('close', this.close);	
		
		// #ifdef APP-PLUS
		// 检测升级
		// uni.request({
		// 	url: 'https://uniapp.dcloud.io/update', //检查更新的服务器地址
		// 	data: {
		// 		appid: plus.runtime.appid,
		// 		version: plus.runtime.version,
		// 		imei: plus.device.imei
		// 	},
		// 	success: res => {
		// 		if (res.statusCode == 200 && res.data.isUpdate) {
		// 			let openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
		// 			// 提醒用户更新
		// 			uni.showModal({
		// 				title: '更新提示',
		// 				content: res.data.note ? res.data.note : '是否选择更新',
		// 				success: showResult => {
		// 					if (showResult.confirm) {
		// 						plus.runtime.openURL(openUrl);
		// 					}
		// 				}
		// 			});
		// 		}
		// 	}
		// });
		// #endif
	},
	onShow: function() {
		// console.log('App Show');
	},
	onHide: function() {
		// console.log('App Hide');
	},
	methods: {
		//切换数据源
		switchDataSource(key){
			uni.setStorageSync("lotterySourceFrom",key);
			window.location.reload();
		},
		//加载数据源对应的样式
		resetStyles(){
			var lotterySourceFrom = uni.getStorageSync("lotterySourceFrom");
			var btnWin = document.getElementById("ten-win");
			var btnThousand = document.getElementById("ten-thousand");
			if(lotterySourceFrom){
				if(lotterySourceFrom ==0){
					btnWin.className= "dt-con";
					btnThousand.className = "dt-con on";
				}else if(lotterySourceFrom==1){
					btnWin.className = "dt-con on";
					btnThousand.className= "dt-con";
				}
			}
		},
		connect() {
			if(uni.getStorageSync("push-msg")==1){
				return;
			}
			if (this.connected || this.connecting) {
				// uni.showModal({
				// 	content: '正在连接或者已经连接，请勿重复连接',
				// 	showCancel: false
				// });
				return false;
			}
			this.connecting = true;
			// uni.showLoading({
			// 	title: '连接中...'
			// });
			this.socketTask = uni.connectSocket({
				url: (document.location.protocol.length==5?"ws://":"wss://") + location.host + "/websocket",
				// url: 'ws://422.zhanqun.com:9502',
				// url: 'wss://www.123kkc.com/websocket',
				data() {
					return {
						msg: 'Hello'
					};
				},
				// #ifdef MP
				header: {
					'content-type': 'application/json'
				},
				// #endif
				// #ifdef MP-WEIXIN
				method: 'GET',
				// #endif
				success(res) {
					// 这里是接口调用成功的回调，不是连接成功的回调，请注意
				},
				fail(err) {
					// 这里是接口调用失败的回调，不是连接失败的回调，请注意
				}
			});
			// console.log(this.socketTask);
			this.socketTask.onOpen(res => {
				this.connecting = false;
				this.connected = true;
				uni.hideLoading();
				// uni.showToast({
				// 	icon: 'none',
				// 	title: '连接成功'
				// });
				// console.log('onOpen', res);
				let cmds = {
					data:
						'{"cmds":[{"cmd":"longQueueNotice","data":[]},{"cmd":"lotteryWinNotice","data":[]},{"cmd":"omitRemind","data":[]}],"time":"' + this.getCurrentDate() + '"}',
					success(res) {
						// console.log(res);
					},
					fail(err) {
						// console.log(err);
					}
				};
				this.socketTask.send(cmds);
				this.reset();
				this.start();
			});
			this.socketTask.onError(err => {
				this.connecting = false;
				this.connected = false;
				uni.hideLoading();
				// uni.showModal({
				// 	content: '连接失败，可能是websocket服务不可用，请稍后再试',
				// 	showCancel: false
				// });
				// console.log('onError', err);
				this.connect();
			});
			this.socketTask.onMessage(res => {
				this.msg = res.data;
				let that = this;
				// console.log('onMessage', res);
				let data = JSON.parse(res.data);
				//如果获取到消息，心跳检测重置
				//拿到任何消息都说明当前连接是正常的
				//检查是否订阅状态
				if(uni.getStorageSync("push-msg")==1){
					that.close();
				}
				if (data.pong) {
					that.reset();
					that.start();
				} else if (data.message) {
					// let time = data.time;
					data = data.message;
					// document.body.innerHTML += time + " - " + data.cmd + " - " + data.payload + "<br>";
					data.payload = JSON.parse(data.payload);
					if (data.cmd == 'longQueueNotice') {
						that.messageType = 1;
						// that.messageCode = data.payload['lottery_code'];
						that.messageContent =
							'长龙通知：' +
							data.payload['lottery_name'] +
							'/' +
							data.payload['desc'] +
							'/连' +
							(data.payload['state'] == 'notOpen' ? '续' + data.payload['num'] + '期未开' : '开' + data.payload['num'] + '期');
					} else if (data.cmd == 'lotteryWinNotice') {
						that.messageType = 2;
						// that.messageCode = data.payload['lottery_code'];
						that.messageContent = '通知：' + data.payload['lottery_name'] + '出现【' + data.payload['desc'] + '】';
					} else if (data.cmd == 'omitRemind') {
						that.messageType = 3;
						// that.messageCode = data.payload['lottery_code'];北京pk10当前遗漏已超过最大遗漏的80%
						// XX彩种XX位置开奖号码XX当前遗漏已超过...
						let tem = data.payload['code_name'] + data.payload['position_name'] + '【' + data.payload['num'] + '】当前遗漏已超过最大遗漏的80%';
						if (tem.length > 22) {
							that.messageContent = tem.substr(0, 20) + '...';
						} else {
							that.messageContent = tem;
						}
					}
					switch(that.messageType){
						case 1:
							$("#msg-content").html(that.messageContent+"<text class='view-btn btn-1'>查看</text>");
							break;
						case 2:
							$("#msg-content").html(that.messageContent+"<text class='view-btn btn-2'>查看</text>");
							break;
						case 3:
							$("#msg-content").html(that.messageContent+"<text class='view-btn btn-3'>查看</text>");
							break;
						default:
							// $("#msg-content").html(that.messageContent+"<text class='view-btn btn-1'>查看</text>");
					}
					$("#msg-content").show();
					$(".btn-1").click(function(){
						uni.switchTab({
							url:"/pages/tabs/long-dragon-reminder/long-dragon-reminder"
						})
					});	
					$(".btn-2").click(function(){
						uni.switchTab({
							url:"/pages/tabs/precision-plan/precision-plan"
						})
					});	
					$(".btn-3").click(function(){
						uni.switchTab({
							url:"/pages/tabs/data-analysis/data-analysis"
						})
					});	
					that.timeout = setTimeout(() => {
						that.messageType = -1;
						that.messageContent = '';
						$("#msg-content").html('').hide();
					}, 3000);
				}
				//检查是否订阅状态
				if (data.subscribeState) {
					if (data.subscribeState === 1) {
						console.log('订阅成功');
					} else {
						//失败
						//尝试重新订阅 TODO
						console.error('订阅失败');
					}
				}
			});
			this.socketTask.onClose(res => {
				this.connected = false;
				this.startRecive = false;
				this.socketTask = false;
				this.msg = false;
				// console.log('onClose', res);
			});
			// console.log('task', this.socketTask);
		},
		send() {
			this.socketTask.send({
				data: 'from ' + platform + ' : ' + parseInt(Math.random() * 10000).toString(),
				success(res) {
					// console.log(res);
				},
				fail(err) {
					// console.log(err);
				}
			});
		},
		close() {
			if (this.socketTask && this.socketTask.close) {
				this.socketTask.close();
			}
		},
		reset() {
			clearTimeout(this.timeoutObj);
		},
		start() {
			let that = this;
			that.timeoutObj = setTimeout(function() {
				//这里发送一个心跳，后端收到后，返回一个心跳消息，
				//onmessage拿到返回的心跳就说明连接正常
				that.socketTask.send({
					data: '{"cmds":[{"cmd":"ping","data":[]}],"time":"' + that.getCurrentDate() + '"}',
					success(res) {
						// console.log(res);
					},
					fail(err) {
						// console.log(err);
					}
				});
			}, 60000);
		},
		getCurrentDate() {
			let myDate = new Date();
			let month = myDate.getMonth() + 1;
			let now =
				myDate.getFullYear() +
				'-' +
				(month < 10 ? '0' + month : month) +
				'-' +
				myDate.getDate() +
				' ' +
				myDate.getHours() +
				':' +
				myDate.getMinutes() +
				':' +
				myDate.getSeconds();
			return now;
		},
		//获取服务器时间差
		async getServerTime() {
			await this.$api.getServerTime().then(res => {
					try {
					    uni.setStorageSync('timeDiff', res.code == '0' ? (new Date(res.data.replace(/-/g, '/')).getTime() - new Date().getTime()).toString() : '0');
					} catch (e) {
					    // error
					}
				})
				.catch(res => {
					// 失败进行的操作
				});
		},
		//获取 APP启动彩种配置
		async getBaseAboutProvide(){
			await this.$api.getBaseAboutProvide().then(rs=>{
				  if (rs.code == 0) {
					    let data={};
						  if(typeof rs.data  === 'object'){
							data = rs.data;
						  }else{
							data = JSON.parse(rs.data);
						  }
						uni.setStorageSync('aboutKinds',data["aboutKinds"]);
						uni.setStorageSync('analysisKinds',data["analysisKinds"]);
						uni.setStorageSync('aboutPlan',data["aboutPlan"]);
						uni.setStorageSync('killPlan',data["killPlan"]);
				    }
			});
			//获取彩种分类
			  await this.$api.getAboutSort().then((res) => {
			    if (res.code == 0) {
			      res.data.forEach((d) => {
					if(d.list){
						d.list.forEach((it, index) => {
						  it.logo = this.$url + "/storage/" + it.logo;
						  let tem = it.code
						  it.code = tem.indexOf("new")>-1?it.code.slice(3):tem;
						  if (this.$api.getBaseConfig(it.code)) {
							it.des = this.$api.getBaseConfig(it.code).des;
							it.url = this.$api.getBaseConfig(it.code).url;
							it.sortKey= d.key;
						  }
						  if (it.code.indexOf('xglhc')!=-1 || it.code.indexOf('amlhc')!=-1) {
							it.des = it.site?it.site:this.$url+"/d";
							it.url = '';
						  }
						});
					}
			      });
			      if (res.data.length > 0) {
			        let sortArr = res.data;
					uni.setStorageSync('sort',sortArr);
			        let listArr = [];
			        res.data.forEach((v) => {
			          listArr.push.apply(listArr, v.list);
			        });
					uni.setStorageSync('basicArr',this.unique(listArr));
			      }
			    } else {
			      // alert(res.msg);
			    }
			  });
			  //获取热门彩种数据
			 await this.$api.getHotAbout().then((ret) => {
			    if (ret.code == '0') {
			      let hotArr = [];
			      ret.data.forEach((v) => {
			        if (v.code.indexOf('xglhc')!=-1 || v.code.indexOf('amlhc')!=-1) {
			          hotArr.push({code: v.code, name: v.name, des:v.site?v.site: this.$url+"/d", url: ''});
			        } else {
			          hotArr.push({
			            name: v.name,
			            code: v.code,
			            logo: this.$url + "/storage/" + v.logo,
			            des: this.$api.getBaseConfig(v.code).des,
			            url: this.$api.getBaseConfig(v.code).url,
						sortKey:-1
			          });
			        }
			      });
				  uni.setStorageSync('hotArr',hotArr);
			    }
			  });
			
		},
		  unique(arr) {
		    let obj = {};
		    let tmp = arr.reduce(function (item, next) {
		      obj[next.code] ? '' : obj[next.code] = true && item.push(next);
		      return item;
		    }, []);
		    return tmp;
		  }
	},
	globalData: {
		test: ''
	}
};
</script>

<style>
/* #ifndef APP-PLUS-NVUE */
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
@import './common/uni.css';
@import './common/common.css';
@import './common/iconfont.css';

/* 以下样式用于 hello uni-app 演示所需 */
page {
	background-color: #f4f5f6;
	height: 100%;
	font-size: 28rpx;
	line-height: 1.8;
}

.uni-header-logo {
	padding: 30rpx;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 10rpx;
}

.uni-header-image {
	width: 100px;
	height: 100px;
}

.uni-hello-text {
	color: #7a7e83;
}

.uni-hello-addfile {
	text-align: center;
	line-height: 300rpx;
	background: #fff;
	padding: 50rpx;
	margin-top: 10px;
	font-size: 38rpx;
	color: #808080;
}

/* #endif*/
.view-btn{
	cusor:pointer;padding: 5px 10px;float: right;background: red;border-radius: 5px;line-height: 20px;
}
/* 数据源切换样式 */
#data-source{
	position: fixed;
	right: 20rpx;
	bottom:120rpx;
	z-index: 999;
	width: 120rpx;
	height:120rpx;
	overflow: hidden;
}
.dt-con{
	display: none;
	position: relative; 
	width: 120rpx;
	height: 120rpx;
	background: linear-gradient(90deg,rgba(232,63,70,1),rgba(244,108,124,1));
	border-radius: 50%;
}
.dt-con.on{
	display: block;
}
#ten-thousand{
	background: linear-gradient(59deg,rgba(173,139,101,1),rgba(203,170,135,1));
}

.dt-icon{
    color: #FFFFFF;
    font-size: 46rpx;
	text-align: center;
	display: block;
	margin: 0 auto;
}
.dt-sname{
	height:23rpx;
	font-size:24rpx;
	font-weight:bold;
	color: #FFFFFF;
	text-align: center;
	display: block;
	margin: 0 auto;
}
.dt-txt{
	height:20rpx;
	font-size:18rpx;
	color: #FFFFFF;
	text-align: center;
	transform:scale(0.9);
	display: block;
	padding-top: 10rpx;
	margin: 0 auto;
}
/* 监听数据源切换小屏幕样式 */
@media screen and (max-width: 320px) {
    .dt-sname {
		transform:scale(0.8);
		width: 60rpx !important;
    }
	.dt-txt{
		transform:scale(0.6) !important;
		width: 120rpx !important;
		left: 1rpx!important;
	}
}
</style>
