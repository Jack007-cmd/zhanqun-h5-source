<template name="number-distribution">
	<view class="container" v-if="mainData.length > 0">
		<view class="container-head">
			<view class="num-list" v-if="codeType == 2">
						<view class="num-item" :class="{ checked: numRs.indexOf('0')>-1}" @tap.stop="numSelect('0')">0</view>
						<view class="num-item" :class="{ checked: numRs.indexOf('1')>-1}" @tap.stop="numSelect('1')">1</view>
						<view class="num-item" :class="{ checked: numRs.indexOf('2')>-1}" @tap.stop="numSelect('2')">2</view>
						<view class="num-item" :class="{ checked: numRs.indexOf('3')>-1}" @tap.stop="numSelect('3')">3</view>
						<view class="num-item" :class="{ checked: numRs.indexOf('4')>-1}" @tap.stop="numSelect('4')">4</view>
						<view class="num-item" :class="{ checked: numRs.indexOf('5')>-1}" @tap.stop="numSelect('5')">5</view>
						<view class="num-item" :class="{ checked: numRs.indexOf('6')>-1}" @tap.stop="numSelect('6')">6</view>
						<view class="num-item" :class="{ checked: numRs.indexOf('7')>-1}" @tap.stop="numSelect('7')">7</view>
						<view class="num-item" :class="{ checked: numRs.indexOf('8')>-1}" @tap.stop="numSelect('8')">8</view>
						<view class="num-item" :class="{ checked: numRs.indexOf('9')>-1}" @tap.stop="numSelect('9')">9</view>
					</view>
					<view class="num-list" v-if="codeType == 1 || codeType == 4">
						<view class="num-item" :class="{ checked: numRs.indexOf('1')>-1}" @tap.stop="numSelect('1')">01</view>
						<view class="num-item" :class="{ checked: numRs.indexOf('2')>-1}" @tap.stop="numSelect('2')">02</view>
						<view class="num-item" :class="{ checked: numRs.indexOf('3')>-1}" @tap.stop="numSelect('3')">03</view>
						<view class="num-item" :class="{ checked: numRs.indexOf('4')>-1}" @tap.stop="numSelect('4')">04</view>
						<view class="num-item" :class="{ checked: numRs.indexOf('5')>-1}" @tap.stop="numSelect('5')">05</view>
						<view class="num-item" :class="{ checked: numRs.indexOf('6')>-1}" @tap.stop="numSelect('6')">06</view>
						<view class="num-item" :class="{ checked: numRs.indexOf('7')>-1}" @tap.stop="numSelect('7')">07</view>
						<view class="num-item" :class="{ checked: numRs.indexOf('8')>-1}" @tap.stop="numSelect('8')">08</view>
						<view class="num-item" :class="{ checked: numRs.indexOf('9')>-1}" @tap.stop="numSelect('9')">09</view>
						<view class="num-item" :class="{ checked: numRs.indexOf('10')>-1}" @tap.stop="numSelect('10')">10</view>
						<view class="num-item" v-if="codeType == 4" :class="{ checked: numRs.indexOf('11')>-1}" @tap.stop="numSelect('11')">11</view>
					</view>
					<template v-if="codeType == 3 || codeType == 5 || codeType == 6">
						<view class="num-list">
							<view class="num-item" :class="{ checked: numRs.indexOf('1')>-1}" @tap.stop="numSelect('1')">01</view>
							<view class="num-item" :class="{ checked: numRs.indexOf('2')>-1}" @tap.stop="numSelect('2')">02</view>
							<view class="num-item" :class="{ checked: numRs.indexOf('3')>-1}" @tap.stop="numSelect('3')">03</view>
							<view class="num-item" :class="{ checked: numRs.indexOf('4')>-1}" @tap.stop="numSelect('4')">04</view>
							<view class="num-item" :class="{ checked: numRs.indexOf('5')>-1}" @tap.stop="numSelect('5')">05</view>
							<view class="num-item" :class="{ checked: numRs.indexOf('6')>-1}" @tap.stop="numSelect('6')">06</view>
							<view class="num-item" :class="{ checked: numRs.indexOf('7')>-1}" @tap.stop="numSelect('7')">07</view>
							<view class="num-item" :class="{ checked: numRs.indexOf('8')>-1}" @tap.stop="numSelect('8')">08</view>
							<view class="num-item" :class="{ checked: numRs.indexOf('9')>-1}" @tap.stop="numSelect('9')">09</view>
							<view class="num-item" :class="{ checked: numRs.indexOf('10')>-1}" @tap.stop="numSelect('10')">10</view>
						</view>
						<view class="num-list">
							<view class="num-item" :class="{ checked: numRs.indexOf('11')>-1}" @tap.stop="numSelect('11')">11</view>
							<view class="num-item" :class="{ checked: numRs.indexOf('12')>-1}" @tap.stop="numSelect('12')">12</view>
							<view class="num-item" :class="{ checked: numRs.indexOf('13')>-1}" @tap.stop="numSelect('13')">13</view>
							<view class="num-item" :class="{ checked: numRs.indexOf('14')>-1}" @tap.stop="numSelect('14')">14</view>
							<view class="num-item" :class="{ checked: numRs.indexOf('15')>-1}" @tap.stop="numSelect('15')">15</view>
							<view class="num-item" :class="{ checked: numRs.indexOf('16')>-1}" @tap.stop="numSelect('16')">16</view>
							<view class="num-item" :class="{ checked: numRs.indexOf('17')>-1}" @tap.stop="numSelect('17')">17</view>
							<view class="num-item" :class="{ checked: numRs.indexOf('18')>-1}" @tap.stop="numSelect('18')">18</view>
							<view class="num-item" :class="{ checked: numRs.indexOf('19')>-1}" @tap.stop="numSelect('19')">19</view>
							<view class="num-item" :class="{ checked: numRs.indexOf('20')>-1}" @tap.stop="numSelect('20')">20</view>
							<view class="num-item" v-if="codeType == 6" :class="{ checked: numRs.indexOf('21')>-1}" @tap.stop="numSelect('21')">21</view>
						</view>
					</template>
			<view class="dxds-box">
				<view class="dxds-list">
					<view class="dxds" :class="{ checked: filterRs.indexOf('0')>-1}" @tap.stop="filter(0)">单</view>
					<view class="dxds" :class="{ checked: filterRs.indexOf('1')>-1}" @tap.stop="filter(1)">双</view>
					<view class="dxds" :class="{ checked: filterRs.indexOf('2')>-1}" @tap.stop="filter(2)">大</view>
					<view class="dxds" :class="{ checked: filterRs.indexOf('3')>-1}" @tap.stop="filter(3)">小</view>
				</view>
			</view>
		</view>
		<view class="content">
			<template v-if="codeType == 1">
				<view class="detail-line" v-for="(item, index) in mainData">
					<text>{{ item.time.substring(11, 16) }}</text>
					<text>{{ item.no }}</text>
					<view
						class="pk10_sm"
						v-for="(num, nIndex) in item.num"
						:class="{
							nub01: Number(num) == 1,
							nub02: Number(num) == 2,
							nub03: Number(num) == 3,
							nub04: Number(num) == 4,
							nub05: Number(num) == 5,
							nub06: Number(num) == 6,
							nub07: Number(num) == 7,
							nub08: Number(num) == 8,
							nub09: Number(num) == 9,
							nub10: Number(num) == 10,
						}"
					><i style="display: none;">{{num}}</i></view>
				</view>
			</template>
			<template v-if="codeType==2||codeType==4">
				<view class="detail-line" v-for="(item, index) in mainData">
					<text>{{ item.time.substring(11, 16) }}</text>
					<text>{{ item.no.toString().substring(6) }}</text>
					<view class="ssc_sm" style="margin: 0 30rpx;" v-for="(num, nIndex) in item.num">{{num}}</view>
				</view>
			</template>
			<template v-if="codeType==3||codeType==6">
				<view class="detail-line" v-for="(item, index) in mainData">
					<text>{{ item.time.substring(11, 16) }}</text>
					<text>{{ item.no.toString().substring(2) }}</text>
					<template v-if="codeType==3">
						<view class="ssc_sm" style="margin: 0 8rpx;" v-for="(num, nIndex) in item.num">{{num}}</view>
					</template>
					<template v-if="codeType==6">
						<view class="ssc_sm" style="margin: 0 24rpx;" v-for="(num, nIndex) in item.num">{{num}}</view>
					</template>
				</view>
			</template>
			<template v-if="codeType==5">
				<view class="detail-line" v-for="(item, index) in mainData">
					<text>{{ item.time.substring(11, 16) }}</text>
					<text>{{ item.no.toString().substring(6) }}</text>
					<view class="ssc_sm" style="margin: 0 10rpx;" v-for="(num, nIndex) in item.num">{{num}}</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
export default {
	name: 'number-distribution',
	props: ['code', 'date', 'current_number'],
	data() {
		return {
			mainData: [],
			rank: 0,
			max: null,
			numRs: [],
			filterRs: '',
			codeType: -1
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
		// 号码分布：时时彩：0~9  北京pk10：01~10 广东11选5: 01~11
		//            （重庆幸运农场）极速快乐十分：01~20  广西快乐十分01~21
		// Detail-01 :北京PK10(bjpks) 澳洲幸运10(ajxys) 极速赛车(jssc) 极速飞艇(jsft)（4）
		// Detail-02:重庆时时彩(cqssc) 天津时时彩(tjssc) 新疆时时彩(xjssc) 极速时时彩(jsssc) 重庆七星彩(cqqxc) 澳洲幸运5(ajxyw)（6）
		const allTypes = uni.getStorageSync('analysisKinds')['hmfb'];
		if (allTypes['type1'].indexOf(this.code) != -1) {
			this.codeType = 1;
		}
		if (allTypes['type2'].indexOf(this.code) != -1) {
			this.codeType = 2;
		}
		if (allTypes['type3'].indexOf(this.code) != -1) {
			this.codeType = 3;
		}
		if (allTypes['type4'].indexOf(this.code) != -1) {
			this.codeType = 4;
		}
		if (allTypes['type5'].indexOf(this.code) != -1) {
			this.codeType = 5;
		}
		if (allTypes['type6'].indexOf(this.code) != -1) {
			this.codeType = 6;
		}
		uni.showLoading({ title: 'loading' });
		this.getAnalysisDetail();
		this.numShowCtrl();
	},
	methods: {
		numSelect(n) {
			if (this.numRs.indexOf(n) == -1) {
				this.numRs.push(n);
				this.filterRs = '';
			} else {
				this.numRs.splice(this.numRs.indexOf(n), 1);
			}
			this.numShowCtrl();
		},
		filter(f) {
			if (this.filterRs.indexOf(f + ',') == -1) {
				this.filterRs += f + ',';
				switch (f) {
					case 0: //单
						this.filterRs = this.filterRs.replace('1,', '');
						break;
					case 1: //双
						this.filterRs = this.filterRs.replace('0,', '');
						break;
					case 2: //大
						this.filterRs = this.filterRs.replace('3,', '');
						break;
					case 3: //小
						this.filterRs = this.filterRs.replace('2,', '');
						break;
					default:
				}
				this.numRs = [];
			} else {
				this.filterRs = this.filterRs.replace(f + ',', '');
			}
			this.numShowCtrl();
		},
		numShowCtrl() {
			let that = this;
			$('.selectedOpacity').removeClass('selectedOpacity');
			if (that.numRs.length > 0) {
				$('.detail-line')
					.find('uni-view')
					.each(function() {
						if (that.numRs.indexOf(Number($(this).text()) + '') == -1) {
							$(this).addClass('selectedOpacity');
						}
					});
			}
			if (that.filterRs) {
				$('.detail-line')
					.find('uni-view')
					.each(function() {
						if (that.filterRs.indexOf('0') > -1 && Number($(this).text()) % 2 != 1) {
							//单
							if (!$(this).hasClass('selectedOpacity')) {
								$(this).addClass('selectedOpacity');
							}
						}
						if (that.filterRs.indexOf('1') > -1 && Number($(this).text()) % 2 != 0) {
							//双
							if (!$(this).hasClass('selectedOpacity')) {
								$(this).addClass('selectedOpacity');
							}
						}
						if (that.filterRs.indexOf('2') > -1 && Number($(this).text()) <= that.max / 2) {
							//大
							if (!$(this).hasClass('selectedOpacity')) {
								$(this).addClass('selectedOpacity');
							}
						}
						if (that.filterRs.indexOf('3') > -1 && Number($(this).text()) > that.max / 2) {
							//小
							if (!$(this).hasClass('selectedOpacity')) {
								$(this).addClass('selectedOpacity');
							}
						}
					});
			}
		},
		getAnalysisDetail() {
			let that = this;
			that.$api.getAnalysisDetail({ code: that.code, type: 'jskj', date: that.date }).then(res => {
					uni.hideLoading();
				if (res.code == 0) {
					that.max = res.data.max;
					that.mainData = res.data.list;
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
		.dxds-box {
			height: auto;
			padding: 0 10px 10px;
			width: 94%;
			margin-left: auto;
			margin-right: auto;
			margin-top: 25px;
			.dxds-list {
				width: auto;
				height: 30px;
				margin-top: 10px;
				text-align: center;
				.dxds {
					float: left;
					font-size: 14px;
					color: #e12121;
					width: 25%;
					height: 31px;
					line-height: 30px;
					-webkit-box-sizing: border-box;
					box-sizing: border-box;
					list-style-type: none;
					border-left: 1px solid #e12121;
					border-top: 1px solid #e12121;
					border-bottom: 1px solid #e12121;
				}
				.checked {
					color: #fff;
					background: #e12121;
				}
				.dxds:first-child {
					border-top-left-radius: 5px;
					border-bottom-left-radius: 5px;
				}
				.dxds:last-child {
					border-top-right-radius: 5px;
					border-bottom-right-radius: 5px;
					border-right: 1px solid #e12121;
				}
			}
		}
	}
	.content {
		padding-top: 10rpx;
		margin-top: 10px;
		background: #fff;
		.detail-line {
			width: 100%;
			display: inline-block;
			border-bottom: 1px solid #efeff4;
			padding: 10rpx 20rpx;
			uni-text {
				font-size: 12px;
				float: left;
				color: #666666;
				margin-right: 20rpx;
			}
		}
	}
}
.selectedOpacity {
	opacity: 0.1 !important;
}
</style>
