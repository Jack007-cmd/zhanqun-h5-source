<template name="guanya-trend">
	<view class="container" v-if="mainData && mainData.list && mainData.list.length > 0">
		<view class="gyh-head">
			<view class="gyh-btn" @tap.stop="actionSheetTap">{{ tPeriods == 2000 ? '当天' : tPeriods == 30 ? '近30期' : tPeriods == 60 ? '近60期' : '近90期' }}</view>
			<view class="gyh-btn" @tap.stop="choseCon(3)">筛选</view>
			<view class="gyh-sjtj" @tap.stop="goBottom()">查看数据统计</view>
		</view>
		<view class="table-box" id="chartLinediv">
			<table @touchstart.stop @touchend.stop border="0" cellspacing="1" cellpadding="1">
				<thead>
					<tr>
						<th>期号</th>
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
						<th>19</th>
					</tr>
				</thead>
				<tbody id="allNumber">
					<template v-for="(item, index) in mainData.list">
						<tr  v-if="index < tPeriods">
							<td>{{ item.no }}</td>
							 <template v-if="item.tas">
							 	<td v-for="(temp, tempIndex) in item.tas" :class="{hot_gyh:temp==0}">
							 		<view>{{ temp == 0 ? tempIndex + 3 : temp }}</view>
							 	</td>
							 </template>
						
						</tr>
					</template>
				</tbody>
				<tbody>
					<tr>
						<th>数据统计</th>
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
						<th>19</th>
					</tr>
					<tr>
						<td>出现总数</td>
						<td v-for="(appear, appearIndex) in mainData.statistics.appear" >{{ appear }}</td>
					</tr>
					<tr>
						<td>平均遗漏</td>
						<td v-for="(avg, avgIndex) in mainData.statistics.avg" >{{ avg }}</td>
					</tr>
					<tr>
						<td>平均遗漏</td>
						<td v-for="(current, currentIndex) in mainData.statistics.current" >{{ current }}</td>
					</tr>
					<tr>
						<td>最大连出</td>
						<td v-for="(maxAway, maxAwayIndex) in mainData.statistics.maxAway" >{{ maxAway }}</td>
					</tr>
					<tr>
						<td>最大遗漏</td>
						<td v-for="(max, maxIndex) in mainData.statistics.max" >{{ max }}</td>
					</tr>
				</tbody>
			</table>
		</view>
		<view id="chartbottom"></view>
		<view class="u-popup" v-if="showFilter == 3 && temRs">
			<view class="u-transition-out" @click="choseCon(-1)"></view>
			<view class="u-transition">
				<view class="u-popup__wrapper-box">
					<view class="u-main">
						<view class="u-title">
							<view class="option-md">条件选择</view>
							<view class="option-md" @click="choseCon(99)">确定</view>
						</view>
						<view class="u-content">
							<view class="content-item">
								<view class="option" :class="{ checked: temRs.missing }" @click="temRs.missing=!temRs.missing">遗漏</view>
								<view class="option" :class="{ checked: temRs.disassemble }" @click="temRs.disassemble=!temRs.disassemble">折线</view>
								<view class="option" :class="{ checked: temRs.missingLayer }" @click="temRs.missingLayer=!temRs.missingLayer">遗漏分层</view>
								<view class="option" :class="{ checked: temRs.dividingLine }" @click="temRs.dividingLine=!temRs.dividingLine">分割线</view>
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
	name: 'guanya-trend',
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
			temRs: {
				missing: true, //遗漏
				disassemble: true, //折线
				missingLayer: false, //遗漏分层
				dividingLine: false //分割线
			}
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
		uni.showLoading({
			title:'loading'
		});
		this.getAnalysisDetail();
	},
	methods: {
		  filterCtrl() {
			$("canvas").remove();
		    if (!this.filterRs.missing) {
		      $("#allNumber").find("tr").each(function () {
		        let tds = $(this).find("td");
		        tds.each(function (i) {
		          if (i > 0) {
		            $(this).find("uni-view").hide();
		          }
		        });
		      });
		      $(".hot_gyh").find("uni-view").show();
		    } else {
		      $("#allNumber").find("tr").find("td").find("uni-view").show();
		    }
		    if (this.filterRs.dividingLine) {
		      if ($(".bold_top_border").length == 0) {
		        $("#allNumber").find("tr").each(function () {
		          if (Number($(this).find("td").eq(0).text().trim()) % 5 == 0) {
		            $(this).addClass("bold_top_border");
		          }
		        });
		      }
		    } else {
		      $(".bold_top_border").removeClass("bold_top_border");
		    }
		    if (!this.filterRs.disassemble) {
		      $("canvas").remove();
		      // this.change++;
		    } else {
		      if ($("canvas").length == 0) {
		        this.lineToChart();
		      }
		    }
		    if (!this.filterRs.missingLayer) {
		      $(".purple").removeClass("purple");
		    } else {
		      let temp = [];
		      for (let i = 3; i < 20; i++) {
		        let flag = true;
		        for (let j = 0; j < this.mainData.list.length; j++) {
		          if (flag) {
		            if (j == this.mainData.list.length - 1 || this.mainData.list[j].tas[i - 3] == 0) {
		              let item = {};
		              item.rows = j;
		              item.cols = i - 2;
		              temp.push(item);
		              flag = false;
		            }
		          }
		        }
		      }
		      temp.forEach((v) => {
		        $("#allNumber").find("tr").each(function (i) {
		          if (i < v.rows) {
		            $(this).find("td").eq(v.cols).addClass("purple");
		          }
		        });
		      });
		    }
		  },
		  lineToChart() {
		    let hot = $(".hot_gyh");
		    if (hot.length > 1) {
		      for (let i = 1; i < hot.length; i++) {
		        this.line(hot[i - 1],
		          hot[i], 1, "#0092e0");
		      }
		    }
		  },
		
		  //画直线方法：起始元素、终止元素、线宽、颜色
		  line(header, footer, line_width, line_color) {
		    let xstart = 0;
		    let xpos = 0;
		    let ypos = 15;
		    let canvas = document.createElement("canvas");
		    canvas.style.position = "absolute";
		    canvas.style.visibility = "visible";
		    canvas.height = 30;
		    if (header.offsetLeft < footer.offsetLeft) {
		      canvas.style.top = (16 + header.offsetTop) + "px";
		      canvas.style.left = (16 + header.offsetLeft) + "px";
		      canvas.width = (footer.offsetLeft - header.offsetLeft);
		      xpos = footer.offsetLeft - header.offsetLeft - 14;
		      ypos = 30;
		    } else if (header.offsetLeft == footer.offsetLeft) {
		      canvas.height = 18;
		      canvas.style.top = (25 + header.offsetTop) + "px";
		      canvas.style.left = (9 + header.offsetLeft) + "px";
		      canvas.width = 10;
		    } else {
		      ypos = 30;
		      canvas.style.top = (16 + header.offsetTop) + "px";
		      canvas.style.left = (16 + footer.offsetLeft) + "px";
		      canvas.width = (header.offsetLeft - footer.offsetLeft);
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
		    $("#chartLinediv").append(canvas);
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
					setTimeout(function() {
						that.filterCtrl();
					}, 100);
					
				}
			});
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
		getAnalysisDetail() {
			let that = this;
			that.mainData = {
				list: [],
				statistics: {
					appear: [],
					avg: [],
					max: [],
					maxAway: [],
					current: []
				}
			};
			// $("#" + that.code).find("canvas").remove();
			that.$api.getAnalysisDetail({ code: that.code, type: 'gyhzs', date: that.date }).then(res => {
					uni.hideLoading();
				if (res.code == 0) {
					if (typeof res.data.list == 'object' && res.data.list.constructor == Array) {
						let list = [];
						res.data.list.forEach(v => {
							let item = {};
							let tas = [];
							if(v.list.tas){
								v.list.tas.forEach(value => {
									Object.keys(value).forEach(function(key) {
										tas.push(value[key]);
									});
								});
							}
							item.no = v.no;
							item.tas = tas;
							list.push(item);
						});
						this.mainData.list = list;
						let appear = [];
						let avg = [];
						let max = [];
						let maxAway = [];
						let current = [];
						if(res.data.statistics.appear){
							res.data.statistics.appear.tas.forEach(v => {
								Object.keys(v).forEach(function(key) {
									appear.push(v[key]);
								});
							});
						}
						if(res.data.statistics.avg){
							res.data.statistics.avg.tas.forEach(v => {
								Object.keys(v).forEach(function(key) {
									avg.push(v[key]);
								});
							});
						}
						if(res.data.statistics.max){
							res.data.statistics.max.tas.forEach(v => {
								Object.keys(v).forEach(function(key) {
									max.push(v[key]);
								});
							});
						}
						if(res.data.statistics.maxAway){
							res.data.statistics.maxAway.tas.forEach(v => {
								Object.keys(v).forEach(function(key) {
									maxAway.push(v[key]);
								});
							});
						}
						if(res.data.statistics.current){
							res.data.statistics.current.tas.forEach(v => {
								Object.keys(v).forEach(function(key) {
									current.push(v[key]);
								});
							});
						}
						that.mainData.statistics.appear = appear;
						that.mainData.statistics.avg = avg;
						that.mainData.statistics.max = max;
						that.mainData.statistics.maxAway = maxAway;
						that.mainData.statistics.current = current;
						setTimeout(function(){ that.filterCtrl() }, 100);
					} else {
						setTimeout(that.getAnalysisDetail(), 500);
					}
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
	.table-box {
		position: relative;
		overflow-x: scroll;
		width: 100%;
		table {
			display: table;
			background: #e6e6e6;
			width: 100%;
			color: #666;
			white-space: nowrap;
			text-align: center;
			th {
				color: #333;
				height: 30px;
				background: #f0f0f0;
				text-align: center;
				font-size: 12px;
				line-height: 30px;
			}
			tbody {
				td {
					text-align: center;
					font-size: 12px;
					height: 30px;
					background: #fff;
					uni-view {
						font-size: 12px;
					}
				}
				.hot_gyh {
					uni-view {
						background: #1fa6e8;
						color: #fff !important;
						display: inline-block;
						width: 15px;
						height: 15px;
						line-height: 15px;
						border-radius: 7px;
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
