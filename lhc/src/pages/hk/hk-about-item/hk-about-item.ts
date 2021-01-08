import {Component, Input, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {HKService} from "../../../service/hk.service";
import {StorageService} from "../../../service/storage.service";
import {AlertService} from "../../../service/alert.service";

/**
 * Generated class for the HkAboutItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'hk-about-item',
  templateUrl: 'hk-about-item.html'
})
export class HkAboutItemComponent implements OnInit, OnDestroy {

  @Output() event = new EventEmitter();
  @Input() hkCode;
  private isLoading: boolean = false;
  private redArr = [];
  private greenArr = [];
  private blueArr = [];
  private mainItem = {};
  readonly timeDiff: number;//服务器与客户端时间差
  private allSeconds: number;//距离下期开奖时间（秒）(动态)
  private minute = "00";//分
  private second = "00"; //秒
  private st;
  private showVideo = false;

  constructor(public navCtrl: NavController, private hkService: HKService, private storageService: StorageService,private alert:AlertService) {
    console.log('Hello HkAboutItemComponent Component');
    this.timeDiff = Number(this.storageService.get("timeDiff"));
    this.redArr = this.storageService.getArray("redArr");
    this.greenArr = this.storageService.getArray("greenArr");
    this.blueArr = this.storageService.getArray("blueArr");
  }

  ngOnInit(): void {
    if (this.hkCode) {
      this.isLoading = true;
      this.getHKWinNumber();
    }
  }

  videoShow() {
    this.showVideo = true;
    this.event.emit(this.showVideo);
  }

  getHKWinNumber() {
    let that: any = this;
    that.hkService.getHKWinNumber(that.hkCode).then((rs) => {
      if (!rs.code) {
        that.mainItem = rs.data;
        if (that.hkCode == 'jslhc') {
          that.countDown(that.mainItem.next_time);
        }
      }else{
        that.alert.msg("网络异常，请稍后再试");
      }
    }).catch(()=>{
      that.alert.msg("网络异常，请稍后再试");
    });
  }

  countDown(next_time) {
    this.allSeconds = Math.floor((new Date(next_time.replace(/-/g,"/")).getTime() - new Date().getTime() - this.timeDiff) / 1000);
    this.st = setInterval(() => {
      this.allSeconds -= 1;
      if (this.allSeconds <= 0) {
        this.minute = '00';
        this.second = '00';
        this.getHKWinNumber();
        clearInterval(this.st);
      } else {
        this.minute = ((this.allSeconds / 60 < 10) ? '0' : '') + Math.floor(this.allSeconds / 60);
        this.second = (this.allSeconds % 60 < 10 ? '0' : '') + this.allSeconds % 60;
      }
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.st);
  }
}
