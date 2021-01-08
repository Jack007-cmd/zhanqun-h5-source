<template>
	<view class="ball">
		<view class="ball-tp">
			<text>每逢特別節日舉辦的金多寶攪珠，均會從金多寶彩池中撥出金多寶金額，以推高頭獎基金至一個特定金額，為頭獎得主帶來更豐厚獎金。</text>
			<text style="margin-top: 25rpx;">金多寶攪珠通常於每年多個節日如農曆新年、端午節及中秋節舉行。</text>
		</view>
		<view class="title">金多寶攪珠預售服務：</view>
		<view class="ball-ft">
				<text>顧客可於金多寶攪珠日舉行前七日，預購該期金多寶攪珠獎券。</text>
				<text style="margin-top: 25rpx;">各個投注途徑均提供六合彩金多寶獎券預售服務，顧客於場外投注處、馬場、相關互動投注服務、電話投注或1886電話投注自動服務系統預購金多寶獎券時，須揀選「金多寶」選項或說明購買金多寶獎券。</text>
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
.ball{
	position: relative;
	background: #FFFFFF;
	padding: 50rpx 36rpx;
	width: 100%;
	box-sizing: border-box;
	.ball-tp{
		text{
			font-family: Source Han Sans CN;
			color: #333333;
			line-height: 40rpx;
			font-size: 28rpx;
			display: inline-block;
		}
	}
	.title{
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #000000;
		margin-top: 35rpx;
		margin-bottom: 15rpx;
	}
	.ball-ft{
		text{
			font-family: Source Han Sans CN;
            color: #444444;
			line-height: 40rpx;
			font-size: 28rpx;
			display: inline-block;
		}
	}
	
}
</style>
