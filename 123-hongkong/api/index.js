import request from '@/common/request.js'
import {
	formatGetUri
} from '@/common/util.js'
import url_config from '@/common/config.js'
const api = {}
const PORT1 = 'baseinfo'
const preUrl = url_config + '/assets/web/common/lottery/lotteryVideo/index.html?key=';
/**
 * 获取服务器时间差
 */
api.getServerTime = params => request.globalRequest(`/v1/h5/caihui/index/server-time`, 'GET', {}, 1);

/**
 * 首页轮播图
 */
api.getSlideListNew = params => request.globalRequest(`/v1/web/slide/listNew`, 'GET', {}, 1);

/**
 * 首页实时开奖号码
 */
api.getAboutOnce = params => request.globalRequest(`/v1/lottery/lh/once`, 'GET', params, 1);

/**
 * 首页开奖历史
 */
api.getHistoryNew = params => request.globalRequest(`/v1/lottery/lh/historyNew`, 'GET', params, 1);

/**
 * 首页中奖神器
 */
// api.getLotteryAnalysisAndCategory = params => request.globalRequest(`/v1/lottery/caihui/lotteryAnalysisAndCategory`, 'GET', params, 1);

/**
 * 获取分析结果
 */
api.getAnalysisDetail = params => request.globalRequest(`/v1/lottery/caihui/lotteryStatistic`, 'GET', params, 1);

/**
 *  GET
 * 极速六合彩-获取即时开奖、路珠、特码、正码、生肖等数据分类
 * @param periods
 * @param date
 * @param type
 */
api.getLotteryAnalysis= params => request.globalRequest(`/v1/lottery/caihui/lotteryAnalysisAndCategory`, 'GET', params, 1);

/**
 * 首页轮播图
 */
api.getForCategory = params => request.globalRequest(`/v1/web/article/forCategory`, 'GET', params, 1);

/**
 * 获取澳门六合彩链接
 */
api.getLhcMenu = params => request.globalRequest(`/v1/web/menu`, 'GET', params, 1);

/**
 * 获取推荐预测、专家心水详情
 */
api.getArticle = params => request.globalRequest(`/v1/web/article/fromIdentify`, 'GET', params, 1);

export default api