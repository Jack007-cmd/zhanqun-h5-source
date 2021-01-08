<template name="about-bar">
	<view class="tabs">
	    <scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
	        <view v-for="(tab,index) in sortArr" :key="tab.key" class="uni-tab-item" :id="tab.key" :data-current="index" @click="ontabtap">
	            <text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
	        </view>
	    </scroll-view>
		 <view class="line-h"></view>
		<swiper :current="tabIndex" class="swiper-box" style="flex: 1;" :duration="300" @change="ontabchange">
		    <swiper-item class="swiper-item" v-for="(tab,index1) in aboutList" :key="index1">
				<!-- #ifdef APP-NVUE -->
				<list class="scroll-v list" enableBackToTop="true" scroll-y >
					<view v-for="(aboutitem,index2) in tab.data" :key="aboutitem.code">
						<public-item :aboutItem="aboutitem"></public-item>
					</view>
					<view style="height: 45px;"></view>
				</list>
				<!-- #endif -->
				<!-- #ifndef APP-NVUE -->
				<scroll-view class="scroll-v list" enableBackToTop="true" scroll-y >
					<view v-for="(aboutitem,index2) in tab.data" :key="aboutitem.code">
						<public-item :aboutItem="aboutitem"></public-item>
					</view>
					<view style="height: 45px;"></view>
				</scroll-view>
				<!-- #endif -->
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import PublicItem from '../public/public-item/public-item.vue';
    // 缓存每页最多
    const MAX_CACHE_DATA = 100;
    // 缓存页签数量
    const MAX_CACHE_PAGE = 3;
	export default {
		components: {
			PublicItem
		},
		name:"about-bar",
		data() {
			return {
				sortArr:[],
				aboutList:[],
				tabIndex:0,
			    cacheTab: [],
				scrollInto:""
			};
		},
		onLoad(option){
			this.sortArr = uni.getStorageSync('sort');
			if (option.index) {
			  this.tabIndex = option.index;
			}
			setTimeout(()=>{
			  this.sortArr.forEach((tabBar) => {
			      this.aboutList.push({
			          data: [],
			          isLoading: false,
			          refreshText: "",
			          loadingText: '加载更多...'
			      });
			  });
			  this.getList(this.tabIndex);
			},350);
		},
		methods: {
			getList(index) {
			    let activeTab = this.aboutList[index];
			    activeTab.data = activeTab.data.concat(this.sortArr[index].list);
			},
			ontabtap(e) {
			    let index = e.target.dataset.current || e.currentTarget.dataset.current;
			    this.switchTab(index);
			},
			ontabchange(e) {
			    let index = e.target.current || e.detail.current;
			    this.switchTab(index);
			},
			switchTab(index) {
				if (this.aboutList[index].data.length === 0) {
				    this.getList(index);
				}
				
				if (this.tabIndex === index) {
				    return;
				}
				
				// 缓存 tabId
				if (this.aboutList[this.tabIndex].data.length > MAX_CACHE_DATA) {
				    let isExist = this.cacheTab.indexOf(this.tabIndex);
				    if (isExist < 0) {
				        this.cacheTab.push(this.tabIndex);
				        //console.log("cache index:: " + this.tabIndex);
				    }
				}
				
				this.tabIndex = index;
				this.scrollInto = 'tab'+this.sortArr[index].key.toString();
				
				// 释放 tabId
				if (this.cacheTab.length > MAX_CACHE_PAGE) {
				    let cacheIndex = this.cacheTab[0];
				    this.clearTabData(cacheIndex);
				    this.cacheTab.splice(0, 1);
				    //console.log("remove cache index:: " + cacheIndex);
				}
			},
			clearTabData(e) {
			    this.aboutList[e].data.length = 0;
			    this.aboutList[e].loadingText = "加载更多...";
			},
		},
	}
</script>

<style lang="scss">
    /* #ifndef APP-PLUS */
    page {
        width: 100%;
        min-height: 100%;
        display: flex;
    }

    /* #endif */

    .tabs {
        flex: 1;
        flex-direction: column;
        overflow: hidden;
        /* #ifdef MP-ALIPAY || MP-BAIDU */
        height: 100vh;
        /* #endif */
    }

    .scroll-h {
        width: 750rpx;
        height: 80rpx;
        flex-direction: row;
        /* #ifndef APP-PLUS */
        white-space: nowrap;
        /* #endif */
        /* flex-wrap: nowrap; */
        /* border-color: #cccccc;
		border-bottom-style: solid;
		border-bottom-width: 1px; */
    }

    .line-h {
        height: 1rpx;
        background-color: #cccccc;
    }
	
    .uni-tab-item {
        /* #ifndef APP-PLUS */
        display: inline-block;
        /* #endif */
		background-color: #ffffff;
        flex-wrap: nowrap;
        padding-left: 34rpx;
        padding-right: 34rpx;
    }

    .uni-tab-item-title {
        color: #555;
        font-size: 30rpx;
        height: 80rpx;
        line-height: 80rpx;
        flex-wrap: nowrap;
        /* #ifndef APP-PLUS */
        white-space: nowrap;
        /* #endif */
    }

    .uni-tab-item-title-active {
        color: #e12121;
    }

    .swiper-box {
        flex: 1;
		height: 100%;
    }

    .swiper-item {
        flex: 1;
        flex-direction: row;
    }

    .scroll-v {
        flex: 1;
        /* #ifndef MP-ALIPAY */
        flex-direction: column;
        /* #endif */
        width: 750rpx;
    }
</style>
