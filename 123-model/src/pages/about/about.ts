import { Component, ViewChild } from '@angular/core';
import { IonicPage,NavController, LoadingController, NavParams } from 'ionic-angular';
import { AboutService } from './about.service';
import { AlertService } from '../../service/alert.service';
import { StorageService } from '../../service/storage.service';
import { GeneralService } from '../../service/general.service';
import { Content } from 'ionic-angular';

declare var $: any;
declare let Sortable:any;
@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public sortArr = []; //彩种类别列表

  private currentSort = 0; //选中彩种类别

  private aboutList = []; //当前类别各彩种即时开奖数据列表
  startX: number;
  startY: number;
  endX: number;
  endY: number;

  private sort;
  private timeout;
  private longtap = false
  private timeOutEvent = null;
  private dragID;
  private dragFlag = false;
  // private infoList = [];
  dragEndX: number;
  dragEndY: number;
  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private aService: AboutService,
    private alertService: AlertService,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    private gService: GeneralService
  ) {
    this.sortArr = this.storageService.getArray('sort');
    if (this.navParams.get('index')) {
      this.currentSort = this.navParams.get('index');
    }
    this.currentSortAbout(this.currentSort);
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
      if (this.currentSort !== 0) {
        this.currentSort -= 1;
        this.currentSortAbout(this.currentSort);
        this.content.scrollToTop(300);
      }
    } else if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX < 0) {
      console.log('往左滑动');
      if (this.currentSort + 1 < this.sortArr.length) {
        this.currentSort += 1;
        this.currentSortAbout(this.currentSort);
        this.content.scrollToTop(300);
      }
    }
  }

  //获取彩种分类
  // getAboutSort() {
  //   this.aService.getAboutSort().then((res) => {
  //     if (res.code == 0) {
  //       this.sortArr = res.data;
  //       this.sortArr.forEach((d) => {
  //         d.list.forEach((it) => {
  //           it.des = this.gService.baseConfig[it.code];
  //         })
  //       });
  //       this.storageService.setArray("sort", this.sortArr);
  //       this.currentSortAbout(0);
  //     } else {
  //       this.alertService.msg(res.msg);
  //     }
  //   });
  // }

  //获取当前类别各彩种即时开奖数据列表
  currentSortAbout(index) {
    let that: any = this;
    that.currentSort = index;
    that.aboutList = [];
    // let loading = that.loadingCtrl.create({
    //   spinner: 'dots',
    //   content: '玩命加载中'
    // });
    // loading.present();
    // that.aboutList = new Array(that.sortArr[index].list.length);
    that.aboutList = that.sortArr[index].list;
    // that.sortArr[index].list.forEach((v, i) => {
    //   if (that.gService.getBaseConfig(v.code)) {
    //     let temp: any = {};
    //     temp.code = v.code;
    //     temp.name = v.name;
    //     temp.des = v.des;
    //     temp.url = v.url;
    //     temp.sortKey = that.sortArr[index].key;
    //     that.aboutList[i] = temp;
    //   }
    // });
    // loading.dismiss();
  }

  doRefresh(refresh) {
    this.currentSortAbout(this.currentSort);
    refresh.complete();
  }

  ionViewWillEnter() {
    this.currentSortAbout(this.currentSort);
  }

  ionViewDidEnter() {}

  ionViewWillLeave() {
    this.aboutList = [];
  }

  ngAfterContentInit() {
      let that: any = this;
      let el = document.getElementById('about-parent');
      this.sort = Sortable.create(el, {
        // ghostClass: 'blue-background-class',
        disabled: true,
        animation: 150, //动画参数
        forceFallback: false,
        onAdd: function(evt) {
          //拖拽时候添加有新的节点的时候发生该事件
          // console.log('onAdd.foo:', [evt.item, evt.from]);
        },
        onUpdate: function(evt) {
          //拖拽更新节点位置发生该事件
          //  console.log('onUpdate.foo:', [evt.item, evt.from]);
        },
        onRemove: function(evt) {
          //删除拖拽节点的时候促发该事件
          //  console.log('onRemove.foo:', [evt.item, evt.from]);
        },
        onStart: function(evt) {
          //开始拖拽出发该函数
          // console.log('onStart.foo:', [evt.item, evt.from]);
          $(evt.item.children[0].children[0]).addClass("blue-background-class");
        },
        onSort: function(evt) {
          //发生排序发生该事件
          // console.log('onSort.foo:', [evt.item, evt.from]);
           $(evt.item.children[0].children[0]).removeClass("blue-background-class");
        },
        onEnd: function(evt) {
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
          get: function(sortable) {
            //    var order = localStorage.getItem(sortable.options.group.name);
            //      return order ? order.split('|') : [];
          },

          /**
           * Save the order of elements. Called onEnd (when the item is dropped).
           * @param  {Sortable}  sortable
           */
          set: function(sortable) {
           let order = sortable.toArray();
           let tempSortArr = that.storageService.getArray('sort');
           let currentSortArr = tempSortArr[that.currentSort].list;
           let tempArr = [];
           order.forEach(code => {
             let data = currentSortArr.filter(item => {
               return item.code == code;
             });
             tempArr.push(data[0]);
           });
           tempSortArr[that.currentSort].list = tempArr;
           that.sortArr = tempSortArr;
           that.storageService.setArray('sort', tempSortArr);
          }
        }
      });
    }
    start(e){
      let that:any = this;
      that.timeout = setTimeout(()=> {
        that.longPress(e);
      }, 1000);
    }

   end(event){
     clearTimeout(this.timeout);  //长按时间少于1000ms，不会执行传入的方法
   }

  longPress(e){
    // if (this.longtap) {
      this.sort.options.disabled = false;
      this.sort._onTapStart(e);
    // }
  }
  toRoot(){
    this.navCtrl.popToRoot();
  }
}
