import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AlertService} from "../../../service/alert.service";
import {AboutService} from "../../about/about.service";
import {StorageService} from "../../../service/storage.service";
import {DomSanitizer} from "@angular/platform-browser";
import {PrecisionPlanService} from "./precision-plan.service";
import {AppConfig} from "../../../service/app-config.service";

/**
 * Generated class for the PrecisionPlanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var $: any;

@Component({
  selector: 'page-precision-plan',
  templateUrl: 'precision-plan.html',
})
export class PrecisionPlanPage {
  currentType = {
    code: 'bjpks',
    name: "北京PK拾",
    type: 1
  };
  expert: any;
  public showType = -1;
  public showVideo = false;//视频显示
  sortArr = [];
  video_url;
  public myDate;//选中日期
  private startDay;
  private today;
  public dayArr = [];
  public now = new Date();

  categoryList = [];
  private aboutList: any;//当前期基本数据
  private current_number;
  private allSeconds: number = 0;//距离下期开奖时间（秒）(动态)
  private interval: number;  //接口返回数据时距离下期开奖时间（秒）
  private hour;//时
  private minute = "00";//分
  private second = "00"; //秒

  private st;
  private rl;
  readonly timeDiff: number;//服务器与客户端时间差

  showExpert = false;
  size = 5;
  roundRateList = [];
  detailList = [];
  page = 1;
  hasNext = false;
  is_sum_plan = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertService: AlertService, private appConfig: AppConfig,
              private aboutService: AboutService, private storageService: StorageService, private sanitizer: DomSanitizer, private pService: PrecisionPlanService) {
    let m = (this.now.getMonth() < 9 ? '0' : '') + (this.now.getMonth() + 1);
    let d = (this.now.getDate() < 10 ? '0' : '') + this.now.getDate();
    this.today = this.myDate = this.now.getFullYear() + "-" + m + "-" + d;
    this.startDay = (this.now.getFullYear() - 5) + "-" + m + "-" + d;
    // for (let i = 1; i <= this.now.getDate(); i++) {
    //   this.dayArr.push({date: this.now.getFullYear() + "-" + m + "-" + (i < 10 ? '0' : '') + i, d: i});
    // }
    this.currentType["video_url"] = this.sanitizer.bypassSecurityTrustResourceUrl(this.appConfig.imgHost + '/assets/web/common/lottery/lotteryVideo/JSPK10/index.html?key=bjpks');

    this.timeDiff = Number(this.storageService.get("timeDiff"));
    this.timeDiff = isNaN(this.timeDiff) ? 0 : this.timeDiff;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrecisionPlanPage');
  }

  ionViewWillEnter() {
    this.getAboutCategoryList();
    // if(this.navParams.get("code") && this.navParams.get("code")!=this.currentType.code){
    //   let basicArr = this.storageService.getArray("basicArr");
    //   basicArr.forEach((v) => {
    //     if (v.code == this.navParams.get("code")) {
    //       this.currentType.code=v.code;
    //       this.currentType.name=v.name;
    //       this.currentType.type = Number(v.des.split("_")[1].split("P")[0]);
    //       this.currentType["video_url"] = this.sanitizer.bypassSecurityTrustResourceUrl(v.url);
    //       return;
    //     }
    //   });
    // }
    this.getAboutOnce();
    this.getAboutSort()
  }

  //视频播放控制
  videoCtrl() {
    this.showVideo = !this.showVideo;
  }

  // ionViewDidLoad() {
  ionViewDidEnter() {
    // if ($(".dayList").length > 0) {
    //   $(".dayList").last().width(this.now.getDate() * 32);
    //   $(".dayList").children().last()[0].scrollIntoView();
    // }
  }

  ionViewWillLeave() {
    clearInterval(this.st);
    clearInterval(this.rl);
  }

  //获取当前期基本数据
  getAboutOnce() {
    let that: any = this;
    that.aboutService.getAboutOnce(that.currentType.code).then((rs) => {
      if (rs.code == 0) {
        that.aboutList = rs.data;
        that.current_number = rs.data.current_number;
        that.countDown();
        that.numberRoll();
      } else {
        that.alertService.msg(rs.msg);
      }
    });
  }

  //下期开奖倒计时
  countDown() {
    this.interval = this.allSeconds = Math.floor((new Date(this.aboutList.next_time.replace(/-/g, "/")).getTime() - new Date().getTime() - this.timeDiff) / 1000);
    if (this.allSeconds > 0) {
      if (this.expert) {
        this.page = 1;
        this.hasNext = false;
        this.detailList = [];
        this.getExpertDetail(() => {
        });
      }
      this.getAboutSort();
    }
    this.st = setInterval(() => {
      this.allSeconds -= 2;
      if (this.allSeconds <= 0) {
        this.minute = '00';
        this.second = '00';
        this.getAboutOnce();
        clearInterval(this.st);
      } else {
        this.hour = Math.floor(this.allSeconds / 3600);
        let lastSeconds = this.allSeconds % 3600;
        this.minute = ((lastSeconds / 60 < 10) ? '0' : '') + Math.floor(lastSeconds / 60);
        this.second = (lastSeconds % 60 < 10 ? '0' : '') + lastSeconds % 60;
        if ($("#redLine")) {
          $("#redLine").width(100 * this.allSeconds / this.interval + "%");
        }
      }
    }, 2000);
  }

  //号码滚动
  numberRoll() {
    let that: any = this;
    that.rl = setInterval(() => {
      if (that.allSeconds >= 0) {
        clearInterval(this.rl);
        return;
      }
      that.aboutList.current_code.forEach((v, k) => {
        that.aboutList.current_code[k] = Math.floor(10 * Math.random());
      });
    }, 200);
  }

  getAboutCategoryList() {
    let that: any = this;
    that.aboutService.getAboutCategoryList().then((rs) => {
      if (rs.code == 0) {
        that.categoryList = [];
        Object.keys(rs.data).forEach(k => {
          rs.data[k].list.forEach((v) => {
            let temp = that.getAboutItem(v.code);
            // console.log(temp);
            v['des'] = temp['des'];
            v['url'] = temp['url'];
            v['logo'] = temp['logo'];
          });
          that.categoryList.push(rs.data[k]);
        });
      }
    });
  }

  switchType(item) {
    this.showType = -1;
    if (this.currentType.code == item.code) return;
    this.currentType.code = item.code;
    this.currentType.name = item.name;
    this.currentType['video_url'] = this.sanitizer.bypassSecurityTrustResourceUrl(item['url']);
    this.currentType.type = Number(item.des.split("_")[1].split("P")[0]);
    clearInterval(this.st);
    clearInterval(this.rl);
    this.getAboutOnce();
  }

  sum(codeArr) {
    let sum = 0;
    if (codeArr.length > 0) {
      codeArr.forEach(v => {
        sum += Number(v);
      });
    }
    return sum;
  }

  getAboutSort() {
    this.pService.getAboutSort(this.currentType.code, this.size).then((rs) => {
      if (!rs.code) {
        this.roundRateList = rs;
      }
    });
  }

  switchSize(num) {
    if (this.size == num) return;
    this.size = num;
    if (this.expert) {
      this.page = 1;
      this.hasNext = false;
      this.detailList = [];
      this.getExpertDetail(() => {
      });
    } else {
      this.getAboutSort();
    }
  }

  showExpertDetail(id, no, name) {
    this.showExpert = true;
    this.expert = {
      expert_no: no,
      expert_id: id,
      name: name
    };
    this.getExpertDetail(() => {
    });
  }

  hideExpertDetail() {
    this.showExpert = false;
    this.expert = null;
    this.page = 1;
    this.hasNext = false;
    this.detailList = [];
    this.getAboutSort();
  }

  getExpertDetail(callback) {
    this.pService.getExpertDetail(this.currentType.code, this.size, this.expert.expert_no, this.expert.expert_id, this.myDate, this.page).then(rs => {
      if (!rs.code) {
        callback();
        this.is_sum_plan = rs.is_sum_plan;
        this.hasNext = rs.list.current_page != rs.list.last_page;
        this.detailList.push.apply(this.detailList, rs.list.data);
        if (this.hasNext) this.page += 1;
      }
    });
  }

  switchDate() {
    if (this.expert) {
      this.page = 1;
      this.hasNext = false;
      this.detailList = [];
      this.getExpertDetail(() => {
      });
    }
  }

  doInfinite(infiniteScroll) {
    this.getExpertDetail(() => {
      infiniteScroll.complete();
    });
  }

  getAboutItem(code) {
    let basicArr = this.storageService.getArray("basicArr");
    let data = basicArr.filter(item => {
      return item.code == code;
    });
    return data[0];
  }

  ionScroll(event) {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        if (event.directionY == "down") {
          elements[key].style.display = 'none';
        } else {
          elements[key].style.display = 'flex';
        }
      });
    }
  }
}
