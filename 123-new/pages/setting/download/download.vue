<template>
	<view>
		<div class="main">
			<div class="sub_nav">
				<div class="web_nav_button">
					<a id="toHome" class="item" style="display: inline-block;"><img style="width: 25px;height:25px;vertical-align: sub;" src="static/download/g-home.png" /></a>
					<a id="ios" class="item active" @click="getDetail('ios','down_ios')">
						<span class="icon-apple"></span>
						苹果网页版
					</a>
					<a id="android" class="item" @click="getDetail('android','down_android')">
						<span class="icon-android"></span>
						安卓系统
					</a>
				</div>
			</div>
		</div>

		<div class="main ">
			<div id="loc_download" class="web_switch loc_page"><div class="loc_article item active" style="text-align: center;"></div></div>
		</div>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	mounted() {
		$('#toHome').attr('href', document.location.protocol + '//' + document.domain);
		this.getDetail('', 'down_ios');
	},
	methods: {
		getDetail(id, tem) {
			if (id) {
				$("#"+id)
					.addClass('active')
					.siblings()
					.removeClass('active');
			}
			$.ajax({				
				// url: "http://583.zhanqun.com/v1/h5/caihui/pageDetail",
				url: document.location.protocol + "//" + document.domain + "/v1/h5/caihui/pageDetail",
				method: 'get',
				dataType: 'json',
				data: { identify: tem },
				// identify单页标识（ios下载：down_ios，安卓下载：down_android）
				success: function(rs) {
					document.title = rs['web_name'];
					let $shortcut = document.querySelector('link[rel="shortcut icon"]');
					if ($shortcut !== null) {
						$shortcut.setAttribute('href', rs['web_icon']);
					} else {
						$shortcut = document.createElement('link');
						$shortcut.setAttribute('rel', 'shortcut icon');
						$shortcut.setAttribute('href', rs['web_icon']);
						document.head.appendChild($shortcut);
					}
					$('#loc_download .item').html(rs.content);
				},
				err: function(error) {
					console.log(error);
				}
			});
		}
	}
};
</script>

<style lang="scss">
@import '../../../common/download.css';
a {
	cursor: pointer;
}
/deep/ img{
	max-width: 640rpx;
}
</style>
