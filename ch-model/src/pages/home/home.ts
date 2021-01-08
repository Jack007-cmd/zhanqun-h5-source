import {Component, ViewChild} from '@angular/core';
import {NavController, Slides, LoadingController, Events} from 'ionic-angular';
import {GeneralService} from "../../service/general.service";
import {AlertService} from "../../service/alert.service";
import {AboutService} from "../about/about.service";
import {Browser} from "../../service/borwser.service";
import {StorageService} from "../../service/storage.service";
import {AppConfig} from "../../service/app-config.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('slides ') slides: Slides;

  public aboutList = [];
  private timeTask1;
  private bannerArr = [];
  private notice;
  private logo;
  private tloading: boolean = false;
  private infoList = [];

  constructor(public navCtrl: NavController, private gService: GeneralService, private alertService: AlertService, private app: AppConfig,
              private aboutService: AboutService, private loadingCtrl: LoadingController, private localStorage: StorageService, private event: Events, private browser: Browser) {
  }

  /*自动轮播*/
  autoSlide(slider, time) {
    return setInterval(() => {
      if (!slider.isEnd()) {
        slider.slideNext(1000);
      } else {
        slider.slideTo(0, 1000);
      }
    }, time);
  }


  /*开始轮播*/
  startSlide() {

    setTimeout(() => {
      if (this.slides && this.slides.length() > 1 && !this.timeTask1)
        this.timeTask1 = this.autoSlide(this.slides, 3000);
      /* if(this.slide2 && this.slide2.length() > 1 && !this.timeTask2)
           this.timeTask2 = this.autoSlide(this.slide2,8000);*/


    }, 200);
  }

  /*停止轮播*/
  stopSlide() {

    if (this.timeTask1) {
      clearInterval(this.timeTask1);
      this.timeTask1 = null;
    }
    /* if(this.timeTask2) {
       clearInterval(this.timeTask2);
       this.timeTask2 = null;
     }*/

  }

  ionViewWillEnter() {
    if (this.tloading) {
      return;
    }
    this.tloading = true;
    this.getHomeData();
  }

  ionViewDidEnter() {

    this.startSlide();
  }

  ionViewDidLeave() {
    this.tloading = false;
    this.stopSlide();
  }

  ionViewWillLeave() {
    this.aboutList = [];
    this.bannerArr = [];
    this.infoList = [];
  }

  getHomeData() {
    let that: any = this;
    that.bannerArr = [];
    that.aboutList = [];
    that.notice = "";
    //获取轮播图数据
    that.gService.getBanner().then((res) => {
      if (!res.code) {
        that.bannerArr = res;
      } else {
        that.alertService.msg(res.error);
      }
    }).catch(() => {
      that.alertService.msg("网络异常，请稍后再试");
    });

    //获取公告内容
    that.gService.getCommon().then((res) => {
      if (!res.code) {
        that.notice = res.notice;
        that.logo = res.logo;
        that.localStorage.set('appName', res.name);
        that.localStorage.set('kefu_qq', res['kefu_qq']);
        document.querySelector('meta[name="application-name"]').setAttribute("content", res.name);
        document.querySelector('meta[name="apple-mobile-web-app-title"]').setAttribute("content", res.name);
        document.title = res.name; // 动态修改网站标题
        that.changeFavicon(res.icon);// 动态修改网站图标
      }
    });
    //获取2条资讯
    that.getInfo2();
    let loading = that.loadingCtrl.create({
      spinner: 'dots',
      content: '玩命加载中'
    });
    loading.present();
    //获取热门彩种数据
    let rl = setInterval(() => {
      let hotArr = that.localStorage.getArray("hotArr");
      if (hotArr.length > 0) {
        clearInterval(rl);
        that.aboutList = hotArr;
      }
    }, 200);

    loading.dismiss();
  }

  getInfo2() {
    this.gService.getInfoList(2, 1).then(res => {
      if (!res.code) {
        this.infoList = res.data;
      }
    }).catch(() => {
      this.alertService.msg("网络异常，请稍后再试");
    });
  }

  //去掉html实体
  delHtmlTag(str) {
    //html实体转为标签后再用正则去掉标签
    let elem = document.createElement('div');
    elem.innerHTML = str;
    str = elem.innerText || elem.textContent;
    return str.replace(/<[^>]+>/g, "").trim();
  }

  // toAllAbout() {
  //   this.event.publish('selectRootTab', 1);
  // }

  toWeb() {
    window.location.href = this.app.referrer;
  }

  //点击轮播图跳转到广告
  jumpToAd(url) {
    this.browser.openUrl(url, true);
  }


  changeFavicon(link) {
    let $favicon = document.querySelector('link[rel="icon"]');
    // If a <link rel="icon"> element already exists,
    // change its href to the given link.
    if ($favicon !== null) {
      $favicon.setAttribute("href", link);
      // Otherwise, create a new element and append it to <head>.
    } else {
      $favicon = document.createElement("link");
      $favicon.setAttribute("rel", "icon");
      $favicon.setAttribute("href", link);
      document.head.appendChild($favicon);
    }

    // shortcut icon
    let $shortcut = document.querySelector('link[rel="shortcut icon"]');
    // If a <link rel="icon"> element already exists,
    // change its href to the given link.
    if ($shortcut !== null) {
      $shortcut.setAttribute("href", link);
      // Otherwise, create a new element and append it to <head>.
    } else {
      $shortcut = document.createElement("link");
      $shortcut.setAttribute("rel", "shortcut icon");
      $shortcut.setAttribute("href", link);
      document.head.appendChild($shortcut);
    }

    let appleIcon = document.querySelector('link[rel="apple-touch-icon-precomposed"]');
    // If a <link rel="icon"> element already exists,
    // change its href to the given link.
    if (appleIcon !== null) {
      appleIcon.setAttribute("href", link);
      // Otherwise, create a new element and append it to <head>.
    } else {
      appleIcon = document.createElement("link");
      appleIcon.setAttribute("rel", "apple-touch-icon-precomposed");
      appleIcon.setAttribute("href", link);
      document.head.appendChild(appleIcon);
    }

    let touchIcon = document.querySelector('link[rel="apple-touch-icon"]');
    // If a <link rel="icon"> element already exists,
    // change its href to the given link.
    if (touchIcon !== null) {
      touchIcon.setAttribute("href", link);
      // Otherwise, create a new element and append it to <head>.
    } else {
      touchIcon = document.createElement("link");
      touchIcon.setAttribute("rel", "apple-touch-icon");
      touchIcon.setAttribute("href", link);
      document.head.appendChild(touchIcon);
    }

  };


  toDetail(code) {
    if (code === 'sgft') {
      this.navCtrl.push("ItemDetail_01Page", {
        name: 'SG飞艇',
        code: 'sgft',
        video_url: this.app.imgHost + '/assets/web/common/lottery/lotteryVideo/index.html?key=sgft'
      })
    } else if (code === 'bjpks') {
      this.navCtrl.push("ItemDetail_01Page", {
        name: '北京PK拾',
        code: 'bjpks',
        video_url: this.app.imgHost + '/assets/web/common/lottery/lotteryVideo/index.html?key=bjpks'
      })
    } else if (code === 'cqhlsx') {
      this.navCtrl.push("ItemDetail_02Page", {
        name: '重庆欢乐生肖',
        code: 'cqhlsx',
        video_url: this.app.imgHost + '/assets/web/common/lottery/lotteryVideo/index.html?key=cqhlsx'
      })

    }
  }

}
