import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {HttpModule} from "@angular/http";
// import {Device} from "@ionic-native/device";
// import {Network} from "@ionic-native/network";
import {HTTP} from "@ionic-native/http";

import {MyApp} from './app.component';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {AppCommonModule} from "./app-common.module";
import {ServiceModule} from "../service/service.module";

import {PipeModule} from "../pipes/pipe.module";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
// import { ThemeableBrowser, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import {RecommendTwoSidesPage} from "../pages/quick-entry/recommend-two-sides/recommend-two-sides";
import {LongDragonCountPage} from "../pages/quick-entry/long-dragon-count/long-dragon-count";
import {KillingPlanPage} from "../pages/quick-entry/killing-plan/killing-plan";
import {AboutPlanPage} from "../pages/quick-entry/about-plan/about-plan";
import {PrecisionPlanPage} from "../pages/quick-entry/precision-plan/precision-plan";
import {DataAnalysisPage} from "../pages/quick-entry/data-analysis/data-analysis";
import {ForumPage,SafePipe } from "../pages/quick-entry/forum/forum";

@NgModule({
  declarations: [
    MyApp,
    RecommendTwoSidesPage,
    ContactPage,
    LongDragonCountPage,
    KillingPlanPage,
    AboutPlanPage,
    PrecisionPlanPage,
    DataAnalysisPage,
    SafePipe,
    ForumPage,
    HomePage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppCommonModule,
    ServiceModule,
    PipeModule,
    IonicModule.forRoot(MyApp, {
      pageTransition: 'ios-transition',
      tabsHideOnSubPages: false
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RecommendTwoSidesPage,
    ContactPage,
    LongDragonCountPage,
    KillingPlanPage,
    AboutPlanPage,
    PrecisionPlanPage,
    DataAnalysisPage,
    ForumPage,
    HomePage,
    TabsPage,
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
