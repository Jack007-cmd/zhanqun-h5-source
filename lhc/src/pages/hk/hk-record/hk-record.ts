import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HKService} from "../../../service/hk.service";
import {StorageService} from "../../../service/storage.service";
// import {DomSanitizer,SafeResourceUrl} from '@angular/platform-browser';

/**
 * Generated class for the HkRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var $: any;

@IonicPage()
@Component({
  selector: 'page-hk-record',
  templateUrl: 'hk-record.html',
})
export class HkRecordPage {
  private showType = -1;
  private code: string;
  public myDate;//选中日期
  private startDay;
  private today;
  public dayArr = [];
  public now = new Date();
  private mainData = [];
  private redArr = [];
  private greenArr = [];
  private blueArr = [];
  readonly isAndroid;
  // private showWeb = false;
  // private webUrl:SafeResourceUrl;
  private logo;
  constructor(public navCtrl: NavController, public navParams: NavParams, private hkService: HKService, private storageService: StorageService
              // ,private sanitizer:DomSanitizer
  ) {
    this.logo = this.storageService.get("logo");
    this.redArr = this.storageService.getArray("redArr");
    this.greenArr = this.storageService.getArray("greenArr");
    this.blueArr = this.storageService.getArray("blueArr");
    this.code = this.navParams.get("code");
    if (this.code == 'jslhc') {
      let m = (this.now.getMonth() < 9 ? '0' : '') + (this.now.getMonth() + 1);
      let d = (this.now.getDate() < 10 ? '0' : '') + this.now.getDate();
      this.today = this.myDate = this.now.getFullYear() + "-" + m + "-" + d;
      this.startDay = (this.now.getFullYear() - 5) + "-" + m + "-" + d;
      //for (let i = 1; i <= this.now.getDate(); i++) {
  //      this.dayArr.push({date: this.now.getFullYear() + "-" + m + "-" + (i < 10 ? '0' : '') + i, d: i});
    //  }
    } else if (this.code == 'xglhc') {
      this.today = this.myDate =''+ this.now.getFullYear();
      this.startDay = ''+(this.now.getFullYear() - 5);
    }
    let u = navigator.userAgent;
    this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HkRecordPage');
  }

  ionViewDidEnter() {
    if (this.navCtrl.getPrevious() && this.navCtrl.getPrevious().id != 'HkHomePage') {
      this.navCtrl.removeView(this.navCtrl.getPrevious());
    }
    this.getHKRecord();
    //if ($(".dayList").length > 0) {
     // $(".dayList").last().width(this.now.getDate() * 36);
     // $(".dayList").children().last()[0].scrollIntoView();
    //}
  }

  getHKRecord() {
    let that: any = this;
    that.hkService.getHKRecord(that.code, that.myDate).then((rs) => {
      if (!rs.code) {
        that.mainData = rs.data.result;
      }
    });
  }

  toAnotherRecordPage() {
    this.showType = -1;
    this.navCtrl.push("HkRecordPage", {code: this.code == 'xglhc' ? 'jslhc' : 'xglhc'});
  }

  toAnotherPositivePage() {
    this.showType = -1;
    this.navCtrl.push("HkPositiveTrendPage", {code: this.code == 'xglhc' ? 'jslhc' : 'xglhc'});
  }

  toAnotherSpecialPage() {
    this.showType = -1;
    this.navCtrl.push("HkSpecialTrendPage", {code: this.code == 'xglhc' ? 'jslhc' : 'xglhc'});
  }

  toAnotherZodiacPage() {
    this.showType = -1;
    this.navCtrl.push("HkZodiacTrendPage", {code: this.code == 'xglhc' ? 'jslhc' : 'xglhc'});
  }

  toLuzhuAnalysisPage() {
    this.showType = -1;
    this.navCtrl.push("HkLuzhuAnalysisPage", {code: 'xglhc'});
  }

  toSumAnalysisPage() {
    this.showType = -1;
    this.navCtrl.push("HkSumAnalysisPage", {code: 'jslhc'});
  }

  showOption(event) {
    event.stopPropagation();
    this.showType = this.showType == 2 ? -1 : 2;
    if (this.showType == -1) {
      $(".jumphk").css("top", "-5000px");
    } else {
      $(".jumphk").css("top", this.isAndroid ? "49px" : "69px");
    }
  }

  toRoot() {
    this.navCtrl.popToRoot();
 // window.location.href = document.location.protocol+"//"+document.domain;
 }

  blurCtrl() {
    if (this.showType == 2) {
      this.showType = -1;
      $(".jumphk").css("top", "-5000px");
    }
  }

  closeShow() {
    this.showType = -1;
  }

  showType1() {
    $(".jumphk").css("top", "-5000px");
    this.showType = this.showType == 1 ? -1 : 1;
  }

}
