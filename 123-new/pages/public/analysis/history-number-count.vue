<template name="history-number-count">
	<view class="container" v-if="mainData">
		<view class="navTab" v-if="codeType != 4">
			<view class="nav-item" :class="{checked:filter==0}" @tap.stop="filter=0">号码查看</view>
			<view class="nav-item" :class="{ checked: filter == 1 }" @tap.stop="filter = 1">形态查看</view>
		</view>
		
		<template v-if="filter==0">
			<view class="table-box" v-if="codeType==1||codeType==2">
				<table border="0" cellspacing="1" cellpadding="1">
					<thead v-if="codeType == 1 || codeType==2">
						<tr>
							<th>日期</th>
							<th>0</th>
							<th>1</th>
							<th>2</th>
							<th>3</th>
							<th>4</th>
							<th>5</th>
							<th>6</th>
							<th>7</th>
							<th>8</th>
							<th>9</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in mainData.basic">
							<td>{{item.day}}</td>
							<td v-for="(temp,tempIndex) in item.number">{{temp}}</td>
						</tr>
					</tbody>
				</table>
			</view>
			<view class="table-box" v-if="codeType==4">
				<table border="0" cellspacing="1" cellpadding="1">
					<thead>
						<tr>
							<th>日期</th>
							<th>1</th>
							<th>2</th>
							<th>3</th>
							<th>4</th>
							<th>5</th>
							<th>6</th>
							<th>大</th>
							<th>小</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in mainData.basic">
							<td>{{item.day}}</td>
							<td v-for="(temp,tempIndex) in item.number">{{temp}}</td>
						</tr>
					</tbody>
				</table>
			</view>
			<view class="table-box" v-if="codeType==3" @touchstart.stop @touchend.stop>
				 <table border="0" cellspacing="1" cellpadding="1">
					<thead>
					<tr>
					  <th rowspan="2">日期</th>
					  <th colspan="31">1--20分布<span>（左右滑动查看）</span></th>
					</tr>
					<tr>
					  <th>01</th>
					  <th>02</th>
					  <th>03</th>
					  <th>04</th>
					  <th>05</th>
					  <th>06</th>
					  <th>07</th>
					  <th>08</th>
					  <th>09</th>
					  <th>10</th>
					  <th>11</th>
					  <th>12</th>
					  <th>13</th>
					  <th>14</th>
					  <th>15</th>
					  <th>16</th>
					  <th>17</th>
					  <th>18</th>
					  <th>19</th>
					  <th>20</th>
					</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in mainData.basic">
							<td style="width:16%;">{{item.day}}</td>
							<td v-for="(temp,tempIndex) in item.number">{{temp}}</td>
						</tr>
					</tbody>
			 </table>
			</view>
		</template>
			
		<view class="table-box" v-else>
			<table border="0" cellspacing="1" cellpadding="1">
				<thead v-if="codeType == 1 || codeType == 2 ||codeType==3">
					<tr>
						<th>日期</th>
						<th>单</th>
						<th>双</th>
						<th>大</th>
						<th>小</th>
						<th>龙</th>
						<th>虎</th>
						<th v-if="codeType == 1">平</th>
						<th v-if="codeType == 2">和</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in mainData.pattern">
						<td>{{item.day}}</td>
						<td>{{item.single}}</td>
						<td>{{item.double}}</td>
						<td>{{item.big}}</td>
						<td>{{item.little}}</td>
						<td>{{item.dragon}}</td>
						<td>{{item.tiger}}</td>
						<td v-if=" codeType != 3">{{item.and}}</td>
					</tr>
				</tbody>
			</table>
		</view>	
	</view>
</template>

<script>
export default {
	name: 'history-number-count',
	props: ['code', 'date', 'current_number'],
	data() {
		return {
			mainData: null,
			filter: 0,
			codeType: -1
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
		const allTypes = uni.getStorageSync('analysisKinds')['lshmtj'];
		if (allTypes['type1'].indexOf(this.code) != -1) {
			this.codeType = 1;
		} else if (allTypes['type2'].indexOf(this.code) != -1) {
			this.codeType = 2;
		} else if (allTypes['type3'].indexOf(this.code) != -1) {
			this.codeType = 3;
		} else if (allTypes['type4'].indexOf(this.code) != -1) {
			this.codeType = 4;
		}
		console.log("this.codeType:"+this.codeType);
		this.getAnalysisDetail();
	},
	methods: {
		getAnalysisDetail() {
			let that = this;
			this.$api.getAnalysisDetail({ code: this.code, type: 'lshmtj', date: this.date }).then(res => {
				uni.hideLoading();
				if (res.code == 0) {
					that.mainData = {};
					let pattern = [];
					let basic = [];
					Object.keys(res.data.basic).forEach(function(k) {
						let temp = res.data.basic[k];
						let rs = [];
						if (typeof temp == 'object' && temp.constructor != Array) {
							Object.keys(temp).forEach(function(key) {
								rs.push(temp[key]);
							});
							if (that.codeType == 4) {
								rs.push(res.data.size[k]['big']);
								rs.push(res.data.size[k]['little']);
							}
							temp = rs;
						}
						basic.push({ day: k, number: temp });
						if (that.codeType != 4) {
							pattern.push(Object.assign({ day: k }, res.data.oddEven[k], res.data.size[k], res.data.pred[k]));
						}
					});
					that.mainData.basic = basic;
					that.mainData.pattern = pattern;
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
	.navTab {
		padding-left: 10px;
		padding-right: 10px;
		box-sizing: border-box;
		height: auto;
		width: 100%;
		border-bottom: 1px solid #dbdbdb;
		background: #fff;
		text-align: center;
		.nav-item {
			display: inline-block;
			height: 100%;
			line-height: 44px;
			text-align: center;
			color: #666;
			font-size: 13px;
			width: 35%;
		}
		.checked {
			border-bottom: 1px solid #e12121;
		}
	}
	.table-box {
		overflow-x: scroll;
		table {
			width: 100%;
			thead {
				th {
					height: 33px;
					line-height: 33px;
					text-align: center;
					background-color: #f0f0f0;
					color: #666;
					font-size: 12px;
					font-weight: 400;
				}
			}
			tbody {
				td {
					text-align: center;
					font-size: 12px;
					color: #666;
					background-color: #fff;
				}
			}
		}
	}
}
</style>
