<template name="public-item">
	<view>
		<view class="text"  v-if="itemIndex == 1">
			<view class="lilist" @click="toDetail()">
				<template v-if="rsItem">
					<view class="boxline">
						<view class="box-title">
							<text class="lotName ml2">{{ rsItem.name }}</text>
							<text class="current_issue">{{ rsItem.current_number }}期</text>

							<text class="r_arrow" v-if="allSeconds > 0">
								下期
								<text class="color-red ml2" v-if="hour > 0">{{ hour }}:</text>
								<text class="color-red" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
								<text class="color-red">{{ second }}</text>
							</text>
							<text class="r_arrow color-red" v-if="allSeconds <= 0">开奖中</text>
						</view>
					</view>
					<view class="boxline">
						<view class="box">
							<view
								class="pk10li font_icon"
								v-for="(ccode, index) in rsItem['current_code']"
								:key="index + ccode"
								:class="{
									nubb01: Number(ccode) == 1,
									nubb02: Number(ccode) == 2,
									nubb03: Number(ccode) == 3,
									nubb04: Number(ccode) == 4,
									nubb05: Number(ccode) == 5,
									nubb06: Number(ccode) == 6,
									nubb07: Number(ccode) == 7,
									nubb08: Number(ccode) == 8,
									nubb09: Number(ccode) == 9,
									nubb10: Number(ccode) == 10,
									li_after: index == 9
								}"
							></view>
							<!-- :class="{
								icon1: ccode == '01',
								icon2: ccode == '02',
								icon3: ccode == '03',
								icon4: ccode == '04',
								icon5: ccode == '05',
								icon6: ccode == '06',
								icon7: ccode == '07',
								icon8: ccode == '08',
								icon9: ccode == '09',
								icon10: ccode == '10',
								li_after: index == 9
							}" -->
						</view>
					</view>
					<view class="boxline">
						<view class="box">
							<view class="box-item" v-for="(temp, tempIndex) in rsItem.describe[1].val" :key="rsItem.code + tempIndex">{{ temp }}</view>
							<view class="box-item" style="width: 2rpx;color: #ccc;">|</view>
							<view class="box-item">冠亚和:</view>
							<view class="box-item" v-for="(item, itemIndex) in rsItem.describe[0].val" :key="rsItem.code + item + itemIndex">{{ item }}</view>
						</view>
					</view>
				</template>
			</view>
		</view>
		<view class="text"  v-if="itemIndex == 2">
			<view class="lilist" @click="toDetail()">
				<template v-if="rsItem">
					<view class="boxline">
						<view class="box-title">
							<text class="lotName ml2">{{ rsItem.name }}</text>
							<text class="current_issue">{{ rsItem.current_number }}期</text>

							<text class="r_arrow" v-if="allSeconds > 0">
								下期
								<text class="color-red ml2" v-if="hour > 0">{{ hour }}:</text>
								<text class="color-red" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
								<text class="color-red">{{ second }}</text>
							</text>
							<text class="r_arrow color-red" v-if="allSeconds <= 0">开奖中</text>
						</view>
					</view>
					<view class="boxline" v-if="rsItem.code!='cqhlsx'">
						<view class="box">
							<view class="ssc" :class="rsItem['current_code'].length==5?'ssc_num5':''" v-for="(ccode, index) in rsItem['current_code']" :key="index + ccode">{{ ccode }}</view>
						</view>
					</view>
					<view class="boxline" v-else>
						<view class="box">
							<view class="ssc zodiac" v-for="(ccode, index) in rsItem['current_code']" :key="index + ccode"
							:class="{zodiac0:ccode==0,zodiac1:ccode==1,zodiac2:ccode==2,zodiac3:ccode==3,zodiac4:ccode==4,zodiac5:ccode==5,zodiac6:ccode==6,zodiac7:ccode==7,zodiac8:ccode==8,zodiac9:ccode==9}"
							></view>
						</view>
					</view>
					<view class="boxline">
						<view class="box">
							<view class="box-item" v-for="(temp, tempIndex) in rsItem.describe[1].val" :key="rsItem.code + tempIndex">{{ temp }}</view>
							<view class="box-item" style="width: 2rpx;color: #ccc;">|</view>
							<view class="box-item">总和:</view>
							<view class="box-item" v-for="(item, itemIndex) in rsItem.describe[0].val" :key="rsItem.code + item + itemIndex">{{ item }}</view>
						</view>
					</view>
				</template>
			</view>
		</view>
		<view class="text"  v-if="itemIndex == 3">
			<view class="lilist" @click="toDetail()">
				<template v-if="rsItem">
					<view class="boxline">
						<view class="box-title">
							<text class="lotName ml2">{{ rsItem.name }}</text>
							<text class="current_issue">{{ rsItem.current_number }}期</text>

							<text class="r_arrow" v-if="allSeconds > 0">
								下期
								<text class="color-red ml2" v-if="hour > 0">{{ hour }}:</text>
								<text class="color-red" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
								<text class="color-red">{{ second }}</text>
							</text>
							<text class="r_arrow color-red" v-if="allSeconds <= 0">开奖中</text>
						</view>
					</view>
					<view class="boxline">
						<view class="box">
							<view class="ssc" :class="rsItem['current_code'].length==5?'ssc_num5':''" v-for="(ccode, index) in rsItem['current_code']" :key="index + ccode">{{ ccode }}</view>
						</view>
					</view>
					<view class="boxline">
						<view class="box">
							<view class="box-item" v-for="(temp, tempIndex) in rsItem.describe[1].val" :key="rsItem.code + tempIndex">{{ temp }}</view>
							<view class="box-item">{{ rsItem.describe[2].val }}</view>
							<view class="box-item">{{ rsItem.describe[3].val }}</view>
							<view class="box-item">{{ rsItem.describe[4].val }}</view>
							<view class="box-item" style="width: 2rpx;color: #ccc;">|</view>
							<view class="box-item">总和:</view>
							<view class="box-item" v-for="(item, itemIndex) in rsItem.describe[0].val" :key="rsItem.code + item + itemIndex">{{ item }}</view>
						</view>
					</view>
				</template>
			</view>
		</view>
		<view class="text"  v-if="itemIndex == 4">
			<view class="lilist" @click="toDetail()">
				<template v-if="rsItem">
					<view class="boxline">
						<view class="box-title">
							<text class="lotName ml2">{{ rsItem.name }}</text>
							<text class="current_issue">{{ rsItem.current_number }}期</text>

							<text class="r_arrow" v-if="allSeconds > 0">
								下期
								<text class="color-red ml2" v-if="hour > 0">{{ hour }}:</text>
								<text class="color-red" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
								<text class="color-red">{{ second }}</text>
							</text>
							<text class="r_arrow color-red" v-if="allSeconds <= 0">开奖中</text>
						</view>
					</view>
					<view class="boxline">
						<view class="box">
							<view
								class="k3"
								v-for="(ccode, index) in rsItem['current_code']"
								:key="index + ccode"
								:class="{ num1: ccode == '1', num2: ccode == '2', num3: ccode == '3', num4: ccode == '4', num5: ccode == '5', num6: ccode == '6' }"
							></view>
							<!-- ccode -->
						</view>
					</view>
					<view class="boxline">
						<view class="box">
							<view class="box-item">总和:</view>
							<view class="box-item" v-for="(item, itemIndex) in rsItem.describe[0].val" :key="rsItem.code + item + itemIndex">{{ item }}</view>
						</view>
					</view>
				</template>
			</view>
		</view>
		<view class="text"  v-if="itemIndex == 5">
			<view class="lilist" @click="toDetail()">
				<template v-if="rsItem">
					<view class="boxline">
						<view class="box-title">
							<text class="lotName ml2">{{ rsItem.name }}</text>
							<text class="current_issue">{{ rsItem.current_number }}期</text>

							<text class="r_arrow" v-if="allSeconds > 0">
								下期
								<text class="color-red ml2" v-if="hour > 0">{{ hour }}:</text>
								<text class="color-red" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
								<text class="color-red">{{ second }}</text>
							</text>
							<text class="r_arrow color-red" v-if="allSeconds <= 0">开奖中</text>
						</view>
					</view>
					<view class="boxline">
						<view class="box">
							<view class="ssc" v-for="(ccode, index) in rsItem['current_code']" :key="index + ccode">{{ ccode }}</view>
						</view>
					</view>
					<view class="boxline">
						<view class="box">
							<view class="box-item" v-for="(temp, tempIndex) in rsItem.describe[1].val" :key="rsItem.code + tempIndex">{{ temp }}</view>
							<view class="box-item" style="width: 2rpx;color: #ccc;">|</view>
							<view class="box-item">总和:</view>
							<view class="box-item" v-for="(item, itemIndex) in rsItem.describe[0].val" :key="rsItem.code + item + itemIndex">{{ item }}</view>
						</view>
					</view>
				</template>
			</view>
		</view>
		<view class="text"  v-if="itemIndex == 6">
			<view class="lilist" @click="toDetail()">
				<template v-if="rsItem">
					<view class="boxline">
						<view class="box-title">
							<text class="lotName ml2">{{ rsItem.name }}</text>
							<text class="current_issue">{{ rsItem.current_number }}期</text>

							<text class="r_arrow" v-if="allSeconds > 0">
								下期
								<text class="color-red ml2" v-if="hour > 0">{{ hour }}:</text>
								<text class="color-red" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
								<text class="color-red">{{ second }}</text>
							</text>
							<text class="r_arrow color-red" v-if="allSeconds <= 0">开奖中</text>
						</view>
					</view>
					<view class="boxline">
						<view class="box">
							<view class="ssc" v-for="(ccode, index) in rsItem['current_code']" :key="index + ccode" :class="{ lastBall: index == 6 }">{{ ccode }}</view>
						</view>
					</view>
					<view class="boxline">
						<view class="box">
							<!-- 	<view class="box-item" v-for="(temp, tempIndex) in rsItem.describe[1].val" :key="rsItem.code + tempIndex">{{ temp }}</view>
							<view class="box-item" style="width: 2rpx;color: #ccc;">|</view> -->
							<view class="box-item">总和:</view>
							<view class="box-item" v-for="(item, itemIndex) in rsItem.$apidescribe[0].val" :key="rsItem.code + item + itemIndex">{{ item }}</view>
						</view>
					</view>
				</template>
			</view>
		</view>
		<view class="text"  v-if="itemIndex == 7">
			<view class="lilist" @click="toDetail()">
				<template v-if="rsItem">
					<view class="boxline">
						<view class="box-title">
							<text class="lotName ml2">{{ rsItem.name }}</text>
							<text class="current_issue">{{ rsItem.current_number }}期</text>

							<text class="r_arrow" v-if="allSeconds > 0">
								下期
								<text class="color-red ml2" v-if="hour > 0">{{ hour }}:</text>
								<text class="color-red" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
								<text class="color-red">{{ second }}</text>
							</text>
							<text class="r_arrow color-red" v-if="allSeconds <= 0">开奖中</text>
						</view>
					</view>
					<view class="boxline">
						<view class="box">
							<view class="ssc" v-for="(ccode, index) in rsItem['current_code']" v-if="index<=9" :key="index + ccode" :class="Number(ccode)>40&&index<20? 'bigBall':(index==20?'lastBall':'')">{{ ccode }}</view>
							</br>
							<view class="ssc" v-for="(ccode, index) in rsItem['current_code']" v-if="index>9" :key="index + ccode" :class="Number(ccode)>40&&index<20? 'bigBall':(index==20?'lastBall':'')">{{ ccode }}</view>
						</view>
					</view>
					<view class="boxline">
						<view class="box">
							<!-- 	<view class="box-item" v-for="(temp, tempIndex) in rsItem.describe[1].val" :key="rsItem.code + tempIndex">{{ temp }}</view>
							<view class="box-item" style="width: 2rpx;color: #ccc;">|</view> -->
							<view class="box-item">总和:</view>
							<view class="box-item" v-for="(item, itemIndex) in rsItem.describe[0].val" :key="rsItem.code + item + itemIndex">{{ item }}</view>
						</view>
					</view>
				</template>
			</view>
		</view>
		<view class="text"  v-if="itemIndex == 8">
			<view class="lilist" @click="toDetail()">
				<template v-if="rsItem">
					<view class="boxline">
						<view class="box-title">
							<text class="lotName ml2">{{ rsItem.name }}</text>
							<text class="current_issue">{{ rsItem.current_number }}期</text>

							<text class="r_arrow" v-if="allSeconds > 0">
								下期
								<text class="color-red ml2" v-if="hour > 0">{{ hour }}:</text>
								<text class="color-red" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
								<text class="color-red">{{ second }}</text>
							</text>
							<text class="r_arrow color-red" v-if="allSeconds <= 0">开奖中</text>
						</view>
					</view>
					<view class="boxline">
						<view class="box">
							<view class="ssc" v-for="(ccode, index) in rsItem['current_code']" :key="index + ccode">{{ ccode }}</view>
						</view>
					</view>
					<view class="boxline">
						<view class="box">
							<!-- 	<view class="box-item" v-for="(temp, tempIndex) in rsItem.describe[1].val" :key="rsItem.code + tempIndex">{{ temp }}</view>
							<view class="box-item" style="width: 2rpx;color: #ccc;">|</view> -->
							<view class="box-item">总和:</view>
							<view class="box-item" v-for="(item, itemIndex) in rsItem.describe[3].val" :key="rsItem.code + item + itemIndex">{{ item }}</view>
						</view>
					</view>
				</template>
			</view>
		</view>
		<view class="text"  v-if="itemIndex == 9">
			<view class="lilist" @click="toDetail()">
				<template v-if="rsItem">
					<view class="boxline">
						<view class="box-title">
							<text class="lotName ml2">{{ rsItem.name }}</text>
							<text class="current_issue">{{ rsItem.current_number }}期</text>

							<text class="r_arrow" v-if="allSeconds > 0">
								下期
								<text class="color-red ml2" v-if="hour > 0">{{ hour }}:</text>
								<text class="color-red" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
								<text class="color-red">{{ second }}</text>
							</text>
							<text class="r_arrow color-red" v-if="allSeconds <= 0">开奖中</text>
						</view>
					</view>
					<view class="boxline">
						<view class="box">
							<view class="ssc ssc_num5" v-if="rsItem.code=='tcplw'" v-for="(ccode, index) in rsItem['current_code']" :key="index + ccode" :class="{ lastBall: index == 6 }">{{ ccode }}</view>
							<view class="ssc" v-else v-for="(ccode, index) in rsItem['current_code']" :key="index + ccode">{{ ccode }}</view>
						</view>
					</view>
					<view class="boxline">
						<view class="box">
							<!-- 	<view class="box-item" v-for="(temp, tempIndex) in rsItem.describe[1].val" :key="rsItem.code + tempIndex">{{ temp }}</view>
							<view class="box-item" style="width: 2rpx;color: #ccc;">|</view> -->
							<view class="box-item">总和:</view>
							<view class="box-item" v-for="(item, itemIndex) in rsItem.describe[0].val" :key="rsItem.code + item + itemIndex">{{ item }}</view>
						</view>
					</view>
				</template>
			</view>
		</view>
		<view class="text"  v-if="itemIndex == 10">
			<view class="lilist" @click="toDetail()">
				<template v-if="rsItem">
					<view class="boxline">
						<view class="box-title">
							<text class="lotName ml2">{{ rsItem.name }}</text>
							<text class="current_issue">{{ rsItem.current_number }}期</text>

							<text class="r_arrow" v-if="allSeconds > 0">
								下期
								<text class="color-red ml2" v-if="hour > 0">{{ hour }}:</text>
								<text class="color-red" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
								<text class="color-red">{{ second }}</text>
							</text>
							<text class="r_arrow color-red" v-if="allSeconds <= 0">开奖中</text>
						</view>
					</view>
					<view class="boxline">
						<view class="box">
							<view class="ssc" v-for="(ccode, index) in rsItem['current_code']" :key="index + ccode" :class="{ lastBall: index == 7 }">{{ ccode }}</view>
						</view>
					</view>
					<view class="boxline">
						<view class="box">
							<!-- 	<view class="box-item" v-for="(temp, tempIndex) in rsItem.describe[1].val" :key="rsItem.code + tempIndex">{{ temp }}</view>
							<view class="box-item" style="width: 2rpx;color: #ccc;">|</view> -->
							<view class="box-item">总和:</view>
							<view class="box-item" v-for="(item, itemIndex) in rsItem.describe[0].val" :key="rsItem.code + item + itemIndex">{{ item }}</view>
						</view>
					</view>
				</template>
			</view>
		</view>
		<view class="text"  v-if="itemIndex == 11">
			<view class="lilist" @click="toDetail()">
				<template v-if="rsItem">
					<view class="boxline">
						<view class="box-title">
							<text class="lotName ml2">{{ rsItem.name }}</text>
							<text class="current_issue">{{ rsItem.current_number }}期</text>

							<text class="r_arrow" v-if="allSeconds > 0">
								下期
								<text class="color-red ml2" v-if="hour > 0">{{ hour }}:</text>
								<text class="color-red" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
								<text class="color-red">{{ second }}</text>
							</text>
							<text class="r_arrow color-red" v-if="allSeconds <= 0">开奖中</text>
						</view>
					</view>
					<view class="boxline">
						<view class="box">
							<view class="ssc" v-for="(ccode, index) in rsItem['current_code']" :key="index + ccode">{{ ccode }}</view>
						</view>
					</view>
					<view class="boxline">
						<view class="box">
							<view class="box-item" v-for="(temp, tempIndex) in rsItem.describe[2].val" :key="rsItem.code + tempIndex">{{ temp }}</view>
							<view class="box-item" style="width: 2rpx;color: #ccc;">|</view>
							<view class="box-item">总和:</view>
							<view class="box-item" v-for="(item, itemIndex) in rsItem.describe[0].val" :key="rsItem.code + item + itemIndex">{{ item }}</view>
							<view class="box-item" v-for="(item, itemIndex) in rsItem.describe[1].val" :key="rsItem.code + item + itemIndex">{{ item }}</view>
						</view>
					</view>
				</template>
			</view>
		</view>
		<view class="text"  v-if="itemIndex == 12">
			<view class="lilist" @click="toDetail()">
				<template v-if="rsItem">
					<view class="boxline">
						<view class="box-title">
							<text class="lotName ml2">{{ rsItem.name }}</text>
							<text class="current_issue">{{ rsItem.current_number }}期</text>

							<text class="r_arrow" v-if="allSeconds > 0">
								下期
								<text class="color-red ml2" v-if="hour > 0">{{ hour }}:</text>
								<text class="color-red" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
								<text class="color-red">{{ second }}</text>
							</text>
							<text class="r_arrow color-red" v-if="allSeconds <= 0">开奖中</text>
						</view>
					</view>
					<view class="boxline">
						<!-- 								v-for="(ccode, index) in rsItem['current_code']" -->
						<view class="box">
							<template v-for="(ccode, index) in rsItem['current_code']">
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
							</template>
							<view
								class="pc-dd"
								:class="{
									ball10: rsItem.describe[0].val[0] % 10 == 0,
									ball1: rsItem.describe[0].val[0] % 10 == 1,
									ball2: rsItem.describe[0].val[0] % 10 == 2,
									ball3: rsItem.describe[0].val[0] % 10 == 3,
									ball4: rsItem.describe[0].val[0] % 10 == 4,
									ball5: rsItem.describe[0].val[0] % 10 == 5,
									ball6: rsItem.describe[0].val[0] % 10 == 6,
									ball7: rsItem.describe[0].val[0] % 10 == 7,
									ball8: rsItem.describe[0].val[0] % 10 == 8,
									ball9: rsItem.describe[0].val[0] % 10 == 9
								}"
							>
								{{ rsItem.describe[0].val[0] }}
							</view>
						</view>
					</view>
					<view class="boxline">
						<view class="box">
							<!-- 	<view class="box-item" v-for="(temp, tempIndex) in rsItem.describe[1].val" :key="rsItem.code + tempIndex">{{ temp }}</view>
							<view class="box-item" style="width: 2rpx;color: #ccc;">|</view> -->
							<view class="box-item">总和:</view>
							<view class="box-item" v-for="(item, itemIndex) in rsItem.describe[0].val" :key="rsItem.code + item + itemIndex">{{ item }}</view>
						</view>
					</view>
				</template>
			</view>
		</view>
		<view class="text"  v-if="itemIndex == 13">
			<view class="lilist" @click="toDetail()">
				<template v-if="rsItem">
					<view class="boxline">
						<view class="box-title">
							<text class="lotName ml2">{{ rsItem.name }}</text>
							<text class="current_issue">{{ rsItem.current_number }}期</text>
		
							<text class="r_arrow" v-if="allSeconds > 0">
								下期
								<text class="color-red ml2" v-if="hour > 0">{{ hour }}:</text>
								<text class="color-red" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
								<text class="color-red">{{ second }}</text>
							</text>
							<text class="r_arrow color-red" v-if="allSeconds <= 0">开奖中</text>
						</view>
					</view>
					<view class="boxline">
						<view class="box">
							<template v-for="(ccode, index) in rsItem['current_code']">
								<view :key="6" v-if="index==6" class="font_icon iconjia" style="font-size: 24px;display: inline-block;width: 26px;height: 26px;line-height: 26px;float: left;margin-right: 10rpx;margin-top: 4px;display: inline-block;border-radius: 50%;"></view>
								<view  :key="index + ccode" class="lhc" :class="{xglhcRed:rsItem.color[index]==1,xglhcGreen:rsItem.color[index]==2,xglhcBlue:rsItem.color[index]==3}" style="margin-right: 10rpx;">{{ Number(ccode)<10?'0'+ Number(ccode) : ccode }}</view>
							</template>
						</view>
					</view>
					<view class="boxline">
						<view class="box" style="margin: 0 auto;">
							<template v-for="(temp, tempIndex) in rsItem['an']" >
								<view :key="6" style="visibility: hidden;margin-right: 20rpx;" v-if="tempIndex==6" class="plus"></view>
								<view :key="rsItem.code + tempIndex" class="lhcOther" style="margin-right: 10rpx;">{{ temp }}</view>
							</template>					
						</view>
					</view>
					<view class="boxline">
						<view class="box" style="margin: -18rpx auto 0;">
							<template v-for="(temp, tempIndex) in rsItem['five_elements']" >
								<view :key="6" style="visibility: hidden;margin-right: 20rpx;" v-if="tempIndex==6" class="plus"></view>
								<view :key="rsItem.code + tempIndex" class="lhcOther">{{ temp }}</view>
							</template>		
						</view>
					</view>
				</template>
			</view>
		</view>
		<view class="text"  v-if="itemIndex == 14">
			<view class="lilist" @click="toDetail(rsItem.code)">
				<template v-if="rsItem">
					<view class="boxline">
						<view class="box-title">
							<text class="lotName ml2">{{ rsItem.name }}</text>
							<text class="current_issue">{{ rsItem.current_number }}期</text>
		
							<text class="r_arrow" v-if="allSeconds > 0">
								下期
								<text class="color-red ml2" v-if="hour > 0">{{ hour }}:</text>
								<text class="color-red" :class="{ ml2: hour <= 0 }">{{ minute }}:</text>
								<text class="color-red">{{ second }}</text>
							</text>
							<text class="r_arrow color-red" v-if="allSeconds <= 0">开奖中</text>
						</view>
					</view>
					<view class="boxline">
						<view class="box">
							<template v-for="(ccode, index) in rsItem['current_code']" v-if="rsItem.code == 'xglhc'">
								<view :key="6" v-if="index==6" class="font_icon iconjia" style="font-size: 24px;display: inline-block;width: 26px;height: 26px;line-height: 26px;float: left;margin-right: 5px;margin-top: 4px;display: inline-block;border-radius: 50%;"></view>
								<view  :key="index + ccode" class="lhc" :class="{xglhcRed:rsItem.color[index]==1,xglhcGreen:rsItem.color[index]==2,xglhcBlue:rsItem.color[index]==3}">{{ Number(ccode)<10?'0'+ Number(ccode) : ccode  }}</view>
							</template>
							<template v-for="(ccode, index) in rsItem['current_code']" v-if="rsItem.code == 'amlhc'" > 
								<view :key="6" v-if="index==6" class="font_icon iconjia" style="font-size: 24px;display: inline-block;width: 26px;height: 26px;line-height: 26px;float: left;margin-right: 5px;margin-top: 4px;display: inline-block;border-radius: 50%;"></view>
								<view  :key="index + ccode" class="lhc" :class="{xglhcRed:rsItem.color[index]==1,xglhcGreen:rsItem.color[index]==2,xglhcBlue:rsItem.color[index]==3}">{{ Number(ccode)<10?'0'+ Number(ccode) : ccode  }}</view>
							</template>
						</view>
					</view>
					<view class="boxline">
						<view class="box" style="margin: 0 auto;">
							<template v-for="(temp, tempIndex) in rsItem['chinese_zodiac']" >
								<view :key="6" style="visibility: hidden;" v-if="tempIndex==6" class="plus"></view>
								<view :key="rsItem.code + tempIndex" class="lhcOther" >{{ temp }}</view>
							</template>					
						</view>
					</view>
					<view class="boxline">
						<view class="box" style="margin: -18rpx auto 0;">
							<template v-for="(temp, tempIndex) in rsItem['five_elements']" >
								<view :key="6" style="visibility: hidden;" v-if="tempIndex==6" class="plus"></view>
								<view :key="rsItem.code + tempIndex" class="lhcOther" >{{ temp }}</view>
							</template>		
						</view>
					</view>
				</template>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	name: 'public-item',
	//属性
	props: ['aboutItem'],
	data() {
		return {
			isLoading: false,
			itemIndex: 0,
			timeDiff: 0, //服务器与客户端时间差
			allSeconds: 0, //距离下期开奖时间（秒）(动态)
			interval: 0, //接口返回数据时距离下期开奖时间（秒）
			hour: 0, //时
			minute: '00', //分
			second: '00', //秒
			st: null,
			rsItem: null,
			intervalFirst:null,
			intervalSecond:null
		};
	},
	computed: {
		currentItem: {
			get() {
				return this.aboutItem;
			},
			set(val) {
				return this.rsItem;
				//grants_改变由父组件控制
				// this.$emit("on-change-grant", val);
			}
		}
	},
	//组件生命周期
	created: function(e) {
		this.timeDiff = Number(uni.getStorageSync('timeDiff'));
		this.timeDiff = isNaN(this.timeDiff) ? 0 : this.timeDiff;
		if (this.currentItem) {
			this.itemIndex = this.$api.getAboutItemIndex(this.currentItem.code);
			this.getAboutOnce();
		}
	},
	beforeDestroy: function() {
		clearInterval(this.intervalFirst);
		clearInterval(this.intervalSecond);
	},
	methods: {
		toDetail(code) {
			if(this.itemIndex>0){
				if (this.itemIndex != 14) {
					uni.navigateTo({
						url:
							'/pages/public/'+this.rsItem.des+'/'+this.rsItem.des+'?name=' +
							this.rsItem.name +
							'&code=' +
							this.rsItem.code +
							'&video_url=' +
							this.rsItem.url +
							'&sortKey=' +
							this.rsItem.sortKey
					});
				} else {
					var url = this.aboutItem.des;
					if(url.indexOf("http") == -1){
						url = "//" + url;
					}
					if(code=='xglhc'){
						url = url + '/h';
					}else if(code == 'amlhc'){
						url = url + '/g';
					}
					window.open(url);
				}
			}
		},
		// 当前彩种即时开奖数据
		getAboutOnce() {
			let that = this;
			if (that.itemIndex != 14) {
				that.$api.getAboutOnce({ code: that.currentItem.code }).then(rs => {
					if (rs.code == 0) {
						that.rsItem = eval('(' + (JSON.stringify(that.currentItem) + JSON.stringify(rs.data)).replace(/}{/, ',') + ')');
						that.allSeconds = Math.floor((new Date(rs.data.next_time.replace(/-/g, '/')).getTime() - new Date().getTime() - that.timeDiff) / 1000);
						if(that.allSeconds<=0){
							clearInterval(that.intervalSecond);
							that.intervalSecond = null;							
							that.intervalFirst = setTimeout(()=>{
								that.getAboutOnce();
							},2000);								
						}else{
							if(!that.intervalSecond){
								that.setCountDown(that.allSeconds);	
							}	
						}						
					}
				});
			} else {
				that.$api.getHKWinNumber({ code: that.currentItem.code }).then(rs => {
					if (!rs.code) {
						that.rsItem = rs.data;
						that.allSeconds = Math.floor((new Date(that.rsItem.next_time.replace(/-/g, '/')).getTime() - new Date().getTime() - that.timeDiff) / 1000);
						if(that.allSeconds<=0){
							clearInterval(that.intervalSecond);
							that.intervalSecond = null;
							that.intervalFirst = setTimeout(()=>{
								that.getAboutOnce();
							},2000);								
						}else{
							if(!that.intervalSecond){
								that.setCountDown(that.allSeconds);	
							}	
						}
					}
				});
			}
		},
		//开奖倒计时
		setCountDown(seconds){			
			let that = this;
			let temSeconds = seconds;
			that.intervalSecond = setInterval(() => {	
				temSeconds-=1;
				if(temSeconds==0){
					clearInterval(this.intervalSecond);
					that.getAboutOnce();			
				}else{
					that.hour = Math.floor(temSeconds / 3600);
					let lastSeconds = temSeconds % 3600;
					that.minute = (lastSeconds / 60 < 10 ? '0' : '') + Math.floor(lastSeconds / 60);
					that.second = (lastSeconds % 60 < 10 ? '0' : '') + (lastSeconds % 60);
				}
				
			}, 1000);
		}
	}
};
</script>
<style lang="scss">
.text {
	margin: 16rpx;
	text-align: center;
	color: #555;
	position: relative;
}
.text-hover {
	.lilist {
		background-color: #eee;
	}
}
.lilist {
	border-radius: 5px;
	width: 100%;
	/* height: auto; */
	background: #fff;
	padding: 7px 10px 0 10px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	font-size: 13px;
	color: #666;
	/* margin-top: 10px; */
	// min-height: 110px;
	max-height: 150px;
	.boxline {
		width: 100%;
		height: auto;
		display: -webkit-box;
		position: -webkit-sticky;
		.box-title {
			text-align: left;
			-webkit-box-flex: 3;
			-webkit-flex: 3;
			-ms-flex: 3;
			flex: 3;
			img {
				height: 30px;
				vertical-align: middle;
			}
			.lotName {
				color: #333333;
				margin-right: 5px;
				font-size: 14px;
				font-weight: 400;
			}
			.current_issue {
				font-style: normal;
				color: #3a9999;
				font-size: 14px;
				font-weight: 400;
			}
			.r_arrow {
				color: #999999;
				float: right;
				overflow: hidden;
				display: inline-block;
				height: 21px;
				position: relative;
				font-size: 13px;
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
		.box {
			margin: 3px auto 2px;
			display: block;
			
			.box-item {
				display: inline-block;
				max-width: 96rpx;
				min-width: 10rpx;
				height: 54rpx;
				margin-right: 10rpx;
				text-align: center;
				color: #889095;
			}
			.box-item:last-child {
				margin-right: 0;
			}
			
		}
	}
}

.lhc{
	font-family: impact;
	width: 52rpx;
	height: 52rpx;
	line-height: 52rpx;
	float: left;
	margin-right: 10rpx;
	margin-top: 4px;
	display: inline-block;
	border-radius: 50%;
	font-size: 26rpx;	
}
.lhcGreen{
	color: #fff;
	background-color: #32b969;
}
.lhcBlue{
	color: #fff;
	background-color: #1a8fd8;
}
.lhcRed{
	color: #fff;
	background-color: #f32837;	
}
.xglhcGreen{
	color: #444;
	background: url(../../../static/green_m.png) no-repeat;
	background-size: 100% 100%;
}
.xglhcBlue{
	color: #444;
	background: url(../../../static/blue_m.png) no-repeat;
	background-size: 100% 100%;
}
.xglhcRed{
	color: #444;
	background: url(../../../static/red_m.png) no-repeat;
	background-size: 100% 100%;
}
.jslhcGreen{
	color: #fff;
	background-color: #7AB264;
}
.jslhcBlue{
	color: #fff;
	background-color: #4AA6E2;

}
.jslhcRed{
	color: #fff;
	background-color: #EF5858;
}
.lhcOther{
	width: 52rpx;
	height: 52rpx;
	color: #889095;
	float: left;
	margin-right: 10rpx;
	display: inline-block;	
}
</style>
