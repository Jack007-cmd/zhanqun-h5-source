import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemDetail_02Page } from './item-detail-02';
import {AppCommonModule} from "../../../app/app-common.module";

@NgModule({
  declarations: [
    ItemDetail_02Page,
  ],
  imports: [
    IonicPageModule.forChild(ItemDetail_02Page),AppCommonModule
  ],
})
export class ItemDetail_02PageModule {}
