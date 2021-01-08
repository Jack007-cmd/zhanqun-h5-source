<template>
	<view class="details">
		<view>
			<uni-nav-bar :fixed="true" :title="title" color="#ffffff" :status-bar="true" background-color="#222222" :currentRoute="title" @clickLeft="back">
				<view slot="left"><view class="font_family icon-arrow_left" style="font-size: 48rpx;color: #FFFFFF;"></view></view>
				<view slot="right"><view class="font_family icon-list" style="font-size: 48rpx;color: #FFFFFF;"></view></view>
			</uni-nav-bar>
		</view>
		<view class="contain" v-if="aboutList">
			<view class="cn-tp">
				<view class="lotName">{{title}}</view>
				<view class="type" style="margin-top: 25rpx;">Don't WASTE YOUR TIME!</view>
				<view class="type" style="margin-top: 10rpx;">WIN TODAY!</view>
			</view>
			<view class="cn-md">
				<view class="md-nav">
					<view class="title">WINNING NUMBERS,</view>
					<view class="num">{{lotteryNum}}</view>
					<view class="date">{{lotteryDate}}</view>
					<view class="b-lucky8" v-if="aboutList.code=='newajxyb' || aboutList.code=='newjsklsf'">
						<template v-for="(code,index) in aboutList['current_code']">
						   <view class="box-item"  :key="'c'+index" :class="{big:code==19 || code==20}">{{code}}</view>
						</template>
					</view>
				<!-- 	<view class="b-lucky20" v-else-if="aboutList.code=='ajxy20'">
						<template v-for="(code,index) in aboutList['current_code']">
						   <view class="box-item"  :key="'d'+index" :class="{big:code==19 || code==20}">{{code}}</view>
						</template>
					</view> -->
					<view class="b-lhc" v-else-if="aboutList.code=='newjslhc'">
						<template v-for="(code,index) in aboutList['current_code']">
						   <view :key="index+'x'+6" v-if="index==6" class="font_family icon-jia"></view>
						   <view  :key="'e'+index" class="box-item" :class="{lhcRed:aboutList.color[index]==1,lhcGreen:aboutList.color[index]==2,lhcBlue:aboutList.color[index]==3}">{{ code }}</view>
						</template>
					</view>
					<view class="b-other" v-else>
						<template v-for="(code,index) in aboutList['current_code']">
						   <view class="box-item"  :key="'f'+index" :class="{big:code==19 || code==20}">{{code}}</view>
						</template>
					</view>
					<view class="next">Next Lottery Draw:</view>
					<view class="time">
						<text v-if="allSeconds > 0">
							<text class="txt ml2" v-if="hour > 0">{{ hour }}:</text>
							<text class="txt" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
							<text class="txt">{{ second }}</text>
						</text>
						<text class="r_arrow txt" v-if="allSeconds <= 0">opening...</text>
					</view>
				</view>
			</view>
			<view class="cn-bt">
				<view class="bt-nav">
					<view class="title">CHECK LOTTERY RESULTS ONLINE</view>
					<view class="search">
						<input class="ipt" type="search" v-model="searchVal" />
						<view class="bg-img font_family icon-search" @tap="search"></view>
						<view class="date" @tap="open">
							<view class="s-img font_family icon-calendar"></view>
						</view>
					</view>
					<view class="tips">Find results, see winning numbers, or select from the list below to check results for all lotteries at the Lottery.</view>
				</view>
			</view>
			<view class="cn-box">
				<view class="box-tp">
					<view class="num">ISSUE NO</view>
					<view class="item">WINNING NUMBERS</view>
				</view>
				<view class="box-ft" v-for="(item,index) in sortList">
					<view class="num">{{item.number}}</view>
					<view class="list">
						<view class="item" v-for="(item1,index1) in item.data">{{item1}}</view>
					</view>
				</view>
				<view class="blank"></view>
			</view>
			<view class="cn-ft">
				<view class="f-img"></view>
				<view class="txt">Speed Lottos @ All Right Reserved.</view>
			</view>
		</view>
		<view>
		    <uni-calendar 
		    ref="calendar"
		    :insert="false"
		    :showMonth="false"
			:startDate="startDate"
			:endDate="endDate"
			@change="change"
		    @confirm="confirm"
		     />
		</view>
		<view class="popup" v-if="popupShow">
			<view class="p-con">
				<view class="p-con-hd">error</view>
				<view class="p-con-bd">{{prompt}}</view>
				<view class="p-con-ft">
					<view class="p-btn-lf" @tap="pcancel">cancel</view>
					<view class="p-btn-rg" @tap="pcancel">confirm</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import UniNavBar from '../../components/uni-nav-bar/uni-nav-bar.vue';
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	export default {
		components: {
			UniNavBar,
			uniCalendar
		},
		data() {
			const currentDate = this.getDate({
				format: true
			});
			return {
				title: 'ABOUT-SPEEDY',
				logo: 'static/img/list.svg',
				code: '',
				date: currentDate,
				sortList: [],
				searchVal:'',
				timeDiff: 0, //服务器与客户端时间差
				allSeconds: 0, //距离下期开奖时间（秒）(动态)
				interval: 0, //接口返回数据时距离下期开奖时间（秒）
				hour: 0, //时
				minute: '00', //分
				second: '00', //秒
				st: null,
				rl: null,
				aboutList: null,
				current_number: '',
				startDate:'',
				endDate:currentDate,
				prompt:'Please enter a draw id',
				popupShow: false,
				lotteryNum:'',
				lotteryDate:''
			};
		},
		onLoad: function(option) {
			this.code = option.code;
			this.title = this.capitalize(option.name);
			this.getAnalysisDetail();
			this.getAboutOnce();
			this.startDate = this.getPreMonth(this.date);
		},
		onUnload: function() {
			clearInterval(this.st);
			clearInterval(this.rl);
		},
		watch: {
			current_number(newData, prevData) {
				this.getAnalysisDetail();
			}
		},
		methods: {
			back() {
				history.back();
			},
			//打开日历
			open(){
				this.$refs.calendar.open();
			},
			//打开日期
			confirm(e){
				this.searchVal = '';
				this.date = e.fulldate;
				this.getAnalysisDetail();
			},
			//搜索
			search(){
				this.date='';
				this.searchVal =  this.searchVal.replace(/\s*/g,"");
				if(this.searchVal){
					this.getAnalysisDetail();
				}else{
					this.prompt = 'Please enter a draw id';
					this.popupShow = true;
				}
			},
			pcancel(){
				this.popupShow = false;
			},
			//字符串首个字母转为大写
			capitalize(str){
		 	    var words =str.split(" ");
				for(var i=0;i<words.length;i++){
					words[i]=words[i].charAt(0).toUpperCase()+words[i].slice(1);
				}
			    return words.join(" ");
			},
			getPreMonth(date) {
				var arr = date.split('-');
				var year = arr[0]; //获取当前日期的年份
				var month = arr[1]; //获取当前日期的月份
				var day = arr[2]; //获取当前日期的日
				var days = new Date(year, month, 0);
				days = days.getDate(); //获取当前日期中月的天数
				var year2 = year;
				var month2 = parseInt(month) - 1;
				if (month2 == 0) {
					year2 = parseInt(year2) - 1;
					month2 = 12;
				}
				var day2 = day;
				var days2 = new Date(year2, month2, 0);
				days2 = days2.getDate();
				if (day2 > days2) {
					day2 = days2;
				}
				if (month2 < 10) {
					month2 = '0' + month2;
				}
				var t2 = year2 + '-' + month2 + '-' + day2;
				return t2;
			},
			//获取历史开奖数据
			getAnalysisDetail(){
				uni.showLoading({title:'loading'});
				let that = this;
				that.$api.getAnalysisDetail({ code: that.code,date: that.date, issue: that.searchVal }).then(rs => {
					if(rs.code == 0){
						that.sortList = rs.data.list;
						uni.hideLoading();
					}else{
						uni.hideLoading();
						that.prompt = rs.error;
						that.popupShow = true;
					}
				})
			},
			// 当前彩种即时开奖数据
			getAboutOnce() {
				let that = this;
				that.$api.getAboutOnce({ code: that.code }).then(rs => {
					if (rs.code == 0) {
						if(that.current_number != rs.data.current_number){
							that.date = that.getDate({
								format: true
							});
						}
						that.aboutList = rs.data;
						that.current_number = rs.data.current_number;
						that.lotteryNum = rs.data.current_number + ',' + (rs.data.current_date).substring(0,(rs.data.current_date).indexOf(',')) + ',';
						that.lotteryDate = (rs.data.current_date).substring((rs.data.current_date).indexOf(',')+1);
						that.countDown();
						that.numberRoll();
					}
				});
			},
			//下期开奖倒计时
			countDown() {
				this.interval = this.allSeconds = Math.floor((new Date(this.aboutList.next_time.replace(/-/g, '/')).getTime() - new Date().getTime() - this.timeDiff) / 1000);
				this.st = setInterval(() => {
					this.allSeconds -= 1;
					if (this.allSeconds <= 0) {
						this.minute = '00';
						this.second = '00';
						this.getAboutOnce();
						clearInterval(this.st);
					} else {
						this.hour = Math.floor(this.allSeconds / 3600);
						let lastSeconds = this.allSeconds % 3600;
						this.minute = (lastSeconds / 60 < 10 ? '0' : '') + Math.floor(lastSeconds / 60);
						this.second = (lastSeconds % 60 < 10 ? '0' : '') + (lastSeconds % 60);
					}
				}, 1000);
			},
			//号码滚动
			numberRoll() {
				let that = this;
				that.rl = setInterval(() => {
					if (that.allSeconds >= 0) {
						clearInterval(that.rl);
						return;
					}
					that.aboutList.current_code.forEach((v, k) => {
						that.aboutList.current_code[k] = Math.floor(10 * Math.random());
					});
				}, 100);
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
			
				if (type === 'start') {
					year = year - 5;
				} else if (type === 'end') {
					// year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
		}
	}
</script>

<style lang="scss">
	@media screen and (min-width: 1350px) {
	    .details{
			.popup{
				.p-con{
					width: 600px!important;
					max-width: 600px!important;
				}
			}
		} 
	}
	.details{
		position: relative;
		width: 100%;
		font-family: PingFangSC-Regular,Helvetica Neue,tahoma,arial,sans-serif;
		color: #FFFFFF;
		.contain{
			width: 100%;
			height:100%;
			position: relative;
			box-sizing: border-box;
			overflow: hidden;
			.cn-tp{
				width: 100%;
				height: 270rpx;
				background: url(../../static/img/xq_bg.jpg) no-repeat;
				background-size: 100% 100%;
				box-sizing: border-box;
				overflow: hidden;
				.lotName{
					width: 100%;
					height: 72rpx;
					line-height: 56rpx;
					font-size: 72rpx;
                    font-family: PingFangSC-Regular,Helvetica Neue,tahoma,arial,sans-serif;
                    font-weight: normal;
					text-align: center;
					margin-top: 70rpx;
				}
				.type{
					width: 100%;
					height: 25rpx;
					line-height: 20rpx;
					font-size: 20rpx;
					text-align: center;
				}
			}
			.cn-md{
				width: 100%;
				min-height: 550rpx;
				background: #E3E6EA;
				color: #E65258;
				.md-nav{
					height: 100%;
					width: 700rpx;
					margin-left: 50rpx;
					box-sizing: border-box;
					overflow: hidden;
					.title,.num,.date{
						height: 36rpx;
						font-size: 36rpx;
						width: 100%;
						line-height: 32rpx;
						text-align: left;
					}
					.title{
						height: 34rpx;
						line-height: 32rpx;
						margin-top: 65rpx;
					}
					.num,.date{
						font-weight: bold;
						margin-top: 20rpx;
					}
					.b-lucky8,.b-lucky20,.b-lhc,.b-other{
						overflow: hidden;
						display: flex;
						justify-content: flex-start;
						flex-wrap: wrap;
						margin: 30rpx 0 45rpx 0;
						.box-item{
							width: 72rpx;
							height: 72rpx;
							background: #E84046;
							border-radius: 50%;
							font-size: 44rpx;
							font-family: Impact;
							color: #FFFFFF;
							display: flex;
							align-items: center;
							justify-content: center;
							margin:0 15rpx 15rpx 0;
						}
						.icon-jia{
							font-size: 62rpx;
							color: #666666;
							width: 72rpx;
							height: 72rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							border-radius: 50%;
							margin:0 15rpx 15rpx 0;
						}
						.big{
							color: #FFFFFF;
							background: #000000;
						}
						.lhcGreen{
							background: #7AB264;
						}
						.lhcBlue{
							background: #4AA6E2;
						
						}
						.lhcRed{
							background: #F05858;
						}
					}
					.b-lucky8{
						width: 350rpx;
					}
					.b-lucky20{
						width: 430rpx;
					}
					.b-lhc{
						width: 700rpx;
					}
					.b-other{
						width: 430rpx;
					}
					.next{
						margin-top: 45rpx;
						font-size: 30rpx;
						width: 100%;
						height: 28rpx;
						line-height: 28rpx;
					}
					.time{
						margin-top: 30rpx;
						width: 180rpx;
						height: 72rpx;
						background: rgba(227, 230, 234, 0);
						border: 1px solid rgba(232, 63, 70, 0.6);
						display: flex;
						align-items: center;
						justify-content: center;
                        color: #E83F46;
						margin-bottom: 60rpx;
						.txt{
							font-size: 36rpx;
							font-weight: bold;
						}
					}
				}
				
			}
			.cn-bt{
				width: 100%;
				height: 420rpx;
                background: #FFFFFF;
				.bt-nav{
					height: 100%;
					width: 640rpx;
					margin-left: 50rpx;
					box-sizing: border-box;
					overflow: hidden;
					.title{
						margin-top: 75rpx;
						text-align: left;
						width: 100%;
						height: 40rpx;
						line-height: 40rpx;
						font-size: 36rpx;
						color: #333333;
					}
					.search{
						position: relative;
						margin-top: 50rpx;
						width: 100%;
						display: flex;
						justify-content: flex-start;
						.ipt{
							width: 400rpx;
							height: 70rpx;
							background: #FFFFFF;
							border: 1px solid rgba(153, 153, 153, 0.6);
							outline: none;
							padding-left: 10rpx;
							color: #666666;
							box-sizing: border-box;
							overflow: hidden;
						}
						.bg-img{
							color: #333333;
							font-size: 58rpx;
							position: absolute;
							top: 10rpx;
							left: 330rpx;
							width: 50rpx;
							height: 50rpx;
							z-index: 99;
							display: flex;
							align-items: center;
							justify-content: center;
						}
						.date{
							margin-left: 10rpx;
							width: 70rpx;
							height: 70rpx;
							background: #FFFFFF;
							border: 1px solid rgba(153, 153, 153, 0.6);
							display: flex;
							align-items: center;
							justify-content: center;
							.s-img{
								display: flex;
								align-items: center;
								justify-content: center;
								color: #333333;
								width: 100%;
								height: 100%;
								font-size: 64rpx;
							}
						}
					}
					.tips{
						margin-top: 30rpx;
						line-height: 35rpx;
						width: 100%;
						height: 95rpx;
						font-size: 26rpx;
						color: #999999;
					}
				}
			}
			.cn-box{
				width: 100%;
				background: #FFFFFF;
				.box-tp{
					width: 100%;
					height: 65rpx;
                    background: #F1F1F1;
					display: flex;
					justify-content: flex-start;
                    color: #999999;
					font-size: 28rpx;
					.num{
						margin-left: 55rpx;
						width: 245rpx;
						text-align: left;
						line-height: 65rpx;
					}
					.item{
						width: 450rpx;
						text-align: left;
						line-height: 65rpx;
					}
				}
				.box-ft{
					width: 100%;
					min-height: 95rpx;
					background: #F1F1F1;
					display: flex;
					justify-content: flex-start;
					background: #FFFFFF;
					border-bottom: 1px solid #E9E9E9;
					.num{
						margin-left: 55rpx;
						width: 245rpx;
						text-align: left;
						line-height: 95rpx;
						font-size: 28rpx;
						color: #666666;
					}
					.list{
						width: calc(100% - 340rpx);
						display: flex;
						justify-content: flex-start;
						flex-wrap: wrap;
						box-sizing: border-box;
						overflow: hidden;
						padding: 13.5rpx 0 23.5rpx 0;
						.item{
							margin: 10rpx 10rpx 0 0;
							width: 48rpx;
							height: 48rpx;
							background: linear-gradient(120deg, #FFFFFF, #E8E8E8);
							border: 1px solid #C1C3CE;
							border-radius: 50%;
							font-size: 28rpx;
							font-family: Impact;
							color: #343434;
							display: flex;
							align-items: center;
							justify-content: center;
						}
					}
				}
				.blank{
					width: 100%;
					height: 60rpx;
					border-bottom: 1px solid #E9E9E9;
					background: #FFFFFF;
					border-bottom: 1px solid #DDDDDD;
				}
			}
			.cn-ft{
				width: 100%;
				height: 210rpx;
				box-sizing: border-box;
				overflow: hidden;
		    	background: #F5F5F5;
				.f-img{
					width: 340rpx;
					height: 80rpx;
					background: url(../../static/img/foot_logo.png) no-repeat;
					background-size: 100% 100%;
					margin: 0 auto;
					margin-top: 35rpx;
				}
				.txt{
					width: 100%;
					text-align: center;
					font-size: 26rpx;
					color: #AAAAAA;
					margin-top: 30rpx;
					height: 25rpx;
					line-height: 20rpx;
				}
			}
		}
		.popup{
			max-width: 750px;
			margin: 0 auto;
			position: fixed;
			z-index: 999;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			background: rgba(0,0,0,.6);
			.p-con{
				width: 600rpx;
				max-width: 300px;
				top: 50%;
				left: 50%;
				-webkit-transform: translate(-50%,-50%);
				transform: translate(-50%,-50%);
				background-color: #fff;
				text-align: center;
				border-radius: 3px;
				overflow: hidden;
				.p-con-hd{
					height: 90rpx;
					line-height: 120rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 36rpx;
					color: #333333;
				}
			   .p-con-bd{
				    height: 120rpx;
				    display: flex;
				   	align-items: center;
				   	justify-content: center;
					font-size: 30rpx;
					color: #999;
			   }
			   .p-con-ft{
				   height: 96rpx;
				   display: flex;
				   box-sizing: border-box;
				   overflow: hidden;
				   .p-btn-lf,.p-btn-rg{
					   width: 50%;
					   display: flex;
					   align-items: center;
					   justify-content: center;
					   color: #333;
					   border:1px solid #F4F4F4;
				   }
				   .p-btn-lf{
					   border-right: none;
				   }
			   }
			}
		}
	}
	.uni-calendar-item--isDay{
		display: none!important;
	}
</style>
