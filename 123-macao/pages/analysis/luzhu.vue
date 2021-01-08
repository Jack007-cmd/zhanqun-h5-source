<template name="lhc-luzhu">

	<view class="container">
		<view class="nav">
			<view class="nav-line">
				<view class="nav-list" @touchstart.stop  @touchend.stop>
					<view class="nav-item" @click="setCurrent(sort.type)" :class="{ current: currentSort == sort.type }" v-for="sort in list" :key="sort.type">
						{{ sort.name }}
					</view>
				</view>
			</view>
			<view class="font_family icontriangle" @click="showAll = true"></view>
		</view>
		<template v-if="mainData"  v-for="(item, index) in mainData">
			<view :key="index">
				<view  class="content-list">
					<view class="content-title">
						<view class="title-left">累計：<text v-for="(k,cindex) in item.statistics">{{cindex+'（' + k + '）'}}</text></view>
						<view class="title-right">{{item.rankName}}&nbsp;&nbsp;{{typeName}}&nbsp;&nbsp;最新&nbsp;&nbsp;↓</view>
					</view>
					<view class="table-box">
						<table @touchstart.stop @touchend.stop border="0" cellpadding="1" cellspacing="1">
							<tbody>
								<tr class="tablebox">
									<td v-for="(temp, tempIndex) in item.statisticsList" :key="tempIndex">
										<p v-for="(a, aIndex) in temp" :class="a == '雙'||a == '大'||a == '家'||a == '紅'?'font_red':(a =='綠'?'font_green':(a=='藍'?'font_blue':''))">{{a}}</p>
									</td>
								</tr>
							</tbody>
						</table>
					</view>
				</view>
			</view>
		</template>
		<!-- tab选框弹窗 -->
		<view class="u-popup" v-if="showAll">
			<view class="u-transition-out" @click="showAll = !showAll"></view>
			<view class="u-transition">
				<view class="u-popup__wrapper-box">
					<view class="u-main">
						<view class="u-title">
							<view class="option-md">選擇分析類型</view>
							<view class="option-md" @click="showAll = !showAll">取消</view>
						</view>
						<view class="u-content">
							<view class="content-item">
								<view
									class="option"
									v-for="sort in list"
									:key="'f' + sort.type"
									:class="{ checked: currentSort == sort.type }"
									@click="setCurrent(sort.type)"
								>
									{{ sort.name }}
								</view>
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
		name: 'lhc-luzhu',
		props: ['code', 'date', 'current_number','list','type'],
		data() {
			return {
				mainData: null,
				mode: '2', //9综合模式，1单选模式，2双选模式
				allSet: [],
				filterRs: '',
				tempRs: '',
				showFilter: -1,
				codeType:-1,
				sortList: [],
				currentSort: 'getSDRoadOfBead',
				typeName:'',
				showAll:false,
				typeRoadOfBead: ['getSDRoadOfBead', 'getBSRoadOfBead', 'getColorRoadOfBead', 'getTotalSDRoadOfBead', 'getTotalBSRoadOfBead', 'getMantissaRoadOfBead', 'getCompositeRoadOfBead', 'getPoultryBeastRoadOfBead']
			}
		},
		watch: {
			date(newData, prevData) {
				uni.showLoading({
					title: 'loading'
				});
				this.limit = '';
				this.getLhcChart();
			},
			current_number(newData, prevData) {
				uni.showLoading({
					title: 'loading'
				});
				this.getLhcChart();
			},
			list(newData, prevData) {
				this.list = newData;
			},
			type(newData, prevData) {
				uni.showLoading({title:'loading'});
				this.currentSort = newData;
				this.getLhcChart();
			}
		},
		created: function(e) {
			if(this.type){
				this.currentSort = this.type;
			}
			uni.showLoading({title:'loading'});
			this.setExtraLimit();
			this.getLhcChart();
			
		},
		onLoad: function() {
			
		},
		methods: {
			setCurrent(type){
				this.showAll = false;
				this.currentSort = type;
				this.getLhcChart();
			},
			getLhcChart() {
				let that = this;
				let date = that.date;
				if(that.limit){
					date = '';
				}
				that.$api.getAnalysisDetail({ code: that.code, date: date, type: that.currentSort,extra: that.limit}).then(res => {
					uni.hideLoading();
					if (res.code == 0) {
						that.mainData = res.data.list;
						that.typeName = res.data.typeName;
					}else{
						uni.showToast({
	 　　　　　　　　　　　　title: "网络异常，请稍后再试",
	 　　　　　　　　　　　　icon: 'none'
	 　　　　　　　　　　})
					 }
				})
			},
			setExtraLimit(){
				if(this.typeRoadOfBead.indexOf(this.currentSort)!=-1){
					this.limit = 'limit=60';
				}
			}
		}
	}
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
				    .font_green{
						color: rgb(31, 194, 107) !important;
					}
					.font_blue{
						color: rgb(0, 147, 232) !important;
					}
				}
				td:nth-child(odd) {
					background: #f5f5f5;
				}
			}
		}
	}
	.nav {
		background-color: #fff;
		margin-bottom: 10rpx;
		height: 80rpx;
		// padding-left: 20rpx;
		display: flex;
		justify-content: center; 
		align-items: center;
		.nav-line {
			font-size: 16px;
			position: relative;
			width: 85%;
			display: inline-block;
			overflow: scroll;
			margin-right: 20rpx;
			.nav-list {
				height: 80rpx;
				width: 100%;
				overflow-x: scroll;
				text-align: center;
				width: max-content;
				display: flex;
				justify-content: flex-start; 
				align-items: center;  
				.nav-item {
					display: inline-block;
					float: left;
					min-width: 70px;
					height: 80rpx;
					text-align: center;
					font-size: 16px;
					padding-top: 0;
					line-height: 80rpx;
					height: 52rpx;
					display: flex;
					justify-content: center; 
					align-items: center;  
					padding: 0 25rpx;
					border-radius: 6rpx;
					color: #666666;
				}
				.current {
					color: #FFFFFF;
					background: #546168;
				}
			}
		}
		.icontriangle{
			font-size: 36rpx!important;
			float: right;
			border: 0;
			outline: 0;
			position: relative;
			top: 2rpx;
			margin-left: 2rpx;
			color: #888;
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
	padding-top: 10px;
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
		display: flex;
		flex-wrap: wrap;
		justify-content:space-between;
		align-items: flex-start;
		align-content: flex-start;
		.option {
			text-align: center;
			width: 31%;
			height: 30px;
			font-size: 14px;
			border: 1px solid #e4e3e8;
			margin-top: 10px;
			border-radius: 3px;
			display: inline-block;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			display:flex;
			justify-content:center;
			align-items:center;
			flex-direction:column;
			color:#666;
		}
		.checked {
			border-color: #e12121;
			color: #e12121;
			position: relative;
		}
	}
	.content-item:after{
		content: '';
		width: 31%;
		border:1px solid transparent;
	}
}
</style>
