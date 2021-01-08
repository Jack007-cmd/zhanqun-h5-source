<template>
	<view class="history">
		<view>
			<uni-nav-bar :fixed="true"  color="#ffffff" :status-bar="true" :title="title" background-color="#5232CB" :iconlist="false" currentRoute="draw-history" @clickLeft="back">
				<view slot="left"><view class="font_family iconarrow" style="font-size: 48rpx;color: #FFFFFF;"></view></view>
				<view slot="right">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" fields="year" @change="bindDateChange">
						<view class="uni-input mydate">
							{{ date }}
							<text class="font_family icontriangle"></text>
						</view>
					</picker>
				</view>
			</uni-nav-bar>
		</view>
		<view class="his-tp">
			<span class="item" v-for="(item ,index) in sortList" :key="'k'+index"  @click="setCurrent(item)" :class="{ on: currentSort == item.id }" >{{ item.name }}</span>
		</view>
		<view v-if="sortList && sortList.length>0">
			   <instant-draw v-if="currentSort == 1" :code="code" :date="date" :current_number="current_number"></instant-draw>
			   <luzhu v-if="currentSort == 2" :code="code" :date="date" :current_number="current_number" :list="list" :type="type"></luzhu>
			   <positive-code v-if="currentSort == 5" :code="code" :date="date" :current_number="current_number" :list="list" :type="type"></positive-code>
			   <positive-code v-if="currentSort == 6" :code="code" :date="date" :current_number="current_number" :list="list" :type="type"></positive-code>
			   <positive-code v-if="currentSort == 7" :code="code" :date="date" :current_number="current_number" :list="list" :type="type"></positive-code>
		</view>
		
	</view>
</template>

<script>
    import UniNavBar from '../../components/uni-nav-bar/uni-nav-bar.vue';
	import InstantDraw from '../analysis/instant-draw.vue';
	import Luzhu from '../analysis/luzhu.vue';
	import PositiveCode from '../analysis/positive-code.vue';
	export default {
		components: {
			UniNavBar,
			InstantDraw,
			Luzhu,
			PositiveCode
		},
		data() {
			const currentDate = this.getDate({
				format: true
			});
			return {
				title:'澳門六合彩',
				date: currentDate.substring(0,4),
				currentSort: -1,
				current_number: '',
				timeDiff: 0,
				allSeconds: 0, //距离下期开奖时间（秒）(动态)
				interval: 0, //接口返回数据时距离下期开奖时间（秒）
				st: null,
				code:'amlhc',
				aboutList:null,
				sortList: [],
				type:'',
				list:[],
				current_draw:null,
				drawType:[]
			};
		},
		computed: {
			startDate() {
				return (this.getDate('start')).substring(0,4);
			},
			endDate() {
				return (this.getDate('end')).substring(0,4);
			}
		},
		// watch:{
		// 	currentDraw(newData, prevData) {
		// 		this.currentDraw = newData;
		// 	},
		// },
		onLoad: function(option) {
			this.type = option.type;
			this.getAboutOnce();
			this.getLotteryAnalysis();
		},
		methods: {
			judgment(){
				let that = this;
				for(var i in that.drawType){
					for(var k in that.drawType[i]){
						if(that.drawType[i][k] == that.type){
							if(i==0){
								that.currentSort = 1; 
							}else if(i==1){
								that.currentSort = 2; 
								that.list = that.sortList[1]['child'];
							}else if(i==2){
								that.currentSort = 5; 
								that.list = that.sortList[2]['child'];
							}else if(i==3){
								that.currentSort = 6;  	
								that.list = that.sortList[3]['child'];
							}else if(i==4){
								that.currentSort = 7; 
								that.list = that.sortList[4]['child'];
							}
						}
					}
				}
			},
			back() {
				history.back();
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				var num = year - 2020;
				if (type === 'start') {
					year = year - num;
				} else if (type === 'end') {
					// year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			bindDateChange: function(e) {
				this.date = e.target.value;
			},
			setCurrent(sort){
				this.currentSort = sort.id;
				this.list = sort.child;
				if(sort.id==2){
					this.type = 'getSDRoadOfBead';
				}else if(sort.id==5){
					this.type = "styleHot";
				}else if(sort.id==6){
					this.type = "ZhmaHot";
				}else if(sort.id==7){
					this.type = "ZooTemaHot";
				}
			},
			// 当前彩种即时开奖数据
			getAboutOnce() {
				let that = this;
				that.$api.getAboutOnce({ code: that.code }).then(rs => {
					if (rs.code == 0) {
						if(that.current_number != rs.data.current_number){
							that.date = (that.getDate({format: true})).substring(0,4);
						}
						that.current_number = rs.data.current_number;
						that.aboutList = rs.data;
						that.countDown();
					}
				});
			},
			//下期开奖倒计时
			countDown() {
				let that = this;
				that.interval = that.allSeconds = Math.floor((new Date(that.aboutList.next_time.replace(/-/g, '/')).getTime() - new Date().getTime() - that.timeDiff) / 1000);
				that.st = setInterval(() => {
					that.allSeconds -= 1;
					if (that.allSeconds <= 0) {
						that.getAboutOnce();
						clearInterval(that.st);
					} 
				}, 1000);
			},
			getLotteryAnalysis() {
				let that = this;
				that.$api.getLotteryAnalysis({ code: that.code, type: 1 }).then(rs => {
					if (rs.code == 0) {
						that.sortList.push({id:1,name:'開獎歷史',child:[]})
						for(var i in rs.data){
							that.sortList.push(rs.data[i]);
							that.drawType[0] = [];
							that.drawType[0].push('jskj');
							that.drawType[Number(i) + 1] = [];
							for(var k in rs.data[i]['child']){
								that.drawType[Number(i)+1].push(rs.data[i]['child'][k]['type']);
							}
						}
						if(that.type){
							that.judgment()
						}else{
							that.currentSort = 1;
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss">
.history{
	position: relative;
	width: 100%;
	font-family: Microsoft YaHei;
	color: #FFFFFF;
	.mydate{
		padding: 14rpx 0!important;
		background: #5232CB!important;
        font-size: 28rpx!important;
		margin-right: 20rpx!important;
		.icontriangle{
			    display: inline-block;
			    width: 10px;
			    height: 10px;
			    color: #fff;
			    top: 1px;
			    font-size: 24rpx!important;
				margin-left: 8rpx;
		}
	}
	.his-tp{
		position: relative;
		width: 100%;
		height: 88rpx;
		background: #5232CB;
		box-sizing: border-box;
		overflow: hidden;
		display: flex;
		justify-content: flex-start; 
		align-items: center; 
		padding-top:14rpx;
		overflow: hidden;
		.item{
            height: 76rpx;
			padding: 0;
			margin: 0;
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			color: #FFFFFF;
			text-align: center;
			line-height: 82rpx;
            // opacity: 0.8;
			min-width: 132rpx;
			overflow: hidden;
			box-sizing: border-box;
		}
		.on{
            // opacity: 1;
			width: 184rpx;
			background: url(../../static/img/list_active.png) no-repeat;
			background-size: 100% 100%;
		}
	}
}
</style>
