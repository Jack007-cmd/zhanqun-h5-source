<template name="pattern-trend">
	<view class="container" v-if="mainData">
		<view class="pattern">
			<view class="mode" :class="{ checked: modeType == 1 }" @tap.stop="choseMode(1)">前三形态</view>
			<view class="mode" :class="{ checked: modeType == 2 }" @tap.stop="choseMode(2)">中三形态</view>
			<view class="mode" :class="{ checked: modeType == 3 }" @tap.stop="choseMode(3)">后三形态</view>
		</view>
		<view class="btn-list">
			<view class="btn-item" @tap.stop="actionSheetTap()">{{ tPeriods == 2000 ? '当天' : tPeriods == 30 ? '近30期' : tPeriods == 60 ? '近60期' : '近90期' }}</view>
			<view class="btn-item" @tap.stop="choseCon(3)">筛选</view>
			<view class="btn-sjtj" @tap.stop="goBottom()">查看数据统计</view>
		</view>
		<view class="table-box" id="chartLinediv">
			<table id="singtai_content" border="0" cellspacing="1" cellpadding="1">
				<thead>
				<tr>
				  <th rowspan="2">期号</th>
				  <th rowspan="2">第<br>一<br>球</th>
				  <th rowspan="2">第<br>二<br>球</th>
				  <th rowspan="2">第<br>三<br>球</th>
				  <th colspan="5">形态</th>
				  <th colspan="5">组选类型</th>
				</tr>
				<tr>
				  <th>豹子</th>
				  <th>顺子</th>
				  <th>对子</th>
				  <th>半顺</th>
				  <th>杂六</th>
				  <th>组三</th>
				  <th>组六</th>
				  <th>豹子</th>
				</tr>
				</thead>
				<tbody id="allNumber">
				<template v-for="(item,m) in mainData.list">
				  <tr v-if="m<tPeriods">
					<td>{{item.no.toString().substring(4)}}</td>
					<td class="nohide">
						<text>{{item.num[modeType-1]}}</text>
					</td>
					<td class="nohide">
						<text>{{item.num[modeType]}}</text>
					</td>
					<td class="nohide">
						<text>{{item.num[modeType+1]}}</text>
					</td>
					<template v-for="(temp,t) in item.list.numList">
					  <template v-if="t==modeType-1">
						<td :class="{hot:temp.is==0}"><text
						  :class="{orblue:temp.is==0}">{{temp.is == 0 ? '豹子' : temp.is}}</text></td>
						<td :class="{hot:temp.ag==0}"><text
						  :class="{orblue:temp.ag==0}">{{temp.ag == 0 ? '顺子' : temp.ag}}</text></td>
						<td :class="{hot:temp.ps==0}"><text
						  :class="{orblue:temp.ps==0}">{{temp.ps == 0 ? '对子' : temp.ps}}</text></td>
						<td :class="{hot:temp.hag==0}"><text
						  :class="{orblue:temp.hag==0}">{{temp.hag == 0 ? '半顺' : temp.hag}}</text></td>
						<td :class="{hot:temp.or==0}"><text
						  :class="{orblue:temp.or==0}">{{temp.or == 0 ? '杂六' : temp.or}}</text></td>
						<td :class="{hot:temp.gt==0}"><text
						  :class="{orcls:temp.gt==0}">{{temp.gt == 0 ? '组三' : temp.gt}}</text></td>
						<td :class="{hot:temp.gs==0}"><text
						  :class="{orcls:temp.gs==0}">{{temp.gs == 0 ? '组六' : temp.gs}}</text></td>
						<td :class="{hot:temp.is==0}"><text
						  :class="{orcls:temp.is==0}">{{temp.is == 0 ? '豹子' : temp.is}}</text></td>
					  </template>
					</template>
				  </tr>
				</template>
				</tbody>
				<tbody>
				<tr class="clospan">
				  <td rowspan="2" colspan="4">数据统计</td>
				  <td colspan="5">形态</td>
				  <td colspan="5">组选类型</td>
				</tr>
				<tr class="clospan">
				  <td>豹子</td>
				  <td>顺子</td>
				  <td>对子</td>
				  <td>半顺</td>
				  <td>杂六</td>
				  <td>组三</td>
				  <td>组六</td>
				  <td>豹子</td>
				</tr>
				<tr class="closas">
				  <td colspan="4">出现次数</td>
				  <template v-for="(numList,a) in mainData.statistics.appear.numList">
					<template v-if="a==modeType-1">
					  <td>{{numList.is}}</td>
					  <td>{{numList.ag}}</td>
					  <td>{{numList.ps}}</td>
					  <td>{{numList.hag}}</td>
					  <td>{{numList.or}}</td>
					  <td>{{numList.gt}}</td>
					  <td>{{numList.gs}}</td>
					  <td>{{numList.is}}</td>
					</template>
				  </template>
				</tr>
				<tr class="closas">
				  <td colspan="4">平均遗漏</td>
				  <template v-for="(numList,a) in mainData.statistics.avg.numList">
					<template v-if="a==modeType-1">
					  <td>{{numList.is}}</td>
					  <td>{{numList.ag}}</td>
					  <td>{{numList.ps}}</td>
					  <td>{{numList.hag}}</td>
					  <td>{{numList.or}}</td>
					  <td>{{numList.gt}}</td>
					  <td>{{numList.gs}}</td>
					  <td>{{numList.is}}</td>
					</template>
				  </template>
				</tr>
				<tr class="closas">
				  <td colspan="4">最大连出</td>
				  <template v-for="(numList,a) in mainData.statistics.maxAway.numList">
					<template v-if="a==modeType-1">
					  <td>{{numList.is}}</td>
					  <td>{{numList.ag}}</td>
					  <td>{{numList.ps}}</td>
					  <td>{{numList.hag}}</td>
					  <td>{{numList.or}}</td>
					  <td>{{numList.gt}}</td>
					  <td>{{numList.gs}}</td>
					  <td>{{numList.is}}</td>
					</template>
				  </template>
				</tr>
				<tr class="closas">
				  <td colspan="4">最大遗漏</td>
				  <template v-for="(numList,a) in mainData.statistics.max.numList">
					<template v-if="a==modeType-1">
					  <td>{{numList.is}}</td>
					  <td>{{numList.ag}}</td>
					  <td>{{numList.ps}}</td>
					  <td>{{numList.hag}}</td>
					  <td>{{numList.or}}</td>
					  <td>{{numList.gt}}</td>
					  <td>{{numList.gs}}</td>
					  <td>{{numList.is}}</td>
					</template>
				  </template>
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
	name: 'pattern-trend',
	props: ['code', 'date', 'current_number'],
	data() {
		return {
			showFilter: -1,
			mainData: null,
			tPeriods: 30,
			modeType: 1, //1:前三形态 2：中三形态 3：后三形态
			filterRs: {
				missing: true, //遗漏
				disassemble: true, //折线
				missingLayer: false, //遗漏分层
				dividingLine: false //分割线
			},
			temRs: null,
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
		uni.showLoading({title:"loading"});
		that.getAnalysisDetail();
		that.startCount();
	},
	methods: {
		choseMode(m) {
			let that = this;
			if (that.modeType == m) return;
			that.modeType = m;
			$('canvas').remove();
			setTimeout(function() {
				that.filterCtrl();
			}, 100);
		},
		//滚动到底部
		goBottom() {
			document.getElementById('chartbottom').scrollIntoView();
		},
		lineToChart() {
			let orblue = $('.orblue');
			let orcls = $('.orcls');
			if (orblue.length > 1) {
				for (let i = 1; i < orblue.length; i++) {
					this.line(orblue[i - 1].parentElement, orblue[i].parentElement, 1, '#0092e0');
				}
			}
			if (orcls.length > 1) {
				for (let i = 1; i < orcls.length; i++) {
					this.line(orcls[i - 1].parentElement, orcls[i].parentElement, 1, '#f2b653');
				}
			}
		},
		line(header, footer, line_width, line_color) {
			let xstart = 0;
			let xpos = 0;
			let ypos = 9;
			let canvas = document.createElement('canvas');
			canvas.style.position = 'absolute';
			canvas.style.visibility = 'visible';
			canvas.height = 26;
			if (header.offsetLeft < footer.offsetLeft) {
				canvas.style.top = 13 + header.offsetTop + 'px';
				canvas.style.left = 29 + header.offsetLeft + 'px';
				canvas.width = footer.offsetLeft - header.offsetLeft;
				xpos = footer.offsetLeft - header.offsetLeft - 20;
				ypos = 26;
			} else if (header.offsetLeft == footer.offsetLeft) {
				canvas.height = 13;
				canvas.style.top = 21 + header.offsetTop + 'px';
				canvas.style.left = 14 + header.offsetLeft + 'px';
				canvas.width = 10;
			} else {
				ypos = 26;
				canvas.style.top = 13 + header.offsetTop + 'px';
				canvas.style.left = 29 + footer.offsetLeft + 'px';
				canvas.width = header.offsetLeft - footer.offsetLeft;
				xstart = header.offsetLeft - footer.offsetLeft - 23;
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
				$('#allNumber')
					.find('tr')
					.each(function() {
						let tds = $(this).find('td');
						tds.each(function(i) {
							if (i > 3) {
								$(this)
									.find('text')
									.hide();
							}
						});
					});
				$('.hot')
					.find('text')
					.show();
			} else {
				$('#allNumber')
					.find('tr')
					.find('td')
					.find('text')
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
					let is = true;
					let ag = true;
					let ps = true;
					let hag = true;
					let or = true;
					let gt = true;
					let gs = true;
					for (let i = 0; i < this.mainData.list.length; i++) {
						if (is) {
							if (i == this.mainData.list.length - 1 || this.mainData.list[i].list.numList[this.modeType - 1].is == 0) {
								let item = {};
								item.rows = i;
								item.cols = 4;
								temp.push(item);
								item = {};
								item.rows = i;
								item.cols = 11;
								temp.push(item);
								is = false;
							}
						}
						if (ag) {
							if (i == this.mainData.list.length - 1 || this.mainData.list[i].list.numList[this.modeType - 1].ag == 0) {
								let item = {};
								item.rows = i;
								item.cols = 5;
								temp.push(item);
								ag = false;
							}
						}
						if (ps) {
							if (i == this.mainData.list.length - 1 || this.mainData.list[i].list.numList[this.modeType - 1].ps == 0) {
								let item = {};
								item.rows = i;
								item.cols = 6;
								temp.push(item);
								ps = false;
							}
						}
						if (hag) {
							if (i == this.mainData.list.length - 1 || this.mainData.list[i].list.numList[this.modeType - 1].hag == 0) {
								let item = {};
								item.rows = i;
								item.cols = 7;
								temp.push(item);
								hag = false;
							}
						}
						if (or) {
							if (i == this.mainData.list.length - 1 || this.mainData.list[i].list.numList[this.modeType - 1].or == 0) {
								let item = {};
								item.rows = i;
								item.cols = 8;
								temp.push(item);
								or = false;
							}
						}
						if (gt) {
							if (i == this.mainData.list.length - 1 || this.mainData.list[i].list.numList[this.modeType - 1].gt == 0) {
								let item = {};
								item.rows = i;
								item.cols = 9;
								temp.push(item);
								gt = false;
							}
						}
						if (gs) {
							if (i == this.mainData.list.length - 1 || this.mainData.list[i].list.numList[this.modeType - 1].gs == 0) {
								let item = {};
								item.rows = i;
								item.cols = 10;
								temp.push(item);
								gs = false;
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
			that.mainData = null;
			$('canvas').remove();
			this.$api.getAnalysisDetail({ code: that.code, type: 'xtzs', date: that.date }).then(res => {
				if (res.code == 0) {
					// if ((typeof res.data.list == 'object') && res.data.list.constructor == Array) {
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
					// that.loading.dismiss();
					// } else {
					//   setTimeout(that.getAnalysisDetail(),500);
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
			width: 75px;
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
		position: relative;
		table{
			background-color: #dbdbdb;
			width: 100%;
			color: #999;
			th {
			    text-align: center;
			    height: 25px;
			    background: #f0f0f0;
			    font-size: 14px;
			    color: #333;
			    // border: 1px solid #eaeaea;
				font-size: 12px;
			}
			td {
			    text-align: center;
			    height: 25px;
			    background: #fff;
			    // min-width: 20px;
				font-size: 12px;
			    // border: 1px solid #eaeaea;
				text{
					font-size: 12px;
				}
			}
			
			.hot text{
			    display: inline-block;
			    // height: 16px;
			    // line-height: 16px;
			    // width: 16px;
			    color: #fff;
			    border-radius: 50%;
			    width: 24px!important;
			    height: 24px!important;
			    line-height: 24px!important;
			}
			.orblue{
			    background: #0092e0;				
			}
			 .orcls {
			    background: #e12121!important;
			}
			tr.clospan td {
			    background: #f0f0f0;
			    font-size: 14px;
			    color: #333;
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
