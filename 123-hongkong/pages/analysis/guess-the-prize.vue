<template>
	<view class="guess">
		<view class="guess-tp">
			<text>六合彩注項單位為每注港幣10元。選擇複式或膽拖注項時，可以每注港幣$5【部份注項單位】投注。有關之獎金則根據每注【部份注項單位】佔注項單位的份數計算</text>
			<text style="margin-top: 30rpx;">每期六合彩攪珠均從49個號碼中攪出七個號碼。首六個號碼稱為「攪出號碼」，而第七個號碼稱為【特別號碼】。</text>
		</view>
		<view class="title">獎項詳情如下：</view>
		<view class="list" v-for="(item,index) in list" :key="'y'+index">
			<view class="head">
				<text class="rank">{{item.rank}}</text>
				<text class="win">{{item.winning}}</text>
			</view>
			<view class="content">
				{{item.content}}
			</view>
		</view>
		<view class="register">
			<view class="reg-tp">中獎登記：</view>
			<view class="rg-con">
				<text>
					若獲中之獎金為每十元一注超過五百萬元，所有中獎彩票持票人士或經由電話投注服務的中獎人士，包括使用智財咭、1886電話投注自動服務系統等，請於指定時間(公佈攪珠結果後至翌日下午5時)致電本會1817登記。(使用互動投注服務途徑或香港賽馬會電子錢包除外) 
				</text>
				<text style="margin-top: 35rpx;">互動投注服務包括網上投注服務「投注區」、馬會投注三合一及「電訊至尊」投注app。</text>
			</view>
		</view>
		<view class="register">
			<view class="rg-tp">領取獎金：</view>
			<view class="rg-con">
				<text>
					所有獲中彩票，必須於有關攪珠的日期後起計60天內領取 (例如：於3月1日所舉行的攪珠的獲中彩票，可於3月1日當天至4月30日內任何一天領取)。
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{rank:'頭獎',winning:'選中6個【攪出號碼】',content:'獎金會因應該期獲中頭獎注數而有所不同，每期頭獎獎金基金訂為不少於港幣800萬元。'},
					{rank:'二獎',winning:'選中5個【攪出號碼】+【特別號碼】',content:'獎金會因應該期獲中二獎注數而有所不同'},
					{rank:'三獎',winning:'選中5個【攪出號碼】',content:'獎金會因應該期獲中三獎注數而有所不同'},
					{rank:'四獎',winning:'選中4個【攪出號碼】+【特別號碼】',content:'固定獎金港幣9,600元'},
					{rank:'五獎',winning:'選中4個【攪出號碼】',content:'固定獎金港幣640元'},
					{rank:'六獎',winning:'選中3個【攪出號碼】+【特別號碼】',content:'固定獎金港幣320元'},
					{rank:'七獎',winning:'選中3個【攪出號碼】',content:'固定獎金港幣40元'}
					]
			};
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
.guess{
	position: relative;
	background: #FFFFFF;
	padding: 50rpx 35rpx;
	width: 100%;
	box-sizing: border-box;
	.guess-tp{
		position: relative;
		box-sizing: border-box;
		width: 100%;
		height: 320rpx;
		text{
			font-family: Source Han Sans CN;
			color: #333333;
			line-height: 40rpx;
			font-size: 28rpx;
			display: inline-block;
		}
	}
	.title{
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #000000;
		margin-bottom: 20rpx;
	}
	.list{
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
				color: #AE1917;
				margin-right: 35rpx;
			}
			.win{
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				color: #3A9999;
			}
		}
		.content{
			padding: 25rpx 42rpx 30rpx 32rpx;
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			color: #444444;
			line-height: 40rpx;
		}
		
	}
	.register{
		margin-top: 50rpx;
		.rg-tp{
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #000000;
		}
		.rg-con{
			margin-top: 10rpx;
			text{
				display: inline-block;
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				color: #444444;
                line-height: 40rpx;
			}
		}
	}
	
}
</style>
