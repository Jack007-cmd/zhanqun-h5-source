import {Component} from '@angular/core';
import { LoadingController, NavController, NavParams,Events} from 'ionic-angular';
import {AboutService} from "../../about/about.service";
import {AlertService} from "../../../service/alert.service";
import {GeneralService} from "../../../service/general.service";
import {StorageService} from "../../../service/storage.service";
/**
 * Generated class for the LongDragonCountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-long-dragon-count',
  templateUrl: 'long-dragon-count.html',
})
export class LongDragonCountPage {

  private showKinds = false;
  private showOpen = true;
  private showType = -1;
  private period = 2;
  private mainData={};
  private basicArr = [];
  private codeArr = ["bjpks", "cqssc", "jsks", "xjssc"];
  private tempArr = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public aService: AboutService,private localStorage:StorageService,public events:Events,
              private gService: GeneralService, public loadingCtrl: LoadingController, public alertService: AlertService) {

  }

  unique(arr) {
    let tmp = new Array();
    for(let i in arr){
      //该元素在tmp内部不存在才允许追加
      if(JSON.stringify(tmp).indexOf(JSON.stringify(arr[i]))==-1 && arr[i]['code']!='xgc'){
        tmp.push(arr[i]);
      }
    }
    return tmp;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecommendTwoSidesPage');
  }

  ionViewWillEnter() {
    let listArr=[];
    this.localStorage.getArray("sort").forEach((v)=>{
      listArr.push.apply(listArr,v.list);
    });
    this.basicArr = this.unique(listArr);
    this.getLongRemind();
  }


  ionViewWillLeave() {
    this.mainData = {};
    this.basicArr = [];
    this.tempArr = [];
  }

  codeSelect(num) {
    if (num == "9999") {//筛选
      this.tempArr = this.codeArr;
      this.showType = 2;
    } else if (num == "999") {//确定
      this.codeArr = this.tempArr;
      this.getLongRemind();
      this.showType = -1;
    } else if (num == "-1") {//取消
      this.tempArr = [];
      this.showType = -1;
    } else {//选择
      if (this.tempArr.indexOf(num) == -1) {
        this.tempArr.push(num);
      } else {
        this.tempArr.splice(this.tempArr.indexOf(num), 1);
      }
    }
  }

  periodChange(p) {
    this.showType = -1;
    if (this.period == p) return;
    this.period = p;
    this.getLongRemind();
  }

  goDestination(item) {
    this.navCtrl.push(
      this.gService.getBaseConfig(item.code).des, {
        name: item.name,
        code: item.code,
        video_url: this.gService.getBaseConfig(item.code).url
      });
  }

  getLongRemind() {
    let that: any = this;
    that.aService.getLongRemind(that.codeArr.toString(), that.period).then((rs) => {
      if (rs.code == 0) {
        //that.mainData = rs.data.result;
        if (typeof rs.data.result.list == 'object' ) {
          let temp = [];
          Object.keys(rs.data.result.list).forEach((k) => {
            temp.push(rs.data.result.list[k]);
          });
          that.mainData.list = temp;
        }
        if (typeof rs.data.result.none == 'object') {
          let temp = [];
          Object.keys(rs.data.result.none).forEach((k) => {
            temp.push(rs.data.result.none[k]);
          });
          that.mainData.none = temp;
        }
      } else {
        that.alertService.msg(rs.msg);
      }
    }).catch(() => {
      that.alertService.msg("网络异常，请稍后再试");
    });
  }
  toRecommendTwoSides() {
    this.events.publish('selectRootTab', 0);
  }
  toKillingPlan(){
    this.events.publish('selectRootTab', 3);
  }
  toAboutPlan(){
    this.events.publish('selectRootTab', 4);
  }

}
