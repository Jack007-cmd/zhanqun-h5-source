import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HkHomePage } from './hk-home';
import {HKCommonModule} from "../../../app/hk-common.module";

@NgModule({
  declarations: [
    HkHomePage,
  ],
  imports: [
    IonicPageModule.forChild(HkHomePage),HKCommonModule
  ],
})
export class HkHomePageModule {}
