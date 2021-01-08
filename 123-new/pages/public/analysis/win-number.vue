<template name="win-number">
	<view class="container" v-if="mainList && mainList.length > 0">
		<!-- PK10系列 -->
		<template v-if="showType == 1">
			<view class="container-title">
				<view class="title-left">
					<text class="item">时间</text>
					<text class="item">期数</text>
				</view>
				<view class="title-right">
					<text class="item" :class="{ checked: spanType == 0 }" @tap.stop="spanType = 0">号码</text>
					<text class="item" :class="{ checked: spanType == 1 }" @tap.stop="spanType = 1">大小</text>
					<text class="item" :class="{ checked: spanType == 2 }" @tap.stop="spanType = 2">单双</text>
					<text class="item" :class="{ checked: spanType == 3 }" @tap.stop="spanType = 3">冠亚和/龙虎</text>
				</view>
			</view>
			<view class="content">
				<view class="detail-line" :key="index" v-for="(item, index) in mainList">
					<view class="left-part">
						<text class="left-time">{{ item.time.substring(11, 16) }}</text>
						<text class="left-no">{{ item.no.toString().substring(item.no.toString().length-6)}}</text>
					</view>
					<view class="right-part">
						<template v-if="spanType == 0">
							<view
								class="pk10_sm"
								v-for="(num, nIndex) in item.num"
								:class="{
									nub01: Number(num) == 1,
									nub02: Number(num) == 2,
									nub03: Number(num) == 3,
									nub04: Number(num) == 4,
									nub05: Number(num) == 5,
									nub06: Number(num) == 6,
									nub07: Number(num) == 7,
									nub08: Number(num) == 8,
									nub09: Number(num) == 9,
									nub10: Number(num) == 10,
								}"
							>
								<i style="display: none;">{{ num }}</i>
							</view>
						</template>
						<template v-if="spanType == 1">
							<view class="pk10_sm" :key="nIndex" v-for="(num, nIndex) in item.num" :class="{ bdd: num > max / 2, sst: num <= max / 2 }">
								{{ num > max / 2 ? '大' : '小' }}
							</view>
						</template>
						<template v-if="spanType == 2">
							<view class="pk10_sm" :key="nIndex" v-for="(num, nIndex) in item.num" :class="{ bdd: num % 2 == 0, sst: num % 2 == 1 }">
								{{ num % 2 == 0 ? '双' : '单' }}
							</view>
						</template>
						<template v-if="spanType == 3">
							<view class="pk10_sm" :key="pIndex" v-for="(p, pIndex) in item.topazTotalDesc">{{ p }}</view>
							<view class="pk10_sm hubg" :key="item.no+tIndex" v-for="(t, tIndex) in item.pred" :class="{ bdd: t == '龙', sst: t == '虎' }">{{ t }}</view>
						</template>
					</view>
				</view>
			</view>
		</template>
		<!-- 时时彩系列 -->
		<template v-if="showType == 2">
			<view class="container-title">
				<view class="title-left">
					<text class="item">时间</text>
					<text class="item">期数</text>
				</view>
				<view class="title-right">
					<text class="item" :class="{ checked: spanType == 0 }" @tap.stop="spanType = 0">号码</text>
					<text class="item" :class="{ checked: spanType == 1 }" @tap.stop="spanType = 1">大小</text>
					<text class="item" :class="{ checked: spanType == 2 }" @tap.stop="spanType = 2">单双</text>
					<text class="item" :class="{ checked: spanType == 3 }" @tap.stop="spanType = 3">总和/形态</text>
				</view>
			</view>
			<view class="content">
				<view class="detail-line" :key="index" v-for="(item, index) in mainList">
					<view class="left-part">
						<text class="left-time">{{ item.time.substring(11, 16) }}</text>
						<text class="left-no">{{ item.no.toString().substring(item.no.toString().length-6)}}</text>
					</view>
					<view class="right-part">
						<template v-if="spanType == 0">
							<template v-if="code != 'cqhlsx' && code!='gxklsf'">
								<view class="ssc_sm ssc_sm5" style="margin: 0 20rpx;" v-for="(num, nIndex) in item.num" :key="'i'+nIndex">{{ num }}</view>
							</template>
							<template v-else-if="code=='gxklsf'">
								<view class="ssc_sm"  style="margin: 0 20rpx;" v-for="(num, nIndex) in item.num" :key="'i'+nIndex">{{ num }}</view>
							</template>
							<template v-if="code == 'cqhlsx'">
								<view
									style="margin: 0 16rpx;height:24px;"
									class="ssc zodiac_sm"
									v-for="(ccode, index) in item.num"
									:key="index + ccode"
									:class="{
										zodiacs0: ccode == 0,
										zodiacs1: ccode == 1,
										zodiacs2: ccode == 2,
										zodiacs3: ccode == 3,
										zodiacs4: ccode == 4,
										zodiacs5: ccode == 5,
										zodiacs6: ccode == 6,
										zodiacs7: ccode == 7,
										zodiacs8: ccode == 8,
										zodiacs9: ccode == 9
									}"
								></view>
							</template>
						</template>
						<template v-if="spanType == 1">
							<view
								class="ssc_sm"
								:key="nIndex"
								style="margin: 0 20rpx;"
								v-for="(num, nIndex) in item.num"
								:class="{ bdd: Number(num) > max / 2, sst: Number(num) <= max / 2 }"
							>
								{{ Number(num) > max / 2 ? '大' : '小' }}
							</view>
						</template>
						<template v-if="spanType == 2">
							<view
								class="ssc_sm"
								:key="nIndex"
								style="margin: 0 20rpx;"
								v-for="(num, nIndex) in item.num"
								:class="{ bdd: Number(num) % 2 == 0, sst: Number(num) % 2 == 1 }"
							>
								{{ Number(num) % 2 == 0 ? '双' : '单' }}
							</view>
						</template>
						<template v-if="spanType == 3">
							<view class="sscOther" style="color:#f12d35;width: 43px;">{{ item.total }}</view>
							<view class="sscOther" style="color:#f12d35;width: 43px;">{{ item.size }}</view>
							<view class="sscOther" style="color:#184dd5;width: 43px;">{{ item.oddEven }}</view>
							<view class="sscOther" style="color:#184dd5;width: 43px;">{{ item.pred }}</view>
							<!-- <view class="sscOther" style="color:#184dd5;" v-if="item.desc && item.desc.front">{{ item.desc.front }}</view>
							<view class="sscOther" style="color:#184dd5;" v-if="item.desc && item.desc.middle">{{ item.desc.middle }}</view>
							<view class="sscOther" style="color:#184dd5;" v-if="item.desc && item.desc.back">{{ item.desc.back }}</view> -->
						</template>
					</view>
				</view>
			</view>
		</template>
		
		<template v-if="showType==4">
			<view class="container-title">
				<view class="title-left">
					<text class="item">时间</text>
					<text class="item">期数</text>
				</view>
				<view class="title-right">
					<text class="item">号码</text>
					<text class="item">&nbsp;</text>
					<text class="item">大小/单双</text>
					<text class="item">鱼虾蟹</text>
				</view>
			</view>
			<view class="content">
				<view class="detail-line" :key="index" v-for="(item, index) in mainList">
					<view class="left-part">
						<text class="left-time">{{ item.time.substring(11, 16) }}</text>
						<text class="left-no">{{ item.no.toString().length < 9 ? item.no : item.no.toString().substring(4)}}</text>
					</view>
					<view class="right-part">
						<view class="k3_sm" v-for="tem in item.num" :class="{nums1:tem=='1',nums2:tem=='2',nums3:tem=='3',nums4:tem=='4',nums5:tem=='5',nums6:tem=='6'}"></view>
						<view class="k3_sm_other" style="color:#f12d35;">{{item.total}}</view>
						<view class="k3_sm_other" style="color:#f12d35;">{{item.size}}</view>
						<view class="k3_sm_other" style="color:#666;">{{item.oddEven}}</view>
						<view class="k3_sm_other" style="color:#333;"  v-for="p in item.desc">{{p}}</view>
					</view>
				</view>
			</view>
		</template>
		
		<!--极速快乐十分(jsklsf)  广东快乐十分(gdklsf) 天津快乐十分(tjklsf) 广西快乐十分(gxklsf) 澳洲幸运8（ajxyb）（5）-->
		<template v-if="showType == 5">
			<view class="container-title">
				<view class="title-left">
					<text class="item">时间</text>
					<text class="item">期数</text>
				</view>
				<view class="title-right">
					<text class="item" :class="{ checked: spanType == 0 }" @tap.stop="spanType = 0">号码</text>
					<text class="item" :class="{ checked: spanType == 1 }" @tap.stop="spanType = 1">大小</text>
					<text class="item" :class="{ checked: spanType == 2 }" @tap.stop="spanType = 2">单双</text>
					<text class="item" :class="{ checked: spanType == 3 }" @tap.stop="spanType = 3">总和/形态</text>
				</view>
			</view>
			<view class="content">
				<view class="detail-line" :key="index" v-for="(item, index) in mainList">
					<view class="left-part">
						<text class="left-time">{{ item.time.substring(11, 16) }}</text>
						<text class="left-no">{{ item.no.toString().substring(item.no.toString().length-6) }}</text>
					</view>
					<view class="right-part">
						<template v-if="spanType == 0 && item.num && item.num.length > 0">
							<view class="ssc_sm" :key="nIndex" style="margin: 0 6rpx;" v-for="(num, nIndex) in item.num">{{ num }}</view>
						</template>
						<template v-if="spanType == 1">
							<view
								class="ssc_sm"
								:key="nIndex"
								style="margin: 0 6rpx;"
								v-for="(num, nIndex) in item.num"
								:class="{ bdd: Number(num) > max / 2, sst: Number(num) <= max / 2 }"
							>
								{{ Number(num) > max / 2 ? '大' : '小' }}
							</view>
						</template>
						<template v-if="spanType == 2">
							<view
								class="ssc_sm"
								:key="nIndex"
								style="margin: 0 6rpx;"
								v-for="(num, nIndex) in item.num"
								:class="{ bdd: Number(num) % 2 == 0, sst: Number(num) % 2 == 1 }"
							>
								{{ Number(num) % 2 == 0 ? '双' : '单' }}
							</view>
						</template>
						<template v-if="spanType == 3">
							<view class="sscOther" style="color:#f12d35;">{{ item.total }}</view>
							<view class="sscOther" style="color:#f12d35;">{{ item.size }}</view>
							<view class="sscOther" style="color:#184dd5;">{{ item.oddEven }}</view>
							<view class="sscOther" style="color:#184dd5;" v-for="(a, aIndex) in item.pred" :key="aIndex">{{ a }}</view>
							<view class="sscOther" style="color:#184dd5;" v-if="item.desc && item.desc.front">{{ item.desc.front }}</view>
							<view class="sscOther" style="color:#184dd5;" v-if="item.desc && item.desc.middle">{{ item.desc.middle }}</view>
							<view class="sscOther" style="color:#184dd5;" v-if="item.desc && item.desc.back">{{ item.desc.back }}</view>
						</template>
					</view>
				</view>
			</view>
		</template>
		<!--双色球(fcssq) 超级大乐透(cjdlt) 体彩七星彩(tcqxx)(3)-->
		<template v-if="showType == 6">
			<view class="container-title">
				<view class="title-left">
					<text class="item">时间</text>
					<text class="item">期数</text>
				</view>
				<view class="title-right">
					<text class="item" :class="{ checked: spanType == 0 }" @tap.stop="spanType = 0">号码</text>
					<text class="item" :class="{ checked: spanType == 3 }" @tap.stop="spanType = 3">总和/形态</text>
				</view>
			</view>
			<view class="content">
				<view class="detail-line" :key="index" v-for="(item, index) in mainList">
					<view class="left-part">
						<text class="left-time">{{ item.time.substring(11, 16) }}</text>
						<text class="left-no">{{ item.no.toString().substring(item.no.toString().length-6)}}</text>
					</view>
					<view class="right-part">
						<template v-if="spanType == 0">
							<view class="ssc_sm" :key="nIndex" :class="{ lastBall: (code=='cjdlt' && nIndex >= 5) || (code !='cjdlt' && nIndex == 6) }" style="margin: 0 12rpx;" v-for="(num, nIndex) in item.num">{{ num }}</view>
						</template>
						<template v-if="spanType == 3">
							<view class="sscOther" style="color:#f12d35;margin: 0 80rpx;">{{ item.total }}</view>
							<view class="sscOther" style="color:#666;margin: 0 80rpx;">{{ item.oddEven }}</view>
						</template>
					</view>
				</view>
			</view>
		</template>
		<!--台湾宾果(twbg) 澳洲幸运20(ajxyes) 极速快乐8(jsklb) 北京快乐8(bjklb)(4)-->
		<template v-if="showType == 7">
			<view class="container-title">
				<view class="title-left">
					<text class="item">时间</text>
					<text class="item">期数</text>
				</view>
				<view class="title-right">
					<text class="item" :class="{ checked: spanType == 0 }" @tap.stop="spanType = 0">号码</text>
					<text class="item" :class="{ checked: spanType == 1 }" @tap.stop="spanType = 1">大小</text>
					<text class="item" :class="{ checked: spanType == 2 }" @tap.stop="spanType = 2">单双</text>
					<text class="item" :class="{ checked: spanType == 3 }" @tap.stop="spanType = 3">总和/形态</text>
				</view>
			</view>
			<view class="content">
				<view class="detail-line" style="display: flex;padding-top: 10rpx;padding-bottom: 5px;" :key="index" v-for="(item, index) in mainList">
					<view class="line-left">
						<text>{{ item.time.substring(11, 16) }}</text>
						<text>{{ item.no.toString().substring(item.no.toString().length-6) }}</text>
					</view>
					<view class="line-right">
						<template v-if="spanType == 0">
							<view class="ssc_sm" style="margin-right: 4rpx;margin-top: 8rpx;" :key="nIndex" v-for="(num, nIndex) in item.num">{{ num }}</view>
							<view class="ssc_sm lastBall" style="margin-right: 4rpx;margin-top: 8rpx;">{{ item.on }}</view>
						</template>
						<template v-if="spanType == 1">
							<view
								style="margin-right: 4rpx;margin-top: 8rpx;"
								class="ssc_sm"
								:key="nIndex"
								v-for="(num, nIndex) in item.num"
								:class="{ bdd: Number(num) > max / 2, sst: Number(num) <= max / 2 }"
							>
								{{ Number(num) > max / 2 ? '大' : '小' }}
							</view>
							<view style="margin-right: 4rpx;margin-top: 8rpx;" class="ssc_sm" :class="{ bdd: Number(item.on) > max / 2, sst: Number(item.on) <= max / 2 }">
								{{ Number(item.on) > max / 2 ? '大' : '小' }}
							</view>
						</template>
						<template v-if="spanType == 2">
							<view
								style="margin-right: 4rpx;margin-top: 8rpx;"
								class="ssc_sm"
								:key="nIndex"
								v-for="(num, nIndex) in item.num"
								:class="{ bdd: Number(num) % 2 == 0, sst: Number(num) % 2 == 1 }"
							>
								{{ Number(num) % 2 == 0 ? '双' : '单' }}
							</view>
							<view style="margin-right: 4rpx;margin-top: 8rpx;" class="ssc_sm" :class="{ bdd: Number(item.on) % 2 == 0, sst: Number(item.on) % 2 == 1 }">
								{{ Number(item.on) % 2 == 0 ? '双' : '单' }}
							</view>
						</template>
						<template v-if="spanType == 3">
							<view style="width: 100%;display: box;">
								<view class="sscOther" style="color:#f12d35;margin-right: 16rpx;width: 48rpx;">{{ item.total }}</view>
								<view class="sscOther" style="color:#666;margin-right: 16rpx;">{{ item.size }}</view>
								<view class="sscOther" style="color:#666;margin-right: 16rpx;">{{ item.oddEven }}</view>
								<view class="sscOther" style="color:#666;margin-right: 16rpx;width: 72rpx;">{{ item.singleAndDoubleMuch }}</view>
								<view class="sscOther" style="color:#666;margin-right: 16rpx;width: 72rpx;">{{ item.aroundMuch }}</view>
								<view class="sscOther" style="color:#666;margin-right: 16rpx;width: 72rpx;">{{ item.sumComb }}</view>
								<view class="sscOther" style="color:#666;">{{ item.fiveEle }}</view>
							</view>
						</template>
					</view>
				</view>
			</view>
		</template>
		<!--福彩3D 体彩排列3-->
		<template v-if="showType == 8">
			<view class="container-title">
				<view class="title-left">
					<text class="item">时间</text>
					<text class="item">期数</text>
				</view>
				<view class="title-right">
					<text class="item" :class="{ checked: spanType == 0 }" @tap.stop="spanType = 0">号码</text>
					<text class="item" :class="{ checked: spanType == 3 }" @tap.stop="spanType = 3">总和/形态</text>
				</view>
			</view>
			<view class="content">
				<view class="detail-line" :key="index" v-for="(item, index) in mainList">
					<view class="left-part">
						<text class="left-time">{{ item.time.substring(11, 16) }}</text>
						<text class="left-no">{{ item.no.toString().substring(item.no.toString().length-6)}}</text>
					</view>
					<view class="right-part">
						<template v-if="spanType == 0">
							<view class="ssc_sm" :key="nIndex" style="margin: 0 60rpx;" v-for="(num, nIndex) in item.num">{{ num }}</view>
						</template>
						<template v-if="spanType == 3">
							<view class="sscOther" style="color:#f12d35;margin: 0 60rpx;">{{ item.total1 }}</view>
							<view class="sscOther" style="color:#f12d35;margin: 0 60rpx;">{{ item.total2 }}</view>
							<view class="sscOther" style="color:#f12d35;margin: 0 60rpx;">{{ item.total3 }}</view>
						</template>
					</view>
				</view>
			</view>
		</template>
		<!--体彩排列5-->
		<template v-if="showType == 9">
			<view class="container-title">
				<view class="title-left">
					<text class="item">时间</text>
					<text class="item">期数</text>
				</view>
				<view class="title-right">
					<text class="item" :class="{ checked: spanType== 0 }" @tap.stop="spanType= 0;">号码</text>
					<text class="item" :class="{ checked: spanType== 3 }" @tap.stop="spanType= 3;">总和/形态</text>
				</view>
			</view>
			<view class="content">
				<view class="detail-line" :key="index" v-for="(item, index) in mainList">
					<view class="left-part">
						<text class="left-time">{{ item.time.substring(11, 16) }}</text>
						<text class="left-no">{{ item.no.toString().substring(item.no.toString().length-6)}}</text>
					</view>
					<view class="right-part">
						<template v-if="spanType== 0">
							<view class="ssc_sm ssc_sm5" v-if="code=='tcplw'" :key="nIndex" style="margin: 0 20rpx;" v-for="(num, nIndex) in item.num">{{ num }}</view>
							<view class="ssc_sm" v-else :key="nIndex" style="margin: 0 20rpx;" v-for="(num, nIndex) in item.num">{{ num }}</view>
						</template>
						<template v-if="spanType== 3">
							<view class="sscOther" style="color:#f12d35;margin: 0 90rpx;">{{ item.total }}</view>
							<view class="sscOther" style="color:#666;margin: 0 90rpx;">{{ item.oddEven }}</view>
						</template>
					</view>
				</view>
			</view>
		</template>
		<!--福彩七乐彩-->
		<template v-if="showType == 10">
			<view class="container-title">
				<view class="title-left">
					<text class="item">时间</text>
					<text class="item">期数</text>
				</view>
				<view class="title-right">
					<text class="item" :class="{ checked: spanType== 0 }" @tap.stop="spanType= 0;">号码</text>
					<text class="item" :class="{ checked: spanType== 3 }" @tap.stop="spanType= 3;">总和/形态</text>
				</view>
			</view>
			<view class="content">
				<view class="detail-line" :key="index" v-for="(item, index) in mainList">
					<view class="left-part">
						<text class="left-time">{{ item.time.substring(11, 16) }}</text>
						<text class="left-no">{{ item.no.toString().substring(item.no.toString().length-6)}}</text>
					</view>
					<view class="right-part">
						<template v-if="spanType== 0">
							<view class="ssc_sm" :class="{ lastBall: nIndex == 7 }" :key="nIndex" style="margin: 0 8rpx;" v-for="(num, nIndex) in item.num">{{ num }}</view>
						</template>
						<template v-if="spanType== 3">
							<view class="sscOther" style="color:#f12d35;margin: 0 80rpx;">{{ item.total }}</view>
							<view class="sscOther" style="color:#666;margin: 0 80rpx;">{{ item.oddEven }}</view>
						</template>
					</view>
				</view>
			</view>
		</template>
		<!--重庆幸运农场-->
		<template v-if="showType == 11">
			<view class="container-title">
				<view class="title-left">
					<text class="item">时间</text>
					<text class="item">期数</text>
				</view>
				<view class="title-right">
					<text class="item" :class="{ checked: spanType== 0 }" @tap.stop="spanType= 0;">号码</text>
					<text class="item" :class="{ checked: spanType== 1 }" @tap.stop="spanType= 1;">大小</text>
					<text class="item" :class="{ checked: spanType== 2 }" @tap.stop="spanType= 2;">单双</text>
					<text class="item" :class="{ checked: spanType== 3 }" @tap.stop="spanType= 3;">冠亚和/龙虎</text>
				</view>
			</view>
			<view class="content">
				<view class="detail-line" :key="index" v-for="(item, index) in mainList">
					<view class="left-part">
						<text class="left-time">{{ item.time.substring(11, 16) }}</text>
						<text class="left-no">{{ item.no.toString().substring(item.no.toString().length-6)}}</text>
					</view>
					<view class="right-part">
						<template v-if="spanType== 0">
							<view class="ssc_sm" style="margin-right: 16rpx;" :key="nIndex" v-for="(num, nIndex) in item.num">{{ num }}</view>
						</template>
						<template v-if="spanType== 1">
							<view class="ssc_sm" style="margin-right: 16rpx;" :key="nIndex" v-for="(num, nIndex) in item.num" :class="{ bdd: Number(num) > max / 2, sst: Number(num) <= max / 2 }">
								{{ Number(num) > max / 2 ? '大' : '小' }}
							</view>
						</template>
						<template v-if="spanType== 2">
							<view class="ssc_sm" style="margin-right: 16rpx;" :key="nIndex" v-for="(num, nIndex) in item.num" :class="{ bdd: Number(num) % 2== 0, sst: Number(num) % 2== 1 }">
								{{ Number(num) % 2== 0 ? '双' : '单' }}
							</view>
						</template>
						<template v-if="spanType== 3">
							<view class="sscOther" style="color:#f12d35;margin-right: 20rpx;width: 44rpx;">{{ item.total }}</view>
							<view class="sscOther" style="color:#f12d35;margin-right: 20rpx;">{{ item.size }}</view>
							<view class="sscOther" style="color:#184dd5;margin-right: 20rpx;">{{ item.oddEven }}</view>
							<view class="sscOther" style="color:#184dd5;margin-right: 20rpx;">{{ item.footSize }}</view>
							<view class="sscOther" style="color:#184dd5;margin-right: 20rpx;" :key="pIndex" v-for="(pp, pIndex) in item.pred">{{ pp }}</view>
						</template>
					</view>
				</view>
			</view>
		</template>
		<!--pc蛋蛋幸运28-->
		<template v-if="showType == 12">
			<view class="container-title">
				<view class="title-left">
					<text class="item">时间</text>
					<text class="item">期数</text>
				</view>
				<view class="title-right"><text class="item" :class="{ checked: spanType== 0 }">号码</text></view>
			</view>
			<view class="content">
				<view class="detail-line" :key="index" v-for="(item, index) in mainList">
					<view class="left-part">
						<text class="left-time">{{ item.time.substring(11, 16) }}</text>
						<text class="left-no">{{ item.no.toString().substring(item.no.toString().length-6)}}</text>
					</view>
					<view class="right-part">
						<view
							class="pc-dd-sm"
							style="margin: 0 24rpx;"
							:class="{
								ball0: Number(item.num[0])== 0,
								ball10: Number(item.num[0])== 10,
								ball1: Number(item.num[0])== 1,
								ball2: Number(item.num[0])== 2,
								ball3: Number(item.num[0])== 3,
								ball4: Number(item.num[0])== 4,
								ball5: Number(item.num[0])== 5,
								ball6: Number(item.num[0])== 6,
								ball7: Number(item.num[0])== 7,
								ball8: Number(item.num[0])== 8,
								ball9: Number(item.num[0])== 9
							}"
						>
							{{ item.num[0] }}
						</view>
						<view class="pc-dd-sm plus-sm font_icon iconjia" style="margin: 0 30rpx;"></view>
						<view
							class="pc-dd-sm"
							style="margin: 0 24rpx;"
							:class="{
								ball0: Number(item.num[1])== 0,
								ball10: Number(item.num[1])== 10,
								ball1: Number(item.num[1])== 1,
								ball2: Number(item.num[1])== 2,
								ball3: Number(item.num[1])== 3,
								ball4: Number(item.num[1])== 4,
								ball5: Number(item.num[1])== 5,
								ball6: Number(item.num[1])== 6,
								ball7: Number(item.num[1])== 7,
								ball8: Number(item.num[1])== 8,
								ball9: Number(item.num[1])== 9
							}"
						>
							{{ item.num[1] }}
						</view>
						<view class="pc-dd-sm plus-sm font_icon iconjia" style="margin: 0 30rpx;"></view>
						<view
							class="pc-dd-sm"
							style="margin: 0 24rpx;"
							:class="{
								ball0: Number(item.num[2])== 0,
								ball10: Number(item.num[2])== 10,
								ball1: Number(item.num[2])== 1,
								ball2: Number(item.num[2])== 2,
								ball3: Number(item.num[2])== 3,
								ball4: Number(item.num[2])== 4,
								ball5: Number(item.num[2])== 5,
								ball6: Number(item.num[2])== 6,
								ball7: Number(item.num[2])== 7,
								ball8: Number(item.num[2])== 8,
								ball9: Number(item.num[2])== 9
							}"
						>
							{{ item.num[2] }}
						</view>
					</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
export default {
	name: 'win-number',
	props: ['code', 'date', 'current_number'],
	data() {
		return {
			mainList: [],
			max: 0,
			contentData: null,
			spanType: 0, //号码 大小 单双 总和/形态
			showType: -1, //显示彩种区域
			hasNext: true,
			page: 1,
			totalCount: 0
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
				// 到了底部之后想做的操作,如到了底部之后加载
				that.listAdd20();
			}
		};
		//Detail-01 :北京PK10(bjpks) 澳洲幸运10(ajxys) 极速赛车(jssc) 极速飞艇(jsft)（4）
		// Detail-02:重庆时时彩(cqssc) 天津时时彩(tjssc) 新疆时时彩(xjssc) 极速时时彩(jsssc) 重庆七星彩(cqqxc) 澳洲幸运5(ajxyw)（6）
		//  Detail-03:广东11选5(gdsyxw) 内蒙古11选5(nmgsyxw) 吉林11选5(jlsyxw) 广西11选5(gxsyxw) 浙江11选5(zjsyxw) 湖北11选5(hbsyxw)
		//  	 上海11选5(shsyxw) 辽宁11选5(llxyxw) 安徽11选5(ahsyxw) 江苏11选5(jsusyxw) 江西11选5(jxsyxw)  极速11选5(jssyxw)
		//  	 十一运夺金(syydj)（13）
		// Detail-04:江苏快3(jsks) 吉林快3(jlks) 河北快3(hbks) 内蒙古快3(nmgks) 安徽快3(ahks) 福建快3(fjks) 湖北快3(hbk3)
		// 北京快3(bjks) 极速快3(jsk3) 广西快3(gxks)（10）
		// Detail-05:极速快乐十分(jsklsf)  广东快乐十分(gdklsf) 天津快乐十分(tjklsf) 广西快乐十分(gxklsf) 澳洲幸运8（ajxyb）（5）
		// Detail-06:双色球(fcssq) 超级大乐透(cjdlt) 体彩七星彩(tcqxx)(3)
		// Detail-07:台湾宾果(twbg) 澳洲幸运20(ajxyes) 极速快乐8(jsklb) 北京快乐8(bjklb)(4)
		//Detail-08:福彩3D(fcsd)（试机号） 体彩排列3(tcpls) (2)
		// Detail-09:体彩排列5(tcplw)
		// Detail-10:福彩七乐彩(fcqcl)
		// Detail-11:重庆幸运农场(cqxylc)
		// Detail-12:PC蛋蛋幸运28(pcddxyeb)
		const allTypes = uni.getStorageSync('analysisKinds')['jskj'];
		if (allTypes['type1'].indexOf(this.code) != -1) {
			this.showType = 1;
		} else if (allTypes['type2'].indexOf(this.code) != -1) {
			this.showType = 2;
		} else if (allTypes['type4'].indexOf(this.code) != -1) {
			this.showType = 4;
		} else if (allTypes['type5'].indexOf(this.code) != -1) {
			this.showType = 5;
		} else if (allTypes['type6'].indexOf(this.code) != -1) {
			this.showType = 6;
		} else if (allTypes['type7'].indexOf(this.code) != -1) {
			this.showType = 7;
		} else if (allTypes['type8'].indexOf(this.code) != -1) {
			this.showType = 8;
		} else if (allTypes['type9'].indexOf(this.code) != -1) {
			this.showType = 9;
		} else if (allTypes['type10'].indexOf(this.code) != -1) {
			this.showType = 10;
		} else if (allTypes['type11'].indexOf(this.code) != -1) {
			this.showType = 11;
		} else if (allTypes['type12'].indexOf(this.code) != -1) {
			this.showType = 12;
		}
		uni.showLoading({ title: 'loading' });
		this.getAnalysisDetail();
	},
	methods: {
		async listAdd20() {
			if (this.hasNext && this.totalCount > 0) {
				if (this.totalCount < 20 * this.page + 1) {
					this.mainList.push.apply(this.mainList, this.contentData.list.slice(20 * (this.page - 1)));
					this.hasNext = false;
				} else {
					this.mainList.push.apply(this.mainList, this.contentData.list.slice(20 * (this.page - 1), 20 * this.page));
					this.hasNext = true;
				}
				this.page += 1;
			} else {
				this.hasNext = false;
			}
		},
		getAnalysisDetail() {
			this.contentData = {};
			this.mainList = [];
			this.hasNext = true;
			this.page = 1;
			this.totalCount = 0;
			this.$api.getAnalysisDetail({ code: this.code, type: 'jskj', date: this.date}).then(res => {
					uni.hideLoading();
				if (res.code == 0) {
					this.contentData = res.data;
					this.totalCount = res.data.list.length;
					this.max = res.data.max;
					this.listAdd20();
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
	margin-top: 10rpx;
	background-color: #fff;
	.container-title {
		padding: 20rpx;
		display: -webkit-box;
		display: box;
		border-bottom: 1px solid #efeff4;
		.title-left {
			box-flex: 1;
			width: 150rpx;
			.item {
				height: 48rpx;
				line-height: 48rpx;
				color: #999999;
				font-size: 12px;
			}
			.item:first-child {
				float: left;
			}
			.item:last-child {
				float: right;
			}
		}
		.title-right {
			width: 100%;
			padding-left: 40rpx;
			box-flex: 6;
			-webkit-box-flex: 6;
			display: -webkit-box;
			display: box;
			box-sizing: border-box;
			.item {
				font-size: 12px;
				color: #333333;
				height: 48rpx;
				line-height: 48rpx;
				display: block;
				text-align: center;
				box-flex: 4;
				-webkit-box-flex: 4;
			}
			.item:last-child {
				box-flex: 5;
				-webkit-box-flex: 5;
			}
			.checked {
				color: #ffffff;
				background-color: #546168;
				border-radius: 3px;
			}
		}
	}
	.content {
		// padding-top: 10rpx;
		// margin-top: 10px;
		background: #fff;
		.detail-line {
			width: 100%;
			display: inline-block;
			border-bottom: 1px solid #efeff4;
			padding: 10rpx 20rpx 0;
			.left-part{
				min-width: 196rpx;max-width: 210rpx;height: auto;display:inline-block;
				.left-time{
					float: left;margin-right: 0;
				}
				.left-no{
					float: right;margin-right: 0;
				}
			}
			.right-part{
				display:inline-block;padding-left: 16rpx;
			}
			.line-left {
				width: 330rpx;
			}
			.line-right {
				width: 100%;
			}
			uni-text {
				font-size: 12px;
				float: left;
				color: #666666;
				margin-right: 16rpx;
			}
		}
	}
}
.bdd {
	//大 双 龙
	color: #ffffff;
	background: #fb8d16;
	border-radius: 3px;
	border: none;
}
.sst {
	//小 单 虎
	color: #ffffff;
	background: #8d9db4;
	border-radius: 3px;
	border: none;
}
.hubg {
	margin-right: 25rpx;
}
.sscOther {
	width: auto;
	max-width: 86rpx;
	min-width: 36rpx;
	font-size: 24rpx;
	float: left;
	margin-right: 30rpx;
	text-align: center;
}
.sscOther:last-child {
	margin-right: 0;
}
</style>
