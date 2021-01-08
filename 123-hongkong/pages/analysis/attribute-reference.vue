<template>
	<view class="container">
		<view class="anasysis">
			<view class="anasysis-line">
				<view class="anasysis-list" @touchstart.stop  @touchend.stop>
					<text class="anasysis-item" @click="currentSort = sort.id" :class="{ current: currentSort == sort.id }" v-for="sort in sortList" :key="'k'+sort.id">
						{{ sort.name }}
					</text>
				</view>
			</view>
			<view class="font_family icontriangle" @click="showAll=true"></view>
		</view>
		<view class="u-popup" v-if="showAll">
			<view class="u-transition-out" @click="showAll=!showAll"></view>
			<view class="u-transition">
				<view class="u-popup__wrapper-box">
					<view class="u-main">
						<view class="u-title">
							<view class="option-md">選擇分析類型</view>
							<view class="option-md" @click="showAll=!showAll">取消</view>
						</view>
						<view class="u-content">
							<view class="content-item">
								<view class="option" v-for="sort in sortList" :key="'x'+sort.id" :class="{ checked: currentSort == sort.id }" @click="currentSort = sort.id;showAll=false;">{{ sort.name }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="list" v-if="currentSort == 1">
				<view class="title">波色對照表</view>
				<view class="bose" v-for="(item,index) in bose" :key="'y'+index">
					<view class="bose-lf" :class="item.id==1?'red':(item.id==2?'blue':'green')">{{item.name}}</view>
					<view class="bose-rg">
						<view class="bose-item" :class="item.id==1?'b_red':(item.id==2?'b_blue':'b_green')" v-for="(code,index1) in item['list']" :key="'m'+index1">{{code,}}</view>
					</view>
				</view>
			</view>
			<view class="list" v-if="currentSort == 2">
				<view class="title">生肖對照表</view>
				<view class="bose" style="height: 100rpx;" v-for="(item,index) in zodiac" :key="'y'+index">
					<view class="bose-lf">{{item.name}}</view>
					<view class="bose-rg">
						<view class="bose-item" :class="bose[0]['list'].indexOf(code)>-1?'b_red':(bose[1]['list'].indexOf(code)>-1?'b_blue':'b_green')" v-for="(code,index1) in item['list']" :key="'m'+index1">{{code,}}</view>
					</view>
				</view>
			</view>
			<view class="list" v-if="currentSort == 3">
				<view class="title">五行對照表</view>
				<view class="bose" v-for="(item,index) in fiveElements" :key="'y'+index">
					<view class="bose-lf">{{item.name}}</view>
					<view class="bose-rg">
						<view class="bose-item" :class="bose[0]['list'].indexOf(code)>-1?'b_red':(bose[1]['list'].indexOf(code)>-1?'b_blue':'b_green')" v-for="(code,index1) in item['list']" :key="'m'+index1">{{code,}}</view>
					</view>
				</view>
			</view>
			<view class="list" v-if="currentSort == 4">
				<view class="title">家禽野獸對照表</view>
				<view class="bose" style="height: 115rpx;" v-for="(item,index) in poultryBeast" :key="'y'+index">
					<view class="bose-lf">{{item.name}}</view>
					<view class="bose-rg">
						<view class="bose-item" :class="tricolorZodiac[0]['list'].indexOf(code)>-1?'z_red':(tricolorZodiac[1]['list'].indexOf(code)>-1?'z_blue':'z_green')" v-for="(code,index1) in item['list']" :key="'m'+index1">{{code,}}</view>
					</view>
				</view>
			</view>
			<view class="list" v-if="currentSort == 5">
				<view class="title">男女生肖對照表</view>
				<view class="bose" style="height: 115rpx;" v-for="(item,index) in menWomen" :key="'y'+index">
					<view class="bose-lf">{{item.name}}</view>
					<view class="bose-rg">
						<view class="bose-item" :class="tricolorZodiac[0]['list'].indexOf(code)>-1?'z_red':(tricolorZodiac[1]['list'].indexOf(code)>-1?'z_blue':'z_green')" v-for="(code,index1) in item['list']" :key="'m'+index1">{{code,}}</view>
					</view>
				</view>
			</view>
			<view class="list" v-if="currentSort == 6">
				<view class="title">天地生肖對照表</view>
				<view class="bose" style="height: 115rpx;" v-for="(item,index) in worldZodiac" :key="'y'+index">
					<view class="bose-lf">{{item.name}}</view>
					<view class="bose-rg">
						<view class="bose-item" :class="tricolorZodiac[0]['list'].indexOf(code)>-1?'z_red':(tricolorZodiac[1]['list'].indexOf(code)>-1?'z_blue':'z_green')" v-for="(code,index1) in item['list']" :key="'m'+index1">{{code,}}</view>
					</view>
				</view>
			</view>
			<view class="list" v-if="currentSort == 7">
				<view class="title">四季生肖對照表</view>
				<view class="bose" style="height: 115rpx;" v-for="(item,index) in fourSeasonsZodiac" :key="'y'+index">
					<view class="bose-lf">{{item.name}}</view>
					<view class="bose-rg">
						<view class="bose-item" :class="tricolorZodiac[0]['list'].indexOf(code)>-1?'z_red':(tricolorZodiac[1]['list'].indexOf(code)>-1?'z_blue':'z_green')" v-for="(code,index1) in item['list']" :key="'m'+index1">{{code,}}</view>
					</view>
				</view>
			</view>
			<view class="list" v-if="currentSort == 8">
				<view class="title">琴棋書畫生肖對照表</view>
				<view class="bose" style="height: 115rpx;" v-for="(item,index) in  calligraphyZodiac" :key="'y'+index">
					<view class="bose-lf">{{item.name}}</view>
					<view class="bose-rg">
						<view class="bose-item" :class="tricolorZodiac[0]['list'].indexOf(code)>-1?'z_red':(tricolorZodiac[1]['list'].indexOf(code)>-1?'z_blue':'z_green')" v-for="(code,index1) in item['list']" :key="'m'+index1">{{code,}}</view>
					</view>
				</view>
			</view>
			<view class="list" v-if="currentSort == 9">
				<view class="title">三色生肖對照表</view>
				<view class="bose" style="height: 115rpx;" v-for="(item,index) in tricolorZodiac" :key="'y'+index">
					<view class="bose-lf">{{item.name}}</view>
					<view class="bose-rg">
						<view class="bose-item" :class="item.id==1?'z_red':(item.id==2?'z_blue':'z_green')" v-for="(code,index1) in item['list']" :key="'m'+index1">{{code,}}</view>
					</view>
				</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showAll: false,
				currentSort: 1,
				sortList:[{id: 1, name: "波色"},{id: 2, name: "生肖"},{id: 3, name: "五行"},{id: 4, name: "家禽野獸"},{id: 5, name: "男女生肖"},{id: 6, name: "天地生肖"},{id: 7, name: "四季生肖"},{id: 8, name: "琴棋書畫"},{id: 9, name: "三色生肖"}],
				//波色
				bose:[
					{id:1,name:'紅波',list:['01','02','07','08','12','13','18','19','23','24','29','30','34','35','40','45','46']},
					{id:2,name:'藍波',list:['03','04','09','10','14','15','20','25','26','31','36','37','41','42','47','48']},
					{id:3,name:'綠波',list:['05','06','11','16','17','21','22','27','28','32','33','38','39','43','44','49']}
				],
				//生肖
				zodiac:[
					{id:1,name:'鼠',list:['01','13','25','37','49']},
					{id:2,name:'牛',list:['12','24','36','48']},
					{id:3,name:'虎',list:['11','23','35','47']},
					{id:4,name:'兔',list:['10','22','34','46']},
					{id:5,name:'龍',list:['09','21','33','45']},
					{id:6,name:'蛇',list:['08','20','32','44']},
					{id:7,name:'馬',list:['07','19','31','43']},
					{id:8,name:'羊',list:['06','18','29','41']},
					{id:9,name:'猴',list:['05','17','29','41']},
					{id:10,name:'雞',list:['04','16','28','40']},
					{id:11,name:'狗',list:['03','15','27','39']},
					{id:12,name:'豬',list:['02','14','26','38']}
				],
				//五行
				fiveElements:[ 
					{id:1,name:'金',list:['05','06','19','20','27','28','35','36','49']},
					{id:2,name:'木',list:['01','02','09','10','17','18','31','32','39','40','47','48']},
					{id:3,name:'水',list:['07','08','15','16','23','24','37','38','45','46']},
					{id:4,name:'火',list:['03','04','11','12','25','26','33','34','41','42']},
					{id:5,name:'土',list:['13','14','21','22','29','30','43','44']}
				],
				//家禽野獸
				poultryBeast:[
					{id:1,name:'家禽',list:['牛','馬','羊','雞','狗','豬']},
					{id:2,name:'野獸',list:['鼠','虎','兔','龍','蛇','猴']}
				],
				//男女生肖
				menWomen:[
					{id:1,name:'男肖',list:['鼠','牛','虎','龍','馬','猴','狗']},
					{id:2,name:'地肖',list:['兔','蛇','羊','雞','豬']}
				],
				//天地生肖
				worldZodiac:[
					{id:1,name:'天肖',list:['牛','兔','龍','馬','猴','豬']},
					{id:2,name:'女肖',list:['鼠','虎','羊','蛇','雞','狗']}
				],
				//四季生肖
				fourSeasonsZodiac:[
					{id:1,name:'春肖',list:['虎','兔','龍']},
					{id:2,name:'夏肖',list:['蛇','馬','羊']},
					{id:1,name:'秋肖',list:['猴','雞','狗']},
					{id:1,name:'冬肖',list:['鼠','牛','豬']}
				],
				//琴棋書畫
				calligraphyZodiac:[
					{id:1,name:'琴肖',list:['兔','蛇','雞']},
					{id:2,name:'棋肖',list:['鼠','牛','狗']},
					{id:1,name:'書肖',list:['虎','龍','馬']},
					{id:1,name:'畫肖',list:['羊','猴','豬']}
				],
				//三色生肖
				tricolorZodiac:[
					{id:1,name:'紅肖',list:['鼠','兔','馬','雞']},
					{id:2,name:'藍肖',list:['虎','蛇','猴','豬']},
					{id:3,name:'綠肖',list:['牛','龍','羊','狗' ]}
				]
				
			};
		},
		created: function(e) {
			// uni.showLoading({ title: 'loading' });
			// this.getForCategory();
		},
		onLoad: function() {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.container{
	position: relative;
	min-height: calc(100vh - 176rpx);
	height: 100%;
	.anasysis {
		position: relative;
		overflow: hidden;
		background-color: #fff;
		height: 80rpx;
		.anasysis-line {
			font-size: 16px;
			position: relative;
			width: 87%;
			display: inline-block;
			overflow: scroll;
			.anasysis-list {
				height: auto;
				overflow-x: scroll;
				text-align: center;
				width: max-content;
				padding-left: 35rpx;
				.anasysis-item {
					display: inline-block;
					float: left;
					margin-right: 60rpx;
					text-align: center;
					font-size: 16px;
					padding-top: 0;
					line-height: 80rpx;
					color: #5C5D5D;
				}
				.current {
					color: #AE1917;
					border-bottom: 4rpx solid #AE1917;
				}
			}
		}
		.icontriangle{
			font-size: 36rpx!important;
			float: right;
			border: 0;
			outline: 0;
			position: relative;
			top: 6px;
			margin-right: 10px;
			color: #888;
		}
	}
	.u-title {
		line-height: 30px;
		font-size: 12px;
		text-align: center;
		display: inline-block;
		.option-md {
			padding: 15px;
			height: 20px;
			font-size: 14px;
			color: red;
			float: right;
		}
		.option-md:first-child {
			float: left;
		}
	}
	.u-content {
		min-height: 480rpx;
		padding-top: 10px;
		.content-item {
			display: flex;
			flex-wrap: wrap;
			padding: 0 15px;
			margin-bottom: 10px;
			.option {
				color:#666;
				text-align: center;
				float: left;
				width: 210rpx;
				height: 60rpx;
				font-size: 24rpx;
				line-height: 60rpx;
				margin-right: 2%;
				border: 1px solid #e4e3e8;
				margin-top: 20rpx;
				border-radius: 6rpx;
				display: inline-block;
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
			}
			.checked {
				border-color: #e12121;
				color: #e12121;
				position: relative;
			}
		}
	}
	.content{
		position: relative;
		padding: 20rpx;
		box-sizing: border-box;
		.list{
			position: relative;
			background: #FFFFFF;
			border-radius: 10rpx;
			overflow: hidden;
			.title{
				width: 100%;
				height: 75rpx;
				line-height: 75rpx;
				background: #F5F5F5;
				font-size: 24rpx;
				font-family: Source Han Sans CN;
				color: #5C5D5D;
				padding-left: 25rpx;
			}
			.bose{
				width: 100%;
				height: 180rpx;
				display: flex;
                border-bottom: 1px solid #E8EAF1;
				.bose-lf{
					width: 125rpx;
					height: 100%;
					display: flex;
					justify-content: center; 
					align-items: center; 
					font-size: 26rpx;
					font-family: Source Han Sans CN;
                    color: #333333;
				}
				.red{
					color: #AE1917;
				}
				.blue{
					color: #4482B4;
				}
				.green{
					color: #008231;
				}
				.bose-rg{
					height: 100%;
					width: calc(100% - 125rpx);
					display: flex;
					justify-content: flex-start; 
					align-items: center; 
					flex-wrap:wrap;
					box-sizing: border-box;
					padding: 30rpx 0;
					.bose-item{
						width: 52rpx;
						height: 52rpx;
						display: flex;
						justify-content: center; 
						align-items: center; 
						border-radius: 50%;
						font-size: 20rpx;
						font-family: Microsoft YaHei;
						font-weight: bold;
						color: #000000;
						margin-right: 10rpx;
					}
					.b_red{
						background: url(../../static/img/ball_red.png) no-repeat;
						background-size: 100% 100%;
					}
					.b_blue{
						background: url(../../static/img/ball_blue.png) no-repeat;
						background-size: 100% 100%;
					}
					.b_green{
						background: url(../../static/img/ball_green.png) no-repeat;
						background-size: 100% 100%;
					}
					.z_red{
						height: 50rpx!important;
						width: 50rpx!important;
						color: #FFFFFF!important;
						font-size: 24rpx!important;
						background: #AE1917;
					}
					.z_blue{
						height: 50rpx!important;
						width: 50rpx!important;
						color: #FFFFFF!important;
						font-size: 24rpx!important;
						background: #005694;
					}
					.z_green{
						height: 50rpx!important;
						width: 50rpx!important;
						color: #FFFFFF!important;
						font-size: 24rpx!important;
						background: #008231;
					}
				}
			}
			.bose:last-child{
				border-bottom: none;
			}
		}
	}
}
</style>
