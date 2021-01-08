<template>
	<view>
		<page-head title="websocket通讯示例"></page-head>
		<view class="uni-padding-wrap">
			<view class="uni-btn-v">
				<view class="websocket-msg">{{ showMsg }}</view>
				<button type="primary" @click="connect">连接websocket服务</button>
				<button v-show="connected" type="primary" @click="send">发送一条消息</button>
				<button type="primary" @click="close">断开websocket服务</button>
				<view class="websocket-tips">发送消息后会收到一条服务器返回的消息（与发送的消息内容一致）</view>
			</view>
		</view>
	</view>
</template>

<script>
let platform = uni.getSystemInfoSync().platform;
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
	computed: {
		showMsg() {
			if (this.connected) {
				if (this.msg) {
					return '收到消息：' + this.msg;
				} else {
					return '等待接收消息';
				}
			} else {
				return '尚未连接';
			}
		}
	},
	onUnload() {
		uni.hideLoading();
		if (this.socketTask && this.socketTask.close) {
			this.socketTask.close();
		}
	},
	methods: {
		connect() {
			if (this.connected || this.connecting) {
				uni.showModal({
					content: '正在连接或者已经连接，请勿重复连接',
					showCancel: false
				});
				return false;
			}
			this.connecting = true;
			uni.showLoading({
				title: '连接中...'
			});
			this.socketTask = uni.connectSocket({
				url: 'ws://422.zhanqun.com:9502/',
				// url: 'wss://echo.websocket.org',
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
			console.log(this.socketTask);
			this.socketTask.onOpen(res => {
				this.connecting = false;
				this.connected = true;
				uni.hideLoading();
				uni.showToast({
					icon: 'none',
					title: '连接成功'
				});
				console.log('onOpen', res);
				let cmds = {
					data:
						'{"cmds":[{"cmd":"longQueueNotice","data":[]},{"cmd":"lotteryWinNotice","data":[]},{"cmd":"omitRemind","data":[]}],"time":"' + this.getCurrentDate() + '"}',
					success(res) {
						console.log(res);
					},
					fail(err) {
						console.log(err);
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
				uni.showModal({
					content: '连接失败，可能是websocket服务不可用，请稍后再试',
					showCancel: false
				});
				console.log('onError', err);
				this.connect();
			});
			this.socketTask.onMessage(res => {
				this.msg = res.data;
				let that = this;
				console.log('onMessage', res);
				let data = JSON.parse(res.data);
				//如果获取到消息，心跳检测重置
				//拿到任何消息都说明当前连接是正常的
				//检查是否订阅状态
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
					that.timeout = setTimeout(() => {
						that.messageType = -1;
						that.messageContent = '';
					}, 5000);
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
				console.log('onClose', res);
			});
			console.log('task', this.socketTask);
		},
		send() {
			this.socketTask.send({
				data: 'from ' + platform + ' : ' + parseInt(Math.random() * 10000).toString(),
				success(res) {
					console.log(res);
				},
				fail(err) {
					console.log(err);
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
						console.log(res);
					},
					fail(err) {
						console.log(err);
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
				' ' +
				myDate.getHours() +
				':' +
				myDate.getMinutes() +
				':' +
				myDate.getSeconds();
			return now;
		}
	}
};
</script>

<style>
.uni-padding-wrap {
	width: 690rpx;
	padding: 0 30rpx;
}

.uni-btn-v {
	padding: 10rpx 0;
}

.uni-btn-v button {
	margin: 20rpx 0;
}

.websocket-msg {
	padding: 40px 0px;
	text-align: center;
	font-size: 14px;
	line-height: 40px;
	color: #666666;
}

.websocket-tips {
	padding: 40px 0px;
	text-align: center;
	font-size: 14px;
	line-height: 24px;
	color: #666666;
}
</style>
