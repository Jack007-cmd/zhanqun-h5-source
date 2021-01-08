import { Injectable }    from '@angular/core';
import { AppConfig } from './app-config.service';
// import { ThemeableBrowser, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
@Injectable()
export class Browser{

  constructor(private appConfig:AppConfig) {
  }

  openUrl(url:string,system?:boolean){
    let InAppBrowser = null;
    if((<any>window).cordova) {
      InAppBrowser = ((<any>window).cordova).ThemeableBrowser;
    }
    url = this.generateUrl(url);
    if(system && InAppBrowser){
      // InAppBrowser.openUrl(url,"system");
      // new ThemeableBrowser(this.selectedItem.ClickUrl, '_blank', options)
      InAppBrowser.open(url, '_blank', {
        statusbar: {
          color: '#e12121'
        },
        toolbar: {
          height: 44,
          color: '#e12121'
        },
        title: {
          color: '#ffffffff',
          showPageTitle: true
        },
        backButton: {
          image: 'back',
          imagePressed: 'back_pressed',
          align: 'left',
          event: 'backPressed'
        },
        // forwardButton: {
        //   image: 'forward',
        //   imagePressed: 'forward_pressed',
        //   align: 'left',
        //   event: 'forwardPressed'
        // },
        // closeButton: {
        //   image: 'close',
        //   imagePressed: 'close_pressed',
        //   align: 'left',
        //   event: 'closePressed'
        // },
        // customButtons: [
        //   {
        //     image: 'share',
        //     imagePressed: 'share_pressed',
        //     align: 'right',
        //     event: 'sharePressed'
        //   }
        // ],
        // menu: {
        //   image: 'menu',
        //   imagePressed: 'menu_pressed',
        //   title: 'Test',
        //   cancel: 'Cancel',
        //   align: 'right',
        //   items: [
        //     {
        //       event: 'helloPressed',
        //       label: 'Hello World!'
        //     },
        //     {
        //       event: 'testPressed',
        //       label: 'Test!'
        //     }
        //   ]
        // },
        backButtonCanClose: true
      });
      //   .addEventListener('backPressed', function(e) {
      //   // alert('back pressed');
      // }).addEventListener('helloPressed', function(e) {
      //   // alert('hello pressed');
      // }).addEventListener('sharePressed', function(e) {
      //   // alert(e.url);
      // }).addEventListener(InAppBrowser.EVT_ERR, function(e) {
      //   // console.error(e.message);
      // }).addEventListener(InAppBrowser.EVT_WRN, function(e) {
      //   // console.log(e.message);
      // });
    }else{
      window.open(url);
    }
  }

  generateUrl(url:string):string{
    url.indexOf("?")>0?url+="&":url+="?";
    url += 'f_aid=' + this.appConfig.agentId;
    url += '&f_clientType=' + (this.appConfig.platform=='ios'?5:4);
    url += '&f_cv=' + this.appConfig.version;
    return url;
  }
}
