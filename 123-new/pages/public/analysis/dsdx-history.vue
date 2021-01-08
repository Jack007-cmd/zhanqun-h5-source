<template name="dsdx-history">
	<view class="container">
		<view class="navTab">
			<view class="nav-item" :class="{checked:type==0}" @tap.stop="type=0">综合查看</view>
			<view class="nav-item" :class="{checked:type==1}" @tap.stop="type=1">个体查看</view>
		</view>
		<view class="content-list" v-if="type == 0">
			<view class="option-box" @touchstart.stop @touchend.stop >
				<view class="option-list" v-if="codeType == 1">
					<view class="option" :class="{checked:tGoal==0}"  @tap.stop="tGoal=0">冠军</view>
					<view class="option" :class="{checked:tGoal==1}"  @tap.stop="tGoal=1">亚军</view>
					<view class="option" :class="{checked:tGoal==2}" @tap.stop="tGoal=2">第三</view>
					<view class="option" :class="{checked:tGoal==3}" @tap.stop="tGoal=3">第四</view>
					<view class="option" :class="{checked:tGoal==4}" @tap.stop="tGoal=4">第五</view>
					<view class="option" :class="{checked:tGoal==5}" @tap.stop="tGoal=5">第六</view>
					<view class="option" :class="{checked:tGoal==6}" @tap.stop="tGoal=6">第七</view>
					<view class="option" :class="{checked:tGoal==7}" @tap.stop="tGoal=7">第八</view>
					<view class="option" :class="{checked:tGoal==8}" @tap.stop="tGoal=8">第九</view>
					<view class="option" :class="{checked:tGoal==9}" @tap.stop="tGoal=9">第十</view>
				</view>
				<view class="option-list" v-if="codeType == 2">
					<view class="option" :class="{checked:tGoal==0}" @tap.stop="tGoal=0">第一球</view>
					<view class="option" :class="{checked:tGoal==1}" @tap.stop="tGoal=1">第二球</view>
					<view class="option" :class="{checked:tGoal==2}" @tap.stop="tGoal=2">第三球</view>
					<view class="option" :class="{checked:tGoal==3}" @tap.stop="tGoal=3">第四球</view>
					<view class="option" :class="{checked:tGoal==4}" @tap.stop="tGoal=4">第五球</view>
				</view>
				<view class="option-list" v-if="codeType == 3">
					<view class="option" :class="{checked:tGoal==0}" @tap.stop="tGoal=0">第一球</view>
					<view class="option" :class="{checked:tGoal==1}" @tap.stop="tGoal=1">第二球</view>
					<view class="option" :class="{checked:tGoal==2}" @tap.stop="tGoal=2">第三球</view>
					<view class="option" :class="{checked:tGoal==3}" @tap.stop="tGoal=3">第四球</view>
					<view class="option" :class="{checked:tGoal==4}" @tap.stop="tGoal=4">第五球</view>
					<view class="option" :class="{checked:tGoal==5}" @tap.stop="tGoal=5">第六球</view>
					<view class="option" :class="{checked:tGoal==6}" @tap.stop="tGoal=6">第七球</view>
					<view class="option" :class="{checked:tGoal==7}" @tap.stop="tGoal=7">第八球</view>
				</view>
			</view>
			<view class="table-box">
				<table border="0" cellspacing="1" cellpadding="1">
					<thead>
						<tr>
							<th>日期</th>
							<th>大</th>
							<th>小</th>
							<th>单</th>
							<th>双</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) of mainData" :key="index" style="height:25px">
							<td>{{ item.day }}</td>
							<template v-for="(temp,t) in item.list">
								<template v-if="t == tGoal">
									<td>{{ temp.big }}</td>
									<td>{{ temp.little }}</td>
									<td>{{ temp.single }}</td>
									<td>{{ temp.double }}</td>
								</template>
							</template>
						</tr>
					</tbody>
				</table>
			</view>
		</view>

		<view class="content-list" v-if="type == 1">
			<view class="dxds-box">
				<view class="dxds-list">
					<view class="dxds" :class="{checked:modeType==0}" @click="modeType=0">单</view>
					<view class="dxds" :class="{checked:modeType==1}" @click="modeType=1">双</view>
					<view class="dxds" :class="{checked:modeType==2}" @click="modeType=2">大</view>
					<view class="dxds" :class="{checked:modeType==3}" @click="modeType=3">小</view>
				</view>
			</view>
			<view class="table-box">
				<table border="0" cellspacing="1" cellpadding="1">
					<thead v-if="codeType == 1">
						<tr>
							<th>日期</th>
							<th>冠军</th>
							<th>亚军</th>
							<th>第三</th>
							<th>第四</th>
							<th>第五</th>
							<th>第六</th>
							<th>第七</th>
							<th>第八</th>
							<th>第九</th>
							<th>第十</th>
						</tr>
					</thead>
					<thead v-if="codeType == 2">
						<tr>
							<th>日期</th>
							<th>第一球</th>
							<th>第二球</th>
							<th>第三球</th>
							<th>第四球</th>
							<th>第五球</th>
						</tr>
					</thead>
					<thead v-if="codeType == 3">
						<tr>
							<th>日期</th>
							<th>第一球</th>
							<th>第二球</th>
							<th>第三球</th>
							<th>第四球</th>
							<th>第五球</th>
							<th>第六球</th>
							<th>第七球</th>
							<th>第八球</th>
						</tr>
					</thead>
					<tbody>
						<tr></tr>
						<tr v-for="(item, index) in mainData" style="height:25px">
							<td>{{ item.day }}</td>
							<template v-for="(temp, tempIndex) in item.list">
								<td v-if="modeType == 0">{{ temp.single }}</td>
								<td v-if="modeType == 1">{{ temp.double }}</td>
								<td v-if="modeType == 2">{{ temp.big }}</td>
								<td v-if="modeType == 3">{{ temp.little }}</td>
							</template>
						</tr>
					</tbody>
				</table>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'dsdx-history',
	props: ['code', 'date', 'current_number'],
	data() {
		return {
			mainData: [],
			codeType: -1,
			tGoal: 0, //0:第一球 1：第二球 2.。。
			type: 0, //0：综合查看 1：个体查看
			modeType: 0 //0单1双2大3小
		};
	},
	watch: {
		date(newData, prevData) {
			uni.showLoading({
				title: 'loading'
			});
			this.getAnalysisDetail();
		},
		current_number(newData, prevData) {
			uni.showLoading({
				title: 'loading'
			});
			this.getAnalysisDetail();
		}
	},
	created: function(e) {
		const allTypes = uni.getStorageSync('analysisKinds')['dsdxls'];
		if (allTypes['type1'].indexOf(this.code) != -1) {
			this.codeType = 1;
		} else if (allTypes['type2'].indexOf(this.code) != -1) {
			this.codeType = 2;
		} else if (allTypes['type3'].indexOf(this.code) != -1) {
			this.codeType = 3;
		}
		uni.showLoading({title:"loading"});
		this.getAnalysisDetail();
	},
	methods: {
		getAnalysisDetail() {
			let that = this;
			this.$api.getAnalysisDetail({ code: this.code, type: 'dsdxls', date: this.date }).then(res => {
					uni.hideLoading();
				if (res.code == 0) {
					Object.keys(res.data).forEach(function(key) {
						that.mainData.push({ day: key, list: res.data[key] });
					});
				}else{
					uni.showToast({
	　　　　　　　　　　　　title: "网络异常，请稍后再试",
	　　　　　　　　　　　　icon: 'none'
	　　　　　　　　　　})
				 }
			});
		}
	}
};
</script>

<style lang="scss">
.container {
	padding-top: 10px;
	.navTab {
		padding-left: 10px;
		padding-right: 10px;
		box-sizing: border-box;
		height: auto;
		width: 100%;
		border-bottom: 1px solid #dbdbdb;
		background: #fff;
		text-align: center;
		.nav-item {
			display: inline-block;
			height: 100%;
			line-height: 44px;
			text-align: center;
			color: #666;
			font-size: 13px;
			width: 35%;
		}
		.checked{
			border-bottom: 1px solid #e12121;
		}
	}
	.content-list {
		width: 100%;
		height: auto;
		box-sizing: border-box;
		.option-box {
			background: #fff;
			width: 100%;
			height: 60px;
			padding: 0 10px;
			overflow: scroll;
			.option-list {
				width: 1000px;
				height: auto;
				margin-top: 15px;
				text-align: center;
				overflow-x: scroll;
				.option {
					float: left;
					font-size: 14px;
					color: #666;
					width: 80px;
					height: 30px;
					line-height: 30px;
					margin-right: 15px;
					border-radius: 15px;
					border: 1px solid #dbdbdb;
					list-style-type: none;
				}
				.checked{
					vorder:none;
					color: #fff !important;
					background: #e12121;
				}
			}
		}
		.dxds-box{
			height: auto;
			    padding: 0 10px 10px;
			    width: 94%;
			    margin-left: auto;
			    margin-right: auto;
			.dxds-list{
				    width: auto;
				    height: 30px;
				    margin-top: 10px;
				    text-align: center;
				.dxds{
					float: left;
					    font-size: 14px;
					    color: #e12121;
					    width: 25%;
					    height: 31px;
					    line-height: 30px;
					    -webkit-box-sizing: border-box;
					    box-sizing: border-box;
					    list-style-type: none;
					    border-left: 1px solid #e12121;
					    border-top: 1px solid #e12121;
					    border-bottom: 1px solid #e12121;
				}
				.checked{
					color: #fff;
					background: #e12121;
				}
				.dxds:first-child{
				    border-top-left-radius: 5px;
				    border-bottom-left-radius: 5px;				
				}
				.dxds:last-child{
				    border-top-right-radius: 5px;
				    border-bottom-right-radius: 5px;
					border-right: 1px solid #e12121;				
				}
			}
		}
		.table-box {
			table {
				display: table;
				width: 100%;
				background: #e5e5e5;
				text-align: center;
				color: #666;
				thead{
					th {
						font-size: 12px;
						height: 33px;
						line-height: 33px;
						background: #f0f0f0;
						text-align: center;
					}
				}
				 tbody{ 
					td {
						font-size: 12px;
						background: #fff;
					}
					td:first-child{
						white-space: nowrap;
					}
				}
			}
		}
	}
}
</style>
