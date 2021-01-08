import {Component} from '@angular/core';
import { NavController, NavParams,Events} from 'ionic-angular';
import {AboutService} from "../../about/about.service";
import {AlertService} from "../../../service/alert.service";
import {StorageService} from "../../../service/storage.service";
/**
 * Generated class for the KillingPlanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var $: any;

@Component({
  selector: 'page-killing-plan',
  templateUrl: 'killing-plan.html',
})
export class KillingPlanPage {
  public code: string;
  public aboutName: string;
  private showKinds = false;
  private showType = -1;
  public myDate;//选中日期
  public mainData: any;
  public killData: any;
  private period = 10;
  private killType;
  private startDay;
  private today;
  public now = new Date();
  public categoryList: any;
  public objectKeys = Object.keys;
  private codeType;
  private selectedKey='101';
  constructor(public navCtrl: NavController, public navParams: NavParams, public aService: AboutService,public events:Events,
              public alertService: AlertService,private localStorage:StorageService) {
    let m = (this.now.getMonth() < 9 ? '0' : '') + (this.now.getMonth() + 1);
    let d = (this.now.getDate() < 10 ? '0' : '') + this.now.getDate();
    this.today = this.myDate = this.now.getFullYear() + "-" + m + "-" + d;
    this.startDay = (this.now.getFullYear() - 5) + "-" + m + "-" + d;
  }


  ionViewDidEnter(){
    $(".periodStage").last().val("近10期");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KillingPlanPage');
  }

  ionViewWillEnter() {
    this.getAboutCategoryList();
  }

  checkCodeType() {
    let allTypes = this.localStorage.getObject("killPlan");
    if (allTypes["type1"].indexOf(this.code) != -1) {
      this.codeType = 1;
    }
    if (allTypes["type2"].indexOf(this.code) != -1) {
      // if(['cqssc','tjssc','xjssc','jsssc','cqqxc','ajxyw'].indexOf(this.code)!=-1){
      this.codeType = 2;
    }
    if (allTypes["type3"].indexOf(this.code) != -1) {
      this.codeType = 3;
    }

  }


  killTypeChange(temp) {
    this.killType = {
      killCode: temp.k,
      type: temp.val
    };
    this.showType = -1;
  }

  periodChange(num) {
    this.period = num;
    $(".periodStage").last().val(num == 10 ? "近10期" : num == 20 ? "近20期" : num == 30 ? "近30期" : num == 50 ? "近50期" : "近100期");
    this.showType = -1;
    this.getKillPlan();
  }

  aboutChange(item) {
    this.code = item.code;
    this.aboutName = item.name;
    this.showType = -1;
    this.checkCodeType();
    this.getPlanCommon();
    this.getKillPlan();
  }

  getAboutCategoryList() {
    let that: any = this;
    that.aService.getAboutCategoryList().then((rs) => {
      if (rs.code == 0) {
        that.categoryList = rs.data;
        that.code = "bjpks";
        that.aboutName = "北京PK10";
        that.checkCodeType();
        that.getPlanCommon();
        that.getKillPlan();
      }
    });
  }

  getPlanCommon() {
    let that: any = this;
    that.aService.getPlanCommon(that.code).then((rs) => {
      if (rs.code == 0) {
        that.mainData = rs.data;
        that.killType = {
          killCode: that.codeType < 3 ? 0 : 1002,
          type: that.codeType == 0 ? "综合杀号" : that.codeType == 1 ? '冠军' : '万位杀号'
        };
      } else {
        that.alertService.msg(rs.msg);
      }
    }).catch(() => {
      that.alertService.msg("网络异常，请稍后再试");
    });
  }

  getKillPlan() {
    let that: any = this;
    that.aService.getKillPlan(that.code, that.period, that.myDate).then((rs) => {
      if (rs.code == 0) {
        that.killData = rs.data;
      } else {
        that.alertService.msg(rs.msg);
      }
    }).catch(() => {
      that.alertService.msg("网络异常，请稍后再试");
    });
  }

  toGameRule() {
    this.navCtrl.push("GameRulesPage", {code: this.code, name: this.aboutName});
    this.showType = -1;
  }

  getArraySum(arr) {
    let s = 0;
    arr.forEach((v) => {
      s += Number(v);
    });
    return s;
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
}
