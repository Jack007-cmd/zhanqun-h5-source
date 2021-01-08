<template>
	<view class="index">
		<view>
			<uni-nav-bar :fixed="true" :logoShow="true"  color="#ffffff" :status-bar="true" background-color="#AE1917" currentRoute="index">
				<!-- <view slot="left"><view class="font_family iconarrow" style="font-size: 48rpx;color: #FFFFFF;"></view></view> -->
			</uni-nav-bar>
		</view>
	    <view class="uni-padding-wrap" >
			<view class="page-section swiper" v-if="swiperImg.length>0">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="sinterval" :duration="duration" :circular="circular" indicator-active-color="#FFF" indicator-color="rgba(255, 255, 255, .55)">
						<swiper-item v-for="(item ,index) in swiperImg" :key="'k'+index">
							<view class="swiper-item uni-bg-red">
								<a :href="item.url">
									<image class="s-img" :src="$url + item.image" style="width: 100%;height: 380rpx;"></image>
									 <!-- <image class="s-img" :src="item.image" style="width: 100%;height: 380rpx;"></image> -->
								</a>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
	 	</view>
		<view class="real-draw" v-if="aboutList">
			<view class="draw-lf">
				<view class="draw-lf-text">第<text class="num">{{ current_number }}</text>期開獎號碼</view>
				<view class="boxline" style="margin-top: 25rpx;margin-bottom: 8rpx;">
					<view class="box">
						<template v-for="(code, index) in aboutList['current_code']">
							<view :key="6" v-if="index==6" class="font_family iconjia"></view>
							<view  :key="'a' + index" class="lhc" :class="{lhcRed:aboutList.color[index]==1,lhcGreen:aboutList.color[index]==2,lhcBlue:aboutList.color[index]==3}">{{ Number(code)<10?'0'+ Number(code) : code}}</view>
						</template>
					</view>
				</view>
				<view class="boxline txt" v-if="allSeconds > 0">
					<view class="box">
						<template v-for="(item, index) in aboutList['chinese_zodiac']">
							<view :key="6" v-if="index==6" class="lhcOther_iconjia"></view>
							<view  :key="index + 'x'" class="lhcOther">{{ item }}</view>
						</template>
					</view>
				</view>
				<view class="boxline txt" v-if="allSeconds > 0">
					<view class="box">
						<template v-for="(item, index) in aboutList['five_elements']">
							<view :key="6" v-if="index==6" class="lhcOther_iconjia"></view>
							<view  :key="index + 'y'" class="lhcOther">{{ item }}</view>
						</template>
					</view>
				</view>
			</view>
			<view class="draw-rg">
				<view class="next-time">距離下期(<text class="text">{{ aboutList['next_number'] }}期</text>) : </view>
				<view class="">
					<view class="lh-countdown" v-if="allSeconds > 900">
						<text class="time-bg lh-hours">{{ hour }}</text>
						<text class="time-txt">時</text>
						<text class="time-bg lh-minutes">{{ minute }}</text>
						<text class="time-txt">分</text>
						<text class="time-bg lh-seconds">{{ second }}</text>
						<text class="time-txt">秒</text>
					</view>
					<view  class="open" v-else-if="allSeconds<=900 && allSeconds>0">
						<text class="txt">封盤中...</text>
					</view>
					<view  class="open" v-else>
						<text class="txt">開獎中...</text>
					</view>
				</view>
				<!-- <view class="draw-rg-try" @click="tryOut">試玩一下</view> -->
			</view>
		</view>
		<view style="margin-top: 20rpx;">
		     <default-lottery :code="code" :date="date" :current_number="current_number"></default-lottery>
		</view> 
		<view class="winning-tool">
			<view class="win-header">
				<view class="win-hd-lf">中獎神器</view>
				<view class="win-hd-rg" v-if="navList.length>0">
					<text :class="active==index ? 'on' : '' " v-for="(item,index) in navList" :key="'k'+index"  @click="changeNav(index,item)">{{item}}</text>
				</view>
			</view>
			<view class="win-content">
					<view class="item" v-for="(item,index) in sortList" :key="'t'+index"  @click="toDetails(item.type)">{{item.name}}</view>
			</view>
		</view>
		<view class="footer">
			<view class="ft-copyright">版權所有 不得轉載 © 2020 香港六合彩</view>
			<view class="ft-statement">
				<text>免責聲明：本站內容僅作參考及交流，不進行任何現金交易行為。</text>
				<text>本網不承擔由於內容的合法性所引起的一切爭議和法律責任。</text>
			</view>
		</view>
	</view>
</template>

<script>
	import UniNavBar from '../../components/uni-nav-bar/uni-nav-bar.vue';
	import DefaultLottery from '../analysis/default-lottery.vue';
	export default {
		components: {
			UniNavBar,
			DefaultLottery
		},
		data() {
			const currentDate = this.getDate({
				format: true
			});
			return {
				swiperImg:[],
				indicatorDots: true,
				autoplay: true,
				sinterval: 2500,
				duration: 500,
				circular: true,
				code: 'xglhc',
				aboutList:null,
				date: currentDate,
				timeDiff: 0, //服务器与客户端时间差
				allSeconds: 0, //距离下期开奖时间（秒）(动态)
				interval: 0, //接口返回数据时距离下期开奖时间（秒）
				hour: '00', //时
				minute: '00', //分
				second: '00', //秒
				st: null,
				rl: null,
				current_number: '',
				categoryList:[],
				sortList:[],
				navList:[],
				active:0
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
		onLoad(e) {
			this.getSlideListNew();
			this.getAboutOnce();
			this.getLotteryAnalysis();
		},
		onUnload: function() {
			clearInterval(this.st);
			clearInterval(this.rl);
		},
		methods:{
			tryOut(){
				window.open('http://www.kkk168097.com/tryplay.php?controller=cashindex&action=tryplay');
			},
			getSlideListNew(){
				let that = this;
				this.$api.getSlideListNew().then(rs => {
					if (rs) {
						this.swiperImg = rs;
					}
				});
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
			getAboutOnce(){
				let that = this;
				that.$api.getAboutOnce({ code: that.code }).then(rs => {
					if (rs.code==0) {
						that.aboutList = rs.data;
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
						}else{
							clearInterval(that.rl);
							that.countDown();
						}
					}
				});
			},
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
			getLotteryAnalysis() {
				let that = this;
				that.$api.getLotteryAnalysis({ code: that.code, type: 1 }).then(rs => {
					if (rs.code == 0) {
						// that.categoryList.push({id:1,name:'開獎歷史',child:[{name:'開獎歷史',type:'jskj'}]})
						// that.navList.push('開獎歷史');
						for(var i in rs.data){
							that.categoryList.push(rs.data[i]);
							that.navList.push(rs.data[i]['name'])
						}
						var arr = rs.data[0];
						for(var k in arr['child']){
							that.sortList.push({name:arr['child'][k]['name'],type:arr['child'][k]['type']})
						}
					}
				});
			},
			changeNav(key,value){
				let that = this;
				that.active = key;
				that.sortList =[];
				var arr = that.categoryList;
				for(var i in arr){
					if(arr[i]['name'] == value){
						for(var k in arr[i]['child']){
							that.sortList.push({name:arr[i]['child'][k]['name'],type:arr[i]['child'][k]['type']})
						}
					}
				}
			},
			toDetails(type){
				uni.navigateTo({
				    url: '/pages/draw-history/draw-history?type=' + type
				});
			}
		},
	}
</script>

<style lang="scss">
.index{
	position: relative;
	width: 100%;
	font-family: Microsoft YaHei;
	color: #FFFFFF;
	.uni-padding-wrap{
		position: relative;
		width: 100%;
		height: 380rpx;
		padding: 0!important;
		.swiper{
			width: 100%;
			height: 380rpx;
		}
	}
	.real-draw{
		width: 100%;
		overflow: hidden;
		position: relative;
		background: #FFFFFF;
		.draw-lf{
			padding: 30rpx;
			box-sizing: border-box;
			height: 280rpx;
			border-bottom: 1px solid #E8EAF1;
			.draw-lf-text{
				width: 100%;
				text-align: left;
				font-size: 28rpx;
				font-family: Hiragino Sans GB;
				color: #333333;
				.num{
					color: #AE1917;
					margin: 0 5rpx;
				}
			}
			.boxline {
					width: 100%;
					height: auto;
					display: -webkit-box;
					position: -webkit-sticky;
					.box {
						display: flex;
						align-items:center;
						.iconjia{
							color: #AAAAAA;
							font-size: 30px;
							width: 26px;
							height: 26px;
							line-height: 26px;
							float: left;
							margin-right: 15rpx;
							margin-top: 2rpx;
							display: inline-block;
							border-radius: 50%;
							display:flex;
							justify-content:center;
							align-items:center;
						}
						.lhc{
							width: 64rpx;
							height: 64rpx;
							line-height: 64rpx;
							float: left;
							margin-right: 15rpx;
							display: inline-block;
							border-radius: 50%;
							font-size: 28rpx;
							font-family: Microsoft YaHei;
							font-weight: bold;
							color: #000000;
							display:flex;
							justify-content:center;
							align-items:center;
						}
						.lhc:last-child {
							margin-right: 0;
						}
						.lhcOther{
							width: 64rpx;
							height: 40rpx;
							float: left;
							margin-right: 15rpx;
							display: inline-block;
							font-size: 26rpx;
							font-family: Microsoft YaHei;
							color: #333333;
							display:flex;
							justify-content:center;
							align-items:center;
						}
						.lhcOther:last-child{
							margin-right: 0;
						}
						.lhcOther_iconjia{
							width: 26px;
							height: 26px;
							float: left;
							margin-right: 15rpx;
							display: inline-block;
							border-radius: 50%;
						}
					}
				}
				.txt{
					height: 40rpx;
				}
		}
		.draw-rg{
			position: relative;
			width: 100%;
			height: 100rpx;
			box-sizing: border-box;
			padding: 30rpx;
			display: flex;
			justify-content:flex-start;
			align-items:center;
			.next-time{
				text-align: left;
				font-size: 26rpx;
				font-family: Microsoft YaHei;
				color: #666666;
				.text{
					color:#333333;
					font-size: 26rpx;
				}
			}
			.lh-countdown{
				position: relative;
				margin-left: 20rpx;
				margin-top: 2rpx;
				display:flex;
				justify-content:flex-start;
				align-items:center;
				.time-bg{
					width: 52rpx;
					height: 44rpx;
					background: linear-gradient(0deg, #34353F, #464548, #2C2C30, #434346, #2C2D35, #3F404D);
					border: 1px solid #2D2D2D;
					opacity: 0.9;
					border-radius: 6rpx;
					font-size: 28rpx;
					font-family: Microsoft YaHei;
					color: #FFFFFF;
					display:flex;
					justify-content:center;
					align-items:center;
				}
				.time-txt{
					width: 52rpx;
					height: 44rpx;
					font-size: 24rpx;
					font-family: Microsoft YaHei;
					color: #000000;
					display:flex;
					justify-content:center;
					align-items:center;
				}
			}
			.open{
				margin-left: 20rpx;
				margin-top: 2rpx;
				.txt{
					display: inline-block;
					width: 135rpx;
					height: 48rpx;
					text-align: center;
					line-height: 48rpx;
					font-style: normal;
					color: #FFFFFF;	
					background: linear-gradient(0deg, #34353F, #464548, #2C2C30, #434346, #2C2D35, #3F404D);
					border-radius: 6rpx;
					box-sizing: border-box;
				}
			}
			.draw-rg-try{
				position: absolute;
				top: 50%;
				margin-top: -30rpx;
				right: 25rpx;
				width: 142rpx;
				height: 60rpx;
				background: #CE2927;
				border-radius: 4rpx;
				font-size: 22rpx;
				font-family: Microsoft YaHei;
				color: #FFFFFF;
				display:flex;
				justify-content:center;
				align-items:center;
			}
		}
	}
	.lhcGreen{
		background: url(../../static/img/ball_green.png) no-repeat;
		background-size: 100% 100%;
	}
	.lhcBlue{
		background: url(../../static/img/ball_blue.png) no-repeat;
		background-size: 100% 100%;
	}
	.lhcRed{
		background: url(../../static/img/ball_red.png) no-repeat;
		background-size: 100% 100%;
	}
	.winning-tool{
		position: relative;
		margin-top: 20rpx;
		width: 100%;
		.win-header{
			width: 100%;
			height: 80rpx;
            background: #F5F5F5;
			display:flex;
			justify-content:space-between;
			.win-hd-lf{
				width: 35%;
				font-size: 24rpx;
				font-family: Hiragino Sans GB;
				padding-left: 30rpx;
				color: #333333;
				height: 100%;
				line-height: 80rpx;
			}
			.win-hd-rg{
                font-family: Hiragino Sans GB;
				width: 65%;
				display:flex;
				justify-content:space-between;
				align-items:center;
				height: 100%;
				padding-right: 35rpx;
				text{
					// width: 48rpx;
					font-size: 24rpx;
					color: #666666;
					height: 100%;
					line-height: 80rpx;
					text-align: center;
					display: inline-block;
					box-sizing: border-box;
				}
				.on{
					color: #AE1917;
					border-bottom: 4rpx solid  #AE1917;;
				}
			}
		}
		.win-content{
			width: 100%;
			min-height: 325rpx;
			background: #FFFFFF;
			display:flex;
			flex-wrap: wrap;
			justify-content:space-between;
			align-items: flex-start;
			align-content: flex-start;
			padding: 20rpx 30rpx 40rpx 30rpx;
			.item{
				width: 215rpx;
				height: 68rpx;
				background: #F9F9F9;
				border: 1px solid #DDDDDD;
				border-radius: 6rpx;
				font-size: 24rpx;
				font-family: Hiragino Sans GB;
				color: #444444;
				display:flex;
				justify-content:center;
				align-items:center;
				margin-right: 20rpx;
				margin-top: 20rpx;
			}
			.item:nth-child(3n+3){
				margin-right: 0;
			}
		}
		.win-content:after{
			content: '';
			width: 215rpx;
			border:1px solid transparent;
		}
	}
	.footer{
		position: relative;
		margin-top: 50rpx;
		display: block;
		box-sizing: border-box;
		width: 100%;
		height: 160rpx;
		background: #1F1F1F;
		.ft-copyright{
			position: relative;
			top: 25rpx;
			width: 100%;
			text-align: center;
			height: 32rpx;
			line-height: 32rpx;
			font-size: 20rpx;
			font-family: Hiragino Sans GB;
			font-weight: normal;
			color: #FFFFFF;
			opacity: 0.6;
			margin: 0 auto;
		}
		.ft-statement{
			position: relative;
			top: 35rpx;
			width: 100%;
			height: 55rpx;
			line-height: 35rpx;
			text{
				height: 28rpx;
				line-height: 28rpx;
				display: inline-block;
				width: 100%;
				font-size: 20rpx!important;
				font-family: Hiragino Sans GB;
				font-weight: normal;
				color: #FFFFFF;
				opacity: 0.25;
				margin: 0 auto;
				text-align: center;
			}
		}
	}
}
</style>
