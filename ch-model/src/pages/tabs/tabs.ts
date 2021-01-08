import {Component, ViewChild} from '@angular/core';
import {Tabs, NavParams, Events} from "ionic-angular";
import {HomePage} from '../home/home';
import {GeneralService} from "../../service/general.service";
import {StorageService} from "../../service/storage.service";
import {AboutService} from "../about/about.service";
import {AlertService} from "../../service/alert.service";
import {AppConfig} from "../../service/app-config.service";
import {RecommendTwoSidesPage} from "../quick-entry/recommend-two-sides/recommend-two-sides";
import {LongDragonCountPage} from "../quick-entry/long-dragon-count/long-dragon-count";
import {KillingPlanPage} from "../quick-entry/killing-plan/killing-plan";
import {AboutPlanPage} from "../quick-entry/about-plan/about-plan";
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild("myTabs") tabRef: Tabs;

  oldIndex: number = 2;
  tab1Root = RecommendTwoSidesPage;
  tab2Root = LongDragonCountPage;
  tab3Root = HomePage;
  tab4Root = KillingPlanPage;
  tab5Root = AboutPlanPage;

  constructor(private navParams: NavParams, private events: Events, private generalService: GeneralService,
              private localStorage: StorageService, private appConfig: AppConfig, private aService: AboutService, private alertService: AlertService) {
    this.events.subscribe('selectRootTab', (index) => {
      if (index) {
        this.tabRef.select(index);
      } else {
        this.tabRef.select(this.oldIndex);
      }
    });

    this.generalService.getServerTime().then((res) => {
      if (res.code == '0') {
        this.localStorage.set('timeDiff', (new Date(res.data.replace(/-/g,"/")).getTime() - new Date().getTime()).toString());
      }else{
        this.localStorage.set('timeDiff', '0');
      }
    });

    //APP启动彩种配置
    this.generalService.getBaseAboutProvide().then((rs)=>{
      if(rs.code==0){
        let data = JSON.parse(rs.data);
        this.localStorage.setObject("aboutKinds",data["aboutKinds"]);
        this.localStorage.setObject("analysisKinds",data["analysisKinds"]);
        this.localStorage.setObject("aboutPlan",data["aboutPlan"]);
        this.localStorage.setObject("killPlan",data["killPlan"]);
        //获取彩种分类
        this.aService.getAboutSort().then((res) => {
          if (res.code == 0) {
            res.data.forEach((d) => {
              let temp = [];
              d.list.forEach((it, index) => {
                if (this.generalService.getBaseConfig(it.code)) {
                  it.des = this.generalService.getBaseConfig(it.code).des;
                  it.url = this.generalService.getBaseConfig(it.code).url;
                }
                if (it.code == 'xglhc' || it.code == 'jslhc') {
                  temp.push(index);
                }
              });
              if (temp.length > 0) {
                temp.reverse();
                temp.forEach((v) => {
                  d.list.splice(v, 1);
                });
              }
              if (d.key == 10001) {
                d.list.unshift({code: 'xgc', name: '香港彩', des: this.appConfig.hkHost, url: ''});
              }
            });
            if (res.data.length > 0) {
              this.localStorage.setArray("sort", res.data);
              let listArr = [];
              res.data.forEach((v) => {
                listArr.push.apply(listArr, v.list);
              });
              this.localStorage.setArray("basicArr", this.unique(listArr));
            }
          } else {
            this.alertService.msg(res.msg);
          }
        });
        //获取热门彩种数据
        this.aService.getHotAbout().then((ret) => {
          if (ret.code == '0') {
            let hotArr = [];
            ret.data.forEach((v) => {
              hotArr.push({
                name: v.name,
                code: v.code,
                des: this.generalService.getBaseConfig(v.code).des,
                url: this.generalService.getBaseConfig(v.code).url
              });
            });
            this.localStorage.setArray("hotArr", hotArr);
          }
        });
      }
    });
  }

  unique(arr) {
    let tmp = new Array();
    for (let i in arr) {
      //该元素在tmp内部不存在才允许追加
      if (tmp.indexOf(arr[i]) == -1 && arr[i]['code'] != 'xgc') {
        tmp.push(arr[i]);
      }
    }
    return tmp;
  }

  ionViewWillEnter() {
    let index = this.navParams.get("index");
    if (!index) index = 2;
    this.tabRef.select(index);
  }

  ionChange() {
    this.oldIndex = this.tabRef.getSelected().index;
  }
}
