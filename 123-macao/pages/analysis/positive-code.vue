<template name="lhc-positive-code">
	<view class="container">
		<view class="nav">
			<view class="nav-line">
				<view class="nav-list" @touchstart.stop  @touchend.stop>
					<view class="nav-item" @click="setCurrentSort(sort.type)" :class="{ current: currentSort == sort.type }" v-for="sort in list" :key="'t' + sort.type">
						{{ sort.name }}
					</view>
				</view>
			</view>
			<view class="font_family icontriangle" @click="showAll = true"></view>
		</view>
		<view class="echart">
			<view class="census" v-if="currentSort == 'temaMantissaHandDown' || currentSort == 'twoSidesAnalyze'">
				<view class="txt" v-if="currentSort == 'twoSidesAnalyze'">特碼兩面分析(100)期</view>
				<view class="txt" v-if="currentSort == 'temaMantissaHandDown'">特碼尾數遺漏(100)期</view>
			</view>
			<view class="census" v-else>
				<view class="txt">統計期數：</view>
				<view class="num" @click="showPopLimit">{{limit}}</view>
				<view class="txt" style="margin-left: 15rpx;">期</view>
			</view>
			<view class="echart-nav" v-if="mainData" @touchstart.stop  @touchend.stop>
				<mpvue-echarts  style="height:100%;width: 100%;" canvasId="tem" ref="barChart" :echarts="echarts" @onInit="initChart" @touchstart.stop  @touchend.stop/>
			</view>
		</view>
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
									@click="setCurrentSort(sort.type)"
								>
									{{ sort.name }}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 输入内容弹窗 -->
		<view class="t-popup" v-if="showInputBox">
			<view class="p-content">
				<view class="title">輸入統計期數</view>
				<view class="font_icon iconsyclose"  @click="closePopBox"></view>
				<input type="text" class="num" placeholder="100" v-model="periods"/>
				<view class="error"><text v-show="errorShow">請輸入正確的期數!</text></view>
				<button type="default" class="btn" :class="{on:checked==1}" @click="getPeriods" >確定</button>
			</view>
		</view>
	</view>
</template>

<script>
	import * as echarts from '../../components/echarts/echarts.min.js';
	import mpvueEcharts from '../../components/mpvue-echarts/src/echarts.vue';
	
	export default {
		name: 'lhc-positive-code',
		props: ['code', 'date', 'current_number','list','type'],
		components: {
			mpvueEcharts
		},
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
				currentSort: '',
				showAll: false,
				limit: 100,
				showInputBox: false,
				periods:'',
				errorShow: true,
				checked: 0,
				echarts,
				label: [],
				win: [],
				lose: [],
				issue: [],
				myChart: null,
				serData:[],  //series中的data数据
				paramrType: -1
				
			}
		},
		onLoad: function(e) {
	
		},
		watch: {
			date(newData, prevData) {
				uni.showLoading({
					title: 'loading'
				});
				this.paramrType = 1;
				this.getLhcChart();
			},
			current_number(newData, prevData) {
				uni.showLoading({
					title: 'loading'
				});
				this.getLhcChart();
			},
			periods(newData, prevData) {
				this.judgeFormat();
			},
			type(newData, prevData) {
				uni.showLoading({title:'loading'});
				this.limit = 100;
				this.currentSort = newData;
				this.getLhcChart();
			}
		},
		created: function(e) {
			uni.showLoading({title:'loading'});
			this.currentSort = this.type;
			this.getLhcChart();
		},
		methods: {
			getLhcChart() {
				let that = this;
				let date ='';
				let extra ='';
				if(that.paramrType==1){
					date = that.date;
					extra = '';
				}else if(that.paramrType==2){
					date = '';
					extra = 'limit=' + that.limit;
				}else{
					date = that.date;
					extra = 'limit=' + that.limit;
				}
				that.$api.getAnalysisDetail({ code: that.code,  date: date, type: that.currentSort, extra: extra }).then(res => {
						uni.hideLoading();
					if (res.code == 0) {
						that.mainData = res.data;
						if(res.data.numbers){
							that.label =res.data.numbers;
						}else if(that.currentSort=="twoSidesAnalyze"){
							that.label = ['大','小','单','双','合单','合双','尾大','尾小'];
						}else if(that.currentSort=="temaMantissaHot" || that.currentSort=="temaMantissaHandDown"){
							that.label  = [0,1,2,3,4,5,6,7,8,9];
						}
						if(res.data.numbersCount){
							that.serData = res.data.numbersCount;
						}
						that.showInputBox = false;
						setTimeout(function(){
							that.drawCanvas();
						},100)
					}else{
						uni.showToast({
		　　　　　　　　　　　　title: "网络异常，请稍后再试",
		　　　　　　　　　　　　icon: 'none'
		　　　　　　　　　　})
					 }
				});
			},
			getPeriods(){
				if(this.errorShow==false){
					this.limit = this.periods;
					this.paramrType = 2;
					this.getLhcChart();
				}
			},
			showPopLimit(){
				this.errorShow = false;
				this.showInputBox = true;
				this.periods = '';
			},
			closePopBox(){
				this.errorShow = false;
				this.showInputBox = false;
				this.periods = '';
			},
			judgeFormat(){
				let that = this;
				var reg = /^\+?[1-9][0-9]*$/;　
				if(reg.test(that.periods)){
					if(that.periods>500){
						that.periods = 500;
					}
					this.errorShow = false;
					this.checked = 1;
				}else{
					this.errorShow = true;
					this.checked = 0;
				}
			},
			initChart(e) {
				let { canvas, width, height } = e;
				echarts.setCanvasCreator(() => canvas);
				this.myChart = echarts.init(canvas, null, {
					width: width,
					height: height
				});
				canvas.setChart(this.myChart);
				this.drawCanvas();
			},
			// 绘图
			drawCanvas() {
				let that = this;
				let option = {
					dataZoom: [
						{
							id: 'dataZoomX',
							type: 'slider',
							// xAxisIndex: 0,
							filterMode: 'empty', // 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
							start: 0,
							end: that.label.length > 90 ? 10 : that.label.length > 40 ? 20 : that.label.length < 30 ? (that.label.length < 15 ? 100 : 50) : 40
						}
					],
					backgroundColor: '#FFFFFF', //背景色
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							// 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						},
						formatter: function(params) {
							  let tar;
							  tar = params[0];
							  return  that.label[tar['dataIndex']] + ':' + that.serData[tar['dataIndex']] +'次';
						},
					
					},
					legend: {},
					grid: {
						top: '10%',
						left: '2%',
						right: '4%',
						bottom: '4%',
						containLabel: true
					},
					color: ["#09A1E8", "#e47700"],
					xAxis: {
						data: (function() {
							return that.label;
						})(),
						// axisTick: {
						// 	show: false
						// },
						axisLine: {
							show: true,
							lineStyle: {
								color: '#9A9A9A',
								width: 1 //这里是为了突出显示加上的
							},
						}
					},
					textStyle: {color: "#666666"},
					yAxis: {
						type: 'value',
						axisTick: {
							show: false
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: '#9A9A9A',
								width: 1 //这里是为了突出显示加上的
							}
						},
						splitLine: {
							show:true,
							lineStyle:{
								type: 'dashed'
							}
						},
						minInterval:1,
					},
					series: {
							type: "bar",
							symbolSize: 10,
							itemStyle: {
								normal: {
									color: '#09A1E8',
									type: 'solid',
									label: {
											show: false, //开启显示
											position: 'top', //在上方显示
										}
								}
							},
							barWidth: 15,
							legendHoverLink: true, //---是否启用图例 hover 时的联动高亮
							data: that.serData
						}
				};
				// 使用刚指定的配置项和数据显示图表。
				that.myChart.setOption(option);
				that.$refs.barChart.setChart(that.myChart);
			},
			setCurrentSort(type){
				this.periods = '';
				this.limit = 100;
				this.currentSort = type;
				this.showAll = false;
				this.getLhcChart();
			}
		}
	}
</script>



<style lang="scss">
.container {
	padding-top: 5px;
	position: relative;
	width: 100%;
	height: 100%;
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
	.echart{
		background: #FFFFFF;
		width: 100%;
		position: relative;
		padding: 35rpx 25rpx;
		.census{
			width: 100%;
			height: 64rpx;
			display: flex;
			align-items: center;  
			margin-bottom: 10rpx;
			.txt{
				color: #666666;
				font-size: 26rpx;
			}
		    .num{
				width: 100rpx;
				height: 64rpx;
				background: #EFEFF4;
				border: 1px solid #DFDFE9;
				border-radius: 10rpx;
				color: #666666;
				display: flex;
				justify-content: center; 
				align-items: center;
			}
		}
		.echart-nav{
			width: 705rpx;
			height: 375rpx;
		}
	}
	.t-popup{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
		z-index: 9999;
	}
	.p-content{
		position: absolute;
		width: 620rpx;
		height: 360rpx;
		top: 50%;
		left: 50%;
		margin-top: -180rpx;
		margin-left: -310rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		padding: 35rpx 40rpx;
		.iconsyclose{
			position: absolute;
			top: 0rpx;
			right: 22rpx;
			display: inline-block;
			font-size: 48rpx;
			color: #666666;
		}
		.title{
			text-align: center;
			color: #666666;
            font-size: 28rpx;
			margin-bottom: 20rpx;
		}
		.num{
			width: 540rpx;
			height: 80rpx;
			text-align: center;
			color: #999999;
			outline: none;
			border: none;
			border-bottom: 1px solid #D3D3DC;
			margin-bottom: 10rpx;
			color: #333333;
		}
		.error{
			width: 540rpx;
			height: 40rpx;
			color: #FF0000;
			font-size: 24rpx;
			margin-bottom: 10rpx;
			text-align: center;
		}
		.btn{
			width: 540rpx;
			height: 80rpx;
			border: none;
			background-color: transparent;
			outline: none; 
			background: rgba(221,221,221,0.5);
			border-radius: 10rpx;
			color: #FFFFFF;
			display: flex;
			justify-content: center; 
			align-items: center;
		}
		.on{
            background: #E83F46;
		}
	}
	.p-popup-error{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 80rpx;
		background: #FDE1E1;
		z-index: 9999;
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
