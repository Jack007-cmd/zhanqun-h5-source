<template>
	<view class="container">
	   <view v-if="showType==1">
		   <view  v-if="sortList && sortList.length>0">
				   <view class="list" :class="active==index?'on':''" v-for="(item ,index) in sortList" :key="'k'+index" @click="setCurrent(index,item.identify)">
					<view class="time">{{(item.created_at).substring(5,10)}}</view>
					<view class="round"><text></text></view>
					<view class="content">
					  <text class="txt">{{item.title}}</text>
					</view>
				   </view>
				   <view class="list lbtn">
					<view class="load_btn" @click="loadMore">查看更多</view>
				   </view>
		   </view>
		   <view class="ndata" v-if="noData && sortList.length<=0">暫無數據!</view>
	   </view>
	   <view v-if="showType==2">
		   <view class="b-cont">
			   <view class="txt">{{detailList.title}}</view>
			   <view class="time"  v-if="detailList">时间：{{detailList.updated_at}}</view>
		   </view>
		   <view class="b-item" id="detail1"> 
			   <!-- 第002期:亞洲博彩論壇-高手精選六合彩特碼〓【㊣必中平特㊣】〓〓〓豬〓〓〓---- -->
		   </view>
	   </view>
	</view>
</template>

<script>
	export default {
		props: ['type'],
		data() {
			return {
				sortList:[],
				page: 1,
				perPage: 10,
				active:-1,
				noData: false,
				showType: 1,
				detailList:{}
			};
		},
		created: function(e) {
			uni.showLoading({ title: 'loading' });
			this.getForCategory(1);
		},
		onLoad: function() {
			
		},
		watch:{
			type(newData,oldData){
				this.showType = newData;
			}
		},
		methods: {
			getForCategory(type){
				let that = this;
				that.$api.getForCategory({ identify: 'yctj',page: that.page,per_page: that.perPage}).then(rs => {
					uni.hideLoading();
					if (rs) {
						if(rs.data.length>0){
							for(var k in rs.data){
								that.sortList.push(rs.data[k]);
							}
						}else{
							if(type==1){
								this.noData = true;
							}else if(type==2){
								uni.showToast({
				　　　　　　　　　　　　title: "已無更多數據！",
				　　　　　　　　　　　　icon: 'none'
				　　　　　　　　　})
							}
						}
					}else{
						uni.showToast({
		　　　　　　　　　　　　title: "網絡異常，請稍後再試！",
		　　　　　　　　　　　　icon: 'none'
		　　　　　　　　　})
					}
				});
			},
			getArticle(id){
				let that = this;
				that.$api.getArticle({ identify: id}).then(rs => {
					uni.hideLoading();
					if (rs) {
						that.detailList = rs;
						var dom = document.getElementById('detail1');
						dom.innerHTML = rs.content;
					}else{
						uni.showToast({
		　　　　　　　　　　　　title: "網絡異常，請稍後再試！",
		　　　　　　　　　　　　icon: 'none'
		　　　　　　　　　})
					}
				})
				
			},
			setCurrent(key,id){
				this.active = key;
				this.showType = 2;
				this.$emit('getValue', 2);
				uni.showLoading({ title: 'loading' });
				this.getArticle(id);
			},
			loadMore(){
				this.page = this.page + 1;
				this.getForCategory(2);
			}
		}
	}
</script>

<style lang="scss">
.container{
	min-height: calc(100vh - 176rpx);
	position: relative;
	padding-top: 15rpx;
	background: #FFFFFF;
	.list{
		width: 100%;
		height: 135rpx;
		background: #FFFFFF;
        border-bottom: 1px  solid #E8EAF1;
		display: flex;
		.time{
			width: 115rpx;
			height: 100%;
			font-size: 24rpx;
			font-family: Roboto;
			color: #959595;
			text-align: center;
			line-height: 88rpx;
		}
		.round{
			height: 100%;
			width: 10rpx;
			text{
				display: inline-block;
				margin-top: 39rpx;
				height: 10rpx;
				width: 10rpx;
				background: #999999;
				border-radius: 50%;
			}
		}
		.content{
			height: 100%;
			width: calc(100% - 125rpx);
			display: flex;
			justify-content: flex-start; 
			align-items: center; 
			padding-left: 28rpx;
			.txt{
				width: 555rpx;
				height: 88rpx;
				font-size: 28rpx;
				font-family: Noto Sans S Chinese;
				font-weight: bold;
				color: #333333;
				line-height: 45rpx;
				overflow: hidden;
			    display: -webkit-box;
			    text-overflow: ellipsis;
			    -webkit-line-clamp: 2;  /*要显示的行数*/
			    -webkit-box-orient: vertical;
			}
		}
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
	.on{
        background: #F5F5F5;
	}
	.lbtn{
		display: flex;
		justify-content: center; 
		align-items: center; 
		border-bottom: none;
		height: 100rpx;
	}
	.ndata{
		position: absolute;
		top: 43%;
		color: #333;
		font-size: 24rpx;
		width: 100%	;
		text-align: center;
	}
	.b-cont{
		width: 100%;
		// height: 205rpx;
		position: relative;
		padding: 30rpx 30rpx;
		box-sizing: border-box;
		overflow: hidden;
		border-bottom: 1px solid #E8EAF1;
		.txt{
			font-size: 32rpx;
			font-family: Noto Sans S Chinese;
			font-weight: bold;
			color: #333333;
			line-height: 46rpx;
			text-align: left;
			margin: 0 auto;
		}
		.time{
			margin-top: 5rpx;
			width: 100%;
			font-size: 24rpx;
			font-family: Noto Sans S Chinese;
			color: #999999;
		}
	}
	.b-item{
		position: relative;
		width: 100%;
		box-sizing: border-box;
		padding: 0 55rpx 0 30rpx;
		color: #333333;
		font-size: 26rpx;
		line-height: 30rpx;
	}
	.b-item>p{
		margin-top: 40rpx!important;
	}
}
/deep/ p{
	margin-top: 40rpx!important;
	font-size: 26rpx!important;
}
/deep/ p span{
	font-size: 26rpx!important;
}
/deep/ p span font{
	font-size: 26rpx!important;
}
/deep/ p span b{
	font-size: 26rpx!important;
}
/deep/ p b{
	font-size: 26rpx!important;
}
/deep/ div{
	position: relative;
	box-sizing: border-box;
	// line-height: 80rpx;
	margin-top: 40rpx!important;
	font-size: 26rpx!important;
}
/deep/ div>span{
	margin-top: 40rpx!important;
	font-size: 26rpx!important;
	display: inline-block;
}
/deep/ div>span:nth-child(1){
	margin-top: 0rpx!important;
}
/deep/ div>span:nth-child(2){
	margin-top: 0rpx!important;
}
 /deep/ p strong{
	 line-height: 45rpx;
 }
 /deep/ .b-item img{
 	 width: 100%;
 	 margin: 0 auto;
 }
 /deep/ .b-item video{
 	 width: 100%;
 	 margin: 0 auto;
 }
</style>
