<template>
	<view class="home">
		<view>
			<uni-nav-bar :fixed="true" :title="title" color="#ffffff" :status-bar="true" background-color="#222222" currentRoute="home">
				<view slot="right"><view class="font_family icon-list" style="font-size: 48rpx;color: #FFFFFF;"></view></view>
			</uni-nav-bar>
		</view>
		<view class="contain">
			<view class="con-tp">
				<image src="../../static/img/soeedy_lottos.jpg" mode=""></image>
			</view>
			<view class="con-md">
				<view class="item" :class="tabNum==index?'on':''" @tap="changeTab(index)" v-for="(item,index) in list" :key="'a'+index">{{item}}</view>
			</view>
			<view class="con-bt">
				<view class="bt-box" v-for="item in aboutList" :key="item.code"><public-item :aboutItem="item"></public-item></view>
			</view>
			<view class="cn-nav">
				<view class="n-img"></view>
				<view class="nec">
					<view class="txt">ONE OF THE FASTEST </view>
					<view class="txt">DRAWS IN THE WORLD!</view>
					<view class="play">When To Play</view>
				</view>
				<view class="tips">Speedy is one of the fastest lottery number draws in the world. The results in our lotteries appears every 75 seconds per draw, 24 hours a day, 7 days a week, with a total of 1150 number of draws in a day. Enjoy now and have fun!</view>
			</view>
			<view class="cn-ft">
				<view class="f-img"></view>
				<view class="txt">Speed Lottos @ All Right Reserved.</view>
			</view>
		</view>
	</view>
</template>

<script>
	import UniNavBar from '../../components/uni-nav-bar/uni-nav-bar.vue';
	import PublicItem from '../public-item/public-item.vue';
	
	export default {
		components: {
			UniNavBar,
			PublicItem
		},
		data() {
			return {
				title: 'HOME',
				// logo: 'static/img/list.svg',
				list:["SPEED","LUCKY","AUSTRALIA'S" ],
				tabNum: 0,
				aboutList:[],
				lotteryList:[]
			}
		},
		onLoad(option) {
	          	this.getCategoryAndLottery();
		},
		mounted() {
			var categoryLottery = uni.getStorageSync("categoryLottery");
			if(categoryLottery){
				this.lotteryList = categoryLottery;
			}else{
				this.getCategoryAndLottery();
			}
		},
		methods: {
			changeTab(index){
				this.tabNum = index;
				if(index==0){
					this.aboutList = this.lotteryList["Speedy"];
				}else if(index==1){
					this.aboutList = this.lotteryList["Lucky"];
				}else if(index==2){
					this.aboutList = this.lotteryList["Australia's"];
				}
			},
			getCategoryAndLottery(){
				let that = this;
				that.$api.getCategoryAndLottery({}).then(rs => {
					if(rs.code == 0){
						that.aboutList = rs.data.list.Speedy;
						that.lotteryList = rs.data.list;
						uni.setStorageSync("categoryLottery",rs.data.list);
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	@media screen and (min-width: 1350px) {
	    .home{
			.con-tp{
				height: 550px!important;
			}
		} 
	}
	.home{
		position: relative;
		width: 100%;
		font-family: PingFangSC-Regular,Helvetica Neue,tahoma,arial,sans-serif;
		color: #FFFFFF;
		.contain{
			width: 100%;
			height:100%;
			position: relative;
			overflow: hidden;
		}
		.con-tp{
			width: 100%;
			height: 636rpx;
			position: relative;
			overflow: hidden;
		}
		.con-tp image{
			width: 100%;
			height: 100%;
		}
		.con-md{
			width: 100%;
			height: 72rpx;
			display: flex;
			justify-content: center;
			margin-bottom: 14rpx;
			.item{
				font-size: 32rpx;
				height: 72rpx;
				border-radius: 6px;
				border: 1px solid rgba(255, 255, 255, 0.7);
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 32.5rpx;
				margin-right: 20rpx;
			}
		}
		.con-md .item:last-child{
			margin-right: 0;
		}
		.con-md .item.on{
			color: #F24E56;
			background: #FFFFFF;
			border: 1px solid #FFFFFF;
		}
		.con-bt{
			width: 100%;
			min-height: 500rpx;
			padding-bottom: 200rpx;
			box-sizing: border-box;
			.p-item{
				.box-line:last-child{
					display: none;
				}
			}
		}
		.cn-nav{
			width: 100%;
			position: relative;
			height: 695rpx;
            background: #FFFFFF;
			border-bottom: 1PX solid #F5F5F5;
			.n-img{
				position: absolute;
				left: 50%;
				margin-left: -245rpx;
				top: -190rpx;
				width: 490rpx;
				height: 426rpx;
				background: url(../../static/img/speed_foot_img.png) no-repeat;
				background-size: 100% 100%;
				z-index: 99;
			}
			.nec{
				width: 490rpx;
				margin: 0 auto;
				position: relative;
				top: 280rpx;
				.txt{
					height: 50rpx;
					line-height: 50rpx;
					text-align: left;
					color: #333333;
					font-size: 36rpx;
				}
				.play{
					margin-top: 10rpx;
					color: #E83F46;
                    font-weight: 500;
					font-size: 32rpx;
				}
			}
			.tips{
				position: relative;
				top: 270rpx;
				left: 50%;
				margin-left: -242rpx;
				width: 550rpx;
				margin-top: 30rpx;
				font-size: 24rpx;
				color: #999999;
				line-height: 36rpx;
			}
		}
		.cn-ft{
			width: 100%;
			height: 200rpx;
			box-sizing: border-box;
			overflow: hidden;
			background: #FFFFFF;
			.f-img{
				width: 340rpx;
				height: 80rpx;
				background: url(../../static/img/foot_logo.png) no-repeat;
				background-size: 100% 100%;
				margin: 0 auto;
				margin-top: 35rpx;
			}
			.txt{
				width: 100%;
				text-align: center;
				font-size: 26rpx;
				color: #AAAAAA;
				margin-top: 30rpx;
				height: 25rpx;
				line-height: 20rpx;
			}
		}
	}
</style>
