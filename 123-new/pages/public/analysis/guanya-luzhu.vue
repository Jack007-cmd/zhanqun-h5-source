<template name="guanya-luzhu">
	<view class="container">
		<template v-if="mainData">
			<view class="content-list">
				<view class="content-title">
					<view class="title-left">今日累计：双（{{ mainData.double }}）单（{{ mainData.single }}）</view>
					<view class="title-right">冠亚和&nbsp;&nbsp;单双&nbsp;&nbsp;最新&nbsp;&nbsp;↓</view>
				</view>
				<view class="table-box">
					<table @touchstart.stop @touchend.stop border="0" cellpadding="1" cellspacing="1">
						<tbody>
							<tr class="tablebox">
								<td v-for="(item, index) in mainData.oddEvenList" :key="index">
									<p v-for="(temp, tempIndex) in item" :key="tempIndex" :class="{ font_red: temp == '双' }">{{ temp }}</p>
								</td>
							</tr>
						</tbody>
					</table>
				</view>
			</view>
			<view class="content-list">
				<view class="content-title">
					<view class="title-left">今日累计：小（{{ mainData.little }}）大（{{ mainData.big }}）</view>
					<view class="title-right">冠亚和&nbsp;&nbsp;大小&nbsp;&nbsp;最新&nbsp;&nbsp;↓</view>
				</view>
				<view class="table-box">
					<table @touchstart.stop @touchend.stop border="0" cellpadding="1" cellspacing="1">
						<tbody>
							<tr class="tablebox">
								<td v-for="(item, index) in mainData.sizeList" :key="index">
									<p v-for="(temp, tempIndex) in item" :key="tempIndex" :class="{ font_red: temp == '大' }">{{ temp }}</p>
								</td>
							</tr>
						</tbody>
					</table>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
export default {
	name: 'guanya-luzhu',
	props: ['code', 'date', 'current_number'],
	data() {
		return {
			mainData: null
		};
	},
	watch: {
		date(newData, prevData) {
			uni.showLoading({
				title: 'loading'
			});
			this.getAnalysisDetail();
		},
		current_number(newData, prevData) {
			uni.showLoading({
				title: 'loading'
			});
			this.getAnalysisDetail();
		}
	},
	created: function(e) {
		uni.showLoading({title:'loading'});
		this.getAnalysisDetail();
	},
	methods: {
		getAnalysisDetail() {
			let that = this;
			this.$api.getAnalysisDetail({ code: this.code, type: 'gyhlz', date: this.date }).then(res => {
					uni.hideLoading();
				if (res.code == 0) {
					that.mainData = res.data;
				}else{
					uni.showToast({
	　　　　　　　　　　　　title: "网络异常，请稍后再试",
	　　　　　　　　　　　　icon: 'none'
	　　　　　　　　　　})
				 }
			});
		}
	}
};
</script>
<style lang="scss">
.container {
	padding-top: 5px;
	.content-list {
		color: #989898;
		background: #fff;
		.content-title {
			.title-left {
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
				padding-left: 10px;
				height: 35px;
				line-height: 35px;
				font-size: 12px;
				float: left;
			}
			.title-right {
				height: 35px;
				line-height: 35px;
				padding-left: 0;
				padding-right: 10px;
				float: right;
				text-align: right;
				color: #ef0508;
				font-size: 13px;
			}
		}
		.table-box {
			width: 100%;
			text-align: right;
			overflow-y: hidden;
			overflow-x: auto;
			direction: rtl;
			border-top: 1px solid #dbdbdb;
			border-bottom: 1px solid #dbdbdb;
			margin-bottom: 10px;
			table {
				min-height: 85px;
				border-spacing: 0;
				border-collapse: collapse;
				border: none;
				direction: rtl;
				text-align: center;
				td {
					min-width: 29.7px;
					vertical-align: top;
					padding-bottom: 8px;
					padding-top: 5px;
					border-left: 1px solid #e5e5e5;
					p {
						font-family: 微软雅黑;
						font-size: 12px;
						height: 14px;
						line-height: 14px;
						-webkit-box-sizing: border-box;
						box-sizing: border-box;
					}
					.font_red {
						color: #f12d35 !important;
					}
				}
				td:nth-child(odd) {
					background: #f5f5f5;
				}
			}
		}
	}
}
</style>
