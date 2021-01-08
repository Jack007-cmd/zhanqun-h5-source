import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemDetail_12Page } from './item-detail-12';
import {AppCommonModule} from "../../../app/app-common.module";

@NgModule({
  declarations: [
    ItemDetail_12Page,
  ],
  imports: [
    IonicPageModule.forChild(ItemDetail_12Page),AppCommonModule
  ],
})
export class ItemDetail_12PageModule {}
