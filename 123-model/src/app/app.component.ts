import { Component,ViewChild } from '@angular/core';
import { Platform ,Nav,ToastController,Keyboard,IonicApp} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import {AppConfig} from "../service/app-config.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  backButtonPressed: boolean = false;
  @ViewChild('myNav') nav: Nav;

  constructor(private platform: Platform,private toastCtrl:ToastController,private keyboard:Keyboard, statusBar: StatusBar,
              splashScreen: SplashScreen,public ionicApp: IonicApp,appConfig:AppConfig) {
    appConfig.platform = platform.is('ios')?'ios':'android';
    appConfig.referrer =  window.document.referrer;
    let that =this;
    platform.ready().then(() => {
      statusBar.styleLightContent();

      let isNative:boolean=!!(<any>window).cordova;
      if(!isNative) that.rootPage = TabsPage;
      document.addEventListener("deviceready",function(){
        that.rootPage = TabsPage;
        setTimeout(() => {
          splashScreen.hide();
        }, 100);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();

        that.registerBackButtonAction();

        if(!!(<any>window).cordova){
          (<any>window).cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        }
      },false);
      if((<any>window).navigator.splashScreen){
        (<any>window).navigator.splashScreen.hide();
      }
    });
  }
  //android物理返回事件
  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      //回退时取消键盘
      if(this.keyboard.isOpen()){
        this.keyboard.close();
        return;
      }

      //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
      let activePortal = this.ionicApp._loadingPortal.getActive() || this.ionicApp._modalPortal.getActive() || this.ionicApp._toastPortal.getActive() || this.ionicApp._overlayPortal.getActive();
      if (activePortal) {
        activePortal.dismiss();
        return;
      }
      //正常回退
      let activeNav = this.nav.getActive().instance.tabRef.getSelected();

      return activeNav.canGoBack() ? activeNav.pop() : this.showExit()
    }, 1);
  }

  //双击退出提示框
  showExit(){
    if(this.backButtonPressed){//当触发标志为true时，即2秒内双击返回按键则退出APP
        this.platform.exitApp();
    }else{
      this.toastCtrl.create({
        message:'再按一次退出应用',
        duration:2000,
        position:'top'
      }).present();
      this.backButtonPressed = true;
      setTimeout(()=>{
        this.backButtonPressed=false;
      },1000);//2秒内没有再次点击返回则将触发标志标记为false
    }
  }
}
