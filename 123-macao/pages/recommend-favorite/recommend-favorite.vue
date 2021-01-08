
<template>
	<view class="recommend">
		<view>
			<uni-nav-bar :fixed="true" color="#ffffff" :status-bar="true" :title="title" background-color="#5232CB" currentRoute="recommend-favorite" @clickLeft="back">
				<view slot="left"><view class="font_family iconarrow" style="font-size: 48rpx;color: #FFFFFF;"></view></view>
			</uni-nav-bar>
		</view>
		<view class="rec-tp">
			<span class="item" v-for="(item ,index) in sortList" :key="'k'+index"  @click="setCurrent(index+1)" :class="{ on: currentSort == index+1 }" >{{ item }}</span>
		</view>
		<view>
			<recommend-prediction v-if="currentSort == 1" v-on:getValue="getValue" :type="type"></recommend-prediction>
			<expert-opinion v-if="currentSort == 2" v-on:getValue="getValue" :type="type"></expert-opinion>
			<attribute-reference v-if="currentSort == 3"></attribute-reference>
		</view>
	</view>
</template>

<script>
    import UniNavBar from '../../components/uni-nav-bar/uni-nav-bar.vue';
	import RecommendPrediction from '../analysis/recommend-prediction.vue';
	import ExpertOpinion from '../analysis/expert-opinion.vue';
	import AttributeReference from '../analysis/attribute-reference.vue';
	export default {
		components: {
			UniNavBar,
			RecommendPrediction,
			ExpertOpinion,
			AttributeReference
		},
		data() {
			return {
				title:'推薦心水',
				currentSort: 1,
				sortList:['推薦預測','專家心水','屬性參照'],
				type: 1
			};
		},
		methods:{
			back() {
				if(this.type == 1){
					history.back();
				}else if(this.type ==2){
					this.type = 1;
				}
			},
			setCurrent(key){
				this.type = 1;
				this.currentSort = key;
			},
			getValue(articleVal){
				this.type = articleVal;
			}
		}
	}
</script>
<style lang="scss">
.recommend{
	position: relative;
	width: 100%;
	font-family: Microsoft YaHei;
	color: #FFFFFF;
	.rec-tp{
		position: relative;
		width: 100%;
		height: 88rpx;
		background: #5232CB;
		box-sizing: border-box;
		overflow: hidden;
		display: flex;
		justify-content: space-between; 
		align-items: center; 
		padding:14rpx 80rpx 0 80rpx;
		.item{
			width: 210rpx;
	        height: 76rpx;
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			color: #FFFFFF;
			text-align: center;
			line-height: 82rpx;
	        opacity: 0.8;
		}
		.on{
	        opacity: 1;
			background: url(../../static/img/list_active.png) no-repeat;
			background-size: 100% 100%;
		}
	}
}
</style>