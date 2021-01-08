import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AboutService} from "../../pages/about/about.service";
import {AlertService} from "../../service/alert.service";
import {LoadingController} from "ionic-angular";
import {StorageService} from "../../service/storage.service";

/**
 * Generated class for the DoubleSidesCountComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'double-sides-count',
  templateUrl: 'double-sides-count.html'
})
export class DoubleSidesCountComponent implements OnChanges {

  // text: string;
  @Input() code;
  @Input() date;
  @Input() current_number;
  private mainData: any = {};
  private codeType: number;

  constructor(private aboutService: AboutService, private alertService: AlertService, private loadingCtrl: LoadingController,private localStorage:StorageService) {
    console.log('Hello DoubleSidesCountComponent Component');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.code && this.date && this.current_number) {
      this.getAnalysisDetail();
    }
  }

  ngOnInit() {
    let allTypes = this.localStorage.getObject("analysisKinds")["lmsjtj"];
    if (allTypes["type1"].indexOf(this.code) != -1) {
      this.codeType = 1;
    }else if(allTypes["type2"].indexOf(this.code) != -1) {
      this.codeType = 2;
    }else if(allTypes["type3"].indexOf(this.code) != -1) {
      this.codeType = 3;
    }else if(allTypes["type4"].indexOf(this.code) != -1) {
      this.codeType = 4;
    }
  }

  getAnalysisDetail() {
    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: '玩命加载中'
    });
    loading.present();
    let that: any = this;
    that.mainData = null;
    that.aboutService.getAnalysisDetail(that.code, 'lmsjtj', that.date, 'rank=0').then((res) => {
      if (res.code == 0) {
        that.mainData = res.data;
        if (res.data.up) {
          if (!(typeof res.data.up && res.data.up.constructor == Array)) {
            let up = [];
            Object.keys(res.data.up).forEach(function (k) {
              up.push(res.data.up[k]);
            });
            that.mainData.up = up;
          }
        }
        loading.dismiss();
      }else{
        loading.dismiss();
        that.alertService.msg(res.msg);
      }
    }).catch(() => {
      loading.dismiss();
      that.alertService.msg("网络异常，请稍后再试");
    });
  }

}
