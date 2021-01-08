import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemDetail_09Page } from './item-detail-09';
import {AppCommonModule} from "../../../app/app-common.module";

@NgModule({
  declarations: [
    ItemDetail_09Page,
  ],
  imports: [
    IonicPageModule.forChild(ItemDetail_09Page),AppCommonModule
  ],
})
export class ItemDetail_09PageModule {}
