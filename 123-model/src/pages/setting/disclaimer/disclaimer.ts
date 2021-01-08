import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {StorageService} from "../../../service/storage.service";

/**
 * Generated class for the DisclaimerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-disclaimer',
  templateUrl: 'disclaimer.html',
})
export class DisclaimerPage {

  private appName;
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage:StorageService) {
    this.appName = storage.get("appName");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisclaimerPage');
  }

}
