<template name="size-trend">
	<view class="container" v-if="mainData">
		<view class="pattern">
			<view class="mode" :class="{ checked: option == 'A' }" @tap.stop="choseMode('A')">大小个数</view>
			<view class="mode" :class="{ checked: option == 'B' }" @tap.stop="choseMode('B')">大小比</view>
		</view>
		<view class="btn-list">
			<view class="btn-item" @tap.stop="actionSheetTap()">{{ tPeriods == 2000 ? '当天' : tPeriods == 30 ? '近30期' : tPeriods == 60 ? '近60期' : '近90期' }}</view>
			<view class="btn-item" @tap.stop="choseCon(3)">筛选</view>
			<view class="btn-sjtj" @tap.stop="goBottom()">查看数据统计</view>
		</view>
		<view class="table-box" id="chartLinediv" v-if="option == 'A'">
			<table border="0" cellspacing="1" cellpadding="1">
				<thead>
					<tr>
						<th rowspan="2" style="width: 15%;">日期</th>
						<th rowspan="2" style="width: 11%;" class="qiyu_app">
							开奖
							<br />
							号码
						</th>
						<th colspan="6" style="width: 12%;" class="qiyu_arr">开奖号码分布</th>
						<th colspan="4" style="width: 12%;" class="qiyu_arr">大数个数</th>
						<th colspan="4" style="width: 12%;" class="qiyu_arr">小数个数</th>
					</tr>
					<tr>
						<th style="width: 4%;">1</th>
						<th style="width: 4%;">2</th>
						<th style="width: 4%;">3</th>
						<th style="width: 4%;">4</th>
						<th style="width: 4%;">5</th>
						<th style="width: 4%;">6</th>
						<th style="width: 4%;">0</th>
						<th style="width: 4%;">1</th>
						<th style="width: 4%;">2</th>
						<th style="width: 4%;">3</th>
						<th style="width: 4%;">0</th>
						<th style="width: 4%;">1</th>
						<th style="width: 4%;">2</th>
						<th style="width: 4%;">3</th>
					</tr>
				</thead>
				<tbody class="allNumber">
					<template v-for="(item, index) in mainData.list">
						<tr v-if="index < tPeriods">
							<td>{{ item.no.toString().substring(4) }}</td>
							<td class="tabred">
								<template v-for="nn in item.num">
									{{ nn + ' ' }}
								</template>
							</td>
							<template v-for="key in objectKeys(item.list.cit)">
								<td class="yu" :class="{ hot: item.list.cit[key]['out'] == 0, da: item.list.cit[key]['out'] == 0 }">
									<view>{{ item.list.cit[key]['out'] == 0 ? key : item.list.cit[key]['out'] }}
										<i v-if="item.list.cit[key]['sum']>1" class="smallQiu">{{item.list.cit[key]['sum']}}</i>
									</view>
								</td>
							</template>
							<template v-for="(bn, bi) in item.list['b_num']">
								<td :class="{ hot: bn == 0, pol: bn == 0 }">
									<view>{{ bn == 0 ? bi : bn }}</view>
								</td>
							</template>
							<template v-for="(sn, si) in item.list['s_num']">
								<td class="yu" :class="{ hot: sn == 0, pok: sn == 0 }">
									<view>{{ sn == 0 ? si : sn }}</view>
								</td>
							</template>
						</tr>
					</template>
				</tbody>
				<tbody>
					<tr class="ptin">
						<th rowspan="2" colspan="2" style="width: 15%;">数据统计</th>
						<th colspan="6" class="qiyu_arr">开奖号码分布</th>
						<th colspan="4" class="qiyu_arr">大数个数</th>
						<th colspan="4" class="qiyu_arr">小数个数</th>
					</tr>
					<tr class="ptin">
						<th style="width: 4%;">1</th>
						<th style="width: 4%;">2</th>
						<th style="width: 4%;">3</th>
						<th style="width: 4%;">4</th>
						<th style="width: 4%;">5</th>
						<th style="width: 4%;">6</th>
						<th style="width: 4%;">0</th>
						<th style="width: 4%;">1</th>
						<th style="width: 4%;">2</th>
						<th style="width: 4%;">3</th>
						<th style="width: 4%;">0</th>
						<th style="width: 4%;">1</th>
						<th style="width: 4%;">2</th>
						<th style="width: 4%;">3</th>
					</tr>
					<tr>
						<td colspan="2">出现次数</td>
						<template v-for="k in objectKeys(mainData.statistics.appear.cit)">
							<td class="yu">{{ mainData.statistics.appear.cit[k]['out'] }}</td>
						</template>
						<template v-for="b in mainData.statistics.appear['b_num'][0]">
							<td>{{ b }}</td>
						</template>
						<template v-for="s in mainData.statistics.appear['s_num'][0]">
							<td class="yu">{{ s }}</td>
						</template>
					</tr>
					<tr>
						<td colspan="2">平均遗漏</td>
						<template v-for="k in objectKeys(mainData.statistics.avg.cit)">
							<td class="yu">{{ mainData.statistics.avg.cit[k]['out'] }}</td>
						</template>
						<template v-for="b in mainData.statistics.avg['b_num'][0]">
							<td>{{ b }}</td>
						</template>
						<template v-for="s in mainData.statistics.avg['s_num'][0]">
							<td class="yu">{{ s }}</td>
						</template>
					</tr>
					<tr>
						<td colspan="2">最大连出</td>
						<template v-for="k in objectKeys(mainData.statistics.maxAway.cit)">
							<td class="yu">{{ mainData.statistics.maxAway.cit[k]['out'] }}</td>
						</template>
						<template v-for="b in mainData.statistics.maxAway['b_num'][0]">
							<td>{{ b }}</td>
						</template>
						<template v-for="s in mainData.statistics.maxAway['s_num'][0]">
							<td class="yu">{{ s }}</td>
						</template>
					</tr>
					<tr>
						<td colspan="2">最大遗漏</td>
						<template v-for="k in objectKeys(mainData.statistics.max.cit)">
							<td class="yu">{{ mainData.statistics.max.cit[k]['out'] }}</td>
						</template>
						<template v-for="b in mainData.statistics.max['b_num'][0]">
							<td>{{ b }}</td>
						</template>
						<template v-for="s in mainData.statistics.max['s_num'][0]">
							<td class="yu">{{ s }}</td>
						</template>
					</tr>
				</tbody>
			</table>
		</view>
		<view class="table-box" v-if="option == 'B'">
			<table border="0" cellspacing="1" cellpadding="1">
				<thead>
					<tr>
						<th rowspan="2">日期</th>
						<th rowspan="2" class="qiyupl_app">
							开奖
							<br />
							号码
						</th>
						<th colspan="2" class="qiyu_arr">百位</th>
						<th colspan="2" class="qiyu_arr">十位</th>
						<th colspan="2" class="qiyu_arr">个位</th>
						<th colspan="4" class="qiyu_arr">大小比</th>
					</tr>
					<tr>
						<th style="width: 5%;">大</th>
						<th style="width: 5%;">小</th>
						<th style="width: 5%;">大</th>
						<th style="width: 5%;">小</th>
						<th style="width: 5%;">大</th>
						<th style="width: 5%;">小</th>
						<th style="width: 5%;">3:0</th>
						<th style="width: 5%;">2:1</th>
						<th style="width: 5%;">1:2</th>
						<th style="width: 5%;">0:3</th>
					</tr>
				</thead>
				<tbody class="allNumber">
					<template v-for="(item, index) in mainData.list">
						<tr v-if="index < tPeriods">
							<td>{{ item.no.toString().substring(4) }}</td>
							<td class="tabred">
								<view class="yanse">
									<template v-for="n in item.num">
										{{ n+" " }}
									</template>
								</view>
							</td>
							<template v-for="(temp, tempIndex) in item.list.bas">
								<td :class="{ hot: temp.b == 0, one: temp.b == 0 }">
									<view :style="{ background: temp.b == 0 ? 'transparent' : '' }">
									{{ temp.b == 0 ? '大' : temp.b }}
									</view>
								</td>
								<td :class="{ hot: temp.s == 0, top: temp.s == 0 }">
									<view :style="{ background: temp.s == 0 ? 'transparent' : '' }">{{ temp.s == 0 ? '小' : temp.s }}</view>
								</td>
							</template>
							<td
								:class="{ hot: item.list['bs_scale'][0]['3:0'] == 0 }"
								:style="{ background: item.list['bs_scale'][0]['3:0'] == 0 ? '#00BAFF' : '', 'font-zise': item.list['bs_scale'][0]['3:0'] ? '13px' : '' }"
							>
								<view :style="{ background: item.list['bs_scale'][0]['3:0'] == 0 ? 'transparent' : '' }">
									{{ item.list['bs_scale'][0]['3:0'] == 0 ? '3:0' : item.list['bs_scale'][0]['3:0'] }}
								</view>
							</td>
							<td
								:class="{ hot: item.list['bs_scale'][0]['2:1'] == 0 }"
								:style="{ background: item.list['bs_scale'][0]['2:1'] == 0 ? '#fcb103' : '', 'font-zise': item.list['bs_scale'][0]['2:1'] ? '13px' : '' }"
							>
								<view :style="{ background: item.list['bs_scale'][0]['2:1'] == 0 ? 'transparent' : '' }">
									{{ item.list['bs_scale'][0]['2:1'] == 0 ? '2:1' : item.list['bs_scale'][0]['2:1'] }}
								</view>
							</td>
							<td
								:class="{ hot: item.list['bs_scale'][0]['1:2'] == 0 }"
								:style="{ background: item.list['bs_scale'][0]['1:2'] == 0 ? '#00BAFF' : '', 'font-zise': item.list['bs_scale'][0]['1:2'] ? '13px' : '' }"
							>
								<view :style="{ background: item.list['bs_scale'][0]['1:2'] == 0 ? 'transparent' : '' }">
									{{ item.list['bs_scale'][0]['1:2'] == 0 ? '1:2' : item.list['bs_scale'][0]['1:2'] }}
								</view>
							</td>
							<td
								:class="{ hot: item.list['bs_scale'][0]['0:3'] == 0 }"
								:style="{ background: item.list['bs_scale'][0]['0:3'] == 0 ? '#fcb103' : '', 'font-zise': item.list['bs_scale'][0]['0:3'] ? '13px' : '' }"
							>
								<view :style="{ background: item.list['bs_scale'][0]['0:3'] == 0 ? 'transparent' : '' }">
									{{ item.list['bs_scale'][0]['0:3'] == 0 ? '0:3' : item.list['bs_scale'][0]['0:3'] }}
								</view>
							</td>
						</tr>
					</template>
					<tr class="meek">
						<th rowspan="2" colspan="2" style="width: 15%;">数据统计</th>
						<th colspan="2" class="qiyu_arr">百位</th>
						<th colspan="2" class="qiyu_arr">十位</th>
						<th colspan="2" class="qiyu_arr">个位</th>
						<th colspan="4" class="qiyu_arr">大小比</th>
					</tr>
					<tr class="meek">
						<th style="width: 5%;">大</th>
						<th style="width: 5%;">小</th>
						<th style="width: 5%;">大</th>
						<th style="width: 5%;">小</th>
						<th style="width: 5%;">大</th>
						<th style="width: 5%;">小</th>
						<th style="width: 5%;">3:0</th>
						<th style="width: 5%;">2:1</th>
						<th style="width: 5%;">1:2</th>
						<th style="width: 5%;">0:3</th>
					</tr>
				</tbody>
				<tbody>
					<tr>
						<td colspan="2">出现次数</td>
						<template v-for="bas in mainData.statistics.appear.bas">
							<td>{{ bas['b'] }}</td>
							<td>{{ bas['s'] }}</td>
						</template>
						<td>{{ mainData.statistics.appear['bs_scale'][0]['3:0'] }}</td>
						<td>{{ mainData.statistics.appear['bs_scale'][0]['2:1'] }}</td>
						<td>{{ mainData.statistics.appear['bs_scale'][0]['1:2'] }}</td>
						<td>{{ mainData.statistics.appear['bs_scale'][0]['0:3'] }}</td>
					</tr>
					<tr>
						<td colspan="2">平均遗漏</td>
						<template v-for="bas in mainData.statistics.avg.bas">
							<td>{{ bas['b'] }}</td>
							<td>{{ bas['s'] }}</td>
						</template>
						<td>{{ mainData.statistics.avg['bs_scale'][0]['3:0'] }}</td>
						<td>{{ mainData.statistics.avg['bs_scale'][0]['2:1'] }}</td>
						<td>{{ mainData.statistics.avg['bs_scale'][0]['1:2'] }}</td>
						<td>{{ mainData.statistics.avg['bs_scale'][0]['0:3'] }}</td>
					</tr>
					<tr>
						<td colspan="2">最大连出</td>
						<template v-for="bas in mainData.statistics.maxAway.bas">
							<td>{{ bas['b'] }}</td>
							<td>{{ bas['s'] }}</td>
						</template>
						<td>{{ mainData.statistics.maxAway['bs_scale'][0]['3:0'] }}</td>
						<td>{{ mainData.statistics.maxAway['bs_scale'][0]['2:1'] }}</td>
						<td>{{ mainData.statistics.maxAway['bs_scale'][0]['1:2'] }}</td>
						<td>{{ mainData.statistics.maxAway['bs_scale'][0]['0:3'] }}</td>
					</tr>
					<tr>
						<td colspan="2">最大遗漏</td>
						<template v-for="bas in mainData.statistics.max.bas">
							<td>{{ bas['b'] }}</td>
							<td>{{ bas['s'] }}</td>
						</template>
						<td>{{ mainData.statistics.max['bs_scale'][0]['3:0'] }}</td>
						<td>{{ mainData.statistics.max['bs_scale'][0]['2:1'] }}</td>
						<td>{{ mainData.statistics.max['bs_scale'][0]['1:2'] }}</td>
						<td>{{ mainData.statistics.max['bs_scale'][0]['0:3'] }}</td>
					</tr>
				</tbody>
			</table>
		</view>
		<view id="chartbottom"></view>
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
		name:"size-trend",
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
			$('canvas').remove();
			setTimeout(function() {
				that.filterCtrl();
			}, 100);
		},
		hotSpanDrawLine() {
			this.lineToChart('.pok', 1, '#50befa');
			this.lineToChart('.pol', 1, '#ee9a00');
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
				canvas.style.top = 20 + header.offsetTop + 'px';
				canvas.style.left = 17 + header.offsetLeft + 'px';
				canvas.width = footer.offsetLeft - header.offsetLeft;
				xpos = footer.offsetLeft - header.offsetLeft - 14;
				ypos = 25;
			} else if (header.offsetLeft == footer.offsetLeft) {
				canvas.height = 27;
				canvas.style.top = 22 + header.offsetTop + 'px';
				canvas.style.left = 10 + header.offsetLeft + 'px';
				canvas.width = 10;
			} else {
				ypos = 25;
				canvas.style.top = 20 + header.offsetTop + 'px';
				canvas.style.left = 17 + footer.offsetLeft + 'px';
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
					this.lineToChart('.pok', 1, '#50befa');
					this.lineToChart('.pol', 1, '#ee9a00');
				}
			}
			if (!this.filterRs.missingLayer) {
				$('.purple').removeClass('purple');
			} else {
				let temp = [];
				let a = 6;
				let b = 4;
				let c = 4;
				let trs = $('.allNumber')
					.eq(0)
					.find('tr').length;
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
										.hasClass('hot') ||
									index == trs - 1
								) {
									temp.push({ rows: index, cols: i + 2 });
									flag = false;
								}
							}
						});
				}
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
										.eq(j + 8)
										.hasClass('hot') ||
									index == trs - 1
								) {
									temp.push({ rows: index, cols: j + 8 });
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
										.eq(k + 12)
										.hasClass('hot') ||
									index == trs - 1
								) {
									temp.push({ rows: index, cols: k + 12 });
									f = false;
								}
							}
						});
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
					$('canvas').remove();
					setTimeout(function() {
						that.filterCtrl();
					}, 100);
				}
			});
		},
		getAnalysisDetail() {
			let that = this;
			this.$api.getAnalysisDetail({ code: this.code, type: 'dxzs', date: this.date }).then(res => {
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
					that.mainData.list.forEach((v) => {
					  v.list["b_num"] = v.list["b_num"][0];
					  v.list["s_num"] = v.list["s_num"][0];
					});
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
}
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
	.table-box{
		table{
			background-color: #fff;
			display: table;
			width: 100%;
			// background: #e5e5e5;
			text-align: center;
			th{
				font-size: 10px;
				height: 33px; 
				line-height: 33px;
				background: #f0f0f0;
				text-align: center;
				color: #666!important;
			}
		
			tbody{
				tr {
				    height: 33px;
				    background: #fefdfd;
				}
				td{
					font-size: 10px;
					text-align: center;
					color: #999;
					uni-view{
						color: #999;
						font-size: 10px;
						text-align: center;	
					}
					i{
						font-style: normal;
						position: absolute;
						display: none;
						width: 12px;
						height: 12px;
						z-index: 1;
						font-size: 11px;
						border-radius: 13px;
						line-height: 12px;
					}
					.smallQiu {
						background-color: red;
						display: inline-block;
						color: #fff;
						margin-top: -8px;
						margin-left: -2px;
					}
				}	
				.hot uni-view {
					display: inline-block;
					height: 14px;
					line-height: 15px;
					width: 14px;
					color: #fff;
					border-radius: 50%;
				}
				.pol uni-view {
				    background: #ee9a00;
				}
				.pok  uni-view,.da uni-view{
					background: #50befa;
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
.yu {
    background: #fdf7ed;
}
.one {
	uni-view{		
		color: #fff!important;
	}
    font-zise: 13px;
    background: #00baff;
}

.top {
	uni-view{
		color: #fff!important;
	}
    font-zise: 13px;
    background: #fcb103;
}
#chartLinediv{
	// overflow-x: scroll;
	position: relative;
}
</style>

