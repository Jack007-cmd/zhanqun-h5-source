import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemDetail_11Page } from './item-detail-11';
import {AppCommonModule} from "../../../app/app-common.module";

@NgModule({
  declarations: [
    ItemDetail_11Page,
  ],
  imports: [
    IonicPageModule.forChild(ItemDetail_11Page),AppCommonModule
  ],
})
export class ItemDetail_11PageModule {}
