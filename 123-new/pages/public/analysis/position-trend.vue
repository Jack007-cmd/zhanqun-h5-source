<template name="position-trend">
	<view class="container" v-if="mainData">
		<view class="pattern" v-if="codeType < 4">
			<view class="mode" :class="{ checked: modeType == 0 }" @tap.stop="choseMode(0)">号码分布</view>
			<view class="mode" :class="{ checked: modeType == 1 }" @tap.stop="choseMode(1)">形态特征</view>
			<template v-if="codeType != 3">
				<view class="mode" :class="{ checked: modeType == 2 }" @tap.stop="choseMode(2)">012路</view>
				<view class="mode" :class="{ checked: modeType == 3 }" @tap.stop="choseMode(3)">升平降</view>
			</template>
		</view>
		<view class="btn-list">
			<view class="btn-item" v-if="codeType == 1" @tap.stop="actionBallTap()">
				{{ tGoal == 0 ? '冠军' : tGoal == 1 ? '亚军' : tGoal == 2 ? '第三名' : tGoal == 3 ? '第四名' : tGoal == 4 ?'第五名' : tGoal == 5 ?'第六名' : tGoal == 6 ?'第七名' : tGoal == 7 ?'第八名' : tGoal == 8 ?'第九名':'第十名'}}
			</view>
			<view class="btn-item" v-if="codeType > 1 && codeType < 4" @tap.stop="actionBallTap()">
				{{ tGoal == 0 ? '第一球' : tGoal == 1 ? '第二球' : tGoal == 2 ? '第三球' : tGoal == 3 ? '第四球' : '第五球' }}
			</view>
			<view class="btn-item" v-if="codeType == 4" @tap.stop="actionBallTap()">{{ tGoal == 0 ? '第一位号码' : tGoal == 1 ? '第二位号码' : '第三位号码' }}</view>
			<view class="btn-item" @tap.stop="actionSheetTap()">{{ tPeriods == 2000 ? '当天' : tPeriods == 30 ? '近30期' : tPeriods == 60 ? '近60期' : '近90期' }}</view>
			<view class="btn-item" @tap.stop="choseCon(3)">筛选</view>
			<view class="btn-sjtj" @tap.stop="goBottom()">查看数据统计</view>
		</view>
		<view class="table-box" id="chartLinediv">
			<template v-if="codeType < 4">
				<table class="table_hamafb" cellpadding="1" cellspacing="1" v-if="modeType == 0" style="display: table;">
					<thead>
						<tr v-if="codeType == 1">
							<th>期号</th>
							<th>号码</th>
							<th>1</th>
							<th>2</th>
							<th>3</th>
							<th>4</th>
							<th>5</th>
							<th>6</th>
							<th>7</th>
							<th>8</th>
							<th>9</th>
							<th>10</th>
						</tr>
						<tr v-if="codeType == 2">
							<th>期号</th>
							<th>号码</th>
							<th>0</th>
							<th>1</th>
							<th>2</th>
							<th>3</th>
							<th>4</th>
							<th>5</th>
							<th>6</th>
							<th>7</th>
							<th>8</th>
							<th>9</th>
						</tr>
						<tr v-if="codeType == 3">
							<th>期号</th>
							<th>号码</th>
							<th>1</th>
							<th>2</th>
							<th>3</th>
							<th>4</th>
							<th>5</th>
							<th>6</th>
							<th>7</th>
							<th>8</th>
							<th>9</th>
							<th>10</th>
							<th>11</th>
						</tr>
					</thead>
					<tbody id="allNumber" v-if="mainData">
						<template v-for="(item, m) in mainData.list">
							<tr :key="m" v-if="m < tPeriods">
								<td>{{ item.no.toString().substring(4) }}</td>
								<td class="tabred">
									<text>{{ item.num[tGoal] }}</text>
								</td>
								<td :class="{hot:temp==0}" :key="i" v-for="(temp, i) in item.list.basic[tGoal]">
									<text v-if="series==1">{{ temp==0?i:temp }}</text>
									<text v-else>{{ temp==0?(i+1):temp }}</text>
								</td>
							</tr>
						</template>
					</tbody>
					<tbody>
						<tr v-if="codeType == 1" class="clospan">
							<td colspan="2">数据统计</td>
							<td>1</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
							<td>5</td>
							<td>6</td>
							<td>7</td>
							<td>8</td>
							<td>9</td>
							<td>10</td>
						</tr>
						<tr v-if="codeType == 2" class="clospan">
							<td colspan="2">数据统计</td>
							<td>0</td>
							<td>1</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
							<td>5</td>
							<td>6</td>
							<td>7</td>
							<td>8</td>
							<td>9</td>
						</tr>
						<tr v-if="codeType == 3" class="clospan">
							<td colspan="2">数据统计</td>
							<td>1</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
							<td>5</td>
							<td>6</td>
							<td>7</td>
							<td>8</td>
							<td>9</td>
							<td>10</td>
							<td>11</td>
						</tr>
						<tr>
							<td colspan="2">总次数</td>
							<td :key="a" v-for="(appear, a) in mainData.statistics.appear.basic[tGoal]">{{ appear }}</td>
						</tr>
						<tr>
							<td colspan="2">平均遗漏</td>
							<td :key="b" v-for="(avg, b) in mainData.statistics.avg.basic[tGoal]">{{ avg }}</td>
						</tr>
						<tr>
							<td colspan="2">当前遗漏</td>
							<td :key="c" v-for="(current, c) in mainData.statistics.current.basic[tGoal]">{{ current }}</td>
						</tr>
						<tr>
							<td colspan="2">最大连出</td>
							<td :key="d" v-for="(maxAway, d) in mainData.statistics.maxAway.basic[tGoal]">{{ maxAway }}</td>
						</tr>
						<tr>
							<td colspan="2">最大遗漏</td>
							<td :key="e" v-for="(max, e) in mainData.statistics.max.basic[tGoal]">{{ max }}</td>
						</tr>
					</tbody>
				</table>
				<table class="table_sttz" cellpadding="1" cellspacing="1" v-if="modeType == 1" style="display: table;">
					<thead>
						<tr>
							<th>期数</th>
							<th>号码</th>
							<th colspan="2">单双</th>
							<th colspan="2">大小</th>
							<th colspan="2" v-if="codeType != 3">质合</th>
						</tr>
					</thead>
					<tbody id="table_sttz" v-if="mainData">
						<template v-for="(item, m) in mainData.list">
							<tr :key="m" v-if="m < tPeriods">
								<td>{{ item.no.toString().substring(4) }}</td>
								<td class="tabred">
									<text>{{ item.num[tGoal] }}</text>
								</td>
								<td :class="{ numeven: item.list.sad[tGoal].s == 0 }">
									<text>{{ item.list.sad[tGoal].s == 0 ? '单' : item.list.sad[tGoal].s }}</text>
								</td>
								<td :class="{ numodd: item.list.sad[tGoal].d == 0 }">
									<text>{{ item.list.sad[tGoal].d == 0 ? '双' : item.list.sad[tGoal].d }}</text>
								</td>
								<td :class="{ numeven: item.list.bas[tGoal].b == 0 }">
									<text>{{ item.list.bas[tGoal].b == 0 ? '大' : item.list.bas[tGoal].b }}</text>
								</td>
								<td :class="{ numodd: item.list.bas[tGoal].s == 0 }">
									<text>{{ item.list.bas[tGoal].s == 0 ? '小' : item.list.bas[tGoal].s }}</text>
								</td>
								<template v-if="codeType != 3">
									<td :class="{ numeven: item.list.pc[tGoal].p == 0 }">
										<text>{{ item.list.pc[tGoal].p == 0 ? '质' : item.list.pc[tGoal].p }}</text>
									</td>
									<td :class="{ numodd: item.list.pc[tGoal].c == 0 }">
										<text>{{ item.list.pc[tGoal].c == 0 ? '合' : item.list.pc[tGoal].c }}</text>
									</td>
								</template>
							</tr>
						</template>
						<tr class="clospan">
							<td colspan="2">数据统计</td>
							<td colspan="2">单双</td>
							<td colspan="2">大小</td>
							<td colspan="2" v-if="codeType != 3">质和</td>
						</tr>
						<tr>
							<td colspan="2">总次数</td>
							<td>{{ mainData.statistics.appear.sad[tGoal].s }}</td>
							<td>{{ mainData.statistics.appear.sad[tGoal].d }}</td>
							<td>{{ mainData.statistics.appear.bas[tGoal].b }}</td>
							<td>{{ mainData.statistics.appear.bas[tGoal].s }}</td>
							<td>{{ mainData.statistics.appear.pc[tGoal].p }}</td>
							<td>{{ mainData.statistics.appear.pc[tGoal].c }}</td>
						</tr>
						<tr>
							<td colspan="2">平均遗漏</td>
							<td>{{ mainData.statistics.avg.sad[tGoal].s }}</td>
							<td>{{ mainData.statistics.avg.sad[tGoal].d }}</td>
							<td>{{ mainData.statistics.avg.bas[tGoal].b }}</td>
							<td>{{ mainData.statistics.avg.bas[tGoal].s }}</td>
							<td>{{ mainData.statistics.avg.pc[tGoal].p }}</td>
							<td>{{ mainData.statistics.avg.pc[tGoal].c }}</td>
						</tr>
						<tr>
							<td colspan="2">当前遗漏</td>
							<td>{{ mainData.statistics.current.sad[tGoal].s }}</td>
							<td>{{ mainData.statistics.current.sad[tGoal].d }}</td>
							<td>{{ mainData.statistics.current.bas[tGoal].b }}</td>
							<td>{{ mainData.statistics.current.bas[tGoal].s }}</td>
							<td>{{ mainData.statistics.current.pc[tGoal].p }}</td>
							<td>{{ mainData.statistics.current.pc[tGoal].c }}</td>
						</tr>
						<tr>
							<td colspan="2">最大连出</td>
							<td>{{ mainData.statistics.maxAway.sad[tGoal].s }}</td>
							<td>{{ mainData.statistics.maxAway.sad[tGoal].d }}</td>
							<td>{{ mainData.statistics.maxAway.bas[tGoal].b }}</td>
							<td>{{ mainData.statistics.maxAway.bas[tGoal].s }}</td>
							<td>{{ mainData.statistics.maxAway.pc[tGoal].p }}</td>
							<td>{{ mainData.statistics.maxAway.pc[tGoal].c }}</td>
						</tr>
						<tr>
							<td colspan="2">最大遗漏</td>
							<td>{{ mainData.statistics.max.sad[tGoal].s }}</td>
							<td>{{ mainData.statistics.max.sad[tGoal].d }}</td>
							<td>{{ mainData.statistics.max.bas[tGoal].b }}</td>
							<td>{{ mainData.statistics.max.bas[tGoal].s }}</td>
							<td>{{ mainData.statistics.max.pc[tGoal].p }}</td>
							<td>{{ mainData.statistics.max.pc[tGoal].c }}</td>
						</tr>
					</tbody>
				</table>
				<table class="table_lu012" cellpadding="1" cellspacing="1" v-if="modeType == 2" style="display: table;">
					<thead>
						<tr>
							<th>期号</th>
							<th class="short">号码</th>
							<th>0</th>
							<th>1</th>
							<th>2</th>
						</tr>
					</thead>
					<tbody id="table_lu012" v-if="mainData">
						<template v-for="(item, m) in mainData.list">
							<tr :key="m" v-if="m < tPeriods">
								<td>{{ item.no.toString().substring(4) }}</td>
								<td class="tabred">
									<text>{{ item.num[tGoal] }}</text>
								</td>
								<template v-for="(temp, t) in item.list.zot[tGoal]">
									<td :key="t" :class="{ numeven: temp == 0 && t % 2 == 0, numodd: temp == 0 && t % 2 == 1 }">
										<text>{{ temp == 0 ? t : temp }}</text>
									</td>
								</template>
							</tr>
						</template>
						<tr class="clospan">
							<td colspan="2">数据统计</td>
							<td>0</td>
							<td>1</td>
							<td>2</td>
						</tr>
						<tr>
							<td colspan="2">总次数</td>
							<td v-for="zot in mainData.statistics.appear.zot[tGoal]">{{ zot }}</td>
						</tr>
						<tr>
							<td colspan="2">平均遗漏</td>
							<td v-for="zot in mainData.statistics.avg.zot[tGoal]">{{ zot }}</td>
						</tr>
						<tr>
							<td colspan="2">当前遗漏</td>
							<td v-for="zot in mainData.statistics.current.zot[tGoal]">{{ zot }}</td>
						</tr>
						<tr>
							<td colspan="2">最大连出</td>
							<td v-for="zot in mainData.statistics.maxAway.zot[tGoal]">{{ zot }}</td>
						</tr>
						<tr>
							<td colspan="2">最大遗漏</td>
							<td v-for="zot in mainData.statistics.max.zot[tGoal]">{{ zot }}</td>
						</tr>
					</tbody>
				</table>
				<table class="table_spj" cellpadding="1" cellspacing="1" v-if="modeType == 3" style="display: table;">
					<thead>
						<tr>
							<th>期号</th>
							<th class="short">号码</th>
							<th>升</th>
							<th>平</th>
							<th>降</th>
						</tr>
					</thead>
					<tbody id="table_spj" v-if="mainData">
						<template v-for="(item, m) in mainData.list">
							<tr :key="m" v-if="m < tPeriods">
								<td>{{ item.no.toString().substring(4) }}</td>
								<td class="tabred">
									<text>{{ item.num[tGoal] }}</text>
								</td>
								<td :class="{ numeven: item.list.uad[tGoal].u == 0 }">
									<text>{{ item.list.uad[tGoal].u == 0 ? '升' : item.list.uad[tGoal].u }}</text>
								</td>
								<td :class="{ numodd: item.list.uad[tGoal].a == 0 }">
									<text>{{ item.list.uad[tGoal].a == 0 ? '平' : item.list.uad[tGoal].a }}</text>
								</td>
								<td :class="{ numeven: item.list.uad[tGoal].d == 0 }">
									<text>{{ item.list.uad[tGoal].d == 0 ? '降' : item.list.uad[tGoal].d }}</text>
								</td>
							</tr>
						</template>
						<tr class="clospan">
							<td colspan="2">数据统计</td>
							<td>升</td>
							<td>平</td>
							<td>降</td>
						</tr>
						<tr>
							<td colspan="2">总次数</td>
							<td>{{ mainData.statistics.appear.uad[tGoal].u }}</td>
							<td>{{ mainData.statistics.appear.uad[tGoal].a }}</td>
							<td>{{ mainData.statistics.appear.uad[tGoal].d }}</td>
						</tr>
						<tr>
							<td colspan="2">平均遗漏</td>
							<td>{{ mainData.statistics.avg.uad[tGoal].u }}</td>
							<td>{{ mainData.statistics.avg.uad[tGoal].a }}</td>
							<td>{{ mainData.statistics.avg.uad[tGoal].d }}</td>
						</tr>
						<tr>
							<td colspan="2">当前遗漏</td>
							<td>{{ mainData.statistics.current.uad[tGoal].u }}</td>
							<td>{{ mainData.statistics.current.uad[tGoal].a }}</td>
							<td>{{ mainData.statistics.current.uad[tGoal].d }}</td>
						</tr>
						<tr>
							<td colspan="2">最大连出</td>
							<td>{{ mainData.statistics.maxAway.uad[tGoal].u }}</td>
							<td>{{ mainData.statistics.maxAway.uad[tGoal].a }}</td>
							<td>{{ mainData.statistics.maxAway.uad[tGoal].d }}</td>
						</tr>
						<tr>
							<td colspan="2">最大遗漏</td>
							<td>{{ mainData.statistics.max.uad[tGoal].u }}</td>
							<td>{{ mainData.statistics.max.uad[tGoal].a }}</td>
							<td>{{ mainData.statistics.max.uad[tGoal].d }}</td>
						</tr>
					</tbody>
				</table>
			</template>
			<template v-if="codeType == 4">
				<table class="table_dingwezs" cellpadding="1" cellspacing="1" id="trend_ding">
					<thead>
						<tr>
							<th>期号</th>
							<th>开奖号</th>
							<th>1</th>
							<th>2</th>
							<th>3</th>
							<th>4</th>
							<th>5</th>
							<th>6</th>
							<th>大</th>
							<th>小</th>
							<th>单</th>
							<th>双</th>
						</tr>
					</thead>
					<tbody id="k3_dwzs">
						<tr :key="m" v-for="(item, m) in mainData.list">
							<td>{{ item.no }}</td>
							<td>
								<template v-for="(n, i) in item.num">
									<text :key="i" :style="{ color: tGoal == i ? 'red' : '#999' }">{{ n+" " }}</text>
								</template>
							</td>
							<td style="background: #fdf7ed;" :class="{ hot: item.list.basic[tGoal]['1'] == 0, ding: item.list.basic[tGoal]['1'] == 0 }">
								<text>{{ item.list.basic[tGoal]['1'] == 0 ? 1 : item.list.basic[tGoal]['1'] }}</text>
							</td>
							<td style="background: #fdf7ed;" :class="{ hot: item.list.basic[tGoal]['2'] == 0, ding: item.list.basic[tGoal]['2'] == 0 }">
								<text>{{ item.list.basic[tGoal]['2'] == 0 ? 2 : item.list.basic[tGoal]['2'] }}</text>
							</td>
							<td style="background: #fdf7ed;" :class="{ hot: item.list.basic[tGoal]['3'] == 0, ding: item.list.basic[tGoal]['3'] == 0 }">
								<text>{{ item.list.basic[tGoal]['3'] == 0 ? 3 : item.list.basic[tGoal]['3'] }}</text>
							</td>
							<td style="background: #fdf7ed;" :class="{ hot: item.list.basic[tGoal]['4'] == 0, ding: item.list.basic[tGoal]['4'] == 0 }">
								<text>{{ item.list.basic[tGoal]['4'] == 0 ? 4 : item.list.basic[tGoal]['4'] }}</text>
							</td>
							<td style="background: #fdf7ed;" :class="{ hot: item.list.basic[tGoal]['5'] == 0, ding: item.list.basic[tGoal]['5'] == 0 }">
								<text>{{ item.list.basic[tGoal]['5'] == 0 ? 5 : item.list.basic[tGoal]['5'] }}</text>
							</td>
							<td style="background: #fdf7ed;" :class="{ hot: item.list.basic[tGoal]['6'] == 0, ding: item.list.basic[tGoal]['6'] == 0 }">
								<text>{{ item.list.basic[tGoal]['6'] == 0 ? 6 : item.list.basic[tGoal]['6'] }}</text>
							</td>
							<td :class="{ hot: item.list.bas[tGoal]['b'] == 0, pol: item.list.bas[tGoal]['b'] == 0 }">
								<text>{{ item.list.bas[tGoal]['b'] == 0 ? '大' : item.list.bas[tGoal]['b'] }}</text>
							</td>
							<td :class="{ hot: item.list.bas[tGoal]['s'] == 0, pol: item.list.bas[tGoal]['s'] == 0 }">
								<text>{{item.list.bas[tGoal]['s'] == 0 ? '小' : item.list.bas[tGoal]['s']}}</text>
							</td>
							<td :class="{ hot: item.list.sad[tGoal]['s'] == 0, sin: item.list.sad[tGoal]['s'] == 0 }">
								<text>{{ item.list.sad[tGoal]['s'] == 0 ? '双' : item.list.sad[tGoal]['s'] }}</text>
							</td>
							<td :class="{ hot: item.list.sad[tGoal]['d'] == 0, sin: item.list.sad[tGoal]['d'] == 0 }">
								<text>{{ item.list.sad[tGoal]['d'] == 0 ? '单' : item.list.sad[tGoal]['d'] }}</text>
							</td>
						</tr>
					</tbody>
					<tbody>
						<tr class="clospan">
							<td colspan="2">数据统计</td>
							<td>1</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
							<td>5</td>
							<td>6</td>
							<td>大</td>
							<td>小</td>
							<td>单</td>
							<td>双</td>
						</tr>
						<tr>
							<td colspan="2">出现次数</td>
							<td>{{ mainData.statistics.appear.basic[tGoal]['1'] }}</td>
							<td>{{ mainData.statistics.appear.basic[tGoal]['2'] }}</td>
							<td>{{ mainData.statistics.appear.basic[tGoal]['3'] }}</td>
							<td>{{ mainData.statistics.appear.basic[tGoal]['4'] }}</td>
							<td>{{ mainData.statistics.appear.basic[tGoal]['5'] }}</td>
							<td>{{ mainData.statistics.appear.basic[tGoal]['6'] }}</td>
							<td>{{ mainData.statistics.appear.bas[tGoal]['b'] }}</td>
							<td>{{ mainData.statistics.appear.bas[tGoal]['s'] }}</td>
							<td>{{ mainData.statistics.appear.sad[tGoal]['s'] }}</td>
							<td>{{ mainData.statistics.appear.sad[tGoal]['d'] }}</td>
						</tr>
						<tr>
							<td colspan="2">平均遗漏</td>
							<td>{{ mainData.statistics.avg.basic[tGoal]['1'] }}</td>
							<td>{{ mainData.statistics.avg.basic[tGoal]['2'] }}</td>
							<td>{{ mainData.statistics.avg.basic[tGoal]['3'] }}</td>
							<td>{{ mainData.statistics.avg.basic[tGoal]['4'] }}</td>
							<td>{{ mainData.statistics.avg.basic[tGoal]['5'] }}</td>
							<td>{{ mainData.statistics.avg.basic[tGoal]['6'] }}</td>
							<td>{{ mainData.statistics.avg.bas[tGoal]['b'] }}</td>
							<td>{{ mainData.statistics.avg.bas[tGoal]['s'] }}</td>
							<td>{{ mainData.statistics.avg.sad[tGoal]['s'] }}</td>
							<td>{{ mainData.statistics.avg.sad[tGoal]['d'] }}</td>
						</tr>
						<tr>
							<td colspan="2">当前遗漏</td>
							<td>{{ mainData.statistics.current.basic[tGoal]['1'] }}</td>
							<td>{{ mainData.statistics.current.basic[tGoal]['2'] }}</td>
							<td>{{ mainData.statistics.current.basic[tGoal]['3'] }}</td>
							<td>{{ mainData.statistics.current.basic[tGoal]['4'] }}</td>
							<td>{{ mainData.statistics.current.basic[tGoal]['5'] }}</td>
							<td>{{ mainData.statistics.current.basic[tGoal]['6'] }}</td>
							<td>{{ mainData.statistics.current.bas[tGoal]['b'] }}</td>
							<td>{{ mainData.statistics.current.bas[tGoal]['s'] }}</td>
							<td>{{ mainData.statistics.current.sad[tGoal]['s'] }}</td>
							<td>{{ mainData.statistics.current.sad[tGoal]['d'] }}</td>
						</tr>
						<tr>
							<td colspan="2">最大连出</td>
							<td>{{ mainData.statistics.maxAway.basic[tGoal]['1'] }}</td>
							<td>{{ mainData.statistics.maxAway.basic[tGoal]['2'] }}</td>
							<td>{{ mainData.statistics.maxAway.basic[tGoal]['3'] }}</td>
							<td>{{ mainData.statistics.maxAway.basic[tGoal]['4'] }}</td>
							<td>{{ mainData.statistics.maxAway.basic[tGoal]['5'] }}</td>
							<td>{{ mainData.statistics.maxAway.basic[tGoal]['6'] }}</td>
							<td>{{ mainData.statistics.maxAway.bas[tGoal]['b'] }}</td>
							<td>{{ mainData.statistics.maxAway.bas[tGoal]['s'] }}</td>
							<td>{{ mainData.statistics.maxAway.sad[tGoal]['s'] }}</td>
							<td>{{ mainData.statistics.maxAway.sad[tGoal]['d'] }}</td>
						</tr>
						<tr>
							<td colspan="2">最大遗漏</td>
							<td>{{ mainData.statistics.max.basic[tGoal]['1'] }}</td>
							<td>{{ mainData.statistics.max.basic[tGoal]['2'] }}</td>
							<td>{{ mainData.statistics.max.basic[tGoal]['3'] }}</td>
							<td>{{ mainData.statistics.max.basic[tGoal]['4'] }}</td>
							<td>{{ mainData.statistics.max.basic[tGoal]['5'] }}</td>
							<td>{{ mainData.statistics.max.basic[tGoal]['6'] }}</td>
							<td>{{ mainData.statistics.max.bas[tGoal]['b'] }}</td>
							<td>{{ mainData.statistics.max.bas[tGoal]['s'] }}</td>
							<td>{{ mainData.statistics.max.sad[tGoal]['s'] }}</td>
							<td>{{ mainData.statistics.max.sad[tGoal]['d'] }}</td>
						</tr>
					</tbody>
				</table>
			</template>
		</view>
		<view id="chartbottom"></view>
	<view class="u-popup" v-if="showFilter == 3 && temRs">
			<view class="u-transition-out" @tap.stop="choseCon(-1)"></view>
			<view class="u-transition">
				<view class="u-popup__wrapper-box">
					<view class="u-main">
						<view class="u-title">
							<view class="option-md">条件选择</view>
							<view class="option-md" @tap.stop="choseCon(99)">确定</view>
						</view>
						<view class="u-content">
							<view class="content-item">
								<view class="option" :class="{ checked: temRs.missing }" @tap.stop="temRs.missing = !temRs.missing">遗漏</view>
								<view class="option" :class="{ checked: temRs.disassemble }" @tap.stop="temRs.disassemble = !temRs.disassemble">折线</view>
								<view class="option" :class="{ checked: temRs.missingLayer }" @tap.stop="temRs.missingLayer = !temRs.missingLayer">遗漏分层</view>
								<view class="option" :class="{ checked: temRs.dividingLine }" @tap.stop="temRs.dividingLine = !temRs.dividingLine">分割线</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>	
	</view>
</template>

<script>
export default {
	name: 'position-trend',
	props: ['code', 'date', 'current_number','series'],
	data() {
		return {
			showFilter: -1,
			mainData: null,
			tGoal: 0, //0第一球 1第二球 2第三球 3第四球 4 第五球
			tPeriods: 30,
			modeType: 0, //0:号码分布 1:形态特征  2:012路 3:升平降
			filterRs: {
				missing: true, //遗漏
				disassemble: true, //折线
				missingLayer: false, //遗漏分层
				dividingLine: false //分割线
			},
			temRs: {},
			codeType: -1,
			new_number:''
		};
	},
	watch: {
		date(newValue, oldValue) {
			let that = this;
			that.getAnalysisDetail();
		},
		current_number(newValue, oldValue) {
			let that = this;
			that.getAnalysisDetail();
		}
	},
	created: function(e) {
		let that = this;
		const allTypes = uni.getStorageSync('analysisKinds')['dwzs'];
		if (allTypes['type1'].indexOf(this.code) != -1) {
			this.codeType = 1;
		}
		if (allTypes['type2'].indexOf(this.code) != -1) {
			// if(['cqssc','tjssc','xjssc','jsssc','cqqxc','ajxyw'].indexOf(this.code)!=-1){
			this.codeType = 2;
		}
		if (allTypes['type3'].indexOf(this.code) != -1) {
			this.codeType = 3;
		}
		if (allTypes['type4'].indexOf(this.code) != -1) {
			this.codeType = 4;
		}
		// console.log("this.codeType",this.codeType);
		uni.showLoading({ title: 'loading' });
		that.getAnalysisDetail();
		// that.hotSpanDrawLine();
		that.startCount();

	},
	methods: {
		choseMode(m) {
			let that = this;
			if (that.modeType == m) return;
			that.modeType = m;
			$('canvas').remove();
			setTimeout(function() {
				that.filterCtrl();
			}, 100);
		},
		hotSpanDrawLine() {
			// $('#allNumber')
			// 	.find('tr')
			// 	.each(function() {
			// 		let tds = $(this).find('td');
			// 		tds.each(function(i) {
			// 			if (
			// 				i > 1 &&
			// 				$(this)
			// 					.text()
			// 					.trim() == '0'
			// 			) {
			// 				$(this).html(tds.eq(1).html());
			// 				$(this).addClass('hot');
			// 			}
			// 		});
			// 	});
			if (this.codeType < 4) {
				this.lineToChart('.hot', 1, '#0092e0');
			} else {
				this.lineToChart('.ding', 1, '#50befa');
				this.lineToChart('.pol', 1, '#ee9a00');
				this.lineToChart('.sin', 1, '#50befa');
			}
		},
		lineToChart(a, b, c) {
			let hot = $(a);
			if (hot.length < 2) {
				return;
			}
			for (let i = 1; i < hot.length; i++) {
				this.line(hot[i - 1], hot[i], b, c);
			}
		},
		//画直线方法：起始元素、终止元素、线宽、颜色
		line(header, footer, line_width, line_color) {
			let xstart = 0;
			let xpos = 0;
			let ypos = 9;
			let canvas = document.createElement('canvas');
			canvas.style.position = 'absolute';
			canvas.style.visibility = 'visible';
			canvas.height = 25;
			if (header.offsetLeft < footer.offsetLeft) {
				canvas.style.top = 13 + header.offsetTop + 'px';
				canvas.style.left = 22 + header.offsetLeft + 'px';
				canvas.width = footer.offsetLeft - header.offsetLeft;
				xpos = footer.offsetLeft - header.offsetLeft - 14;
				ypos = 25;
			} else if (header.offsetLeft == footer.offsetLeft) {
				canvas.height = 13;
				canvas.style.top = 22 + header.offsetTop + 'px';
				canvas.style.left = 14 + header.offsetLeft + 'px';
				canvas.width = 10;
			} else {
				ypos = 25;
				canvas.style.top = 13 + header.offsetTop + 'px';
				canvas.style.left = 22 + footer.offsetLeft + 'px';
				canvas.width = header.offsetLeft - footer.offsetLeft;
				xstart = header.offsetLeft - footer.offsetLeft - 14;
			}
			let ctx = canvas.getContext('2d');
			// ctx.clearRect(0,0,xpos,ypos); //清空画布，多个表格时使用
			ctx.fill();
			ctx.lineWidth = line_width;
			ctx.strokeStyle = line_color;
			ctx.beginPath();
			ctx.moveTo(xstart, 0);
			ctx.lineTo(xpos, ypos);
			ctx.stroke();
			ctx.closePath();
			$('#chartLinediv').append(canvas);
		},
		//滚动到底部
		goBottom() {
			document.getElementById('chartbottom').scrollIntoView();
		},
		choseCon(n) {
			if (n == 3) {
				this.showFilter = 3;
				this.temRs = this.filterRs;
			} else if (n == -1) {
				this.showFilter = -1;
				this.temRs = {};
			} else {
				this.showFilter = -1;
				this.filterRs = this.temRs;
				this.filterCtrl();
			}
		},
		filterCtrl() {
			$('canvas').remove();
			if (!this.filterRs.missing) {
				let table = this.codeType < 4 ? $('#allNumber') : $('#k3_dwzs');
				table.find('tr').each(function() {
					let tds = $(this).find('td');
					tds.each(function(i) {
						if (i > 1) {
							$(this)
								.find('span')
								.hide();
						}
					});
				});
				$('.hot')
					.find('span')
					.show();
			} else {
				this.codeType < 4
					? $('#allNumber')
							.find('tr')
							.find('td')
							.find('span')
							.show()
					: $('#k3_dwzs')
							.find('tr')
							.find('td')
							.find('span')
							.show();
			}
			if (this.filterRs.dividingLine) {
				if ($('.bold_top_border').length == 0) {
					if (this.codeType < 4) {
						switch (this.modeType) {
							case 0:
								$('#allNumber')
									.find('tr')
									.each(function() {
										if (
											Number(
												$(this)
													.find('td')
													.eq(0)
													.text()
													.trim()
											) %
												5 ==
											0
										) {
											$(this).addClass('bold_top_border');
										}
									});
								break;
							case 1:
								$('#table_sttz')
									.find('tr')
									.each(function() {
										if (
											Number(
												$(this)
													.find('td')
													.eq(0)
													.text()
													.trim()
											) %
												5 ==
											0
										) {
											$(this).addClass('bold_top_border');
										}
									});
								break;
							case 2:
								$('#table_lu012')
									.find('tr')
									.each(function() {
										if (
											Number(
												$(this)
													.find('td')
													.eq(0)
													.text()
													.trim()
											) %
												5 ==
											0
										) {
											$(this).addClass('bold_top_border');
										}
									});
								break;
							case 3:
								$('#table_spj')
									.find('tr')
									.each(function() {
										if (
											Number(
												$(this)
													.find('td')
													.eq(0)
													.text()
													.trim()
											) %
												5 ==
											0
										) {
											$(this).addClass('bold_top_border');
										}
									});
								break;
							default:
								$('#allNumber')
									.find('tr')
									.each(function() {
										if (
											Number(
												$(this)
													.find('td')
													.eq(0)
													.text()
													.trim()
											) %
												5 ==
											0
										) {
											$(this).addClass('bold_top_border');
										}
									});
						}
					} else {
						$('#k3_dwzs')
							.find('tr')
							.each(function() {
								if (
									Number(
										$(this)
											.find('td')
											.eq(0)
											.text()
											.trim()
									) %
										5 ==
									0
								) {
									$(this).addClass('bold_top_border');
								}
							});
					}
				}
			} else {
				$('.bold_top_border').removeClass('bold_top_border');
			}
			if (!this.filterRs.disassemble) {
				$('canvas').remove();
				this.change++;
			} else {
				if ($('canvas').length == 0) {
					if (this.codeType < 4) {
						this.lineToChart('.hot', 1, '#0092e0');
					} else {
						this.lineToChart('.ding', 2, '#50befa');
						this.lineToChart('.pol', 1, '#ee9a00');
						this.lineToChart('.sin', 1, '#50befa');
					}
				}
			}
			$('.purple').removeClass('purple');
			if (this.filterRs.missingLayer) {
				if (this.mainData.list) {
					let temp = [];
					if (this.codeType < 4) {
						let s = this.codeType == 2 ? 0 : 1;
						let e = this.codeType == 2 ? 10 : this.codeType == 1 ? 11 : 12;
						for (let k = s; k < e; k++) {
							let flag = true;
							for (let i = 0; i < this.mainData.list.length; i++) {
								if (flag) {
									if (i == this.mainData.list.length - 1 || Number(this.mainData.list[i].num[this.tGoal]) == k) {
										let item = {};
										item.rows = i;
										item.cols = k + 2 + (this.codeType == 2 ? 0 : -1);
										temp.push(item);
										flag = false;
									}
								}
							}
						}
					} else {
						for (let k = 0; k < 6; k++) {
							let flag = true;
							for (let i = 0; i < this.mainData.list.length; i++) {
								if (flag) {
									if (i == this.mainData.list.length - 1 || Number(this.mainData.list[i].list.basic[this.tGoal][k + 1]) == 0) {
										temp.push({ rows: i, cols: k + 2 });
										flag = false;
									}
								}
							}
						}
						for (let i = 0; i < this.mainData.list.length; i++) {
							if (i == this.mainData.list.length - 1 || Number(this.mainData.list[i].list.bas[this.tGoal]['b']) == 0) {
								temp.push({ rows: i, cols: 8 });
								break;
							}
						}
						for (let i = 0; i < this.mainData.list.length; i++) {
							if (i == this.mainData.list.length - 1 || Number(this.mainData.list[i].list.bas[this.tGoal]['s']) == 0) {
								temp.push({ rows: i, cols: 9 });
								break;
							}
						}
						for (let i = 0; i < this.mainData.list.length; i++) {
							if (i == this.mainData.list.length - 1 || Number(this.mainData.list[i].list.sad[this.tGoal]['s']) == 0) {
								temp.push({ rows: i, cols: 10 });
								break;
							}
						}
						for (let i = 0; i < this.mainData.list.length; i++) {
							if (i == this.mainData.list.length - 1 || Number(this.mainData.list[i].list.sad[this.tGoal]['d']) == 0) {
								temp.push({ rows: i, cols: 11 });
								break;
							}
						}
					}
					temp.forEach(v => {
						if (this.codeType < 4) {
							$('#allNumber')
								.find('tr')
								.each(function(i) {
									if (i < v.rows) {
										$(this)
											.find('td')
											.eq(v.cols)
											.addClass('purple');
									}
								});
						} else {
							$('#k3_dwzs')
								.find('tr')
								.each(function(i) {
									if (i < v.rows) {
										$(this)
											.find('td')
											.eq(v.cols)
											.addClass('purple');
									}
								});
						}
					});
				}
			}
		},
		objectToArray(objArr) {
			objArr.forEach((obj, k) => {
				if (obj.constructor != Array) {
					let basic = [];
					let sdic = Object.keys(obj);
					// let sdic = Object.keys(obj).sort(); //根据key排序
					for (let i = 0; i < sdic.length; i++) {
						basic.push(obj[sdic[i]]);
					}
					objArr[k] = basic;
				}
			});
		},
		startCount(){
			let that = this;
			setInterval(function(){
				if(that.current_number != that.new_number){
					uni.showLoading({ title: 'loading' });
					that.getAnalysisDetail();
				}
			},2000)
		},
		actionSheetTap() {
			let that = this;
			uni.showActionSheet({
				title: '期数选择',
				itemList: ['当天', '近30期', '近60期', '近90期'],
				success: e => {
					let temp = [2000, 30, 60, 90];
					$('canvas').remove();
					that.tPeriods = temp[e.tapIndex];
					setTimeout(function() {
						that.filterCtrl();
					}, 500);
				}
			});
		},
		actionBallTap() {
			let that = this;
			var codeType = that.codeType;
			var itemList = [];
			if(codeType==1){
				itemList = ['冠军','亚军','第三名','第四名','第五名','第六名','第七名','第八名','第九名','第十名'];
			}else if(codeType == 2 || codeType==3){
				itemList = ['第一球','第二球','第三球','第四球','第五球'];
			}else if(codeType == 4){
				itemList= ['第一位','第二位','第三位'];
			}
			uni.showActionSheet({
				title: '期数选择',
				itemList: itemList,
				success: e => {
					that.tGoal = e.tapIndex;
					$('canvas').remove();
					setTimeout(function() {
						that.filterCtrl();
					}, 100);
				}
			});
		},
		async getAnalysisDetail() {
			let that = this;
			that.mainData = null;
			$('canvas').remove();
			await that.$api.getAnalysisDetail({ code: that.code, type: 'dwzs', date: that.date }).then(res => {
					if (res.code == 0) {
						if (that.codeType < 4) {
							// if (typeof res.data.list == 'object' && res.data.list.constructor == Array) {
								// res.data.list.forEach(v => {
								// 	that.objectToArray(v.list.basic);
								// });
								var arr = [];
								$.each(res.data.list,function(k,v){
									arr.push(res.data.list[k])
								})
								res.data.list = arr;
								$.map(res.data.list,function(v,key){
									that.objectToArray(v.list.basic);
								});
								that.new_number = res.data.list[0]['no'];
								if(that.new_number != that.current_number){
									return;
								}else{
									uni.hideLoading();
								}
								that.objectToArray(res.data.statistics.appear.basic);
								that.objectToArray(res.data.statistics.avg.basic);
								that.objectToArray(res.data.statistics.current.basic);
								that.objectToArray(res.data.statistics.maxAway.basic);
								that.objectToArray(res.data.statistics.max.basic);
								that.mainData = res.data;
								// that.loading.dismiss();
								setTimeout(function() {
									that.filterCtrl();
								}, 200);
							// } else {
							// 	setTimeout(that.getAnalysisDetail(), 5000);
							// }
						} else if (that.codeType == 4) {
							var arr = [];
							$.each(res.data.list,function(k,v){
								arr.push(res.data.list[k])
							})
							res.data.list = arr;
							that.new_number = res.data.list[0]['no'];
							if(that.new_number != that.current_number){
								return;
							}else{
								uni.hideLoading();
							}
							that.mainData = res.data;
							// that.loading.dismiss();
						}
						setTimeout(function() {
							that.filterCtrl();
						}, 100);
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
		padding-top: 5px;
		.pattern {
			margin-top: 5px;
			display: -webkit-box;
			height: 45px;
			line-height: 45px;
			background-color: #fff;
			width: 100%;
			border-bottom: 1px solid #dbdbdb;
			.mode {
				font-size: 12px;
				vertical-align: middle;
				line-height: 25px;
				width: 55px;
				display: inline-block;
				text-align: center;
				margin-left: 29px;
			}
			.checked {
				color: #fff;
				background: #e12121;
				border-radius: 25px;
			}
		}
		.btn-list {
			background-color: #fff;
			.btn-item {
				height: 30px;
				line-height: 30px;
				display: inline-block;
				height: 100%;
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
				position: relative;
				color: #e12121;
				flex: 1;
				margin-right: 20px;
				text-align: center;
				font-size: 12px;
			}
			.btn-sjtj {
				font-size: 12px;
				height: 30px;
				line-height: 30px;
				display: inline-block;
				position: absolute;
				right: 15px;
			}
		}
		.table-box{
			position: relative;
			table{
				background-color: #dbdbdb;
				border-spacing: 1;
				width: 100%;
				color: #999;
				th{
					text-align: center;
					height: 25px;
					background: #f0f0f0;
					font-size: 12px;
					color: #333;
				}
				.clospan td{
					text-align: center;
					height: 25px;
					background: #f0f0f0;
					font-size: 12px;
					color: #333;
				}
				td{
					text-align: center;
					height: 25px;
					background: #fff;
					min-width: 20px;
					font-size: 12px;						
					text{
						font-size: 12px;						
					}
				}
			}
		}
		.table_conBox .table-box table thead tr th {
		    text-align: center;
		    height: 25px;
		    background: #f0f0f0;
		    font-size: 12px;
		    color: #333;
		    // border: 1px solid #eaeaea;
		}
		.table_conBox .table-box table tbody tr td {
		    text-align: center;
		    font-size: 12px;
		    height: 25px;
		    background: #fff;
		    min-width: 20px;
		    // border: 1px solid #eaeaea;
		}
		.tabred text {
		    color: #ef020a;
		    font-size: 12px;
		    font-weight: 600;
		}
		.hot text {
		    display: inline-block;
		    height: 16px;
		    line-height: 16px;
		    width: 16px;
		    background: #50befa;
		    color: #fff;
		    border-radius: 50%;
		}
		.pol text {
		    display: inline-block;
		    height: 16px;
		    line-height: 16px;
		    width: 16px;
		    background: #ee9a00;
		    color: #fff;
		    border-radius: 50%;
		}
		.numodd text {
			display: inline-block;
			height: 20px;
			line-height: 20px;
			width: 20px;
			border-radius: 50%;
			color: #fff;
		    background: #3cb0ec;
		}
		.numeven text {
		    display: inline-block;
		    height: 20px;
		    line-height: 20px;
		    width: 20px;
		    border-radius: 50%;
		    color: #fff;
		    background: #e12121;
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
		.item-title {
			display: flex;
			.check-item {
				font-size: 14px;
				margin-right: 30px;
				color: #7c7c7c;
				margin-left: 20px;
			}
		}
		.content-item {
			display: flex;
			flex-wrap: wrap;
			padding: 0 15px;
			margin-bottom: 10px;
			.option {
				text-align: center;
				float: left;
				width: 22%;
				height: 30px;
				font-size: 14px;
				line-height: 30px;
				margin-right: 2%;
				border: 1px solid #e4e3e8;
				margin-top: 10px;
				border-radius: 3px;
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
