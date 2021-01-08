import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AboutService} from "../../pages/about/about.service";
import {AlertService} from "../../service/alert.service";
import {LoadingController} from "ionic-angular";
import {StorageService} from "../../service/storage.service";

/**
 * Generated class for the DsdxHistoryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'dsdx-history',
  templateUrl: 'dsdx-history.html'
})
export class DsdxHistoryComponent implements OnChanges, OnInit {

  // text: string;
  @Input() code;
  @Input() date;
  @Input() current_number;
  private mainData = [];
  private codeType: number;
  private tGoal = 0;//0:第一球 1：第二球 2.。。
  private type = 0;//0：综合查看 1：个体查看
  private modeType = 0;//0单1双2大3小
  constructor(private aboutService: AboutService, private alertService: AlertService, private loadingCtrl: LoadingController,private localStorage:StorageService) {
    console.log('Hello DldragonCountComponent Component');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.code && this.date && this.current_number) {
      this.getAnalysisDetail();
    }
  }

  ngOnInit() {
    let allTypes = this.localStorage.getObject("analysisKinds")["dsdxls"];
    if (allTypes["type1"].indexOf(this.code) != -1) {
      this.codeType = 1;
    }else if (allTypes["type2"].indexOf(this.code) != -1) {
      this.codeType = 2;
    }else if(allTypes["type3"].indexOf(this.code) != -1) {
      this.codeType = 3;
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
    that.aboutService.getAnalysisDetail(that.code, 'dsdxls', that.date).then((res) => {
      if (res.code == 0) {
        Object.keys(res.data).forEach(function (key) {
          that.mainData.push({day: key, list: res.data[key]});
        });
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
  ulScroll(event) {
    event.stopPropagation();
  }
}

