import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemDetail_06Page } from './item-detail-06';
import {AppCommonModule} from "../../../app/app-common.module";

@NgModule({
  declarations: [
    ItemDetail_06Page,
  ],
  imports: [
    IonicPageModule.forChild(ItemDetail_06Page),AppCommonModule
  ],
})
export class ItemDetail_06PageModule {}
