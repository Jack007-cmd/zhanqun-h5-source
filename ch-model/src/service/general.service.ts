import {Injectable} from "@angular/core";
import {AppHttp} from "./app-http.service";
import {AppConfig} from "./app-config.service";
import {StorageService} from "./storage.service";
@Injectable()
export class GeneralService {

  // http://422.zhanqun.com/assets/web/common/lottery/lotteryVideo/index.html?key=xyssc
  // http://xxx.zhanqun.com/assets/web/common/lottery/lotteryVideo/index.html?key=xxx
  public preUrl=this.appConfig.imgHost+'/assets/web/common/lottery/lotteryVideo/index.html?key=';

  constructor(private appHttp: AppHttp,private appConfig:AppConfig, private localStorage: StorageService) {
  }

  getServerTime() {
    return this.appHttp.get("/v1/h5/caihui/index/server-time");
  }

  // 获取资讯列表
  getInfoList(pageSize: number = 20, page: number = 1) {
    return this.appHttp.get("/v1/h5/caihui/information", {per_page: pageSize, page: page});
  }

  //获取资讯详情
  getInfoDetail(id: string) {
    return this.appHttp.get("/v1/h5/caihui/informationDetail", {id: id});
  }

  //浏览资讯浏览量+1
  // readInfoDetail(id: string) {
  //   return this.appHttp.get("/index/read-information", {_id: id});
  //
  // }

  //意见反馈
  submitComment(name, number, content, type) {

    return this.appHttp.post("/v1/h5/caihui/index/leave-msg", {name: name, number: number, content: content, type: type});
  }

  //首页轮播图
  getBanner() {
    return this.appHttp.get("/v1/h5/caihui/banner");
  }

  //获取首页公共内容（公告等）
  getCommon() {
    return this.appHttp.get("/v1/h5/caihui/config");
  }

  //APP启动彩种配置
  getBaseAboutProvide() {
    return this.appHttp.get("/v1/h5/caihui/index/app-update-json");
  }
  //获取彩种跳转页面和视频链接配置
  getBaseConfig(code: string) {
    let aboutKinds = this.localStorage.getObject("aboutKinds");
    if (aboutKinds["item1"].indexOf(code) > -1) {
      return {des: "ItemDetail_01Page", url: this.preUrl + code};
    } else if (aboutKinds["item2"].indexOf(code) > -1) {
      return {des: "ItemDetail_02Page", url: this.preUrl + code};
    } else if (aboutKinds["item3"].indexOf(code) > -1) {
      return {des: "ItemDetail_03Page", url: this.preUrl + code};
    } else if (aboutKinds["item4"].indexOf(code) > -1) {
      return {des: "ItemDetail_04Page", url: this.preUrl + code};
    } else if (aboutKinds["item5"].indexOf(code) > -1) {
      return {des: "ItemDetail_05Page", url: this.preUrl + code};
    } else if (aboutKinds["item6"].indexOf(code) > -1) {
      return {des: "ItemDetail_06Page", url: ''};
    } else if (aboutKinds["item7"].indexOf(code) > -1) {
      return {des: "ItemDetail_07Page", url: this.preUrl + code};
    } else if (aboutKinds["item8"].indexOf(code) > -1) {
      return {des: "ItemDetail_08Page", url: this.preUrl + code};
    } else if (aboutKinds["item9"].indexOf(code) > -1) {
      return {des: "ItemDetail_09Page", url: ''};
    } else if (aboutKinds["item10"].indexOf(code) > -1) {
      return {des: "ItemDetail_10Page", url: ''};
    } else if (aboutKinds["item11"].indexOf(code) > -1) {
      return {des: "ItemDetail_11Page", url: this.preUrl + code};
    } else if (aboutKinds["item12"].indexOf(code) > -1) {
      return {des: "ItemDetail_12Page", url: this.preUrl + code};
    } else {
      return null;
    }
  }
  //获取彩种类型index
  getAboutItemIndex(code:string){
    let aboutKinds = this.localStorage.getObject("aboutKinds");
    if (aboutKinds["item1"].indexOf(code) > -1) {
      return 1;
    }else if (aboutKinds["item2"].indexOf(code) > -1) {
      return 2;
    }else if (aboutKinds["item3"].indexOf(code) > -1) {
      return 3;
    }else if (aboutKinds["item4"].indexOf(code) > -1) {
      return 4;
    }else if (aboutKinds["item5"].indexOf(code) > -1) {
      return 5;
    }else if (aboutKinds["item6"].indexOf(code) > -1) {
      return 6;
    }else if (aboutKinds["item7"].indexOf(code) > -1) {
      return 7;
    }else if (aboutKinds["item8"].indexOf(code) > -1) {
      return 8;
    }else if (aboutKinds["item9"].indexOf(code) > -1) {
      return 9;
    }else if (aboutKinds["item10"].indexOf(code) > -1) {
      return 10;
    }else if (aboutKinds["item11"].indexOf(code) > -1) {
      return 11;
    }else if (aboutKinds["item12"].indexOf(code) > -1) {
      return 12;
    }else{
      return -1;
    }
  }
}














