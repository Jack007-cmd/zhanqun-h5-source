import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AboutService} from "../../pages/about/about.service";
import {AlertService} from "../../service/alert.service";
import {LoadingController} from "ionic-angular";
import {StorageService} from "../../service/storage.service";

/**
 * Generated class for the HistoryNumberCountComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'history-number-count',
  templateUrl: 'history-number-count.html'
})
export class HistoryNumberCountComponent implements OnChanges, OnInit {

  // text: string;
  @Input() code;
  @Input() date;
  @Input() current_number;
  private mainData: any = {};
  private filter = 0;
  private codeType;

  constructor(private aboutService: AboutService, private alertService: AlertService, private loadingCtrl: LoadingController,private localStorage:StorageService) {
    console.log('Hello HistoryNumberCountComponent Component');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.code && this.date && this.current_number) {
      this.getAnalysisDetail();
    }
  }

  ngOnInit() {
    let allTypes = this.localStorage.getObject("analysisKinds")["lshmtj"];
    if (allTypes["type1"].indexOf(this.code) != -1) {
      this.codeType = 1;
    }else if (allTypes["type2"].indexOf(this.code) != -1) {
      this.codeType = 2;
    }else if(allTypes["type3"].indexOf(this.code) != -1) {
      this.codeType = 3;
    }else if (allTypes["type4"].indexOf(this.code) != -1) {
      this.codeType = 4;
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
    that.aboutService.getAnalysisDetail(that.code, 'lshmtj', that.date).then((res) => {
      if (res.code == 0) {
        that.mainData = {};
        let pattern = [];
        let basic = [];
        Object.keys(res.data.basic).forEach(function (k) {

          let temp = res.data.basic[k];
          let rs = [];
          if (typeof temp == 'object' && temp.constructor != Array) {
            Object.keys(temp).forEach(function (key) {
              rs.push(temp[key]);
            });
            if (that.codeType == 4) {
              rs.push(res.data.size[k]["big"]);
              rs.push(res.data.size[k]["little"]);
            }
            temp = rs;
          }
          basic.push({'day': k, 'number': temp});
          if (that.codeType != 4) {
            pattern.push(Object.assign({'day': k}, res.data.oddEven[k], res.data.size[k], res.data.pred[k]));
          }
        });
        that.mainData.basic = basic;
        that.mainData.pattern = pattern;
        // loading.dismiss();
      } else {
        // loading.dismiss();
        that.alertService.msg(res.msg);
      }
    }).catch((rs) => {
      // loading.dismiss();
      that.alertService.msg("网络异常，请稍后再试");
    });
  }
}
