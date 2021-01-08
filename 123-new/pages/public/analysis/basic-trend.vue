<template name="basic-trend">
	<view class="container" v-if="mainData && mainData.list && mainData.list.length > 0">
		<view class="gyh-head">
			<view class="gyh-btn" @tap.stop="actionBallTap" v-if="codeType < 4">
				{{ tGoal == 0 ? '第一球' : tGoal == 1 ? '第二球' : tGoal == 2 ? '第三球' : tGoal == 3 ? '第四球' : '第五球' }}
			</view>
			<view class="gyh-btn" @tap.stop="actionSheetTap">{{ tPeriods == 2000 ? '当天' : tPeriods == 30 ? '近30期' : tPeriods == 60 ? '近60期' : '近90期' }}</view>
			<view class="gyh-btn" @tap.stop="choseCon(3)">筛选</view>
			<view class="gyh-sjtj" @tap.stop="goBottom()">查看数据统计</view>
		</view>
		<view>
			<view class="table-box" id="chartLinediv" v-if="codeType < 4">
				<table class="table_hamafb" cellpadding="1" cellspacing="1">
					<thead>
						<tr v-if="codeType == 1">
							<th>期号</th>
							<th>号码</th>
							<th>1</th>
							<th>2</th>
							<th>3</th>
							<th>4</th>
							<th>5</th>
							<th>6</th>
							<th>7</th>
							<th>8</th>
							<th>9</th>
							<th>10</th>
						</tr>
						<tr v-if="codeType == 2">
							<th>期号</th>
							<th>号码</th>
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
						<tr v-if="codeType == 3">
							<th>期号</th>
							<th>号码</th>
							<th>1</th>
							<th>2</th>
							<th>3</th>
							<th>4</th>
							<th>5</th>
							<th>6</th>
							<th>7</th>
							<th>8</th>
							<th>9</th>
							<th>10</th>
							<th>11</th>
						</tr>
					</thead>
					<tbody class="allNumber">
						<template v-for="(item, m) in mainData.list">
							<tr :key="'m'+m" v-if="m < tPeriods">
								<td>{{ item.no.toString().substring(4) }}</td>
								<td  class="tabred" >
									<text>{{ item.num[tGoal] }}</text>
								</td>
								<!-- <template v-for="(basic, b) in item.list.basic">
									<template v-if="b == tGoal"> -->
										<td :key="item.no+'t'+tIndex" :class="{hot:temp==0}" v-for="(temp,tIndex) in item.list.basic[tGoal]">
											<text>{{ temp==0?(Number(tIndex)-1):temp}}</text>
										</td>
									<!-- </template>
								</template> -->
							</tr>
						</template>
					</tbody>
					<tbody>
						<tr v-if="codeType == 1" class="clospan">
							<td colspan="2">数据统计</td>
							<td>1</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
							<td>5</td>
							<td>6</td>
							<td>7</td>
							<td>8</td>
							<td>9</td>
							<td>10</td>
						</tr>
						<tr v-if="codeType == 2" class="clospan">
							<td colspan="2">数据统计</td>
							<td>0</td>
							<td>1</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
							<td>5</td>
							<td>6</td>
							<td>7</td>
							<td>8</td>
							<td>9</td>
						</tr>
						<tr v-if="codeType == 3" class="clospan">
							<td colspan="2">数据统计</td>
							<td>1</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
							<td>5</td>
							<td>6</td>
							<td>7</td>
							<td>8</td>
							<td>9</td>
							<td>10</td>
							<td>11</td>
						</tr>
						<tr>
							<td colspan="2">总次数</td>
						<!-- 	<template v-for="(basic, b) in mainData.statistics.appear.basic">
								<template v-if="b == tGoal"> -->
									<td :key="'amount'+am" v-for="(appear,am) in mainData.statistics.appear.basic[tGoal]">{{ appear }}</td>
							<!-- 	</template>
							</template> -->
						</tr>
						<tr>
							<td colspan="2">平均遗漏</td>
					<!-- 		<template v-for="(basic, b) in mainData.statistics.avg.basic">
								<template v-if="b == tGoal"> -->
									<td :key="'a'+aIndex" v-for="(avg,aIndex) in mainData.statistics.avg.basic[tGoal]">{{ avg }}</td>
								<!-- </template>
							</template> -->
						</tr>
						<tr>
							<td colspan="2">当前遗漏</td>
					<!-- 		<template v-for="(basic, b) in mainData.statistics.current.basic">
								<template v-if="b == tGoal"> -->
									<td :key="'b'+bIndex" v-for="(current,bIndex) in mainData.statistics.current.basic[tGoal]">{{ current }}</td>
						<!-- 		</template>
							</template> -->
							<!--<td v-for="let current of mainData.statistics.current.basic[tGoal];">{{current}}</td>-->
						</tr>
						<tr>
							<td colspan="2">最大连出</td>
							<!-- <template v-for="(basic, b) in mainData.statistics.maxAway.basic">
								<template v-if="b == tGoal"> -->
									<td :key="'c'+cIndex" v-for="(maxAway,cIndex) in mainData.statistics.maxAway.basic[tGoal]">{{ maxAway }}</td>
							<!-- 	</template>
							</template> -->
						</tr>
						<tr>
							<td colspan="2">最大遗漏</td>
							<!-- <template v-for="(basic, b) in mainData.statistics.max.basic">
								<template v-if="b == tGoal"> -->
									<td :key="'d'+dIndex" v-for="(max,dIndex) in mainData.statistics.max.basic[tGoal]">{{ max }}</td>
								<!-- </template>
							</template> -->
						</tr>
					</tbody>
				</table>
			</view>
			<view class="table-box" v-if="codeType == 4">
				<table border="0" cellspacing="1" cellpadding="1" id="table_jiben">
					<thead>
						<tr>
							<th rowspan="2" style="width: 22%">期号</th>
							<th rowspan="2" style="width: 10%;padding: 0 5px 0 5px;">开奖号码</th>
							<th colspan="6">开奖号码分布</th>
							<th colspan="3">号码形态</th>
						</tr>
						<tr>
							<th style="width: 5%;">1</th>
							<th style="width: 5%;">2</th>
							<th style="width: 5%;">3</th>
							<th style="width: 5%;">4</th>
							<th style="width: 5%;">5</th>
							<th style="width: 5%;">6</th>
							<th style="width: 12%;">豹子</th>
							<th style="width: 12%;">三不同</th>
							<th style="width: 12%;">对子</th>
						</tr>
					</thead>
					<tbody class="allNumber">
						<tr :key="item.no" v-for="item in mainData.list">
							<td>{{ item.no }}</td>
							<td class="tabred">
								<text class="yanse">
									<template v-for="n in item.num">
										{{ n }}&nbsp;
									</template>
								</text>
							</td>
							<td :key="item.no+'-'+index" style="background: #fdf7ed;" :class="{ hot: temp.out == 0 }" v-for="(temp, index) in item.list.cit">
								<text>
									{{ temp.out == 0 ? index + 1 : temp.out }}
									<i class="smallQiu" v-if="temp.sum > 1">{{ temp.sum }}</i>
								</text>
							</td>
							<td :class="{ hot: item.list.is == 0, pk: item.list.is == 0 }">
								<text v-if="item.list.is > 0">{{ item.list.is }}</text>
								<text v-if="item.list.is == 0" style="display: initial;background: transparent;">豹子</text>
							</td>
							<td :class="{ hot: item.list.un == 0, pl: item.list.un == 0 }">
								<text v-if="item.list.un > 0">{{ item.list.un }}</text>
								<text v-if="item.list.un == 0" style="display: initial;background: transparent;">三不同</text>
							</td>
							<td :class="{ hot: item.list.pairs == 0, pk: item.list.pairs == 0 }">
								<text v-if="item.list.pairs > 0">{{ item.list.pairs }}</text>
								<text v-if="item.list.pairs == 0" style="display: initial;background: transparent;">对子</text>
							</td>
						</tr>
						<tr class="huery">
							<th rowspan="2" colspan="2" style="background: #F0F0F0;">数据统计</th>
							<th colspan="6" style="background: #F0F0F0;">开奖号码分布</th>
							<th colspan="3" style="background: #F0F0F0;">号码形态</th>
						</tr>
						<tr class="huery">
							<th style="width: 5%;background: #F0F0F0;">1</th>
							<th style="width: 5%;background: #F0F0F0;">2</th>
							<th style="width: 5%;background: #F0F0F0;">3</th>
							<th style="width: 5%;background: #F0F0F0;">4</th>
							<th style="width: 5%;background: #F0F0F0;">5</th>
							<th style="width: 5%;background: #F0F0F0;">6</th>
							<th style="width: 12%;background: #F0F0F0;">豹子</th>
							<th style="width: 12%;background: #F0F0F0;">三不同</th>
							<th style="width: 12%;background: #F0F0F0;">对子</th>
						</tr>
						<tr>
							<td colspan="2">出现次数</td>
							<td class="lop" :key="'v'+vIndex" v-for="(temp,vIndex) in mainData.statistics.appear.cit">{{ temp.out }}</td>
							<td>{{ mainData.statistics.appear.is }}</td>
							<td>{{ mainData.statistics.appear.un }}</td>
							<td>{{ mainData.statistics.appear.pairs }}</td>
						</tr>
						<tr>
							<td colspan="2">平均遗漏</td>
							<td class="lop" :key="'w'+wIndex" v-for="(temp,wIndex) in mainData.statistics.avg.cit">{{ temp.out }}</td>
							<td>{{ mainData.statistics.avg.is }}</td>
							<td>{{ mainData.statistics.avg.un }}</td>
							<td>{{ mainData.statistics.avg.pairs }}</td>
						</tr>
						<tr>
							<td colspan="2">当前遗漏</td>
							<td class="lop" :key="'x'+xIndex" v-for="(temp,xIndex) in mainData.statistics.current.cit">{{ temp.out }}</td>
							<td>{{ mainData.statistics.current.is }}</td>
							<td>{{ mainData.statistics.current.un }}</td>
							<td>{{ mainData.statistics.current.pairs }}</td>
						</tr>
						<tr>
							<td colspan="2">最大连出</td>
							<td class="lop" :key="'y'+yIndex" v-for="(temp,yIndex) in mainData.statistics.maxAway.cit">{{ temp.out }}</td>
							<td>{{ mainData.statistics.maxAway.is }}</td>
							<td>{{ mainData.statistics.maxAway.un }}</td>
							<td>{{ mainData.statistics.maxAway.pairs }}</td>
						</tr>
						<tr>
							<td colspan="2">最大遗漏</td>
							<td class="lop" :key="'z'+zIndex" v-for="(temp,zIndex) in mainData.statistics.max.cit">{{ temp.out }}</td>
							<td>{{ mainData.statistics.max.is }}</td>
							<td>{{ mainData.statistics.max.un }}</td>
							<td>{{ mainData.statistics.max.pairs }}</td>
						</tr>
					</tbody>
				</table>
			</view>
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
								<view class="option" :class="{ checked: temRs.missing }" @click="temRs.missing = !temRs.missing">遗漏</view>
								<view class="option" :class="{ checked: temRs.disassemble }" @click="temRs.disassemble = !temRs.disassemble">折线</view>
								<view class="option" :class="{ checked: temRs.missingLayer }" @click="temRs.missingLayer = !temRs.missingLayer">遗漏分层</view>
								<view class="option" :class="{ checked: temRs.dividingLine }" @click="temRs.dividingLine = !temRs.dividingLine">分割线</view>
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
	name: 'basic-trend',
	props: ['code', 'date', 'current_number'],
	data() {
		return {
			showFilter: -1,
			mainData: null,
			tGoal: 0, //0第一球 1第二球 2第三球 3第四球 4 第五球
			tPeriods: 30,
			filterRs: {
				missing: true, //遗漏
				disassemble: true, //折线
				missingLayer: false, //遗漏分层
				dividingLine: false //分割线
			},
			temRs: {},
			codeType: -1,
			new_number: ''
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
		const allTypes = uni.getStorageSync('analysisKinds')['jbzs'];
		// Detail-01 :北京PK10(bjpks) 澳洲幸运10(ajxys) 极速赛车(jssc) 极速飞艇(jsft)（4）
		// Detail-02:重庆时时彩(cqssc) 天津时时彩(tjssc) 新疆时时彩(xjssc) 极速时时彩(jsssc) 重庆七星彩(cqqxc) 澳洲幸运5(ajxyw)（6）
		if (allTypes['type1'].indexOf(that.code) != -1) {
			that.codeType = 1;
		} else if (allTypes['type2'].indexOf(that.code) != -1) {
			// if(['cqssc','tjssc','xjssc','jsssc','cqqxc','ajxyw'].indexOf(this.code)!=-1){
			that.codeType = 2;
		} else if (allTypes['type3'].indexOf(that.code) != -1) {
			that.codeType = 3;
		} else if (allTypes['type4'].indexOf(that.code) != -1) {
			that.codeType = 4;
		}
		uni.showLoading({ title: 'loading' });
		
		that.getAnalysisDetail();
		that.hotSpanDrawLine();
		that.startCount();
	},
	methods: {
		hotSpanDrawLine() {
			// $('.allNumber')
			// 	.eq(0)
			// 	.find('tr')
			// 	.each(function() {
			// 		let tds = $(this).find('td');
			// 		tds.each(function(i) {
			// 			if (
			// 				i > 1 &&
			// 				$(this).text()
			// 					.trim() == '0'
			// 			) {
			// 				$(this).html(tds.eq(1).html());
			// 				$(this).addClass('hot');
			// 			}
			// 		});
			// 	});
			// this.lineToChart();
		},
		lineToChart() {
			let hot = $('.hot');
			if (hot.length > 1) {
				for (let i = 1; i < hot.length; i++) {
					this.line(hot[i - 1], hot[i], 1, '#0092e0');
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
			canvas.height = 25;
			if (header.offsetLeft < footer.offsetLeft) {
				canvas.style.top = 13 + header.offsetTop + 'px';
				canvas.style.left = 22 + header.offsetLeft + 'px';
				canvas.width = footer.offsetLeft - header.offsetLeft;
				xpos = footer.offsetLeft - header.offsetLeft - 14;
				ypos = 25;
			} else if (header.offsetLeft == footer.offsetLeft) {
				canvas.height = 13;
				canvas.style.top = 22 + header.offsetTop + 'px';
				canvas.style.left = 14 + header.offsetLeft + 'px';
				canvas.width = 10;
			} else {
				ypos = 25;
				canvas.style.top = 13 + header.offsetTop + 'px';
				canvas.style.left = 22 + footer.offsetLeft + 'px';
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
		//滚动到底部
		goBottom() {
			document.getElementById('chartbottom').scrollIntoView();
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
			if (!this.filterRs.missing) {
				$('.allNumber')
					.eq(0)
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
				$('.hot')
					.find('span')
					.show();
			} else {
				$('.allNumber')
					.eq(0)
					.find('tr')
					.find('td')
					.find('span')
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
				this.change++;
			} else {
				if ($('canvas').length == 0) {
					this.lineToChart();
				}
			}
			$('.purple').removeClass('purple');
			if (this.filterRs.missingLayer)  {
				if (this.mainData && this.mainData.list) {
					let temp = [];
					if (this.codeType < 4) {
						let s = this.codeType == 2 ? 0 : 1;
						let e = this.codeType == 2 ? 10 : this.codeType == 1 ? 11 : 12;
						for (let k = s; k < e; k++) {
							let flag = true;
							for (let i = 0; i < this.mainData.list.length; i++) {
								if (flag) {
									if (i == this.mainData.list.length - 1 || Number(this.mainData.list[i].num[this.tGoal]) == k) {
										let item = {};
										item.rows = i;
										item.cols = k + 2 + (this.codeType == 2 ? 0 : -1);
										temp.push(item);
										flag = false;
									}
								}
							}
						}
					} else {
						for (let k = 0; k < 6; k++) {
							let flag = true;
							for (let i = 0; i < this.mainData.list.length; i++) {
								if (flag) {
									if (i == this.mainData.list.length - 1 || Number(this.mainData.list[i].list.cit[k].out) == 0) {
										let item = {};
										item.rows = i;
										item.cols = k + 2;
										temp.push(item);
										flag = false;
									}
								}
							}
						}
						for (let i = 0; i < this.mainData.list.length; i++) {
							if (i == this.mainData.list.length - 1 || Number(this.mainData.list[i].list.is) == 0) {
								temp.push({ rows: i, cols: 8 });
								break;
							}
						}
						for (let i = 0; i < this.mainData.list.length; i++) {
							if (i == this.mainData.list.length - 1 || Number(this.mainData.list[i].list.un) == 0) {
								temp.push({ rows: i, cols: 9 });
								break;
							}
						}
						for (let i = 0; i < this.mainData.list.length; i++) {
							if (i == this.mainData.list.length - 1 || Number(this.mainData.list[i].list.pairs) == 0) {
								temp.push({ rows: i, cols: 10 });
								break;
							}
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
		actionBallTap(){
			let that = this;
			uni.showActionSheet({
				title: '期数选择',
				itemList: ['第一球', '第二球', '第三球', '第四球', '第五球'],
				success: e => {
					that.tGoal = e.tapIndex;
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
			this.$api.getAnalysisDetail({ code: that.code, type: 'jbzs', date: that.date }).then(res => {
				if (res.code == 0) {
					if (that.codeType < 4) {
						// if (typeof res.data.list == 'object' && res.data.list.constructor == Array) {
							// res.data.list.forEach(v => {
							// 	that.objectToArray(v.list.basic);
							// });
							// $.each(res.data.list,function(k,v){
							// 	that.objectToArray(v.list.basic);
							// })
							var arr = [];
							$.each(res.data.list,function(k,v){
								arr.push(res.data.list[k])
							})
							res.data.list = arr;
							$.map(res.data.list,function(v,key){
								that.objectToArray(v.list.basic);
							});
							that.new_number = res.data.list[0]['no'];
							if(that.new_number != that.current_number){
								return;
							}else{
								uni.hideLoading();
							}
							if(res.data.statistics.appear){
								that.objectToArray(res.data.statistics.appear.basic);
							}
							if(res.data.statistics.avg){
								that.objectToArray(res.data.statistics.avg.basic);
							}
							if(res.data.statistics.current){
								that.objectToArray(res.data.statistics.current.basic);
							}
							if(res.data.statistics.maxAway){
								that.objectToArray(res.data.statistics.maxAway.basic);
							}
							if(res.data.statistics.max){
								that.objectToArray(res.data.statistics.max.basic);
							}
							that.mainData = res.data;
							// that.loading.dismiss();
						// } else {
						// 	setTimeout(that.getAnalysisDetail(), 500);
						// }
					} else if (that.codeType == 4) {
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
						res.data.list.forEach(v => {
							let temp = [];
							Object.keys(v.list.cit).forEach(function(key) {
								temp.push(v.list.cit[key]);
							});
							v.list.cit = temp;
							v.list.is = v.list.is[0][0];
							v.list.un = v.list.un[0][0];
							v.list.pairs = v.list.pairs[0][0];
						});
						Object.keys(res.data.statistics).forEach(function(k) {
							let temp = [];
							Object.keys(res.data.statistics[k].cit).forEach(function(key) {
								temp.push(res.data.statistics[k].cit[key]);
							});
							res.data.statistics[k].cit = temp;
							res.data.statistics[k].is = res.data.statistics[k].is[0][0];
							res.data.statistics[k].un = res.data.statistics[k].un[0][0];
							res.data.statistics[k].pairs = res.data.statistics[k].pairs[0][0];
						});
						that.mainData = res.data;
					}
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
		objectToArray(objArr) {
			objArr.forEach((obj, k) => {
				if (obj.constructor != Array) {
					let basic = [];
					let sdic = Object.keys(obj).sort(); //根据key排序
					for (let i = 0; i < sdic.length; i++) {
						basic.push(obj[sdic[i]]);
					}
					objArr[k] = basic;
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
		width: 100%;
		height: auto;
		table{
			background-color: #dbdbdb;
			width: 100%;
			color: #999;
		}
		th{
			font-size: 12px;			
		}
		 thead th {
		    text-align: center;
		    height: 25px;
		    background: #f0f0f0;
		    color: #333;
		}
		td{
			text-align: center;
			height: 25px;
			background: #fff;
			min-width: 20px;
			font-size: 12px;
			.smallQiu{
				    background-color: red;
				    display: inline-block;
				    color: #fff;
				    margin-top: -7px;
				    margin-left: -3px;
				    position: absolute;
				    width: 12px;
				    height: 12px;
				    z-index: 99;
				    font-size: 11px;
				    border-radius: 13px;
				    line-height: 12px;
				    font-style: normal;
			}
		}
		.pl{
			    background: #00baff;
		}
		.pk{
			    background: #fb972c;
		}
		.tabred text {
		    color: #ef020a;
		    font-weight: 600;
		}
		.hot text {
		    display: inline-block;
		    height: 16px;
		    line-height: 16px;
		    width: 16px;
		    background: #0092e0;
		    color: #fff;
		    border-radius: 50%;
		}
		.clospan td {
		    background: #f0f0f0;
		    color: #333;
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
