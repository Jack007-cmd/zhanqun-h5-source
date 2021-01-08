<template name="value-trend">
	<view class="container" v-if="mainData">
		<view class="pattern">
			<view class="mode" :class="{ checked: option == 'A' }" @tap.stop="choseMode('A')">和值走势</view>
			<view class="mode" :class="{ checked: option == 'B' }" @tap.stop="choseMode('B')">和值形态</view>
		</view>
		<view class="btn-list">
			<view class="btn-item" @tap.stop="actionSheetTap()">{{ tPeriods == 2000 ? '当天' : tPeriods == 30 ? '近30期' : tPeriods == 60 ? '近60期' : '近90期' }}</view>
			<view class="btn-item" @tap.stop="choseCon(3)">筛选</view>
			<view class="btn-sjtj" @tap.stop="goBottom()">查看数据统计</view>
		</view>
		<view id="chartLinediv">
			<view class="table-box" v-if="option == 'A'">
				<table class="pattern-A" border="0" cellspacing="1" cellpadding="1">
					<thead>
						<tr>
							<th class="diyige">期号</th>
							<th class="dier">和</th>
							<th class="disan">3</th>
							<th class="disan">4</th>
							<th class="disan">5</th>
							<th class="disan">6</th>
							<th class="disan">7</th>
							<th class="disan">8</th>
							<th class="disan">9</th>
							<th class="disan">10</th>
							<th class="disan">11</th>
							<th class="disan">12</th>
							<th class="disan">13</th>
							<th class="disan">14</th>
							<th class="disan">15</th>
							<th class="disan">16</th>
							<th class="disan">17</th>
							<th class="disan">18</th>
						</tr>
					</thead>
					<tbody class="allNumber" v-if="mainData.list">
						<template v-for="(item, index) in mainData.list">
							<tr :key="index" v-if="index < tPeriods">
								<td>{{ item.no.toString().substring(4) }}</td>
								<td class="tabred">{{ item.list.sum[0][0] }}</td>
								<template v-for="k in objectKeys(item.list.sn[0])">
									<td :key="index + k" :class="{ hot: item.list.sn[0][k] == 0, da: item.list.sn[0][k] == 0 }">
										<view>{{ item.list.sn[0][k] == 0 ? k : item.list.sn[0][k] }}</view>
									</td>
								</template>
							</tr>
						</template>
					</tbody>
					<tbody class="count_data">
						<tr class="zouship">
							<th colspan="2">数据统计</th>
							<th>3</th>
							<th>4</th>
							<th>5</th>
							<th>6</th>
							<th>7</th>
							<th>8</th>
							<th>9</th>
							<th>10</th>
							<th>11</th>
							<th>12</th>
							<th>13</th>
							<th>14</th>
							<th>15</th>
							<th>16</th>
							<th>17</th>
							<th>18</th>
						</tr>
						<tr>
							<td colspan="2">出现次数</td>
							<template v-for="k in objectKeys(mainData.statistics.appear.sn[0])">
								<td :key="k">{{ mainData.statistics.appear.sn[0][k] }}</td>
							</template>
						</tr>
						<tr>
							<td colspan="2">平均遗漏</td>
							<template v-for="k in objectKeys(mainData.statistics.avg.sn[0])">
								<td :key="k">{{ mainData.statistics.avg.sn[0][k] }}</td>
							</template>
						</tr>
						<tr>
							<td colspan="2">当前遗漏</td>
							<template v-for="k in objectKeys(mainData.statistics.current.sn[0])">
								<td :key="k">{{ mainData.statistics.current.sn[0][k] }}</td>
							</template>
						</tr>
						<tr>
							<td colspan="2">最大连出</td>
							<template v-for="k in objectKeys(mainData.statistics.maxAway.sn[0])">
								<td :key="k">{{ mainData.statistics.maxAway.sn[0][k] }}</td>
							</template>
						</tr>
						<tr>
							<td colspan="2">最大遗漏</td>
							<template v-for="k in objectKeys(mainData.statistics.max.sn[0])">
								<td :key="k">{{ mainData.statistics.max.sn[0][k] }}</td>
							</template>
						</tr>
					</tbody>
				</table>
			</view>
			<view class="table-box" v-if="option == 'B'">
				<table class="pattern-B" border="0" cellspacing="1" cellpadding="1">
					<thead>
						<tr>
							<th style="width: 25%;">期号</th>
							<th style="width: 20%;">开奖号码</th>
							<th style="width: 8%;">和</th>
							<th>大</th>
							<th>小</th>
							<th>单</th>
							<th>双</th>
						</tr>
					</thead>
					<tbody class="allNumber" v-if="mainData.list">
						<template v-for="(item,index) in mainData.list">
							<tr :key="index" v-if="index < tPeriods">
								<td>{{ item.no }}</td>
								<td>
									<template v-for="n in item.num">
										{{ n+' ' }}
									</template>
								</td>
								<td class="hez">{{ item.list.sum[0][0] }}</td>
								<template v-for="bs in item.list['sum_bs']">
									<td :key="item.no+'b'" :class="{ hot: bs['b'] == 0 }">
										<view>{{ bs['b'] == 0 ? '大' : bs['b'] }}</view>
									</td>
									<td :key="item.no+'s'" :class="{ hot: bs['s'] == 0 }">
										<view>{{ bs['s'] == 0 ? '小' : bs['s'] }}</view>
									</td>
								</template>
								<template v-for="od in item.list['sum_od']">
									<td :key="item.no+'o'" :class="{ hotp: od['o'] == 0 }">
										<view>{{ od['o'] == 0 ? '单' : od['o'] }}</view>
									</td>
									<td :key="item.no+'d'" :class="{ hotp: od['d'] == 0 }">
										<view>{{ od['d'] == 0 ? '双' : od['d'] }}</view>
									</td>
								</template>
							</tr>
						</template>
						<tr class="danmoshi">
							<th colspan="3" style="text-align: center;color: #0c0c0c;">数据统计</th>
							<th style="text-align: center;color: #0c0c0c;">大</th>
							<th style="text-align: center;color: #0c0c0c;">小</th>
							<th style="text-align: center;color: #0c0c0c;">单</th>
							<th style="text-align: center;color: #0c0c0c;">双</th>
						</tr>
						<tr>
							<td colspan="3">出现次数</td>
							<template v-for="bs in mainData.statistics.appear['sum_bs']">
								<!-- <td :key="bs['b']"> -->
								<td>
									<span>{{ bs['b'] }}</span>
								</td>
								<!-- <td :key="bs['s']"> -->
								<td>
									<span>{{ bs['s'] }}</span>
								</td>
							</template>
							<template v-for="od in mainData.statistics.appear['sum_od']">
								<!-- <td :key="od['o']"> -->
								<td>
									<span>{{ od['o'] }}</span>
								</td>
								<!-- <td :key="od['d']"> -->
								<td>
									<span>{{ od['d'] }}</span>
								</td>
							</template>
						</tr>
						<tr>
							<td colspan="3">平均遗漏</td>
							<template v-for="bs in mainData.statistics.avg['sum_bs']">
								<!-- <td :key="bs['b']"> -->
								<td>
									<span>{{ bs['b'] }}</span>
								</td>
								<!-- <td :key="bs['s']"> -->
								<td>
									<span>{{ bs['s'] }}</span>
								</td>
							</template>
							<template v-for="od in mainData.statistics.avg['sum_od']">
								<!-- <td :key="od['o']"> -->
								<td>
									<span>{{ od['o'] }}</span>
								</td>
								<!-- <td :key="od['d']"> -->
								<td>
									<span>{{ od['d'] }}</span>
								</td>
							</template>
						</tr>
						<tr>
							<td colspan="3">当前遗漏</td>
							<template v-for="bs in mainData.statistics.current['sum_bs']">
								<!-- <td :key="bs['b']"> -->
								<td>
									<span>{{ bs['b'] }}</span>
								</td>
								<!-- <td :key="bs['s']"> -->
								<td>
									<span>{{ bs['s'] }}</span>
								</td>
							</template>
							<template v-for="od in mainData.statistics.current['sum_od']">
								<!-- <td :key="od['o']"> -->
								<td>
									<span>{{ od['o'] }}</span>
								</td>
								<!-- <td :key="od['d']"> -->
								<td>
									<span>{{ od['d'] }}</span>
								</td>
							</template>
						</tr>
						<tr>
							<td colspan="3">最大连出</td>
							<template v-for="bs in mainData.statistics.maxAway['sum_bs']">
								<!-- <td :key="bs['b']"> -->
								<td>
									<span>{{ bs['b'] }}</span>
								</td>
								<!-- <td :key="bs['s']"> -->
								<td>
									<span>{{ bs['s'] }}</span>
								</td>
							</template>
							<template v-for="od in mainData.statistics.maxAway['sum_od']">
								<!-- <td :key="od['o']"> -->
								<td>
									<span>{{ od['o'] }}</span>
								</td>
								<!-- <td :key="od['d']"> -->
								<td>
									<span>{{ od['d'] }}</span>
								</td>
							</template>
						</tr>
						<tr>
							<td colspan="3">最大遗漏</td>
							<template v-for="bs in mainData.statistics.max['sum_bs']">
								<!-- <td :key="bs['b']"> -->
								<td>
									<span>{{ bs['b'] }}</span>
								</td>
								<!-- <td :key="bs['s']"> -->
								<td>
									<span>{{ bs['s'] }}</span>
								</td>
							</template>
							<template v-for="od in mainData.statistics.max['sum_od']">
								<!-- <td :key="od['o']"> -->
								<td>
									<span>{{ od['o'] }}</span>
								</td>
								<!-- <td :key="od['d']"> -->
								<td>
									<span>{{ od['d'] }}</span>
								</td>
							</template>
						</tr>
					</tbody>
				</table>
			</view>
			<view id="chartbottom"></view>
		</view>
		<view class="u-popup" v-if="showFilter == 3 && temRs">
			<view class="u-transition-out" @tap.stop="choseCon(-1)"></view>
			<view class="u-transition">
				<view class="u-popup__wrapper-box">
					<view class="u-main">
						<view class="u-title">
							<view class="option-md">条件选择</view>
							<view class="option-md" @tap.stop="choseCon(99)">确定</view>
						</view>
						<view class="u-content">
							<view class="content-item">
								<view class="option" :class="{ checked: temRs.missing }" @tap.stop="temRs.missing = !temRs.missing">遗漏</view>
								<view class="option" :class="{ checked: temRs.disassemble }" @tap.stop="temRs.disassemble = !temRs.disassemble">折线</view>
								<view class="option" :class="{ checked: temRs.missingLayer }" @tap.stop="temRs.missingLayer = !temRs.missingLayer">遗漏分层</view>
								<view class="option" :class="{ checked: temRs.dividingLine }" @tap.stop="temRs.dividingLine = !temRs.dividingLine">分割线</view>
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
	name: 'value-trend',
	props: ['code', 'date', 'current_number'],
	data() {
		return {
			showFilter: -1,
			mainData: null,
			tPeriods: 30,
			filterRs: {
				missing: true, //遗漏
				disassemble: true, //折线
				missingLayer: false, //遗漏分层
				dividingLine: false //分割线
			},
			temRs: null,
			option: 'A',
			objectKeys: Object.keys,
			new_number:''
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
		let that = this;
		uni.showLoading({ title: 'loading' });
		that.getAnalysisDetail();
		that.startCount();	
	},
	methods: {
		choseMode(m) {
			let that = this;
			if (that.option == m) return;
			that.option = m;
			$("canvas").remove();
			setTimeout(function() {
				that.filterCtrl();				
			}, 100);
		},
		hotSpanDrawLine() {
			if (this.option == 'A') {
				this.lineToChart('.da', 1, '#50befa');
			} else {
				this.lineToChart('.hot', 1, '#50befa');
				this.lineToChart('.hotp', 1, '#ee9a00');
			}
		},
		lineToChart(a, b, c) {
			let hot = $(a);
			if (hot.length > 1) {
				for (let i = 1; i < hot.length; i++) {
					this.line(hot[i - 1], hot[i], b, c);
				}
			}
		},
		line(header, footer, line_width, line_color) {
			let xstart = 0;
			let xpos = 0;
			let ypos = 20;
			let canvas = document.createElement('canvas');
			canvas.style.position = 'absolute';
			canvas.style.visibility = 'visible';
			canvas.height = 25;
			if (header.offsetLeft < footer.offsetLeft) {
				canvas.style.top = (this.option == 'A' ? 0 : 2) + 14 + header.offsetTop + 'px';
				canvas.style.left = (this.option == 'A' ? 0 : 12) + 17 + header.offsetLeft + 'px';
				canvas.width = footer.offsetLeft - header.offsetLeft;
				xpos = footer.offsetLeft - header.offsetLeft - 14;
				ypos = 25;
			} else if (header.offsetLeft == footer.offsetLeft) {
				canvas.height = 27;
				canvas.style.top = (this.option == 'A' ? 0 : 5) + 16 + header.offsetTop + 'px';
				canvas.style.left = (this.option == 'A' ? 0 : 12) + 10 + header.offsetLeft + 'px';
				canvas.width = 10;
			} else {
				ypos = 25;
				canvas.style.top = (this.option == 'A' ? 0 : 2) + 14 + header.offsetTop + 'px';
				canvas.style.left = (this.option == 'A' ? 0 : 12) + 17 + footer.offsetLeft + 'px';
				canvas.width = header.offsetLeft - footer.offsetLeft;
				xstart = header.offsetLeft - footer.offsetLeft - 14;
			}
			let ctx = canvas.getContext('2d');
			// ctx.clearRect(0,0,xpos,ypos); //清空画布，多个表格时使用
			ctx.fill();
			ctx.lineWidth = line_width;
			ctx.strokeStyle = line_color;
			ctx.beginPath();
			ctx.moveTo(xstart, 0);
			ctx.lineTo(xpos, ypos);
			ctx.stroke();
			ctx.closePath();
			$('#chartLinediv').append(canvas);
		},
		filterCtrl() {
			$('canvas').remove();
			if (!this.filterRs.missing) {
				$('.allNumber')
					.eq(0)
					.find('tr')
					.each(function() {
						let tds = $(this).find('td');
						tds.each(function(i) {
							if (i > 1) {
								$(this)
									.find('uni-view')
									.hide();
							}
						});
					});
				$('.hot')
					.find('uni-view')
					.show();
			} else {
				$('.allNumber')
					.eq(0)
					.find('tr')
					.find('td')
					.find('uni-view')
					.show();
			}
			if (this.filterRs.dividingLine) {
				if ($('.bold_top_border').length == 0) {
					$('.allNumber')
						.eq(0)
						.find('tr')
						.each(function() {
							if (
								Number(
									$(this)
										.find('td')
										.eq(0)
										.text()
										.trim()
								) %
									5 ==
								0
							) {
								$(this).addClass('bold_top_border');
							}
						});
				}
			} else {
				$('.bold_top_border').removeClass('bold_top_border');
			}
			if (!this.filterRs.disassemble) {
				$('canvas').remove();
			} else {
				if ($('canvas').length == 0) {
					this.hotSpanDrawLine();
				}
			}
			if (!this.filterRs.missingLayer) {
				$('.purple').removeClass('purple');
			} else {
				let temp = [];
				let a = 16;
				let b = 2;
				let c = 2;
				let trs = $('.allNumber')
					.eq(0)
					.find('tr').length;
				if (this.option == 'A') {
					for (let i = 0; i < a; i++) {
						let flag = true;
						$('.allNumber')
							.eq(0)
							.find('tr')
							.each(function(index) {
								if (flag) {
									if (
										$(this)
											.find('td')
											.eq(i + 2)
											.hasClass('da') ||
										index == trs - 1
									) {
										temp.push({ rows: index, cols: i + 2 });
										flag = false;
									}
								}
							});
					}
				} else if (this.option == 'B') {
					for (let j = 0; j < b; j++) {
						let f = true;
						$('.allNumber')
							.eq(0)
							.find('tr')
							.each(function(index) {
								if (f) {
									if (
										$(this)
											.find('td')
											.eq(j + 3)
											.hasClass('hot') ||
										index == trs - 1
									) {
										temp.push({ rows: index, cols: j + 3 });
										f = false;
									}
								}
							});
					}
					for (let k = 0; k < c; k++) {
						let f = true;
						$('.allNumber')
							.eq(0)
							.find('tr')
							.each(function(index) {
								if (f) {
									if (
										$(this)
											.find('td')
											.eq(k + 5)
											.hasClass('hotp') ||
										index == trs - 1
									) {
										temp.push({ rows: index, cols: k + 5 });
										f = false;
									}
								}
							});
					}
				}
				temp.forEach(v => {
					$('.allNumber')
						.eq(0)
						.find('tr')
						.each(function(i) {
							if (i < v.rows) {
								$(this)
									.find('td')
									.eq(v.cols)
									.addClass('purple');
							}
						});
				});
			}
		},
		choseCon(n) {
			if (n == 3) {
				this.showFilter = 3;
				this.temRs = this.filterRs;
			} else if (n == -1) {
				this.showFilter = -1;
				this.temRs = {};
			} else {
				this.showFilter = -1;
				this.filterRs = this.temRs;
				this.filterCtrl();
			}
		},
		goBottom() {
			document.getElementById('chartbottom').scrollIntoView();
		},
		actionSheetTap() {
			let that = this;
			uni.showActionSheet({
				title: '期数选择',
				itemList: ['当天', '近30期', '近60期', '近90期'],
				success: e => {
					let temp = [2000, 30, 60, 90];
					that.tPeriods = temp[e.tapIndex];
					$("canvas").remove();
					setTimeout(function() {
						that.filterCtrl();
					}, 100);
				}
			});
		},
		getAnalysisDetail() {
			let that = this;
			this.$api.getAnalysisDetail({ code: this.code, type: 'hzzs', date: this.date }).then(res => {
				if (res.code == 0) {
					var arr = [];
					$.each(res.data.list,function(k,v){
						arr.push(res.data.list[k])
					})
					res.data.list = arr;
					that.new_number = res.data.list[0]['no'];
					if(that.new_number != that.current_number){
						return;
					}else{
						uni.hideLoading();
					}
					that.mainData = res.data;
					setTimeout(function() {
						that.filterCtrl();
					}, 100);	
				}else{
					uni.showToast({
	　　　　　　　　　　　　title: "网络异常，请稍后再试",
	　　　　　　　　　　　　icon: 'none'
	　　　　　　　　　　})
				 }
			});
		},
		startCount(){
			let that = this;
			setInterval(function(){
				if(that.current_number != that.new_number){
					uni.showLoading({ title: 'loading' });
					that.getAnalysisDetail();
				}
			},2000)
		}
	}
};
</script>

<style lang="scss">
.container {
	padding-top: 5px;
	.pattern {
		margin-top: 5px;
		display: -webkit-box;
		height: 45px;
		line-height: 45px;
		background-color: #fff;
		width: 100%;
		border-bottom: 1px solid #dbdbdb;
		.mode {
			font-size: 12px;
			vertical-align: middle;
			line-height: 25px;
			width: 79px;
			display: inline-block;
			text-align: center;
			margin-left: 29px;
		}
		.checked {
			color: #fff;
			background: #e12121;
			border-radius: 25px;
		}
	}
	.btn-list {
		background-color: #fff;
		.btn-item {
			height: 30px;
			line-height: 30px;
			display: inline-block;
			height: 100%;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			position: relative;
			color: #e12121;
			flex: 1;
			margin-right: 20px;
			text-align: center;
			font-size: 12px;
		}
		.btn-sjtj {
			font-size: 12px;
			height: 30px;
			line-height: 30px;
			display: inline-block;
			position: absolute;
			right: 15px;
		}
	}
	.table-box {
		
		table {
			background: #dbdbdb;
			border-spacing: 1px;
			width: 100%;
			color: #999;
			th {
				text-align: center;
				height: 25px;
				background: #f0f0f0;
				font-size: 8px;
				color: #333;
			}
			.diyige {
				width: 9.6%;
			}
			.dier {
				width: 4.6%;
			}
			.disan {
				width: 5.3%;
			}
			tbody {
				td {
					text-align: center;
					height: 25px;
					background: #fff;
					font-size: 12px;
					uni-view {
						font-size: 12px;
					}
				}
				td.hot uni-view {
				    display: inline-block;
				    height: 16px;
				    line-height: 16px;
				    width: 16px;
				    background: #50befa;
				    color: #fff;
				    border-radius: 50%;
				}
				td.hotp uni-view {
				    display: inline-block;
				    height: 16px;
				    line-height: 16px;
				    width: 16px;
				    background: #f8a141;
				    color: #fff;
				    border-radius: 50%;
				}
			}
		}
		.pattern-A tbody td:nth-child(2) {
			color: #e90009;
		}
		.pattern-B tbody td:nth-child(3) {
			color: #e90009;
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
#chartLinediv{
	overflow-x: scroll;
	position: relative;
}
</style>
