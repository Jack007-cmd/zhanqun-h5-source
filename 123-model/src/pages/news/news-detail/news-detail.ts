import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GeneralService} from "../../../service/general.service";

/**
 * Generated class for the NewsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news-detail',
  templateUrl: 'news-detail.html',
})
export class NewsDetailPage {

  private id: string;

  private infoDetail:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private gService: GeneralService) {

    this.id = this.navParams.get("id");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsDetailPage');
    this.getInfoDetail();
    // this.readInfoDetail();
  }
  //获取资讯详情
  getInfoDetail() {
    this.gService.getInfoDetail(this.id).then(res => {
      if (!res.code) {
        this.infoDetail = res;
      } else {

      }
    });
  }
  //浏览资讯浏览量+1
  // readInfoDetail(){
  //   this.gService.readInfoDetail(this.id).then();
  // }

}
