import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AboutService} from "../../pages/about/about.service";
import {AlertService} from "../../service/alert.service";
import {LoadingController} from "ionic-angular";
import {StorageService} from "../../service/storage.service";

/**
 * Generated class for the WinNumberComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
declare var $: any;

@Component({
  selector: 'win-number',
  templateUrl: 'win-number.html'
})
export class WinNumberComponent implements OnChanges {

  // text: string;
  @Input() code;
  @Input() date;
  @Input() current_number;
  @Input() isBottom=false;
  private mainList = [];
  private contentData: any;
  private spanType = 0;//号码 大小 单双 总和/形态
  private max;
  private showType = -1;//显示彩种区域
  private hasNext: boolean = true;
  private page = 1;
  private totalCount: number = 0;
  private flag = true;

  constructor(private aboutService: AboutService, private alertService: AlertService, private loadingCtrl: LoadingController, private localStorage: StorageService) {
    console.log('Hello WinNumberComponent Component');
    // this.text = 'Hello World';

  }

  // public handleScroll(event: ScrollEvent) {
  //   if (event.isReachingBottom) {
  //     console.log(`the user is reaching the bottom`);
  //     if (this.hasNext) {
  //       //       //当滚动条到底时,这里是触发内容
  //       //       //异步请求数据,局部刷新dom
  //       this.listAdd20();
  //     }
  //   }
  //   if (event.isReachingTop) {
  //     console.log(`the user is reaching the top`);
  //   }
  //   if (event.isWindowEvent) {
  //     console.log(`This event is fired on Window not on an element.`);
  //   }
  //
  // }
  ngOnChanges(changes: SimpleChanges) {
    if(changes.hasOwnProperty('code') || changes.hasOwnProperty('date')|| changes.hasOwnProperty('current_number')){
      this.flag = true;
    }
    // console.log("this.isBottom:"+this.isBottom);
    // console.log("this.hasNext:"+this.hasNext);
    if (this.isBottom && this.hasNext) {
      this.listAdd20();
    }
    if (this.code && this.date && this.current_number && this.flag) {
      this.flag = false;
      this.temp();
      this.getAnalysisDetail();
    }
  }

  getAnalysisDetail() {
    // let loading = this.loadingCtrl.create({
    //   spinner: 'dots',
    //   content: '玩命加载中'
    // });
    // loading.present();
    this.contentData = {};
    this.mainList = [];
    this.hasNext = true;
    this.page = 1;
    this.totalCount = 0;
    this.aboutService.getAnalysisDetail(this.code, 'jskj', this.date).then((res) => {
      // loading.dismiss();
      if (res.code == 0) {
        this.contentData = res.data;
        this.totalCount = res.data.list.length;
        this.max = res.data.max;
        this.listAdd20();
      }
    }).catch(() => {
      // loading.dismiss();
      this.alertService.msg("网络异常，请稍后再试");
    });
  }

  temp() {
    //Detail-01 :北京PK10(bjpks) 澳洲幸运10(ajxys) 极速赛车(jssc) 极速飞艇(jsft)（4）
    // Detail-02:重庆时时彩(cqssc) 天津时时彩(tjssc) 新疆时时彩(xjssc) 极速时时彩(jsssc) 重庆七星彩(cqqxc) 澳洲幸运5(ajxyw)（6）
    //  Detail-03:广东11选5(gdsyxw) 内蒙古11选5(nmgsyxw) 吉林11选5(jlsyxw) 广西11选5(gxsyxw) 浙江11选5(zjsyxw) 湖北11选5(hbsyxw)
    //  	 上海11选5(shsyxw) 辽宁11选5(llxyxw) 安徽11选5(ahsyxw) 江苏11选5(jsusyxw) 江西11选5(jxsyxw)  极速11选5(jssyxw)
    //  	 十一运夺金(syydj)（13）
    // Detail-04:江苏快3(jsks) 吉林快3(jlks) 河北快3(hbks) 内蒙古快3(nmgks) 安徽快3(ahks) 福建快3(fjks) 湖北快3(hbk3)
    // 北京快3(bjks) 极速快3(jsk3) 广西快3(gxks)（10）
    // Detail-05:极速快乐十分(jsklsf)  广东快乐十分(gdklsf) 天津快乐十分(tjklsf) 广西快乐十分(gxklsf) 澳洲幸运8（ajxyb）（5）
    // Detail-06:双色球(fcssq) 超级大乐透(cjdlt) 体彩七星彩(tcqxx)(3)
    // Detail-07:台湾宾果(twbg) 澳洲幸运20(ajxyes) 极速快乐8(jsklb) 北京快乐8(bjklb)(4)
    //Detail-08:福彩3D(fcsd)（试机号） 体彩排列3(tcpls) (2)
    // Detail-09:体彩排列5(tcplw)
    // Detail-10:福彩七乐彩(fcqcl)
    // Detail-11:重庆幸运农场(cqxylc)
    // Detail-12:PC蛋蛋幸运28(pcddxyeb)
    let allTypes = this.localStorage.getObject("analysisKinds")["jskj"];
    if (allTypes["type1"].indexOf(this.code) != -1) {
      this.showType = 1;
    } else if (allTypes["type2"].indexOf(this.code) != -1) {
      this.showType = 2;
    } else if (allTypes["type4"].indexOf(this.code) != -1) {
      this.showType = 4;
    } else if (allTypes["type5"].indexOf(this.code) != -1) {
      this.showType = 5;
    } else if (allTypes["type6"].indexOf(this.code) != -1) {
      this.showType = 6;
    } else if (allTypes["type7"].indexOf(this.code) != -1) {
      this.showType = 7;
    } else if (allTypes["type8"].indexOf(this.code) != -1) {
      this.showType = 8;
    } else if (allTypes["type9"].indexOf(this.code) != -1) {
      this.showType = 9;
    } else if (allTypes["type10"].indexOf(this.code) != -1) {
      this.showType = 10;
    } else if (allTypes["type11"].indexOf(this.code) != -1) {
      this.showType = 11;
    } else if (allTypes["type12"].indexOf(this.code) != -1) {
      this.showType = 12;
    }
  }

  listAdd20() {
    // this.mainList=this.contentData.list;
    if (this.totalCount > 0) {
      if (this.totalCount < (20 * this.page + 1)) {
        this.mainList.push.apply(this.mainList, this.contentData.list.slice(20 * (this.page - 1)));
        this.hasNext = false;
      } else {
        this.mainList.push.apply(this.mainList, this.contentData.list.slice(20 * (this.page - 1), 20 * this.page));
        this.hasNext = true;
      }
      this.page += 1;
    } else {
      this.hasNext = false;
    }
  }
}
