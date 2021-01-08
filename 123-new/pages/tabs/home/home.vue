<template>
	<view  @touchstart="start" @touchend="end">
		<view>
			<uni-nav-bar :fixed="true" color="#ffffff" :status-bar="true" background-color="#e12121" left-icon="list" @clickLeft="toAll">
<!-- 			<uni-nav-bar :fixed="true" color="#ffffff" :status-bar="true" background-color="#e12121" left-icon="list" @clickLeft="toAll" right-icon="gear" @clickRight="setting"> -->
				<view style="margin: 0 auto;">
					<view>
						<img class="title-img" :src="logo" alt="" />
						<!-- src="http://upload.zhanqun.com/storage/images/202001/web_h5_logo_7EHwaDySJqkXKpopCCYEiOtb8nMdlWjN5jFREGq6.png" -->
					</view>
				</view>
				<view slot="right" @click="setting"><view class="uni-icon uni-icon-gear"></view></view>
			</uni-nav-bar>
		</view>

		<view class="uni-container">
			<view v-for="item in aboutList" :key="item.code"><public-item :aboutItem="item"></public-item></view>
		</view>		
	</view>
</template>

<script>
import PublicItem from '../../public/public-item/public-item.vue';
export default {
	components: {
		PublicItem
	},
	data() {
		return {
			startData:{clientX:'',clientY:''},
			logo: 'static/error.jpg',
			aboutList: []
		};
	},
	onLoad(e) {
		// uni.hideTabBar();
		this.$api.getCommon().then(res => {
			if (!res.code) {
				this.logo = res.logo;
				uni.setStorageSync('appName', "开奖网");
				uni.setStorageSync('kefu_qq', res['kefu_qq']);
				// document.querySelector('meta[name="application-name"]').setAttribute('content', res.name);
				// document.querySelector('meta[name="apple-mobile-web-app-title"]').setAttribute('content', res.name);
				document.title = "开奖网"; // 动态修改网站标题
				this.changeFavicon(res.icon); // 动态修改网站图标
			}
		});
		//获取热门彩种数据
		let rl = setInterval(() => {
			let hotArr = uni.getStorageSync('hotArr');
			if (hotArr.length > 0) {
				clearInterval(rl);
				this.aboutList = hotArr;
			}
		}, 200);
	},
	methods: {		
		start(e) {
			// this.startData.clientX = e.changedTouches[0].clientX;		
			this.startData.clientY = e.changedTouches[0].clientY;
		},
		end(e) {
			// const subX = e.changedTouches[0].clientX - this.startData.clientX;
			const subY = e.changedTouches[0].clientY - this.startData.clientY;
			if (subY > 50 || subY < -50) {
				if (subY > 50) {
					console.log('下滑');
					uni.showTabBar();
				} else if (subY < -50) {
					uni.hideTabBar();
					console.log('上滑');
				}
			} 
			// else {
			// 	if (subX > 100) {
			// 		console.log('右滑');
			// 	} else if (subX < -100) {
			// 		console.log('左滑');
			// 	} else {
			// 		console.log('无效');
			// 	}
			// }
		},
		toAll() {
			uni.navigateTo({
				url:'/pages/about-kinds/about-kinds'
			})
		},
		setting() {
			uni.navigateTo({
				url: '/pages/setting/site/site'
			});
		},
		changeFavicon(link) {
			let $favicon = document.querySelector('link[rel="icon"]');
			if ($favicon !== null) {
				$favicon.setAttribute('href', link);
			} else {
				$favicon = document.createElement('link');
				$favicon.setAttribute('rel', 'icon');
				$favicon.setAttribute('href', link);
				document.head.appendChild($favicon);
			}

			// shortcut icon
			let $shortcut = document.querySelector('link[rel="shortcut icon"]');
			if ($shortcut !== null) {
				$shortcut.setAttribute('href', link);
			} else {
				$shortcut = document.createElement('link');
				$shortcut.setAttribute('rel', 'shortcut icon');
				$shortcut.setAttribute('href', link);
				document.head.appendChild($shortcut);
			}

			let appleIcon = document.querySelector('link[rel="apple-touch-icon-precomposed"]');
			if (appleIcon !== null) {
				appleIcon.setAttribute('href', link);
			} else {
				appleIcon = document.createElement('link');
				appleIcon.setAttribute('rel', 'apple-touch-icon-precomposed');
				appleIcon.setAttribute('href', link);
				document.head.appendChild(appleIcon);
			}

			let touchIcon = document.querySelector('link[rel="apple-touch-icon"]');
			if (touchIcon !== null) {
				touchIcon.setAttribute('href', link);
			} else {
				touchIcon = document.createElement('link');
				touchIcon.setAttribute('rel', 'apple-touch-icon');
				touchIcon.setAttribute('href', link);
				document.head.appendChild(touchIcon);
			}
		}
	}
};
</script>

<style>
/* .uni-navbar__header-btns-left {
	width: 30px;
}
.uni-navbar__header-btns {
	width: 30px;
} */
.title-img {
	height: 44px;
	max-width: 150rpx;
	margin: 0 auto;
	display: block;
	z-index: 100;
}

</style>
