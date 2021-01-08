import {Injectable} from "@angular/core";
import {AppHttp} from "../../service/app-http.service";
import {StorageService} from "../../service/storage.service";

@Injectable()
export class AboutService {

  constructor(private appHttp: AppHttp, private localStorage: StorageService) {

  }

  //获取彩种分类
  getAboutSort() {
    return this.appHttp.get("/v1/h5/caihui/index/cp-hall");
  }

  //即时开奖
  getAboutOnce(code: string) {
    return this.appHttp.get("/v1/lottery/caihui/index/lottery-once", {code: code});
  }

  //获取彩种的分析列表类别
  getAnalysisSort(code: string) {
    return this.appHttp.get("/v1/h5/caihui/index/analysis", {code: code, type: 'app'});
  }

  //获取分析结果
  getAnalysisDetail(code: string, type: string, date: string, extra?: string) {
    return this.appHttp.get("/v1/lottery/caihui/index/lottery-statistics", {
      code: code,
      type: type,
      date: date,
      extra: extra
    });
  }

  //获取热门彩种
  getHotAbout() {
    return this.appHttp.get("/v1/h5/caihui/index/hot-lottery");
  }


  getPlanCommon(code) {
    return this.appHttp.get("/v1/lottery/caihui/recommend/common", {code: code});
  }

  //获取购彩计划
  getAboutPlans(code, time, date) {
    return this.appHttp.get("/v1/lottery/caihui/recommend/plan", {code: code, time, date});
  }

  getAboutCategoryList() {
    return this.appHttp.get("/v1/h5/caihui/recommend/category-list");
  }

  getRuleDetail(code) {
    return this.appHttp.get("/v1/h5/caihui/index/rule-detail", {code: code});
  }

  getKillPlan(code, limit, date) {
    return this.appHttp.get("/v1/lottery/caihui/recommend/kill", {code: code, limit, date});
  }

  getLongRemind(codeArr, num) {
    return this.appHttp.get("/v1/h5/caihui/index/long-queue-remind", {code: codeArr, num: num});
  }

  getRecommendTwoSides(date) {
    return this.appHttp.get("/v1/lottery/caihui/recommend/two-sides", {date: date});
  }

  //获取下一个彩种基础数据
  getNextAbout(code, hot, sortKey) {
    let index: number = -1;
    if (hot) {
      let hotArr = this.localStorage.getArray("hotArr");
      hotArr.forEach((v, i) => {
        if (v.code == code) {
          index = i + 1;
          return;
        }
      });
      if (index == -1) return null;
      let temObj: any = index < hotArr.length ? hotArr[index] : hotArr[0];
      temObj.sortKey = -1;
      return temObj;
    } else {
      let basicArr = this.localStorage.getArray("basicArr");
      let sortArr = this.localStorage.getArray("sort");
      let countIndex: number = 0;
      let nextSortKey = -1;
      let f = false;
      sortArr.forEach((v, i) => {
        if (v.key == sortKey) {
          v.list.forEach((val, j) => {
            if (val.code == code) {
              countIndex += (i == 0 ? j : (j + 1));
              if ((j + 1) < v.list.length) {
                nextSortKey = sortKey;
              } else {
                nextSortKey = Number(sortKey) + 1;
              }
              f = true;
              return;
            }
          });
        }
        if (f) return;
        countIndex += (i == 0 ? (sortArr[i].list.length - 1) : sortArr[i].list.length);
      });
      if (countIndex < basicArr.length) {
        let temObj = basicArr[countIndex];
        temObj.sortKey = nextSortKey;
        return temObj;
      } else {
        return null;
      }
    }
  }

  //获取香港六合彩最新一期开奖结果
  getHKWinNumber(code) {
    return this.appHttp.get("/v1/h5/xianggang/instantLottery", {code: code});
  }

  /**
   * Get
   * 彩种数据分析--筛选条件
   * @param code
   */
  getFilterFactor(code) {
    return this.appHttp.get("/v1/lottery/caihui/analysis/screen", {code: code});
  }

  /**
   *  GET
   * 数据分析
   * @param code
   * @param position
   * @param bettingLimit
   * @param num
   */
  getDataAnalysisDetail(code, position, limit, bettingLimit, num) {
    return this.appHttp.get("/v1/lottery/caihui/analysis", {
      code: code,
      position: position,
      limit: limit == 0 ? '' : limit,
      bettingLimit: bettingLimit,
      num: num
    });
  }
}
