import {Component} from '@angular/core';
import { LoadingController, NavController, NavParams,Events} from 'ionic-angular';
import {AboutService} from "../../about/about.service";
import {AlertService} from "../../../service/alert.service";
import {StorageService} from "../../../service/storage.service";
/**
 * Generated class for the AboutPlanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var $: any;

@Component({
  selector: 'page-about-plan',
  templateUrl: 'about-plan.html',
})
export class AboutPlanPage {
  public code: string;
  public aboutName: string;
  private showKinds = false;
  private showType = -1;
  private planNo = 0;
  public myDate;//选中日期
  private startDay;
  private today;
  public now = new Date();
  public mainData: any;
  public planData = [];
  public categoryList: any;
  private allSeconds: number=0;//距离下期开奖时间（秒）(动态)
  private hour;//时
  private minute = "00";//分
  private second = "00"; //秒
  private st;
  public timeIndex = 0;
  public objectKeys = Object.keys;
  private codeType: number;
  private selectedKey='101';
  constructor(public navCtrl: NavController, public navParams: NavParams, public aService: AboutService,public events:Events,
              public loadingCtrl: LoadingController, public alertService: AlertService,private localStorage:StorageService) {
    let m = (this.now.getMonth() < 9 ? '0' : '') + (this.now.getMonth() + 1);
    let d = (this.now.getDate() < 10 ? '0' : '') + this.now.getDate();
    this.today = this.myDate = this.now.getFullYear() + "-" + m + "-" + d;
    this.startDay = (this.now.getFullYear() - 5) + "-" + m + "-" + d;
  }

  ionViewDidEnter(){
    $(".timePeriod").last().val("全部");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPlanPage');
  }

  ionViewWillEnter() {
    this.getAboutCategoryList();
  }


  codeTypeChange() {
    let allTypes = this.localStorage.getObject("aboutPlan");
    if (allTypes["type1"].indexOf(this.code) > -1) {
      this.codeType = 1;
    } else if (allTypes["type2"].indexOf(this.code) > -1) {
      this.codeType = 2;
    } else if (allTypes["type3"].indexOf(this.code) > -1) {
      this.codeType = 3;
    } else if (allTypes["type4"].indexOf(this.code) > -1) {
      this.codeType = 4;
    }
  }


  ionViewWillLeave() {
    if(this.st)    clearInterval(this.st);
  }

  timeIndexChange(index, period) {
    this.timeIndex = index;
    let val = index == 0 ? "全部" : period.start.substring(0, 5) + "-" + period.end.substring(0, 5);
    $(".timePeriod").last().val(val);
    this.showType = -1;
    this.getAboutPlans();
  }

  aboutChange(item) {
    this.code = item.code;
    this.aboutName = item.name;
    this.showType = -1;
    this.codeTypeChange();
    this.getPlanCommon();
  }

  getPlanCommon() {
    let that: any = this;
    that.aService.getPlanCommon(that.code).then((rs) => {
      if (rs.code == 0) {
        that.mainData = rs.data;
        that.countDown(rs.data.basic.nextTime);
      } else {
        that.alertService.msg(rs.msg);
      }
    }).catch(() => {
      that.alertService.msg("网络异常，请稍后再试");
    });
  }

  //下期开奖倒计时
  countDown(nextTime) {
    this.allSeconds = nextTime;
    let f = true;
    this.st = setInterval(() => {
      this.allSeconds -= 2;
      if (this.allSeconds <= 0) {
        this.minute = '00';
        this.second = '00';
        this.getPlanCommon();
        clearInterval(this.st);
      } else {
        if (f) {
          this.getAboutPlans();
        }
        f = false;
        this.hour = Math.floor(this.allSeconds / 3600);
        let lastSeconds = this.allSeconds % 3600;
        this.minute = ((lastSeconds / 60 < 10) ? '0' : '') + Math.floor(lastSeconds / 60);
        this.second = (lastSeconds % 60 < 10 ? '0' : '') + lastSeconds % 60;
      }
    }, 2000);
  }

  getArraySum(arr) {
    let s = 0;
    arr.forEach((v) => {
      s += Number(v);
    });
    return s;
  }

  getAboutPlans() {
    let that: any = this;
    that.loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: '玩命加载中'
    });
    that.loading.present();
    that.aService.getAboutPlans(that.code, that.timeIndex, this.myDate).then((rs) => {
      if (rs.code == 0) {
        that.planData = rs.data;
        that.loading.dismiss();
      } else {
        that.loading.dismiss();
        that.alertService.msg(rs.msg);
      }
    }).catch(() => {
      that.loading.dismiss();
      that.alertService.msg("网络异常，请稍后再试");
    });
  }

  getAboutCategoryList() {
    let that: any = this;
    that.aService.getAboutCategoryList().then((rs) => {
      if (rs.code == 0) {
        that.categoryList = rs.data;
        that.code = "bjpks";
        that.aboutName = "北京PK10";
        that.codeTypeChange();
        that.getPlanCommon();
      }
    });
  }

  toGameRule() {
    this.showType = -1;
    this.navCtrl.push("GameRulesPage", {code: this.code, name: this.aboutName});
  }

  toRecommendTwoSides() {
    this.events.publish('selectRootTab', 0);
  }
  toLongDragonCount(){
    this.events.publish('selectRootTab', 1);
  }
  toAboutPlan(){
    this.events.publish('selectRootTab', 4);
  }
  toKillingPlan(){
    this.events.publish('selectRootTab', 3);
  }
}

