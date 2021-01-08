<template name="luzhu-analysis">
	<view class="container">
		<template v-if="mainData">
			<view class="pattern">
				<view class="mode" :class="{ checked: mode == '9' }" @tap.stop="choseMode('9')">综合模式</view>
				<view class="mode" :class="{ checked: mode == '1' }" @tap.stop="choseMode('1')">单选模式</view>
				<view class="mode" :class="{ checked: mode == '2' }" @tap.stop="choseMode('2')">双面模式</view>
			</view>
			<view class="desc"><view class="check-click" @tap.stop="choseCon(1)">条件筛选</view></view>
			<template v-if="codeType == 2 || codeType == 3">
				<view v-for="(item, index) in mainData.position" :key="index">
					<template v-if="showRs.indexOf(index.toString()) != -1">
						<view class="content-list" v-if="item.oddEvenList.length > 0 && showRs.indexOf('d') != -1">
							<view class="content-title">
								<view class="title-left">今日累计：单（{{ item.single }}）双（{{ item.double }}）</view>
								<view class="title-right">
									第{{
										index == 0
											? '一'
											: index == 1
											? '二'
											: index == 2
											? '三'
											: index == 3
											? '四'
											: index == 4
											? '五'
											: index == 5
											? '六'
											: index == 6
											? '七'
											: '八'
									}}球&nbsp;&nbsp;单双&nbsp;&nbsp;最新&nbsp;&nbsp;↓
								</view>
							</view>
							<view class="table-box">
								<table @touchstart.stop @touchend.stop border="0" cellpadding="1" cellspacing="1">
									<tbody>
										<tr class="tablebox">
											<td v-for="(temp, tempIndex) in item.oddEvenList" :key="tempIndex">
												<p v-for="(a, aIndex) in temp" :key="aIndex" :class="{ font_red: a == '双' }">{{ a }}</p>
											</td>
										</tr>
									</tbody>
								</table>
							</view>
						</view>
						<view class="content-list" v-if="item.sizeList.length > 0 && showRs.indexOf('b') != -1">
							<view class="content-title">
								<view class="title-left">今日累计：小（{{ item.little }}）大（{{ item.big }}）</view>
								<view class="title-right">
									第{{
										index == 0
											? '一'
											: index == 1
											? '二'
											: index == 2
											? '三'
											: index == 3
											? '四'
											: index == 4
											? '五'
											: index == 5
											? '六'
											: index == 6
											? '七'
											: '八'
									}}球&nbsp;&nbsp;大小&nbsp;&nbsp;最新&nbsp;&nbsp;↓
								</view>
							</view>
							<view class="table-box">
								<table @touchstart.stop @touchend.stop border="0" cellpadding="1" cellspacing="1">
									<tbody>
										<tr class="tablebox">
											<td v-for="(temp, tempIndex) in item.sizeList" :key="tempIndex">
												<p v-for="(a, aIndex) in temp" :key="aIndex" :class="{ font_red: a == '大' }">{{ a }}</p>
											</td>
										</tr>
									</tbody>
								</table>
							</view>
						</view>
						<view class="content-list" v-if="item.pred && showRs.indexOf('t') != -1">
							<view class="content-title">
								<view class="title-left">今日累计：虎（{{ item.pred.tiger }}）龙（{{ item.pred.dragon }}）和（{{ item.pred.and }}）</view>
								<view class="title-right">
									第{{
										index == 0
											? '一'
											: index == 1
											? '二'
											: index == 2
											? '三'
											: index == 3
											? '四'
											: index == 4
											? '五'
											: index == 5
											? '六'
											: index == 6
											? '七'
											: '八'
									}}球&nbsp;&nbsp;龙虎&nbsp;&nbsp;最新&nbsp;&nbsp;↓
								</view>
							</view>
							<view class="table-box">
								<table @touchstart.stop @touchend.stop border="0" cellpadding="1" cellspacing="1">
									<tbody>
										<tr class="tablebox">
											<td v-for="(temp, tempIndex) in item.pred.list" :key="tempIndex">
												<p v-for="(a, aIndex) in temp" :key="aIndex" :class="{ font_red: a == '龙' }">{{ a }}</p>
											</td>
										</tr>
									</tbody>
								</table>
							</view>
						</view>
					</template>
				</view>
			</template>
			<template v-if="codeType == 1">
				<view v-for="(item, index) in mainData.position" :key="index">
					<template v-if="showRs.indexOf(index.toString()) != -1">
						<view class="content-list" v-if="item.oddEvenList.length > 0 && showRs.indexOf('d') != -1">
							<view class="content-title">
								<view class="title-left">今日累计：单（{{ item.single }}）双（{{ item.double }}）</view>
								<view class="title-right">
									{{
										index == 0
											? '冠军'
											: index == 1
											? '亚军'
											: index == 2
											? '第三'
											: index == 3
											? '第四'
											: index == 4
											? '第五'
											: index == 5
											? '第六'
											: index == 6
											? '第七'
											: index == 7
											? '第八'
											: index == 8
											? '第九'
											: '第十'
									}}&nbsp;&nbsp;单双&nbsp;&nbsp;最新&nbsp;&nbsp;↓
								</view>
							</view>
							<view class="table-box">
								<table @touchstart.stop @touchend.stop border="0" cellpadding="1" cellspacing="1">
									<tbody>
										<tr class="tablebox">
											<td v-for="(temp, tempIndex) in item.oddEvenList" :key="tempIndex">
												<p v-for="(a, aIndex) in temp" :key="aIndex" :class="{ font_red: a == '双' }">{{ a }}</p>
											</td>
										</tr>
									</tbody>
								</table>
							</view>
						</view>
						<view class="content-list" v-if="item.sizeList.length > 0 && showRs.indexOf('b') != -1">
							<view class="content-title">
								<view class="title-left">今日累计：小（{{ item.little }}）大（{{ item.big }}）</view>
								<view class="title-right">
									{{
										index == 0
											? '冠军'
											: index == 1
											? '亚军'
											: index == 2
											? '第三'
											: index == 3
											? '第四'
											: index == 4
											? '第五'
											: index == 5
											? '第六'
											: index == 6
											? '第七'
											: index == 7
											? '第八'
											: index == 8
											? '第九'
											: '第十'
									}}&nbsp;&nbsp;大小&nbsp;&nbsp;最新&nbsp;&nbsp;↓
								</view>
							</view>
							<view class="table-box">
								<table @touchstart.stop @touchend.stop border="0" cellpadding="1" cellspacing="1">
									<tbody>
										<tr class="tablebox">
											<td v-for="(temp, tempIndex) in item.sizeList" :key="tempIndex">
												<p v-for="(a, aIndex) in temp" :key="aIndex" :class="{ font_red: a == '大' }">{{ a }}</p>
											</td>
										</tr>
									</tbody>
								</table>
							</view>
						</view>

						<view class="content-list" v-if="item.pred && showRs.indexOf('t') != -1">
							<view class="content-title">
								<view class="title-left">今日累计：虎（{{ item.pred.tiger }}）龙（{{ item.pred.dragon }}）和（{{ item.pred.and }}）</view>
								<view class="title-right">
									{{
										index == 0
											? '冠军'
											: index == 1
											? '亚军'
											: index == 2
											? '第三'
											: index == 3
											? '第四'
											: index == 4
											? '第五'
											: index == 5
											? '第六'
											: index == 6
											? '第七'
											: index == 7
											? '第八'
											: index == 8
											? '第九'
											: '第十'
									}}&nbsp;&nbsp;龙虎&nbsp;&nbsp;最新&nbsp;&nbsp;↓
								</view>
							</view>
							<view class="table-box">
								<table @touchstart.stop @touchend.stop border="0" cellpadding="1" cellspacing="1">
									<tbody>
										<tr class="tablebox">
											<td v-for="(temp, tempIndex) in item.pred.list" :key="tempIndex">
												<p v-for="(a, aIndex) in temp" :key="aIndex" :class="{ font_red: a == '龙' }">{{ a }}</p>
											</td>
										</tr>
									</tbody>
								</table>
							</view>
						</view>
					</template>
				</view>
			</template>
			<template v-if="mainData.total && showRs.indexOf('a') != -1">
				<view class="content-list" v-if="mainData.total.oddEvenList.length > 0 && showRs.indexOf('d') != -1">
					<view class="content-title">
						<view class="title-left">今日累计：单（{{ mainData.total.single }}）双（{{ mainData.total.double }}）</view>
						<view class="title-right">{{ codeType == 1 ? '冠亚和' : '总和' }}&nbsp;&nbsp;单双&nbsp;&nbsp;最新&nbsp;&nbsp;↓</view>
					</view>
					<view class="table-box">
						<table @touchstart.stop @touchend.stop border="0" cellpadding="1" cellspacing="1">
							<tbody>
								<tr class="tablebox">
									<td v-for="(temp, tempIndex) in mainData.total.oddEvenList" :key="tempIndex">
										<p v-for="(a, aIndex) in temp" :key="aIndex" :class="{ font_red: a == '双' }">{{ a }}</p>
									</td>
								</tr>
							</tbody>
						</table>
					</view>
				</view>
				<view class="content-list" v-if="mainData.total.sizeList.length > 0 && showRs.indexOf('b') != -1">
					<view class="content-title">
						<view class="title-left">今日累计：小（{{ mainData.total.little }}）大（{{ mainData.total.big }}）</view>
						<view class="title-right">{{ codeType == 1 ? '冠亚和' : '总和' }}&nbsp;&nbsp;大小&nbsp;&nbsp;最新&nbsp;&nbsp;↓</view>
					</view>
					<view class="table-box">
						<table @touchstart.stop @touchend.stop border="0" cellpadding="1" cellspacing="1">
							<tbody>
								<tr class="tablebox">
									<td v-for="(temp, tempIndex) in mainData.total.sizeList" :key="tempIndex">
										<p v-for="(a, aIndex) in temp" :key="aIndex" :class="{ font_red: a == '大' }">{{ a }}</p>
									</td>
								</tr>
							</tbody>
						</table>
					</view>
				</view>
				<view class="content-list" v-if="codeType == 2 && mainData.pred && showRs.indexOf('t') != -1">
					<view class="content-title">
						<view class="title-left">今日累计：虎（{{ mainData.pred.tiger }}）龙（{{ mainData.pred.dragon }}）</view>
						<view class="title-right">{{ codeType == 1 ? '冠亚和' : '总和' }}&nbsp;&nbsp;龙虎&nbsp;&nbsp;最新&nbsp;&nbsp;↓</view>
					</view>
					<view class="table-box">
						<table @touchstart.stop @touchend.stop border="0" cellpadding="1" cellspacing="1">
							<tbody>
								<tr class="tablebox">
									<td v-for="(temp, tempIndex) in mainData.pred.list" :key="tempIndex">
										<p v-for="(a, aIndex) in temp" :key="aIndex" :class="{ font_red: a == '龙' }">{{ a }}</p>
									</td>
								</tr>
							</tbody>
						</table>
					</view>
				</view>
			</template>
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
							<view class="content-item" v-if="codeType == 1">
								<view class="option" :class="{ checked: tempRs.indexOf('0') > -1 }" @tap.stop="checkOne('0')">冠军</view>
								<view class="option" :class="{ checked: tempRs.indexOf('1') > -1 }" @tap.stop="checkOne('1')">亚军</view>
								<view class="option" :class="{ checked: tempRs.indexOf('2') > -1 }" @tap.stop="checkOne('2')">第三</view>
								<view class="option" :class="{ checked: tempRs.indexOf('3') > -1 }" @tap.stop="checkOne('3')">第四</view>
								<view class="option" :class="{ checked: tempRs.indexOf('4') > -1 }" @tap.stop="checkOne('4')">第五</view>
								<view class="option" :class="{ checked: tempRs.indexOf('5') > -1 }" @tap.stop="checkOne('5')">第六</view>
								<view class="option" :class="{ checked: tempRs.indexOf('6') > -1 }" @tap.stop="checkOne('6')">第七</view>
								<view class="option" :class="{ checked: tempRs.indexOf('7') > -1 }" @tap.stop="checkOne('7')">第八</view>
								<view class="option" :class="{ checked: tempRs.indexOf('8') > -1 }" @tap.stop="checkOne('8')">第九</view>
								<view class="option" :class="{ checked: tempRs.indexOf('9') > -1 }" @tap.stop="checkOne('9')">第十</view>
								<view class="option" :class="{ checked: tempRs.indexOf('a') > -1 }" @tap.stop="checkOne('a')">冠亚和</view>
							</view>
							<view class="content-item" v-if="codeType == 3">
								<view class="option" :class="{ checked: tempRs.indexOf('0') > -1 }" @tap.stop="checkOne('0')">第一球</view>
								<view class="option" :class="{ checked: tempRs.indexOf('1') > -1 }" @tap.stop="checkOne('1')">第二球</view>
								<view class="option" :class="{ checked: tempRs.indexOf('2') > -1 }" @tap.stop="checkOne('2')">第三球</view>
								<view class="option" :class="{ checked: tempRs.indexOf('3') > -1 }" @tap.stop="checkOne('3')">第四球</view>
								<view class="option" :class="{ checked: tempRs.indexOf('4') > -1 }" @tap.stop="checkOne('4')">第五球</view>
								<view class="option" :class="{ checked: tempRs.indexOf('5') > -1 }" @tap.stop="checkOne('5')">第六球</view>
								<view class="option" :class="{ checked: tempRs.indexOf('6') > -1 }" @tap.stop="checkOne('6')">第七球</view>
								<view class="option" :class="{ checked: tempRs.indexOf('7') > -1 }" @tap.stop="checkOne('7')">第八球</view>
								<view class="option" :class="{ checked: tempRs.indexOf('a') > -1 }" @tap.stop="checkOne('a')">总和</view>
							</view>
							<view class="content-item" v-if="codeType == 2">
								<view class="option" :class="{ checked: tempRs.indexOf('0') > -1 }" @tap.stop="checkOne('0')">第一球</view>
								<view class="option" :class="{ checked: tempRs.indexOf('1') > -1 }" @tap.stop="checkOne('1')">第二球</view>
								<view class="option" :class="{ checked: tempRs.indexOf('2') > -1 }" @tap.stop="checkOne('2')">第三球</view>
								<view class="option" :class="{ checked: tempRs.indexOf('3') > -1 }" @tap.stop="checkOne('3')">第四球</view>
								<view class="option" :class="{ checked: tempRs.indexOf('4') > -1 }" @tap.stop="checkOne('4')">第五球</view>
								<view class="option" :class="{ checked: tempRs.indexOf('a') > -1 }" @tap.stop="checkOne('a')">总和</view>
							</view>
							<view class="item-title"><view class="check-item">筛选类型：</view></view>
							<view class="content-item">
								<view class="option" :class="{ checked: tempRs.indexOf('d') > -1 }" @tap.stop="checkOne('d')">单双</view>
								<view class="option" :class="{ checked: tempRs.indexOf('b') > -1 }" @tap.stop="checkOne('b')">大小</view>
								<view class="option" :class="{ checked: tempRs.indexOf('t') > -1 }" @tap.stop="checkOne('t')">龙虎</view>
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
	name: 'luzhu-analysis',
	props: ['code', 'date', 'current_number'],
	data() {
		return {
			mainData: null,
			mode: '9', //9综合模式，1单选模式，2双选模式
			allSet: [],
			filterRs: '',
			tempRs: '',
			showFilter: -1,
			codeType: -1,
			showRs:''
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
		const allTypes = uni.getStorageSync('analysisKinds')['lzfx'];
		if (allTypes['type1'].indexOf(this.code) != -1) {
			this.codeType = 1;
			this.allSet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'd', 'b', 't']; //时时彩 14个
		} else if (allTypes['type2'].indexOf(this.code) != -1) {
			// if(['cqssc','tjssc','xjssc','jsssc','cqqxc','ajxyw'].indexOf(this.code)!=-1){
			this.codeType = 2;
			this.allSet = ['0', '1', '2', '3', '4', 'a', 'd', 'b', 't']; //时时彩 9个
		} else if (allTypes['type3'].indexOf(this.code) != -1) {
			this.codeType = 3;
			this.allSet = ['0', '1', '2', '3', '4', '5', '6', '7', 'a', 'd', 'b', 't'];
		}
		this.showRs = "0,1,d,b,t";
		this.filterRs = this.allSet.toString();
		let that = this;
		window.onscroll = function() {
			// scrollTop是滚动条滚动时，距离顶部的距离
			let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			// windowHeight是可视区的高度
			let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
			// scrollHeight是滚动条的总高度
			let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
			// 滚动条到底部
			if (scrollTop + windowHeight + 10 >= scrollHeight && scrollTop + windowHeight  <= scrollHeight + 10) {
				// 到了底部之后想做的操作,如到了底部之后加载
				that.showRs = that.filterRs;
			}
		};
		uni.showLoading({
			title: 'loading'
		});
		this.getAnalysisDetail();
	},
	methods: {
		choseCon(n) {
			if (n == 1) {
				this.tempRs = this.filterRs;
				this.showFilter = 1;
			} else if (n == -1) {
				this.tempRs = '';
				this.showFilter = -1;
			} else {
				this.filterRs = this.tempRs;
				this.showRs = this.tempRs;
				this.showFilter = -1;
			}
		},
		checkOne(m) {
			if (m == '999') {
				this.tempRs = this.allSet.toString();
			} else if (m == '-1') {
				this.tempRs = '';
			} else {
				if (this.mode == '9') {
					if (this.tempRs.indexOf(m) == -1) {
						this.tempRs += m;
					} else {
						this.tempRs = this.tempRs.replace(m, '');
					}
				} else if (this.mode == '1') {
					if (this.allSet.indexOf(m) < this.allSet.length - 3) {
						if (this.tempRs.indexOf(m) == -1) {
							for (let i = 0; i < this.allSet.length - 3; i++) {
								if (this.tempRs.indexOf(this.allSet[i]) != -1) this.tempRs = this.tempRs.replace(this.allSet[i], '');
							}
							this.tempRs += m;
						}
					} else {
						if (this.tempRs.indexOf(m) == -1) {
							this.tempRs += m;
						} else {
							this.tempRs = this.tempRs.replace(m, '');
						}
					}
				} else {
					if (this.allSet.indexOf(m) > this.allSet.length - 4) {
						if (this.tempRs.indexOf(m) == -1) {
							for (let i = this.allSet.length - 3; i < this.allSet.length; i++) {
								if (this.tempRs.indexOf(this.allSet[i]) != -1) this.tempRs = this.tempRs.replace(this.allSet[i], '');
							}
							this.tempRs += m;
						}
					} else {
						if (this.tempRs.indexOf(m) == -1) {
							this.tempRs += m;
						} else {
							this.tempRs = this.tempRs.replace(m, '');
						}
					}
				}
			}
		},
		choseMode(p) {
			this.mode = p;
			let a = false;
			if (p == '9') {
				this.filterRs = this.allSet.toString();
			} else if (p == '1') {
				for (let i = 0; i < this.allSet.length - 3; i++) {
					if (!a && this.filterRs.indexOf(this.allSet[i]) != -1) {
						a = true;
					} else {
						if (this.filterRs.indexOf(this.allSet[i]) != -1) this.filterRs = this.filterRs.replace(this.allSet[i], '');
					}
				}
				for (let j = this.allSet.length - 3; j < this.allSet.length; j++) {
					if (this.filterRs.indexOf(this.allSet[j]) == -1) {
						this.filterRs += this.allSet[j];
					}
				}
			} else {
				for (let i = this.allSet.length - 3; i < this.allSet.length; i++) {
					if (!a && this.filterRs.indexOf(this.allSet[i]) != -1) {
						a = true;
					} else {
						if (this.filterRs.indexOf(this.allSet[i]) != -1) this.filterRs = this.filterRs.replace(this.allSet[i], '');
					}
				}
				for (let j = 0; j < this.allSet.length - 3; j++) {
					if (this.filterRs.indexOf(this.allSet[j]) == -1) {
						this.filterRs += this.allSet[j];
					}
				}
			}
			this.showRs = this.filterRs;
		},
		getAnalysisDetail() {
			let that = this;
			this.$api.getAnalysisDetail({ code: this.code, type: 'lzfx', date: this.date }).then(res => {
					uni.hideLoading();
				if (res.code == 0) {
					that.mainData = res.data;
					if (that.codeType == 1 || that.codeType == 3) {
						res.data.pred.forEach((v, k) => {
							that.mainData.position[k].pred = v;
							that.mainData.pred = [];
						});
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
	.pattern {
		margin-top: 5px;
		display: -webkit-box;
		height: 45px;
		line-height: 45px;
		background-color: #fff;
		width: 100%;
		border-bottom: 1px solid #dbdbdb;
		.mode {
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
		padding-top: 10px;
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
