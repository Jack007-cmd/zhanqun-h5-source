import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AboutService} from "../../pages/about/about.service";
import {AlertService} from "../../service/alert.service";
import {LoadingController} from "ionic-angular";

/**
 * Generated class for the NumberqhLuzhuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'numberqh-luzhu',
  templateUrl: 'numberqh-luzhu.html'
})
export class NumberqhLuzhuComponent implements OnChanges {

  // text: string;
  @Input() code;
  @Input() date;
  @Input() current_number;
  private mainData = [];
  private allRs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  private filterRs = this.allRs.toString();
  private tempRs:string;
  private showFilter = -1;

  constructor(private aboutService: AboutService, private alertService: AlertService, private loadingCtrl: LoadingController) {
    console.log('Hello NumberqhLuzhuComponent Component');
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
    let that: any = this;
    that.mainData = [];
    that.aboutService.getAnalysisDetail(that.code, 'fmqhlz', that.date).then((res) => {
      if (res.code == 0) {
        Object.keys(res.data).forEach(function (k) {
          that.mainData.push(res.data[k]);
        });
        // loading.dismiss();
      }else{
        // loading.dismiss();
        that.alertService.msg(res.msg);
      }
    }).catch(() => {
      // loading.dismiss();
      that.alertService.msg("网络异常，请稍后再试");
    });
  }

  checkOne(n) {
    if (n == '-9') {//清空
      this.tempRs = '';
    }else if (n == '99') {//全选
      this.tempRs = this.allRs.toString();
    }else {
      if (this.tempRs.indexOf(n) > -1) {
        this.tempRs = this.tempRs.replace(n, '');
      } else {
        this.tempRs += n;
      }
    }
  }

  choseCon(n) {
    if (n == 200) {
      this.tempRs = this.filterRs;
      this.showFilter = 200;
    } else if (n == -1) {
      this.tempRs = '';
      this.showFilter = -1;
    } else {
      this.filterRs = this.tempRs;
      this.showFilter = -1;
    }
  }
  ulScroll(event) {
    event.stopPropagation();
  }
}
