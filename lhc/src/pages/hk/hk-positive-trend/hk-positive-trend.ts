import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HKService} from "../../../service/hk.service";
import {StorageService} from "../../../service/storage.service";

/**
 * Generated class for the HkPositiveTrendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var $: any;
declare let strokecanvas: any;

@IonicPage()
@Component({
  selector: 'page-hk-positive-trend',
  templateUrl: 'hk-positive-trend.html',
})
export class HkPositiveTrendPage {
  private showType = -1;
  private code: string;
  public myDate;//选中日期
  private startDay;
  private today;
  public dayArr = [];
  public now = new Date();
  private option = 0;
  private mainData = {};
  readonly isAndroid;
  private logo;
  constructor(public navCtrl: NavController, public navParams: NavParams, private hkService: HKService,private storageService:StorageService) {
    this.logo = this.storageService.get("logo");
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
      this.today = this.myDate = ''+this.now.getFullYear();
      this.startDay = ''+(this.now.getFullYear() - 5);
    }
    let u = navigator.userAgent;
    this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HkPositiveTrendPage');
  }
  ionViewDidEnter() {
    if(this.navCtrl.getPrevious() && this.navCtrl.getPrevious().id!='HkHomePage') {
      this.navCtrl.removeView(this.navCtrl.getPrevious());
    }
    this.getHKPositive();
      //if ($(".dayList").length > 0) {
    //  $(".dayList").last().width(this.now.getDate() * 36);
     // $(".dayList").children().last()[0].scrollIntoView();
   // }
  }

  optionChange(o) {
    if (o == this.option) return;
    this.option = o;
    this.toDrawCanvas();
  }

  toDrawCanvas() {
    if (this.option == 0) {
      this.drawCanvas(this.mainData['code1']);
    } else if (this.option == 1) {
      this.drawCanvas(this.mainData['code2']);
    } else if (this.option == 2) {
      this.drawCanvas(this.mainData['code3']);
    } else if (this.option == 3) {
      this.drawCanvas(this.mainData['code4']);
    } else if (this.option == 4) {
      this.drawCanvas(this.mainData['code5']);
    } else if (this.option == 5) {
      this.drawCanvas(this.mainData['code6']);
    }
  }

  getHKPositive() {
    let that: any = this;
    that.hkService.getHKPositive(that.code, that.myDate).then((rs) => {
      if (!rs.code) {
        that.mainData = rs.data.result;
        if (that.code == 'xglhc') {
          Object.keys(that.mainData).forEach(function (key) {
            let colors = [];
            if(that.mainData[key]['color']){
              that.mainData[key]['color'].forEach((v) => {
                if (v == 1) {
                  colors.push("#f93353");
                }
                if (v == 2) {
                  colors.push("#20c36b");
                }
                if (v == 3) {
                  colors.push("#0094e7");
                }
              });
              that.mainData[key]['color'] = colors;
            }
          });
          that.toDrawCanvas();
        }
      }
    });
  }

  drawCanvas(data) {
    if (data && document.getElementsByTagName("canvas").length > 0) {
      $(".c1").attr("height", 1000);
      let c = document.getElementsByTagName("canvas")[0].getContext("2d");
      c.clearRect(0, 0, 20000, 20000);
      let b = data.issue;
      let f = data.num;
      let d = data.color;
      strokecanvas(f, b, d, true);
    }
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

