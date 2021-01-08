import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AboutService} from "../../pages/about/about.service";
import {AlertService} from "../../service/alert.service";
import {LoadingController} from "ionic-angular";

/**
 * Generated class for the DldragonCountComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'dldragon-count',
  templateUrl: 'dldragon-count.html'
})
export class DldragonCountComponent implements OnChanges {

  // text: string;
  @Input() code;
  @Input() date;
  @Input() current_number;

  private list = [];

  constructor(private aboutService: AboutService, private alertService: AlertService, private loadingCtrl: LoadingController) {
    console.log('Hello DldragonCountComponent Component');
  }

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
    this.list=[];
    this.aboutService.getAnalysisDetail(this.code, 'jskj', this.date).then((res) => {
      if (res.code == 0) {
        this.list = res.data.longRemind;
        // loading.dismiss();
      }else{
        // loading.dismiss();
        this.alertService.msg(res.msg);
      }
    }).catch(() => {
      // loading.dismiss();
      this.alertService.msg("网络异常，请稍后再试");
    });
  }

}
