<template>
	<view class="container">
		<view class="container-title">
			<view class="title-left"  style="width: 115rpx;">
				<text class="item" v-if="spanType == 3">期数</text>
				<text class="item" v-else>時間/期數</text>
			</view>
			<view class="title-right">
				<text class="item">開獎號碼</text>
			</view>
		</view>
		<view v-if="mainList && mainList.length > 0"> 
			<view class="content">
				<template>
					<view class="detail-line" :key="'a'+index" v-for="(item, index) in mainList"  @click="toggleClass(index)" :class="{on:isActive==index}">
						<view class="left-part">
							<text class="left-time">{{item['no']}}期</text>
							<text class="left-no">{{item['preDrawDate']}}</text>
						</view>
						<view class="right-part">
							<view class="box clearfix"  style="margin-top: 20rpx;">
								<template v-for="(ccode, cindex) in item['num']">
									<view :key="'x1'+6" v-if="cindex==6" class="font_family iconjia"></view>
									<view  :key="'x' + cindex" class="lhc" :class="{lhcRed:item.color[cindex]==1,lhcGreen:item.color[cindex]==2,lhcBlue:item.color[cindex]==3}">{{ Number(ccode)<10?'0'+ Number(ccode) : ccode }}</view>
								</template>
							</view>
							<view class="box clearfix">
								<template v-for="(code, tempIndex) in item['zodiacTypeName']">
									<view :key="'y1'+6" v-if="tempIndex==6" class="plus"></view>
									<view :key="'y' + tempIndex" class="lhcOther" >{{ code }}</view>
								</template>		
							</view>
						</view>
					</view>
					<view class="detail-line dbtn">
						<navigator url="/pages/draw-history/draw-history" class="load_nav"><view class="load_btn" @click="loadMore">查看更多</view></navigator>
					</view>
				</template>
			</view>
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
				scrollType: true,
				limit: 8
			}
		},
		watch: {
			date(newData, prevData) {
				uni.showLoading({
					title: 'loading'
				});
				this.getHistoryNew();
			},
			current_number(newData, prevData) {
				uni.showLoading({
					title: 'loading'
				});
				this.getHistoryNew();
			}
		},
		created: function(e) {
			let that = this;
			uni.showLoading({ title: 'loading' });
			that.getHistoryNew();
		},
		methods: {
			getHistoryNew() {
				let that = this;
				that.contentData = {};
				that.mainList = [];
				that.hasNext = true;
				that.page = 1;
				that.totalCount = 0;
				that.$api.getHistoryNew({ code: that.code, limit: that.limit}).then(rs => {
						uni.hideLoading();
					if (rs.code == 0) {
						that.mainList = rs.data.list;
					}else{
						uni.showToast({
		　　　　　　　　　　　　title: "网络异常，请稍后再试",
		　　　　　　　　　　　　icon: 'none'
		　　　　　　　　　　})
					 }
				});
			},
			loadMore(){
			},
			toggleClass(index,e){//选中样式
			    let that = this;
			    if(that.isActive != index){
					that.isActive = index;
				}else{
					that.isActive = -1;
				}
			}
		},
	
	}
</script>

<style lang="scss">
.container {
    font-family: Source Han Sans CN !important;
	margin-top: 10rpx;
	background-color: #fff;
	.container-title {
		padding: 15.5rpx 35rpx;
		display: -webkit-box;
		display: box;
		border-bottom: 1px solid #efeff4;
		height: 80rpx;
		background: #F5F5F5;
		.title-left {
			box-flex: 1;
			display: flex;
			justify-content: center; 
			align-items: center;     
			.item {
				height: 48rpx;
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
			width: 100%;
			padding-left: 40rpx;
			box-flex: 6;
			-webkit-box-flex: 6;
			display: -webkit-box;
			display: box;
			box-sizing: border-box;
			display: flex;
			justify-content: center; 
			align-items: center; 
			.item {
				font-size: 24rpx;
                color: #999999;
				display: block;
				width:102rpx;
				height:48rpx;
				border-radius:6rpx;
				margin-right: 10rpx;
				display: flex;
				justify-content: center; 
				align-items: center;     
			}
			.checked {
				color: #ffffff;
				background-color: #546168;
				border-radius: 6rpx;
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
			overflow: hidden;
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
				padding-left: 30rpx;
				.box {
					width: 540rpx;
					height: 50rpx;
					overflow: hidden;
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
				font-size: 48rpx;
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
				overflow: hidden;
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
			.jslhcSum{
				color: #fff;
				background-color: #be9a74;
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
			.load_nav{
				width: 168rpx;
				height: 56rpx;
				border-radius: 28rpx;
				.load_btn{
					width: 168rpx;
					height: 56rpx;
					background: linear-gradient(0deg, #EEEEEE, #FFFFFF);
					border: 1px solid #DDDDDD;
					border-radius: 28rpx;
					font-size: 22rpx;
					font-family: Hiragino Sans GB;
					color: #444444;
					display: flex;
					justify-content: center; 
					align-items: center; 
				}
			}
			
		}
		.dbtn{
			display: flex;
			justify-content: center; 
			align-items: center; 
			border-bottom: none;
			height: 100rpx;
		}
		.detail-line.on {
			background: #546168;
			.left-time,.left-no{
				color: #FFFFFF!important;
			}
			.lhcOther{
				color: #FFFFFF;
			}
		}
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

