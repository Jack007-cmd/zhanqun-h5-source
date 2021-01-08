<template>
	<view>
		<view class="uni-flex uni-column">
			<view class="flex-item flex-item-V">
				<text class="font_icon iconbanbengengxin ico" style="font-size: 44rpx;"></text>
				版本号
				<text class="uni-icon" style="font-size: 16px;color: #000;">0.0.1</text>
			</view>
			<view class="flex-item flex-item-V" style="padding-right: 0;">
				<text class="font_icon iconhuaban ico"></text>
				消息推送
				<switch checked color="#e12121" style="transform:scale(0.7);float: right;" @change="switchChange"/>
			</view>
			<view class="flex-item flex-item-V">
				<text class="font_icon iconxiazai ico"></text>
				APP下载
				<text class="uni-icon" @click="download">&#xe583;</text>
			</view>
			<view class="flex-item flex-item-V">
				<text class="font_icon iconfankui ico"></text>
				用户反馈
				<text class="uni-icon"  @click="toFeedback">&#xe583;</text>
			</view>
			<view class="flex-item flex-item-V">
				<text class="font_icon iconzhuyi ico"></text>
				免责声明
				<text class="uni-icon" @click="toDisclaimer">&#xe583;</text>
			</view>
		</view>
	<uni-section class="contact-us" title="联系我们"></uni-section>
	<view class="contact-qq">
		<text>客服QQ</text>
		<text style="float: right;color: #e12121;">2541817777</text>
	</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			checked:true
		};
	},
	onLoad(){
		if(uni.getStorageSync("push-msg")!=1){
			this.checked = true;
		}else{
			this.checked = false;			
		}
	},
	methods: {
		download(){
			uni.navigateTo({
				url:"/pages/setting/download/download"
			})
		},
		switchChange: function (e) {
			console.log('switch1 发生 change 事件，携带值为', e.target.value)
			uni.setStorageSync("push-msg",e.target.value?2:1);
			if(e.target.value==1){
				 uni.$emit('connect', {data:1});
			}else{
				uni.$emit('close', {data:2});
			}
		},
		back() {
			uni.navigateBack({
				delta: 1
			});
		},
		toFeedback(){
			uni.navigateTo({
			    url: '/pages/setting/feedback/feedback'
			});
		},
		toDisclaimer(){
			uni.navigateTo({
			    url: '/pages/setting/disclaimer/disclaimer'
			});
		}
	}
};
</script>

<style>
@import '../../../common/uni-nvue.css';
.uni-column {
	margin-top: 15px;
}
.flex-item {
	background: #fff;
	border-bottom: 1px solid #eaeaea;
	height: 45px;
	position: relative;
	padding: 0 10px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	line-height: 45px;
	font-size: 16px;
}
.uni-icon {
	float: right;
	line-height: 45px;
	color: #999;
}
.item-img {
	vertical-align: middle;
	height: 24px;
	width: 24px;
	margin-right: 5px;
}
.contact-us,.contact-qq {
    background-color: #ffffff;
}
.contact-qq {
   height: 100px;
   padding: 15px 15px 0;
}
.ico{
	 font-size: 40rpx;
	 color: #e12121;
	 vertical-align: middle;
	 margin-right: 5px;
}
</style>
