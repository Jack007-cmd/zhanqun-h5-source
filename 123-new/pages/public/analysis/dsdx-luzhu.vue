<template name="dsdx-luzhu">
	<view class="container" v-if="mainData">
		<view class="desc"><view class="check-click" @click="choseCon(1)">筛选</view></view>
		<template v-for="(item, index) in mainData.position">
			<view :key="index" v-if="filterRs.indexOf(index.toString())!=-1">
				<view  class="content-list" v-if="filterRs.indexOf('d')!=-1">
					<view class="content-title">
						<view class="title-left">今日累计：双（{{ item.double }}）单（{{ item.single }}）</view>
						<view class="title-right" v-if="codeType==1">{{ index == 0 ? '冠军' : index == 1 ? '亚军' : index == 2 ? '第三名' : index == 3 ? '第四名' : index == 4 ? '第五名' : index == 5 ? '第六名' : index == 6 ? '第七名' : index == 7 ? '第八名' : index == 8 ? '第九名' : '第十名'}}&nbsp;&nbsp;单双&nbsp;&nbsp;最新&nbsp;&nbsp;↓</view>
						<view class="title-right" v-if="codeType==2">{{ index == 0 ? '第一球' : index == 1 ? '第二球' : index == 2 ? '第三球' : index == 3 ? '第四球' : '第五球' }}&nbsp;&nbsp;单双&nbsp;&nbsp;最新&nbsp;&nbsp;↓</view>
						<view class="title-right" v-if="codeType==3">{{ index == 0 ? '第一球' : index == 1 ? '第二球' : index == 2 ? '第三球' : index == 3 ? '第四球' : index == 4 ? '第五球' : index == 5 ? '第六球' : index == 6 ? '第七球' : '第八球' }}&nbsp;&nbsp;单双&nbsp;&nbsp;最新&nbsp;&nbsp;↓</view>						
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
				<view  class="content-list" v-if="filterRs.indexOf('b')!=-1">
					<view class="content-title">
						<view class="title-left">今日累计：小（{{ item.little }}）大（{{ item.big }}）</view>
						<view class="title-right" v-if="codeType==1">{{ index == 0 ? '冠军' : index == 1 ? '亚军' : index == 2 ? '第三名' : index == 3 ? '第四名' : index == 4 ? '第五名' : index == 5 ? '第六名' : index == 6 ? '第七名' : index == 7 ? '第八名' : index == 8 ? '第九名' : '第十名'}}&nbsp;&nbsp;大小&nbsp;&nbsp;最新&nbsp;&nbsp;↓</view>
						<view class="title-right" v-if="codeType==2">{{ index == 0 ? '第一球' : index == 1 ? '第二球' : index == 2 ? '第三球' : index == 3 ? '第四球' : '第五球' }}&nbsp;&nbsp;大小&nbsp;&nbsp;最新&nbsp;&nbsp;↓</view>
						<view class="title-right" v-if="codeType==3">{{ index == 0 ? '第一球' : index == 1 ? '第二球' : index == 2 ? '第三球' : index == 3 ? '第四球' : index == 4 ? '第五球' : index == 5 ? '第六球' : index == 6 ? '第七球' : '第八球' }}&nbsp;&nbsp;大小&nbsp;&nbsp;最新&nbsp;&nbsp;↓</view>						
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
			</view>
		</template>
		
		<view class="u-popup" v-if="showFilter == 1">
				<view class="u-transition-out" @click="choseCon(-1)"></view>
				<view class="u-transition">
					<view class="u-popup__wrapper-box">
						<view class="u-main">
							<view class="u-title">
								<view class="option-md">筛选选择</view>
								<view class="option-md" @click="choseCon(-1)">取消</view>
								<view class="option-md" @click="choseCon(99)">确定</view>
							</view>
							<view class="u-content">
								<view class="item-title">
									<view class="check-item">筛选名次：</view>
									<view class="check-item" @click="checkOne('999')">全选</view>
									<view class="check-item" @click="checkOne('-1')">清空</view>
								</view>
								<view class="content-item" v-if="codeType==1">
									<view class="option" :class="{ checked: tempRs.indexOf('0') > -1 }" @click="checkOne('0')">冠军</view>
									<view class="option" :class="{ checked: tempRs.indexOf('1') > -1 }" @click="checkOne('1')">亚军</view>
									<view class="option" :class="{ checked: tempRs.indexOf('2') > -1 }" @click="checkOne('2')">第三</view>
									<view class="option" :class="{ checked: tempRs.indexOf('3') > -1 }" @click="checkOne('3')">第四</view>
									<view class="option" :class="{ checked: tempRs.indexOf('4') > -1 }" @click="checkOne('4')">第五</view>
									<view class="option" :class="{ checked: tempRs.indexOf('5') > -1 }" @click="checkOne('5')">第六</view>
									<view class="option" :class="{ checked: tempRs.indexOf('6') > -1 }" @click="checkOne('6')">第七</view>
									<view class="option" :class="{ checked: tempRs.indexOf('7') > -1 }" @click="checkOne('7')">第八</view>
									<view class="option" :class="{ checked: tempRs.indexOf('8') > -1 }" @click="checkOne('8')">第九</view>
									<view class="option" :class="{ checked: tempRs.indexOf('9') > -1 }" @click="checkOne('9')">第十</view>
								</view>
								<view class="content-item" v-if="codeType==3">
									<view class="option" :class="{ checked: tempRs.indexOf('0') > -1 }" @click="checkOne('0')">第一球</view>
									<view class="option" :class="{ checked: tempRs.indexOf('1') > -1 }" @click="checkOne('1')">第二球</view>
									<view class="option" :class="{ checked: tempRs.indexOf('2') > -1 }" @click="checkOne('2')">第三球</view>
									<view class="option" :class="{ checked: tempRs.indexOf('3') > -1 }" @click="checkOne('3')">第四球</view>
									<view class="option" :class="{ checked: tempRs.indexOf('4') > -1 }" @click="checkOne('4')">第五球</view>
									<view class="option" :class="{ checked: tempRs.indexOf('5') > -1 }" @click="checkOne('5')">第六球</view>
									<view class="option" :class="{ checked: tempRs.indexOf('6') > -1 }" @click="checkOne('6')">第七球</view>
									<view class="option" :class="{ checked: tempRs.indexOf('7') > -1 }" @click="checkOne('7')">第八球</view>
								</view>
								<view class="content-item" v-if="codeType==2">
									<view class="option" :class="{ checked: tempRs.indexOf('0') > -1 }" @click="checkOne('0')">第一球</view>
									<view class="option" :class="{ checked: tempRs.indexOf('1') > -1 }" @click="checkOne('1')">第二球</view>
									<view class="option" :class="{ checked: tempRs.indexOf('2') > -1 }" @click="checkOne('2')">第三球</view>
									<view class="option" :class="{ checked: tempRs.indexOf('3') > -1 }" @click="checkOne('3')">第四球</view>
									<view class="option" :class="{ checked: tempRs.indexOf('4') > -1 }" @click="checkOne('4')">第五球</view>
								</view>
								<view class="item-title"><view class="check-item">筛选类型：</view></view>
								<view class="content-item">
									<view class="option" :class="{ checked: tempRs.indexOf('d') > -1 }" @click="checkOne('d')">单双</view>
									<view class="option" :class="{ checked: tempRs.indexOf('b') > -1 }" @click="checkOne('b')">大小</view>
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
	name: 'dsdx-luzhu',
	props: ['code', 'date', 'current_number'],
	data() {
		return {
			mainData: null,
			mode: '2', //9综合模式，1单选模式，2双选模式
			allSet: [],
			filterRs: '',
			tempRs: '',
			showFilter: -1,
			codeType:-1
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
		const allTypes = uni.getStorageSync('analysisKinds')['dxdslz'];
		// Detail-01 :北京PK10(bjpks) 澳洲幸运10(ajxys) 极速赛车(jssc) 极速飞艇(jsft)（4）
		// Detail-02:重庆时时彩(cqssc) 天津时时彩(tjssc) 新疆时时彩(xjssc) 极速时时彩(jsssc) 重庆七星彩(cqqxc) 澳洲幸运5(ajxyw)（6）
		if (allTypes['type1'].indexOf(this.code) != -1) {
			this.codeType = 1;
			this.allSet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'd', 'b'];
		} else if (allTypes['type2'].indexOf(this.code) != -1) {
			this.codeType = 2;
			this.allSet = ['0', '1', '2', '3', '4', 'd', 'b'];
		} else if (allTypes['type3'].indexOf(this.code) != -1) {
			this.codeType = 3;
			this.allSet = ['0', '1', '2', '3', '4', '5', '6', '7', 'd', 'b'];
		}
		this.filterRs = this.allSet.toString();
		this.filterRs = this.filterRs.replace('b', '');
		uni.showLoading({title:'loading'});
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
					if (this.allSet.indexOf(m) < this.allSet.length - 2) {
						if (this.tempRs.indexOf(m) == -1) {
							for (let i = 0; i < this.allSet.length - 2; i++) {
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
					if (this.allSet.indexOf(m) > this.allSet.length - 3) {
						if (this.tempRs.indexOf(m) == -1) {
							for (let i = this.allSet.length - 2; i < this.allSet.length; i++) {
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
		getAnalysisDetail() {
			let that = this;
			this.$api.getAnalysisDetail({ code: this.code, type: 'dxdslz', date: this.date }).then(res => {
					uni.hideLoading();
				if (res.code == 0) {
					that.mainData = res.data;
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
