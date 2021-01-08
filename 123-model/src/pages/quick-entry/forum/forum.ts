import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
// import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
// import {Http} from "@angular/http";
import {PipeTransform, Pipe} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

/**
 * Generated class for the ForumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Pipe({name: 'safe'})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

declare let $: any;

@Component({
  selector: 'page-forum',
  templateUrl: 'forum.html',
})
export class ForumPage {
  public  iframe_url;

  constructor(public navCtrl: NavController, public navParams: NavParams,private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.iframe_url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.123kkc.com/bbs/');
  }

  ionViewWillEnter() {
  }

  load() {
    if (document.getElementsByClassName("main-iframe")[0].getElementsByTagName('meta').length > 1) {
      var oMeta = document.getElementsByClassName("main-iframe")[0].getElementsByTagName('meta')[1]; //第二个
      oMeta.content = '';
    }
    let h = $(".main-iframe").last().contents().find("body")[0].scrollHeight;	//别的参考不对
    $(".main-iframe").height(h);

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
