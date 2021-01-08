<template>
	<view class="intr">
		<view class="intr-tp">
			<text>六合彩是從1至49個號碼中選出六個為中獎號碼的獎券，由香港賽馬會的附屬公司 「香港馬會獎券有限公司」經辦 。 </text>
			<text style="margin-top: 35rpx;">六合彩每星期攪珠三次，通常於星期二、星期四及非賽馬日之星期六或日晚上舉行， 並由電視台現場直播。</text>
		</view>
		<view class="result">
			<view class="rs-tp">攪珠結果：</view>
			<view class="rs-con">
				<text>
					每期攪珠結果均會透過電視、電台、各大報章、香港賽馬會網頁www.hkjc.com及資訊熱線1835 288公佈。 
				</text>
				<text>查詢過去十期攪珠結果，亦可致電熱線1835 288或瀏覽香港賽馬會網頁www.hkjc.com。</text>
			</view>
		</view>
		<view class="list">
			<view class="head">
				<text class="rank">投注途徑</text>
			</view>
			<view class="content">
				<text class="txt">·馬場和場外投注處</text>
		        <text class="txt">·網上投注服務「投注區」</text>
				<text class="txt">·電話投注</text>
				<text class="txt">·馬會投注三合一</text>
				<text class="txt">·智財咭(ESC)</text>
			</view>
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
.intr{
	position: relative;
	background: #FFFFFF;
	padding: 50rpx 35rpx;
	width: 100%;
	box-sizing: border-box;
	.intr-tp{
		text{
			font-family: Source Han Sans CN;
			color: #333333;
			line-height: 40rpx;
			font-size: 28rpx;
			display: inline-block;
		}
	}
	.result{
		margin-top: 50rpx;
		.rs-tp{
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #000000;
		}
		.rs-con{
			margin-top: 10rpx;
			text{
				display: inline-block;
				font-size: 28rpx;
				font-family: Source Han Sans CN;
                color: #333333;
	            line-height: 40rpx;
			}
		}
	}
	.list{
		margin-top: 50rpx;
		position: relative;
		background: #FFFFFF;
		border-radius: 6rpx;
		overflow: hidden;
	    border: 1px solid #E5E5E5;
		margin-bottom: 20rpx;
		.head{
			height: 68rpx;
			line-height: 68rpx;
			background: #F5F5F5;
			border-radius: 6rpx;
			padding-left: 35rpx;
			.rank{
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
                color: #3A9999;
				margin-right: 35rpx;
			}
		}
		.content{
			padding: 25rpx 42rpx 30rpx 32rpx;
			.txt{
				width: 100%;
				display: inline-block;
				font-size: 28rpx;
				font-family: SimSun;
				font-weight: 400;
				color: #444444;
				line-height: 48rpx;
			}
		}
		
	}
}
</style>
