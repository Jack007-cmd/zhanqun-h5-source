<template name="longhu-trend">
	<view class="container" v-if="mainData && mainData.list && mainData.list.length > 0">
		<view class="gyh-head">
			<view class="gyh-btn" @tap.stop="actionSheetTap">{{ tPeriods == 2000 ? '当天' : tPeriods == 30 ? '近30期' : tPeriods == 60 ? '近60期' : '近90期' }}</view>
			<view class="gyh-btn" @tap.stop="choseCon(3)">筛选</view>
			<view class="gyh-sjtj" @tap.stop="goBottom()">查看数据统计</view>
		</view>
		<view class="table-box" id="chartLinediv">
			<table id="trend_table2_gyhzs" border="0" cellspacing="1" cellpadding="1">
				<thead>
					<tr>
						<th width="30%">期号</th>
						<th width="30%">开奖号码</th>
						<th>龙</th>
						<th>虎</th>
						<th v-if="codeType == 1">和</th>
					</tr>
				</thead>
				<tbody id="allNumber">
					<template v-for="(item, m) in mainData.list">
						<tr v-if="m < tPeriods">
							<td class="nohide">{{ item.no.toString().substring(4) }}</td>
							<td class="nohide">
								<text style="color:red">{{ item.num[0]+" " }}</text>
								{{"  "+item.num[1] }}&nbsp;&nbsp;{{ item.num[2] }}&nbsp;&nbsp;{{ item.num[3]+"  " }} 
								<text style="color:red">{{ " "+item.num[4] }}</text>
							</td>
							<template v-for="dts in item.list.dts">
								<td :class="{ hot_gyh: dts.d == 0 }">
									<text :class="{ light_blue: dts.d == 0 }">{{ dts.d == 0 ? '龙' : dts.d }}</text>
								</td>
								<td :class="{ hot_gyh: dts.t == 0 }">
									<text :class="{ light_blue: dts.t == 0 }">{{ dts.t == 0 ? '虎' : dts.t }}</text>
								</td>
								<td v-if="codeType == 1" :class="{ hot_gyh: dts.s == 0 }">
									<text :class="{ light_blue: dts.s == 0 }">{{ dts.s == 0 ? '和' : dts.s }}</text>
								</td>
							</template>
						</tr>
					</template>
					<tr>
						<th colspan="2">数据统计</th>
						<th>龙</th>
						<th>虎</th>
						<th v-if="codeType == 1">平</th>
					</tr>
					<tr class="clospan_gyh">
						<td colspan="2">出现总数</td>
						<td>{{ mainData.statistics.appear.dts[0].d }}</td>
						<td>{{ mainData.statistics.appear.dts[0].t }}</td>
						<td v-if="codeType == 1">{{ mainData.statistics.appear.dts[0].s }}</td>
					</tr>
					<tr class="clospan_gyh">
						<td colspan="2">平均遗漏</td>
						<td>{{ mainData.statistics.avg.dts[0].d }}</td>
						<td>{{ mainData.statistics.avg.dts[0].t }}</td>
						<td v-if="codeType == 1">{{ mainData.statistics.avg.dts[0].s }}</td>
					</tr>
					<tr class="clospan_gyh">
						<td colspan="2">最大遗漏</td>
						<td>{{ mainData.statistics.max.dts[0].d }}</td>
						<td>{{ mainData.statistics.max.dts[0].t }}</td>
						<td v-if="codeType == 1">{{ mainData.statistics.max.dts[0].s }}</td>
					</tr>
					<tr class="clospan_gyh">
						<td colspan="2">最大连出</td>
						<td>{{ mainData.statistics.maxAway.dts[0].d }}</td>
						<td>{{ mainData.statistics.maxAway.dts[0].t }}</td>
						<td v-if="codeType == 1">{{ mainData.statistics.maxAway.dts[0].s }}</td>
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
	name: 'longhu-trend',
	props: ['code', 'date', 'current_number'],
	data() {
		return {
			showFilter: -1,
			mainData: { list: [] },
			tPeriods: 30,
			filterRs: {
				missing: true, //遗漏
				disassemble: true, //折线
				missingLayer: false, //遗漏分层
				dividingLine: false //分割线
			},
			temRs: null,
			codeType: -1,
			new_number:''
		};
	},
	watch: {
		date(newValue, oldValue) {
			let that = this;
			that.getAnalysisDetail();
		},
		current_number(newValue, oldValue) {
			let that = this;
			that.getAnalysisDetail();
		}
	},
	created: function(e) {
		let that = this;
		const allTypes = uni.getStorageSync('analysisKinds')['lhzs'];
		if (allTypes['type1'].indexOf(this.code) != -1) {
			that.codeType = 1;
		} else if (allTypes['type2'].indexOf(this.code) != -1) {
			that.codeType = 2;
		}
		uni.showLoading({ title: 'loading' });
		that.getAnalysisDetail();
		that.startCount();
	},
	methods: {
		goBottom(){
			document.getElementById("chartbottom").scrollIntoView();
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
		lineToChart() {
			let hot = $('.hot_gyh');
			if (hot.length < 2) {
				return;
			}
			for (let i = 1; i < hot.length; i++) {
				this.line(hot[i - 1], hot[i], 1, '#0092e0');
			}
		},
		//画直线方法：起始元素、终止元素、线宽、颜色
		line(header, footer, line_width, line_color) {
			let xstart = 0;
			let xpos = 0;
			let ypos = 15;
			let canvas = document.createElement('canvas');
			canvas.style.position = 'absolute';
			canvas.style.visibility = 'visible';
			canvas.height = 30;
			if (header.offsetLeft < footer.offsetLeft) {
				canvas.style.top = 15 + header.offsetTop + 'px';
				canvas.style.left = (this.codeType == 1 ? 0 : 12) + 33 + header.offsetLeft + 'px';
				canvas.width = footer.offsetLeft - header.offsetLeft;
				xpos = footer.offsetLeft - header.offsetLeft - 14;
				ypos = 30;
			} else if (header.offsetLeft == footer.offsetLeft) {
				canvas.height = 13;
				canvas.style.top = 25 + header.offsetTop + 'px';
				canvas.style.left = (this.codeType == 1 ? 0 : 12) + 26 + header.offsetLeft + 'px';
				canvas.width = 10;
			} else {
				ypos = 30;
				canvas.style.top = 15 + header.offsetTop + 'px';
				canvas.style.left = (this.codeType == 1 ? 0 : 12) + 33 + footer.offsetLeft + 'px';
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
				$('#allNumber')
					.find('tr')
					.each(function() {
						let tds = $(this).find('td');
						tds.each(function(i) {
							if (i > 1) {
								$(this)
									.find('span')
									.hide();
							}
						});
					});
				$('.hot_gyh')
					.find('span')
					.show();
			} else {
				$('#allNumber')
					.find('tr')
					.find('td')
					.find('span')
					.show();
			}
			if (this.filterRs.dividingLine) {
				if ($('.bold_top_border').length == 0) {
					$('#allNumber')
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
				this.change++;
			} else {
				if ($('canvas').length == 0) {
					this.lineToChart();
				}
			}
			if (!this.filterRs.missingLayer) {
				$('.purple').removeClass('purple');
			} else {
				if (this.mainData.list) {
					let temp = [];
					let d = true;
					let t = true;
					let s = true;
					for (let i = 0; i < this.mainData.list.length; i++) {
						if (d) {
							if (this.mainData.list[i].list.dts[0].d == 0) {
								let item = {};
								item.rows = i;
								item.cols = 2;
								temp.push(item);
								d = false;
							}
						}
						if (t) {
							if (this.mainData.list[i].list.dts[0].t == 0) {
								let item = {};
								item.rows = i;
								item.cols = 3;
								temp.push(item);
								t = false;
							}
						}
						if (s) {
							if (this.mainData.list[i].list.dts[0].s == 0) {
								let item = {};
								item.rows = i;
								item.cols = 4;
								temp.push(item);
								s = false;
							}
						}
					}
					temp.forEach(v => {
						$('#allNumber')
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
			}
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
			that.mainData = { list: [] };
			$('canvas').remove();
			this.$api.getAnalysisDetail({ code: this.code, type: 'lhzs', date: this.date }).then(res => {
				if (res.code == 0) {
					// if (typeof res.data.list == 'object' && res.data.list.constructor == Array) {
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
					// } else {
					// 	setTimeout(that.getAnalysisDetail(), 500);
					// }
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
.container{
	padding-top: 5px;
	.gyh-head {
		padding: 0 10px;
		background-color: #fff;
		height: 45px;
		.gyh-btn {
			font-size: 12px;
			height: 45px;
			line-height: 45px;
			color: #e12121;
			display: inline-block;
			padding: 0 10px;
		}
		.gyh-sjtj {
			font-size: 12px;
			height: 45px;
			line-height: 45px;
			display: inline-block;
			float: right;
			color: #333;
			text-align: right;
		}
	}
	.table-box{
		position: relative;
		width: 100%;
		height: auto;
		table{
			font-size: 12px;
			display: table;
			background-color: #e6e6e6;
			width: 100%;			
			white-space: nowrap;
			text-align: center;
			color: #666;
			th {
			    color: #333;
			    height: 30px;
			    line-height: 30px;
			    background: #f0f0f0;
			    text-align: center;
			    // border: 1px solid #eaeaea;
			}
			tbody td {
			    height: 30px;
			    background: #fff;
			    // border: 1px solid #eaeaea;
				text{
					font-size: 12px;	
				}
			}
			.hot_gyh text {
			    color: #fff!important;
			    display: inline-block;
			    width: 20px;
			    height: 20px;
			    line-height: 20px;
			    border-radius: 10px;
			}
			
			.light_blue {
			    background: #1fa6e8!important;
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
#chartbottom{
	position: relative;
}
</style>
