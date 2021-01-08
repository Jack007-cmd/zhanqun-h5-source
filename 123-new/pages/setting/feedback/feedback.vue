<template>
	<view>
		<view class="form-view">
			<form @submit="formSubmit">
				<view class="uni-form-item uni-column">
					<view class="title">联系方式</view>
					<input class="uni-input" name="name" v-model="name" placeholder="昵称" />
				</view>
				<view class="uni-form-item uni-column" style="display: inline-block;">
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-left" style="padding-left: 0;">
								<input class="uni-input" name="number" v-model="number" placeholder="联系方式" />
								<!-- 当前选择 -->
							</view>
							<view class="uni-list-cell-db">
								<picker @change="bindPickerChange" :value="index" v-model="index" name="type" :range="array" range-key="name">
									<view style="text-align: center;">{{ array[index].name }}</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">内容</view>
					<view class="uni-textarea"><textarea name="content" v-model="content" placeholder="  请留下您宝贵的意见，谢谢！" /></view>
				</view>
				<view class="uni-btn-v"><button form-type="submit" size="mini" type="warn">提交</button></view>
			</form>
		</view>
		<uni-popup ref="showpopup" type="center"><text class="popup-content">{{ msg }}</text></uni-popup>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
	components: {
		uniPopup
	},
	data() {
		return {
			array: [{ name: '电话' }, { name: '邮箱' }, { name: 'QQ' }, { name: '微信' }],
			index: 0,
			number: '',
			name: '',
			content: '',
			msgContent: '',
			msg:''
		};
	},
	methods: {
		alert(msg) {
			let that = this;
			that.msg = msg;
			that.$nextTick(() => {
				that.$refs['showpopup'].open();
				setTimeout(()=>{
					that.$refs['showpopup'].close();
				},2000);
			})
		},		
		formSubmit: function(e) {
			let temp = e.detail.value;
			temp['type'] += 1;
			var formdata = JSON.stringify(temp);
			let rel = new RegExp('^[a-zA-Z0-9\u4e00-\u9fa5]+$');
			let mobile_reg = /^(1(([3][0-9])|([5][012356789])|([4][57])|([7][0-9])|[8][012356789]))\d{8}$/;
			let tel_reg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,7}))?$/;
			let wxreg = new RegExp('^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$');
			let qq = new RegExp('^[1-9]\d{4,9}$');
			let email = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$');
			if (!this.name) {				
				this.alert('昵称不可为空');
				return;
			} else {
				if (!rel.test(this.name)) {
					this.alert( '昵称格式不正确！');
					return;
				}
			}
			if (!this.number) {
				this.alert( '联系方式不可为空！');
				return;
			} else {
				if (this.index == 0 && !mobile_reg.test(this.number) && !tel_reg.test(this.number)) {
					this.alert('请输入正确的电话号码！');
					return;
				}
				if (this.index == 1 && !email.test(this.number)) {
					this.msgContent = '请输入正确的email！';
					return;
				}
				if (this.index == 2 && !qq.test(this.number)) {
					this.alert('请输入正确的qq号码！');
					return;
				}
				if (this.index == 3 && !wxreg.test(this.number)) {
					this.alert('请输入正确的微信号！');
					return;
				}
			}
			if (!this.content) {
				this.alert('内容不可为空');
				return;
			}
			this.$api.submitComment(formdata).then(res => {
				if (res.code == 0) {
					// this.alertService.msg('意见反馈成功');
					uni.navigateBack({
						delta: 1
					});
				} else {
					uni.showToast({
					    title: res.msg,
					    duration: 2000
					});
				}
			});
		},
		bindPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为：' + e.target.value);
			this.index = e.target.value;
		}
	}
};
</script>

<style>
.form-view {
	padding: 0 20rpx;
}
.uni-form-item .title {
	padding: 20rpx 0;
}
.uni-list-cell-left {
	width: 70%;
	border-right: 1px solid #eaeaea;
}
.uni-textarea uni-textarea {
	height: 180px;
}
.uni-btn-v {
	text-align: center;
}

/* 提示窗口 */
.uni-tip {
	/* #ifndef APP-NVUE */
	display: flex;
	flex-direction: column;
	/* #endif */
	padding: 15px;
	width: 300px;
	background-color: #fff;
	border-radius: 10px;
}

.uni-tip-title {
	margin-bottom: 10px;
	text-align: center;
	font-weight: bold;
	font-size: 16px;
	color: #333;
}

.uni-tip-content {
	/* padding: 15px;
 */
	font-size: 14px;
	color: #666;
}

.uni-tip-group-button {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	margin-top: 20px;
}

.uni-tip-button {
	flex: 1;
	text-align: center;
	font-size: 14px;
	color: #3b4144;
}

/* 插屏广告 */
.uni-image {
	position: relative;
}

.image {
	width: 200px;
	height: 200px;
}

.uni-image-close {
	margin-top: 20px;
	text-align: center;
}

/* 底部分享 */
.uni-share {
	/* #ifndef APP-NVUE */
	display: flex;
	flex-direction: column;
	/* #endif */
	background-color: #fff;
}

.uni-share-title {
	line-height: 60rpx;
	font-size: 24rpx;
	padding: 15rpx 0;
	text-align: center;
}

.uni-share-content {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	padding: 15px;
}

.uni-share-content-box {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	align-items: center;
	width: 200rpx;
}

.uni-share-content-image {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 60rpx;
	height: 60rpx;
	overflow: hidden;
	border-radius: 10rpx;
}

.content-image {
	width: 60rpx;
	height: 60rpx;
}

.uni-share-content-text {
	font-size: 26rpx;
	color: #333;
	padding-top: 5px;
	padding-bottom: 10px;
}

.uni-share-btn {
	height: 90rpx;
	line-height: 90rpx;
	font-size: 14px;
	border-top-color: #f5f5f5;
	border-top-width: 1px;
	border-top-style: solid;
	text-align: center;
	color: #666;
}
</style>
