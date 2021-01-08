<template>
	<view class="speedy">
		<view>
			<uni-nav-bar :fixed="true" :title="title" color="#ffffff" :status-bar="true" background-color="#222222" currentRoute="about-speedy" @clickLeft="back">
				<view slot="left"><view class="font_family icon-arrow_left" style="font-size: 48rpx;color: #FFFFFF;"></view></view>
				<view slot="right"><view class="font_family icon-list" style="font-size: 48rpx;color: #FFFFFF;"></view></view>
			</uni-nav-bar>
		</view>
		<view class="contain">
			<view class="cn-tp">
				<view class="lotName">Speedy Lottos</view>
				<view class="type" style="margin-top: 25rpx;">Don't WASTE YOUR TIME!</view>
				<view class="type" style="margin-top: 10rpx;">WIN TODAY!</view>
			</view>
			<view class="cn-md">
				<view class="name">About Speed</view>
			</view>
			<view class="cn-bt">
				<view class="bt-con">
					<view class="txt-o">Speedy</view>
					<view class="txt-t">Time waits for no one and speeds by. You're never getting younger so have a bit of adventure and excitement in your life now!</view>
					<view class="txt-h">Play Speedy - one of the fastest lotteries in the world where there is a draw every 75 seconds. You may just find yourself with enough money to fund any adventure you can possibly think of. Start now and experience life in the fast lane!</view>
				</view>
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
	export default {
		components: {
			UniNavBar
		},
		data() {
			return {
				title: 'ABOUT SPEED',
				logo: 'static/img/list.svg',
			};
		},
		methods: {
			back() {
				history.back();
			}
		}
	}
</script>

<style lang="scss">
	.speedy{
		position: relative;
		width: 100%;
		font-family: PingFangSC-Regular,Helvetica Neue,tahoma,arial,sans-serif;
		color: #FFFFFF;
		.contain{
			width: 100%;
			height:100%;
			position: relative;
			box-sizing: border-box;
			overflow: hidden;
			.cn-tp{
				width: 100%;
				height: 270rpx;
				background: url(../../static/img/xq_bg.jpg) no-repeat;
				background-size: 100% 100%;
				box-sizing: border-box;
				overflow: hidden;
				.lotName{
					width: 100%;
					height: 72rpx;
					line-height: 56rpx;
					font-size: 72rpx;
                    font-family: ChunkFive;
					text-align: center;
					margin-top: 70rpx;
				}
				.type{
					width: 100%;
					height: 25rpx;
					line-height: 20rpx;
					font-size: 20rpx;
					text-align: center;
				}
			}
			.cn-md{
				width: 100%;
				height: 666rpx;
				background: url(../../static/img/about_img.jpg) no-repeat;
				background-size: 100% 100%;
				box-sizing: border-box;
				overflow: hidden;
				.name{
					margin-top: 50rpx;
					width: 100%;
					height: 36rpx;
					line-height: 36rpx;
					text-align: center;
					color: #333333;
					font-size: 36rpx;
				}
			}
			.cn-bt{
				width: 100%;
				height: 560rpx;
				box-sizing: border-box;
				overflow: hidden;
				background: #edeef0;
				border-bottom: 1px solid #DDDDDD;
				.bt-con{
					width: 640rpx;
					height: 440rpx;
					margin: 0 auto;
					margin-top: 50rpx;
					.txt-o{
						text-align: left;
						width: 100%;
						height: 35rpx;
						line-height: 30rpx;
						color: #333333;
						font-size: 30rpx;
						font-weight: bold;
					}
					.txt-t,.txt-h{
						text-align: left;
						width: 100%;
						line-height: 45rpx;
						font-size: 26rpx;
						color: #666666;
					}
					.txt-t{
						margin-top: 16rpx;
					}
					.txt-h{
						margin-top: 35rpx;
					}
				}
			}
			.cn-ft{
				width: 100%;
				height: 210rpx;
				box-sizing: border-box;
				overflow: hidden;
		    	background: #F5F5F5;
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
		
	}

</style>
