import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemDetail_08Page } from './item-detail-08';
import {AppCommonModule} from "../../../app/app-common.module";

@NgModule({
  declarations: [
    ItemDetail_08Page,
  ],
  imports: [
    IonicPageModule.forChild(ItemDetail_08Page),AppCommonModule
  ],
})
export class ItemDetail_08PageModule {}
