import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemDetail_07Page } from './item-detail-07';
import {AppCommonModule} from "../../../app/app-common.module";

@NgModule({
  declarations: [
    ItemDetail_07Page,
  ],
  imports: [
    IonicPageModule.forChild(ItemDetail_07Page),AppCommonModule
  ],
})
export class ItemDetail_07PageModule {}
