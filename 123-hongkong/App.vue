<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
			// this.getServerTime();//获取服务器时间差
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		},
		methods:{
			//获取服务器时间差
			// async getServerTime() {
			// 	await this.$api.getServerTime().then(res => {
			// 			try {
			// 			    uni.setStorageSync('timeDiff', res.code == '0' ? (new Date(res.data.replace(/-/g, '/')).getTime() - new Date().getTime()).toString() : '0');
			// 			} catch (e) {
			// 			    // error
			// 			}
			// 		})
			// 		.catch(res => {
			// 			// 失败进行的操作
			// 		});
			// },
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* #ifndef APP-PLUS-NVUE */
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';
	@import './common/common.css';
	@import './common/iconfont.css';
	/* #endif*/
</style>
