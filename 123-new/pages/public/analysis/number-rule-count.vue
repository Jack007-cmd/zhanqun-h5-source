<template name="number-rule-count">
	<view class="container" v-if="mainData">
		<view class="container-head">
			<view class="num-list">
				<view class="num-item" :class="{ checked: rank == 1 }" @tap.stop="rankCheck(1)">1</view>
				<view class="num-item" :class="{ checked: rank == 2 }" @tap.stop="rankCheck(2)">2</view>
				<view class="num-item" :class="{ checked: rank == 3 }" @tap.stop="rankCheck(3)">3</view>
				<view class="num-item" :class="{ checked: rank == 4 }" @tap.stop="rankCheck(4)">4</view>
				<view class="num-item" :class="{ checked: rank == 5 }" @tap.stop="rankCheck(5)">5</view>
				<view class="num-item" :class="{ checked: rank == 6 }" @tap.stop="rankCheck(6)">6</view>
				<view class="num-item" :class="{ checked: rank == 7 }" @tap.stop="rankCheck(7)">7</view>
				<view class="num-item" :class="{ checked: rank == 8 }" @tap.stop="rankCheck(8)">8</view>
				<view class="num-item" :class="{ checked: rank == 9 }" @tap.stop="rankCheck(9)">9</view>
				<view class="num-item" :class="{ checked: rank == 10 }" @tap.stop="rankCheck(10)">10</view>
			</view>
			<view class="btn-list">
				<view class="btn-item" :class="{ checked: modeType == 0 }" @tap.stop="switchMode(0)">图表</view>
				<view class="btn-item" :class="{ checked: modeType == 1 }" @tap.stop="switchMode(1)">数据</view>
				<view class="today-btn" @tap="actionSheetTap()">{{ tPeriods == 2000 ? '当天' : tPeriods == 30 ? '近30期' : tPeriods == 60 ? '近60期' : '近90期' }}</view>
			</view>
		</view>
		<view class="content">
			<view class="table-list" v-if="modeType == 0">
				<view class="table-title">号码&nbsp;&nbsp;次数</view>
				<view class="table-item" v-for="(ap, index) in mainData.appear" :key="index">
					<view class="codenum">{{ (index < 9 ? '0' : '') + (index + 1) }}</view>
					<view class="frequency" :style="{ width: (ap / mainData.max) * 85 + '%' }">{{ ap }}</view>
				</view>
			</view>
			<view class="data-list" v-if="modeType == 1">
				<view class="navTab">
					<view class="navItem">期号&nbsp;&nbsp;/&nbsp;&nbsp;时间</view>
					<view class="navItem" :class="{ checked: radio == 0 }" @tap.stop="switchRadio(0)">号码分布</view>
					<view class="navItem" :class="{ checked: radio == 1 }" @tap.stop="switchRadio(1)">大小单双</view>
				</view>
				<view class="content-box" v-if="radio == 1">
					<view class="content-list" v-for="(item, index) in mainData.list" :key="index">
						<view class="content-item">{{ item.no.toString().substring(2) }}&nbsp;{{ item.time.substring(5, 16) }}</view>
						<view class="content-item">{{ item.on }}</view>
						<view class="content-item" :class="{ red: item.trend == '升' }">{{ item.trend }}</view>
						<view class="content-item" :class="{ red: item.double == 1 }">{{ item.double == 1 ? '双' : '单' }}</view>
						<view class="content-item" :class="{ red: item.big == 1 }">{{ item.big == 1 ? '大' : '小' }}</view>
					</view>
				</view>
				<view class="table-box" v-if="radio == 0" id="chartLinediv">
					<table border="0" cellspacing="1" cellpadding="1">
						<tbody>
							<tr v-for="(item, index) in mainData.list" :key="index">
								<td style="width:38%;white-space: nowrap;">{{ item.no.toString().substring(2) }}&nbsp;&nbsp;{{ item.time.substring(5, 16) }}</td>
								<td v-for="(num, nIndex) in item.num" :key="nIndex" :class="{ hot: num == item.on }">
									<view
										class="defalut_circle"
										:class="{
											lineBall1: num == 1 && item.on == 1,
											lineBall2: num == 2 && item.on == 2,
											lineBall3: num == 3 && item.on == 3,
											lineBall4: num == 4 && item.on == 4,
											lineBall5: num == 5 && item.on == 5,
											lineBall6: num == 6 && item.on == 6,
											lineBall7: num == 7 && item.on == 7,
											lineBall8: num == 8 && item.on == 8,
											lineBall9: num == 9 && item.on == 9,
											lineBall10: num == 10 && item.on == 10
										}"
									>
										{{ Number(num) }}
									</view>
								</td>
							</tr>
						</tbody>
					</table>
				</view>
				<view id="chartbottom"></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'number-rule-count',
	props: ['code', 'date', 'current_number'],
	data() {
		return {
			showFilter: -1,
			mainData: null,
			modeType: 0, //0图表 1数据
			tPeriods: 30,
			rank: 1, //第一球
			radio: 0 //0号码分布 1单双大小
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
		uni.showLoading({ title: 'loading' });
		this.getAnalysisDetail();
		$('canvas').remove();
		this.lineToChart();
	},
	methods: {
		switchRadio(m) {
			let that = this;
			if (that.radio == m) return;
			that.radio = m;
			if (that.modeType == 1 && m == 0) {
				setTimeout(function() {
					that.lineToChart();
				}, 100);	
			}else{
				$('canvas').remove();
			}
		},
		switchMode(n) {
			let that = this;
			if (that.modeType == n) return;
			that.modeType = n;
			if (n == 1 && that.radio == 0) {
				setTimeout(function() {
					that.lineToChart();
				}, 100);				
			}else{
				$('canvas').remove();
			}
		},
		lineToChart() {
			if (document.getElementsByClassName('hot').length < 2) {
				return;
			}
			for (let i = 1; i < document.getElementsByClassName('hot').length; i++) {
				this.line(document.getElementsByClassName('hot')[i - 1], document.getElementsByClassName('hot')[i], 1, '#0092e0');
			}
		},
		//画直线方法：起始元素、终止元素、线宽、颜色
		line(header, footer, line_width, line_color) {
			let xstart = 4;
			let xpos = 4;
			let ypos = 30;
			let canvas = document.createElement('canvas');
			canvas.style.position = 'absolute';
			canvas.style.visibility = 'visible';
			canvas.height = 30;
			if (header.offsetLeft < footer.offsetLeft) {
				canvas.style.top = 15 + header.offsetTop + 'px';
				canvas.style.left = 14 + header.offsetLeft + 'px';
				canvas.width = footer.offsetLeft - header.offsetLeft;
				xpos = footer.offsetLeft - header.offsetLeft - 14;
			} else if (header.offsetLeft == footer.offsetLeft) {
				xstart = 2;
				xpos = 2;
				ypos = 15;
				canvas.height = 13;
				canvas.style.top = 25 + header.offsetTop + 'px';
				canvas.style.left = 7 + header.offsetLeft + 'px';
				canvas.width = 10;
			} else {
				canvas.style.top = 15 + header.offsetTop + 'px';
				canvas.style.left = 14 + footer.offsetLeft + 'px';
				canvas.width = header.offsetLeft - footer.offsetLeft;
				xstart = header.offsetLeft - footer.offsetLeft - 14;
			}
			let ctx = canvas.getContext('2d');
			ctx.fill();
			ctx.lineWidth = line_width;
			ctx.strokeStyle = line_color;
			ctx.beginPath();
			ctx.moveTo(xstart, 0);
			ctx.lineTo(xpos, ypos);
			ctx.stroke();
			ctx.closePath();
			document.getElementById('chartLinediv').appendChild(canvas);
		},

		actionSheetTap() {
			let that = this;
			uni.showActionSheet({
				title: '期数选择',
				itemList: ['当天', '近30期', '近60期', '近90期'],
				success: e => {
					let temp = [2000, 30, 60, 90];
					that.tPeriods = temp[e.tapIndex];
					setTimeout(function() {
						uni.showLoading({ title: 'loading' });
						that.getAnalysisDetail();
						if (that.modeType == 1 && that.radio == 0) {
							setTimeout(function() {
								that.lineToChart();
							}, 300);				
						}
					}, 100);
				}
			});
		},
		rankCheck(r) {
			let that = this;
			if (that.rank == r) {
				return;
			}
			that.rank = r;
			uni.showLoading({ title: 'loading' });
			that.getAnalysisDetail();
			$('canvas').remove();
			if (that.modeType == 1 && that.radio == 0) {
				setTimeout(function() {
					that.lineToChart();
				}, 300);				
			}
		},
		getAnalysisDetail() {
			let that = this;
			let extra = 'rank=' + that.rank + (that.tPeriods > 90 ? '' : '&limit=' + that.tPeriods);
			this.$api.getAnalysisDetail({ code: this.code, type: 'hmgltj', date: this.date, extra: extra }).then(res => {
					uni.hideLoading();
				if (res.code == 0) {
					that.mainData = {};
					res.data.list.forEach(v => {
						v.on = Number(v.on);
					});
					that.mainData.list = res.data.list;
					let appear = [];
					Object.keys(res.data.appear).forEach(function(k) {
						appear.push(res.data.appear[k]);
					});
					that.mainData.appear = appear;
					that.mainData.max = Math.max.apply(null, appear);
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
	.container-head {
		background-color: #fff;
		padding: 0 10px;
		.num-list {
			padding: 15px 0;
			height: 30px;
			display: flex;
			.num-item {
				font-size: 12px;
				float: left;
				width: 30px;
				height: 30px;
				line-height: 30px;
				color: #666;
				text-align: center;
				margin-right: 4px;
				border: 1px solid #e5e5e5;
				border-radius: 3px;
				flex: 1;
			}
			.checked {
				border: 1px solid #e12121;
			}
		}
		.btn-list {
			display: inline-flex;
			padding:20px 0 8px;
			.btn-item {
				font-size: 12px;
				padding: 3px 30px;
				color: #e12121;
				border: 1px solid #e12121;
			}
			.btn-item:first-child {
				border-top-left-radius: 5px;
				border-bottom-left-radius: 5px;
			}
			.btn-item:nth-child(2) {
				border-top-right-radius: 5px;
				border-bottom-right-radius: 5px;
			}
			.checked {
				color: #fff;
				background-color: #e12121;
			}
			.today-btn {
				line-height: 35px;
				font-size: 12px;
				position: fixed;
				right: 15px;
			}
		}
	}
	.content {
		margin-top: 5px;
		background-color: #fff;
		.table-list {
			.table-title {
				height: 45px;
				line-height: 45px;
				padding: 0 10px;
				color: #666;
				border-bottom: 1px solid #dbdbdb;
				font-size: 12px;
			}
			.table-item {
				width: 100%;
				display: flex;
				padding: 0 10px;
				height: 43px;
				line-height: 43px;
				border-bottom: 1px solid #dbdbdb;
				.codenum {
					font-size: 12px;
					line-height: 43px;
				}
				.frequency {
					margin-top: 9px;
					font-size: 12px;
					height: 25px;
					line-height: 25px;
					text-align: right;
					background-color: #e12121;
					border-radius: 15px;
					margin-left: 10px;
					color: #fff;
				}
			}
		}
		.data-list {
			.navTab {
				padding: 0 10px;
				height: 50px;
				line-height: 50px;
				border-top: 1px solid #dbdbdb;
				background: #f0f0f0;
				.navItem {
					font-size: 12px;
					width: 30%;
					color: #666;
					display: inline-block;
					text-align: center;
					height: 30px;
					line-height: 30px;
					margin-left: 10px;
				}
				.checked {
					color: #fff !important;
					border-radius: 15px;
					background: #e12121;
				}
			}
			.content-box {
				background-color: #fff;
				.content-list {
					width: 100%;
					// height: 30px;
					// line-height: 30px;
					overflow: hidden;
					border-bottom: 1px solid #dbdbdb;
					.content-item {
						height: 30px;
						line-height: 30px;
						font-size: 12px;
						border-right: 1px solid #dbdbdb;
						float: left;
						text-align: center;
						color: #999;
						-webkit-box-sizing: border-box;
						box-sizing: border-box;
						width: 16%;
					}
					.content-item:last-child {
						border: none;
					}
					.content-item:first-child {
						width: 40%;
						color: #51627e;
						font-size: 12px;
						white-space: nowrap;
					}
					.content-item:nth-child(2) {
						width: 10%;
						color: #666;
					}
					.red {
						color: #f12d35;
					}
				}
				.content-list:first-child {
					border-top: 1px solid #dbdbdb;
				}
			}
			.table-box {
				overflow-x: scroll;
				table {
					display: table;
					width: 100%;
					color: #666;
					text-align: center;
					word-wrap: break-word;
					word-break: break-all;
					tbody {
						td {
							height: 30px;
							font-size: 12px;
							uni-view {
								font-size: 12px;
								width: 17px;
								height: 17px;
								line-height: normal;
							}
						}
					}
				}
			}
		}
	}
}
.lineBall1 {
	background: #e6de00;
}

.lineBall1,
.lineBall2 {
	width: 17px;
	height: 17px;
	color: #fff !important;
	border-radius: 10px;
}

.lineBall2 {
	background: #0092dd;
}

.lineBall3 {
	background: #4b4b4b;
}

.lineBall3,
.lineBall4 {
	width: 17px;
	height: 17px;
	color: #fff !important;
	border-radius: 10px;
}

.lineBall4 {
	background: #ff7600;
}

.lineBall5 {
	background: #17e2e6;
}

.lineBall5,
.lineBall6 {
	width: 17px;
	height: 17px;
	color: #fff !important;
	border-radius: 10px;
}

.lineBall6 {
	background: #5234ff;
}

.lineBall7 {
	background: #bfbfbf;
}

.lineBall7,
.lineBall8 {
	width: 17px;
	height: 17px;
	color: #fff !important;
	border-radius: 10px;
}

.lineBall8 {
	background: #ff2600;
}

.lineBall9 {
	background: #780b00;
}

.lineBall10,
.lineBall9 {
	width: 17px;
	height: 17px;
	color: #fff !important;
	border-radius: 10px;
}

.lineBall10 {
	background: #e6de00;
}
#chartLinediv {
	position: relative;
}
</style>
