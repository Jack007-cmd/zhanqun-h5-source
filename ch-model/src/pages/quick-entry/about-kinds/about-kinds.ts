import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {StorageService} from "../../../service/storage.service";
import {Browser} from "../../../service/borwser.service";

/**
 * Generated class for the AboutKindsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var $:any;
@IonicPage()
@Component({
  selector: 'page-about-kinds',
  templateUrl: 'about-kinds.html',
})
export class AboutKindsPage {
  private sortArr = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storageService: StorageService,private browser:Browser) {
    this.sortArr = this.storageService.getArray("sort");
  }

  ionViewWillEnter(){
    // let u = navigator.userAgent;
    // let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    // if(!isAndroid){
    //   if(/iphone/gi.test(navigator.userAgent) && (screen.height >= 812 && screen.width >= 375)){
    //     $('#cZList').css('top','74px');
    //   }else {
    //     $('#cZList').css('top','64px');
    //   }
    // }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutKindsPage');
  }

  toDestination(item) {
    if (item.code != 'xgc') {
      this.navCtrl.push(item.des, {code: item.code, name: item.name, video_url: item.url});
    }else{
      this.browser.openUrl(item.des,true);
    }
  }

  // navPush="{{it.des}}" [navParams]="{code:it.code,name:it.name,video_url:it.url}"
}
