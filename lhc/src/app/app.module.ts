import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {HttpModule} from "@angular/http";
// import {Device} from "@ionic-native/device";
// import {Network} from "@ionic-native/network";
import {HTTP} from "@ionic-native/http";

import {MyApp} from './app.component';

// import {AboutPage} from '../pages/about/about';
// import {ContactPage} from '../pages/contact/contact';
// import {HomePage} from '../pages/home/home';
// import {TabsPage} from '../pages/tabs/tabs';
// import {NewsPage} from "../pages/news/news";
// import {SettingPage} from "../pages/setting/setting";
// import {AppCommonModule} from "./app-common.module";
import {HKCommonModule} from "./hk-common.module";
import {ServiceModule} from "../service/service.module";

import {PipeModule} from "../pipes/pipe.module";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    // AboutPage,
    // ContactPage,
    // NewsPage,
    // SettingPage,
    // HomePage,
    // TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    // AppCommonModule,
    HKCommonModule,
    ServiceModule,
    PipeModule,
    IonicModule.forRoot(MyApp, {
      pageTransition: 'ios-transition',
      tabsHideOnSubPages: true
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // AboutPage,
    // ContactPage,
    // NewsPage,
    // SettingPage,
    // HomePage,
    // TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  exports: [PipeModule]
})
export class AppModule {
}
