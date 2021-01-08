import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HKService} from "../../../service/hk.service";
import {StorageService} from "../../../service/storage.service";

/**
 * Generated class for the HkLuzhuAnalysisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var $: any;

@IonicPage()
@Component({
  selector: 'page-hk-luzhu-analysis',
  templateUrl: 'hk-luzhu-analysis.html',
})
export class HkLuzhuAnalysisPage {
  private showType = -1;
  private code: string;
  public myDate;//选中日期
  private startDay;
  private today;
  public dayArr = [];
  public now = new Date();
  private option = 0;
  private mainData = [];
  readonly isAndroid;
  private logo;
  constructor(public navCtrl: NavController, public navParams: NavParams, private hkService: HKService,private storageService:StorageService) {
    this.logo = this.storageService.get("logo");
    this.code = this.navParams.get("code");
    this.today = this.myDate = '' + this.now.getFullYear();
    this.startDay = '' + (this.now.getFullYear() - 5);
    let u = navigator.userAgent;
    this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HkLuzhuAnalysisPage');
  }

  ionViewDidEnter() {
    if (this.navCtrl.getPrevious() && this.navCtrl.getPrevious().id != 'HkHomePage') {
      this.navCtrl.removeView(this.navCtrl.getPrevious());
    }
    this.getHkLuzhuAnalysis();
    // let children = document.getElementById("dayList").children;
    // children[children.length - 1].scrollIntoView();
  }

  optionChange(o) {
    if (o == this.option) return;
    this.option = o;
    this.getHkLuzhuAnalysis();
  }

  getHkLuzhuAnalysis() {
    let that: any = this;
    that.hkService.getHkLuzhuAnalysis(that.code, that.myDate, that.option == 0 ? 'getSDRoadOfBead' : that.option == 1 ? 'getBSRoadOfBead' : 'getColorRoadOfBead').then((rs) => {
      if (!rs.code) {
        rs.data.forEach((val) => {
          let beads = [];
          let item = [];
          let temp = -1;
          let a = 0;
          let b = 0;
          let c = 0;
          val.roadBeads.forEach((v, i) => {
            v == 0 ? (a += 1) : v == 1 ? (b += 1) : (c += 1);
            if (v != temp) {
              if (temp != -1) {
                beads.push(item);
              }
              item = [];
              temp = v;
              item.push(v);
            } else {
              item.push(v);
            }
            if (i == val.roadBeads) {
              beads.push(item);
            }
          });
          val.roadBeads = beads;
          val.a = a;
          val.b = b;
          val.c = c;
        });
        that.mainData = rs.data;
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
