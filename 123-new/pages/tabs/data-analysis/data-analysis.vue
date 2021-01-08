<template name="data-analysis">
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
			</uni-nav-bar>
		</view>
		<view v-if="!showList">
			<view class="detail-container">
				<view class="boxline">
					<view class="box-title">
						<view class="issue">{{ current_number }}期开奖</view>
						<view class="draw-count" v-if="aboutList">已开{{ aboutList['open_num'] }}期，剩余{{ aboutList['still_num'] }}期</view>
						<view class="open-video"  @click="showVideo = true">
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
									nubb01: Number(ccode) == '01',
									nubb02: Number(ccode) == '02',
									nubb03: Number(ccode) == '03',
									nubb04: Number(ccode) == '04',
									nubb05: Number(ccode) == '05',
									nubb06: Number(ccode) == '06',
									nubb07: Number(ccode) == '07',
									nubb08: Number(ccode) == '08',
									nubb09: Number(ccode) == '09',
									nubb10: Number(ccode) == '10',
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
						<view class="box" v-if="aboutList && aboutList.describe && aboutList.describe.length > 4">
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
			<view class="main-div">
				<view class="select-sec" v-if="factorList">
					<view class="mode" @tap="actionSheetTap1">
						{{ factorList.position[checkedFactor.position] }}
						<uni-icons type="arrowdown" color="#d3d3d3" size="22" />
					</view>
					<view class="mode" @tap="actionSheetTap2">
						{{ factorList.betting[checkedFactor.position][checkedFactor.betting] }}
						<uni-icons type="arrowdown" color="#d3d3d3" size="22" />
					</view>
					<view class="mode" @tap="actionSheetTap3">
						{{ factorList.num[checkedFactor.betting][checkedFactor.num[0]] }}
						<uni-icons type="arrowdown" color="#d3d3d3" size="22" />
					</view>
					<view class="mode" @tap="actionSheetTap4">
						{{ checkedFactor.limit == 0 ? '今天' : checkedFactor.limit + '期' }}
						<uni-icons type="arrowdown" color="#d3d3d3" size="22" />
					</view>
				</view>
				<view class="handle-sec">
					<text>
						遗漏提醒
						<text class="remind-num">80</text>
						%
					</text>
					<text class="anasysis-btn" @click="toAnalyzing()">开始分析</text>
				</view>
				<view class="statistics-sec" v-for="item in statistics">
					<view class="title-div">
						{{ currentType.name }} {{ item.position }} {{ params['bettingLimitName'] }}【{{ item.num }}】 {{ !params['limit'] ? '今天' : params['limit'] + '期' }} 出号统计
					</view>
					<view class="count-line">
						<view class="count-item">
							出现次数
							<br />
							<text>{{ item.occurrence }}</text>
						</view>
						<view class="count-item">
							平均遗漏
							<br />
							<text>{{ item.avgOmit }}</text>
						</view>
						<view class="count-item">
							最大遗漏
							<br />
							<text>{{ item.maxOmit }}</text>
						</view>
						<view class="count-item">
							最大连出
							<br />
							<text>{{ item.maxLinkOut }}</text>
						</view>
					</view>
					<view class="count-line">
						<view class="count-item">
							当前遗漏
							<br />
							<text>{{ item.nowOmit }}</text>
						</view>
						<view class="count-item">
							当前连出
							<br />
							<text>{{ item.nowLinkOut }}</text>
						</view>
						<view class="count-item">
							欲出几率
							<br />
							<text>{{ item.desireProbability }}</text>
						</view>
						<view class="count-item"></view>
					</view>
				</view>
				<view class="pic-sec">
					<view class="title-div" v-if="statistics && statistics.length>0">
						{{ currentType.name }} {{ params['positionName'] }} {{ params['bettingLimitName'] }}【 {{ params['numName'] }} 】
						{{ !params['limit'] ? '今天' : params['limit'] + '期' }} 输赢图
					</view>
					<!-- <view id="echart-div" style="height:350px;width: 100%;"></view> -->
					<view>
						<mpvue-echarts  style="height:350px;width: 100%;" canvasId="tem" ref="barChart" :echarts="echarts" @onInit="initChart" />
					</view>
				</view>
				<view class="desc-sec">
					<h3>
						<text class="font_icon iconfenxi1" style="font-size: 36rpx;margin-right: 10rpx;"></text>
						分析解释
					</h3>
					<p>
						<text>遗漏：</text>
						统计周期内没有出现的期数。如号码5，已经8期没有出现了，遗漏值就是8。
					</p>
					<p>
						<text>出现次数：</text>
						统计周期内，某个号码的累计出现次数。
					</p>
					<p>
						<text>平均遗漏：</text>
						统计期数内遗漏的平均值（计算公式：平均遗漏=统计期内的总遗漏次数/（出现次数+1），统计期内的总遗漏次数=统计期数-出现次数）。
					</p>
					<p>
						<text>最大遗漏：</text>
						统计周期内所有遗漏值的最大值。
					</p>
					<p>
						<text>最大连出：</text>
						统计周期内所有连出值的最大值。
					</p>
					<p>
						<text>当前遗漏：</text>
						号码截止到当前期，连续有多少期未出现。
					</p>
					<p>
						<text>当前连出：</text>
						号码截止到当前期，连续出现多少次。
					</p>
					<p>
						<text>欲出几率：</text>
						当前遗漏 /平均遗漏
					</p>
					<p>
						<text>输赢图：</text>
						<text class="win">赢</text>
						代表号码连续出现期数（红色）。例如：冠军大，赢5，代表冠军大已经连续出现5期；
						<text class="lose">输</text>
						代表号码连续未出期数（绿色）。例如：冠军大，输3，代表冠军大已连续3期没有出现。
					</p>
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
			<view class="u-transition-out" @click="showVideo = false"></view>
			<view class="u-transition">
				<view class="u-popup__wrapper-box">
					<view class="u-main">
						<view class="u-title">
							<view class="option-md" style="line-height:14px;color: #000;">{{ currentType.name }}开奖视频</view>
							<view class="option-md" style="line-height:14px;color: #000;" @click="showVideo = false">关闭</view>
						</view>
						<iframe :src="currentType['video_url']"  class="u-content" frameborder="0"></iframe>
						<!-- <view class="u-content"><video class="video" :src="currentType['video_url']" autoplay="true" :controls="false" :show-center-play-btn="false"></video></view> -->
					</view>
				</view>
			</view>
		</view>
		
		<view class="u-popup" v-if="showNum">
			<view class="u-transition-out" @click="numberSelection(200)"></view>
			<view class="u-transition">
				<view class="u-popup__wrapper-box">
					<view class="u-main">
						<view class="u-title" style="height: 45px;border-bottom: 1px solid #ddd;">
							<view class="option-md" style="line-height:14px;color: #000;">选择号码</view>
							<view class="option-md define-btn" @click="numberSelection(300)">确定</view>
						</view>
						<view class="u-content" style="max-height: 516rpx;overflow-y: scroll;">							
							<view class="item"  :class="{checked:tempNoArr.indexOf(objectKeys(factorList.num[checkedFactor.betting])[index])!= -1}"
							 v-for="(item,index) in objectValues(factorList.num[checkedFactor.betting])" @click="numberSelection(index)">{{item}}
								<text v-if="tempNoArr.indexOf(objectKeys(factorList.num[checkedFactor.betting])[index])!= -1" class="checkmark font_icon iconsycorrect"></text>
							 </view>

						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="showpopup" type="center"><text class="popup-content">{{ msg }}</text></uni-popup>
	</view>
</template>

<script>
import * as echarts from '../../../components/echarts/echarts.min.js';
import mpvueEcharts from '../../../components/mpvue-echarts/src/echarts.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import url_config from '@/common/config.js'
export default {
	name: 'data-analysis',
	components: {
		mpvueEcharts,
		uniPopup,
	},
	data() {
		return {
			startData:{clientX:'',clientY:''},
			showList: false,
			showVideo: false,
			lotVideo:false,
			showNum:false,
			currentType: {
				code: 'tjssc',
				name: '天津时时彩',
				type: 2,
				video_url: ''
			},
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
			checkedFactor: {
				// 已选中条件
				position: 0,
				betting: 1,
				num: ['1'],
				limit: 100
			},
			tempNoArr: [],//号码选择面板选中号码
			params: {}, //接口返回参数
			factorList: null,
			objectKeys: Object.keys,
			objectValues: Object.values,
			statistics: [], // 出号统计
			echarts,
			label: [],
			win: [],
			lose: [],
			issue: [],
			myChart: null,
			msg:''
		};
	},
	onLoad: function(option) {
		// uni.hideTabBar();
		this.timeDiff = Number(uni.getStorageSync('timeDiff'));
		this.timeDiff = isNaN(this.timeDiff) ? 0 : this.timeDiff;
		this.getAboutSeriesList();
		this.getAboutOnce();
		this.getFilterFactor();
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
		alert(msg) {
			let that = this;
			that.msg = msg;
			that.$nextTick(() => {
				that.$refs['showpopup'].open();
				setTimeout(()=>{
					that.$refs['showpopup'].close();
				},2000);
			})
		},
		  /**
		   * 开始分析
		   */
		  toAnalyzing() {
		    let that = this;
		    if (that.checkedFactor.num.length == 0) {
				 that.alert("请选择号码");
		      return;
		    }
		    if (that.checkedFactor.betting < 10 && that.checkedFactor.num.length != that.checkedFactor.betting) {
			   that.alert("号码个数与投注个数不一致，请重新选择");
		      return;
		    }
		    that.statistics = [];
		    // this.myChart.clear();
		    that.getDataAnalysisDetail();
		  },
		  /**
		   * 号码选择：选择投注的个数关联选择号码个数
		   */
		  numberSelection(n) {
		    let that = this;
		     switch (n) {
		         case 200://取消：关闭号码选择面板
		           that.tempNoArr = [];
		           that.showNum = false;
		           break;
		         case 300://确定
		           if (that.tempNoArr.length == 0) {
					   that.alert("请选择号码");
		             break;
		           }
		           if (Number(that.checkedFactor.betting) < 10 && that.tempNoArr.length != that.checkedFactor.betting) {
					   that.alert("号码个数与投注个数不一致，请重新选择");
		             break;
		           } else if (Number(that.checkedFactor.betting) > 9 && that.tempNoArr.length > 1) {
					   that.alert("只可以选择一个号码");
		             break;
		           }
		           that.checkedFactor.num = Array.from(that.tempNoArr.sort());
		           that.showNum = false;
		           that.tempNoArr = [];
		           break;
		         default:
					let tem = that.objectKeys(that.factorList.num[that.checkedFactor.betting])[n];
		           if (that.tempNoArr.indexOf(tem) == -1) {
		             that.tempNoArr.push(tem);
		           } else {
		             that.tempNoArr.splice(that.tempNoArr.indexOf(tem), 1);
		           }
		       }
		     
		  },
		initChart(e) {
			let { canvas, width, height } = e;
			// console.log(e);
			echarts.setCanvasCreator(() => canvas);
			this.myChart = echarts.init(canvas, null, {
				width: width,
				height: height
			});
			canvas.setChart(this.myChart);
			this.drawCanvas();
		},
		// 绘图
		drawCanvas() {
			let that = this;
			let temp = that.lose.filter(function (item) {
			  return item != "-"
			});
			let maxLose = Math.max.apply(null, temp);
			let sum = 0;
			for (let i in temp) {
			  sum += temp[i];
			}
			let tempWin = that.win.filter(function (item) {
			  return item != "-"
			});
			let sumWin = 0;
			for (let j in tempWin) {
			  sumWin += tempWin[j];
			}
			let averageLose = sum / (sumWin + 1);
			averageLose = Math.round(averageLose * 100) / 100;
			
			let option = {
				dataZoom: [
					{
						id: 'dataZoomX',
						type: 'slider',
						// xAxisIndex: 0,
						filterMode: 'empty', // 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
						start: 0,
						end: that.label.length > 90 ? 10 : that.label.length > 40 ? 20 : that.label.length < 30 ? (that.label.length < 15 ? 100 : 50) : 40
					}
				],
				backgroundColor: '#f5fbff', //背景色
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						// 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					},
					formatter: function(params) {
						let tar;
						if (params[1].value !== '-') {
							tar = params[1];
						} else {
							tar = params[0];
						}
						return that.issue[tar['dataIndex']] + ':' + tar.name + tar.value;
					}
				},
				legend: {},
				grid: {
					left: '-4%',
					right: '24%',
					bottom: '4%',
					containLabel: true
				},
				xAxis: {
					// type: 'category',
					// splitLine: {show: false},
					data: (function() {
						return that.label;
					})(),
					axisLabel: {
						color: function(value) {
							return value == '输' ? 'green' : 'red';
						}
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: '#cfebfe',
							width: 1 //这里是为了突出显示加上的
						}
					}
				},
				yAxis: {
					type: 'value',
					axisLine: {
						show: true,
						lineStyle: {
							color: '#cfebfe',
							width: 1 //这里是为了突出显示加上的
						}
					},
					splitLine: {
						//网格线
						show: false
					}
				},
				series: [
					{
						// name: '收入',
						type: 'bar',
						stack: '总量',
						itemStyle: {
							normal: {
								color: '#e12121',
								type: 'solid',
								label: {
										show: true, //开启显示
										position: 'top', //在上方显示
									}
							}
						},
						legendHoverLink: true, //---是否启用图例 hover 时的联动高亮
						data: that.win
					},
					{
						// name: '支出',
						type: 'bar',
						stack: '总量',
						itemStyle: {
							normal: {
								color: '#3db83d',
								type: 'solid',
								label: {
										show: true, //开启显示
										position: 'top', //在上方显示
									}
							}
						},
						legendHoverLink: true, //---是否启用图例 hover 时的联动高亮
						data: that.lose,
						markLine: {
							symbol: 'none',
							lineStyle: {
								normal: {
									type: 'dotted'
								}
							},
							data: [
								{
									name: '最大遗漏',
									lineStyle: {
										normal: {
											type: 'dotted',
											color: '#e12120'
										}
									},
									label: {
										normal: {
											show: true,
											position: 'end',
											formatter: '最大遗漏' + maxLose
										}
									},
									yAxis: maxLose
								},
								{
									name: '平均遗漏',
									lineStyle: {
										normal: {
											type: 'dotted',
											color: '#2c80c9'
										}
									},
									label: {
										normal: {
											show: true,
											position: 'end',
											formatter: '平均遗漏' + averageLose
										}
									},
									yAxis: averageLose
								}
							]
						}
					}
				]
			};
			// 使用刚指定的配置项和数据显示图表。
			that.myChart.setOption(option);
			that.$refs.barChart.setChart(that.myChart);
		},
		switchType(item) {
			this.showList = false;
			if (this.currentType.code == item.code) return;
			this.currentType.code = item.code;
			this.currentType.name = item.name;
			// this.currentType['video_url'] = item['url'];
			this.currentType['video_url'] = this.$api.getCurrentUrl(item.code);
			this.currentType.type = Number(item.des.split('-')[2]);
			clearInterval(this.st);
			this.getAboutOnce();
			this.checkedFactor = {
				// 已选中条件
				position: 0,
				betting: 1,
				num: ['1'],
				limit: 100
			};
			this.getFilterFactor();
		},
		actionSheetTap1() {
			let that = this;
			uni.showActionSheet({
				title: '位置选择',
				itemList: that.objectValues(that.factorList.position),
				success: e => {
					that.checkedFactor.position = that.objectKeys(that.factorList.position)[e.tapIndex];
					that.checkedFactor.betting = that.objectKeys(that.factorList.betting[that.checkedFactor.position])[0];
					that.checkedFactor.num = [];
					that.checkedFactor.num.push(that.objectKeys(that.factorList.num[that.checkedFactor.betting])[0]);
				}
			});
		},
		actionSheetTap2() {
			let that = this;
			uni.showActionSheet({
				title: '投注选择',
				itemList: that.objectValues(that.factorList.betting[that.checkedFactor.position]),
				success: e => {
					that.checkedFactor.betting = that.objectKeys(that.factorList.betting[that.checkedFactor.position])[e.tapIndex];
					that.checkedFactor.num = [];
					that.checkedFactor.num.push(that.objectKeys(that.factorList.num[that.checkedFactor.betting])[0]);
				}
			});
		},
		actionSheetTap3() {
			//号码选择 多选
			let that = this;
			that.showNum = true;
			that.tempNoArr = Array.from(that.checkedFactor.num);
			// uni.showActionSheet({
			// 	title: '号码选择',
			// 	itemList: that.objectKeys(that.factorList.num[that.checkedFactor.betting]),
			// 	success: e => {
			// 		that.objectValues(factorList.position)
			// 		that.checkedFactor.betting = that.objectValues(that.factorList.num[that.checkedFactor.betting])[e.tapIndex];
			// 	}
			// });
		},
		actionSheetTap4() {
			let that = this;
			uni.showActionSheet({
				title: '期数选择',
				itemList: ['今天', '100期', '200期', '300期'],
				success: e => {
					let temp = [0, 100, 200, 300];
					that.checkedFactor.limit = temp[e.tapIndex];
				}
			});
		},
		//获取筛选条件列表
		getFilterFactor() {
			let that = this;
			this.$api.getFilterFactor({ code: that.currentType.code }).then(rs => {
				if (rs.code == '0') {
					that.factorList = rs.data.list;
					that.getDataAnalysisDetail();
				}
			});
		},
		getDataAnalysisDetail() {
			let that = this;
			this.$api
				.getDataAnalysisDetail({
					code: that.currentType.code,
					position: that.checkedFactor.position,
					limit: that.checkedFactor.limit == 0 ? '' : that.checkedFactor.limit,
					bettingLimit: that.checkedFactor.betting,
					num: that.checkedFactor.num
				})
				.then(rs => {
					if (rs.code == '0') {
						that.params = rs.data.params;
						that.statistics = rs.data.data.list;
						that.label = rs.data.data.chart.label;
						that.win = rs.data.data.chart.win;
						that.lose = rs.data.data.chart.lose;
						that.issue = rs.data.data.chart.issue;
						that.drawCanvas();
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
		//下期开奖倒计时
		countDown() {
			this.interval = this.allSeconds = Math.floor((new Date(this.aboutList.next_time.replace(/-/g, '/')).getTime() - new Date().getTime() - this.timeDiff) / 1000);
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

.main-div {
	.select-sec {
		background: #fff;
		height: 44px;
		padding-top: 10px;
		vertical-align: middle;
		display: flex;

		.mode {
			line-height: initial;
			height: 24px;
			width: 25%;
			border-right: 1px solid #e5e5e5;
			color: #333333;
			text-align: center;
			uni-text {
				vertical-align: sub;
			}
		}
		.mode:last-child {
			border-right: none;
		}
	}
	.handle-sec {
		line-height: 88rpx;
		height: 88rpx;
		background: #f1f1f1;
		padding: 0 30rpx;
		color: #494949;

		.remind-num {
			border: none;
			border-radius: 10rpx;
			padding: 0 10rpx;
			margin: 0 10rpx;
			height: 40rpx;
			text-align: center;
			color: #0a91dd;
			background: #fff;
			line-height: 40rpx;
			vertical-align: middle;
		}

		.anasysis-btn {
			line-height: 60rpx;
			padding: 0 10rpx;
			margin-top: 14rpx;
			border-radius: 10rpx;
			background: #0a91dd;
			color: #fff;
			float: right;
			height: 60rpx;
		}
	}

	.statistics-sec,
	.pic-sec {
		background: #fff;
		padding: 10px;

		.title-div {
			color: #555555;
			margin-top: 0;
			margin-bottom: 10px;
		}

		.count-line {
			border: 1px solid #e5e5e5;
			padding: 5px 10px;
			vertical-align: middle;
			display: flex;

			.count-item {
				width: 25%;
				border-right: 1px solid #e5e5e5;
				text-align: center;
				color: #a0a0a0;

				uni-text {
					color: #333333;
					font-weight: 500;
				}
			}

			.count-item:nth-child(4n) {
				border-right: none;
			}
		}

		.count-line:nth-child(odd) {
			border-top: none;
		}
	}

	.desc-sec {
		background: #fff;
		padding: 10px;

		h3 {
			color: #2c80c8;
			font-weight: 500;
			font-size: 36rpx;
		}

		p {
			line-height: 40rpx;
			margin-bottom: 20rpx;
			color: #5c5c5c;

			text:first-child {
				color: #333333;
				font-weight: bold;
			}

			.win {
				color: #e12121;
			}

			.lose {
				color: #3db83d;
			}
		}
	}
}
.about-container {
	padding: 0 15px;
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
	.define-btn{
		line-height: 11px;
		background: #e12021;
		color: #fff;
		border-radius: 5px;
		padding: 8px 20px;
		margin-top: 8px;
		margin-right: 15px;
		height: 25px;
	}
}
.u-content {
	// padding-top: 10px;
	.item{
		font-size: 14px;
		    text-align: left;
		    padding:0 20px;
		    border-bottom: 1px solid #ddd;
	}
	.checked{
		background: #fff3f3;
		color: #e32322;
	}
	.checkmark{
		 color:#e12121;
		 font-size: 14px;
		 float: right;
	}
	// .content-item {
	// 	display: flex;
	// 	flex-wrap: wrap;
	// 	padding: 0 15px;
	// 	margin-bottom: 10px;
	// 	.option {
	// 		color: #666;
	// 		text-align: center;
	// 		float: left;
	// 		width: 210rpx;
	// 		height: 60rpx;
	// 		font-size: 24rpx;
	// 		line-height: 60rpx;
	// 		margin-right: 2%;
	// 		border: 1px solid #e4e3e8;
	// 		margin-top: 20rpx;
	// 		border-radius: 6rpx;
	// 		display: inline-block;
	// 		-webkit-box-sizing: border-box;
	// 		box-sizing: border-box;
	// 	}
	// 	.checked {
	// 		border-color: #e12121;
	// 		color: #e12121;
	// 		position: relative;
	// 	}
	// }
}

/* 通用样式 */
.qiun-charts {
	width: 750rpx;
	height: 500rpx;
	background-color: #ffffff;
}

.charts {
	width: 750rpx;
	height: 500rpx;
	background-color: #ffffff;
}
.u-content{
	min-height: 480rpx;
	padding-top: 20rpx;	
}
</style>
