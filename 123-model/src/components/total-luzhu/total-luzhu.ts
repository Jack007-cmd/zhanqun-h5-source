import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AboutService} from "../../pages/about/about.service";
import {AlertService} from "../../service/alert.service";
import {LoadingController} from "ionic-angular";

/**
 * Generated class for the TotalLuzhuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'total-luzhu',
  templateUrl: 'total-luzhu.html'
})
export class TotalLuzhuComponent implements OnChanges {

  // text: string;
  @Input() code;
  @Input() date;
  @Input() current_number;
  private mainData: any;

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
    // let loading = this.loadingCtrl.create({
    //   spinner: 'dots',
    //   content: '玩命加载中'
    // });
    // loading.present();
    let that: any = this;
    that.mainData = null;
    that.aboutService.getAnalysisDetail(that.code, 'zhlz', that.date).then((res) => {
      if (res.code == 0) {
        that.mainData = res.data;
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
  ulScroll(event) {
    event.stopPropagation();
  }
}
