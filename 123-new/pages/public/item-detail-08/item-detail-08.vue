<!-- 福彩3D 体彩排列3 -->
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
						<view class="uni-input mydate">{{ date }} <text class="font_icon iconsytriangle date-triangle"></text></view>
					</picker>
				</view>
			</uni-nav-bar>
		</view>
		<view v-if="!showList">
			<view class="detail-container">
				<view class="boxline">
					<view class="box-title">
						<view class="issue">{{ current_number }}期开奖</view>
						<view class="draw-count" v-if="aboutList">已开{{ aboutList['open_num'] }}期，剩余{{ aboutList['still_num'] }}期</view>
						<view class="open-video" @click="showVideo=true">
							<text class="font_icon iconshipin"></text>
							视频
						</view>
					</view>
				</view>
				<view class="boxline"  v-if="aboutList">
					<view class="box" >
						<view class="ssc" v-for="(ccode, index) in aboutList['current_code']" :key="code+'-'+index">{{ ccode }}</view>
					</view>
				</view>				
				<view class="boxline">
					<view class="box" v-if="aboutList">
						<view class="box-item">总和:</view>
						<view class="box-item" v-for="(item, itemIndex) in aboutList.describe[3].val" :key="aboutList.code + item + itemIndex">{{ item }}</view>
					</view>
					<text class="r_arrow" v-if="allSeconds > 0">
						<text class="color-red ml2" v-if="hour > 0">{{ hour }}:</text>
						<text class="color-red" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
						<text class="color-red">{{ second }}</text>
					</text>
					<text class="r_arrow color-red" v-if="allSeconds <= 0">开奖中</text>
				</view>
			</view>
			<view class="anasysis">
				<view class="anasysis-line">
					<view class="anasysis-list" @touchstart.stop  @touchend.stop>
						<view class="anasysis-item" @click="currentSort = sort.type" :class="{ current: currentSort == sort.type }" v-for="sort in sortList" :key="sort.type">
							{{ sort.name }}
						</view>
					</view>
				</view>
			</view>
			<view>
				<WinNumber v-if="currentSort == 'jskj'" :code="code" :date="date" :current_number="current_number"></WinNumber>
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
		<view class="u-popup" v-if="showAll">
			<view class="u-transition-out" @click="showAll=!showAll"></view>
			<view class="u-transition">
				<view class="u-popup__wrapper-box">
					<view class="u-main">
						<view class="u-title">
							<view class="option-md">选择分析类型</view>
							<view class="option-md" @click="showAll=!showAll">取消</view>
						</view>
						<view class="u-content">
							<view class="content-item">
								<view class="option" v-for="sort in sortList" :key="sort.type" :class="{ checked: currentSort == sort.type }" @click="currentSort = sort.type;showAll=false;">{{ sort.name }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="u-popup" v-if="showVideo">
			<view class="u-transition-out" @click="showVideo=false"></view>
			<view class="u-transition">
				<view class="u-popup__wrapper-box">
					<view class="u-main">
						<view class="u-title">
							<view class="option-md" style="line-height:14px;color: #000;">{{name}}开奖视频</view>
							<view class="option-md" style="line-height:14px;color: #000;" @click="showVideo=false">关闭</view>
						</view>
						<iframe :src="video_url"  class="u-content" frameborder="0"></iframe>
						<!-- <view class="u-content">
							<video class="video" :src="video_url" autoplay="true" :controls="false"
								:show-center-play-btn="false"></video>							
						</view> -->
					</view>
				</view>
			</view>
		</view>						
	</view>
</template>

<script>
import WinNumber from '../../public/analysis/win-number.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
export default {
	components: {
		uniNavBar,
		WinNumber
	},
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			startData: { clientX: '', clientY: '' },
			showAll:false,
			sortArr: [], //所有彩种列表
			name: '',
			showList: false,
			showVideo:false,
			date: currentDate,
			code: '',
			sortKey: -1,
			video_url: '',
			sortList: [],
			currentSort: 'jskj',
			timeDiff: 0, //服务器与客户端时间差
			allSeconds: 0, //距离下期开奖时间（秒）(动态)
			interval: 0, //接口返回数据时距离下期开奖时间（秒）
			hour: 0, //时
			minute: '00', //分
			second: '00', //秒
			st: null,
			rl: null,
			aboutList: null,
			current_number: ''
		};
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
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
		this.sortKey = option.sortKey;
		// this.video_url = option.video_url;
		this.video_url = this.$api.getCurrentUrl(option.code);
		this.getAnalysisSort();
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
		toDestination(item) {
			this.showList = false;
			uni.redirectTo({
				url: '/pages/public/' + item.des + '/' + item.des + '?name=' + item.name + '&code=' + item.code + '&video_url=' + item.url + '&sortKey=' + item.sortKey
			});
		},
		// 当前彩种即时开奖数据
		getAboutOnce() {
			let that = this;
			clearInterval(that.rl);
			that.$api.getAboutOnce({ code: that.code }).then(rs => {
				if (rs.code==0) {
					if(that.current_number != rs.data.current_number){
						that.date = that.getDate({
							format: true
						});
					}
					that.aboutList = rs.data;
					that.current_number = rs.data.current_number;
					that.allSeconds = Math.floor((new Date(that.aboutList.next_time.replace(/-/g, '/')).getTime() - new Date().getTime() - that.timeDiff) / 1000);
					if(that.allSeconds<=0){
						setTimeout(function() {
							that.getAboutOnce();
						}, 3000);
						that.numberRoll();
					}else{
						clearInterval(that.rl);
						that.countDown();
					}
				}
			});
		},
		//下期开奖倒计时
		countDown() {
			let that = this;
			that.interval = that.allSeconds = Math.floor((new Date(that.aboutList.next_time.replace(/-/g, '/')).getTime() - new Date().getTime() - that.timeDiff) / 1000);
			that.st = setInterval(() => {
				that.allSeconds -= 1;
				if (that.allSeconds <= 0) {
					that.minute = '00';
					that.second = '00';
					that.numberRoll();
					that.getAboutOnce();
					clearInterval(that.st);
				} else {
					that.hour = Math.floor(that.allSeconds / 3600);
					that.hour = that.hour < 10 ? '0' + that.hour : that.hour;
					let lastSeconds = that.allSeconds % 3600;
					that.minute = (lastSeconds / 60 < 10 ? '0' : '') + Math.floor(lastSeconds / 60);
					that.second = (lastSeconds % 60 < 10 ? '0' : '') + (lastSeconds % 60);
				}
			}, 1000);
		},
		//号码滚动
		numberRoll() {
			let that = this;
			that.rl = setInterval(() => {
				if (that.allSeconds > 0) {
					clearInterval(that.rl);
					return;
				}
				that.aboutList.current_code.forEach((v, k) => {
					that.$set(that.aboutList.current_code,k,Math.floor(10 * Math.random()) + 1);
				});
			}, 200);
		},
		getAnalysisSort() {
			this.$api.getAnalysisSort({ code: this.code, type: 'app' }).then(res => {
				if (res.code == 0) {
					this.sortList = res.data;
					this.currentSort = res.data[0].type;
				}
			});
		},
		back() {
			history.back();
		},
		bindDateChange: function(e) {
			this.date = e.target.value;
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
		}
	}
};
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
	background-color: #fff;

	.anasysis-line {
		font-size: 16px;
		position: relative;
		width: 87%;
		display: inline-block;
		overflow: scroll;
		.anasysis-list {
			height: auto;
			overflow-x: scroll;
			text-align: center;
			width: max-content;
			.anasysis-item {
				display: inline-block;
				float: left;
				min-width: 70px;
				max-width: 130px;
				height: 80rpx;
				margin-top: 2px;
				margin-right: 7px;
				text-align: center;
				font-size: 16px;
				padding-top: 0;
				line-height: 80rpx;
			}
			.current {
				color: #e12121;
			}
		}
	}
}
.detail-container {
	width: 100%;
	height: auto;
	background: #fff;
	padding: 0 10px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	font-size: 13px;
	color: #666;
	margin-bottom: 10px;
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
				font-size: 28rpx;
				color: #333;
				display: inline-block;
				margin-right: 5px;
			}
			.draw-count {
				font-size: 28rpx;
				color: #999;
				display: inline-block;
			}
		}
		.box {
			display: block;
			margin-top: 10rpx;
			.box-item {
				display: inline-block;
				max-width: 96rpx;
				min-width: 10rpx;
				height: 54rpx;
				margin-right: 20rpx;
				color: #555555;
			}
		}
		.r_arrow {
			margin-top: 6rpx;
			right: 0;
			float: right;
			display: inline-block;
			position: absolute;
			height: 60rpx;
			line-height: 60rpx;
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
	min-height: 480rpx;
	padding-top: 10px;
	.content-item {
		display: flex;
		flex-wrap: wrap;
		padding: 0 15px;
		margin-bottom: 10px;
		.option {
			color:#666;
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
