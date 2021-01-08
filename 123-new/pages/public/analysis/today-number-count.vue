<template name="today-number-count">
	<view class="container">
		<template v-if="mainData.length > 0">
			<view class="desc">
				<view class="check-click" @tap.stop="choseCon(1)">筛选</view>
				值为15-30时为
				<view class="red">红色</view>
				31-40为
				<view class="blue">蓝色</view>
				41-50时为
				<view class="green">绿色</view>
			</view>
			<template v-if="codeType == 1">
				<view class="count-list" v-for="(item, index) in mainData" :key="index">
					<template v-if="filterRs.indexOf(index.toString()) > -1">
						<view class="count-title" :class="{ head1: index == 0, head2: index == 1 }">
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
							}}
						</view>
						<view class="num_item first-line">
							<view class="li_first">号码</view>
							<view class="hotnum">1</view>
							<view class="hotnum">2</view>
							<view class="hotnum">3</view>
							<view class="hotnum">4</view>
							<view class="hotnum">5</view>
							<view class="hotnum">6</view>
							<view class="hotnum">7</view>
							<view class="hotnum">8</view>
							<view class="hotnum">9</view>
							<view class="hotnum">10</view>
						</view>
						<view class="num_item" v-if="filterRs.indexOf('a') > -1">
							<view class="li_first">总开</view>
							<view
								class="hotnum"
								:class="{ red: temp > 14 && temp < 31, blue: temp > 30 && temp < 41, green: temp > 40 && temp < 51 }"
								v-for="(temp, tempIndex) in item.awayOpen"
								:key="tempIndex"
							>
								{{ temp }}
							</view>
						</view>
						<view class="num_item" v-if="filterRs.indexOf('t') > -1">
							<view class="li_first">未开</view>
							<view
								class="hotnum"
								:class="{ red: temp > 14 && temp < 31, blue: temp > 30 && temp < 41, green: temp > 40 && temp < 51 }"
								v-for="(temp, tempIndex) in item.notOpen"
								:key="tempIndex"
							>
								{{ temp }}
							</view>
						</view>
					</template>
				</view>
			</template>
			<template v-if="codeType == 2 || codeType == 3">
				<view class="count-list" v-for="(item, index) in mainData" :key="index">
						<template v-if="filterRs.indexOf(index.toString()) > -1">
							<view class="count-title" :class="{ head1: index == 0, head2: index == 1 }">
								{{index == 0 ? '第一球' : index == 1 ? '第二球' : index == 2 ? '第三球' : index == 3 ? '第四球' : '第五球'}}
							</view>
							<view class="num_item first-line" v-if="codeType==2">
								<view class="li_first">号码</view>
								<view class="hotnum">0</view>
								<view class="hotnum">1</view>
								<view class="hotnum">2</view>
								<view class="hotnum">3</view>
								<view class="hotnum">4</view>
								<view class="hotnum">5</view>
								<view class="hotnum">6</view>
								<view class="hotnum">7</view>
								<view class="hotnum">8</view>
								<view class="hotnum">9</view>
							</view>
							<view class="num_item first-line" v-if="codeType==3">
								<view class="li_first">号码</view>
								<view class="hotnum">1</view>
								<view class="hotnum">2</view>
								<view class="hotnum">3</view>
								<view class="hotnum">4</view>
								<view class="hotnum">5</view>
								<view class="hotnum">6</view>
								<view class="hotnum">7</view>
								<view class="hotnum">8</view>
								<view class="hotnum">9</view>
								<view class="hotnum">10</view>
								<view class="hotnum">11</view>
							</view>
							<view class="num_item" v-if="filterRs.indexOf('a') > -1">
								<!-- <view class="li_first" :style="{'width':codeType==3?'8%':'16%'}">总开</view> -->
								<view class="li_first" style="width:16%">总开</view>
								<view
									class="hotnum"
									:class="{ red: temp > 14 && temp < 31, blue: temp > 30 && temp < 41, green: temp > 40 && temp < 51 }"
									v-for="(temp, tempIndex) in item.appear"
									:key="tempIndex"
								>
									{{ temp }}
								</view>
							</view>
							<view class="num_item" v-if="filterRs.indexOf('t') > -1">
								<!-- <view class="li_first" :style="{'width':codeType==3?'8%':'16%'}">最多连开</view> -->
								<view class="li_first" style="width:16%">最多连开</view>
								<view
									class="hotnum"
									:class="{ red: temp > 14 && temp < 31, blue: temp > 30 && temp < 41, green: temp > 40 && temp < 51 }"
									v-for="(temp, tempIndex) in item.maxAway"
									:key="tempIndex"
								>
									{{ temp }}
								</view>
							</view>
							<view class="num_item" v-if="filterRs.indexOf('c') > -1">
								<!-- <view class="li_first" :style="{'width':codeType==3?'8%':'16%'}">当前遗漏</view> -->
								<view class="li_first" style="width:16%">当前遗漏</view>
								<view
									class="hotnum"
									:class="{ red: temp > 14 && temp < 31, blue: temp > 30 && temp < 41, green: temp > 40 && temp < 51 }"
									v-for="(temp, tempIndex) in item.current"
									:key="tempIndex"
								>
									{{ temp }}
								</view>
							</view>
							<view class="num_item" v-if="filterRs.indexOf('m') > -1">
								<!-- <view class="li_first" :style="{'width':codeType==3?'8%':'16%'}">最大遗漏</view> -->
								<view class="li_first" style="width:16%">最大遗漏</view>
								<view
									class="hotnum"
									:class="{ red: temp > 14 && temp < 31, blue: temp > 30 && temp < 41, green: temp > 40 && temp < 51 }"
									v-for="(temp, tempIndex) in item.max"
									:key="tempIndex"
								>
									{{ temp }}
								</view>
							</view>
						</template>
					</view>
				
			</template>
		<template v-if="codeType == 4">
			<view class="count-list" v-for="(item, index) in mainData" :key="index">
				<template v-if="filterRs.indexOf(index.toString()) > -1">
					<view class="count-title" :class="{ head1: index == 0, head2: index == 1 }">
						{{index == 0 ? '第一球' : index == 1 ? '第二球' : index == 2 ? '第三球' : index == 3 ? '第四球' : index == 4 ? '第五球' : index == 5 ? '第六球' : index == 6 ? '第七球' : '第八球'}}
					</view>
					<view class="num_item first-line">
						<view class="li_first">号码</view>
						<view class="hotnum">1</view>
						<view class="hotnum">2</view>
						<view class="hotnum">3</view>
						<view class="hotnum">4</view>
						<view class="hotnum">5</view>
						<view class="hotnum">6</view>
						<view class="hotnum">7</view>
						<view class="hotnum">8</view>
						<view class="hotnum">9</view>
						<view class="hotnum">10</view>
					</view>
					<view class="num_item" v-if="filterRs.indexOf('a') > -1">
						<view class="li_first">总开</view>
						<template v-for="(temp, tempIndex) in item.awayOpen">
							<view v-if="tempIndex<10"
								class="hotnum"
								:class="{ red: temp > 14 && temp < 31, blue: temp > 30 && temp < 41, green: temp > 40 && temp < 51 }"								
								:key="tempIndex"
							>
								{{ temp }}
							</view>
						</template>					
					</view>
					<view class="num_item" v-if="filterRs.indexOf('t') > -1">
						<view class="li_first">未开</view>
						<template v-for="(temp, tempIndex) in item.notOpen">
							<view v-if="tempIndex<10"
								class="hotnum"
								:class="{ red: temp > 14 && temp < 31, blue: temp > 30 && temp < 41, green: temp > 40 && temp < 51 }"								
								:key="tempIndex"
							>
								{{ temp }}
							</view>
						</template>
						
					</view>
					<view class="num_item first-line">
							<view class="li_first">号码</view>
							<view class="hotnum">11</view>
							<view class="hotnum">12</view>
							<view class="hotnum">13</view>
							<view class="hotnum">14</view>
							<view class="hotnum">15</view>
							<view class="hotnum">16</view>
							<view class="hotnum">17</view>
							<view class="hotnum">18</view>
							<view class="hotnum">19</view>
							<view class="hotnum">20</view>
						</view>
						<view class="num_item" v-if="filterRs.indexOf('a') > -1">
							<view class="li_first">总开</view>
							<template v-for="(temp, tempIndex) in item.awayOpen">
								<view v-if="tempIndex>9"
									class="hotnum"
									:class="{ red: temp > 14 && temp < 31, blue: temp > 30 && temp < 41, green: temp > 40 && temp < 51 }"								
									:key="tempIndex"
								>
									{{ temp }}
								</view>
							</template>					
						</view>
						<view class="num_item" v-if="filterRs.indexOf('t') > -1">
							<view class="li_first">未开</view>
							<template v-for="(temp, tempIndex) in item.notOpen">
								<view v-if="tempIndex>9"
									class="hotnum"
									:class="{ red: temp > 14 && temp < 31, blue: temp > 30 && temp < 41, green: temp > 40 && temp < 51 }"								
									:key="tempIndex"
								>
									{{ temp }}
								</view>
							</template>							
						</view>
					
				</template>
			</view>
		</template>
		</template>
		<view class="u-popup" v-if="showFilter == 1">
			<view class="u-transition-out" @tap.stop="showFilter = -1"></view>
			<view class="u-transition">
				<view class="u-popup__wrapper-box">
					<view class="u-main">
						<view class="u-title">
							<view class="option-md">筛选选择</view>
							<view class="option-md" @tap.stop="choseCon(-1)">取消</view>
							<view class="option-md" @tap.stop="choseCon(99)">确定</view>
						</view>
						<view class="u-content">
							<view class="item-title">
								<view class="check-item">筛选名次：</view>
								<view class="check-item" @tap.stop="checkOne('999')">全选</view>
								<view class="check-item" @tap.stop="checkOne('-1')">清空</view>
							</view>
							<template v-if="codeType == 1 || codeType == 4">
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
								</view>
								<view class="content-item" v-if="codeType == 4">
									<view class="option" :class="{ checked: tempRs.indexOf('0') > -1 }" @tap.stop="checkOne('0')">第一球</view>
									<view class="option" :class="{ checked: tempRs.indexOf('1') > -1 }" @tap.stop="checkOne('1')">第二球</view>
									<view class="option" :class="{ checked: tempRs.indexOf('2') > -1 }" @tap.stop="checkOne('2')">第三球</view>
									<view class="option" :class="{ checked: tempRs.indexOf('3') > -1 }" @tap.stop="checkOne('3')">第四球</view>
									<view class="option" :class="{ checked: tempRs.indexOf('4') > -1 }" @tap.stop="checkOne('4')">第五球</view>
									<view class="option" :class="{ checked: tempRs.indexOf('5') > -1 }" @tap.stop="checkOne('5')">第六球</view>
									<view class="option" :class="{ checked: tempRs.indexOf('6') > -1 }" @tap.stop="checkOne('6')">第七球</view>
									<view class="option" :class="{ checked: tempRs.indexOf('7') > -1 }" @tap.stop="checkOne('7')">第八球</view>
								</view>
								<view class="item-title"><view class="check-item">筛选类型：</view></view>
								<view class="content-item">
									<view class="option" :class="{ checked: tempRs.indexOf('a') > -1 }" @tap.stop="checkOne('a')">总开</view>
									<view class="option" :class="{ checked: tempRs.indexOf('t') > -1 }" @tap.stop="checkOne('t')">未开</view>
								</view>
							</template>
							<template v-if="codeType == 2 || codeType == 3">
								<view class="content-item">
									<view class="option" :class="{ checked: tempRs.indexOf('0') > -1 }" @tap.stop="checkOne('0')">第一球</view>
									<view class="option" :class="{ checked: tempRs.indexOf('1') > -1 }" @tap.stop="checkOne('1')">第二球</view>
									<view class="option" :class="{ checked: tempRs.indexOf('2') > -1 }" @tap.stop="checkOne('2')">第三球</view>
									<view class="option" :class="{ checked: tempRs.indexOf('3') > -1 }" @tap.stop="checkOne('3')">第四球</view>
									<view class="option" :class="{ checked: tempRs.indexOf('4') > -1 }" @tap.stop="checkOne('4')">第五球</view>
								</view>
								<view class="item-title"><view class="check-item">筛选类型：</view></view>
								<view class="content-item">
									<view class="option" :class="{ checked: tempRs.indexOf('a') > -1 }" @tap.stop="checkOne('a')">总开</view>
									<view class="option" :class="{ checked: tempRs.indexOf('t') > -1 }" @tap.stop="checkOne('t')">最多连开</view>
									<view class="option" :class="{ checked: tempRs.indexOf('c') > -1 }" @tap.stop="checkOne('c')">当前遗漏</view>
									<view class="option" :class="{ checked: tempRs.indexOf('m') > -1 }" @tap.stop="checkOne('m')">最大遗漏</view>
								</view>
							</template>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
	name: 'today-number-count',
	props: ['code', 'date', 'current_number'],
	components: {
		uniPopup
	},
	data() {
		return {
			showFilter: -1,
			mainData: [],
			codeType: -1,
			allSet: [],
			filterRs: '',
			tempRs: '',
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
		const allTypes = uni.getStorageSync('analysisKinds')['jrhmtj'];
		if (allTypes['type1'].indexOf(this.code) != -1) {
			this.codeType = 1;
			this.allSet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 't'];
		}
		if (allTypes['type4'].indexOf(this.code) != -1) {
			this.codeType = 4;
			this.allSet = ['0', '1', '2', '3', '4', '5', '6', '7', 'a', 't'];
		}
		if (allTypes['type2'].indexOf(this.code) != -1) {
			this.codeType = 2;
			this.allSet = ['0', '1', '2', '3', '4', 'c', 'a', 'm', 't'];
		}
		if (allTypes['type3'].indexOf(this.code) != -1) {
			this.codeType = 3;
			this.allSet = ['0', '1', '2', '3', '4', 'c', 'a', 'm', 't'];
		}
		this.filterRs = this.allSet.toString();
		uni.showLoading({title:'loading'});
		this.getAnalysisDetail();
	},
	methods: {
		choseCon(n) {
			if (n == 1) {
				//筛选
				this.tempRs = this.filterRs;
				this.showFilter = 1;
			} else if (n == -1) {
				//取消
				this.tempRs = '';
				this.showFilter = -1;
			} else {
				//确定
				this.filterRs = this.tempRs;
				this.showFilter = -1;
			}
		},
		checkOne(m) {
			if (m == '999') {
				//全选
				this.tempRs = this.allSet.toString();
			} else if (m == '-1') {
				//清空
				this.tempRs = '';
			} else {
				if (this.tempRs.indexOf(m) == -1) {
					this.tempRs += m;
				} else {
					this.tempRs = this.tempRs.replace(m, '');
				}
			}
		},
		cancel() {
			this.$refs['showbottom'].close();
		},
		change(e) {
			console.log('是否打开:' + e.show);
		},
		getAnalysisDetail() {
			let that = this;
			this.$api.getAnalysisDetail({ code: this.code, type: 'jrhmtj', date: this.date }).then(res => {
					uni.hideLoading();
				if (res.code == 0) {
					if (that.codeType != 1 && that.codeType != 4) {
						for (let i = 0; i < res.data.appear.basic.length; i++) {
							let temp = {};
							temp.appear = that.objectToArray(res.data.appear.basic[i]);
							temp.max = that.objectToArray(res.data.max.basic[i]);
							temp.maxAway = that.objectToArray(res.data.maxAway.basic[i]);
							temp.current = that.objectToArray(res.data.current.basic[i]);
							that.mainData.push(temp);
						}
					} else if (that.codeType == 1 || that.codeType == 4) {
						res.data.awayOpen.basic.forEach((v, k) => {
							let item = {};
							item.awayOpen = v;
							item.notOpen = res.data.notOpen.basic[k];
							that.mainData.push(item);
						});
					}
				}else{
					uni.showToast({
	　　　　　　　　　　　　title: "网络异常，请稍后再试",
	　　　　　　　　　　　　icon: 'none'
	　　　　　　　　　　})
				 }
			});
		},
		objectToArray(obj) {
			if (obj.constructor != Array) {
				let basic = [];
				let sdic = Object.keys(obj).sort(); //根据key排序
				for (let i = 0; i < sdic.length; i++) {
					basic.push(obj[sdic[i]]);
				}
				return basic;
			}
			return obj;
		}
	}
};
</script>

<style lang="scss">
.container {
	padding-top: 10px;
	.red {
		color: #f1010a;
	}
	.blue {
		color: #0092dd;
	}
	.green {
		color: #07bf00;
	}
	.desc {
		height: 35px;
		line-height: 35px;
		font-size: 12px;
		background-color: #fff;
		display: -webkit-inline-box;
		width: 100%;
		.check-click {
			color: #e12121;
			height: 20px;
			line-height: 20px;
			border: 1px solid #e12121;
			border-radius: 25px;
			width: 50px;
			padding-left: 10px;
			top: 5px;
			margin-top: 2px;
			margin-left: 5px;
		}
		uni-view {
			font-size: 12px;
			height: 35px;
			line-height: 35px;
		}
	}
	.count-list {
		margin: 10px 0;
		padding: 0 10px;
		.count-title {
			color: #ffffff;
			text-align: center;
			height: 72rpx;
			line-height: 72rpx;
			border-radius: 4px;
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
			background: #9da9c2;
		}
		.head1 {
			background: #e12121;
		}

		.head2 {
			background: #2eaae8;
		}
		.num_item {
			background-color: #fff;
			border-bottom: 1px solid #dbdbdb;
			display: flex;
			color: #666;
			uni-view {
				font-size: 12px !important;
			}
			.li_first {
				height: 72rpx;
				line-height: 72rpx;
				width: 16%;
				text-align: center;
				box-sizing: border-box;
				border-right: 1px solid #dbdbdb;
			}
			.hotnum {
				border: 0;
				font-size: 14px;
				width: 8.35%;
				float: left;
				height: 72rpx;
				line-height: 72rpx;
				text-align: center;
				box-sizing: border-box;
				border-right: 1px solid #dbdbdb;
			}
			.hotnum:last-child {
				border-right: none;
			}
		}
		.first-line {
			uni-view {
				font-weight: 600;
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
