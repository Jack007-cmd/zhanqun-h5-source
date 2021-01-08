<template name="guanya-sm-history">
	<view class="container">
		<table border="0" cellspacing="1" cellpadding="1">
			<thead>
				<tr>
					<th width="30%">日期</th>
					<th width="15%">大</th>
					<th width="15%">小</th>
					<th width="15%">单</th>
					<th width="15%">双</th>
				</tr>
			</thead>
			<tbody>
				<tr height="30" v-for="(item, index) in mainData" :key="index">
					<td>{{ item.day }}</td>
					<td>{{ item.detail.big }}</td>
					<td>{{ item.detail.litter }}</td>
					<td>{{ item.detail.single }}</td>
					<td>{{ item.detail.double }}</td>
				</tr>
			</tbody>
		</table>
	</view>
</template>

<script>
export default {
	name: 'guanya-sm-history',
	props: ['code', 'date', 'current_number'],
	data() {
		return {
			mainData: []
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
			this.$api.getAnalysisDetail({ code: this.code, type: 'gyhlmls', date: this.date }).then(res => {
					uni.hideLoading();
				if (res.code == 0) {
					Object.keys(res.data).forEach(function(k) {
						let item = {};
						item.day = k;
						item.detail = res.data[k];
						that.mainData.push(item);
					});
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
	table {
		display: table;
		width: 100%;
		background: #e5e5e5;
		text-align: center;
		thead {
			th {
				font-size: 12px;
				height: 33px;
				line-height: 33px;
				background: #f0f0f0;
				text-align: center;
				color: #666;
			}
		}
		tbody {
			td {
				font-size: 12px;
				background: #fff;
				color: #666;
			}
		}
	}
}
</style>
