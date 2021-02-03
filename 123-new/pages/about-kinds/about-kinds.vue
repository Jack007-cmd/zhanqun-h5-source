<template name="about-kinds">
	<view class="container" v-if="sortArr.length > 0">
		<view class="content-nav">
			<view class="item"><text class="name" :class="{on:active==1}" @click="changeTab(1)">所有彩种 ({{sortArrLength}})</text></view>
			<view class="item"><text class="name" :class="{on:active==2}" @click="changeTab(2)">我的收藏</text></view>
		</view>
		<!-- 所有彩种 -->
		<view class="content-list" v-if="active == 1"  v-for="(item, index) in sortArr" :key="'a' + index">
			<view class="content-title">
				{{ item.name }}
				<text @click="toBar(index)" class="uni-panel-icon uni-icon">&#xe583;</text>
			</view>
			<view class="content" :id="'item-pt' + index">
				<view
					class="content-item"
					v-for="(it, i) in item.list"
					:id="it.code+'-'+index"
					:code="it.code"
					@click="toDestination(it)"
					:key="'b' + i"
				>
					{{ it.name }}
				</view>
			</view>
		</view>
		<!-- 我的收藏 -->
		<view class="content-collect" v-if="active == 2" :style="collect?'z-index: 999;':'z-index: 900;'">
			<!-- 收藏列 -->
			<view class="t-list" >
				<view class="content">
					<view
						class="content-item"
						v-for="(it, i) in regroupArr"
						v-if="collectionArr.indexOf(it.code) > -1"
						@click="toDestination(it)"
						:key="'d' + i"
					>
						{{ it.name}}
					</view>
				</view>
			</view>
			<!-- 弹窗 -->
			<view class="u-popup" v-if="collect">
				<view class="p-hide" @click="cancel"></view>
				<view class="p-nav">
					<view class="p-list" v-for="(item, index) in sortArr" :key="'e' + index">
						<view class="p-title">
							{{ item.name }}
						</view>
						<view class="pt-cont" :id="'item-rt_' + index">
							<view
								class="pt-item"
								v-for="(it, i) in item.list"
								@click="setCollect(it.code)"
								:class="{ checked: collectionArr.indexOf(it.code) > -1 }"
								:key="'f' + i"
							>
							 {{ it.name}}
							 <!-- <text class='font_icon iconactive1 ico dt-icon' v-if="collectionArr.indexOf(it.code) > -1"></text> -->
							</view>
						</view>
						<view class="btn">
							<view class="btn-l" @click="cancel">取消</view>
							<view class="btn-l rg" @click="confirm">确定</view>
						</view>
					</view>
				</view>
			</view> 
			<!-- 弹出收藏层 -->
			<view class="set" @click="showCollect">
				<text class='font_icon icon-set ico dt-icon'></text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'about-kinds',
	data() {
		return {
			showDelete:false,
			deleteID:null,
			sortArr: [],
			active: 1,
			sortArrLength:'',
			collectionArr: [],
			collect: false,
			regroupArr: [],
			popupArr: []
		};
	},
	onLoad() {
		this.sortArr = uni.getStorageSync('sort');
		this.sortArrLength = this.getSortArrLength(this.sortArr);
		this.collectionArr = uni.getStorageSync('my-collection');
		this.regroup();
	},
	onReady() {
		
	},
	methods: {
		toBar(index) {
			uni.navigateTo({
				url: '/pages/about-bar/about-bar?index=' + index
			});
		},
		toDestination(item) {
			const itemIndex = this.$api.getAboutItemIndex(item.code);
			if(itemIndex>0){
				if(itemIndex!=14){
					uni.navigateTo({
						url: '/pages/public/' + item.des + '/' + item.des + '?name=' + item.name + '&code=' + item.code + '&video_url=' + item.url + '&sortKey=' + item.sortKey
					});				
				}else{
					var url = item.des;
					if(url.indexOf("http") == -1){
						url = "//" + url;
					}
					if(item.code=='xglhc'){
						url = url + '/h';
					}else if(item.code == 'amlhc'){
						url = url + '/g';
					}
					window.open(url);
				}
			}
		},
		changeTab(index){
			this.active = index;
			if(index==1){
				$("#data-source").show();
			}else{
				$("#data-source").hide();
			}
		},
		getSortArrLength(arr){
			let num = 0;
			for(let i=0;i<arr.length;i++){
				num+=arr[i]['list'].length;
			}
			return num;
		},
		setCollect(code){
			let that = this;
			if(that.collectionArr){
				if(that.collectionArr.indexOf(code)==-1){
					that.collectionArr.push(code);
				}else{
					that.collectionArr.splice(that.collectionArr.indexOf(code),1);
				}
			}else{
				that.collectionArr = [];
				that.collectionArr.push(code);
			}
		},
		showCollect(){
			this.collect=true;
		},
		cancel(){
			this.collect=false;
			this.collectionArr = uni.getStorageSync('my-collection');
		},
		confirm(){
			uni.setStorageSync('my-collection',this.collectionArr);
			this.collect = false;
			this.regroup();
		},
		regroup(){
			let that = this;
			that.collectionArr = uni.getStorageSync('my-collection');
			that.regroupArr=[];
			for(let i=0;i<that.collectionArr.length;i++){
				that.setRroupArr(that.collectionArr[i])
			}
		},
		setRroupArr(code){
			let that = this;
			let arr=[];
			for(let i=0;i<that.sortArr.length;i++){
				for(let k=0;k<that.sortArr[i]['list'].length;k++){
					if(code == that.sortArr[i]['list'][k]['code'] && arr.indexOf(that.sortArr[i]['list'][k]['code'])==-1){
						arr.push(that.sortArr[i]['list'][k]['code']);
						that.regroupArr.push(that.sortArr[i]['list'][k]);
						return;
					}
				}
			}
		}
	}
};
</script>

<style lang="scss">
.container {
	.content-nav{
		width: 100%;
		height: 80rpx;
		background: #FFFFFF;
		display: flex;
		.item{
			width: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			.name{
				display: inline-block;
				line-height: 80rpx;
				height: 100%;
				font-size: 28rpx;
				color: #003333;
				box-sizing: border-box;
			}
		}
		.on{
			border-bottom: 4rpx solid #E12021;
		}
	}
	.content-list {
		margin: 0 15px;
		padding-bottom: 3px;
		.content-title {
			color: #999999;
			font-size: 16px;
			height: 24px;
			line-height: 30px;
			margin: 14rpx 0 14rpx 8rpx;
		}
		.content {
			display: flex;
			flex-wrap: wrap;
			.content-item {
				height: 40px;
				line-height: 40px;
				border: 1px solid #dfdfe5;
				background: #fff;
				text-align: center;
				border-radius: 5px;
				width: 208rpx;
				margin: 4px;
				font-size: 26rpx;
			}
		}
	}
	.content-collect{
		background: #eee !important;
		margin-top: 20rpx;
		left: 0;
		right: 0;
		width: 100%;
		padding-bottom: 3px;
		min-height: calc(100vh - 168rpx);
		.t-list{
			margin: 0 15px;
			padding-bottom: 3px;
			.content {
				display: flex;
				flex-wrap: wrap;
				.content-item {
					height: 40px;
					line-height: 40px;
					border: 1px solid #dfdfe5;
					background: #fff;
					text-align: center;
					border-radius: 5px;
					width: 208rpx;
					margin: 4px;
					font-size: 26rpx;
				}
			}
		}
		.u-popup{
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			background: rgba(0,0,0,0.5);
			width: 100%;
			height: 100%;
			.p-hide{
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: calc(100vh - 932rpx);
			}
			.p-nav{
				position: absolute;
				left: 0;
				bottom: 0;
				overflow-y: scroll;
				width: 100%;
				height: 932rpx;
				background: #FFFFFF;
				padding: 0 15px;
				padding-bottom: 105rpx;
				.p-list {
					padding-bottom: 3px;
					.p-title {
						color: #999999;
						font-size: 16px;
						height: 24px;
						line-height: 30px;
						margin: 14rpx 0 14rpx 8rpx;
					}
					.pt-cont {
						display: flex;
						flex-wrap: wrap;
						.pt-item {
							position: relative;
							height: 40px;
							line-height: 40px;
							border: 1px solid #dfdfe5;
							background: #fff;
							text-align: center;
							border-radius: 5px;
							width: 208rpx;
							margin: 4px;
							font-size: 26rpx;
							overflow: hidden;
							.iconactive1{
								position: absolute;
								right: 0;
								bottom: 0;
								color: #E12021;
							}
							.iconactive1:before{
								display: inline-block;
								position: absolute;
								bottom: 0;
								right: 0;
								width: 46rpx;
								height: 58rpx;
							}
						}
						.checked{
							border: 1px solid #E12021;
							background: url(../../static/active.png) no-repeat;
							background-size: 40rpx 40rpx;
							background-position: 100% 100%;
						}
					}
				}
				.btn{
					position: fixed;
					left: 0;
					bottom: 0;
					width: 100%;
					height: 96rpx;
					display: flex;
					flex-wrap: wrap;
					.btn-l{
						width: 50%;
						height: 100%;
						display: flex;
						justify-content:center;
						align-items:center;
						font-size: 31rpx;
						color: #666666;
                        background: #F1F1F1;
					}
					.rg{
                        background: #E12021;
						color: rgba(255,255,255,0.9);
					}
				}
			}
		}
		.set{
			position: fixed;
			left: 50%;
			margin-left: -55.5rpx;
			bottom: 135rpx;
			width: 111rpx;
			height: 111rpx;
			// background: #3A9999;
			// box-shadow: 4rpx 6rpx 51rpx 0rpx rgba(174, 255, 255, 0.9);
			background-color: #e12021;
			box-shadow: 5px 8.66px 73px 0px rgba(255, 154, 155, 0.9);
			border-radius: 50%;
			overflow: hidden;
			.icon-set{
				display: inline-block;
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 44rpx;
			}
		}
	}
}
.uni-panel-icon {
	float: right;
	line-height: 30px;
	color: #c2c2c2;
	margin-right: -10rpx;
}
.close{
	position: absolute;
	top: -24rpx;
	right: -24rpx;
	z-index: 2;
}
@media screen and (max-width: 320px) {
	.container .content-list{
		margin: 0 10px;
	}
	.container .content-list .content .content-item{
		width: 200rpx!important;
	}
}

</style>
