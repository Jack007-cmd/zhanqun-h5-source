<template name="longhu-count">
	<view class="container">
		<table border="0" cellspacing="1" cellpadding="1">
			<thead>
				<tr>
					<th rowspan="2" width="100">日期</th>
					<th colspan="2">冠军</th>
					<th colspan="2">亚军</th>
					<th colspan="2">第三</th>
					<th colspan="2">第四</th>
					<th colspan="2">第五</th>
				</tr>
				<tr>
					<th width="33">龙</th>
					<th width="33">虎</th>
					<th width="33">龙</th>
					<th width="33">虎</th>
					<th width="33">龙</th>
					<th width="33">虎</th>
					<th width="33">龙</th>
					<th width="33">虎</th>
					<th width="33">龙</th>
					<th width="33">虎</th>
				</tr>
			</thead>
			<tbody v-if="mainData.length>0">
				<tr v-for="(item, itemIndex) in mainData" >
					<td style="height: 33px;">{{ item.day }}</td>
					<template v-for="(temp, tempIndex) in item.list">
						<td >{{ temp.dragon }}</td>
						<td >{{ temp.tiger }}</td>
					</template>
				</tr>
			</tbody>
		</table>
	</view>
</template>

<script>
export default {
	name: 'longhu-count',
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
			this.$api.getAnalysisDetail({ code: this.code, type: 'lftj', date: this.date }).then(res => {
					uni.hideLoading();
				if (res.code == 0) {
					Object.keys(res.data).forEach(function(key) {
						let item = {};
						item.day = key;
						item.list = res.data[key];
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
	table {
		display: table;
		width: 100%;
		background: #e5e5e5;
		text-align: center;
		font-size: 12px;
		thead {
			th {
				height: 33px;
				line-height: 33px;
				background: #f0f0f0;
				text-align: center;
			}
		
		}
		tbody{
			td {
				font-size: 10px;
				height: 33px;
				color: #666;
				background: #fff;
			}
			td:first-child {
				white-space: nowrap;
			}
		}
	}
}
</style>
