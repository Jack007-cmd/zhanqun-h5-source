<template>
	<view class="rules">
		<view>
			<uni-nav-bar :fixed="true" color="#ffffff" :status-bar="true" :title="title" background-color="#5232CB" currentRoute="rules-of-play" @clickLeft="back">
				<view slot="left"><view class="font_family iconarrow" style="font-size: 48rpx;color: #FFFFFF;"></view></view>
			</uni-nav-bar>
		</view>
		<view class="rules-head">
			<text class="item" v-for="(item ,index) in navList" :key="'k'+index" @click="setCurrent(index+1)" :class="{ on: currentSort == index+1 }">{{item}}</text>
		</view>
		<view>
			<guess-the-prize v-if="currentSort == 1"></guess-the-prize>
			<introduction v-if="currentSort == 2"></introduction>
			<distribution v-if="currentSort == 3"></distribution>
			<ballot v-if="currentSort == 4"></ballot>
		</view>
	</view>
</template>

<script>
	import UniNavBar from '../../components/uni-nav-bar/uni-nav-bar.vue';
	import guessThePrize from '../analysis/guess-the-prize.vue';
	import Introduction from '../analysis/introduction.vue';
	import Distribution from '../analysis/distribution.vue';
	import Ballot from '../analysis/ballot.vue';
	export default {
		components: {
			UniNavBar,
			guessThePrize,
			Introduction,
			Distribution,
			Ballot
		},
		data() {
			return {
				title:'玩法規則',
				currentSort: 1,
				navList:['猜獎資格','六合彩簡介','獎金分配','連續多期攪珠']
			};
		},
		methods:{
			back() {
				history.back();
			},
			setCurrent(key){
				this.currentSort = key;
			}
		}
	}
</script>

<style lang="scss">
.rules{
	position: relative;
	background: #FFFFFF;
	.rules-head{
		width: 100%;
		height: 80rpx;
        border-bottom: 1px solid #E8EAF1;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between; 
		align-items: center; 
		padding: 0 40rpx;
		.item{
			height: 80rpx;
			line-height: 80rpx;
			display: inline-block;
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			color: #5C5D5D;
			box-sizing: border-box;
		}
		.on{
			color: #5232CB!important;
			border-bottom: 4rpx solid #5232CB;
		}
	}
}
</style>
