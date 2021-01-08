<template name="dldragon-count">
	<view class="container">
		<view class="count-list">
			<view class="count-item" v-for="(item, index) in list" :key="index">
				{{ item.rank }}:{{ item.type }}
				<view class="red-issue">{{ item.num }}</view>
				期
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'dldragon-count',
	props: ['code', 'date', 'current_number'],
	data() {
		return {
			list: []
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
			this.$api.getAnalysisDetail({ code: this.code, type: 'jskj', date: this.date }).then(res => {
					uni.hideLoading();
				if (res.code == 0) {
					this.list = res.data.longRemind;
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
	padding-top: 10px;
	.count-list {
		text-align: center;
		display: list-item;
		.count-item {
			display: inline-block;
			background-color: #ffffff;
			text-align: center;
			width: 224rpx;
			height: 88rpx;
			line-height: 88rpx;
			margin: 10rpx;
			color: #666;
			font-size: 13px;
			border-radius: 2px;
			.red-issue {
				font-size: 13px;
				color:#f11821;
				display: inline-block;
			}
		}
	}
}
</style>
