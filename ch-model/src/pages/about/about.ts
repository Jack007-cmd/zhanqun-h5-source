import {Component} from '@angular/core';
import {NavController, LoadingController,NavParams,IonicPage} from 'ionic-angular';
import {AboutService} from "./about.service";
import {AlertService} from "../../service/alert.service";
import {StorageService} from "../../service/storage.service";
import {GeneralService} from "../../service/general.service";
declare var $:any;
@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public sortArr = [];//彩种类别列表

  private currentSort = 0;//选中彩种类别

  private aboutList = [];//当前类别各彩种即时开奖数据列表

  constructor(public navCtrl: NavController, private navParams: NavParams, private aService: AboutService, private alertService: AlertService,
              private storageService: StorageService, private loadingCtrl: LoadingController, private gService: GeneralService) {
    this.sortArr = this.storageService.getArray("sort");
    if (this.navParams.get("index")) {
      this.currentSort = this.navParams.get("index");
    }
    this.currentSortAbout(this.currentSort);
  }

  //获取彩种分类
  // getAboutSort() {
  //   this.aService.getAboutSort().then((res) => {
  //     if (res.code == 0) {
  //       this.sortArr = res.data;
  //       this.sortArr.forEach((d) => {
  //         d.list.forEach((it) => {
  //           it.des = this.gService.baseConfig[it.code];
  //         })
  //       });
  //       this.storageService.setArray("sort", this.sortArr);
  //       this.currentSortAbout(0);
  //     } else {
  //       this.alertService.msg(res.msg);
  //     }
  //   });
  // }

  //获取当前类别各彩种即时开奖数据列表
  currentSortAbout(index) {
    let that: any = this;
    that.currentSort = index;
    that.aboutList = [];
    let loading = that.loadingCtrl.create({
      spinner: 'dots',
      content: '玩命加载中'
    });
    loading.present();
    that.aboutList = new Array(that.sortArr[index].list.length);
    that.sortArr[index].list.forEach((v, i) => {
      if (that.gService.getBaseConfig(v.code)) {
        let temp: any={};
        temp.code = v.code;
        temp.name = v.name;
        temp.des = v.des;
        temp.url = v.url;
        temp.sortKey = that.sortArr[index].key;
        that.aboutList[i] = temp;
      }
    });
    loading.dismiss();
  }

  doRefresh(refresh) {
    this.currentSortAbout(this.currentSort);
    refresh.complete();
  }

  ionViewWillEnter() {
    this.currentSortAbout(this.currentSort);
  }
  ionViewWillLeave() {
    this.aboutList = [];
  }
}
