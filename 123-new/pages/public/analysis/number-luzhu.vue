<template name="number-luzhu">
	<view class="container">
		<view class="container-head" v-if="codeType==2">
			<view class="head-item" :class="{checked:filterRs.indexOf('0')>-1}" @tap.stop="numSelect('0')">0</view>
			<view class="head-item" :class="{checked:filterRs.indexOf('1')>-1}" @tap.stop="numSelect('1')">1</view>
			<view class="head-item" :class="{checked:filterRs.indexOf('2')>-1}" @tap.stop="numSelect('2')">2</view>
			<view class="head-item" :class="{checked:filterRs.indexOf('3')>-1}" @tap.stop="numSelect('3')">3</view>
			<view class="head-item" :class="{checked:filterRs.indexOf('4')>-1}" @tap.stop="numSelect('4')">4</view>
			<view class="head-item" :class="{checked:filterRs.indexOf('5')>-1}" @tap.stop="numSelect('5')">5</view>
			<view class="head-item" :class="{checked:filterRs.indexOf('6')>-1}" @tap.stop="numSelect('6')">6</view>
			<view class="head-item" :class="{checked:filterRs.indexOf('7')>-1}" @tap.stop="numSelect('7')">7</view>
			<view class="head-item" :class="{checked:filterRs.indexOf('8')>-1}" @tap.stop="numSelect('8')">8</view>
			<view class="head-item" :class="{checked:filterRs.indexOf('9')>-1}" @tap.stop="numSelect('9')">9</view>
		</view>
		<view class="container-head" v-if="codeType==1 || codeType==4">
			<view class="head-item" :class="{checked:filterRs.indexOf('0')>-1}" @tap.stop="numSelect('0')">01</view>
			<view class="head-item" :class="{checked:filterRs.indexOf('1')>-1}" @tap.stop="numSelect('1')">02</view>
			<view class="head-item" :class="{checked:filterRs.indexOf('2')>-1}" @tap.stop="numSelect('2')">03</view>
			<view class="head-item" :class="{checked:filterRs.indexOf('3')>-1}" @tap.stop="numSelect('3')">04</view>
			<view class="head-item" :class="{checked:filterRs.indexOf('4')>-1}" @tap.stop="numSelect('4')">05</view>
			<view class="head-item" :class="{checked:filterRs.indexOf('5')>-1}" @tap.stop="numSelect('5')">06</view>
			<view class="head-item" :class="{checked:filterRs.indexOf('6')>-1}" @tap.stop="numSelect('6')">07</view>
			<view class="head-item" :class="{checked:filterRs.indexOf('7')>-1}" @tap.stop="numSelect('7')">08</view>
			<view class="head-item" :class="{checked:filterRs.indexOf('8')>-1}" @tap.stop="numSelect('8')">09</view>
			<view class="head-item" :class="{checked:filterRs.indexOf('9')>-1}" @tap.stop="numSelect('9')">10</view>
			<view class="head-item" v-if="codeType==4" :class="{checked:filterRs.indexOf('10')>-1}" @tap.stop="numSelect('10')">11</view>
		</view>
		<template v-if="codeType==3||codeType==5||codeType==6">		
			<view class="container-head" >
				<view class="head-item" :class="{checked:filterRs.indexOf('0')>-1}" @tap.stop="numSelect('0')">01</view>
				<view class="head-item" :class="{checked:filterRs.indexOf('1')>-1}" @tap.stop="numSelect('1')">02</view>
				<view class="head-item" :class="{checked:filterRs.indexOf('2')>-1}" @tap.stop="numSelect('2')">03</view>
				<view class="head-item" :class="{checked:filterRs.indexOf('3')>-1}" @tap.stop="numSelect('3')">04</view>
				<view class="head-item" :class="{checked:filterRs.indexOf('4')>-1}" @tap.stop="numSelect('4')">05</view>
				<view class="head-item" :class="{checked:filterRs.indexOf('5')>-1}" @tap.stop="numSelect('5')">06</view>
				<view class="head-item" :class="{checked:filterRs.indexOf('6')>-1}" @tap.stop="numSelect('6')">07</view>
				<view class="head-item" :class="{checked:filterRs.indexOf('7')>-1}" @tap.stop="numSelect('7')">08</view>
				<view class="head-item" :class="{checked:filterRs.indexOf('8')>-1}" @tap.stop="numSelect('8')">09</view>
				<view class="head-item" :class="{checked:filterRs.indexOf('9')>-1}" @tap.stop="numSelect('9')">10</view>
			</view>
			<view class="container-head" >
				<view class="head-item" :class="{checked:filterRs.indexOf('10')>-1}" @tap.stop="numSelect('10')">11</view>
				<view class="head-item" :class="{checked:filterRs.indexOf('11')>-1}" @tap.stop="numSelect('11')">12</view>
				<view class="head-item" :class="{checked:filterRs.indexOf('12')>-1}" @tap.stop="numSelect('12')">13</view>
				<view class="head-item" :class="{checked:filterRs.indexOf('13')>-1}" @tap.stop="numSelect('13')">14</view>
				<view class="head-item" :class="{checked:filterRs.indexOf('14')>-1}" @tap.stop="numSelect('14')">15</view>
				<view class="head-item" :class="{checked:filterRs.indexOf('15')>-1}" @tap.stop="numSelect('15')">16</view>
				<view class="head-item" :class="{checked:filterRs.indexOf('16')>-1}" @tap.stop="numSelect('16')">17</view>
				<view class="head-item" :class="{checked:filterRs.indexOf('17')>-1}" @tap.stop="numSelect('17')">18</view>
				<view class="head-item" :class="{checked:filterRs.indexOf('18')>-1}" @tap.stop="numSelect('18')">19</view>
				<view class="head-item" :class="{checked:filterRs.indexOf('19')>-1}" @tap.stop="numSelect('19')">20</view>
				<view class="head-item" v-if="codeType==6" :class="{checked:filterRs.indexOf('20')>-1}" @tap.stop="numSelect('20')">21</view>
			</view>
		</template>
		<view class="container-head" v-if="codeType==7">
			<view class="head-item" :class="{checked:filterRs.indexOf('0')>-1}" @tap.stop="numSelect('0')">1</view>
			<view class="head-item" :class="{checked:filterRs.indexOf('1')>-1}" @tap.stop="numSelect('1')">2</view>
			<view class="head-item" :class="{checked:filterRs.indexOf('2')>-1}" @tap.stop="numSelect('2')">3</view>
			<view class="head-item" :class="{checked:filterRs.indexOf('3')>-1}" @tap.stop="numSelect('3')">4</view>
			<view class="head-item" :class="{checked:filterRs.indexOf('4')>-1}" @tap.stop="numSelect('4')">5</view>
			<view class="head-item" :class="{checked:filterRs.indexOf('5')>-1}" @tap.stop="numSelect('5')">6</view>
		</view>
		
		<template v-for="(item,index) in mainData" v-if="filterRs.indexOf(index.toString())!=-1">
			<view :key="index" class="content-list">
				<view class="content-title">
					<view class="title-left">
						今日累计：总来({{item.total.yes}})  没来({{item.total.no}})
					</view>
					<view class="title-right">
						号码 {{codeType == 2 ? index : index + 1}} 最新 ↓
					</view>
				</view>
				<view class="table-box">
					<table @touchstart.stop @touchend.stop class="lz_table_con" border="0" cellpadding="1" cellspacing="1">
					  <tbody>
					  <tr class="tablebox">
					    <td v-for="(temp,tempIndex) in item.list" :key="tempIndex">
					      <p v-for="(p,pIndex) in temp" :key="pIndex" :class="{font_red:p==1,font_gray:p==0}">{{p == 0 ? '×' : '✓'}}</p>
					    </td>
					  </tr>
					  </tbody>
					</table>
				</view>
			</view>
		</template>
	</view>
	
</template>

<script>
export default {
	name: 'number-luzhu',
	props: ['code', 'date', 'current_number'],
	data() {
		return {
			mainData: [],
			allSet: [],
			filterRs: [],
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
		const allTypes = uni.getStorageSync('analysisKinds')['hmlzfx'];
		if (allTypes['type1'].indexOf(this.code) != -1) {
			this.codeType = 1;
			this.allSet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
		}
		if (allTypes['type2'].indexOf(this.code) != -1) {
			this.codeType = 2;
			this.allSet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
		}
		if (allTypes['type3'].indexOf(this.code) != -1) {
			this.codeType = 3;
			this.allSet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];
		}
		if (allTypes['type4'].indexOf(this.code) != -1) {
			this.codeType = 4;
			this.allSet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
		}
		if (allTypes['type5'].indexOf(this.code) != -1) {
			this.codeType = 5;
			this.allSet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];
		}
		if (allTypes['type6'].indexOf(this.code) != -1) {
			this.codeType = 6;
			this.allSet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
		}
		if (allTypes['type7'].indexOf(this.code) != -1) {
			this.codeType = 7;
			this.allSet = ['0', '1', '2', '3', '4', '5'];
		}
		this.filterRs = [...this.allSet];
		this.getAnalysisDetail();
	},
	methods: {
		numSelect(n) {
			if (this.filterRs.indexOf(n) == -1) {
				this.filterRs.push(n);
			} else {
				this.filterRs.splice(this.filterRs.indexOf(n), 1);
			}
		},
		objectToArray(obj) {
			if (obj.constructor != Array) {
				let basic = [];
				// let sdic = Object.keys(obj).sort(); //根据key排序
				let sdic = Object.keys(obj);
				for (let i = 0; i < sdic.length; i++) {
					basic.push(obj[sdic[i]]);
				}
				return basic;
			}
			return obj;
		},
		getAnalysisDetail() {
			let that = this;
			this.$api.getAnalysisDetail({ code: this.code, type: 'hmlzfx', date: this.date }).then(res => {
				uni.hideLoading();
				if (res.code == 0) {
					that.mainData = that.objectToArray(res.data);
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
		padding:0 10px;
		overflow-x: scroll;
		height: 50px;
		font-size: 12px;
		background-color: #fff;
		display: flex;
		width: 100%;
		border-bottom: 1px solid #dbdbdb;		
		.head-item {
			width: 30px;
			height: 30px;
			line-height: 30px;
			text-align: center;
			margin-right: 4px;
			// height: 31px;
			// padding: 0 10px;
			
			border: 1px solid #dbdbdb;
			border-radius: 5px;
			font-size: 14px;
			line-height: 35px;
			margin-top: 8px;
			// margin-right: 10px;
		}
		.checked{
			color: #e12121;
			border: 1px solid #e12121;			
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
</style>
