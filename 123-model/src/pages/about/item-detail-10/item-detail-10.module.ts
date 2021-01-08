import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemDetail_10Page } from './item-detail-10';
import {AppCommonModule} from "../../../app/app-common.module";

@NgModule({
  declarations: [
    ItemDetail_10Page,
  ],
  imports: [
    IonicPageModule.forChild(ItemDetail_10Page),AppCommonModule
  ],
})
export class ItemDetail_10PageModule {}
