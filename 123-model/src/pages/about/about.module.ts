import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {AboutPage} from "./about";
import {AppCommonModule} from "../../app/app-common.module";

@NgModule({
  declarations: [
    AboutPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutPage),AppCommonModule
  ],
})
export class AboutPageModule {}
