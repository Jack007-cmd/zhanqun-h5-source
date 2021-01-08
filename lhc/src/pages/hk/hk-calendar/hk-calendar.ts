import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HKService} from "../../../service/hk.service";

/**
 * Generated class for the HkCalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hk-calendar',
  templateUrl: 'hk-calendar.html',
})
export class HkCalendarPage {
  private mainData = [];
  private tempDate: string;
  private hasNext = true;
  private cTimeStamp = new Date().getTime();

  constructor(public navCtrl: NavController, public navParams: NavParams, private hkService: HKService) {
    this.tempDate = new Date().getFullYear() + "-" + ((new Date().getMonth() < 9) ? 0 : "") + (new Date().getMonth() + 1);
    // this.tempDate ="2019-06";
    this.getHkCalendar(() => {
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HkCalendarPage');
  }

  getHkCalendar(callback) {
    let that: any = this;
    that.hkService.getHkCalendar(that.tempDate).then((rs) => {
      callback();
      if (!rs.code) {
        // let first: number;
        // let last: number;
        // first = new Date((that.tempDate + "-01").replace(/-/g,"/")).getDay();
        // rs.data.first = first;
        // for (let i = 0; i < first; i++) {
        //   rs.data.kj_date.unshift([0, 0]);
        // }
        // last = 6 - that.getLastDay(Number(that.tempDate.split("-")[0]), Number(that.tempDate.split("-")[1]));
        // for (let i = 0; i < last; i++) {
        //   rs.data.kj_date.push([0, 0]);class="jumphk" style="top: 63px;">
        // }
        that.mainData.push(rs.data);
        that.hasNext = rs.data.last_next;
        if (rs.data['kj_date'].length > 0) {
          if (that.tempDate.split("-")[1] == 12) {
            that.tempDate = (Number(that.tempDate.split("-")[0]) + 1) + "-01";
          } else {
            that.tempDate = that.tempDate.split("-")[0] + "-" + (Number(that.tempDate.split("-")[1]) < 9 ? 0 : '') + (Number(that.tempDate.split("-")[1]) + 1);
          }
        }
      }
    });
  }

  doInfinite(infiniteScroll) {
    this.getHkCalendar(() => {
      infiniteScroll.complete();
    });
  }


  //获得某月的最后一天周几
  getLastDay(year, month) {
    let new_year = year;    //取当前的年份
    let new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）
    if (month > 12) {
      new_month -= 12;        //月份减
      new_year++;            //年份增
    }
    let new_date = new Date(new_year, new_month, 1);                //取当年当月中的第一天
    return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDay();//获取当月最后一天日期
  }

  toTimeStamp(str) {
    return new Date(str.replace(/-/g,"/")).getTime();
  }
}
