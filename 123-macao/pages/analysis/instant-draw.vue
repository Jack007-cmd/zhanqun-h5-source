<template>
	<view class="container">
		<view class="container-title">
			<view class="title-left"  style="width: 115rpx;">
				<text class="item" v-if="spanType == 3">期數</text>
				<text class="item" v-else>時間/期數</text>
			</view>
			<view class="title-right">
				<text class="item" :class="{ checked: spanType == 1 }" @click="toggleType(1)">號碼</text>
				<text class="item" :class="{ checked: spanType == 2 }" @click="toggleType(2)">總和</text>
				<text class="item" :class="{ checked: spanType == 3 }" @click="toggleType(3)">特碼</text>
			</view>
		</view>
		<view v-if="mainList && mainList.length > 0"> 
			<view class="content">
				<template v-if="spanType == 1" >
					<view class="detail-line" :key="'a'+index" v-for="(item, index) in mainList"  @click="toggleClass(index)" :class="{on:isActive==index}">
						<view class="left-part">
							<text class="left-time">{{item['no']}}期</text>
							<text class="left-no">{{item['time'].substring(5,16)}}</text>
						</view>
						<view class="right-part">
							<view class="box clearfix"  style="margin-top: 20rpx;">
								<template v-for="(ccode, cindex) in item['num']">
									<view :key="'x'+6" v-if="cindex==6" class="font_family iconjia"></view>
									<view  :key="cindex + ccode" class="lhc" :class="{lhcRed:item.color[cindex]==1,lhcGreen:item.color[cindex]==2,lhcBlue:item.color[cindex]==3}">{{ Number(ccode)<10?'0'+ Number(ccode) : ccode }}</view>
								</template>
							</view>
							<view class="box clearfix">
								<template v-for="(temp, tempIndex) in item['zodiacTypeName']">
									<view :key="'y'+6" v-if="tempIndex==6" class="plus"></view>
									<view :key="temp + tempIndex" class="lhcOther" >{{ temp }}</view>
								</template>		
							</view>
						</view>
					</view>
				</template>
				<template v-if="spanType == 2" >
					<view class="detail-line" :key="'c'+index" v-for="(item, index) in mainList"  @click="toggleClass(index)" :class="{on:isActive==index}" style="height: 90rpx;">
						<view class="left-part">
							<text class="left-no">{{item['preDrawTime']}}</text>
						</view>
						<view class="left-part">
							<text class="left-time">{{item['no']}}期</text>
						</view>
						<view class="right-pt">
							<view><text class="sum">{{item['total']['total']}}</text></view>
							<view><text class="size">{{item['total']['singleDouble']}}</text></view>
							<view><text class="single">{{item['total']['bigSmall']}}</text></view>
							<view><text class="cl" :class="{jslhcRed:item['total']['nanairo']=='紅',jslhcGreen:item['total']['nanairo']=='綠',jslhcBlue:item['total']['nanairo']=='藍',jslhcSum:item['total']['nanairo']=='和局'}">{{item['total']['nanairo']}}</text></view>
						</view>
					</view>
				</template>
				<template v-if="spanType == 3">
					<view class="detail-line" :key="'b'+index" v-for="(item, index) in mainList"  @click="toggleClass(index)" :class="{on:isActive==index}" style="height: 90rpx;">
						<view class="left-part">
							<text class="left-time" style="color:#666666;">{{item['no']}}期</text>
						</view>
						<view class="right-special">
							<view class="lhc" :class="{lhcRed:item.color[6]==1,lhcGreen:item.color[6]==2,lhcBlue:item.color[6]==3}">{{ Number(item['num'][6])<10?'0'+ Number(item['num'][6] ) : item['num'][6] }}</view>
							<view class="ds">{{item['teMa']['singleDouble']}}</view>
							<view class="dx">{{item['teMa']['bigSmall']}}</view>
							<view class="hds">{{item['teMa']['compositeSingleDouble']}}</view>
							<view class="hdx">{{item['teMa']['compositeBigSmall']}}</view>
							<view class="wdx">{{item['teMa']['mantissaBigSmall']}}</view>
							<!-- <view class="size" >{{item['tm_bate']}}</view> -->
						</view>
					</view>
					<view style="width: 100%;height: 84rpx;"></view>
				</template>
			</view>
			<view class="lhc_popup" v-if="spanType == 3">
				<view class="nav" :key="'k'+index"  v-for="(item, index) in popupList">
					<view class="circ" :class="item.class"></view>
					<view>{{item.name}}</view>
				</view>
			</view>
		</view>
		<view v-if="mainList.length <=0" class="ndata">
			暫無數據！
		</view>
	</view>
</template>

<script>
	export default {
		name: 'lhc-instant-draw',
		props: ['code', 'date', 'current_number'],
		data() {
			return {
				mainList: [],
				max: 0,
				contentData: null,
				spanType: 1, //号码 特码 总和
				showType: -1, //显示彩种区域
				hasNext: true,
				page: 1,
				totalCount: 0,
				isActive:-1,
				extraType:1,
				popupList:[
					{'class':'ds','name':'单双'},
					{'class':'dx','name':'大小'},
					{'class':'hds','name':'合单双'},
					{'class':'hdx','name':'合大小'},
					{'class':'wdx','name':'尾大小'},
				],
				scrollType: true
			}
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
					if(that.scrollType){
						that.listAdd20();
					}
				}
			};
			uni.showLoading({ title: 'loading' });
			this.getAnalysisDetail();
		},
		onLoad() {
			
		},
		methods: {
			async listAdd20() {
				let that = this;
				if (that.hasNext && that.totalCount > 0) {
					if (that.totalCount < 20 * that.page + 1) {
						that.mainList.push.apply(that.mainList, that.contentData.slice(20 * (that.page - 1)));
						that.hasNext = false;
					} else {
						that.mainList.push.apply(that.mainList, that.contentData.slice(20 * (that.page - 1), 20 * that.page));
						that.hasNext = true;
					}
					that.page += 1;
				} else {
					that.hasNext = false;
				}
				if(that.mainList.length>=20){
					that.scrollType = true;
				}
				// console.log(that.mainList)
			},
			getAnalysisDetail() {
				let that = this;
				that.contentData = {};
				that.mainList = [];
				that.hasNext = true;
				that.page = 1;
				that.totalCount = 0;
				that.$api.getAnalysisDetail({ code: that.code, type: 'jskj', date: that.date, extra: 'type=1'}).then(res => {
						uni.hideLoading();
					if (res.code == 0) {
						that.contentData = res.data.list;
						that.totalCount = res.data.list.length;
						that.listAdd20();
					}else{
						uni.showToast({
		　　　　　　　　　　　　title: "网络异常，请稍后再试",
		　　　　　　　　　　　　icon: 'none'
		　　　　　　　　　　})
					 }
				});
			},
			toggleClass(index,e){//选中样式
			    if(this.isActive != index){
					this.isActive = index;
				}else{
					this.isActive = -1;
				}
			},
			toggleType(index){//切换号码、总和、特码
			    // uni.showLoading({ title: 'loading' });
				this.isActive= -1;
				this.spanType = index;
				this.extraType = index;
				this.scrollType = false;
				// this.getAnalysisDetail();
			},
		},
	
	}
</script>

<style lang="scss">
.container {
	min-height: calc(100vh - 256rpx);
    font-family: Source Han Sans CN !important;
	background-color: #fff;
	.container-title {
		height: 80rpx;
		padding: 0 35rpx;
		display: -webkit-box;
		display: box;
		border-bottom: 1px solid #efeff4;
		.title-left {
			box-flex: 2;
			display: flex;
			justify-content: center; 
			align-items: center;     
			.item {
				display: flex;
				justify-content: center; 
				align-items: center;  
				height: 100%;
				line-height: 48rpx;
				color: #999999;
				font-size: 24rpx;
			}
			.item:first-child {
				float: left;
			}
			.item:last-child {
				float: right;
			}
		}
		.title-right {
			height:100%;
			width: 100%;
			padding-left: 40rpx;
			box-flex: 5;
			-webkit-box-flex: 5;
			display: -webkit-box;
			display: box;
			display: flex;
			justify-content: center; 
			align-items: center;     
			box-sizing: border-box;
			.item {
				font-size: 24rpx;
				color: #333333;
				display: block;
				// width:102rpx;
				height:100%;
				display: flex;
				justify-content: center; 
				box-sizing: border-box;
				line-height: 80rpx;
				overflow: hidden;
				margin-right: 65rpx;
				border-bottom: 4rpx solid #FFFFFF;
			}
			.item:last-child {
				margin-right: 0;
			}
			.checked {
				border-bottom: 4rpx solid #5232CB;
				color: #5232CB;
			}
		}
	}
	.content {
		background: #fff;
		.detail-line {
			width: 100%;
			display: inline-block;
			border-bottom: 1px solid #efeff4;
			height: 130rpx;
			display: flex;
			align-items: center;     
			padding: 0 30rpx;
			.left-part{
				min-width: 150rpx;max-width: 180rpx;height: auto;display:inline-block;
				text{
					min-width: 150rpx;
					font-size:24rpx;
					float: left;
					margin-right: 0;
					display: flex;
					justify-content: center; 
					align-items: center;     
				}
				.left-time{
					color: #333;
				}
				.left-no{
					color: #999;
				}
			}
			.right-part{
				height: 100%;
				width: 570rpx;
				display:block;
				padding-left: 12rpx;
				.box {
					width: 540rpx;
					height: 50rpx;
					overflow: hidden;
					.box-item {
						display: inline-block;
						max-width: 96rpx;
						min-width: 10rpx;
						height: 54rpx;
						margin-right: 20rpx;
						color: #555555;
					}
					
				}
			}
			.lhc{
				width: 50rpx;
				height: 50rpx;
				float: left;
				margin-right: 15rpx;
				display: inline-block;
				border-radius: 50%;
				font-family: Microsoft YaHei;
				font-weight: bold;
				font-size: 22rpx;	
				display: flex;
				justify-content: center; 
				align-items: center;     
				color: #000000;   
			}
			.iconjia{
				color: #AAAAAA;
				font-size: 24px;
				width: 36rpx;
				height: 50rpx;
				float: left;
				margin-right: 12rpx;
				margin-top: 2rpx;
				display: inline-block;
				border-radius: 50%;
				display: flex;
				justify-content: center; 
				align-items: center;   
			}
			.plus{
				width: 36rpx;
				height: 50rpx;
				display: inline-block;
				float: left;
				margin-right: 12rpx;
				display: flex;
				justify-content: center; 
				align-items: center; 
				margin-top: 0;
			}
			.lhcGreen{
				background: url(../../static/img/ball_green.png) no-repeat;
				background-size: 100% 100%;
			}
			.lhcBlue{
				background: url(../../static/img/ball_blue.png) no-repeat;
				background-size: 100% 100%;
			}
			.lhcRed{
				background: url(../../static/img/ball_red.png) no-repeat;
				background-size: 100% 100%;
			}
			.lhcOther{
				width: 50rpx;
				height: 50rpx;
				color: #666;
				float: left;
				margin-right: 15rpx;
				display: inline-block;	
				display: flex;
				justify-content: center; 
				align-items: center; 
			}
			.jslhcGreen{
				color: #fff;
				background-color: #008231;
			}
			.jslhcBlue{
				color: #fff;
				background-color: #005694;
			}
			.jslhcRed{
				color: #fff;
				background-color: #AE1917;
			}
			.jslhcSum{
				color: #fff;
				background-color: #be9a74;
			}
			.right-pt{
				height: 100%;
				width: 570rpx;
				display:block;
				padding-left: 12rpx;
				display: flex;
				justify-content: center; 
				align-items: center;     
				view{
					width: 25%;
					height:44rpx;
					// margin-right: 52rpx;
					text-align: center;
					line-height: 44rpx;
					display: flex;
					justify-content: center; 
					align-items: center;
				}
				text{
					display: inline-block;
					margin-right: 0;
				}
				view:last-child {
					margin-right: 0;
				}
				.sum{
					color: #666666;
					font-size:24rpx;
				}
				.size,.single{
					border-radius:6rpx;
					font-size:24rpx;
					color: #FFFFFF;
					width:44rpx;
					height:44rpx;
				}
				.size{
					background: #8D9DB4;
				}
				.single{
					background: #3A9999;
				}
				.cl{
					border-radius:6rpx;
					font-size:24rpx;
					color: #FFFFFF;
					min-width:23rpx;
					height:44rpx;
					padding: 0 10rpx;
				}
			}
			.right-special{
				height: 100%;
				width: 570rpx;
				display:block;
				padding-left: 12rpx;
				display: flex;
				justify-content: center; 
				align-items: center;     
				.lhc{
					margin-right: 40rpx;
					width: 52rpx;
					height: 52rpx;
					font-size: 20rpx;
					font-family: Microsoft YaHei;
                    color: #000000;
					font-weight: bold;
					
				}
				.ds,.dx,.hds,.hdx,.wdx{
					width:44rpx;
					height:44rpx;
					display: flex;
					justify-content: center; 
					align-items: center;     
					border-radius:6rpx;
				}
				.ds{
					color: #3A9999;
					margin-right: 40rpx;
					border: 1px solid #3A9999;
				}
				.dx{
					color: #3B87B8;
					margin-right: 40rpx;
					border: 1px solid #3B87B8;
				}
				.hds{
					color: #599F40;
					margin-right: 40rpx;
					border: 1px solid #599F40;
				}
				.hdx{
					color: #E08727;
					margin-right: 40rpx;
					border: 1px solid #E08727;
				}
				.wdx{
					color: #BE9A74;
					margin-right: 0;
					border: 1px solid #BE9A74;
				}
			}
			.line-left {
				width: 330rpx;
			}
			.line-right {
				width: 100%;
			}
			uni-text {
				font-size: 12px;
				float: left;
				color: #666666;
				margin-right: 16rpx;
			}
		}
		.detail-line.on {
			background: #546168;
			.left-time,.left-no{
				color: #FFFFFF!important;
			}
			.lhcOther{
				color: #FFFFFF!important;
			}
			.sum{
				color: #FFFFFF!important;
			}
			.ds,.dx,.hds,.hdx,.wdx{
				color: #FFFFFF;
			}
			.ds{
				background: #3A9999;
			}
			.dx{
				background: #3B87B8;
			}
			.hds{
				background: #599F40;
			}
			.hdx{
				background: #E08727;
			}
			.wdx{
				background: #BE9A74;
			}
		}
	}
	.ndata{
		position: absolute;
		top: 45%;
		color: #333;
		font-size: 24rpx;
		width: 100%	;
		text-align: center;
	}
}
.lhc_popup{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height:84rpx;
	background:rgba(0,0,0,0.7);
	display: flex;
	justify-content: center; 
	align-items: center;     
	.nav{
		min-width: 80rpx;
		color:rgba(255,255,255,0.7);
		display: flex;
		justify-content: center; 
		align-items: center;  
		margin-right: 35rpx;
	}
	.nav:last-child{
		margin-right:0;
	}
	.circ{
		margin-right: 10rpx;
		width:22rpx;
		height:22rpx;
		border-radius:50%;
	}
	.ds{
		background: #3A9999;
	}
	.dx{
		background: #3B87B8;
	}
	.hds{
		background: #599F40;
	}
	.hdx{
		background: #E08727;
	}
	.wdx{
		background: #BE9A74;
	}
}
.clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
    content: "";
    display: block;
    height: 0;
    clear:both;
    visibility: hidden;
}
.clearfix{
    *zoom: 1;/*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
}
</style>

