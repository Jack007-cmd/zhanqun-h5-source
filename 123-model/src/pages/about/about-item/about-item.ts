import {AfterContentInit, Component, Input, OnChanges, OnInit, AfterViewInit, OnDestroy} from "@angular/core";
import {NavController} from "ionic-angular";
import {GeneralService} from "../../../service/general.service";
import {AboutService} from "../about.service";
import {StorageService} from "../../../service/storage.service";
import {AppConfig} from "../../../service/app-config.service";

@Component({
  selector: 'about-item',
  templateUrl: './about-item.html'
})

export class AboutItem implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {

  @Input() aboutItem;
  private isLoading: boolean = false;
  private itemIndex: number;
  readonly timeDiff: number;//服务器与客户端时间差
  private allSeconds: number = 0;//距离下期开奖时间（秒）(动态)
  private interval: number;  //接口返回数据时距离下期开奖时间（秒）
  private hour;//时
  private minute = "00";//分
  private second = "00"; //秒

  private st;
  private rl;

  // *ngIf="isLoading"
  constructor(public navCtrl: NavController, private gService: GeneralService, private aService: AboutService,
              private storageService: StorageService,private appConfig:AppConfig) {

    this.timeDiff = Number(this.storageService.get("timeDiff"));
    this.timeDiff = isNaN(this.timeDiff) ? 0 : this.timeDiff;
  }

  ngOnInit(): void {
    if (this.aboutItem) {
      this.itemIndex = this.gService.getAboutItemIndex(this.aboutItem.code);
      this.getAboutOnce();
    }
  }

  ngAfterContentInit() {

  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    if (this.st) clearInterval(this.st);
    if (this.rl) clearInterval(this.rl);
  }

  getAboutOnce() {
    let that: any = this;
    if (this.itemIndex != 13) {
      that.aService.getAboutOnce(that.aboutItem.code).then((rs) => {
        if (rs.code == 0) {
          that.aboutItem = eval('(' + (JSON.stringify(this.aboutItem) + JSON.stringify(rs.data)).replace(/}{/, ',') + ')');
          // that.aboutItem.img = that.appConfig.imgHost+"/storage/"+that.aboutItem.img;
          that.countDown();
          // that.numberRoll();
        }
        this.isLoading = true;
      });
    } else {
      that.aService.getHKWinNumber('xglhc').then(rs => {
        if (!rs.code) {
          that.aboutItem = rs.data;
        }
        this.isLoading = true;
      })
    }
  }

  //下期开奖倒计时
  countDown() {
    // if(!this.aboutList.next_time) return;
    this.interval = this.allSeconds = Math.floor((new Date(this.aboutItem.next_time.replace(/-/g, "/")).getTime() - new Date().getTime() - this.timeDiff) / 1000);

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
        // if ($("#redLine")) {
        //   $("#redLine").width(100 * this.allSeconds / this.interval + "%");
        // }
      }
    }, 2000);
  }

  //号码滚动
  numberRoll() {
    let that: any = this;
    that.rl = setInterval(() => {
      if (that.allSeconds >= 0) {
        clearInterval(this.rl);
        return;
      }
      that.aboutItem['current_code'].forEach((v, k) => {
        that.aboutItem['current_code'][k] = Math.floor(10 * Math.random());
      });
    }, 100);
  }
  toHK(){
    window.open("http://123kkc.com/d");
    // window.open(document.location.protocol+"//"+document.domain+"/d");
  }
}
