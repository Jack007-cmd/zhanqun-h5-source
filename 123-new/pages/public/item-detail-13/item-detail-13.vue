<template>
    <view @touchstart="start" @touchend="end">
		<view class="view-nav">
			<uni-nav-bar :fixed="true" :status-bar="true" color="#ffffff" background-color="#e12121" left-icon="arrowleft" @clickLeft="back">
				<view class="city" @click="showList = !showList" style="margin: 0 auto;">
					<view>
						<text class="uni-nav-bar-text" v-if="!showList">{{ name }}</text>
						<text class="uni-nav-bar-text" v-else>所有彩种</text>
					</view>
					<uni-icons v-if="!showList" type="arrowdown" color="#fff" size="22" />
					<uni-icons v-else type="arrowup" color="#fff" size="22" />
				</view>
				<view slot="right">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input mydate">
							{{ date }}
							<text class="font_icon iconsytriangle date-triangle"></text>
						</view>
					</picker>
				</view>
			</uni-nav-bar>
		</view>
		<view v-if="!showList">
			<view class="detail-container"  v-if="aboutList">
				<view class="boxline">
					<view class="box">
						<template v-for="(ccode, index) in aboutList['current_code']">
							<view :key="index+'x'+6" v-if="index==6" class="font_icon iconjia"></view>
							<view  :key="'m'+index" class="lhc" :class="{jslhcRed:aboutList.color[index]==1,jslhcGreen:aboutList.color[index]==2,jslhcBlue:aboutList.color[index]==3}">{{ ccode }}</view>
						</template>
					</view>
				</view>
				<view class="boxline" >
					<view class="box lhcon" style="margin-top: 7rpx;">
						<template v-for="(temp, tempIndex) in aboutList['an']">
							<view :key="tempIndex+'y'+6" v-if="tempIndex==6" class="plus"></view>
							<view :key="'n'+ tempIndex" class="lhcOther" >{{ temp }}</view>
						</template>					
					</view>
				</view>
				<!-- <view class="boxline">
					<view class="box lhcon" style="margin-top: -14rpx;">
						<template v-for="(temp, tempIndex) in aboutList['five_elements']" >
							<view :key="6" style="visibility: hidden;margin-right: 22rpx;margin-top: 0;" v-if="tempIndex==6" class="plus"></view>
							<view :key="aboutList.code + tempIndex" class="lhcOther" >{{ temp }}</view>
						</template>		
					</view>
				</view> -->
				<view class="boxline">
					<view class="box-title" style="padding-top: 6rpx;">
						<view class="issue"><view>{{ current_number }}</view>期开奖</view>
						<view class="draw-count" v-if="aboutList">已开{{ aboutList['open_num'] }}期，剩余{{ aboutList['still_num'] }}期</view>
						<text class="r_arrow" v-if="allSeconds > 0">
							<text class="color-red ml2" v-if="hour > 0">{{ hour }}:</text>
							<text class="color-red" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
							<text class="color-red">{{ second }}</text>
						</text>
						<text class="r_arrow color-red" v-if="allSeconds <= 0">开奖中</text>
						<!-- <view class="open-video" @click="showVideo = true">
							<text class="font_icon iconshipin"></text>
							视频
						</view> -->
					</view>
				</view>
				<view class="boxline" style="margin: -14rpx 0 0 11rpx;height: 25rpx;"></view>
			</view>
			<view class="anasysis">
				<view class="anasysis-line">
					<view class="anasysis-list" @touchstart.stop  @touchend.stop>
						<view class="anasysis-item" @click="setCurrent(sort)" :class="{ current: currentSort == sort.id }" v-for="(sort,sindex) in sortList" :key="'e'+sindex">
							{{ sort.name=='数据结果'?'即时开奖':sort.name }}
						</view>
					</view>
				</view>
			</view>
		 	<view> 
			     <lhc-instant-draw v-if="currentSort == 1" :code="code" :date="date" :current_number="current_number"></lhc-instant-draw>
				 <lhc-luzhu v-if="currentSort == 2" :code="code" :date="date" :current_number="current_number" :list="list"></lhc-luzhu>
				 <lhc-positive-code v-if="currentSort == 5" :code="code" :date="date" :current_number="current_number" :list="list" :type="type"></lhc-positive-code>
				 <lhc-positive-code v-if="currentSort == 6" :code="code" :date="date" :current_number="current_number" :list="list" :type="type"></lhc-positive-code>
				 <lhc-positive-code v-if="currentSort == 7" :code="code" :date="date" :current_number="current_number" :list="list" :type="type"></lhc-positive-code>
			</view> 
		</view>
		<view v-else class="about-container">
			<view class="content-list" v-for="(item, index) in sortArr" :key="'a' + index">
				<view class="content-title">{{ item.name }}</view>
				<view class="content">
					<template v-for="(it, i) in item.list">
						<view class="content-item" v-if="it.code.indexOf('xglhc')==-1 && it.code.indexOf('amlhc')==-1" @click="toDestination(it)" :key="'b' + i" >{{ it.name }}</view>
					</template>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import LhcInstantDraw from '../../public/analysis/lhc-instant-draw.vue';
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
	import LhcLuzhu from '../../public/analysis/lhc-luzhu.vue';
	import LhcPositiveCode from '../../public/analysis/lhc-positive-code.vue';
	export default {
		components: {
			uniNavBar,
			LhcInstantDraw,
			LhcLuzhu,
			LhcPositiveCode
		},
		data() {
			const currentDate = this.getDate({
				format: true
			});
			return {
				startData: { clientX: '', clientY: '' },
				showAll: false,
				sortArr: [], //所有彩种列表
				name: '',
				showList: false,
				showVideo: false,
				date: currentDate,
				code: '',
				sortKey: -1,
				sortList: [],
				currentSort: -1,
				timeDiff: 0, //服务器与客户端时间差
				allSeconds: 0, //距离下期开奖时间（秒）(动态)
				interval: 0, //接口返回数据时距离下期开奖时间（秒）
				hour: 0, //时
				minute: '00', //分
				second: '00', //秒
				st: null,
				rl: null,
				aboutList: null,
				current_number: '',
				list:[],
				type:''
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onReady: function(res) {
			// #ifndef MP-ALIPAY
			// this.videoContext = uni.createVideoContext('myVideo');
			// #endif
		},
		onUnload: function() {
			this.showList = false;
			clearInterval(this.st);
			clearInterval(this.rl);
		},
		onLoad: function(option) {
			this.sortArr = uni.getStorageSync('sort');
			//option为object类型，会序列化上个页面传递的参数
			this.name = option.name;
			this.code = option.code;
			if(this.code.indexOf('new')!=-1){
				this.code = this.code.substring(3,this.code.length)
			}
			this.sortKey = option.sortKey;
			this.getLhcLotteryAnalysis();
			this.getAboutOnce();
		},
		methods: {
				start(e) {
					this.startData.clientX = e.changedTouches[0].clientX;
				},
				end(e) {
					const subX = e.changedTouches[0].clientX - this.startData.clientX;
					if (subX > 100) {
						console.log('右滑');
						this.back();
					} else if (subX < -100) {
						console.log('左滑');
						let next = this.$api.getNextAbout(this.code, this.sortKey);
						if (next) {
							uni.redirectTo({
								url: '/pages/public/' + next.des + '/' + next.des + '?name=' + next.name + '&code=' + next.code + '&video_url=' + next.url + '&sortKey=' + next.sortKey
							});
						}
					} else {
						console.log('无效');
					}
				},
				getDate(type) {
					const date = new Date();
					let year = date.getFullYear();
					let month = date.getMonth() + 1;
					let day = date.getDate();

					if (type === 'start') {
						year = year - 5;
					} else if (type === 'end') {
						// year = year + 2;
					}
					month = month > 9 ? month : '0' + month;
					day = day > 9 ? day : '0' + day;
					return `${year}-${month}-${day}`;
				},
				bindDateChange: function(e) {
					this.date = e.target.value;
				},
				toDestination(item) {
					this.showList = false;
					const itemIndex = this.$api.getAboutItemIndex(item.code);
					if(itemIndex>0){
						if(itemIndex!=14){
							uni.redirectTo({
								url: '/pages/public/' + item.des + '/' + item.des + '?name=' + item.name + '&code=' + item.code + '&video_url=' + item.url + '&sortKey=' + item.sortKey						
							});
						}else{
							window.open(item.des);
						}
					}
				},
				// 当前彩种即时开奖数据
				getAboutOnce() {
					let that = this;
					that.$api.getAboutOnce({ code: that.code }).then(rs => {
						if (rs.code == 0) {
							if(that.current_number != rs.data.current_number){
								that.date = that.getDate({
									format: true
								});
							}
							that.aboutList = rs.data;
							that.current_number = rs.data.current_number;
							that.countDown();
							that.numberRoll();
						}
					});
				},
				//下期开奖倒计时
				countDown() {
					this.interval = this.allSeconds = Math.floor((new Date(this.aboutList.next_time.replace(/-/g, '/')).getTime() - new Date().getTime() - this.timeDiff) / 1000);
					this.st = setInterval(() => {
						this.allSeconds -= 2;
						if (this.allSeconds <= 0) {
							this.minute = '00';
							this.second = '00';
							this.getAboutOnce();
							clearInterval(this.st);
						} else {
							this.hour = Math.floor(this.allSeconds / 3600);
							let lastSeconds = this.allSeconds % 3600;
							this.minute = (lastSeconds / 60 < 10 ? '0' : '') + Math.floor(lastSeconds / 60);
							this.second = (lastSeconds % 60 < 10 ? '0' : '') + (lastSeconds % 60);
						}
					}, 2000);
				},
				//号码滚动
				numberRoll() {
					let that = this;
					that.rl = setInterval(() => {
						if (that.allSeconds >= 0) {
							clearInterval(that.rl);
							return;
						}
						that.aboutList.current_code.forEach((v, k) => {
							that.aboutList.current_code[k] = Math.floor(10 * Math.random());
						});
					}, 100);
				},
				getLhcLotteryAnalysis() {
					this.$api.getLhcLotteryAnalysis({ code: this.code, type: 1 }).then(res => {
						if (res.code == 0) {
							this.sortList = res.data;
							this.currentSort = res.data[0].id;
						}
					});
				},
				back() {
					history.back();
				},
				setCurrent(sort){
					this.currentSort = sort.id;
					this.list = sort.child;
					if(sort.id==5){
						this.type = "styleHot";
					}else if(sort.id==6){
						this.type = "ZhmaHot";
					}else if(sort.id==7){
						this.type = "ZooTemaHot";
					}
				}
			}
		}
</script>


<style lang="scss">
.view-nav {
	/* #ifndef APP-NVUE */
	display: block;
	/* #endif */
	padding: 0;
	flex-direction: column;
	// padding: 15px;
	background-color: #ffffff;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	// font-size: 14px;
}
.city {
	/* #ifndef APP-PLUS-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	margin-left: 4px;
}
.anasysis {
	width: 100%;
	height: 80rpx;
	position: relative;
	margin-bottom: 20rpx;
	.anasysis-line {
		font-size: 16px;
		width: 100%;
		display: inline-block;
		// overflow: scroll;
		overflow: hidden;
		.anasysis-list {
			height: auto;
			width: 100%;
			display: flex;
			justify-content: center;
			.anasysis-item {
				display: inline-block;
				width: 120rpx;
				background-color: #fff;
				height: 80rpx;
				margin-right: 20rpx;
				text-align: center;
				font-size: 26rpx;
				line-height: 80rpx;
				border-radius:8rpx;
				color: #555555;
			}
			.anasysis-item:nth-child(1) {
				width: 140rpx;
			}
			.anasysis-item:last-of-type{
				margin-right: 0;
			}
			.current {
				color: #E83F46;
			}
		}
	}
}
.detail-container {
	width: 100%;
	height: auto;
	background: #fff;
	padding: 0 28rpx;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	font-size: 13px;
	color: #666;
	margin-bottom: 30rpx;
	.boxline {
		width: 100%;
		height: auto;
		display: -webkit-box;
		.box-title {
			padding-top: 10px;
			text-align: left;
			-webkit-box-flex: 3;
			-webkit-flex: 3;
			-ms-flex: 3;
			flex: 3;
			.issue {
				font-size: 26rpx;
				color: #333;
				display: inline-block;
				margin-right: 20rpx;
				view{
					display: inline-block;
					color:#0B91DE;
					font-size: 26rpx;
				}
			}
			.draw-count {
				font-size: 22rpx;
				color: #999;
				display: inline-block;
			}
		}
		.lhcon{
			margin-left: 11rpx;
			height: 55rpx;
		}
		.box {
			display: block;
			margin-top: 10rpx;
			.lhc{
				font-family: impact;
				width: 52rpx;
				height: 52rpx;
				float: left;
				margin-right: 22rpx;
				margin-top: 4px;
				display: inline-block;
				border-radius: 50%;
				font-size: 26rpx;	
                display: flex;
				justify-content: center; /* 水平居中 */
				align-items: center;     /* 垂直居中 */
			}
			.jslhcGreen{
				color: #fff;
				background-color: #7AB264;
			}
			.jslhcBlue{
				color: #fff;
				background-color: #4AA6E2;
			
			}
			.jslhcRed{
				color: #fff;
				background-color: #EF5858;
			}
			.box-item {
				display: inline-block;
				max-width: 96rpx;
				min-width: 10rpx;
				height: 54rpx;
				margin-right: 20rpx;
				color: #555555;
			}
			.iconjia{
				font-size: 24px;
				display: inline-block;
				width: 26px;
				height: 26px;
				line-height: 26px;
				float: left;
				margin-right: 22rpx;
				margin-top: 4px;
				display: inline-block;
				border-radius: 50%;
			}
			.plus{
				visibility: hidden;
				margin-right: 22rpx;
				margin-top: 0;
			}
		}
		.lhcOther{
			width: 52rpx;
			height: 52rpx;
			color: #889095;
			float: left;
			margin-right: 22rpx;
			display: inline-block;	
		}
		.r_arrow {
			bottom: 0;
			right: 0;
			// float: right;
			display: inline-block;
			position: absolute;
			// height: 60rpx;
			// line-height: 60rpx;
			display: flex;
			justify-content: center; /* 水平居中 */
			align-items: center;     /* 垂直居中 */
		}
		.color-red {
			font-weight: 400;
			font-style: normal;
			color: red;
		}
		.ml2 {
			margin-left: 2px;
		}
	}
}
.about-container {
	padding: 0 15px;
	.content-list {
		border-bottom: 1px solid #dfdfe5;
		padding-bottom: 3px;
		.content-title {
			font-size: 16px;
			height: 24px;
			line-height: 30px;
			margin: 7px 0;
		}
		.content {
			display: flex;
			flex-wrap: wrap;
			.content-item {
				height: 40px;
				line-height: 40px;
				border: 1px solid #dfdfe5;
				background: #fff;
				text-align: center;
				border-radius: 5px;
				width: 208rpx;
				margin: 4px;
				font-size: 26rpx;
			}
		}
	}
}
.u-title {
	line-height: 30px;
	font-size: 12px;
	text-align: center;
	display: inline-block;
	.option-md {
		padding: 15px;
		height: 20px;
		font-size: 14px;
		color: red;
		float: right;
	}
	.option-md:first-child {
		float: left;
	}
}
.u-content {
	padding-top: 10px;
	min-height: 480rpx;
	.content-item {
		display: flex;
		flex-wrap: wrap;
		padding: 0 15px;
		margin-bottom: 10px;
		.option {
			color: #666;
			text-align: center;
			float: left;
			width: 210rpx;
			height: 60rpx;
			font-size: 24rpx;
			line-height: 60rpx;
			margin-right: 2%;
			border: 1px solid #e4e3e8;
			margin-top: 20rpx;
			border-radius: 6rpx;
			display: inline-block;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
		}
		.checked {
			border-color: #e12121;
			color: #e12121;
			position: relative;
		}
	}
}
</style>