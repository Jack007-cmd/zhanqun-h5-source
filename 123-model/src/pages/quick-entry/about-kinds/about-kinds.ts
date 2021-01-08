import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {StorageService} from "../../../service/storage.service";
import {Browser} from "../../../service/borwser.service";

/**
 * Generated class for the AboutKindsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var $: any;
declare let Sortable: any;

@IonicPage()
@Component({
  selector: 'page-about-kinds',
  templateUrl: 'about-kinds.html',
})
export class AboutKindsPage {
  private sortArr = [];

  private collectionArr = [];
  private sort;
  private timeout;
  private itemTimeout;
  private longtap = false;
  endX: number;
  endY: number;
  sortableArr = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private localStorage: StorageService, public alertCtrl: AlertController, private browser: Browser) {
    this.sortArr = this.localStorage.getArray("sort");
    this.collectionArr = this.localStorage.getArray('my-collection');
  }

  ionViewWillEnter() {
    // let u = navigator.userAgent;
    // let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    // if(!isAndroid){
    //   if(/iphone/gi.test(navigator.userAgent) && (screen.height >= 812 && screen.width >= 375)){
    //     $('#cZList').css('top','74px');
    //   }else {
    //     $('#cZList').css('top','64px');
    //   }
    // }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutKindsPage');
  }

  toDestination(item) {
    if (item.code != 'xglhc') {
      this.navCtrl.push(item.des, {code: item.code, name: item.name, video_url: item.url});
    } else {
      this.browser.openUrl(item.des, true);
    }
  }

  ngAfterViewInit() {
    let that: any = this;
    that.sortArr.forEach((v, i) => {
      let sortable = new Sortable(document.getElementById('item-parent_' + i), {
        group: {
          name: 'shared',
          pull: 'clone',
          put: false // 不允许拖拽进这个列表
        },
        animation: 150,
        sort: false, // 设为false，禁止sort
        onEnd: function (/**Event*/evt) {
          sortable.options.disabled = true;
        },
      });
      that.sortableArr.push(sortable);
    });

    let coll = new Sortable(document.getElementById('my-collection'), {
      group: {
        name: 'shared',
        pull: false,
        // put: false // 不允许拖拽进这个列表
      },
      filter: ".ignore-elements",
      animation: 150,
      sort: false,
      onSort: function (/**Event*/evt) {
      },
      onEnd: function (/**Event*/evt) {
        // coll.options.disabled = true;
      },
      // 元素从一个列表拖拽到另一个列表
      onAdd: function (/**Event*/evt) {
        // same properties as onEnd
        var itemEl = evt.item;  // dragged HTMLElement
        // evt.to;    // target list
        // evt.from;  // previous list
        // evt.oldIndex;  // element's old index within old parent
        // evt.newIndex;  // element's new index within new parent
        // evt.clone ;// the clone element
        // evt.pullMode;  // when item is in another sortable: `"clone"` if cloning, `true` if moving
        console.log("itemEl:" + itemEl);
        console.log("evt.to:" + evt.to);
        let code = evt.item.getAttribute("code");
        if ($(evt.to).find("li[code='" + code + "']").length > 1) {
          evt.item.remove();
        }
      },
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
          let order = [];
          let children = $("#my-collection").children();
          for (let i = 0; i < children.length; i++) {
            order.push($(children[i]).attr("code"));
          }
          let tempArr = [];
          order.forEach(code => {
            let basicArr = that.localStorage.getArray("basicArr");
            let data = basicArr.filter(item => {
              return item.code == code;
            });
            tempArr.push(data[0]);
          });
          that.localStorage.setArray('my-collection', tempArr);
          children.remove();
          that.collectionArr = [];
          that.collectionArr = tempArr;
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

  end(event, it) {
    clearTimeout(this.timeout); //长按时间少于1000ms，不会执行传入的方法
    if (this.timeout != 0) {
      console.log("你这是点击，不是长按");
      this.toDestination(it);
    }
  }

  clear(event) {
    clearTimeout(this.timeout);
  }

  longPress(e) {
    this.timeout = 0;
    console.log(e);
    let alert = this.alertCtrl.create({
      title: '您确定要删除？',
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        },
        {
          text: '确定',
          handler: () => {
            let index;
            this.collectionArr.forEach((v, i) => {
              if (v.code == $(e.target.parentElement).attr("code")) {
                index = i;
                return;
              }
            });
            this.collectionArr.splice(Number(index), 1);
            this.localStorage.setArray('my-collection', this.collectionArr);
            console.log('已删除');

          }
        }
      ]
    });
    alert.present();
  }

  itemStart(e) {
    let that: any = this;
    that.itemTimeout = setTimeout(() => {
      that.itemLongPress(e);
    }, 200);
  }

  itemEnd(event, it) {
    clearTimeout(this.itemTimeout); //长按时间少于1000ms，不会执行传入的方法
    if (this.itemTimeout != 0) {
      this.toDestination(it);
    }
  }

  itemClear() {
    clearTimeout(this.itemTimeout);
  }

  itemLongPress(e) {
    this.itemTimeout = 0;
    console.log(e);
    let itemParent = this.sortableArr[Number(e.target.parentNode.parentElement.id.split("_")[1])];
    console.log(itemParent);
    if (itemParent) {
      itemParent.options.disabled = false;
      itemParent._onTapStart(e);
    }
  }
}
