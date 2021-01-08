<template name="ds-count">
	<view class="count-container" v-if="mainData">
		<view class="count-list" v-if="codeType == 2 || codeType == 4">
			<view class="count-title head1">号码出现次数</view>
			<view class="count-detail">
				<table cellpadding="0" cellspacing="0" border="0">
					<tbody>
						<tr v-if="codeType == 2" class="tr1">
							<td>0</td>
							<td>1</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
							<td>5</td>
							<td>6</td>
							<td>7</td>
							<td>8</td>
							<td>9</td>
						</tr>
						<tr v-if="codeType == 4" class="tr1">
							<td>1</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
							<td>5</td>
							<td>6</td>
							<td>7</td>
							<td>8</td>
							<td>9</td>
							<td>10</td>
							<td>11</td>
						</tr>
						<tr class="tr2">
							<template v-if="mainData.up">
								<td v-for="up in mainData.up">{{ up }}</td>
							</template>
						</tr>
					</tbody>
				</table>
			</view>
		</view>

		<template v-if="mainData.down">
			<view class="count-list" v-for="(item, index) of mainData.down" :key="'ds'+index">
				<view :class="{ head1: index == 0, head2: index == 1 }" class="count-title" v-if="codeType == 2 || codeType == 4">
					{{
						index == 0
							? '第一球'
							: index == 1
							? '第二球'
							: index == 2
							? '第三球'
							: index == 3
							? '第四球'
							: index == 4
							? '第五球'
							: index == 5
							? '第六球'
							: index == 6
							? '第七球'
							: '第八球'
					}}
				</view>
				<view class="count-title" :class="{ head1: index == 0, head2: index == 1 }" v-if="codeType == 3">
					{{
						index == 0
							? '第一球'
							: index == 1
							? '第二球'
							: index == 2
							? '第三球'
							: index == 3
							? '第四球'
							: index == 4
							? '第五球'
							: index == 5
							? '第六球'
							: index == 6
							? '第七球'
							: '第八球'
					}}
				</view>
				<view :class="{ head1: index == 0, head2: index == 1 }" class="count-title" v-if="codeType == 1">
					{{
						index == 0
							? '冠军'
							: index == 1
							? '亚军'
							: index == 2
							? '第三名'
							: index == 3
							? '第四名'
							: index == 4
							? '第五名'
							: index == 5
							? '第六名'
							: index == 6
							? '第七名'
							: index == 7
							? '第八名'
							: index == 8
							? '第九名'
							: '第十名'
					}}
				</view>
				<view class="count-detail">
					<table cellpadding="0" cellspacing="0" border="0">
						<tbody>
							<tr class="tr1">
								<td>单</td>
								<td>双</td>
								<td>大</td>
								<td>小</td>
							</tr>
							<tr class="tr2">
								<td>{{ item.single }}</td>
								<td>{{ item.double }}</td>
								<td>{{ item.big }}</td>
								<td>{{ item.little }}</td>
							</tr>
						</tbody>
					</table>
				</view>
			</view>
			<view class="count-list">
				<view class="count-title" v-if="codeType != 1">总和</view>
				<view class="count-title" v-if="codeType == 1">冠亚和</view>
				<view class="count-detail">
					<table cellpadding="0" cellspacing="0" border="0">
						<tbody>
							<tr class="tr1">
								<td>单</td>
								<td>双</td>
								<td>大</td>
								<td>小</td>
							</tr>
							<tr class="tr2">
								<td>{{ mainData.total.single }}</td>
								<td>{{ mainData.total.double }}</td>
								<td>{{ mainData.total.big }}</td>
								<td>{{ mainData.total.litter }}</td>
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
	name: 'ds-count',
	props: ['code', 'date', 'current_number'],
	data() {
		return {
			mainData: null,
			codeType: 1
		};
	},
	created: function(e) {
		const allTypes = uni.getStorageSync('analysisKinds')['lmsjtj'];
		if (allTypes['type1'].indexOf(this.code) != -1) {
			this.codeType = 1;
		} else if (allTypes['type2'].indexOf(this.code) != -1) {
			this.codeType = 2;
		} else if (allTypes['type3'].indexOf(this.code) != -1) {
			this.codeType = 3;
		} else if (allTypes['type4'].indexOf(this.code) != -1) {
			this.codeType = 4;
		}
		uni.showLoading({title:'loading'});
		this.getAnalysisDetail();
	},
	methods: {
		getAnalysisDetail() {
			let that = this;
			this.$api.getAnalysisDetail({ code: this.code, type: 'lmsjtj', date: this.date, extra: 'rank=0' }).then(res => {
				uni.hideLoading();
				if (res.code == 0) {
					that.mainData = res.data;
					if (res.data.up) {
						if (!(typeof res.data.up && res.data.up.constructor == Array)) {
							let up = [];
							Object.keys(res.data.up).forEach(function(k) {
								up.push(res.data.up[k]);
							});
							that.mainData.up = up;
						}
					}
					// loading.dismiss();
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
.count-container {
	.count-list {
		margin: 10px 0;
		padding: 0 10px;
		.count-title {
			color: #ffffff;
			text-align: center;
			height: 72rpx;
			line-height: 72rpx;
			border-radius: 4px;
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
			background: #9da9c2;
		}

		.head1 {
			background: #e12121;
		}

		.head2 {
			background: #2eaae8;
		}

		.count-detail {
			background-color: #fff;
			display: flex;
			flex-wrap: wrap;
			table {
				width: 100%;
				td {
					height: 72rpx;
					text-align: center;
					border: 1px solid #e6e6e6;
					color: #666;
					border-width: 1px 1px 0 0;
				}
			}
		}
	}
}
</style>
