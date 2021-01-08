import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemDetail_03Page } from './item-detail-03';
import {AppCommonModule} from "../../../app/app-common.module";

@NgModule({
  declarations: [
    ItemDetail_03Page,
  ],
  imports: [
    IonicPageModule.forChild(ItemDetail_03Page),AppCommonModule
  ],
})
export class ItemDetail_03PageModule {}
