import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AboutService} from "../../pages/about/about.service";
import {AlertService} from "../../service/alert.service";
import {LoadingController} from "ionic-angular";

/**
 * Generated class for the LonghuCountComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'longhu-count',
  templateUrl: 'longhu-count.html'
})
export class LonghuCountComponent implements OnChanges {

  // text: string;
  @Input() code;
  @Input() date;
  @Input() current_number;
  private mainData = [];

  constructor(private aboutService: AboutService, private alertService: AlertService, private loadingCtrl: LoadingController) {
    console.log('Hello LonghuCountComponent Component');
  }

  // this.text = 'Hello World'; this.getAnalysisDetail();


  ngOnChanges(changes: SimpleChanges) {
    if (this.code && this.date && this.current_number) {
      this.getAnalysisDetail();
    }
  }

  getAnalysisDetail() {
    // let loading = this.loadingCtrl.create({
    //   spinner: 'dots',
    //   content: '玩命加载中'
    // });
    // loading.present();
    let that: any = this;
    that.mainData = [];
    that.aboutService.getAnalysisDetail(that.code, 'lftj', that.date).then((res) => {
      if (res.code == 0) {
        Object.keys(res.data).forEach(function (key) {
          let item: any = {};
          item.day = key;
          item.list = res.data[key];
          that.mainData.push(item);
        });
        // loading.dismiss();
      } else {
        // loading.dismiss();
        that.alertService.msg(res.msg);
      }
    }).catch(() => {
      // loading.dismiss();
      that.alertService.msg("网络异常，请稍后再试");
    });
  }

}
