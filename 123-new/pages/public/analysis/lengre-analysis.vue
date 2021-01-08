<template name="lengre-analysis">
	<view class="count-container">
		<view class="count-list" v-for="(item,index) in mainData" :key="index">
			<view class="count-title" :class="{ head1: index == 0, head2: index == 1 }">{{index == 0 ? '冠军' : index == 1 ? '亚军' : index == 2 ? '第三名' : index == 3 ? '第四名' : index == 4 ? '第五名' : index == 5 ? '第六名' : index == 6 ? '第七名' : index == 7 ? '第八名' : index == 8 ? '第九名' : '第十名'}}</view>
			<view class="num_item">
				<view class="li_first">热号</view>
				<view class="hotnum" v-for="(temp,tempIndex) in item.hot" :key="tempIndex">{{temp.key}}
					<uni-badge class="badge" v-if="temp.value>3"  :text="temp.value" type="error" />
				</view>
			</view>
			<view class="num_item">
				<view class="li_first">温号</view>
				<view class="hotnum" v-for="(temp,tempIndex) in item.soft" :key="tempIndex">{{temp.key}}
				  <uni-badge class="badge" v-if="temp.value>=0"  :text="temp.value==0?'0':temp.value" type="error" />
				</view>
			</view>
			<view class="num_item">
				<view class="li_first">冷号</view>
				<view class="hotnum" v-for="(temp,tempIndex) in item.cool" :key="tempIndex">{{temp.key}}
	          	  <uni-badge class="badge" v-if="temp.value>=0"  :text="temp.value==0?'0':temp.value" type="error" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'lengre-analysis',
	props: ['code', 'date', 'current_number'],
	data() {
		return {
			mainData: []
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
		uni.showLoading({
			title: 'loading'
		});
		this.getAnalysisDetail();
	},
	methods: {
		getAnalysisDetail() {
			this.$api.getAnalysisDetail({ code: this.code, type: 'lrfx', date: this.date }).then(res => {
					uni.hideLoading();
				if (res.code == 0) {
					let tempData = res.data;
					tempData.forEach(v => {
						let pp = {};
						Object.keys(v).forEach(function(key) {
							let item = [];
							Object.keys(v[key]).forEach(function(m) {
								let temp = {};
								temp.key = m;
								temp.value = v[key][m];
								item.push(temp);
							});
							pp[key] = item;
						});
						this.mainData.push(pp);
					});
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
.count-container {
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
		.num_item{
			// height: 72rpx;
			// line-height: 72rpx;
			background-color: #fff;
			border-bottom: 1px solid #dbdbdb;
			display: flex;
			color: #666;
			.li_first{
				height: 72rpx;
				line-height: 72rpx;
				width: 16%;
				text-align: center;
				border-right: 1px solid #dbdbdb;
			}
			.hotnum{				
				    border: 0;
				    font-size: 14px;
				    width: 8.35%;
				    float: left;
				    height: 72rpx;
				    line-height: 72rpx;
				    text-align: center;
					.badge{
						height: 15px;
						width: 15px!important;
						line-height: 16px;
						padding: 1px;
						position: relative;
						top: -35px;
						right: -21px;
						   
					}
			}
		}

	}
}
	
</style>
