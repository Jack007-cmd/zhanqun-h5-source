import {Component, ViewChild} from '@angular/core';
import {NavController, Slides, LoadingController, Events} from 'ionic-angular';
import {GeneralService} from '../../service/general.service';
import {AlertService} from '../../service/alert.service';
import {AboutService} from '../about/about.service';
import {Browser} from '../../service/borwser.service';
import {StorageService} from '../../service/storage.service';
import {AppConfig} from '../../service/app-config.service';

declare let $: any;
declare let Sortable: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('slides ') slides: Slides;

  public aboutList = [];
  private timeTask1;
  // private bannerArr = [];
  private logo = "assets/imgs/error.jpg";
  // private notice;
  private tloading: boolean = false;

  // private COMMON: any;
  private sort;
  private timeout;
  private longtap = false;
  private timeOutEvent = null;
  private dragID;
  private dragFlag = false;
  // private infoList = [];
  endX: number;
  endY: number;
  // showNotice = false;
  private interval = null;
  private cut = 5;
  constructor(
    public navCtrl: NavController,
    private gService: GeneralService,
    private alertService: AlertService,
    private app: AppConfig,
    private aboutService: AboutService,
    private loadingCtrl: LoadingController,
    private localStorage: StorageService,
    private event: Events,
    private browser: Browser
  ) {
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
  // startSlide() {
  //   setTimeout(() => {
  //     if (this.slides && this.slides.length() > 1 && !this.timeTask1) this.timeTask1 = this.autoSlide(this.slides, 3000);
  //     /* if(this.slide2 && this.slide2.length() > 1 && !this.timeTask2)
  //          this.timeTask2 = this.autoSlide(this.slide2,8000);*/
  //   }, 200);
  // }

  /*停止轮播*/
  // stopSlide() {
  //   if (this.timeTask1) {
  //     clearInterval(this.timeTask1);
  //     this.timeTask1 = null;
  //   }
  //   /* if(this.timeTask2) {
  //      clearInterval(this.timeTask2);
  //      this.timeTask2 = null;
  //    }*/
  // }

  ionViewWillEnter() {
    if (this.tloading) {
      return;
    }
    this.tloading = true;
    this.getHomeData();
    // if (this.showNotice) {
    //   this.interval = setInterval(() => {
    //     this.cut -= 1;
    //     if (this.cut === 0) {
    //       this.close();
    //     }
    //   }, 1000);
    // }
  }

  ionViewDidEnter() {
    // this.startSlide();
    // setTimeout(() => {
      let elements = document.querySelectorAll(".tabbar");
      if (elements != null) {
        Object.keys(elements).map((key) => {
          elements[key].style.display = 'none';
        });
      }
    // },100);
  }

  close() {
    // this.localStorage.set('sortNotice', 'true');
    // this.showNotice = false;
    clearInterval(this.interval);
  }

  ionViewDidLeave() {
    this.tloading = false;
    // this.stopSlide();
  }

  ionViewWillLeave() {
    this.aboutList = [];
    // this.bannerArr = [];
    // this.infoList = [];
  }

  getHomeData() {
    let that: any = this;
    // that.bannerArr = [];
    that.aboutList = [];
    // that.notice = '';
    //获取轮播图数据
    // that.gService.getBanner().then((res) => {
    //   if (!res.code) {
    //     that.bannerArr = res;
    //   } else {
    //     that.alertService.msg(res.error);
    //   }
    // }).catch(() => {
    //   that.alertService.msg("网络异常，请稍后再试");
    // });

    //获取公告内容
    that.gService.getCommon().then(res => {
      if (!res.code) {
        // that.notice = res.notice;
        that.logo = res.logo;
        that.localStorage.set('appName', res.name);
        that.localStorage.set('kefu_qq', res['kefu_qq']);
        document.querySelector('meta[name="application-name"]').setAttribute('content', res.name);
        document.querySelector('meta[name="apple-mobile-web-app-title"]').setAttribute('content', res.name);
        document.title = res.name; // 动态修改网站标题
        that.changeFavicon(res.icon); // 动态修改网站图标
      }
    });
    //获取2条资讯
    // that.getInfo2();
    // let loading = that.loadingCtrl.create({
    //   spinner: 'dots',
    //   content: '玩命加载中'
    // });
    // loading.present();
    //获取热门彩种数据
    let rl = setInterval(() => {
      let hotArr = that.localStorage.getArray('hotArr');
      if (hotArr.length > 0) {
        clearInterval(rl);
        that.aboutList = hotArr;
      }
    }, 200);
    // loading.dismiss();
  }

  // getInfo2() {
  //   this.gService.getInfoList(2, 1).then(res => {
  //     if (!res.code) {
  //       this.infoList = res.data;
  //     }
  //   }).catch(() => {
  //     this.alertService.msg("网络异常，请稍后再试");
  //   });
  // }

  //去掉html实体
  delHtmlTag(str) {
    //html实体转为标签后再用正则去掉标签
    let elem = document.createElement('div');
    elem.innerHTML = str;
    str = elem.innerText || elem.textContent;
    return str.replace(/<[^>]+>/g, '').trim();
  }

  // toAllAbout() {
  //   this.event.publish('selectRootTab', 1);
  // }

  toWeb() {
    window.location.href = document.location.protocol + "//" + document.domain + '/b/download.html';
    // window.location.href = document.location.protocol+"//"+document.domain+"/download.html";
    // window.location.href = "http://www.123kkc.com/down_ios.html";
    // if (this.app.referrer.indexOf("?") > -1) {
    //   window.location.href = this.app.referrer + "&nojump=1";
    // } else {
    //   window.location.href = this.app.referrer + "?nojump=1";
    // }
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
      $favicon.setAttribute('href', link);
      // Otherwise, create a new element and append it to <head>.
    } else {
      $favicon = document.createElement('link');
      $favicon.setAttribute('rel', 'icon');
      $favicon.setAttribute('href', link);
      document.head.appendChild($favicon);
    }

    // shortcut icon
    let $shortcut = document.querySelector('link[rel="shortcut icon"]');
    // If a <link rel="icon"> element already exists,
    // change its href to the given link.
    if ($shortcut !== null) {
      $shortcut.setAttribute('href', link);
      // Otherwise, create a new element and append it to <head>.
    } else {
      $shortcut = document.createElement('link');
      $shortcut.setAttribute('rel', 'shortcut icon');
      $shortcut.setAttribute('href', link);
      document.head.appendChild($shortcut);
    }

    let appleIcon = document.querySelector('link[rel="apple-touch-icon-precomposed"]');
    // If a <link rel="icon"> element already exists,
    // change its href to the given link.
    if (appleIcon !== null) {
      appleIcon.setAttribute('href', link);
      // Otherwise, create a new element and append it to <head>.
    } else {
      appleIcon = document.createElement('link');
      appleIcon.setAttribute('rel', 'apple-touch-icon-precomposed');
      appleIcon.setAttribute('href', link);
      document.head.appendChild(appleIcon);
    }

    let touchIcon = document.querySelector('link[rel="apple-touch-icon"]');
    // If a <link rel="icon"> element already exists,
    // change its href to the given link.
    if (touchIcon !== null) {
      touchIcon.setAttribute('href', link);
      // Otherwise, create a new element and append it to <head>.
    } else {
      touchIcon = document.createElement('link');
      touchIcon.setAttribute('rel', 'apple-touch-icon');
      touchIcon.setAttribute('href', link);
      document.head.appendChild(touchIcon);
    }
  }

  ngAfterContentInit() {
    let that: any = this;
    let el = document.getElementById('item-parent');
    this.sort = Sortable.create(el, {
      // ghostClass: 'blue-background-class',
      disabled: true,
      animation: 150, //动画参数
      forceFallback: false,
      onAdd: function (evt) {
        //拖拽时候添加有新的节点的时候发生该事件
        // console.log('onAdd.foo:', [evt.item, evt.from]);
      },
      onUpdate: function (evt) {
        //拖拽更新节点位置发生该事件
        //  console.log('onUpdate.foo:', [evt.item, evt.from]);
      },
      onRemove: function (evt) {
        //删除拖拽节点的时候促发该事件
        //  console.log('onRemove.foo:', [evt.item, evt.from]);
      },
      onStart: function (evt) {
        //开始拖拽出发该函数
        // console.log('onStart.foo:', [evt.item, evt.from]);
        $(evt.item.children[0].children[0]).addClass('blue-background-class');
      },
      onSort: function (evt) {
        //发生排序发生该事件
        // console.log('onSort.foo:', [evt.item, evt.from]);
        $(evt.item.children[0].children[0]).removeClass('blue-background-class');
      },
      onEnd: function (evt) {
        //拖拽完毕之后发生该事件
        that.sort.options.disabled = true;
        that.longtap = false;
        //  console.log('onEnd.foo:', [evt.item, evt.from);
      },
      // group: "tabdata"+[i],
      store: {
        /**
         * Get the order of elements. Called once during initialization.
         * @param      {Sortable}  sortable
         * @returns  {Array}
         */
        get: function (sortable) {
          //    var order = localStorage.getItem(sortable.options.group.name);
          //      return order ? order.split('|') : [];
        },

        /**
         * Save the order of elements. Called onEnd (when the item is dropped).
         * @param  {Sortable}  sortable
         */
        set: function (sortable) {
          let order = sortable.toArray();
          let hotArr = that.localStorage.getArray('hotArr');
          let tempArr = [];
          order.forEach(code => {
            let data = hotArr.filter(item => {
              return item.code == code;
            });
            tempArr.push(data[0]);
          });
          that.localStorage.setArray('hotArr', tempArr);
        }
      }
    });
  }

  start(e) {
    let that: any = this;
    that.timeout = setTimeout(() => {
      that.longPress(e);
    }, 1000);
  }

  end(event) {
    clearTimeout(this.timeout); //长按时间少于1000ms，不会执行传入的方法
  }

  longPress(e) {
    // if (this.longtap) {
    this.sort.options.disabled = false;
    this.sort._onTapStart(e);
    // }
  }

  ionScroll(event) {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        if (event.directionY == "down") {
          elements[key].style.display = 'none';
        } else {
          elements[key].style.display = 'flex';
        }
      });
    }
  }
}
