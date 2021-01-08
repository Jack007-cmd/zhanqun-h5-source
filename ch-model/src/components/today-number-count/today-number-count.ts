import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AboutService} from "../../pages/about/about.service";
import {AlertService} from "../../service/alert.service";
import {LoadingController} from "ionic-angular";
import {StorageService} from "../../service/storage.service";

/**
 * Generated class for the TodayNumberCountComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'today-number-count',
  templateUrl: 'today-number-count.html'
})
export class TodayNumberCountComponent implements OnChanges, OnInit {

  // text: string;
  @Input() code;
  @Input() date;
  @Input() current_number;
  public showFilter = -1;
  private mainData = [];
  private codeType: number;
  private allSet = [];
  private filterRs: string;
  private tempRs: string;

  constructor(private aboutService: AboutService, private alertService: AlertService, private loadingCtrl: LoadingController,private localStorage:StorageService) {
    console.log('Hello TodayNumberCountComponent Component');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.code && this.date && this.current_number) {
      this.getAnalysisDetail();
    }
  }

  ngOnInit(): void {
    // Detail-01 :北京PK10(bjpks) 澳洲幸运10(ajxys) 极速赛车(jssc) 极速飞艇(jsft)（4）
    // Detail-02:重庆时时彩(cqssc) 天津时时彩(tjssc) 新疆时时彩(xjssc) 极速时时彩(jsssc) 重庆七星彩(cqqxc) 澳洲幸运5(ajxyw)（6）
    let allTypes = this.localStorage.getObject("analysisKinds")["jrhmtj"];
    if (allTypes["type1"].indexOf(this.code) != -1) {
      this.codeType = 1;
      this.allSet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 't'];
    }
    if (allTypes["type4"].indexOf(this.code) != -1) {
      this.codeType = 4;
      this.allSet = ['0', '1', '2', '3', '4', '5', '6', '7', 'a', 't'];
    }
    if (allTypes["type2"].indexOf(this.code) != -1) {
      this.codeType = 2;
      this.allSet = ['0', '1', '2', '3', '4', 'c', 'a', 'm', 't'];
    }
    if (allTypes["type3"].indexOf(this.code) != -1) {
      this.codeType = 3;
      this.allSet = ['0', '1', '2', '3', '4', 'c', 'a', 'm', 't'];
    }
    // if(['(cqxylc)'].indexOf(this.code)!=-1){
    //   this.codeType=3;
    //   this.allSet = ['0', '1', '2', '3', '4', ];
    // }
    this.filterRs = this.allSet.toString();
  }

  getAnalysisDetail() {
    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: '玩命加载中'
    });
    loading.present();
    let that: any = this;
    that.mainData = [];
    that.aboutService.getAnalysisDetail(that.code, 'jrhmtj', that.date).then((res) => {
      if (res.code == 0) {
        if (that.codeType != 1 && that.codeType != 4) {
          for (let i = 0; i < res.data.appear.basic.length; i++) {
            let temp: any = {};
            temp.appear = that.objectToArray(res.data.appear.basic[i]);
            temp.max = that.objectToArray(res.data.max.basic[i]);
            temp.maxAway = that.objectToArray(res.data.maxAway.basic[i]);
            temp.current = that.objectToArray(res.data.current.basic[i]);
            that.mainData.push(temp);
          }
        } else if (that.codeType == 1 || that.codeType == 4) {
          res.data.awayOpen.basic.forEach((v, k) => {
            let item: any = {};
            item.awayOpen = v;
            item.notOpen = res.data.notOpen.basic[k];
            that.mainData.push(item);
          });
        }
        loading.dismiss();
      } else {
        loading.dismiss();
        that.alertService.msg(res.msg);
      }
    }).catch((rs) => {
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

  objectToArray(obj) {
    if (obj.constructor != Array) {
      let basic = [];
      let sdic = Object.keys(obj).sort();//根据key排序
      for (let i = 0; i < sdic.length; i++) {
        basic.push(obj[sdic[i]]);
      }
      return basic;
    }
    return obj;
  }
}
