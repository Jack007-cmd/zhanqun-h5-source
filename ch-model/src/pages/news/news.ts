import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, IonicPage} from 'ionic-angular';
import {GeneralService} from "../../service/general.service";
/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  paramList = {
    hasNext: true,
    nextPage: 1
  };

  private loader;
  private loading = false;

  private infoList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private gService: GeneralService,
              private lCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');

    this.loading = true;

    let that: any = this;

    setTimeout(() => {
      if (!this.loading) return;
      that.loader = that.lCtrl.create({
        content: "",
        duration: 500
      });
      that.loader.present();
    }, 250);

    that.getInfoList(() => {
      if (this.loader) {
        this.loader.dismiss();
        this.loading = false;
      }
    }, false);
  }

  // 获取资讯列表
  getInfoList(callback, refresh) {

    this.paramList.hasNext = false;

    let page: number = refresh ? 1 : this.paramList.nextPage;

    this.gService.getInfoList(20, page).then(res => {
      callback();
      if (!res.code) {
        this.infoList = res.data;
      } else {
        this.warning(res.error);
        return;
      }

      if (refresh) this.infoList = [];

      this.infoList.push.apply(this.infoList, res.list);
      this.paramList.nextPage = page + 1;
      if (20 * page < res.total) {
        this.paramList.hasNext = true;
      }
    });
  }

  warning(text) {
    let loading = this.lCtrl.create({
      spinner: 'hide',
      content: text,
      duration: 1000
    });
    loading.present();
  }

  doRefresh(refresher) {
    this.getInfoList(() => {
      refresher.complete();
    }, true);
  }

  doInfinite(infiniteScroll) {
    this.getInfoList(() => {
      infiniteScroll.complete();
    }, false);
  }
}
