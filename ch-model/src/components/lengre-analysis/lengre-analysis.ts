import {Component, Input, SimpleChanges} from '@angular/core';
import {AboutService} from "../../pages/about/about.service";
import {AlertService} from "../../service/alert.service";
import {LoadingController} from "ionic-angular";

/**
 * Generated class for the LengreAnalysisComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'lengre-analysis',
  templateUrl: 'lengre-analysis.html'
})
export class LengreAnalysisComponent {

  // text: string;
  @Input() code;
  @Input() date;
  @Input() current_number;
  private mainData = [];
  private tempData = [];

  constructor(private aboutService: AboutService, private alertService: AlertService, private loadingCtrl: LoadingController) {
    console.log('Hello DldragonCountComponent Component');
  }

  // this.text = 'Hello World'; this.getAnalysisDetail();


  ngOnChanges(changes: SimpleChanges) {
    if (this.code && this.date && this.current_number) {
      this.getAnalysisDetail();
    }
  }

  getAnalysisDetail() {
    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: '玩命加载中'
    });
    loading.present();
    let that: any = this;
    that.mainData = [];
    that.tempData = [];
    that.aboutService.getAnalysisDetail(that.code, 'lrfx', that.date).then((res) => {
      if (res.code == 0) {
        that.mainData = res.data;
        that.mainData.forEach((v) => {
          let pp: any = {};
          Object.keys(v).forEach(function (key) {
            let item = [];
            Object.keys(v[key]).forEach(function (m) {
              let temp: any = {};
              temp.key = m;
              temp.value = v[key][m];
              item.push(temp);
            });
            pp[key] = item;
          });
          that.tempData.push(pp);
        });
        loading.dismiss();
      } else {
        loading.dismiss();
        that.alertService.msg(res.msg);
      }
    }).catch(() => {
      loading.dismiss();
      that.alertService.msg("网络异常，请稍后再试");
    });
  }
}
