<template>
	<view class="dist">
		<view class="dist-head">
				<image class="h-img" src="../../static/img/cylinder.png" mode=""></image>
		</view>
		<view class="dt-tp">
			<text>每期頭獎獎金基金訂為不少於港幣800萬元，並不設上限。</text>
			<text style="margin-top: 35rpx;">若頭獎及/或二獎無人中獎，獎金將會撥入下一期攪珠的頭獎基金作「多寶」金額。</text>
		</view>
		<view class="title">各組獎金分配：</view>
		<view class="list">
			<view class="lt-tp">第一組獎金：</view>
			<view class="lt-con">
				<text>
					45% x （獎金基金減去第四、五、六及七組的總獎金及金多寶扣數<text style="color:#EB1B18;">*</text>）÷ 中獎單位
				</text>
			</view>
		</view>
		<view class="list">
			<view class="lt-tp">第二組獎金：</view>
			<view class="lt-con">
				<text>
					15% x （獎金基金減去第四、五、六及七組的總獎金及金多寶扣數<text style="color:#EB1B18;">*</text>）÷ 中獎單位
				</text>
			</view>
		</view>
		<view class="list">
			<view class="lt-tp">第三組獎金：</view>
			<view class="lt-con">
				<text>
					40% x （獎金基金減去第四、五、六及七組的總獎金及金多寶扣數<text style="color:#EB1B18;">*</text>）÷ 中獎單位
				</text>
			</view>
		</view>
		<view class="list">
			<view class="lt-tp">第四組獎金：</view>
			<view class="lt-con">
				<text>
					每注港幣9,600元
				</text>
			</view>
		</view>
		<view class="list">
			<view class="lt-tp">第五組獎金：</view>
			<view class="lt-con">
				<text>
					每注港幣640元
				</text>
			</view>
		</view>
		<view class="list">
			<view class="lt-tp">第六組獎金：</view>
			<view class="lt-con">
				<text>
					每注港幣320元
				</text>
			</view>
		</view>
		<view class="list">
			<view class="lt-tp">第七組獎金：</view>
			<view class="lt-con">
				<text>
					每注港幣40元
				</text>
			</view>
		</view>
		<view class="dt-ft">
			<text><text style="color:#EB1B18;margin-right: 4rpx;">*</text>由二零零六年七月一日起，金多寶扣數定為獎金基金減去第四、五、六及七組總獎金後的百分之九。</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
		}
	}
</script>

<style lang="scss">
.dist{
	position: relative;
	background: #FFFFFF;
	padding: 0 35rpx 50rpx 35rpx;
	width: 100%;
	box-sizing: border-box;
	.dist-head{
		width: 100%;
		height: 290rpx;
		display: flex;
		justify-content: center; 
		align-items: center; 
		.h-img{
			width: 492rpx;
			height: 174rpx;
		}
	}
	.dt-tp{
		text{
			width: 100%;
			display: inline-block;
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			color: #333333;
			line-height: 40rpx;
		}
	}
	.title{
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #000000;
		margin-top: 35rpx;
		margin-bottom: 15rpx;
	}
	.list{
		position: relative;
		background: #FFFFFF;
		border-radius: 6rpx;
		overflow: hidden;
		border: 1px solid #E5E5E5;
		margin-bottom: 20rpx;
		.lt-tp{
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			color: #AE1917;
			height: 68rpx;
			line-height: 68rpx;
			background: #F5F5F5;
			border-radius: 6rpx;
			padding-left: 35rpx;
		}
		.lt-con{
			padding: 35rpx 50rpx 40rpx 25rpx;
			text{
				display: inline-block;
				font-size: 28rpx;
				font-family: Source Han Sans CN;
		        color: #333333;
		        line-height: 40rpx;
			}
		}
	}
	.dt-ft{
		margin-top: 35rpx;
		text{
			display: inline-block;
			font-size: 28rpx;
            color: #444444;
			font-family: Source Han Sans CN;
		    line-height: 48rpx;
		}
	}
}
</style>
