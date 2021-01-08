import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HkNewsDetailPage } from './hk-news-detail';

@NgModule({
  declarations: [
    HkNewsDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(HkNewsDetailPage),
  ],
})
export class HkNewsDetailPageModule {}
