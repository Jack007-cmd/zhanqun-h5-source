import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {AboutService} from "../../pages/about/about.service";
import {AlertService} from "../../service/alert.service";
import {LoadingController} from "ionic-angular";
import {StorageService} from "../../service/storage.service";

/**
 * Generated class for the NumberDistributionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
declare var $: any;

@Component({
  selector: 'number-distribution',
  templateUrl: 'number-distribution.html'
})
export class NumberDistributionComponent implements OnChanges, OnDestroy {

  // text: string;
  @Input() code;
  @Input() date;
  @Input() current_number;
  private mainData = [];
  private max;
  private numRs = [];
  private filterRs: string = '';
  private codeType;

  constructor(private aboutService: AboutService, private alertService: AlertService, private loadingCtrl: LoadingController,private localStorage:StorageService) {
    console.log('Hello NumberDistributionComponent Component');
  }

  ngOnInit() {
    // 号码分布：时时彩：0~9  北京pk10：01~10 广东11选5: 01~11
    //            （重庆幸运农场）极速快乐十分：01~20  广西快乐十分01~21
    // Detail-01 :北京PK10(bjpks) 澳洲幸运10(ajxys) 极速赛车(jssc) 极速飞艇(jsft)（4）
    // Detail-02:重庆时时彩(cqssc) 天津时时彩(tjssc) 新疆时时彩(xjssc) 极速时时彩(jsssc) 重庆七星彩(cqqxc) 澳洲幸运5(ajxyw)（6）
    let allTypes = this.localStorage.getObject("analysisKinds")["hmfb"];
    if (allTypes["type1"].indexOf(this.code) != -1) {
      this.codeType = 1;
    }
    if (allTypes["type2"].indexOf(this.code) != -1) {
      this.codeType = 2;
    }
    if (allTypes["type3"].indexOf(this.code) != -1) {
      this.codeType = 3;
    }
    if (allTypes["type4"].indexOf(this.code) != -1) {
      this.codeType = 4;
    }
    if (allTypes["type5"].indexOf(this.code) != -1) {
      this.codeType = 5;
    }
    if (allTypes["type6"].indexOf(this.code) != -1) {
      this.codeType = 6;
    }
  }

  // ngAfterViewChecked(){
  //   this.numShowCtrl();
  // }

  ngOnChanges(changes: SimpleChanges) {
    if (this.code && this.date && this.current_number) {
      this.getAnalysisDetail();
      this.numShowCtrl();
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
    that.aboutService.getAnalysisDetail(that.code, 'jskj', that.date).then((res) => {
      if (res.code == 0) {
        that.max = res.data.max;
        that.mainData = res.data.list;
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
    if (this.numRs.indexOf(n) == -1) {
      this.numRs.push(n);
      this.filterRs = '';
    } else {
      this.numRs.splice(this.numRs.indexOf(n), 1);
    }
    this.numShowCtrl();
  }

  filter(f) {
    if (this.filterRs.indexOf(f + ',') == -1) {
      this.filterRs += f + ',';
      switch (f) {
        case 0://单
          this.filterRs = this.filterRs.replace('1,', '');
          break;
        case 1://双
          this.filterRs = this.filterRs.replace('0,', '');
          break;
        case 2://大
          this.filterRs = this.filterRs.replace('3,', '');
          break;
        case 3://小
          this.filterRs = this.filterRs.replace('2,', '');
          break;
        default:
      }
      this.numRs = [];
    } else {
      this.filterRs = this.filterRs.replace(f + ',', '');
    }
    this.numShowCtrl();
  }

  numShowCtrl() {
    let that: any = this;
    $("#" + that.code).find(".selectedOpacity").removeClass("selectedOpacity");
    if (that.numRs.length > 0) {
      $("#" + this.code).find("#haomafblist").find("ul").find('li').each(function () {
        if (that.numRs.indexOf(Number($(this).text()) + '') == -1) {
          $(this).addClass('selectedOpacity');
        }
      });
    }
    if (that.filterRs) {
      $("#" + that.code).find("#haomafblist").find("ul").find('li').each(function () {
        if (that.filterRs.indexOf('0') > -1 && Number($(this).text()) % 2 != 1) {//单
          if (!$(this).hasClass('selectedOpacity')) {
            $(this).addClass('selectedOpacity');
          }
        }
        if (that.filterRs.indexOf('1') > -1 && Number($(this).text()) % 2 != 0) {//双
          if (!$(this).hasClass('selectedOpacity')) {
            $(this).addClass('selectedOpacity');
          }
        }
        if (that.filterRs.indexOf('2') > -1 && Number($(this).text()) < that.max / 2) {//大
          if (!$(this).hasClass('selectedOpacity')) {
            $(this).addClass('selectedOpacity');
          }
        }
        if (that.filterRs.indexOf('3') > -1 && Number($(this).text()) >= that.max / 2) {//小
          if (!$(this).hasClass('selectedOpacity')) {
            $(this).addClass('selectedOpacity');
          }
        }
      });
    }
  }

  ngOnDestroy() {
    console.log("销毁当前组件")
  }
}
