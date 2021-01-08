<template>
	<view class="page">
		<iframe 
			style="height: -webkit-fill-available;"
			webkitallowfullscreen=""
			mozallowfullscreen=""
			allowfullscreen=""
			width="100%"
			height="100%"
			frameborder="0"
			sandbox="allow-scripts allow-top-navigation allow-pointer-lock allow-same-origin allow-popups allow-forms"
			:src="bbs"
		></iframe>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// startData:{clientX:'',clientY:''},
				bbs:document.location.protocol +"//"+ document.domain+"/bbs/"
			}
		},
		onLoad() {
			// uni.hideTabBar();
		},
		methods: {
			// start(e) {
				// this.startData.clientX = e.changedTouches[0].clientX;		
				// this.startData.clientY = e.changedTouches[0].clientY;
			// },
			// end(e) {
				// const subX = e.changedTouches[0].clientX - this.startData.clientX;
				// const subY = e.changedTouches[0].clientY - this.startData.clientY;
				// if (subY > 50 || subY < -50) {
				// 	if (subY > 50) {
				// 		console.log('下滑');
				// 		uni.showTabBar();
				// 	} else if (subY < -50) {
				// 		uni.hideTabBar();
				// 		console.log('上滑');
				// 	}
				// } 
				// else {
				// 	if (subX > 100) {
				// 		console.log('右滑');
				// 	} else if (subX < -100) {
				// 		console.log('左滑');
				// 	} else {
				// 		console.log('无效');
				// 	}
				// }
			// },
		}
	}
</script>

<style>

</style>
