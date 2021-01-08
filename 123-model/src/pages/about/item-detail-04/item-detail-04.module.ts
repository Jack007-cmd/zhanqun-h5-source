import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemDetail_04Page } from './item-detail-04';
import {AppCommonModule} from "../../../app/app-common.module";

@NgModule({
  declarations: [
    ItemDetail_04Page,
  ],
  imports: [
    IonicPageModule.forChild(ItemDetail_04Page),AppCommonModule
  ],
})
export class ItemDetail_04PageModule {}
