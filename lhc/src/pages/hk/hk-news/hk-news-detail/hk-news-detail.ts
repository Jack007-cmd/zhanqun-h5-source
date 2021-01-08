import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HKService} from "../../../../service/hk.service";

/**
 * Generated class for the HkNewsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hk-news-detail',
  templateUrl: 'hk-news-detail.html',
})
export class HkNewsDetailPage {
  private option: number;
  private ID: string;
  private mainData = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private hkService: HKService) {
    this.option = this.navParams.get("option");
    this.ID = this.navParams.get("id");
    this.getNewsDetail();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HkNewsDetailPage');
  }

  getNewsDetail() {
    let that: any = this;
    that.hkService.getNewsDetail(that.ID).then((rs) => {
      if (!rs.code) {
        that.mainData = rs;
      }
    });
  }

}
