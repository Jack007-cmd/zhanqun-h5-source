import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HKService} from "../../../service/hk.service";

/**
 * Generated class for the HkNewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hk-news',
  templateUrl: 'hk-news.html',
})
export class HkNewsPage {
  private option = 0;
  private news = [];
  private page = 1;
  private hasNext = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private hkService: HKService) {
    this.getNewsData(() => {

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HkNewsPage');
  }

  optionChange(o) {
    if (this.option == o) return;
    this.option = o;
    this.news = [];
    this.page = 1;
    this.hasNext = true;
    this.getNewsData(() => {

    });
  }

  getNewsData(callback) {
    let that: any = this;
    that.hkService.getNewsData(that.option == 0 ? 'yctj ' : 'zjxs', that.page, 5).then((rs) => {
      callback();
      if (!rs.code) {
          that.news = that.news.concat(rs.data);
          if (that.page * 5 < rs.total) {
            that.page += 1;
            that.hasNext = true;
          } else {
            that.hasNext = false;
          }
      }
    });
  }

  doInfinite() {
    this.getNewsData(() => {
      // infiniteScroll.complete();
    });
  }

}
