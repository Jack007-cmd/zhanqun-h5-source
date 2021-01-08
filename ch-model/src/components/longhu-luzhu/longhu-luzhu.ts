import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AboutService} from "../../pages/about/about.service";
import {AlertService} from "../../service/alert.service";
import {LoadingController} from "ionic-angular";

/**
 * Generated class for the LonghuLuzhuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'longhu-luzhu',
  templateUrl: 'longhu-luzhu.html'
})
export class LonghuLuzhuComponent implements OnChanges {


  @Input() code;
  @Input() date;
  @Input() current_number;
  private mainData = [];
  private allSet = ['0', '1', '2', '3', '4'];
  private filterRs: string = this.allSet.toString();
  private tempRs: string;
  private showFilter = -1;

  constructor(private aboutService: AboutService, private alertService: AlertService, private loadingCtrl: LoadingController) {
    console.log('Hello LonghuLuzhuComponent Component');
  }

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
    that.aboutService.getAnalysisDetail(that.code, 'lfrz', that.date).then((res) => {
      if (res.code == 0) {
        that.mainData = res.data;
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

  choseCon(n) {
    if (n == 1) {
      this.tempRs = this.filterRs;
      this.showFilter = 1;
    } else if (n == -1) {
      this.tempRs = '';
      this.showFilter = -1;
    } else {
      this.filterRs = this.tempRs;
      this.showFilter = -1;
    }
  }

  checkOne(m) {
    if (m == '999') {
      this.tempRs = this.allSet.toString();
    } else if (m == '-1') {
      this.tempRs = '';
    } else {
      if (this.tempRs.indexOf(m) == -1) {
        this.tempRs += m;
      } else {
        this.tempRs = this.tempRs.replace(m, "");
      }
    }
  }
  ulScroll(event) {
    event.stopPropagation();
  }
}
