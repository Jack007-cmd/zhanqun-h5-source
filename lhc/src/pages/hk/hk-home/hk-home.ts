import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {HKService} from "../../../service/hk.service";
import {StorageService} from "../../../service/storage.service";
import {AlertService} from "../../../service/alert.service";

/**
 * Generated class for the HkHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hk-home',
  templateUrl: 'hk-home.html',
})
export class HkHomePage {
  @ViewChild('slides ') slides: Slides;
  private timeTask1;
  private bannerArr = [];
  private typeTable = {};
  private codeArr = ['xglhc', 'jslhc'];//香港六合彩：xglhc 极速六合彩：jslhc
  private showType = 0;
  private redArr = [];
  private greenArr = [];
  private blueArr = [];
  private objectKeys = Object.keys;
  private news = [];
  private showVideo = false;
  private logo;
  constructor(public navCtrl: NavController, public navParams: NavParams, private hkService: HKService,
              private alertService: AlertService, private storageService: StorageService) {
    this.hkService.getServerTime().then((res) => {
      if (res.code == '0') {
        this.storageService.set('timeDiff', (Number(res.data) - new Date().getTime()).toString());
      }
    });

    this.getCommon();
    this.getBannerArr();
    this.getTypeTable();
    this.getNewsData();
  }

  getData(event) {
    this.showVideo = event;
  }

  getBannerArr() {
    let that: any = this;
    // 获取轮播图数据
    that.hkService.getBannerArr().then((res) => {
      if (!res.code) {
        that.bannerArr = res;
      } else {
        that.alertService.msg(res.error);
      }
    }).catch(() => {
      that.alertService.msg("网络异常，请稍后再试");
    });
  }

  /*自动轮播*/
  autoSlide(slider, time) {
    return setInterval(() => {
      if (!slider.isEnd()) {
        slider.slideNext(1000);
      } else {
        slider.slideTo(0, 1000);
      }
    }, time);
  }

  /*开始轮播*/
  startSlide() {
    setTimeout(() => {
      if (this.slides && this.slides.length() > 1 && !this.timeTask1)
        this.timeTask1 = this.autoSlide(this.slides, 3000);
    }, 200);
  }

  /*停止轮播*/
  stopSlide() {
    if (this.timeTask1) {
      clearInterval(this.timeTask1);
      this.timeTask1 = null;
    }
  }

  getTypeTable() {
    let that: any = this;
    that.hkService.getTypeTable().then((rs) => {
      if (!rs.code) {
        that.typeTable = rs.data;
        that.redArr = rs.data.color['红'].toString().split(",");
        that.blueArr = rs.data.color['蓝'].toString().split(",");
        that.greenArr = rs.data.color['绿'].toString().split(",");
        that.storageService.setArray("redArr", that.redArr);
        that.storageService.setArray("blueArr", that.blueArr);
        that.storageService.setArray("greenArr", that.greenArr);
      }else{
        that.alertService.msg("网络异常，请稍后再试");
      }
    }).catch(()=>{
      that.alertService.msg("网络异常，请稍后再试");
    });
  }

  getNewsData() {
    let that: any = this;
    that.hkService.getNewsData('yctj ', 1, 5).then((rs) => {
      if (!rs.code) {
        that.news = rs.data;
      }else{
        that.alertService.msg("网络异常，请稍后再试");
      }
    }).catch(()=>{
        that.alertService.msg("网络异常，请稍后再试");
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HkHomePage');
  }
  toNextPage(){
    this.navCtrl.push("HkNewsPage",);
  }
  openAd(url){
    window.open(url,'_blank');
  }

  //获取logo
  getCommon(){
    this.hkService.getCommon().then((rs)=>{
      if (!rs.code) {
        this.logo = document.location.protocol+"//"+document.domain+rs.logo;
        this.storageService.set('logo', this.logo);
      }
    });
  }

  openLottery(){
    // window.location.href = "http://www.123kkc.com";
    window.location.href = document.location.protocol+"//"+document.domain;
  }
}
