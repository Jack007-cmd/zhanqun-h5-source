import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemDetail_05Page } from './item-detail-05';
import {AppCommonModule} from "../../../app/app-common.module";

@NgModule({
  declarations: [
    ItemDetail_05Page,
  ],
  imports: [
    IonicPageModule.forChild(ItemDetail_05Page),AppCommonModule
  ],
})
export class ItemDetail_05PageModule {}
