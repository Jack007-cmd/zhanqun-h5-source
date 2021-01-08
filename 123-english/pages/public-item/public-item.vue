<template>
	<view class="p-item" @tap="toLotteryDetails">
		<view class="list">
			<template  v-if="rsItem">
			  <view class="box-title">
			  	<view class="lotName">{{(rsItem['name_en']).toUpperCase()}}</view>
			  	<view class="num">WINNING NUMBERS,{{rsItem['current_number']}}</view>
			  </view>
			  <view class="box-lucky8" v-if="rsItem.code=='newajxyb' || rsItem.code=='newjsklsf'">
			  	<template v-for="(code,index) in rsItem['current_code']">
			  	   <view class="box-item"  :key="'c'+index" :class="{big:code==19 || code==20}">{{code}}</view>
			  	</template>
			  </view>
			<!--  <view class="box-lucky20" v-else-if="rsItem.code=='ajxy20'">
			  	<template v-for="(code,index) in rsItem['current_code']">
			  	   <view class="box-item"  :key="'d'+index" :class="{big:code==19 || code==20}">{{code}}</view>
			  	</template>
			  </view> -->
			  <view class="box-lhc" v-else-if="rsItem.code=='newjslhc'">
			  	<template v-for="(code,index) in rsItem['current_code']">
			  	   <view :key="index+'x'+6" v-if="index==6" class="font_family icon-jia"></view>
			  	   <view  :key="'e'+index" class="box-item" :class="{lhcRed:rsItem.color[index]==1,lhcGreen:rsItem.color[index]==2,lhcBlue:rsItem.color[index]==3}">{{ code }}</view>
			  	</template>
			  </view>
			  <view class="box-other" v-else>
			  	<template v-for="(code,index) in rsItem['current_code']">
			  	   <view class="box-item"  :key="'f'+index" :class="{big:code==19 || code==20}">{{code}}</view>
			  	</template>
			  </view>
			  <view class="box-param">
			  	<view class="time">NEXT LOTTERY TIME:</view>
			  	<view class="num">
			  		<text>{{rsItem['next_number']}}</text>
			  		<text style="margin-left: 46rpx;">
			  			<text v-if="allSeconds > 0">
			  				<text class="color-red ml2" v-if="hour > 0">{{ hour }}:</text>
			  				<text class="color-red" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
			  				<text class="color-red">{{ second }}</text>
			  			</text>
			  			<text class="r_arrow color-red" v-if="allSeconds <= 0">opening...</text>
			  		</text>
			  	</view>
			  </view>
			  <view class="box-line"></view>
			</template> 
		</view>
	</view>
</template>

<script>
	export default {
		name: 'public-item',
		//属性
		props: ['aboutItem'],
		computed: {
			currentItem: {
				get() {
					return this.aboutItem;
				},
				set(val) {
					return this.rsItem;
				}
			}
		},
		data() {
			return {
				isLoading: false,
				itemIndex: 0,
				timeDiff: 0, //服务器与客户端时间差
				allSeconds: 0, //距离下期开奖时间（秒）(动态)
				interval: 0, //接口返回数据时距离下期开奖时间（秒）
				hour: 0, //时
				minute: '00', //分
				second: '00', //秒
				st: null,
				rsItem: null
			}
		},
		//组件生命周期
		created: function(e) {
			this.timeDiff = Number(uni.getStorageSync('timeDiff'));
			this.timeDiff = isNaN(this.timeDiff) ? 0 : this.timeDiff;
			if (this.currentItem) {
				this.getAboutOnce();
			}
		},
		beforeDestroy: function() {
			clearInterval(this.st);
		},
		methods:{
			toLotteryDetails(){
				let that = this;
				uni.navigateTo({
					url:'/pages/lottery-details/lottery-details?code='+that.currentItem.code +'&name='+ this.aboutItem.name_en
				});
			},
			getAboutOnce() {
				let that = this;
				that.$api.getAboutOnce({ code: that.currentItem.code }).then(res => {
					if(res.code == 0){
						that.countDown(res.data.next_time);
						that.rsItem = res.data;
					}
				})
			},
			//下期开奖倒计时
			countDown(next_time) {
				// if(!this.aboutList.next_time) return;
				this.interval = this.allSeconds = Math.floor((new Date(next_time.replace(/-/g, '/')).getTime() - new Date().getTime() - this.timeDiff) / 1000);
				this.st = setInterval(() => {
					this.allSeconds -= 1;
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
				}, 1000);
			}
		}
	}
</script>

<style lang="scss">
	.con-bt .bt-box:last-child .list .box-line{
		display: none;
	}
	.p-item{
		.list{
			margin-top: 52rpx;
			.box-title{
				width: 100%;
				height: 95rpx;
				margin: 0 auto;
				margin-bottom: 40rpx;
				.lotName{
					font-size: 48rpx;
					height: 50rpx;
					line-height: 40rpx;
					text-align: center;
				}
				.num{
					font-size: 36rpx;
					height: 45rpx;
					line-height: 60rpx;
					text-align: center;
				}
			}
			.box-lucky8,.box-lucky20,.box-lhc,.box-other{
				overflow: hidden;
				margin: 0 auto;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
				margin-bottom: 40rpx;
				.box-item{
					width: 72rpx;
					height: 72rpx;
					background: #FFFFFF;
					border-radius: 50%;
					font-size: 44rpx;
					font-family: Impact;
					color: #E84047;
					display: flex;
					align-items: center;
					justify-content: center;
					margin: 5rpx 7rpx;
				}
				.icon-jia{
					font-size: 62rpx;
					color: #FFFFFF;
					width: 72rpx;
					height: 72rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 50%;
				}
				.big{
					color: #343434;
				}
				.lhcGreen{
					color: #7AB264;
				}
				.lhcBlue{
					color: #4AA6E2;
				
				}
				.lhcRed{
					color: #F05858;
				}
			}
			.box-lucky8{
				width: 350rpx;
			}
			.box-lucky20{
				width: 420rpx;
			}
			.box-lhc{
				width: 670rpx;
			}
			.box-other{
				width: 430rpx;
			}
			.box-param{
				width: 100%;
				height: 96rpx;
				font-size: 33rpx;
				margin-bottom: 40rpx;
				overflow: hidden;
				.time{
					font-size: 32rpx;
					height:  40rpx;
					line-height: 40rpx;
					text-align: center;
				}
				.num{
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 32rpx;
					height: 40rpx;
					line-height: 40rpx;
					text-align: center;
				}
			}
			.box-line{
				width: 315rpx;
				height: 1px;
				background: rgba(255,255,255,0.3);
				margin: 0 auto;
			}
		}
	}
</style>
