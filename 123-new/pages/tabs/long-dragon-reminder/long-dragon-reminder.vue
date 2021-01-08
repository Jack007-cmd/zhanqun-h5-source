<template name="long-dragon-reminder">
	<view class="container" @touchstart="start" @touchend="end">
		<view class="head">
			只显示
			<text class="chosed" @tap="actionSheetTap">{{ period }}</text>
			期及以上的长龙
			<text class="filter" @click="codeSelect('9999')">筛选</text>
		</view>
		<view class="content">
			<view class="content-title">
				<view class="mode" :class="{ checked: showOpen }" @click="showOpen = !showOpen">连续开出</view>
				<view class="mode" :class="{ checked: !showOpen }" @click="showOpen = !showOpen">连续未开</view>
			</view>
			<view class="table-box">
				<table border="0" cellspacing="1" cellpadding="1">
					<thead>
						<tr v-if="showOpen">
							<th>彩种</th>
							<th>位置</th>
							<th>连开期数</th>
							<th>开奖信息</th>
						</tr>
						<tr v-if="!showOpen">
							<th>彩种</th>
							<th>位置</th>
							<th class="kaiqisho">连续未开期数</th>
							<th>开奖信息</th>
						</tr>
					</thead>
					<tbody>
						<template v-if="showOpen && mainData.list && mainData.list.length > 0">
							<tr v-for="item in mainData.list">
								<td>{{ item.name }}</td>
								<td>{{ item.test }}</td>
								<td>{{ item.number }}期</td>
								<td><div @click="goDestination(item)">查看</div></td>
							</tr>
						</template>
					</tbody>
					<tbody>
						<template v-if="!showOpen && mainData.none && mainData.none.length > 0">
							<tr v-for="item in mainData.none">
								<td>{{ item.name }}</td>
								<td>{{ item.test }}</td>
								<td>{{ item.number }}期</td>
								<td><div @click="goDestination(item)">查看</div></td>
							</tr>
						</template>
					</tbody>
				</table>
			</view>
		</view>
		<view class="u-popup" v-if="showType == 1">
			<view class="u-transition-out" @click="codeSelect('999')"></view>
			<view class="u-transition">
				<view class="u-popup__wrapper-box">
					<view class="u-main">
						<view class="u-title">
							<view class="option-md">选择彩种</view>
							<view class="item-title">
								<!-- <view class="check-item"></view> -->
								<view class="check-item" @click="codeSelect('99')">全选</view>
								<view class="check-item" @click="codeSelect('-1')">取消</view>
							</view>
							<view class="option-md confirm" @click="codeSelect('999')">确定</view>
						</view>
						<view class="u-content">
							<view class="content-nav">
								<view class="list" v-for="(item,index) in lotteryType"  :key="index" :class="{ on: lotteryIndex==index}" @click="setLotteryType(index)">									{{item}}								</view>
							</view>
							<view class="content-item">
								<view class="option" v-for="item in basicArr" :class="{ checked: tempArr.indexOf(item.code) > -1 }" @click="codeSelect(item.code)">
									{{ item.name }}
								</view>
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
	name: 'long-dragon-reminder',
	data() {
		return {
			startData:{clientX:'',clientY:''},
			showOpen: true,
			showType: -1,
			period: 2,
			mainData: { list: [], none: [] },
			basicArr: [],
			codeArr: ['bjpks', 'cqssc', 'jsks', 'xjssc'],
			tempArr: [],
			lotteryType:[], //选择彩种类型
			lotteryIndex:0, //选中下标
			lotterList:[] //彩种类型对应的子彩种
		};
	},
	onNavigationBarButtonTap(e) {
		uni.navigateTo({
			url: '/pages/about-kinds/about-kinds'
		});
	},
	onLoad() {
		// uni.hideTabBar();
		// this.basicArr = uni.getStorageSync('basicArr');
		this.getLongRemind();
		this.getDataCpHallDetail();
	},
	methods: {
		start(e) {
			// this.startData.clientX = e.changedTouches[0].clientX;		
			this.startData.clientY = e.changedTouches[0].clientY;
		},
		end(e) {
			// const subX = e.changedTouches[0].clientX - this.startData.clientX;
			const subY = e.changedTouches[0].clientY - this.startData.clientY;
			if (subY > 50 || subY < -50) {
				if (subY > 50) {
					console.log('下滑');
					uni.showTabBar();
				} else if (subY < -50) {
					uni.hideTabBar();
					console.log('上滑');
				}
			} 
			// else {
			// 	if (subX > 100) {
			// 		console.log('右滑');
			// 	} else if (subX < -100) {
			// 		console.log('左滑');
			// 	} else {
			// 		console.log('无效');
			// 	}
			// }
		},
		codeSelect(num) {
			if (num == '9999') {
				//筛选
				this.tempArr = [...this.codeArr];
				this.showType = 1;
			} else if (num == '999') {
				//确定
				this.codeArr = [...this.tempArr];
				this.getLongRemind();
				this.showType = -1;
			} else if (num == '99') {
				//全选
				this.tempArr = [];
				Object.keys(this.lotterList).forEach(k => {
					Object.keys(this.lotterList[k].child).forEach(x => {
						this.tempArr.push(this.lotterList[k].child[x].code);
					})
				})
				// this.basicArr.forEach(v => {
				// 	this.tempArr.push(v.code);
				// });
			} else if (num == '-1') {
				//取消
				this.tempArr = [];
			} else {
				//选择
				if (this.tempArr.indexOf(num) == -1) {
					this.tempArr.push(num);
				} else {
					this.tempArr.splice(this.tempArr.indexOf(num), 1);
				}
			}
		},
		actionSheetTap() {
			let that = this;
			uni.showActionSheet({
				title: '期数选择',
				itemList: ['2期', '3期', '4期', '5期', '6期', '7期', '8期', '9期', '10期', '11期', '12期', '13期', '14期', '15期'],
				success: e => {
					that.period = e.tapIndex + 2;
					setTimeout(function() {
						that.getLongRemind();
					}, 100);
				}
			});
		},
		goDestination(item) {
			let des = this.$api.getBaseConfig(item.code).des;
			uni.navigateTo({
				url: '/pages/public/' + des + '/' + des + '?name=' + item.name + '&code=' + item.code + '&video_url=' + item.url
			});
		},
		getLongRemind() {
			let that = this;
			that.$api.getLongRemind({ code: that.codeArr, num: that.period }).then(rs => {
				if (rs.code == 0) {
					let temp = [];
					Object.keys(rs.data.result.list).forEach(k => {
						temp.push(rs.data.result.list[k]);
					});
					that.mainData.list = temp;
					temp = [];
					Object.keys(rs.data.result.none).forEach(k => {
						temp.push(rs.data.result.none[k]);
					});
					that.mainData.none = temp;
					// console.log('that.mainData', that.mainData);
				}
			});
		},
		setLotteryType(idx){
			this.lotteryIndex = idx;
			this.basicArr = this.lotterList[idx].child;
		},
		getDataCpHallDetail(){
			let that = this;
			that.$api.getDataCpHallDetail({}).then(rs => {
				if (rs.code == 0) {
					that.lotterList = rs.data;
					Object.keys(rs.data).forEach(k => {
						that.lotteryType.push(rs.data[k].name);
						that.basicArr = rs.data[0].child;
					})
				}
			})
		}
	}
};
</script>

<style lang="scss">
.container {
	padding-bottom: 50px;
	.head {
		padding: 0 10px;
		height: 45px;
		line-height: 45px;
		font-size: 14px;
		color: #666;
		.chosed {
			padding: 0 10px;
			background-color: #fff;
		}
		.filter {
			margin-top: 10px;
			width: 55px;
			text-align: center;
			float: right;
			color: #fff;
			font-size: 14px;
			height: 25px;
			// line-height: 25px;
			border-radius: 12.5px;
			background: #e12121;
			display:flex;
			justify-content:center;
			align-items:center;
			flex-direction:column;
		}
	}
	.content {
		background-color: #fff;
		.content-title {
			display: -webkit-box;
			height: 44px;
			border-bottom: 0.5px solid #dbdbdb;
			position: relative;
			z-index: 0;
			padding-right: 44px;
			.mode {
				padding: 0 20px;
				margin-right: 25px;
				margin-left: 10px;
				line-height: 44px;
				height: 44px;
				text-align: center;
				color: #666;
				font-size: 13px;
				background: 0 0;
				outline: 0;
				border: 0;
				flex: 1;
				display: inline-block;
			}
			.checked {
				color: #e12121;
				border-bottom: 2px solid #e12121;
			}
		}
		.table-box {
			table {
				display: table;
				width: 100%;
				margin-top: 5px;
				background: #e7e7e7;
				text-align: center;
				th {
					width: 25%;
					height: 33px;
					line-height: 33px;
					background: #e7e7e7;
					text-align: center;
					color: #000;
					font-size: 12px;
				}
				tr {
					height: 24px;
					line-height: 24px;
					color: #666;
					td {
						font-size: 12px;
						white-space: nowrap;
						background: #fff;
					}
					td:first-child {
					    padding-left: 10px;
					    text-align: left;
					}
					td:nth-child(2) {
					    padding-left: 10px;
					    text-align: left;
					}
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
	height: 88rpx;
	background:linear-gradient(0deg,rgba(246,246,246,1),rgba(255,255,255,1));
	border-bottom: 1px solid #E5E5E5;
	.option-md {
		height:54rpx;
		color: #666666;
		float: right;
		margin: 18rpx 30rpx 0 0;
		font-size:24rpx;
		display:flex;
		justify-content:center;
		align-items:center;
		flex-direction:column;
	}
	.option-md:first-child {
		float: left;
		margin: 18rpx 0 0 30rpx;
		font-size:26rpx;
	}
	.option-md.confirm{
		width:108rpx;
		border-radius:4rpx;
		background:#E83F46;
		color: #FFFFFF;
	}
	.item-title {
		text-align: center;
		float: left;
		.check-item {
			float: left;
			display: inline-block;
			font-size:24rpx;
			color: #666666;
			width:108rpx;
			height:54rpx;
			border: 1px solid #D5D5D5;
			border-radius:6rpx;
			margin-top: 18rpx;
			display:flex;
			justify-content:center;
			align-items:center;
			flex-direction:column;
		}
		.check-item:first-child {
			margin: 18rpx 12rpx 0 34rpx;
		}
	}
}

.u-content {
	height: 608rpx;
	overflow: hidden;	box-sizing: border-box;
	.content-nav{
		width: 142rpx;
		height: 100%;
		float: left;
		background:#F1F1F1;
		.list{
			width:100%;
			height:80rpx;
			line-height: 80rpx;
			font-size: 26rpx;
			font-weight:400;
			color: #444444;
			text-align: center;
			display:flex;
			justify-content:center;
			align-items:center;
			flex-direction:column;
			border-left: 2rpx solid #F1F1F1;
			box-sizing: border-box;
			overflow: hidden;
		}
		.list.on{
			background: #FFFFFF;
			color: #E83F46;
			border-left: 2rpx solid #E83F46;
		}
	}
	.content-item {		
		width: 608rpx;
		height: 608rpx;
		overflow-y: scroll;
		display: flex;
		flex-wrap: wrap;
		justify-content:space-between;
		align-items: flex-start;
		align-content: flex-start;
		padding: 0 20rpx 100rpx;
		// margin-bottom: 10px;
		float: left;
		.option {
		    color: #666;
		    text-align: center;
		    // float: left;
		    width: 178rpx;
		    height: 60rpx;
		    font-size: 24rpx;
		    border: 1px solid #e4e3e8;
		    margin-top: 10px;
		    -webkit-border-radius: 3px;
			border-radius: 4rpx;
		    display: inline-block;
		    -webkit-box-sizing: border-box;
		    box-sizing: border-box;
			display:flex;
			justify-content:center;
			align-items:center;
			flex-direction:column;
		}
		.checked {
			border-color: #e12121;
			color: #e12121;
			position: relative;
		}
	}
  .content-item:after{
	content: '';
	width: 178rpx;
	border:1px solid transparent;
  }
}
</style>
