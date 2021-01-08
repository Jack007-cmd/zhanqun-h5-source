import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AlertService} from "../../../service/alert.service";
import {AboutService} from "../about.service";
import {StorageService} from "../../../service/storage.service";
import {DomSanitizer,SafeResourceUrl} from '@angular/platform-browser';
import {Browser} from "../../../service/borwser.service";
/**
 * Generated class for the ItemDetail_01Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 *
 * 北京PK10 澳洲幸运10 极速赛车 极速飞艇 共用此页
 */
declare var $:any;
@IonicPage()
@Component({
  selector: 'page-item-detail-01',
  templateUrl: 'item-detail-01.html',
})
export class ItemDetail_01Page {
  public name: string;//彩种名称
  public code: string;//彩种编号
  public video_title:string;
  public video_url:SafeResourceUrl;
  public myDate;//选中日期
  private startDay;
  private today;
  public dayArr = [];
  public now = new Date();
  public showVideo = false;//视频显示
  public showType = -1;
  private aboutList: any;//当前期基本数据
  private currentSort: string = 'jskj';//选中分析类型
  private current_number;
  private allSeconds: number=0;//距离下期开奖时间（秒）(动态)
  private interval:number;  //接口返回数据时距离下期开奖时间（秒）
  private hour;//时
  private minute = "00";//分
  private second = "00"; //秒

  private st;
  private rl;

  private sortArr = [];
  readonly timeDiff:number;//服务器与客户端时间差
  private sortList=[];
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  private hot:boolean = false;
  readonly sortKey = -1;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertService: AlertService,
              private aboutService: AboutService, private storageService: StorageService,private sanitizer:DomSanitizer,private browser:Browser) {
   this.name = this.navParams.get("name");
    this.code = this.navParams.get("code");
    if(this.navParams.get("sortKey")){
      this.sortKey = this.navParams.get("sortKey");
    }
    this.video_title = this.navParams.get("video_title");
    this.video_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.navParams.get("video_url"));
    let m = (this.now.getMonth()<9?'0':'')+(this.now.getMonth() + 1);
    let d = (this.now.getDate()<10?'0':'')+ this.now.getDate();
    this.today = this.myDate = this.now.getFullYear() + "-" + m + "-" +d;
    this.startDay = (this.now.getFullYear() - 5) + "-" + m + "-" +d;
    for (let i = 1; i <= this.now.getDate(); i++) {
      this.dayArr.push({date: this.now.getFullYear() + "-" + m + "-" +(i<10?'0':'')+ i, d: i});
    }
    this.getAnalysisSort();
    this.getAboutOnce();

    this.sortArr = this.storageService.getArray("sort");
    this.timeDiff = Number(this.storageService.get("timeDiff"));
    this.timeDiff = isNaN(this.timeDiff)?0:this.timeDiff;

    // this.video_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.video_url).toString();
    // this.getAnalysisSort();


  }


  ionViewWillEnter() {
  }

  //视频播放控制
  videoCtrl() {
    this.showVideo = !this.showVideo;
  }

  // ionViewDidLoad() {
  ionViewDidEnter() {
    if (this.navParams.get("hot") || (this.navCtrl.getPrevious() && this.navCtrl.getPrevious().id == 't0-2-0')) {
      this.hot = true;
    }
    if ($(".dayList").length>0) {
      $(".dayList").last().width(this.now.getDate() * 32);
      $(".dayList").children().last()[0].scrollIntoView();
    }
  }

  //获取当前期基本数据
  getAboutOnce() {
    let that: any = this;
    that.aboutService.getAboutOnce(that.code).then((rs) => {
      if (rs.code == 0) {
        that.aboutList = rs.data;
        that.current_number = rs.data.current_number;
        that.countDown();
        that.numberRoll();
      } else {
        that.alertService.msg(rs.msg);
      }
    });
  }

  getAnalysisSort() {
    this.aboutService.getAnalysisSort(this.code).then((res) => {
      if (res.code == 0) {
        this.sortList = res.data;
        this.currentSort = res.data[0].type;
      } else {
        this.alertService.msg(res.msg);
      }
    });
  }
  //下期开奖倒计时
  countDown() {
    this.interval=this.allSeconds = Math.floor((new Date(this.aboutList.next_time.replace(/-/g,"/")).getTime() - new Date().getTime()-this.timeDiff) / 1000);
    this.st = setInterval(() => {
      this.allSeconds -= 2;
      if (this.allSeconds <= 0) {
        this.minute = '00';
        this.second = '00';
        this.getAboutOnce();
        clearInterval(this.st);
      } else {
        this.hour = Math.floor(this.allSeconds / 3600);
        let lastSeconds = this.allSeconds % 3600;
        this.minute = ((lastSeconds / 60 < 10) ? '0' : '') + Math.floor(lastSeconds / 60);
        this.second = (lastSeconds % 60 < 10 ? '0' : '') + lastSeconds % 60;
         if ($("#redLine")) {
          $("#redLine").width(100 * this.allSeconds / this.interval + "%");
        }
      }
    }, 2000);
  }

  //号码滚动
  numberRoll() {
    let that:any = this;
    that.rl = setInterval(() => {
      if (that.allSeconds >= 0) {
        clearInterval(this.rl);
        return;
      }
      that.aboutList.current_code.forEach((v, k) => {
        that.aboutList.current_code[k] = Math.floor(10 * Math.random());
      });
    }, 100);
  }

   ionViewWillUnload() {
    clearInterval(this.st);
    clearInterval(this.rl);
  }
  toDestination(item,key) {
    this.showType=-1;
    if (item.code != 'xgc') {
      this.navCtrl.push(item.des, {code: item.code, name: item.name, video_url: item.url,sortKey:key});
    }else{
      this.browser.openUrl(item.des, true);
    }
  }

  first(event) {
    this.startX = event.targetTouches[0].pageX;
    this.startY = event.targetTouches[0].pageY;
  }

  last(event) {
    //获取滑动屏幕时的X,Y
    this.endX = event.changedTouches[0].pageX;
    this.endY = event.changedTouches[0].pageY;
    //获取滑动距离
    let distanceX = this.endX - this.startX;
    let distanceY = this.endY - this.startY;
    //判断滑动方向
    if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX > 0) {
      console.log('往右滑动');
      this.navCtrl.pop();
    } else if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX < 0) {
      console.log('往左滑动');
    let nextAbout = this.aboutService.getNextAbout(this.code, this.hot,this.sortKey);
      if (nextAbout) {
        this.navCtrl.push(nextAbout.des, {
          name: nextAbout.name,
          code: nextAbout.code,
          url: nextAbout.url,
          hot:this.hot,
          sortKey:nextAbout.sortKey
        });
      }
    }
  }

  ulScroll(event) {
    event.stopPropagation();
  }
}


