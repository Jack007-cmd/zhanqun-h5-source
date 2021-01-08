import {Component} from '@angular/core';
import { NavController, NavParams,Events} from 'ionic-angular';
import {AboutService} from "../../about/about.service";
import {StorageService} from "../../../service/storage.service";

/**
 * Generated class for the RecommendTwoSidesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-recommend-two-sides',
  templateUrl: 'recommend-two-sides.html',
})
export class RecommendTwoSidesPage {
  private showKinds = false;
  public myDate;//选中日期
  private startDay;
  private today;
  public now = new Date();
  private mainData = {};
  private aboutList: any;//当前期基本数据
  private allSeconds: number=0;//距离下期开奖时间（秒）(动态)
  private interval: number;  //接口返回数据时距离下期开奖时间（秒）
  private hour;//时
  private minute = "00";//分
  private second = "00"; //秒
  private st;
  private rl;
  readonly timeDiff: number;//服务器与客户端时间差
  constructor(public navCtrl: NavController, public navParams: NavParams,public events:Events,private aService: AboutService, private storageService: StorageService) {
    this.timeDiff = Number(this.storageService.get("timeDiff"));
    this.timeDiff = isNaN(this.timeDiff)?0:this.timeDiff;
    let m = (this.now.getMonth() < 9 ? '0' : '') + (this.now.getMonth() + 1);
    let d = (this.now.getDate() < 10 ? '0' : '') + this.now.getDate();
    this.today = this.myDate = this.now.getFullYear() + "-" + m + "-" + d;
    this.startDay = (this.now.getFullYear() - 5) + "-" + m + "-" + d;
    // this.getAboutOnce();
  }

  ionViewWillEnter() {
    this.getAboutOnce();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecommendTwoSidesPage');
  }

  ionViewWillLeave(){
    if(this.st) clearInterval(this.st);
    if(this.rl) clearInterval(this.rl);
  }

  //获取当前期基本数据
  getAboutOnce() {
    let that: any = this;
    that.aService.getAboutOnce('bjpks').then((rs) => {
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
    this.interval = this.allSeconds = Math.floor((new Date(this.aboutList.next_time.replace(/-/g,"/")).getTime() - new Date().getTime() - this.timeDiff) / 1000);
    let flag = true;
    this.st = setInterval(() => {
      this.allSeconds -= 2;
      if (this.allSeconds <= 0) {
        this.minute = '00';
        this.second = '00';
        this.getAboutOnce();
        clearInterval(this.st);
      } else {
        if (flag) {
          this.getRecommendTwoSides();
          flag = false;
        }
        this.hour = Math.floor(this.allSeconds / 3600);
        let lastSeconds = this.allSeconds % 3600;
        this.minute = ((lastSeconds / 60 < 10) ? '0' : '') + Math.floor(lastSeconds / 60);
        this.second = (lastSeconds % 60 < 10 ? '0' : '') + lastSeconds % 60;
      }
    }, 2000);
  }

  //号码滚动
  numberRoll() {
    this.rl = setInterval(() => {
      if (this.allSeconds > 0) {
        clearInterval(this.rl);
        return;
      }
      this.aboutList.current_code.forEach((v, k) => {
        this.aboutList.current_code[k] = Math.floor(10 * Math.random());
      });
    }, 100);
  }

  getRecommendTwoSides() {
    let that: any = this;
    that.aService.getRecommendTwoSides(that.myDate).then((rs) => {
      if (rs.code == 0) {
        that.mainData = rs.data;
      }
    });
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
