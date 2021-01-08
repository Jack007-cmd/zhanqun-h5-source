import request from '@/common/request.js'
import {
	formatGetUri
} from '@/common/util.js'
import url_config from '@/common/config.js'
const api = {}
const PORT1 = 'baseinfo'
const preUrl = url_config + '/assets/web/common/lottery/lotteryVideo/index.html?key=';
// POST请求方式
// api.register = params => request.globalRequest(`${PORT1}/mobile/signUp`, 'POST', params, 1)
// GET请求方式
// api.register = params => request.globalRequest(`${PORT1}/mobile/signUp${formatGetUri(params)}`, 'GET',{}, 1)

/**
 * 获取服务器时间差
 */
api.getServerTime = params => request.globalRequest(`/v1/h5/caihui/index/server-time`, 'GET', {}, 1)
/**
 * 获取 APP启动彩种配置
 */
api.getBaseAboutProvide = params => request.globalRequest(`/v1/h5/caihui/index/app-update-json`, 'GET', {}, 1)
/**
 * 获取彩种分类
 */
api.getAboutSort = params => request.globalRequest(`/v1/h5/caihui/index/cp-hall`, 'GET', {}, 1)
/**
 * 获取热门彩种
 */
api.getHotAbout = params => request.globalRequest(`/v1/h5/caihui/index/hot-lottery`, 'GET', {}, 1)

//获取彩种跳转页面和视频链接配置
api.getBaseConfig = code => {
	if(!code){
		return;
	}
// const source = uni.getStorageSync("lotterySourceFrom")||0;
	// if(source==1){
	// 	const about12 = ['jssc', 'jsk3', 'jsklsf', 'ajxys', 'jsft', 'xyft', 'sgft', 'xyssc', 'jslhc', 'jsssc', 'ajxyw', 'ajxyb'];
	// 	if(about12.indexOf(code)>-1){
	// 		code = 'new'+code;
	// 	}
	// }
	const aboutKinds = uni.getStorageSync('aboutKinds');
	if (aboutKinds["item1"].indexOf(code) > -1) {
		return {
			des: "item-detail-01",
			url: preUrl + code
		};
	} else if (aboutKinds["item2"].indexOf(code) > -1) {
		return {
			des: "item-detail-02",
			url: preUrl + code
		};
	} else if (aboutKinds["item3"].indexOf(code) > -1) {
		return {
			des: "item-detail-03",
			url: preUrl + code
		};
	} else if (aboutKinds["item4"].indexOf(code) > -1) {
		return {
			des: "item-detail-04",
			url: preUrl + code
		};
	} else if (aboutKinds["item5"].indexOf(code) > -1) {
		return {
			des: "item-detail-05",
			url: preUrl + code
		};
	} else if (aboutKinds["item6"].indexOf(code) > -1) {
		return {
			des: "item-detail-06",
			url: ''
		};} else if (aboutKinds["item7"].indexOf(code) > -1) {
		return {
			des: "item-detail-07",
			url: preUrl + code
		};
	} else if (aboutKinds["item8"].indexOf(code) > -1) {
		return {
			des: "item-detail-08",
			url: preUrl + code
		};
	} else if (aboutKinds["item9"].indexOf(code) > -1) {
		return {
			des: "item-detail-09",
			url: ''
		};
	} else if (aboutKinds["item10"].indexOf(code) > -1) {
		return {
			des: "item-detail-10",
			url: ''
		};
	} else if (aboutKinds["item11"].indexOf(code) > -1) {
		return {
			des: "item-detail-11",
			url: preUrl + code
		};
	} else if (aboutKinds["item12"].indexOf(code) > -1) {
		return {
			des: "item-detail-12",
			url: preUrl + code
		};
	} else if (aboutKinds["item13"].indexOf(code) > -1) {
		return {
			des: "item-detail-13",
			url: ''
		};
	} else {
		return null;
	}
}

/**
 * 意见反馈
 */
api.submitComment = params => request.globalRequest(`/v1/h5/caihui/index/leave-msg`, 'POST', params, 1)

/**
 * 获取首页公共内容（公告等）
 */
api.getCommon = params => request.globalRequest(`/v1/h5/caihui/config`, 'GET', {}, 1)
/**
 * 即时开奖
 */
api.getAboutOnce = params => request.globalRequest(`/v1/lottery/caihui/index/lottery-once`, 'GET', params, 1)

//获取彩种类型index
api.getAboutItemIndex = code => {
	if (code.indexOf('xglhc') != -1 || code.indexOf('amlhc') != -1) {
		return 14;
	}
	const aboutKinds = uni.getStorageSync('aboutKinds');
	if (aboutKinds["item1"].indexOf(code) > -1) {
		return 1;
	} else if (aboutKinds["item2"].indexOf(code) > -1) {
		return 2;
	} else if (aboutKinds["item3"].indexOf(code) > -1) {
		return 3;
	} else if (aboutKinds["item4"].indexOf(code) > -1) {
		return 4;
	} else if (aboutKinds["item5"].indexOf(code) > -1) {
		return 5;
	} else if (aboutKinds["item6"].indexOf(code) > -1) {
		return 6;
	} else if (aboutKinds["item7"].indexOf(code) > -1) {
		return 7;
	} else if (aboutKinds["item8"].indexOf(code) > -1) {
		return 8;
	} else if (aboutKinds["item9"].indexOf(code) > -1) {
		return 9;
	} else if (aboutKinds["item10"].indexOf(code) > -1) {
		return 10;
	} else if (aboutKinds["item11"].indexOf(code) > -1) {
		return 11;
	} else if (aboutKinds["item12"].indexOf(code) > -1) {
		return 12;
	} else if (aboutKinds["item13"].indexOf(code) > -1) {
		return 13;
	}else {
		return -1;
	}
}

/**
 * 获取香港六合彩最新一期开奖结果
 */
api.getHKWinNumber = params => request.globalRequest(`/v1/h5/xianggang/instantLottery`, 'GET', params, 1)
/**
 * 获取彩种的分析列表类别
 */
api.getAnalysisSort = params => request.globalRequest(`/v1/h5/caihui/index/analysis`, 'GET', params, 1)

/**
 * 获取分析结果
 */
api.getAnalysisDetail = params => request.globalRequest(`/v1/lottery/caihui/lotteryStatistic`, 'GET', params, 1)

/**
 * 长龙提醒
 */
api.getLongRemind = params => request.globalRequest(`/v1/h5/caihui/index/long-queue-remind`, 'GET', params, 1)

/**
 * 彩种系列分类
 */
// api.getAboutSeriesList = params => request.globalRequest(`/v1/h5/caihui/recommend/category-list`, 'GET', params, 1)
api.getAboutSeriesList = params => request.globalRequest(`/v1/lottery/caihui/precisePlanLotteryAndCategoryList`, 'GET', params, 1)
/**
 * GET
 * 精准计划 - 专家中奖率排行榜
 * @param code
 * @param size
 */
api.getLeaderboard = params => request.globalRequest(`/v1/web/lottery/recommend-plan/index`, 'GET', params, 1)
/**
 * GET
 * 精准计划 - 专家中奖详情
 * @param code
 * @param size
 * @param expert_no
 * @param expert_id
 * @param date
 */
api.getExpertDetail = params => request.globalRequest(`/v1/web/lottery/recommend-plan/detail`, 'GET', params, 1)
/**
 * Get
 * 彩种数据分析--筛选条件
 * @param code
 */
api.getFilterFactor = params => request.globalRequest(`/v1/lottery/caihui/analysis/screenNew`, 'GET', params, 1)
/**
 *  GET
 * 数据分析
 * @param code
 * @param position
 * @param bettingLimit
 * @param num
 */
api.getDataAnalysisDetail = params => request.globalRequest(`/v1/lottery/caihui/analysis`, 'GET', params, 1)

/**
 * 获取下一个彩种基础数据
 */
api.getNextAbout = (code, sortKey) => {
	let index = -1;
	if (sortKey == -1) {
		const hotArr = uni.getStorageSync("hotArr");
		hotArr.forEach((v, i) => {
			if (v.code == code) {
				index = i + 1;
				return;
			}
		});
		if (index == -1) return null;
		return index < hotArr.length ? hotArr[index] : hotArr[0];
	} else {
		const sortArr = uni.getStorageSync("sort");
		let countIndex = 0;
		let nextSortKey = -1;
		let next = null;
		sortArr.forEach((v, i) => {
			if (v.key == sortKey) {
				v.list.forEach((val, j) => {
					if (val.code == code) {
						let tem = j + 1;
						if (v.list[tem] && v.list[tem].code.indexOf('xglhc') != -1) {
							tem += 1;
						}
						if (v.list[tem] && v.list[tem].code.indexOf('amlhc') != -1) {
							tem += 1;
						}
						countIndex += tem;
						if (countIndex < v.list.length) {
							nextSortKey = sortKey; //下一彩种与当前彩种属于同类
						} else {
							countIndex = 0
							nextSortKey = Number(sortKey) + 1; //下一彩种与当前彩种不同类
						}
						return;
					}
				});
			}
			return;
		});
		if (nextSortKey == sortKey) {
			sortArr.forEach((v, i) => {
				if (v.key == nextSortKey) {
					next = v.list[countIndex];
				}
				return;
			});
		} else {
			sortArr.forEach((v, i) => {
				if (v.key == nextSortKey) {
					next = v.list[0];
				}
				return;
			});
		}
		return next;
	}
}

/**
 *  GET
 * 长龙提醒彩种类别
 * @param code
 * @param position
 * @param bettingLimit
 * @param num
 */
api.getDataCpHallDetail = params => request.globalRequest(`/v1/lottery/caihui/changLong/lotterySeries`, 'GET', params, 1)

/**
 *  GET
 * 极速六合彩-获取即时开奖、路珠、特码、正码、生肖等数据分类
 * @param periods
 * @param date
 * @param type
 */
api.getLhcLotteryAnalysis= params => request.globalRequest(`/v1/lottery/caihui/lotteryAnalysisAndCategory`, 'GET', params, 1)

/**
 * 	获取当前彩种的开奖视频
 */
api.getCurrentUrl = code => {	
	const source = uni.getStorageSync("lotterySourceFrom")||0;
	if(source==1){
		const about12 = ['jssc', 'jsk3', 'jsklsf', 'ajxys', 'jsft', 'xyft', 'sgft', 'xyssc', 'jslhc', 'jsssc', 'ajxyw', 'ajxyb'];
		if(about12.indexOf(code)>-1){
			code = 'new'+code;
		}
	}
	return preUrl + code;
}


export default api