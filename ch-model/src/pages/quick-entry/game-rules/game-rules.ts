import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AboutService} from "../../about/about.service";

/**
 * Generated class for the GameRulesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game-rules',
  templateUrl: 'game-rules.html',
})
export class GameRulesPage {
  private showType=-1;
  private code:string;
  private name:string;
  private mainData;
  private categoryList;
  private objectKeys=Object.keys;
  constructor(public navCtrl: NavController, public navParams: NavParams,private aService:AboutService) {
    this.code = this.navParams.get("code");
    this.name = this.navParams.get("name");
    this.getRuleDetail();
    this.getAboutCategoryList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameRulesPage');
  }

  aboutChange(item){
    this.code=item.code;
    this.name=item.name;
    this.showType=-1;
    this.getRuleDetail();
  }

  getRuleDetail(){
    let that:any = this;
    that.aService.getRuleDetail(that.code).then((rs)=>{
      if(rs.code==0){
        that.mainData = rs.data;
      }
    });
  }

  getAboutCategoryList(){
    let that: any = this;
    that.aService.getAboutCategoryList().then((rs)=>{
      if(rs.code==0){
        that.categoryList=rs.data;
      }
    });
  }
}
