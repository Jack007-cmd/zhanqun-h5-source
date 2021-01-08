import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemDetail_01Page } from './item-detail-01';
import {AppCommonModule} from "../../../app/app-common.module";

@NgModule({
  declarations: [
    ItemDetail_01Page,
  ],
  imports: [
    IonicPageModule.forChild(ItemDetail_01Page),AppCommonModule
  ],
})
export class ItemDetail_01PageModule {}
