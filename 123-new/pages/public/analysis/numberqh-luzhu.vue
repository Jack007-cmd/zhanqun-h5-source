<template name="numberqh-luzhu">
	<view class="container">
		<view class="desc"><view class="check-click" @tap.stop="choseCon(200)">筛选</view></view>
		<template v-for="(item, index) in mainData">
			<view :key="index" class="content-list" v-if="filterRs.indexOf(index.toString()) != -1">
				<view class="content-title">
					<view class="title-left">今日累计：前（{{ item.front }}）后（{{ item.back }}）</view>
					<view class="title-right">号码{{ index + 1 }}&nbsp;&nbsp;前后&nbsp;&nbsp;最新&nbsp;&nbsp;↓</view>
				</view>
				<view class="table-box">
					<table @touchstart.stop @touchend.stop border="0" cellpadding="1" cellspacing="1">
						<tbody>
							<tr class="tablebox">
								<td v-for="(temp, tempIndex) in item.list" :key="tempIndex">
									<p v-for="(a, aIndex) in temp" :key="aIndex" :class="{ font_red: a == '前' }">{{ a }}</p>
								</td>
							</tr>
						</tbody>
					</table>
				</view>
			</view>
		</template>
		
		<view class="u-popup" v-if="showFilter == 200">
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
								<view class="check-item" @tap.stop="checkOne('99')">全选</view>
								<view class="check-item" @tap.stop="checkOne('-9')">清空</view>
							</view>
								<view class="content-item">
									<view class="option" :class="{ checked: tempRs.indexOf('0') > -1 }" @tap.stop="checkOne('0')">号码1</view>
									<view class="option" :class="{ checked: tempRs.indexOf('1') > -1 }" @tap.stop="checkOne('1')">号码2</view>
									<view class="option" :class="{ checked: tempRs.indexOf('2') > -1 }" @tap.stop="checkOne('2')">号码3</view>
									<view class="option" :class="{ checked: tempRs.indexOf('3') > -1 }" @tap.stop="checkOne('3')">号码4</view>
									<view class="option" :class="{ checked: tempRs.indexOf('4') > -1 }" @tap.stop="checkOne('4')">号码5</view>
									<view class="option" :class="{ checked: tempRs.indexOf('5') > -1 }" @tap.stop="checkOne('5')">号码6</view>
									<view class="option" :class="{ checked: tempRs.indexOf('6') > -1 }" @tap.stop="checkOne('6')">号码7</view>
									<view class="option" :class="{ checked: tempRs.indexOf('7') > -1 }" @tap.stop="checkOne('7')">号码8</view>
									<view class="option" :class="{ checked: tempRs.indexOf('8') > -1 }" @tap.stop="checkOne('8')">号码9</view>
									<view class="option" :class="{ checked: tempRs.indexOf('9') > -1 }" @tap.stop="checkOne('9')">号码10</view>
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
	name: 'numberqh-luzhu',
	props: ['code', 'date', 'current_number'],
	data() {
		return {
			mainData: [],
			allRs: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			filterRs: '0, 1, 2, 3, 4, 5, 6, 7, 8, 9',
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
		checkOne(n) {
			if (n == '-9') {
				//清空
				this.tempRs = '';
			} else if (n == '99') {
				//全选
				this.tempRs = this.allRs.toString();
			} else {
				if (this.tempRs.indexOf(n) > -1) {
					this.tempRs = this.tempRs.replace(n, '');
				} else {
					this.tempRs += n;
				}
			}
		},
		choseCon(n) {
			if (n == 200) {
				this.tempRs = this.filterRs;
				this.showFilter = 200;
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
			this.$api.getAnalysisDetail({ code: this.code, type: 'fmqhlz', date: this.date }).then(res => {
					uni.hideLoading();
				if (res.code == 0) {
					console.log(res)
					Object.keys(res.data).forEach(function(k) {
						that.mainData.push(res.data[k]);
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
	padding-top: 5px;
	.desc{
		height: 35px;
		line-height: 35px;
		font-size: 12px;
		background-color: #fff;
		display: -webkit-inline-box;
		width: 100%;
		border-bottom: 1px solid #dbdbdb;
		.check-click{
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
