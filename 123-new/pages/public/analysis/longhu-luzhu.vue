<template name="longhu-luzhu">
	<view class="container">
		<view class="desc"><view class="check-click" @tap.stop="choseCon(1)">筛选</view></view>
		<template v-for="(item, index) in mainData">
			<view :key="index" class="content-list" v-if="filterRs.indexOf(index.toString()) != -1">
				<view class="content-title">
					<view class="title-left">今日累计：龙（{{ item.dragon }}）虎（{{ item.tiger }}）</view>
					<view class="title-right">
						{{ index == 0 ? '冠军' : index == 1 ? '亚军' : index == 2 ? '第三名' : index == 3 ? '第四名' : '第五名' }}&nbsp;&nbsp;龙虎&nbsp;&nbsp;最新&nbsp;&nbsp;↓
					</view>
				</view>
				<view class="table-box">
					<table @touchstart.stop @touchend.stop border="0" cellpadding="1" cellspacing="1">
						<tbody>
							<tr class="tablebox">
								<td v-for="(temp, tempIndex) in item.list" :key="tempIndex">
									<p v-for="(a, aIndex) in temp" :key="aIndex" :class="{ font_red: a == '龙' }">{{ a }}</p>
								</td>
							</tr>
						</tbody>
					</table>
				</view>
			</view>
		</template>

		<view class="u-popup" v-if="showFilter == 1">
			<view class="u-transition-out" @tap.stop="choseCon(-1)"></view>
			<view class="u-transition">
				<view class="u-popup__wrapper-box">
					<view class="u-main">
						<view class="u-title">
							<view class="option-md">筛选选择</view>
							<view class="option-md" @tap.stop="choseCon(-1)">取消</view>
							<view class="option-md" @tap.stop="choseCon()">确定</view>
						</view>
						<view class="u-content">
							<view class="item-title">
								<view class="check-item">筛选名次：</view>
								<view class="check-item" @tap.stop="checkOne('999')">全选</view>
								<view class="check-item" @tap.stop="checkOne('-1')">清空</view>
							</view>
							<view class="content-item">
								<view class="option" :class="{ checked: tempRs.indexOf('0') > -1 }" @tap.stop="checkOne('0')">冠军</view>
								<view class="option" :class="{ checked: tempRs.indexOf('1') > -1 }" @tap.stop="checkOne('1')">亚军</view>
								<view class="option" :class="{ checked: tempRs.indexOf('2') > -1 }" @tap.stop="checkOne('2')">第三</view>
								<view class="option" :class="{ checked: tempRs.indexOf('3') > -1 }" @tap.stop="checkOne('3')">第四</view>
								<view class="option" :class="{ checked: tempRs.indexOf('4') > -1 }" @tap.stop="checkOne('4')">第五</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'longhu-luzhu',
	props: ['code', 'date', 'current_number'],
	data() {
		return {
			mainData: [],
			allSet: ['0', '1', '2', '3', '4'],
			filterRs: '0, 1, 2, 3, 4',
			tempRs: '',
			showFilter: -1
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
		checkOne(m) {
			if (m == '999') {
				this.tempRs = this.allSet.toString();
			} else if (m == '-1') {
				this.tempRs = '';
			} else {
				if (this.tempRs.indexOf(m) == -1) {
					this.tempRs += m;
				} else {
					this.tempRs = this.tempRs.replace(m, '');
				}
			}
		},
		choseCon(n) {
			if (n == 1) {
				this.tempRs = this.filterRs;
				this.showFilter = 1;
			} else if (n == -1) {
				this.tempRs = '';
				this.showFilter = -1;
			} else {
				this.filterRs = this.tempRs;
				this.showFilter = -1;
			}
		},
		getAnalysisDetail() {
			let that = this;
			this.$api.getAnalysisDetail({ code: this.code, type: 'lfrz', date: this.date }).then(res => {
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
	.desc {
		height: 35px;
		line-height: 35px;
		font-size: 12px;
		background-color: #fff;
		display: -webkit-inline-box;
		width: 100%;
		border-bottom: 1px solid #dbdbdb;
		.check-click {
			color: #666;
			font-size: 14px;
			line-height: 35px;
			padding-left: 10px;
		}
	}
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

.u-title {
	line-height: 30px;
	font-size: 12px;
	text-align: center;
	display: inline-block;
	.option-md {
		padding: 15px;
		height: 20px;
		font-size: 14px;
		color: red;
		float: right;
	}
	.option-md:first-child {
		float: left;
	}
}

.u-content {
	.item-title {
		display: flex;
		.check-item {
			font-size: 14px;
			margin-right: 30px;
			color: #7c7c7c;
			margin-left: 20px;
		}
	}
	.content-item {
		display: flex;
		flex-wrap: wrap;
		padding: 0 15px;
		margin-bottom: 10px;
		.option {
			text-align: center;
			float: left;
			width: 22%;
			height: 30px;
			font-size: 14px;
			line-height: 30px;
			margin-right: 2%;
			border: 1px solid #e4e3e8;
			margin-top: 10px;
			border-radius: 3px;
			display: inline-block;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
		}
		.checked {
			border-color: #e12121;
			color: #e12121;
			position: relative;
		}
	}
}
</style>
