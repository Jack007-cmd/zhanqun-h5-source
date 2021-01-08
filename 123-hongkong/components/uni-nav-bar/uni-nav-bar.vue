<template>
	<view class="uni-navbar">
		<view :class="{ 'uni-navbar--fixed': fixed, 'uni-navbar--shadow': shadow, 'uni-navbar--border': border }" :style="{ 'background-color': backgroundColor }" class="uni-navbar__content">
			<uni-status-bar v-if="statusBar" />
			<view :style="{ color: color,backgroundColor: backgroundColor }" class="uni-navbar__header uni-navbar__content_view">
				<view :class="title.length ? 'uni-navbar__header-btns-left' : ''" @tap="onClickLeft" class="uni-navbar__header-btns uni-navbar__content_view uni-navbar_lf">
					<view class="uni-navbar__content_view" v-if="rightIcon.length">
						<uni-icons :color="color" :type="rightIcon" size="24" />
					</view>
					<view class="uni-navbar-btn-text uni-navbar__content_view" v-if="rightText.length && !rightIcon.length">
						<text class="uni-nav-bar-right-text">{{ rightText }}</text>
					</view>
					<view class="uni-navbar_img" v-if="logoShow">
						<image src="../../static/img/HK_logo.png" style="width: 210rpx;height: 60rpx;"></image>
					</view>
					<slot name="left" />
				</view>
				<view class="uni-navbar__header-container uni-navbar__content_view">
					<view class="uni-navbar__header-container-inner uni-navbar__content_view" v-if="title.length">
						<text class="uni-nav-bar-text" :style="{color: color }">{{ title }}</text>
					</view>
					<!-- 标题插槽 -->
					<slot />
				</view>
				<view @tap="onClickRight" class="uni-navbar__header-btns uni-navbar__header-btns-right uni-navbar__content_view">
					<view class="uni-navbar__content_view" v-if="leftIcon.length">
						<uni-icons :color="color" :type="leftIcon" size="24" />
					</view>
					<view :class="{ 'uni-navbar-btn-icon-left': !leftIcon.length }" class="uni-navbar-btn-text uni-navbar__content_view" v-if="leftText.length">
						<text :style="{ color: color, fontSize: '14px' }">{{ leftText }}</text>
					</view>
					<view style="height: 100%;" v-if="iconlist" @tap="changeRoute">
						<view v-if="navShow==false" class="font_family iconlist" style="font-size: 48rpx;color: #FFFFFF;height: 100%;"></view>
						<view v-if="navShow==true" class="font_family iconclose" style="font-size: 48rpx;color: #FFFFFF;height: 100%;"></view>
					</view>
					<slot name="right" />
				</view>
				<!-- 彩种导航 -->
				<view class="navbar-collapse" v-if="navShow">
					<view class="nav-con">
						<view class="navbar-nav" @tap="jumpRoute(item.url,item.name)" :class="currentRoute==item.url?'active':''"  v-for="(item,index) in sortList" :key="index">{{item.name}}</view>
						<!-- <view class="navbar-nav" @tap="jumpRoute('amlhc','','amlhc')" :class="currentRoute=='amlhc'?'active':''">澳門六合彩</view>
						<view class="navbar-nav" @tap="jumpRoute('draw-history','','draw-history')" :class="currentRoute=='draw-history'?'active':''">開獎歷史</view>
						<view class="navbar-nav" @tap="jumpRoute('winning-artifact','','winning-artifact')" :class="currentRoute=='winning-artifact'?'active':''">中獎神器</view>
						<view class="navbar-nav" @tap="jumpRoute('recommend-favorite','','recommend-favorite')" :class="currentRoute=='recommend-favorite'?'active':''">推薦心水</view>
						<view class="navbar-nav" @tap="jumpRoute('rules-of-play','','rules-of-play')" :class="currentRoute=='rules-of-play'?'active':''">玩法規則</view>
						<view class="navbar-nav" @tap="jumpRoute('lottery','','lottery')" :class="currentRoute=='lottery'?'active':''">開獎網</view> -->
					</view>
				</view>
			</view>
		</view>
		<view class="uni-navbar__placeholder" v-if="fixed">
			<uni-status-bar v-if="statusBar" />
			<view class="uni-navbar__placeholder-view" />
		</view>
	</view>
</template>

<script>
	import uniStatusBar from "../uni-status-bar/uni-status-bar.vue";
	import uniIcons from "../uni-icons/uni-icons.vue";

	/**
	 * NavBar 自定义导航栏
	 * @description 导航栏组件，主要用于头部导航
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=52
	 * @property {String} title 标题文字
	 * @property {String} leftText 左侧按钮文本
	 * @property {String} rightText 右侧按钮文本
	 * @property {String} leftIcon 左侧按钮图标（图标类型参考 [Icon 图标](http://ext.dcloud.net.cn/plugin?id=28) type 属性）
	 * @property {String} rightIcon 右侧按钮图标（图标类型参考 [Icon 图标](http://ext.dcloud.net.cn/plugin?id=28) type 属性）
	 * @property {String} color 图标和文字颜色
	 * @property {String} backgroundColor 导航栏背景颜色
	 * @property {Boolean} fixed = [true|false] 是否固定顶部
	 * @property {Boolean} statusBar = [true|false] 是否包含状态栏
	 * @property {Boolean} shadow = [true|false] 导航栏下是否有阴影
	 * @event {Function} clickLeft 左侧按钮点击时触发
	 * @event {Function} clickRight 右侧按钮点击时触发
	 */
	export default {
		name: "UniNavBar",
		components: {
			uniStatusBar,
			uniIcons
		},
		props: {
			iconlist:{
				type: [Boolean, String],
				default: true
			},
			logoShow: {
				type: [Boolean, String],
				default: false
			},
			title: {
				type: String,
				default: ""
			},
			leftText: {
				type: String,
				default: ""
			},
			rightText: {
				type: String,
				default: ""
			},
			leftIcon: {
				type: String,
				default: ""
			},
			rightIcon: {
				type: String,
				default: ""
			},
			fixed: {
				type: [Boolean, String],
				default: false
			},
			color: {
				type: String,
				default: "#000000"
			},
			backgroundColor: {
				type: String,
				default: "#FFFFFF"
			},
			statusBar: {
				type: [Boolean, String],
				default: false
			},
			shadow: {
				type: [Boolean, String],
				default: false
			},
			border: {
				type: [Boolean, String],
				default: true
			},
			currentRoute: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				navShow:false,
				barShow:false,
				winSelect:'',
				num: 1,
				sortList: []
			}
		},
		onLoad: function() {
			this.navShow = false;
		},
		mounted() {
			if (uni.report && this.title !== '') {
				uni.report('title', this.title)
			}
			this.getLhcMenu();
		},
		methods: {
			onClickLeft() {
				this.$emit("clickLeft");
				this.navShow = false;
            },
			onClickRight() {
				// this.$emit("clickRight");
			},
			changeRoute(){
				this.navShow = !this.navShow;
				this.winSelect = '';
			},
			jumpRoute(url,name){
				this.navShow = false;
				if(name == '開獎網' || name == '澳門六合彩'){
					window.open(url);
				}else{
					uni.navigateTo({
						url: url
					});
				}
			},
			getLhcMenu(){
				let that = this;
				let params = {
					type: 2
				}
				that.$api.getLhcMenu( params ).then(rs => {
					if(rs){
						this.sortList = rs;
					}
				})
			}
		}
	};
</script>

<style scoped>
	.uni-navbar{
		font-family: PingFangSC-Regular,Helvetica Neue,tahoma,arial,sans-serif;
	}
	.uni-nav-bar-text {
		/* #ifdef APP-PLUS */
		font-size: 34rpx;
		/* #endif */
		/* #ifndef APP-PLUS */
		font-size: 32rpx;
		/* #endif */
	}

	.uni-nav-bar-right-text {
		font-size: 28rpx;
	}

	.uni-navbar__content {
		position: relative;
		background-color: #ffffff;
		/* overflow: hidden; */
		width: 100%;
		max-width: 750px;
	}

	.uni-navbar__content_view {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		align-items: center;
		flex-direction: row;
		/* background-color: #FFFFFF;
 */
	}

	.uni-navbar__header {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		height: 88rpx;
		line-height: 88rpx;
		font-size: 32rpx;
		/* background-color: #ffffff;
 */
	}

	.uni-navbar__header-btns {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-wrap: nowrap;
		width: 120rpx;
		padding:0 6px;
		height: 88rpx;
		box-sizing: border-box;
		/* overflow: hidden; */
		justify-content: center;
		align-items: center;
	}
	.uni-navbar_lf{
		box-sizing: border-box;
		/* overflow: hidden; */
		justify-content: flex-start!important;
		align-items: center;
		padding-left: 15rpx;
	}
	.uni-navbar_img{
		height: 60rpx;
		width: 210rpx;
	}
	.uni-navbar_img image{
		height: 100%;
		width: 100%;
		opacity: 1!important;
	}
	.uni-navbar__header-btns-left {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		width: 150rpx;
		justify-content: flex-start !important;
	}

	.uni-navbar__header-btns-right {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		width: 150rpx;
		padding-right: 30rpx;
	}

	.uni-navbar__header-container {
		flex: 1;
	}

	.uni-navbar__header-container-inner {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
	}


	.uni-navbar__placeholder-view {
		height: 88rpx;
	}

	.uni-navbar--fixed {
		position: fixed;
		z-index: 998;
		max-width: 750px;
	}

	.uni-navbar--shadow {
		/* #ifndef APP-NVUE */
		box-shadow: 0 1px 6px #ccc;
		/* #endif */
	}

	.uni-navbar--border {
/* 		border-bottom-width: 1rpx;
		border-bottom-style: solid;
		border-bottom-color: #e5e5e5; */
	}
	.navbar-collapse{
		position: absolute;
		/* position: fixed; */
		top: 84rpx;
		width: 100%;
        background: #AE1917;
		z-index: 9999;
	}
	.navbar-nav{
		border-top: 1px solid #d54240;
		width: 100%;
		height: 88rpx;
		background: #AE1917;
		font-size: 30rpx;
		font-family: PingFangSC-Regular,Helvetica Neue,tahoma,arial,sans-serif;
        color: #FFFFFF;
		display:flex;
		justify-content:center;
		align-items:center;
		box-sizing: border-box;
		overflow: hidden;
		position: relative;
	}
	.navbar-list{
		width: 100%;
		height: 710rpx;
		scrollbar-width: none; /* firefox */
		-ms-overflow-style: none; /* IE 10+ */
		overflow-x: hidden;
		overflow-y: auto;
		padding-bottom: 10rpx;
	}
	.navbar-list::-webkit-scrollbar {
	  display: none; /* Chrome Safari */
	}
	.active{
        background: #791110;
	}
	.nav-img{
		position: absolute;
		top: 9rpx;
		left: calc(50% + 150rpx);
		width: 32rpx;
		height: 30rpx;
	}
	.uni-icon .uni-icon-gear{
		display: none;
	}
</style>