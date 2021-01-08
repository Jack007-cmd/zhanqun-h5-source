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
api.getServerTime = params => request.globalRequest(`/v1/h5/caihui/index/server-time`, 'GET', {}, 1)

/**
 * 即时开奖
 */
api.getAboutOnce = params => request.globalRequest(`/v1/h5/caihui/newLottery/once`, 'GET', params, 1)

/**
 * 获取分析结果
 * H5开奖网--新彩种l历史记录
 */
api.getAnalysisDetail = params => request.globalRequest(`/v1/h5/caihui/newLottery/history`, 'GET', params, 1)

/**
 * H5开奖网--新彩种列表
 */
api.getLotteryList = params => request.globalRequest(`/v1/h5/caihui/newLottery/lotteryList`, 'GET', params, 1)

/**
 * H5开奖网--彩种分类及彩种列表
 */
api.getCategoryAndLottery = params => request.globalRequest(`/v1/h5/caihui/newLottery/categoryAndLottery`, 'GET', params, 1)

export default api