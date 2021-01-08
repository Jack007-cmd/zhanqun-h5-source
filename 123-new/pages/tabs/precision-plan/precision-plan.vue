<template name="precision-plan">
	<view @touchstart="start" @touchend="end">
		<view class="view-nav">
			<uni-nav-bar :fixed="true" :status-bar="true" color="#ffffff" background-color="#e12121">
				<view class="city" @click="showList = !showList" style="margin: 0 auto;">
					<view>
						<text class="uni-nav-bar-text" v-if="!showList">{{ currentType.name }}</text>
						<text class="uni-nav-bar-text" v-else>所有彩种</text>
					</view>
					<uni-icons v-if="!showList" type="arrowdown" color="#fff" size="22" />
					<uni-icons v-else type="arrowup" color="#fff" size="22" />
				</view>
				<view slot="left" v-if="showExpert" @click="hideExpertDetail()"><view class="uni-icon uni-icon-arrowleft"></view></view>
				<view slot="right">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input mydate">
							{{ date }}
							<text class="font_icon iconsytriangle date-triangle"></text>
						</view>
					</picker>
				</view>
			</uni-nav-bar>
		</view>
		<view v-if="!showList">
			<view class="detail-container" @click.stop="toDestination">
				<view class="boxline">
					<view class="box-title">
						<view class="issue">{{ current_number }}期开奖</view>
						<view class="draw-count" v-if="aboutList">已开{{ aboutList['open_num'] }}期，剩余{{ aboutList['still_num'] }}期</view>
						<view class="open-video" @click.stop="showVideo = true">
							<text class="font_icon iconshipin"></text>
							视频
						</view>
					</view>
				</view>
				<template v-if="currentType.type === 1">
					<view class="boxline">
						<view class="box" v-if="aboutList">
							<view
								class="pk10li"
								v-for="(ccode, index) in aboutList['current_code']"
								:key="index"
								:class="{
									nubb01: '0'+Number(ccode) == '01',
									nubb02: '0'+Number(ccode) == '02',
									nubb03: '0'+Number(ccode) == '03',
									nubb04: '0'+Number(ccode) == '04',
									nubb05: '0'+Number(ccode) == '05',
									nubb06: '0'+Number(ccode) == '06',
									nubb07: '0'+Number(ccode) == '07',
									nubb08: '0'+Number(ccode) == '08',
									nubb09: '0'+Number(ccode) == '09',
									nubb10: ccode == '10',
									li_after: index == 9
								}"
							></view>
						</view>
					</view>
					<view class="boxline">
						<view class="box" v-if="aboutList && aboutList.describe && aboutList.describe.length > 1">
							<view class="box-item" v-for="(temp, tempIndex) in aboutList.describe[1].val" :key="'a' + tempIndex">{{ temp }}</view>
							<view class="box-item" style="width: 2rpx;color: #dddddd;">|</view>
							<view class="box-item">冠亚和:</view>
							<view class="box-item" v-for="item in aboutList.describe[0].val" :key="'b' + item">{{ item }}</view>
						</view>
						<text class="r_arrow" v-if="allSeconds > 0">
							<text class="color-red ml2" v-if="hour > 0">{{ hour }}:</text>
							<text class="color-red" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
							<text class="color-red">{{ second }}</text>
						</text>
						<text class="r_arrow color-red" v-if="allSeconds <= 0">开奖中</text>
					</view>
				</template>

				<template v-if="currentType.type === 2">
					<view class="boxline" v-if="aboutList">
						<view class="box" v-if="aboutList.code != 'cqhlsx'">
							<view class="ssc" :class="aboutList['current_code'].length==5?'ssc_num5':''" v-for="(ccode, index) in aboutList['current_code']" :key="index + ccode">{{ ccode }}</view>
						</view>
						<view class="box" v-else>
							<view
								class="ssc zodiac"
								v-for="(ccode, index) in aboutList['current_code']"
								:key="index + ccode"
								:class="{
									zodiac0: ccode == 0,
									zodiac1: ccode == 1,
									zodiac2: ccode == 2,
									zodiac3: ccode == 3,
									zodiac4: ccode == 4,
									zodiac5: ccode == 5,
									zodiac6: ccode == 6,
									zodiac7: ccode == 7,
									zodiac8: ccode == 8,
									zodiac9: ccode == 9
								}"
							></view>
						</view>
					</view>
					<view class="boxline">
						<view class="box" v-if="aboutList && aboutList.describe && aboutList.describe.length > 1">
							<view class="box-item" v-for="(temp, tempIndex) in aboutList.describe[1].val" :key="aboutList.code + tempIndex">{{ temp }}</view>
							<view class="box-item" style="width: 2rpx;color: #dddddd;">|</view>
							<view class="box-item">总和:</view>
							<view class="box-item" v-for="(item, itemIndex) in aboutList.describe[0].val" :key="aboutList.code + item + itemIndex">{{ item }}</view>
						</view>
						<text class="r_arrow" v-if="allSeconds > 0">
							<text class="color-red ml2" v-if="hour > 0">{{ hour }}:</text>
							<text class="color-red" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
							<text class="color-red">{{ second }}</text>
						</text>
						<text class="r_arrow color-red" v-if="allSeconds <= 0">开奖中</text>
					</view>
				</template>
				<template v-if="currentType.type === 3">
					<view class="boxline" v-if="aboutList">
						<view class="box">
							<view class="ssc" :class="aboutList['current_code'].length==5?'ssc_num5':''" v-for="(ccode, index) in aboutList['current_code']" :key="index + ccode">{{ ccode }}</view>
						</view>
					</view>
					<view class="boxline">
						<view class="box" v-if="aboutList && aboutList.describe && aboutList.describe.length > 1">
							<view class="box-item" v-for="(temp, tempIndex) in aboutList.describe[1].val" :key="aboutList.code + tempIndex">{{ temp }}</view>
							<view class="box-item">{{ aboutList.describe[2].val }}</view>
							<view class="box-item">{{ aboutList.describe[3].val }}</view>
							<view class="box-item">{{ aboutList.describe[4].val }}</view>
							<view class="box-item" style="width: 2rpx;color: #dddddd;">|</view>
							<view class="box-item">总和:</view>
							<view class="box-item" v-for="(item, itemIndex) in aboutList.describe[0].val" :key="aboutList.code + item + itemIndex">{{ item }}</view>
						</view>
						<text class="r_arrow" v-if="allSeconds > 0">
							<text class="color-red ml2" v-if="hour > 0">{{ hour }}:</text>
							<text class="color-red" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
							<text class="color-red">{{ second }}</text>
						</text>
						<text class="r_arrow color-red" v-if="allSeconds <= 0">开奖中</text>
					</view>
				</template>
				<template v-if="currentType.type === 4">
					<view class="boxline" v-if="aboutList">
						<view class="box">
							<view
								class="k3"
								v-for="(ccode, index) in aboutList['current_code']"
								:key="index + ccode"
								:class="{ num1: ccode == '1', num2: ccode == '2', num3: ccode == '3', num4: ccode == '4', num5: ccode == '5', num6: ccode == '6' }"
							></view>
						</view>
					</view>
					<view class="boxline">
						<view class="box" v-if="aboutList">
							<view class="box-item">总和:</view>
							<view class="box-item" v-for="(item, itemIndex) in aboutList.describe[0].val" :key="aboutList.code + item + itemIndex">{{ item }}</view>
						</view>
						<text class="r_arrow" v-if="allSeconds > 0">
							<text class="color-red ml2" v-if="hour > 0">{{ hour }}:</text>
							<text class="color-red" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
							<text class="color-red">{{ second }}</text>
						</text>
						<text class="r_arrow color-red" v-if="allSeconds <= 0">开奖中</text>
					</view>
				</template>
				<template v-if="currentType.type === 5">
					<view class="boxline" v-if="aboutList">
						<view class="box">
							<view class="ssc" v-for="(ccode, index) in aboutList['current_code']" :key="index + ccode">{{ ccode }}</view>
						</view>
					</view>
					<view class="boxline">
						<view class="box" v-if="aboutList && aboutList.describe && aboutList.describe.length > 1">
							<view class="box-item" v-for="(temp, tempIndex) in aboutList.describe[1].val" :key="aboutList.code + tempIndex">{{ temp }}</view>
							<view class="box-item" style="width: 2rpx;color: #dddddd;">|</view>
							<view class="box-item">总和:</view>
							<view class="box-item" v-for="(item, itemIndex) in aboutList.describe[0].val" :key="aboutList.code + item + itemIndex">{{ item }}</view>
						</view>
						<text class="r_arrow" v-if="allSeconds > 0">
							<text class="color-red ml2" v-if="hour > 0">{{ hour }}:</text>
							<text class="color-red" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
							<text class="color-red">{{ second }}</text>
						</text>
						<text class="r_arrow color-red" v-if="allSeconds <= 0">开奖中</text>
					</view>
				</template>
				<template v-if="currentType.type === 6">
					<view class="boxline" v-if="aboutList">
						<view class="box">
							<view class="ssc" v-for="(ccode, index) in aboutList['current_code']" :key="index + ccode" :class="{ lastBall: index == 6 }">{{ ccode }}</view>
						</view>
					</view>
					<view class="boxline">
						<view class="box" v-if="aboutList">
							<view class="box-item">总和:</view>
							<view class="box-item" v-for="(item, itemIndex) in aboutList.describe[0].val" :key="aboutList.code + item + itemIndex">{{ item }}</view>
						</view>
						<text class="r_arrow" v-if="allSeconds > 0">
							<text class="color-red ml2" v-if="hour > 0">{{ hour }}:</text>
							<text class="color-red" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
							<text class="color-red">{{ second }}</text>
						</text>
						<text class="r_arrow color-red" v-if="allSeconds <= 0">开奖中</text>
					</view>
				</template>
				<template v-if="currentType.type === 7">
					<view class="boxline" v-if="aboutList">
						<view class="box">
							<view class="ssc" v-for="(ccode, index) in aboutList['current_code']" :key="index + ccode" :class="{ lastBall: index == 20 }">{{ ccode }}</view>
						</view>
					</view>
					<view class="boxline">
						<view class="box" v-if="aboutList">
							<view class="box-item">总和:</view>
							<view class="box-item" v-for="(item, itemIndex) in aboutList.describe[0].val" :key="aboutList.code + item + itemIndex">{{ item }}</view>
						</view>
						<text class="r_arrow" v-if="allSeconds > 0">
							<text class="color-red ml2" v-if="hour > 0">{{ hour }}:</text>
							<text class="color-red" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
							<text class="color-red">{{ second }}</text>
						</text>
						<text class="r_arrow color-red" v-if="allSeconds <= 0">开奖中</text>
					</view>
				</template>
				<template v-if="currentType.type === 8">
					<view class="boxline" v-if="aboutList">
						<view class="box">
							<view class="ssc" v-for="(ccode, index) in aboutList['current_code']" :key="index + ccode">{{ ccode }}</view>
						</view>
					</view>
					<view class="boxline">
						<view class="box" v-if="aboutList">
							<view class="box-item">总和:</view>
							<view class="box-item" v-for="(item, itemIndex) in aboutList.describe[3].val" :key="aboutList.code + item + itemIndex">{{ item }}</view>
						</view>
						<text class="r_arrow" v-if="allSeconds > 0">
							<text class="color-red ml2" v-if="hour > 0">{{ hour }}:</text>
							<text class="color-red" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
							<text class="color-red">{{ second }}</text>
						</text>
						<text class="r_arrow color-red" v-if="allSeconds <= 0">开奖中</text>
					</view>
				</template>
				<template v-if="currentType.type === 9">
					<view class="boxline" v-if="aboutList">
						<view class="box">
							<view class="ssc" v-for="(ccode, index) in aboutList['current_code']" :key="index + ccode">{{ ccode }}</view>
						</view>
					</view>
					<view class="boxline">
						<view class="box" v-if="aboutList">
							<view class="box-item">总和:</view>
							<view class="box-item" v-for="(item, itemIndex) in aboutList.describe[0].val" :key="aboutList.code + item + itemIndex">{{ item }}</view>
						</view>
						<text class="r_arrow" v-if="allSeconds > 0">
							<text class="color-red ml2" v-if="hour > 0">{{ hour }}:</text>
							<text class="color-red" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
							<text class="color-red">{{ second }}</text>
						</text>
						<text class="r_arrow color-red" v-if="allSeconds <= 0">开奖中</text>
					</view>
				</template>
				<template v-if="currentType.type === 10">
					<view class="boxline" v-if="aboutList">
						<view class="box">
							<view class="ssc" v-for="(ccode, index) in aboutList['current_code']" :key="index + ccode" :class="{ lastBall: index == 7 }">{{ ccode }}</view>
						</view>
					</view>
					<view class="boxline">
						<view class="box" v-if="aboutList">
							<view class="box-item">总和:</view>
							<view class="box-item" v-for="(item, itemIndex) in aboutList.describe[0].val" :key="aboutList.code + item + itemIndex">{{ item }}</view>
						</view>
						<text class="r_arrow" v-if="allSeconds > 0">
							<text class="color-red ml2" v-if="hour > 0">{{ hour }}:</text>
							<text class="color-red" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
							<text class="color-red">{{ second }}</text>
						</text>
						<text class="r_arrow color-red" v-if="allSeconds <= 0">开奖中</text>
					</view>
				</template>
				<template v-if="currentType.type === 11">
					<view class="boxline">
						<view class="box" v-if="aboutList">
							<view class="ssc" v-for="(ccode, index) in aboutList['current_code']" :key="index + ccode">{{ ccode }}</view>
						</view>
					</view>
					<view class="boxline">
						<view class="box" v-if="aboutList && aboutList.describe && aboutList.describe.length > 2">
							<view class="box-item" v-for="(temp, tempIndex) in aboutList.describe[2].val" :key="aboutList.code + tempIndex">{{ temp }}</view>
							<view class="box-item" style="width: 2rpx;color: #dddddd;">|</view>
							<view class="box-item">总和:</view>
							<view class="box-item" v-for="(item, itemIndex) in aboutList.describe[0].val" :key="aboutList.code + item + itemIndex">{{ item }}</view>
							<view class="box-item" v-for="(item, itemIndex) in aboutList.describe[1].val" :key="aboutList.code + item + itemIndex">{{ item }}</view>
						</view>
						<text class="r_arrow" v-if="allSeconds > 0">
							<text class="color-red ml2" v-if="hour > 0">{{ hour }}:</text>
							<text class="color-red" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
							<text class="color-red">{{ second }}</text>
						</text>
						<text class="r_arrow color-red" v-if="allSeconds <= 0">开奖中</text>
					</view>
				</template>
				<template v-if="currentType.type === 12">
					<view class="boxline" v-if="aboutList">
						<view class="box">
							<template v-for="(ccode, index) in aboutList['current_code']">
								<view
									class="pc-dd"
									:key="index + ccode"
									:class="{
										ball0: ccode == '0',
										ball1: ccode == '1',
										ball2: ccode == '2',
										ball3: ccode == '3',
										ball4: ccode == '4',
										ball5: ccode == '5',
										ball6: ccode == '6',
										ball7: ccode == '7',
										ball8: ccode == '8',
										ball9: ccode == '9',
										ball10: ccode == '10'
									}"
								>
									{{ ccode }}
								</view>
								<view v-if="index < 2" class="plus font_icon iconjia"></view>
								<view v-if="index == 2" class="equal font_icon icondengyu1"></view>
								<!-- <view v-if="index < 2" class="plus"></view> -->
								<!-- <view v-if="index == 2" class="equal"></view> -->
							</template>
							<view
								class="pc-dd"
								:class="{
									ball10: aboutList.describe[0].val[0] % 10 == 0,
									ball1: aboutList.describe[0].val[0] % 10 == 1,
									ball2: aboutList.describe[0].val[0] % 10 == 2,
									ball3: aboutList.describe[0].val[0] % 10 == 3,
									ball4: aboutList.describe[0].val[0] % 10 == 4,
									ball5: aboutList.describe[0].val[0] % 10 == 5,
									ball6: aboutList.describe[0].val[0] % 10 == 6,
									ball7: aboutList.describe[0].val[0] % 10 == 7,
									ball8: aboutList.describe[0].val[0] % 10 == 8,
									ball9: aboutList.describe[0].val[0] % 10 == 9
								}"
							>
								{{ aboutList.describe[0].val[0] }}
							</view>
						</view>
					</view>
					<view class="boxline">
						<view class="box" v-if="aboutList">
							<view class="box-item">总和:</view>
							<view class="box-item" v-for="(item, itemIndex) in aboutList.describe[0].val" :key="aboutList.code + item + itemIndex">{{ item }}</view>
						</view>
						<text class="r_arrow" v-if="allSeconds > 0">
							<text class="color-red ml2" v-if="hour > 0">{{ hour }}:</text>
							<text class="color-red" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
							<text class="color-red">{{ second }}</text>
						</text>
						<text class="r_arrow color-red" v-if="allSeconds <= 0">开奖中</text>
					</view>
				</template>
			</view>
			<view class="position-div" v-if="!showExpert">
				<view class="position-chooose">
					<text class="position-button" :class="{ 'current-position': size == 5 }" @click="switchSize(5)">5码定位</text>
					<text class="position-button" :class="{ 'current-position': size == 6 }" @click="switchSize(6)">6码定位</text>
					<text class="position-button" :class="{ 'current-position': size == 7 }" @click="switchSize(7)">7码定位</text>
					<text class="position-button" :class="{ 'current-position': size == 8 }" @click="switchSize(8)">8码定位</text>
				</view>
				<view class="round-div" v-if="roundRateList.length > 0">
					<view class="round-title">本轮精准计划中奖率排行榜</view>
					<view class="table-box">
						<table border="0" cellspacing="1" cellpadding="1">
							<thead>
								<tr>
									<th>专家名称</th>
									<th>码数</th>
									<th>成绩</th>
									<th>胜率</th>
									<th>详情</th>
								</tr>
							</thead>
							<tbody v-for="item in roundRateList">
								<tr>
									<td>{{ item.name }}</td>
									<td>{{ item.size }}</td>
									<td>{{ item.achievement }}</td>
									<td>{{ item.win_rate }}%</td>
									<td><span style="color:#ff2600;" @click="showExpertDetail(item.id, item.expert_no, item.name)">查看</span></td>
								</tr>
							</tbody>
						</table>
					</view>
				</view>
			</view>
			<view class="expert-details" v-else>
				<view class="expert-title">当前专家：{{ expert.name }}</view>
				<view class="position-chooose">
					<text class="position-button" :class="{ 'current-position': size == 5 }" @click="switchSize(5)">5码定位</text>
					<text class="position-button" :class="{ 'current-position': size == 6 }" @click="switchSize(6)">6码定位</text>
					<text class="position-button" :class="{ 'current-position': size == 7 }" @click="switchSize(7)">7码定位</text>
					<text class="position-button" :class="{ 'current-position': size == 8 }" @click="switchSize(8)">8码定位</text>
				</view>
				<view class="round-div" v-for="item in detailList">
					<view class="round-title">第{{ item.round_no }}轮，中：{{ item.in }}，挂：{{ item.out }}，中奖率：{{ item.win_rate }}%</view>
					<view>
						<table border="0" cellspacing="1" cellpadding="1">
							<thead>
								<tr>
									<th>期数</th>
									<th>期号</th>
									<!--<th>专家</th>-->
									<th v-if="is_sum_plan">和值计划</th>
									<th v-if="!is_sum_plan">一球计划</th>
									<th>号码</th>
									<th>结果</th>
									<th>开奖时间</th>
								</tr>
							</thead>
							<tbody v-for="temp in item.stage">
								<tr>
									<td>{{ temp.order_no }}</td>
									<td>{{ temp.number }}</td>
									<!--<td>{{temp.expert_name}}</td>-->
									<td>
										<text v-for="(n, index) in temp.plan" :class="{ win: index == temp.result - 1 }">{{ n+" " }}</text>
									</td>
									<td v-if="temp.data && temp.data.length > 0">
										<template v-if="currentType.type == 1">
											<view
												class="pk10_sm" style="margin: 0 auto;float: none;"
												:class="{
													nub01: temp.data[0] == '01',
													nub02: temp.data[0] == '02',
													nub03: temp.data[0] == '03',
													nub04: temp.data[0] == '04',
													nub05: temp.data[0] == '05',
													nub06: temp.data[0] == '06',
													nub07: temp.data[0] == '07',
													nub08: temp.data[0] == '08',
													nub09: temp.data[0] == '09',
													nub10: temp.data[0] == '10'
												}"
											></view>
										</template>
										<template v-if="currentType.type == 2 || currentType.type == 3 || currentType.type == 5">
											<template v-if="currentType.code!='cqhlsx'">
												<view class="ssc_sm" style="margin: 0 auto;float: none;">{{ temp.data[0] }}</view>
											</template>
											<template v-else>
												<view class="zodiac_sm" style="margin: 0 auto;float: none;" :class="{zodiacs0:temp.data[0]=='0',zodiacs1:temp.data[0]=='1',
												zodiacs2:temp.data[0]=='2',zodiacs3:temp.data[0]=='3',zodiacs4:temp.data[0]=='4',zodiacs5:temp.data[0]=='5',
												zodiacs6:temp.data[0]=='6',zodiacs7:temp.data[0]=='7',zodiacs8:temp.data[0]=='8',zodiacs9:temp.data[0]=='9'}"></view>
											</template>
										</template>
										<template v-if="currentType.type == 4">
											<!--<span class="num" [ngClass]="{'numm1':temp?.data[0]=='1','numm2':temp?.data[0]=='2','numm3':temp?.data[0]=='3','numm4':temp?.data[0]=='4','numm5':temp?.data[0]=='5','numm6':temp?.data[0]=='6'}"></span>-->
											<text>{{ sum(temp.data) }}</text>
										</template>
										<template v-if="currentType.type == 11">
											<view class="ssc_sm" style="margin: 0 auto;float: none;">{{ temp.data[0] }}</view>
										</template>
										<template v-if="currentType.type == 12">
											<view class="pc-dd-sm"  style="margin: 0 auto;float: none;" :class="{ball0:temp.data[0]=='0',ball1:temp.data[0]=='1',ball2:temp.data[0]=='2',ball3:temp.data[0]=='3',
											ball4:temp.data[0]=='4',ball5:temp.data[0]=='5',ball6:temp.data[0]=='6',ball7:temp.data[0]=='7',ball8:temp.data[0]=='8',ball9:temp.data[0]=='9'}">{{ temp.data[0] }}</view>
										</template>
									</td>
									<td v-if="!temp.data"><text>待开奖</text></td>
									<!--<td><span *ngFor="let d of temp.data">{{d}}</span></td>-->
									<td :class="{ win: temp.status == 1, lose: temp.status == 0 }">{{ temp.status == -1 ? '待开奖' : temp.status == 0 ? '挂' : '中' }}</td>
									<td>{{ temp.lottery_time.split(' ')[1] }}</td>
								</tr>
							</tbody>
						</table>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="about-container">
			<view class="content-list" v-for="(item, index) in seriesList" :key="'a' + index">
				<view class="content-title">{{ item.name }}</view>
				<view class="content">
					<view class="content-item" @click="switchType(it)" :key="'b' + i" v-for="(it, i) in item.list">{{ it.name }}</view>
				</view>
			</view>
		</view>
		<view class="u-popup" v-if="showVideo">
			<view class="u-transition-out" @click="showVideo=false"></view>
			<view class="u-transition">
				<view class="u-popup__wrapper-box">
					<view class="u-main">
						<view class="u-title">
							<view class="option-md" style="line-height:14px;color: #000;">{{currentType.name}}开奖视频</view>
							<view class="option-md" style="line-height:14px;color: #000;" @click="showVideo=false">关闭</view>
						</view>
						<!-- <view class="u-content">
							<video class="video" :src="currentType['video_url']" autoplay="true" :controls="false"
								:show-center-play-btn="false"></video>							
						</view> -->
						<iframe :src="currentType['video_url']"  class="u-content" frameborder="0"></iframe>
					</view>
				</view>
			</view>
		</view>	
	</view>
</template>

<script>
import url_config from '@/common/config.js'
export default {
	name: 'precision-plan',
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			startData:{clientX:'',clientY:''},
			showList: false,
			showVideo: false,
			currentType: {
				code: 'tjssc',
				name: '天津时时彩',
				type: 2,
				video_url: ''
			},
			date: currentDate,
			aboutList: {}, //当前期彩种基本数据
			timeDiff: 0, //服务器与客户端时间差
			current_number: null,
			allSeconds: 0, //距离下期开奖时间（秒）(动态)
			interval: 0, //接口返回数据时距离下期开奖时间（秒）
			hour: 0, //时
			minute: '00', //分
			second: '00', //秒
			st: null,
			seriesList: [], //系列彩种列表
			size: 5, //定位码数5
			showExpert: false,
			expert: {}, //当前专家信息
			roundRateList: [],
			detailList: [],
			page: 1,
			hasNext: true,
			is_sum_plan: false
		};
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	created:function(e){
		let that = this;
		window.onscroll = function() {
			// scrollTop是滚动条滚动时，距离顶部的距离
			let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			// windowHeight是可视区的高度
			let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
			// scrollHeight是滚动条的总高度
			let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
			// 滚动条到底部
			if (scrollTop + windowHeight + 10 >= scrollHeight && scrollTop + windowHeight  <= scrollHeight + 10) {
				if(that.showExpert){
				// 到了底部之后想做的操作,如到了底部之后加载
					that.getExpertDetail();
				}
			}
		};
	},
	onLoad: function(option) {
		// uni.hideTabBar();
		this.timeDiff = Number(uni.getStorageSync('timeDiff'));
		this.timeDiff = isNaN(this.timeDiff) ? 0 : this.timeDiff;
		this.getLeaderboard();
		this.getAboutSeriesList();
		this.getAboutOnce();
		this.currentType['video_url']= url_config + '/assets/web/common/lottery/lotteryVideo/index.html?key=' + this.currentType.code;
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
		toDestination(){
			let that = this;
			let basicArr = uni.getStorageSync("basicArr");
			let temp = basicArr.filter(item => {
				return item.code == that.currentType.code
			});
			temp = temp[0];
			uni.navigateTo({
				url: '/pages/public/' + temp.des + '/' + temp.des + '?name=' + that.currentType.name + '&code=' + that.currentType.code + '&video_url=' + that.currentType.video_url		
			});
		},
		hideExpertDetail() {
			this.showExpert = false;
			this.expert = null;
			this.page = 1;
			this.hasNext = true;
			this.detailList = [];
			this.getLeaderboard();
		},
		sum(codeArr) {
			let sum = 0;
			if (codeArr.length > 0) {
				codeArr.forEach(v => {
					sum += Number(v);
				});
			}
			return sum;
		},
		switchType(item) {
			this.showList = false;
			if (this.currentType.code == item.code) return;
			this.roundRateList = [];
			this.currentType.code = item.code;
			this.currentType.name = item.name;
			// this.currentType['video_url'] = item['url'];
			this.currentType['video_url'] = this.$api.getCurrentUrl(item.code);
			this.currentType.type = Number(item.des.split('-')[2]);
			clearInterval(this.st);
			this.getAboutOnce();
			if (this.showExpert) {
				this.page = 1;
				this.hasNext = true;
				this.detailList = [];
				this.getExpertDetail();
			} else {
				this.getLeaderboard();
			}
		},
		switchSize(num) {
			if (this.size == num) return;
			this.size = num;
			if (this.showExpert) {
				this.page = 1;
				this.hasNext = true;
				this.detailList = [];
				this.getExpertDetail();
			} else {
				this.getLeaderboard();
			}
		},
		//下期开奖倒计时
		countDown() {
			this.interval = this.allSeconds = Math.floor((new Date(this.aboutList.next_time.replace(/-/g, '/')).getTime() - new Date().getTime() - this.timeDiff) / 1000);
			if (this.allSeconds > 0) {
				if (this.showExpert) {
					this.page = 1;
					this.hasNext = true;
					this.detailList = [];
					this.getExpertDetail();
				}
				this.getLeaderboard();
			}
			this.st = setInterval(() => {
				this.allSeconds -= 2;
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
			}, 2000);
		},
		showExpertDetail(id, no, name) {
			this.showExpert = true;
			this.expert = {
				expert_no: no,
				expert_id: id,
				name: name
			};
			this.getExpertDetail();
		},
		// 专家中奖详情
		getExpertDetail() {
			if (!this.hasNext) return;
			this.$api
				.getExpertDetail({
					code: this.currentType.code,
					size: this.size,
					expert_no: this.expert.expert_no,
					expert_id: this.expert.expert_id,
					date: this.date,
					page: this.page
				})
				.then(rs => {
					if (!rs.code) {
						this.detailList = [];
						this.is_sum_plan = rs.is_sum_plan;
						this.hasNext = rs.list.current_page != rs.list.last_page;
						this.detailList.push.apply(this.detailList, rs.list.data);
						if (this.hasNext) this.page += 1;
					}
				});
		},
		getAboutOnce() {
			let that = this;
			this.$api.getAboutOnce({ code: this.currentType.code }).then(rs => {
				if (rs.code == 0) {
					that.aboutList = rs.data;
					that.current_number = rs.data.current_number;
					that.countDown();
				}
			});
		},
		// 专家中奖率排行榜
		getLeaderboard() {
			this.$api.getLeaderboard({ code: this.currentType.code, size: this.size }).then(rs => {
				if (!rs.code) {
					this.roundRateList = rs;
				}
			});
		},
		getAboutSeriesList() {
			let that = this;
			this.$api.getAboutSeriesList({}).then(rs => {
				if (rs.code == 0) {
					that.seriesList = [];
					Object.keys(rs.data).forEach(k => {
						if(rs.data[k].list){
							rs.data[k].list.forEach(v => {
								let temp = that.getAboutItem(v.code);
								if(temp){
									v['des'] = temp['des'];
									v['url'] = temp['url'];
									v['logo'] = temp['logo'];
								}
								
							});
						}
						that.seriesList.push(rs.data[k]);
					});
				}
			});
		},
		getAboutItem(code) {
			const basicArr = uni.getStorageSync('basicArr');
			let data = basicArr.filter(item => {
				return item.code == code;
			});
			return data[0];
		},
		bindDateChange: function(e) {
			this.date = e.target.value;
			if (this.showExpert) {
				this.page = 1;
				this.hasNext = true;
				this.detailList = [];
				this.getExpertDetail();
			}
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type == 'start') {
				year = year - 5;
			} else if (type == 'end') {
				// year: year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		}
	}
};
</script>

<style lang="scss">
.view-nav {
	/* #ifndef APP-NVUE */
	display: block;
	/* #endif */
	padding: 0;
	flex-direction: column;
	// padding: 15px;
	background-color: #ffffff;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	// font-size: 14px;
}
.city {
	/* #ifndef APP-PLUS-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	margin-left: 4px;
}

.detail-container {
	width: 100%;
	height: auto;
	background: #fff;
	padding: 0 10px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	font-size: 13px;
	color: #666;
	margin-bottom: 10px;
	.boxline {
		width: 100%;
		height: auto;
		display: -webkit-box;
		.box-title {
			padding-top: 10px;
			text-align: left;
			-webkit-box-flex: 3;
			-webkit-flex: 3;
			-ms-flex: 3;
			flex: 3;
			.issue {
				font-size: 28rpx;
				color: #333;
				display: inline-block;
				margin-right: 5px;
			}
			.draw-count {
				font-size: 28rpx;
				color: #999;
				display: inline-block;
			}
		}
		.box {
			display: block;
			margin-top: 10rpx;
			.pk10li {
				float: left;
				width: 52rpx;
				height: 52rpx;
				line-height: 52rpx;
				margin-right: 6rpx;
				font-size: 52rpx;
			}
			.pk10li:last-child {
				margin-right: 0;
			}
			.box-item {
				display: inline-block;
				max-width: 96rpx;
				min-width: 10rpx;
				height: 54rpx;
				margin-right: 20rpx;
				color: #555555;
			}
		}
		.r_arrow {
			margin-top: 6rpx;
			right: 0;
			float: right;
			display: inline-block;
			position: absolute;
			height: 60rpx;
			line-height: 60rpx;
		}
		.color-red {
			font-weight: 400;
			font-style: normal;
			color: red;
		}
		.ml2 {
			margin-left: 2px;
		}
	}
}

.position-div,
.expert-details {
	background: #fff;
	padding-top: 10px;
	padding-bottom: 50px;

	.expert-title {
		height: 30px;
		padding: 0 10px;
		font-weight: bold;

		.title-lt {
			float: left;
			color: #555555;
		}
	}

	.position-chooose {
		text-align: center;
		margin-bottom: 20px;

		.position-button {
			padding: 10rpx 20rpx;
			background: #eeeeee;
			font-size: 14px;
			color: #555555;
			height: 60rpx;
			border-radius: 10rpx;
			margin: 0 10rpx;
			box-shadow: 0 4rpx 6rpx 0 #a0a0a0;
		}

		.current-position {
			background: #ff2600;
			color: #ffffff;
		}
	}

	.round-div {
		padding: 0 5px;

		.round-title {
			border-right: 1px solid #fff;
			background: #ff2600;
			height: 28px;
			line-height: 28px;
			color: #fff;
			text-align: center;
		}

		table {
			background: #dcdcdc;
			display: table;
			width: 100%;
			text-align: center;
			font-size: 12px;

			th {
				height: 28px;
				line-height: 28px;
				background: #e5b8b8;
				color: #333333;
			}

			td {
				background-color: #fff;
				color: #555555;
				height: 26px;
				line-height: 26px;
			}

			.win {
				color: #ff2600;
			}

			.lose {
				color: #00ba00;
			}
		}
	}
}

.about-container {
	padding: 0 15px;
	padding-bottom: 50px;
	.content-list {
		border-bottom: 1px solid #dfdfe5;
		padding-bottom: 3px;
		.content-title {
			font-size: 16px;
			height: 24px;
			line-height: 30px;
			margin: 7px 0;
		}
		.content {
			display: flex;
			flex-wrap: wrap;
			.content-item {
				height: 40px;
				line-height: 40px;
				border: 1px solid #dfdfe5;
				background: #fff;
				text-align: center;
				border-radius: 5px;
				width: 208rpx;
				margin: 4px;
				font-size: 26rpx;
			}
		}
	}
}
.uni-nav-bar-text {
	font-size: 14px;
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
</style>
