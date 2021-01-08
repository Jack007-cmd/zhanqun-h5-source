import {Component, ViewChild} from '@angular/core';
import {App, Tabs, NavController, NavParams, Events, AlertController, ToastController} from "ionic-angular";
import {HomePage} from '../home/home';
import {GeneralService} from "../../service/general.service";
import {StorageService} from "../../service/storage.service";
import {AboutService} from "../about/about.service";
import {AlertService} from "../../service/alert.service";
import {AppConfig} from "../../service/app-config.service";
// import {RecommendTwoSidesPage} from "../quick-entry/recommend-two-sides/recommend-two-sides";
import {LongDragonCountPage} from "../quick-entry/long-dragon-count/long-dragon-count";
// import {KillingPlanPage} from "../quick-entry/killing-plan/killing-plan";
// import {AboutPlanPage} from "../quick-entry/about-plan/about-plan";
import {PrecisionPlanPage} from "../quick-entry/precision-plan/precision-plan";
import {DataAnalysisPage} from "../quick-entry/data-analysis/data-analysis";
import {ForumPage} from "../quick-entry/forum/forum";

declare let $: any;

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild("myTabs") tabRef: Tabs;

  oldIndex: number = 2;
  tab1Root = ForumPage;
  tab2Root = LongDragonCountPage;
  tab3Root = HomePage;
  tab4Root = PrecisionPlanPage;
  // tab5Root = AboutPlanPage;
  tab5Root = DataAnalysisPage;

  messageType = -1;
  messageContent = "";
  // messageCode;
  timeout;

  private ws;//websocket实例
  private lockReconnect = false;//避免重复连接
  private wsUrl = (document.location.protocol.length==5?"ws://":"wss://") + location.host + "/websocket";
  private timeoutObj = null;
  constructor(private navCtrl: NavController, private navParams: NavParams, private events: Events, private alertCtrl: AlertController,
              private app: App, private toastController: ToastController, private generalService: GeneralService,
              private localStorage: StorageService, private appConfig: AppConfig, private aService: AboutService, private alertService: AlertService) {
    this.events.subscribe('selectRootTab', (index) => {
      if (index.toString()) {
        this.tabRef.select(index);
      } else {
        this.tabRef.select(this.oldIndex);
      }
    });

    this.generalService.getServerTime().then((res) => {
      if (res.code == '0') {
        this.localStorage.set('timeDiff', (new Date(res.data.replace(/-/g, "/")).getTime() - new Date().getTime()).toString());
      } else {
        this.localStorage.set('timeDiff', '0');
      }
    });

    //APP启动彩种配置
    this.generalService.getBaseAboutProvide().then((rs) => {
      if (rs.code == 0) {
        let data = JSON.parse(rs.data);
        this.localStorage.setObject("aboutKinds", data["aboutKinds"]);
        this.localStorage.setObject("analysisKinds", data["analysisKinds"]);
        this.localStorage.setObject("aboutPlan", data["aboutPlan"]);
        this.localStorage.setObject("killPlan", data["killPlan"]);
        //获取彩种分类
        this.aService.getAboutSort().then((res) => {
          if (res.code == 0) {
            res.data.forEach((d) => {
              let temp = [];
              d.list.forEach((it, index) => {
                it.logo = this.appConfig.imgHost + "/storage/" + it.logo;
                if (this.generalService.getBaseConfig(it.code)) {
                  it.des = this.generalService.getBaseConfig(it.code).des;
                  it.url = this.generalService.getBaseConfig(it.code).url;
                }
                if (it.code == 'xglhc') {
                  // temp.push(index);
                  it.name = "香港六合彩";
                  it.des = this.appConfig.hkHost;
                  it.url = '';
                }
                if (it.code == 'jslhc') {
                  temp.push(index);
                }
              });
              if (temp.length > 0) {
                temp.reverse();
                temp.forEach((v) => {
                  d.list.splice(v, 1);
                });
              }
              // if (d.key == 10001) {
              //   d.list.unshift({code: 'xglhc', name: '香港六合彩', des: this.appConfig.hkHost, url: ''});
              // }
            });
            if (res.data.length > 0) {
              // this.localStorage.setArray("sort", res.data);
              // let oldArr = this.localStorage.getArray("sort");
              let sortArr = res.data;
              // if (oldArr && oldArr.length == sortArr.length) {
              //   let flag = true;
              //   oldArr.forEach(v => {
              //     let tempSort = sortArr.filter(sortItem => {
              //       return sortItem.key === v.key;
              //     });
              //     if (!tempSort || tempSort.index < 1) {
              //       flag = false;
              //       return;
              //     }
              //     tempSort[0].list.forEach(temp => {
              //       let index = (v.list||[]).findIndex(item => {
              //         return item.code == temp.code
              //       });
              //       flag = index > -1;
              //       if (!flag) return;
              //     })
              //   });
              //   if (!flag) {
              //     this.localStorage.setArray("sort", sortArr);
              //   }
              // } else {
              //   this.localStorage.setArray("sort", sortArr);
              // }
              this.localStorage.setArray("sort", sortArr);
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
              if (v.code === 'xglhc') {
                hotArr.push({code: 'xglhc', name: '香港六合彩', des: this.appConfig.hkHost, url: ''});
              } else {
                hotArr.push({
                  name: v.name,
                  code: v.code,
                  logo: this.appConfig.imgHost + "/storage/" + v.logo,
                  des: this.generalService.getBaseConfig(v.code).des,
                  url: this.generalService.getBaseConfig(v.code).url
                });
              }
            });
            // let oldArr = this.localStorage.getArray("hotArr");
            // if (oldArr && oldArr.length > 0 && oldArr.length === hotArr.length) {
            //   let flag = true;
            //   hotArr.forEach(temp => {
            //     let index = oldArr.findIndex((item) => {
            //       return item.code == temp.code;
            //     });
            //     flag = index > -1;
            //     if (!flag) return;
            //   });
            //   if (!flag) this.localStorage.setArray("hotArr", hotArr);
            // } else {
            //   this.localStorage.setArray("hotArr", hotArr);
            // }
            this.localStorage.setArray("hotArr", hotArr);
          }
        });
      }
    });
    this.createWebSocket(this.wsUrl);
  }

  createWebSocket(url) {
    try {
      this.ws = new WebSocket(url);
      this.initEventHandle();
    } catch (e) {
      this.reconnect(url);
    }
  }


  initEventHandle() {
    let that: any = this;
    that.ws.onopen = function () {
      //  订阅事件
      let cmds = '{"cmds":[{"cmd":"longQueueNotice","data":[]},{"cmd":"lotteryWinNotice","data":[]},{"cmd":"omitRemind","data":[]}],"time":"' + that.getCurrentDate() + '"}';
      that.ws.send(cmds);
      that.reset();
      that.start();
    };
    that.ws.onmessage = function (event) {
      let data = JSON.parse(event.data);
      //如果获取到消息，心跳检测重置
      //拿到任何消息都说明当前连接是正常的
      //检查是否订阅状态
      if (data.pong) {
        that.reset();
        that.start();
      } else if (data.message) {
        // let time = data.time;
        data = data.message;
        // document.body.innerHTML += time + " - " + data.cmd + " - " + data.payload + "<br>";
        data.payload = JSON.parse(data.payload);
        if (data.cmd == "longQueueNotice") {
          that.messageType = 1;
          // that.messageCode = data.payload['lottery_code'];
          that.messageContent = "长龙通知：" + data.payload['lottery_name'] + "/" + data.payload['desc'] + "/连" + (data.payload['state'] == 'notOpen' ? ('续' + data.payload['num'] + "期未开") : ('开' + data.payload['num'] + '期'));

        } else if (data.cmd == "lotteryWinNotice") {
          that.messageType = 2;
          // that.messageCode = data.payload['lottery_code'];
          that.messageContent = "通知：" + data.payload['lottery_name'] + "出现【" + data.payload['desc'] + "】";
        } else if (data.cmd == "omitRemind") {
          that.messageType = 3;
          // that.messageCode = data.payload['lottery_code'];北京pk10当前遗漏已超过最大遗漏的80%
          // XX彩种XX位置开奖号码XX当前遗漏已超过...
          let tem = data.payload['code_name'] + data.payload['position_name'] + "【" + data.payload['num'] + "】当前遗漏已超过最大遗漏的80%";
          if (tem.length > 22) {
            that.messageContent = tem.substr(0, 20) + "...";
          } else {
            that.messageContent = tem;
          }
        }
        that.timeout = setTimeout(() => {
          that.messageType = -1;
          that.messageContent = "";
        }, 5000);
      }
      //检查是否订阅状态
      if (data.subscribeState) {
        if (data.subscribeState === 1) {
          console.log('订阅成功');
        } else {//失败
          //尝试重新订阅 TODO
          console.error('订阅失败');
        }
      }
    };
    that.ws.onerror = function () {
      that.reconnect(that.wsUrl);
    };
    that.ws.onclose = function () {
      that.reconnect(that.wsUrl);
    }
  }

  reconnect(url) {
    let that: any = this;
    if (that.lockReconnect) return;
    that.lockReconnect = true;
    //没连接上会一直重连，设置延迟避免请求过多
    setTimeout(function () {
      that.createWebSocket(url);
      that.lockReconnect = false;
    }, 2000);
  }


  reset() {
    clearTimeout(this.timeoutObj);
  }

  start() {
    let that: any = this;
    that.timeoutObj = setTimeout(function () {
      //这里发送一个心跳，后端收到后，返回一个心跳消息，
      //onmessage拿到返回的心跳就说明连接正常
      that.ws.send('{"cmds":[{"cmd":"ping","data":[]}],"time":"' + that.getCurrentDate() + '"}');
    }, 60000)
  }

  getCurrentDate() {
    let myDate = new Date();
    let month = myDate.getMonth() + 1;
    let now = myDate.getFullYear() + "-" + (month < 10 ? ("0" + month) : month) + "-" + myDate.getDate() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();
    return now;
  }

  unique(arr) {
    let obj = {};
    let tmp = arr.reduce(function (item, next) {
      obj[next.code] ? '' : obj[next.code] = true && item.push(next);
      return item;
    }, []);
    return tmp;
  }

  ionViewWillEnter() {
    let index = this.navParams.get("index");
    if (!index) index = 2;
    this.tabRef.select(index);
  }

  ionChange() {
    this.oldIndex = this.tabRef.getSelected().index;
    // if (this.tabRef.previousTab(true)) {
    //   console.log("previndex:" + this.tabRef.previousTab(true));
    // }
    // const startIndex = this.navCtrl.getActive().index - 1;
    // console.log("startIndex:"+startIndex);
    // this.navCtrl.remove(startIndex, 1);
    // switch (this.oldIndex) {
    //   case 0:
    //     $("page-long-dragon-count").remove();
    //     $("page-home").remove();
    //     $("page-killing-plan").remove();
    //     $("page-about-plan").remove();
    //     break;
    //   case 1:
    //     $("page-recommend-two-sides").remove();
    //     $("page-home").remove();
    //     $("page-killing-plan").remove();
    //     $("page-about-plan").remove();
    //     break;
    //   case 2:
    //     $("page-long-dragon-count").remove();
    //     $("page-recommend-two-sides").remove();
    //     $("page-killing-plan").remove();
    //     $("page-about-plan").remove();
    //     break;
    //   case 3:
    //     $("page-long-dragon-count").remove();
    //     $("page-home").remove();
    //     $("page-recommend-two-sides").remove();
    //     $("page-about-plan").remove();
    //     break;
    //   case 4:
    //     $("page-long-dragon-count").remove();
    //     $("page-home").remove();
    //     $("page-killing-plan").remove();
    //     $("page-recommend-two-sides").remove();
    //     break;
    // }
  }

  selectTab() {
    if (this.tabRef.getSelected().index === this.oldIndex && this.oldIndex === 2 && $("page-home")) {
      if ($("page-home").find(".home-body-box")[0]) {
        $("page-home").find(".home-body-box")[0].scrollIntoView();
      }
    }
  }

  toastTo(n) {
    this.messageType = -1;
    this.messageContent = "";
    // this.messageCode = "";
    clearTimeout(this.timeout);
    // this.app.getRootNav().push(n==1?LongDragonCountPage:PrecisionPlanPage,{code:this.messageCode});
    this.events.publish('selectRootTab', n);
  }

  hideToast() {
    this.messageType = -1;
    this.messageContent = "";
    // this.messageCode = "";
    clearTimeout(this.timeout);
  }
}
