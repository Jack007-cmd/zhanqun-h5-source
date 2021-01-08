import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AboutService} from "../../pages/about/about.service";
import {AlertService} from "../../service/alert.service";
import {LoadingController} from "ionic-angular";
import {StorageService} from "../../service/storage.service";

/**
 * Generated class for the NumberLuzhuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'number-luzhu',
  templateUrl: 'number-luzhu.html'
})
export class NumberLuzhuComponent implements OnChanges {

  // text: string;
  @Input() code;
  @Input() date;
  @Input() current_number;
  private mainData = [];
  private allSet = [];
  private filterRs = [];
  private codeType: number;

  constructor(private aboutService: AboutService, private alertService: AlertService, private loadingCtrl: LoadingController,private localStorage:StorageService) {
    console.log('Hello NumberLuzhuComponent Component');
  }

  ngOnInit() {
    // 号码分布：时时彩：0~9  北京pk10：01~10 广东11选5: 01~11
    //            （重庆幸运农场）极速快乐十分：01~20  广西快乐十分01~21
    // Detail-01 :北京PK10(bjpks) 澳洲幸运10(ajxys) 极速赛车(jssc) 极速飞艇(jsft)（4）
    // Detail-02:重庆时时彩(cqssc) 天津时时彩(tjssc) 新疆时时彩(xjssc) 极速时时彩(jsssc) 重庆七星彩(cqqxc) 澳洲幸运5(ajxyw)（6）
    let allTypes = this.localStorage.getObject("analysisKinds")["hmlzfx"];
    if (allTypes["type1"].indexOf(this.code) != -1) {
      this.codeType = 1;
      this.allSet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    }
    if (allTypes["type2"].indexOf(this.code) != -1) {
      this.codeType = 2;
      this.allSet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    }
    if (allTypes["type3"].indexOf(this.code) != -1) {
      this.codeType = 3;
      this.allSet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];
    }
    if (allTypes["type4"].indexOf(this.code) != -1) {
      this.codeType = 4;
      this.allSet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    }
    if (allTypes["type5"].indexOf(this.code) != -1) {
      this.codeType = 5;
      this.allSet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];
    }
    if (allTypes["type6"].indexOf(this.code) != -1) {
      this.codeType = 6;
      this.allSet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
    }
    if (allTypes["type7"].indexOf(this.code) != -1) {
      this.codeType = 7;
      this.allSet = ['0', '1', '2', '3', '4', '5'];
    }
    this.filterRs = this.allSet;
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
    that.aboutService.getAnalysisDetail(that.code, 'hmlzfx', that.date).then((res) => {
      if (res.code == 0) {
        that.mainData = that.objectToArray(res.data);
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

  numSelect(n) {
    if (this.filterRs.indexOf(n) == -1) {
      this.filterRs.push(n);
    } else {
      this.filterRs.splice(this.filterRs.indexOf(n), 1);
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
  ulScroll(event) {
    event.stopPropagation();
  }
}
