import urlConfig from './config.js'

const request = {}
const headers = {}
const PORT1 = '/baseinfo'
    
request.globalRequest = (url, method, data, power) => {
/*     权限判断 因为有的接口请求头可能需要添加的参数不一样，所以这里做了区分
    1 == 不通过access_token校验的接口
    2 == 文件下载接口列表
    3 == 验证码登录 */
        
    switch (power){
        case 1:
		    headers['Authorization'] = 'Basic a3N1ZGk6a3N1ZGk='
            headers['Accept'] = 'application/json'
            break;
        case 2:
            headers['Authorization'] = 'Basic a3N1ZGlfcGM6a3N1ZGlfcGM='
			headers['Accept'] = 'application/json'
            break;
        case 3:
            responseType = 'blob'
            break;
        default:
            headers['Authorization'] = `Bearer ${
                this.$store.getters.userInfo
            }`
            headers['TENANT-ID'] = this.$store.getters.userInfo.tenant_id
			headers['Accept'] = 'application/json'
            break;
    }
	//添加对应的数据源类型 lotterySourceFrom
	// var lotterySourceFrom = uni.getStorageSync("lotterySourceFrom")
	// if(!lotterySourceFrom){
	// 	lotterySourceFrom = 0;
	// 	uni.setStorageSync("lotterySourceFrom",0);
	// }
 //    data["lotterySourceFrom"] = lotterySourceFrom;
	
    return uni.request({
        url: urlConfig + url,
        method,
        data: data,
        dataType: 'json',
        header: headers
    }).then(res => {
        if (res[1].data.status && res[1].data.code == 200) {
            return res[1]
        } else {
			// console.log(res[1].data);
// 			uni.showToast({
// 　　　　　　　　　　　　title: "网络异常，请稍后再试",
// 			 //title: parmas.message,
// 　　　　　　　　　　　　icon: 'none'
// 　　　　　　　　　　})
// 			return Promise.reject()
            return res[1].data
        }
    }).catch(parmas => {
// 		console.log(parmas);
// 　　　　　　switch (parmas.code) {
// 　　　　　　　　case 401:
// 　　　　　　　　　　uni.clearStorageSync()
// 　　　　　　　　　　break
// 　　　　　　　　default:
　　　　　　　　　　uni.showToast({
　　　　　　　　　　　　title: "网络异常，请稍后再试",
// 　　　　　　　　　　　　title: parmas.message,
　　　　　　　　　　　　icon: 'none'
　　　　　　　　　　})

　　　　　　　　　　return Promise.reject()
// 　　　　　　　　　　break
// 　　　　　　}
　　})
 } 

export default request