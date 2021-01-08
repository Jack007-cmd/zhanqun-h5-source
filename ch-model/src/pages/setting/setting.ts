import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AppConfig} from "../../service/app-config.service";
import {StorageService} from "../../service/storage.service";

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  private version;
  private kefu_qq;
  constructor(public navCtrl: NavController, public navParams: NavParams, public aConfig: AppConfig,private storage:StorageService) {
    this.version = this.aConfig.version;
    this.kefu_qq = storage.get("kefu_qq");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

}
