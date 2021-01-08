import {Injectable} from "@angular/core";
import {AppHttp} from "./app-http.service";
import {AppConfig} from "./app-config.service";

@Injectable()
export class HKService {
  constructor(private appHttp: AppHttp, private appConfig: AppConfig) {
  }

  getServerTime() {
    return this.appHttp.get("/v1/h5/xianggang/serviceTime");
  }

  getTypeTable() {
    return this.appHttp.get("/v1/h5/xianggang/typeTab");
  }
  //获取六合彩最新一期开奖结果
  getHKWinNumber(code) {
    return this.appHttp.get("/v1/h5/xianggang/instantLottery", {code: code});
  }

  //获取六合彩开奖记录
  getHKRecord(code, date) {
    return this.appHttp.get("/v1/h5/xianggang/history", {code: code, date: date, extra_type: 1});
  }

  //获取六合彩特码走势数据
  getHKSpecial(code, date) {
    return this.appHttp.get("/v1/h5/xianggang/history", {code: code, date: date, extra_type: 2});
  }

  //获取六合彩正码走势数据
  getHKPositive(code, date) {
    return this.appHttp.get("/v1/h5/xianggang/history", {code: code, date: date, extra_type: 3});
  }

  //获取六合彩生肖走势数据
  getHKZodiac(code, date) {
    return this.appHttp.get("/v1/h5/xianggang/history", {code: code, date: date, extra_type: 4});
  }

  //获取六合彩总和分析数据
  getHkSumAnalysis(code, date) {
    return this.appHttp.get("/v1/h5/xianggang/history", {code: code, date: date, extra_type: 5});
  }

  //获取六合彩露珠分析数据
  getHkLuzhuAnalysis(code, date, type) {
    return this.appHttp.get("/v1/h5/xianggang/chart", {code: code, year: date, type: type});
  }

  //六合资料列表
  getNewsData(code, page?: number, pageSize?: number) {
    return this.appHttp.get("/v1/h5/xianggang/article", {identify: code, page: page, per_page: pageSize});
  }

  //文章详情
  getNewsDetail(id) {
    return this.appHttp.get("/v1/h5/xianggang/articleDetail", {id:id});
  }

  //开奖日历
  getHkCalendar(date){
    return this.appHttp.get("/v1/h5/xianggang/lotteryDate",{date:date});
  }
  //获取banner图
  getBannerArr(){
    return this.appHttp.get("/v1/h5/xianggang/banner");
  }
  //获取首页公共内容（公告等）
  getCommon() {
    // return this.appHttp.post("/index/common");
    return this.appHttp.get("/v1/h5/caihui/config");
  }
}
